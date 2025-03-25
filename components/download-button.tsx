import React from "react";

type DownloadButtonProps = {
  handleDownload: React.MouseEventHandler<HTMLButtonElement>;
};

function DownloadButton({ handleDownload }: DownloadButtonProps) {
  return (
    <button
      type="button"
      className=" cursor-pointer mt-3 md:mt-0 tracking-wider bg-gray-700 text-white hover:bg-gray-950 min-w-24 max-w-36 min-h-10 capitalize rounded-lg"
      onClick={handleDownload}
    >
      download
    </button>
  );
}

export default DownloadButton;
