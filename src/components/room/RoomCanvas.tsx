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
import Sidebar from "../sidebar/Sidebar";
import ReferenceItem from "./ReferenceItem";

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

      const newItemX = ((clientX - x) / width) * 100 - 7.768;
      const newItemY = ((clientY - y) / height) * 100 - 7.768;

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
            x: Math.round(newItemX / 2) * 2,
            y: Math.round(newItemY / 2) * 2,
          },
        },
      ]);
    },
    [items]
  );

  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    const c = (e: CustomEvent) => {
      setSelected(e.detail);
    };
    // @ts-ignore
    document.addEventListener("canvasItemSelectionChange", c);

    return () => {
      // @ts-ignore
      document.removeEventListener("canvasItemSelectionChange", c);
    };
  });

  return (
    <div>
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
            return (
              <MovableSeat parameters={itemParameters} seat={item} idx={idx} />
            );
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
        <ReferenceItem
          parameters={itemParameters}
          boundingClientRect={canvasRef.current?.getBoundingClientRect()}
        />
      </div>
      <div className="do-not-deselect">
        <Sidebar>
          {items[selected] && items[selected].type === "SEAT" && (
            <div>
              <h1>{selected}</h1>
              <input
                className="p-4 text-lg bg-slate-100"
                value={items[selected].label}
                onChange={(e) => {
                  setItems((itemsMod) => {
                    const newItems = [...itemsMod];
                    newItems[selected].label = e.target.value;
                    return newItems;
                  });
                }}
              ></input>
              <button
                onClick={() => {
                  setItems((itemsMod) => {
                    const newItems = [...itemsMod];
                    newItems[selected].label = "ABC";
                    return newItems;
                  });
                }}
              >
                Change
              </button>
            </div>
          )}
        </Sidebar>
      </div>
    </div>
  );
}
