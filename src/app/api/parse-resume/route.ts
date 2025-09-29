// app/api/parse-resume/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import Tesseract from 'tesseract.js';
import { fromPath } from 'pdf2pic';
import mammoth from 'mammoth';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('resume') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const supportedFileTypes = [
      { extension: '.pdf', mimeType: 'application/pdf' },
      { extension: '.docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
      { extension: '.doc', mimeType: 'application/msword' },
      { extension: '.txt', mimeType: 'text/plain' },
      { extension: '.rtf', mimeType: 'application/rtf' },
      { extension: '.odt', mimeType: 'application/vnd.oasis.opendocument.text' },
    ];

    const fileExtension = path.extname(file.name).toLowerCase();
    const isValidType = supportedFileTypes.some(
      (type) => type.extension === fileExtension || type.mimeType === file.type
    );

    console.log('File details:', {
      name: file.name,
      type: file.type,
      extension: fileExtension,
      size: file.size,
    });

    if (!isValidType) {
      return NextResponse.json(
        {
          error: `Unsupported file type: ${file.type} (extension: ${fileExtension}). Supported types: ${supportedFileTypes
            .map((t) => t.extension)
            .join(', ')}`,
        },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, file.name);
    await fs.writeFile(tempFilePath, Buffer.from(buffer));

    let extractedText = '';

    // Handle PDFs (potentially image-based)
    if (fileExtension === '.pdf') {
      try {
        // Convert PDF to images
        const outputDir = path.join(tempDir, `pdf_images_${Date.now()}`);
        await fs.mkdir(outputDir, { recursive: true });

        const options = {
          density: 100,
          format: 'png',
          outputDir,
          outputName: 'page',
        };

        const convert = fromPath(tempFilePath, options);
        const images = await convert.bulk(-1); // Convert all pages

        // Perform OCR on each image
        for (const image of images) {
          const imagePath = path.join(outputDir, `page.${image.page}.png`);
          const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
          extractedText += text + '\n';
        }

        // Clean up image files
        await fs.rm(outputDir, { recursive: true, force: true });
      } catch (pdfError) {
        console.warn('PDF processing failed, attempting direct file upload:', pdfError);
        // Fallback to original file upload if OCR fails
        extractedText = '';
      }
    }
    // Handle Word documents (.docx)
    else if (fileExtension === '.docx') {
      try {
        const { value } = await mammoth.extractRawText({ path: tempFilePath });
        extractedText = value;

        // Check if the extracted text is minimal (indicating possible image-based content)
        if (value.trim().length < 50) {
          console.log('Minimal text extracted from .docx, attempting OCR on embedded images');
          const images = await extractImagesFromDocx(tempFilePath);
          for (const imagePath of images) {
            const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
            extractedText += text + '\n';
            await fs.unlink(imagePath); 
          }
        }
      } catch (docxError) {
        console.warn('DOCX processing failed:', docxError);
        extractedText = '';
      }
    }
    // Other file types (use original file upload)
    else {
      extractedText = '';
    }

    const fileManager = new GoogleAIFileManager(apiKey);
    let uploadResult;

    // If OCR extracted text, use it; otherwise, upload the original file
    if (extractedText.trim().length > 0) {
      // Create a temporary text file with extracted content
      const tempTextPath = path.join(tempDir, `${path.basename(file.name, fileExtension)}.txt`);
      await fs.writeFile(tempTextPath, extractedText);
      uploadResult = await fileManager.uploadFile(tempTextPath, {
        mimeType: 'text/plain',
        displayName: `${file.name}_extracted.txt`,
      });
      await fs.unlink(tempTextPath); // Clean up text file
    } else {
     
      uploadResult = await fileManager.uploadFile(tempFilePath, {
        mimeType: file.type || getMimeTypeFromExtension(fileExtension, supportedFileTypes),
        displayName: file.name,
      });
    }

    // Use generative AI model
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
      Extract the following information from the uploaded resume file and return it strictly as a JSON object matching this structure. 
      Do not include any additional text, markdown, or explanations outside the JSON.
      If a field is not present, use an empty string or empty array as appropriate .
      For dates, use YYYY-MM format if possible.
      For descriptions in workExperience, split into an array of up to 3 bullet points, circular and black-filled.
      Do not include %, &, #, <, >, ", ', or any other URI-reserved characters that can cause URI malformed errors. Replace them safely with plain text equivalents (for example, % → "percent", & → "and").
      Structure:
      {
        "personalInfo": {
          "fullName": string,
          "email": string,
          "phone": string,
          "location": string,
          "linkedin": string,
          "website": string,
          "github": string
        },
        "professionalSummary": string,
        "education": array of {
          "school": string,
          "degree": string,
          "field": string,
          "startDate": string,
          "endDate": string,
          "gpa": string
        },
        "workExperience": array of {
          "company": string,
          "position": string,
          "startDate": string,
          "endDate": string,
          "description": array of strings
        },
        "skills": array of strings,
        "certifications": array of strings,
        "projects": array of {
          "name": string,
          "description": string,
          "technologies": string,
          "link": string
        },
        "achievements": array of {
          "title": string,
          "description": string,
          "date": string
        },
        "extracurriculars": array of {
          "activity": string,
          "role": string,
          "description": string,
          "startDate": string,
          "endDate": string
        }
      }
    `;

    const result = await model.generateContent([
      prompt,
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);

    const jsonText = result.response.text().replace(/```json|```/g, '').trim();
    const parsedData = JSON.parse(jsonText);

    // Clean up original temporary file
    await fs.unlink(tempFilePath);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Error in parse-resume:', error);
    return NextResponse.json({ error: 'Failed to parse resume' }, { status: 500 });
  }
}

// Helper function to map file extensions to MIME types
function getMimeTypeFromExtension(
  extension: string,
  supportedFileTypes: { extension: string; mimeType: string }[]
): string {
  const type = supportedFileTypes.find((t) => t.extension === extension);
  return type ? type.mimeType : 'application/octet-stream';
}

// Helper function to extract images from a .docx file
async function extractImagesFromDocx(docxPath: string): Promise<string[]> {
  const tempDir = os.tmpdir();
  const imagePaths: string[] = [];
  
  try {
    const result = await mammoth.extractRawText({ path: docxPath });
   
    console.warn('Image extraction from .docx not fully implemented; returning empty array');
    return imagePaths;
  } catch (error) {
    console.error('Error extracting images from .docx:', error);
    return imagePaths;
  }
}