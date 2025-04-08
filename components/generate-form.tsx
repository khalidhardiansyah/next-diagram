import React from "react";
import { GenerateLabel } from "@/components/generate-label";
import { PencilSimpleLine } from "@phosphor-icons/react";
import GenerateTextArea from "@/components/generate-textarea";
import GenerateSelect from "@/components/generete-select";
import GenerateButton from "./generate-button";
import ErrorLabel from "./error-label";
export default function GenerateForm({
  onsubmit,
  selected,
  error,
}: {
  onsubmit: React.FormEventHandler<HTMLFormElement>;
  selected: (value: string) => void;
  error: boolean;
}) {
  return (
    <form
      onSubmit={onsubmit}
      className="flex flex-col gap-y-5 md:gap-3.5 py-7 px-5 "
    >
      <div className="flex flex-col gap-y-1 mb-1">
        <GenerateLabel
          icon={<PencilSimpleLine size={24} />}
          htmlFor="generate"
          label="Deskripsi kasus"
        />
        <GenerateTextArea />
        {error && <ErrorLabel msg="Deskripsi kasus tidak boleh kosong" />}
      </div>
      <div className=" flex flex-col gap-y-1 mb-1">
        <GenerateLabel htmlFor="select_diagram" label="jenis diagram" />
        <GenerateSelect onSelect={(e) => selected(e.target.value)} />
      </div>
      <GenerateButton />
    </form>
  );
}
