import { ChangeEventHandler } from "react";

const diagrams = [
  {
    value: "class diagram",
    label: "class Diagram",
  },
  {
    value: "flowchart",
    label: "flowchart",
  },
  {
    value: "sequence diagram",
    label: "sequence Diagram",
  },
  {
    value: "entity relation diagram",
    label: "entity relation Diagram",
  },
];

function GenerateSelect({
  onSelect,
}: {
  onSelect: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <select
      onChange={onSelect}
      name="select_diagram"
      id="select_diagram"
      defaultValue="class diagram"
      className="border rounded-lg px-2 capitalize "
    >
      {diagrams.map((item, index) => (
        <option key={index} value={item.value} className="block p-6">
          {item.label}
        </option>
      ))}
    </select>
  );
}

export default GenerateSelect;
