import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
export async function Gemini() {
  const prompt = "berikan list nama rasul dan mukjizatnya";
  const result = await model.generateContent(prompt);
  return result.response.text();
}
