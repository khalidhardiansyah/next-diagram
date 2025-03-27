import React from "react";
function GenerateTextArea() {
  return (
    <textarea
      name="generate"
      className="border sm:min-h-24 max-h-24 p-2  w-full rounded-lg resize-none "
      placeholder="Jelaskan skenario atau kebutuhan diagram Anda..."
    ></textarea>
  );
}

export default GenerateTextArea;
