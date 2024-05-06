import React from "react";
import MovableItem from "./MovableItem";
import { Landmark, Seat, SpecialArea } from "@/types/RoomCanvasItem";
import { MdStar } from "react-icons/md";
export default function MovableTemporary(props: {
  parameters: any;
  area: SpecialArea;
}) {
  return (
    <MovableItem parameters={props.parameters} location={props.area.location}>
      <div className="w-16 h-16 rounded-full text-2xl flex items-center justify-center bg-orange-100 text-center select-none relative">
        <div className="absolute bottom-full mb-2">
          <div className="w-36 bg-slate-700">
            <div className="text-xl flex gap-2 text-white">
              <p>Seat</p>
              <p>Marker</p>
            </div>
            <input
              type="text"
              value="1"
              className="text-3xl bg-slate-800 text-white w-16"
            ></input>
          </div>
        </div>
        <MdStar />
      </div>
    </MovableItem>
  );
}
