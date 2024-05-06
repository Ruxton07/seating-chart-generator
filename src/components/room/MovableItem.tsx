import { Location, Seat } from "@/types/RoomCanvasItem";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default function MovableItem(props: {
  parameters: any;
  children: React.ReactNode;
  location: Location;
}) {
  const scale = useMemo(
    () => props.parameters.canvasWidth / 750,
    [props.parameters.canvasWidth]
  );

  const [xPos, setXPos] = useState(props.location.x);
  const [yPos, setYPos] = useState(props.location.y);

  const draggableRef = useRef<HTMLDivElement>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const onStartDrag = useCallback(
    (eInitial: React.MouseEvent) => {
      eInitial.stopPropagation();
      eInitial.preventDefault();
      setIsMouseDown(true);
      const startingX = eInitial.clientX;
      const startingY = eInitial.clientY;

      const onMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startingX;
        const deltaY = e.clientY - startingY;

        const newXPos = xPos + (deltaX / props.parameters.canvasWidth) * 100;
        const newYPos = yPos + (deltaY / props.parameters.canvasHeight) * 100;

        setXPos(Math.max(5, Math.min(95, newXPos)));
        setYPos(Math.max(5, Math.min(95, newYPos)));
      };

      const onMouseUp = (e: MouseEvent) => {
        setIsMouseDown(false);

        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);

      document.addEventListener("mouseup", onMouseUp);

      return () => {
        setIsMouseDown(false);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
    },
    [xPos, yPos, props.parameters]
  );
  return (
    <div
      className="absolute"
      style={{
        left: `${xPos}%`,
        top: `${yPos}%`,
      }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2 w-fit">
        <div style={{ transform: `scale(${scale})` }} className="w-fit">
          <div
            className={`group ${
              isMouseDown
                ? "border-2 cursor-grabbing border-dashed border-sky-500"
                : "cursor-pointer"
            }`}
          >
            <div ref={draggableRef} onMouseDown={onStartDrag} className="p-2">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
