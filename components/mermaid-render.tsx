"use client";
import mermaid from "mermaid";
import { Ref, RefObject, useEffect, useImperativeHandle, useRef } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ZoomButtons from "./zoom-buttons";
import { btoa } from "buffer";
import { unescape } from "querystring";
import { toPng } from "html-to-image";

interface mermaidType {
  syntax: string | null;
  show: boolean | undefined;
  type: string;
  loading: boolean | undefined;
  ref: any;
}

export default function MermaidRender({
  syntax,
  show,
  type,
  loading,
  ref,
}: mermaidType) {
  mermaid.initialize({
    startOnLoad: false,
    htmlLabels: true,
    flowchart: {
      useMaxWidth: true,
      wrappingWidth: 100,
    },
  });
  const typeDiagram = useRef<string>("");
  useEffect(() => {
    const graphContent = syntax?.replaceAll("```", "").replace("mermaid", "");
    const drawDiagram = async function () {
      const element = document.querySelector(".mermaid");
      try {
        const graph = `${graphContent}`;
        typeDiagram.current = mermaid.detectType(graph);
        const { svg } = await mermaid.render("mermaid", graph);
        if (element) {
          element.innerHTML = svg;
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (syntax) {
      drawDiagram();
    }
  }, [syntax]);

  useImperativeHandle(
    ref,
    () => {
      return {
        async download() {
          if (show) {
            const svgElement = document.querySelector("#mermaid");
            toPng(svgElement, {
              quality: 1,
              pixelRatio: 5,
            })
              .then((dataUrl) => {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = `diagram ${typeDiagram.current}.png`;
                link.click();
              })
              .catch((err) => {
                console.error("Gagal menyimpan gambar:", err);
              });
          }
        },
      };
    },
    [show]
  );

  return (
    <div
      className=" rounded-lg bg-zinc-100 flex-1 max-h-96 overflow-auto"
      ref={ref}
    >
      {show && (
        <TransformWrapper
          initialScale={1}
          pinch={{ step: 5, disabled: false }}
          panning={{ wheelPanning: true, excluded: [] }}
          limitToBounds={false}
          minScale={0.1}
          centerOnInit={true}
          centerZoomedOut={true}
          disablePadding={true}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              <div className=" absolute m-3 flex z-20 space-x-3.5">
                <button
                  onClick={() => zoomIn()}
                  className="px-4 bg-black text-white"
                >
                  +
                </button>
                <button
                  onClick={() => zoomOut()}
                  className="px-4 bg-black text-white"
                >
                  -
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="px-4 bg-black text-white"
                >
                  x
                </button>
              </div>
              <TransformComponent
                wrapperClass=" min-h-full min-w-full  relative flex justify-center items-center p-20"
                contentClass=" min-w-full min-h-full flex justify-center items-center"
              >
                <div className="mermaid min-w-full min-h-full"></div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      )}
    </div>
  );
}

// (
//   <div className=" capitalize  h-full w-full  grid place-items-center">
//     {type}
//   </div>
// )}
// {loading && (
//   <div className=" h-full w-full  grid place-items-center">
//     loading....
//   </div>
// )}
