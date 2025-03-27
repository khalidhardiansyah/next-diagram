"use client";
import React from "react";
import { Stack, Cube } from "@phosphor-icons/react";
function GenerateHeader() {
  return (
    <div className=" min-h-24 bg-gradient-to-r from-blue-600 to-purple-700 flex justify-between md:px-10 px-5 items-center">
      <div className="flex items-center px-4 sm:space-x-4">
        <Stack size={48} className=" fill-white mr-3" />
        <div className="flex flex-col">
          <h1 className=" text-xl lg:text-3xl text-white capitalize">
            Buat Diagram Instan dengan AI
          </h1>
          <p className=" text-xs text-neutral-50 opacity-90 lg:text-base">
            Ubah deskripsi menjadi diagram visual secara otomatis
          </p>
        </div>
      </div>
      <Cube size={48} className=" fill-white" />
    </div>
  );
}

export default GenerateHeader;
