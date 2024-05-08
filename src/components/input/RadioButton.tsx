import React from "react";

export default function RadioButton(props: {
  selected: boolean;
  color: string;
  onClick(): void;
}) {
  return (
    <div
      onClick={props.onClick}
      className="h-8 w-8 rounded-full flex justify-center items-center $bg-slate-300"
      style={{
        backgroundColor: props.selected ? props.color : "rgb(226 232 240)",
      }}
    >
      {props.selected && <div className="h-2 w-2 bg-white rounded-full"></div>}
    </div>
  );
}
