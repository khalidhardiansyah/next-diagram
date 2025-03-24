import React from "react";
import { useControls } from "react-zoom-pan-pinch";

export default function ZoomButtons() {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="">
      <button
        onClick={() => zoomIn()}
        className=" block bg-black mr-4  text-white w-9 h-9 rounded-full"
      >
        +
      </button>
      <button
        onClick={() => zoomOut()}
        className=" block bg-black mr-4 text-white w-9 h-9 rounded-full"
      >
        -
      </button>
      <button
        onClick={() => resetTransform()}
        className=" block bg-black text-white w-9 h-9 rounded-full"
      >
        reset
      </button>
    </div>
  );
}
