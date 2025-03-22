import React from "react";

interface LabelProps {
  htmlFor: string;
  label: string;
}

export const GenerateLabel = ({ htmlFor, label }: LabelProps) => {
  return <label htmlFor={htmlFor}>{label}</label>;
};
