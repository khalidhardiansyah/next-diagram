import React from "react";

type Props = {
  label: string;
  onclick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function ControllButton({ label, onclick }: Props) {
  return (
    <button
      onClick={onclick}
      className=" bg-black cursor-pointer text-white px-5 tracking-wide rounded-lg"
    >
      {label}
    </button>
  );
}
