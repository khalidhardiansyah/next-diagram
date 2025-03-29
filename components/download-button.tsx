"use client";
import React from "react";
import { Download } from "@phosphor-icons/react";
type DownloadButtonProps = {
  handleDownload: React.MouseEventHandler<HTMLButtonElement>;
};

function DownloadButton({ handleDownload }: DownloadButtonProps) {
  return (
    <button
      type="button"
      className="cursor-pointer bg-gray-600  min-h-12 tracking-wide  flex justify-center items-center text-white rounded-lg  hover:bg-gray-700 transition-colors delay-75 ease-in-out space-x-1.5 capitalize w-full"
      onClick={handleDownload}
    >
      <Download size={24} />
      <span className="mt-1.5">download</span>
    </button>
  );
}

export default DownloadButton;
