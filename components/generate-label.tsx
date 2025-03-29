import React, { ReactNode } from "react";

interface LabelProps {
  htmlFor: string;
  label: string;
  icon?: ReactNode;
}

export const GenerateLabel = ({ htmlFor, label, icon }: LabelProps) => {
  return (
    <label
      className={`  capitalize sm:text-base text-sm  ${icon && "flex gap-x-1"}`}
      htmlFor={htmlFor}
    >
      {icon}
      <span className={`${icon && " self-end"}`}>{label}</span>
    </label>
  );
};
