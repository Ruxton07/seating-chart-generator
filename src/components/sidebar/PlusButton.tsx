import React from "react";
import { IoAddOutline } from "react-icons/io5";
export default function PlusButton(props: { onClick?(): void }) {
  return (
    <button onClick={props.onClick}>
      <div className="w-4 h-4 bg-slate-200 flex justify-center items-center">
        <IoAddOutline />
      </div>
    </button>
  );
}
