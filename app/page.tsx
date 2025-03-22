"use client";
import GenerateButton from "@/components/generate-button";
import GenerateTextArea from "@/components/generate-textarea";
import GenerateSelect from "@/components/generete-select";
import MermaidRender from "@/components/mermaid-render";
import { useState, FormEvent } from "react";
export default function Home() {
  const [loading, setloading] = useState<boolean>(true);
  const [response, setResponse] = useState<string>("");
  async function generateDiagram(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setloading(true);
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/route", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResponse(data.data);
    setloading(false);
  }

  return (
    <main className=" min-h-screen min-w-screen grid justify-items-center items-center">
      <div className="container bg-slate-50 rounded-lg border border-indigo-200 shadow gap-3.5 py-7 px-5 h-3/5 w-4/6 flex">
        <form onSubmit={generateDiagram} className=" h-full flex flex-col">
          <GenerateTextArea />
          <div className="flex mt-3 space-x-2">
            <GenerateSelect />
            <GenerateButton />
          </div>
        </form>
        {loading ? <span>xxx</span> : <MermaidRender syntax={response} />}
      </div>
    </main>
  );
}
