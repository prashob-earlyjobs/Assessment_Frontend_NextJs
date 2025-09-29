// app/api/fetch-jd/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Fetch the HTML content from the provided URL
    const pageResponse = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!pageResponse.ok) {
      throw new Error(`Failed to fetch page: ${pageResponse.statusText}`);
    }

    let html = await pageResponse.text();

    
    if (html.length > 100000) {
      html = html.substring(0, 100000) + '... [truncated]';
    }

    
    const prompt = `
Extract the exact title and full job description from the following ${url} of a job posting page. 
Ignore ads, navigation, footers, and irrelevant sections. Focus on the main job content.
Return the result strictly as JSON in this format: {"title": "Job Title Here", "description": "Full job description text here"}
Do not include any additional text or explanations.


`;

    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json', 
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text();
      throw new Error(`Gemini API request failed: ${geminiResponse.statusText}- ${errorBody}`);
    }

    const geminiData = await geminiResponse.json();
    const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No content generated from Gemini');
    }

    // Parse the JSON output
    let extractedData;
    try {
      extractedData = JSON.parse(generatedText);
    } catch (parseError) {
      console.error('Failed to parse Gemini output:', generatedText);
      throw new Error('Invalid JSON response from Gemini');
    }

    // Validate extracted data
    if (!extractedData.title || !extractedData.description) {
      throw new Error('Incomplete data extracted from Gemini');
    }

    return NextResponse.json(extractedData);
  } catch (error) {
    console.error('Error in /api/fetch-jd:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}