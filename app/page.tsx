"use client";
import DownloadButton from "@/components/download-button";
import GenerateButton from "@/components/generate-button";
import { GenerateLabel } from "@/components/generate-label";
import GenerateTextArea from "@/components/generate-textarea";
import GenerateSelect from "@/components/generete-select";
import MermaidRender, { Handle } from "@/components/mermaid-render";
import { useState, FormEvent, useRef } from "react";
import { PencilSimpleLine } from "@phosphor-icons/react";
import GenerateHeader from "@/components/generate-header";
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
    <main className=" min-h-screen min-w-screen grid justify-items-center ">
      <div className=" bg-white rounded-lg shadow-xl  my-10  md:w-4/6 flex flex-col overflow-hidden">
        <GenerateHeader />
        <form
          onSubmit={generateDiagram}
          className="flex flex-col gap-y-5 md:gap-3.5 py-7 px-5 "
        >
          <div className="flex flex-col gap-y-1 mb-1">
            <GenerateLabel
              icon={<PencilSimpleLine size={24} />}
              htmlFor="generate"
              label="Deskripsi kasus"
            />
            <GenerateTextArea />
          </div>
          <div className=" flex flex-col gap-y-1 mb-1">
            <GenerateLabel htmlFor="select_diagram" label="jenis diagram" />
            <GenerateSelect onSelect={(e) => setType(e.currentTarget.value)} />
          </div>
          <GenerateButton />
        </form>
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
