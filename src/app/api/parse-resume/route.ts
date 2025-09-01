// app/api/parse-resume/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

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

    // Define supported file types directly in the code
    const supportedFileTypes = [
      { extension: '.pdf', mimeType: 'application/pdf' },
      { extension: '.docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
      { extension: '.doc', mimeType: 'application/msword' },
      { extension: '.txt', mimeType: 'text/plain' },
      // Add more file types here as needed, e.g.:
      // { extension: '.rtf', mimeType: 'application/rtf' },
      // { extension: '.odt', mimeType: 'application/vnd.oasis.opendocument.text' },
    ];

    const fileExtension = path.extname(file.name).toLowerCase();
    const isValidType = supportedFileTypes.some(
      (type) => type.extension === fileExtension || type.mimeType === file.type
    );

    // Log file details for debugging
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

    // Create temporary file
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, file.name);
    await fs.writeFile(tempFilePath, Buffer.from(buffer));

    // Use File Manager to upload
    const fileManager = new GoogleAIFileManager(apiKey);
    const uploadResult = await fileManager.uploadFile(tempFilePath, {
      mimeType: file.type || getMimeTypeFromExtension(fileExtension, supportedFileTypes),
      displayName: file.name,
    });

    // Use generative AI model
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const prompt = `
      Extract the following information from the uploaded resume file and return it strictly as a JSON object matching this structure. 
      Do not include any additional text, markdown, or explanations outside the JSON.
      If a field is not present, use an empty string or empty array as appropriate.
      For dates, use YYYY-MM format if possible.
      For descriptions in workExperience, split into an array of up to 3 bullet points.
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
          mimeType: file.type || getMimeTypeFromExtension(fileExtension, supportedFileTypes),
        },
      },
    ]);

    const jsonText = result.response.text().replace(/```json|```/g, '').trim();
    const parsedData = JSON.parse(jsonText);

    // Clean up temporary file
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