"use client";
import { MagicWand } from "@phosphor-icons/react";
export default function GenerateButton() {
  return (
    <button
      className=" cursor-pointer bg-blue-600  min-h-12 tracking-wide  flex justify-center items-center text-white rounded-lg  hover:bg-blue-700 transition-colors delay-75 ease-in-out space-x-1.5"
      type="submit"
    >
      <MagicWand size={24} />
      <span>Hasilkan diagram</span>
    </button>
  );
}
