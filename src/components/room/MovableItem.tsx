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

  const [isSelect, setIsSelect] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const TIME_TO_SELECT = 500;

  const onSelect = useCallback(() => {
    setIsSelect(true);

    const onMouseDown = (e: MouseEvent) => {
      console.log("myevent");

      setIsSelect(false);

      document.removeEventListener("mousedown", onMouseDown);
    };

    document.addEventListener("mousedown", onMouseDown);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, []);
  const onStartDrag = useCallback(
    (eInitial: React.MouseEvent) => {
      eInitial.stopPropagation();
      eInitial.preventDefault();
      if (isSelect) return;
      setIsMouseDown(true);
      const startingX = eInitial.clientX;
      const startingY = eInitial.clientY;
      let inSelectWindow = true;

      setTimeout(() => {
        inSelectWindow = false;
      }, TIME_TO_SELECT);

      const onMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startingX;
        const deltaY = e.clientY - startingY;

        const newXPos = xPos + (deltaX / props.parameters.canvasWidth) * 100;
        const newYPos = yPos + (deltaY / props.parameters.canvasHeight) * 100;

        setXPos(Math.max(5, Math.min(95, newXPos)));
        setYPos(Math.max(5, Math.min(95, newYPos)));
      };

      const onMouseUp = (e: MouseEvent) => {
        if (inSelectWindow) onSelect();
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
    [xPos, yPos, props.parameters, isSelect]
  );
  return (
    <div
      className="absolute"
      style={{
        left: `${xPos}%`,
        top: `${yPos}%`,
      }}
    >
      <div className="w-fit">
        <div style={{ transform: `scale(${scale})` }} className="w-fit">
          <div
            className={`group ${
              isSelect
                ? "border-2 cursor-text border-dashed border-green-500"
                : isMouseDown
                ? "border-2 cursor-grabbing border-dashed border-sky-500"
                : "cursor-pointer"
            }`}
          >
            <div
              ref={draggableRef}
              onMouseDown={onStartDrag}
              className="p-2 bg-red-100"
            >
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
