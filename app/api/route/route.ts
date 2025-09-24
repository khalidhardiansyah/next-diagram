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
        message: "WRONG METHOD!!!!",
      },
      {
        status: 405,
      }
    );
  }

  const formData = await req.formData();
  const input = formData.get("generate");
  const tipeDiagram = formData.get("select_diagram");

  const prompt = `
                    Buatkan ${tipeDiagram} dalam format Mermaid.js berdasarkan deskripsi berikut:
                    ${input}
                    
   ATURAN KETAT:
1. Output HANYA berupa blok kode Mermaid . Tidak boleh ada teks di luar itu.
2. Jika deskripsi mengandung beberapa konteks berbeda, pisahkan menjadi beberapa diagram.
   - Proses atau SOP → flowchart TD
   - Interaksi antar aktor/sistem → sequenceDiagram
   - Struktur kelas/objek → classDiagram
   - State machine → stateDiagram-v2
3. Setiap diagram WAJIB ditulis dalam blok kode Mermaid terpisah.
4. Flowchart:
   - Gunakan ID singkat (A, B1, C2, dst).
   - Semua label wajib dalam format ID["teks label"].
   - Gunakan --> atau -->|kondisi| sesuai kebutuhan.
5. SequenceDiagram:
   - Gunakan participant Nama sebagai deklarasi.
   - Panah interaksi: A->>B: pesan atau A-->>B: respon.
6. ClassDiagram:
   - Gunakan class Nama { atribut; method(); }.
   - Jangan pakai enum, PK, FK, atau tipe data database.
7. StateDiagram:
   - Awal: [*] --> State
   - Transisi antar state: State1 --> State2 : kondisi
8. Semua teks label WAJIB berada dalam tanda kutip ["..."].
   - Jika ada kutip ganda dalam teks, ubah jadi kutip tunggal.
9. Jangan sertakan komentar, catatan, atau teks penjelasan di luar blok Mermaid.
10. Jika tidak yakin jenis diagram, fallback ke flowchart TD.

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
