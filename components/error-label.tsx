import React from "react";

function ErrorLabel({ msg }: { msg: string }) {
  return <span className=" text-red-600  text-sm md:text-base">{msg}</span>;
}

export default ErrorLabel;
