import React from "react";
import MovableItem from "./MovableItem";
import { Landmark, Location, Seat } from "@/types/RoomCanvasItem";
import { MdDesk, MdDoorFront, MdDraw, MdStar, MdTv } from "react-icons/md";
export default function MovableLandmark(props: {
  parameters: any;
  landmark: Landmark;
  idx: number;
  onMove(location: Location): void;
}) {
  const name = props.landmark.label;
  const showLabel = true;

  return (
    <MovableItem
      parameters={props.parameters}
      idx={props.idx}
      location={props.landmark.location}
      onMove={props.onMove}
    >
      <div className="w-16 h-16 rounded-full text-2xl flex items-center justify-center bg-orange-100 text-center select-none relative">
        {showLabel && (
          <div className="absolute bottom-full mb-2 font-sans">
            <p>{props.landmark.label}</p>
          </div>
        )}
        {name === "TV" ? (
          <MdTv />
        ) : name === "Teacher Desk" ? (
          <MdDesk />
        ) : name === "Door" ? (
          <MdDoorFront />
        ) : name === "Board" ? (
          <MdDraw />
        ) : (
          <MdStar />
        )}
      </div>
    </MovableItem>
  );
}
