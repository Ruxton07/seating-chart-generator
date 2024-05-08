import React from "react";
import RadioButton from "./RadioButton";

export default function MultiColorRadio(props: {
  options: string[];
  selected: number;
  setSelected(idx: number): void;
}) {
  return (
    <div className="flex">
      {props.options.map((o, i) => {
        return (
          <div className="py-2 px-3 border-r border-r-slate-200">
            <RadioButton
              color={o}
              key={i}
              selected={i === props.selected}
              onClick={() => {
                props.setSelected(i);
              }}
            ></RadioButton>
          </div>
        );
      })}
    </div>
  );
}
