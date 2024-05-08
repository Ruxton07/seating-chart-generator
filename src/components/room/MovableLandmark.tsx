import React from "react";
import MovableItem from "./MovableItem";
import { Landmark, Seat } from "@/types/RoomCanvasItem";
import { MdStar } from "react-icons/md";
export default function MovableLandmark(props: {
  parameters: any;
  landmark: Landmark;
}) {
  return (
    <MovableItem
      parameters={props.parameters}
      location={props.landmark.location}
    >
      <div className="w-16 h-16 rounded-full text-2xl flex items-center justify-center bg-orange-100 text-center select-none relative">
        <div className="absolute bottom-full mb-2 font-sans">
          <p>Landmark</p>
        </div>
        <MdStar />
      </div>
    </MovableItem>
  );
}
