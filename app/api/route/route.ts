import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});
export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json(
      {
        message: "WRONG METHOD FOOL!!!!",
      },
      {
        status: 405,
      }
    );
  }

  const formData = await req.formData();
  const input = formData.get("generate");
  const tipeDiagram = formData.get("select_diagram");

  const prompt = `buatkan ${tipeDiagram} dalam format Mermaid.js dari deskripsi berikut :${input} tanpa tulisan "mermaid" hapus penjelasan sehingga hanya menyisakan syntax mermaid.
  mermaid syntax tidak ada tipe data enum. hilangkan tanda backtick
  `;
  const result = await model.generateContent(prompt);
  return NextResponse.json(
    {
      data: result.response.text(),
    },
    {
      status: 200,
    }
  );
}
