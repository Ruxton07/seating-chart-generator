import React, { useEffect, useState } from "react";
import MovableItem from "./MovableItem";
import { Location, Seat } from "@/types/RoomCanvasItem";

export default function MovableSeat(props: {
  parameters: any;
  seat: Seat;
  idx: number;
  onMove(location: Location): void;
}) {
  return (
    <MovableItem
      parameters={props.parameters}
      location={props.seat.location}
      idx={props.idx}
      onMove={props.onMove}
    >
      <div className="w-16 h-16 rounded-full text-2xl flex items-center justify-center bg-blue-100 text-center select-none relative">
        {props.seat.label}
      </div>
    </MovableItem>
  );
}
