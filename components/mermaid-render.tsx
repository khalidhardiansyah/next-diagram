/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Stack } from "@phosphor-icons/react";
import mermaid from "mermaid";
import {
  Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { toPng } from "html-to-image";
import ControllButtons from "./control-buttons";
import { AnimatePresence, motion } from "motion/react";

export type Handle = {
  download: () => void;
};

interface mermaidType {
  syntax: string | null;
  show: boolean | undefined;
  type: string;
  loading: boolean | undefined;
  ref: Ref<Handle>;
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
  const [error, setError] = useState<string>("");
  const mermaidRef = useRef<HTMLDivElement>(null);
  const graphContent = useMemo(
    () => syntax?.replaceAll("```", "").replace("mermaid", ""),
    [syntax]
  );

  useEffect(() => {
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
        setError("Error silahkan generate lagi");
      }
    };

    if (syntax) {
      drawDiagram();
    }
  }, [syntax, graphContent]);

  useImperativeHandle(
    ref,
    () => {
      return {
        async download() {
          const svgElement =
            mermaidRef.current?.querySelector<HTMLElement>("#mermaid");
          if (svgElement) {
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
    []
  );

  return (
    <div className="rounded-lg border border-dashed bg-neutral-50  py-5 h-full overflow-auto ">
      {show ? (
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
          {
            <>
              <ControllButtons />
              <TransformComponent
                wrapperClass="min-h-full min-w-full flex justify-center items-center p-20"
                contentClass=" min-w-full min-h-full flex justify-center items-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div
                    className="mermaid min-w-full min-h-full"
                    ref={mermaidRef}
                  ></div>
                </motion.div>
              </TransformComponent>
            </>
          }
        </TransformWrapper>
      ) : loading ? (
        <motion.div
          className="w-full h-full grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Loading...
        </motion.div>
      ) : (
        <motion.div
          className="w-full h-full grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className=" grid place-items-center gap-y-4">
            <Stack size={45} className=" fill-zinc-300" />
            <span className=" capitalize text-zinc-300">
              {type} akan muncul disini setelah diproses
            </span>
          </div>
        </motion.div>
      )}
      {error && (
        <div className="w-full h-full grid place-items-center text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
