import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const systemPrompt = `
      You are an AI Property Search Assistant for Rentharaka, a rental platform.
      The user will describe their ideal property in natural language.
      Your task is to parse their description and output a strict JSON object with these filters:
      - minPrice: number (optional)
      - maxPrice: number (optional)
      - bedrooms: number (optional)
      - locationKeywords: array of strings (optional, e.g. ["near school", "downtown"])
      
      Respond only with the valid raw JSON object, no markdown formatting or extra text.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0,
      max_tokens: 150,
      response_format: { type: "json_object" },
    });

    const filterObj = JSON.parse(response.choices[0].message.content || '{}');

    // In a real scenario, this response would either query the DB directly here
    // or return the filters to the client which then queries Firebase.
    // For this prototype, we return the parsed filters to the client.
    return NextResponse.json({ filters: filterObj });
  } catch (error: any) {
    console.error('AI Search Error:', error);
    return NextResponse.json({ error: error.message || 'Error processing request' }, { status: 500 });
  }
}
