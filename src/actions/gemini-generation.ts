"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateText(prompt: string) {
  const model = await genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContentStream(prompt);

  let text = "";
  try {
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      text += chunkText;
    }
  } catch (e) {
    console.error(e);
    text = "Error generating text | Please try again.";
  }

  return text;
}
