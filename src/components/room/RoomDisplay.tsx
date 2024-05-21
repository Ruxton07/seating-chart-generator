import { Landmark, RoomCanvasItem, Seat } from "@/types/RoomCanvasItem";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MovableSeat from "./MovableSeat";
import MovableLandmark from "./MovableLandmark";
import MovableTemporary from "./MovableTemporary";
import Sidebar from "../sidebar/Sidebar";
import ReferenceItem from "./ReferenceItem";
import SeatTypeButton from "./SeatTypeButtons";
import SeatTypeButtons from "./SeatTypeButtons";
import DisplaySeat from "./DisplaySeat";
import DisplayLandmark from "./DisplayLandmark";

export default function RoomDisplay(props: {
  startingItems: RoomCanvasItem[];
  setLayout(s: string): void;
}) {
  const paddingAmount = 48;
  const sidebarWidth = 384;
  const navbarHeight = 40;
  const width = Math.min(
    window.innerWidth - sidebarWidth - paddingAmount,
    window.innerHeight - navbarHeight - paddingAmount
  );
  const ASPECT_RATIO = 1;

  const itemParameters = {
    zCurrent: 0,
    canvasWidth: width,
    canvasHeight: width * ASPECT_RATIO,
  };

  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div
        style={{
          width: width,
          height: width * ASPECT_RATIO,
        }}
        ref={canvasRef}
        className="bg-blue-200 relative cursor-crosshair m-6"
      >
        {props.startingItems.map((item, idx) => {
          if (item.hidden) return;
          if (item.type === "SEAT") {
            return (
              <DisplaySeat
                key={idx}
                parameters={itemParameters}
                seat={item}
                idx={idx}
              />
            );
          }
          if (item.type === "LANDMARK") {
            return (
              <DisplayLandmark
                key={idx}
                parameters={itemParameters}
                landmark={item}
                idx={idx}
              />
            );
          }

          if (item.type === "TEMPORARY") {
            return (
              <MovableTemporary
                key={idx}
                parameters={itemParameters}
                area={item}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
