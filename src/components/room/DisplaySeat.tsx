import React, { useEffect, useState } from "react";
import MovableItem from "./MovableItem";
import { Location, Seat } from "@/types/RoomCanvasItem";
import DisplayItem from "./DisplayItem";

export default function DisplaySeat(props: {
  parameters: any;
  seat: Seat;
  idx: number;
}) {
  return (
    <DisplayItem
      parameters={props.parameters}
      location={props.seat.location}
      idx={props.idx}
    >
      <div
        className={`w-16 h-16 rounded-full text-sm flex items-center justify-center  ${
          props.seat.label ? "bg-black text-white" : "bg-blue-100"
        } text-center select-none relative`}
      >
        <div className="py-2 overflow-hidden text-ellipsis">
          {props.seat.label}
        </div>
      </div>
    </DisplayItem>
  );
}
