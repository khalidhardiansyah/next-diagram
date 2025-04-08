"use client";
import DownloadButton from "@/components/download-button";
import MermaidRender, { Handle } from "@/components/mermaid-render";
import { useState, FormEvent, useRef, useEffect } from "react";
import GenerateHeader from "@/components/generate-header";
import GenerateForm from "@/components/generate-form";
export default function Home() {
  const [response, setResponse] = useState<string>("");
  const [show, setShow] = useState<boolean>();
  const [error, setError] = useState(false);
  const [type, setType] = useState("Class diagram");
  const [loading, setLoading] = useState<boolean>();
  const mermaid = useRef<Handle>(null);
  async function generateDiagram(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    setError(false);

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const textGenerate = formData.get("generate");
    if (!textGenerate) {
      setError(true);
      setLoading(false);
    } else {
      const response = await fetch("/api/route", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResponse(data.data);
      setShow(true);
      setLoading(false);
    }
  }

  function download() {
    mermaid.current?.download();
  }

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <main className=" min-h-screen min-w-screen grid justify-items-center ">
      <div className=" bg-white rounded-lg shadow-xl  my-10  md:w-4/6 flex flex-col overflow-hidden">
        <GenerateHeader />
        <GenerateForm
          onsubmit={generateDiagram}
          selected={setType}
          error={error}
        />
        <div className="mt-2 h-full flex flex-col p-5 bg-zinc-100">
          <h2 className=" mb-4 font-semibold text-xl flex-0">
            Pratinjau Diagram
          </h2>
          <MermaidRender
            ref={mermaid}
            syntax={response}
            show={show}
            type={type}
            loading={loading}
          />
        </div>
        {show && (
          <div className=" bg-white p-5">
            <DownloadButton handleDownload={download} />
          </div>
        )}
      </div>
    </main>
  );
}
