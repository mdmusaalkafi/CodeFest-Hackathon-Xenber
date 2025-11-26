import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key Missing" }, { status: 500 });
    }

    const body = await req.json();
    const { income, loanAmount, reason, employmentStatus } = body;

    const ai = new GoogleGenAI({ apiKey: apiKey });

    const promptText = `
      Act as a Credit Risk Officer. Analyze this data:
      - Income: ${income}
      - Loan: ${loanAmount}
      - Employment: ${employmentStatus}
      - Story: ${reason}

      Return a JSON object with this structure:
      {
        "riskScore": number (0-100),
        "decision": "APPROVED" or "REJECTED" or "REVIEW",
        "reasoning": "string",
        "redFlags": ["string"],
        "greenFlags": ["string"]
      }
    `;

    // Call the API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: promptText,
      config: {
        responseMimeType: "application/json",
      },
    });

    // --- THE FIX IS HERE ---
    // In the new SDK, .text is a property, NOT a function.
    // We removed the '()' 
    const jsonString = response.text; 
    
    // Parse the JSON
    const data = JSON.parse(jsonString);

    return NextResponse.json(data);

  } catch (error) {
    console.error("SDK Error:", error);
    return NextResponse.json(
      { error: "Analysis Failed", details: error.message }, 
      { status: 500 }
    );
  }
}