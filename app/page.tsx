"use client";
import DownloadButton from "@/components/download-button";
import GenerateButton from "@/components/generate-button";
import GenerateTextArea from "@/components/generate-textarea";
import GenerateSelect from "@/components/generete-select";
import MermaidRender, { Handle } from "@/components/mermaid-render";
import { useState, FormEvent, useRef } from "react";
export default function Home() {
  const [response, setResponse] = useState<string>("");
  const [type, setType] = useState<string>("class diagram");
  const [show, setShow] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();
  const mermaid = useRef<Handle>(null);
  async function generateDiagram(event: FormEvent<HTMLFormElement>) {
    setShow(false);
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/route", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResponse(data.data);
    setShow(true);
    setLoading(false);
  }

  function download() {
    mermaid.current?.download();
  }

  return (
    <main className=" min-h-screen min-w-screen grid justify-items-center items-center overflow-hidden">
      <div className=" bg-slate-50 rounded-lg border border-indigo-200 shadow md:gap-3.5 py-7 px-5 h-4/5  md:w-4/6 flex flex-col">
        <form onSubmit={generateDiagram} className="flex flex-col">
          <GenerateTextArea />
          <div className="flex my-3 md:mt-3 space-x-2 ">
            <GenerateSelect onSelect={(e) => setType(e.currentTarget.value)} />
            <GenerateButton />
          </div>
        </form>
        <MermaidRender
          ref={mermaid}
          syntax={response}
          show={show}
          type={type}
          loading={loading}
        />

        {show && <DownloadButton handleDownload={download} />}
      </div>
    </main>
  );
}
