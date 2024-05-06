import { RoomCanvasItem, Seat } from "@/types/RoomCanvasItem";
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

export default function RoomCanvas() {
  const width = 500;
  const ASPECT_RATIO = 1;

  const [items, setItems] = useState<RoomCanvasItem[]>([]);

  const itemParameters = {
    zCurrent: 0,
    canvasWidth: width,
    canvasHeight: width * ASPECT_RATIO,
  };

  useEffect(() => {
    // setItems([
    //   ...items,
    //   {
    //     type: "SEAT",
    //     label: "1",
    //     location: {
    //       x: 25,
    //       y: 50,
    //     },
    //   },
    //   {
    //     type: "LANDMARK",
    //     label: "TV",
    //     location: {
    //       x: 25,
    //       y: 20,
    //     },
    //   },
    // ]);
  }, []);

  const canvasRef = useRef<HTMLDivElement>(null);

  const clickToCreate = useCallback(
    (e: React.MouseEvent) => {
      if (!canvasRef.current) return;
      console.log(e.currentTarget);

      if (!e.currentTarget.isEqualNode(canvasRef.current)) return;

      const { clientX, clientY } = e;
      const { width, height, x, y } = canvasRef.current.getBoundingClientRect();

      const newItemX = ((clientX - x) / width) * 100;
      const newItemY = ((clientY - y) / height) * 100;

      const seatNames = items
        .filter((i) => i.type === "SEAT")
        .map((i) => (i as Seat).label);

      let maxSeatNumber = 0;

      seatNames.forEach((v) => {
        const asNum = parseInt(v);
        if (!isNaN(asNum) && maxSeatNumber < asNum) {
          maxSeatNumber = asNum;
        }
      });

      setItems([
        ...items,
        {
          type: "SEAT",
          label: `${maxSeatNumber + 1}`,
          location: {
            x: newItemX,
            y: newItemY,
          },
        },
      ]);
    },
    [items]
  );

  return (
    <div
      style={{
        width: width,
        height: width * ASPECT_RATIO,
      }}
      ref={canvasRef}
      onMouseDown={clickToCreate}
      className="bg-slate-50 relative cursor-crosshair"
    >
      {items.map((item, idx) => {
        console.log(item, itemParameters);

        if (item.type === "SEAT") {
          return <MovableSeat parameters={itemParameters} seat={item} />;
        }
        if (item.type === "LANDMARK") {
          return (
            <MovableLandmark parameters={itemParameters} landmark={item} />
          );
        }

        if (item.type === "TEMPORARY") {
          return <MovableTemporary parameters={itemParameters} area={item} />;
        }
      })}
    </div>
  );
}
