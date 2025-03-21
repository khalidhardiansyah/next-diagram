"use client";
import mermaid from "mermaid";
import { useEffect } from "react";
export default function MermaidRender() {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
  });
  return (
    <pre className="mermaid">
      {`    graph LR
A --- B
B-->C[fa:fa-ban forbidden]
B-->D(fa:fa-spinner);`}
    </pre>
  );
}
