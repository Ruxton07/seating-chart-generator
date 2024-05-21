import { Location, Seat } from "@/types/RoomCanvasItem";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default function DisplayItem(props: {
  parameters: any;
  children: React.ReactNode;
  location: Location;
  idx: number;
  onMove?(location: Location): void;
}) {
  const scale = useMemo(
    () => props.parameters.canvasWidth / 750,
    [props.parameters.canvasWidth]
  );

  const [xPos, setXPos] = useState(props.location.x);
  const [yPos, setYPos] = useState(props.location.y);

  const locationRef = useRef(props.location);

  useEffect(() => {
    locationRef.current = { x: xPos, y: yPos };
  }, [xPos, yPos]);

  return (
    <div
      className="absolute pointer-events-none z-10 movable-item"
      style={{
        left: `${xPos}%`,
        top: `${yPos}%`,
      }}
    >
      <div style={{ transform: `scale(${scale})` }} className="w-fit">
        <div className={`group pointer-events-auto`}>
          <div className="p-2">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
