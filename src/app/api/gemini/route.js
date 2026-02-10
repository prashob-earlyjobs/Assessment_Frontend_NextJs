export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const apiKey= process.env.GEMINI_API_KEY;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      }
    );

    const data = await response.json();
    return Response.json(data);

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}