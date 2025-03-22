"use client";
import mermaid from "mermaid";
import { useEffect } from "react";
export default function MermaidRender({ syntax }: { syntax: string }) {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });

    if (syntax) {
      mermaid.contentLoaded();
    }
  }, [syntax]);
  return (
    <div className="mermaid">
      {`    ${syntax.replaceAll("```", "").replace("mermaid", "")}
      `}
    </div>
  );
}
