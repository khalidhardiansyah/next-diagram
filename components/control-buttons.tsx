import React from "react";
import { useControls } from "react-zoom-pan-pinch";
import ControllButton from "./controll-button";

export default function ControllButtons() {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  const controlButtons = [
    {
      label: "+",
      event: () => zoomIn(),
    },
    {
      label: "-",
      event: () => zoomOut(),
    },
    {
      label: "reset",
      event: () => resetTransform(),
    },
  ];
  return (
    <div className="absolute m-3 flex z-10 w-48 justify-between h-7">
      {controlButtons.map((button, index) => (
        <ControllButton
          key={index}
          label={button.label}
          onclick={button.event}
        />
      ))}
    </div>
  );
}
