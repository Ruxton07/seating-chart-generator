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

  const draggableRef = useRef<HTMLDivElement>(null);

  const [isSelect, setIsSelect] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const TIME_TO_SELECT = 300;

  useEffect(() => {
    locationRef.current = { x: xPos, y: yPos };
  }, [xPos, yPos]);

  useEffect(() => {
    const onChangeSelection = (e: CustomEvent) => {
      setIsSelect(e.detail === props.idx);
    };

    // @ts-ignore
    document.addEventListener("canvasItemSelectionChange", onChangeSelection);

    return () => {
      // @ts-ignore
      document.removeEventListener(
        "canvasItemSelectionChange",
        onChangeSelection
      );
    };
  }, []);
  useEffect(() => {
    if (isSelect) {
      const event = new CustomEvent("canvasItemSelectionChange", {
        detail: props.idx,
      });
      document.dispatchEvent(event);

      const onMouseDown = (e: MouseEvent) => {
        let shouldReturn = false;
        document.querySelectorAll(".do-not-deselect").forEach((element) => {
          // @ts-ignore
          if (e.target && element.contains(e.target)) {
            shouldReturn = true;
          }
        });

        if (shouldReturn) return;
        setIsSelect(false);
        const event = new CustomEvent("canvasItemSelectionChange", {
          detail: -1,
        });
        document.dispatchEvent(event);
        e.preventDefault();
        e.stopPropagation();

        document.removeEventListener("mousedown", onMouseDown);
      };

      document.addEventListener("mousedown", onMouseDown);

      return () => {
        document.removeEventListener("mousedown", onMouseDown);
      };
    }
  }, [isSelect]);

  const onStartDrag = useCallback(
    (eInitial: React.MouseEvent) => {
      eInitial.stopPropagation();
      eInitial.preventDefault();
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

        if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
          inSelectWindow = false;
        }
        const newXPos = xPos + (deltaX / props.parameters.canvasWidth) * 100;
        const newYPos = yPos + (deltaY / props.parameters.canvasHeight) * 100;

        const OFFSET = 8.45;

        setXPos(Math.max(8, Math.min(92, newXPos + OFFSET)) - OFFSET);
        setYPos(Math.max(8, Math.min(92, newYPos + OFFSET)) - OFFSET);
      };

      const onMouseUp = (e: MouseEvent) => {
        props.onMove?.(locationRef.current);

        if (isSelect) {
          setIsSelect(false);

          const event = new CustomEvent("canvasItemSelectionChange", {
            detail: -1,
          });
          document.dispatchEvent(event);
        } else if (inSelectWindow) setIsSelect(true);
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
      className="absolute pointer-events-none z-10 movable-item"
      style={{
        left: `${xPos}%`,
        top: `${yPos}%`,
      }}
    >
      <div style={{ transform: `scale(${scale})` }} className="w-fit">
        <div
          className={`group pointer-events-auto ${
            isSelect
              ? "border-2 cursor-text border-dashed border-green-500"
              : isMouseDown
              ? "border-2 cursor-grabbing border-dashed border-sky-500"
              : "border-2 border-transparent cursor-pointer"
          }`}
        >
          <div ref={draggableRef} onMouseDown={onStartDrag} className="p-2">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
