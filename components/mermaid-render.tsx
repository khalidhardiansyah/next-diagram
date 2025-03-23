"use client";
import mermaid from "mermaid";
import { useEffect, useState } from "react";

interface mermaidType {
  syntax: string | null;
  show: boolean | undefined;
  type: string;
  loading: boolean | undefined;
}

export default function MermaidRender({
  syntax,
  show,
  type,
  loading,
}: mermaidType) {
  mermaid.initialize({
    startOnLoad: false,
    htmlLabels: true,
    flowchart: {},
  });
  const graphContent = syntax?.replaceAll("```", "").replace("mermaid", "");
  const [renderDone, setRenderDone] = useState<boolean | undefined>();
  useEffect(() => {
    const drawDiagram = async function () {
      setRenderDone(false);
      const element = document.querySelector(".mermaid");
      const graph = `${graphContent}`;
      const { svg } = await mermaid.render("mermaid", graph);
      if (element) {
        element.innerHTML = svg;
      }
    };

    if (syntax) {
      drawDiagram();
      setRenderDone(true);
    }
  }, [graphContent, syntax]);

  function zoomIn() {
    if (renderDone) {
      const svgEl = document.querySelector("#mermaid");
    }
  }
  return (
    <div className="grid place-items-center  rounded-lg bg-zinc-100 flex-1 overflow-auto relative">
      {show ? (
        <div className="mermaid"></div>
      ) : (
        <div className=" capitalize">{type}</div>
      )}

      {renderDone ? (
        <div className="buttons absolute bottom-0 space-x-2.5">
          <button
            className="bg-black h-9 w-9 rounded-full text-white cursor-pointer"
            onClick={zoomIn}
          >
            +
          </button>
          <button className="bg-black h-9 w-9 rounded-full text-white">
            -
          </button>
        </div>
      ) : null}

      {loading ? (
        <div className="loading absolute h-full w-full bg-blue-trans  grid place-items-center">
          loading....
        </div>
      ) : null}
    </div>
  );
}
