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

export default function RoomCanvas(props: {
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

  const [items, setItems] = useState<RoomCanvasItem[]>(props.startingItems);

  const itemParameters = {
    zCurrent: 0,
    canvasWidth: width,
    canvasHeight: width * ASPECT_RATIO,
  };

  const canvasRef = useRef<HTMLDivElement>(null);

  const maxSeatNumber = useMemo(() => {
    const seatNames = items
      .filter((i) => i.type === "SEAT" && !i.hidden)
      .map((i) => (i as Seat).label);

    let maxSeatNumber = 0;

    seatNames.forEach((v) => {
      const asNum = parseInt(v);
      if (!isNaN(asNum) && maxSeatNumber < asNum) {
        maxSeatNumber = asNum;
      }
    });

    return maxSeatNumber;
  }, [items]);
  const clickToCreate = useCallback(
    (e: React.MouseEvent) => {
      if (!canvasRef.current) return;

      if (!e.currentTarget.isEqualNode(canvasRef.current)) return;

      const { clientX, clientY } = e;
      const { width, height, x, y } = canvasRef.current.getBoundingClientRect();

      const newItemX = ((clientX - x) / width) * 100 - 7.768;
      const newItemY = ((clientY - y) / height) * 100 - 7.768;

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
    [items, maxSeatNumber]
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
  }, []);

  const [inputFocus, setInputFocus] = useState(false);

  useEffect(() => {
    // separated by ^
    // type$x$y$label

    const parts: string[] = items
      .filter((i) => !i.hidden)
      .map((item, idx) => {
        let p = "";

        const x = Math.round(item.location.x * 10) / 10;
        const y = Math.round(item.location.y * 10) / 10;

        if (item.type === "SEAT") {
          const label = item.label.replace(/(\$|\^)/g, "");
          p = `s$${x}$${y}$${label}`;
        } else if (item.type === "LANDMARK") {
          const label = item.label.replace(/(\$|\^)/g, "");
          p = `l$${x}$${y}$${label}`;
        } else {
          p = `o$${x}$${y}$${
            item.type === "INSTRUCTION"
              ? "i"
              : item.type === "SUPERVISION"
              ? "s"
              : "t"
          }`;
        }
        return p;
      });

    props.setLayout(parts.join("^"));
  }, [items]);

  useEffect(() => {
    setInputFocus(false);
  }, [selected]);
  useEffect(() => {
    if (items[selected]) {
      const onKeyDown = (e: KeyboardEvent) => {
        const key = e.keyCode || e.charCode;

        if ((key == 8 || key == 46) && !inputFocus) {
          setSelected(-1);
          setItems((oldItems) => {
            const newItems = [...oldItems];
            newItems[selected].hidden = true;
            return newItems;
          });
        }
        if (e.key === "Escape") {
          setSelected(-1);
          document.dispatchEvent(
            new CustomEvent("canvasItemSelectionChange", {
              detail: -1,
            })
          );
        }
      };

      window.addEventListener("keydown", onKeyDown);

      return () => {
        window.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [selected, inputFocus]);
  return (
    <div>
      <div
        style={{
          width: width,
          height: width * ASPECT_RATIO,
        }}
        ref={canvasRef}
        onMouseDown={clickToCreate}
        className="bg-slate-50 relative cursor-crosshair m-6"
      >
        {items.map((item, idx) => {
          if (item.hidden) return;
          if (item.type === "SEAT") {
            return (
              <MovableSeat
                key={idx}
                parameters={itemParameters}
                seat={item}
                idx={idx}
                onMove={(newLoc) => {
                  setItems((oldItems) => {
                    const newItems = [...oldItems];
                    newItems[idx].location = newLoc;
                    return newItems;
                  });
                }}
              />
            );
          }
          if (item.type === "LANDMARK") {
            return (
              <MovableLandmark
                key={idx}
                parameters={itemParameters}
                landmark={item}
                idx={idx}
                onMove={(newLoc) => {
                  setItems((oldItems) => {
                    const newItems = [...oldItems];
                    newItems[idx].location = newLoc;
                    return newItems;
                  });
                }}
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
        <ReferenceItem
          parameters={itemParameters}
          boundingClientRect={canvasRef.current?.getBoundingClientRect()}
        />
      </div>
      <div className="do-not-deselect">
        <Sidebar>
          {items[selected] &&
          (items[selected].type === "SEAT" ||
            items[selected].type === "LANDMARK") ? (
            <div>
              <h1>Seat</h1>
              <div>
                <h3>Seat Name</h3>
                <input
                  className="p-4 text-lg bg-slate-100"
                  value={(items[selected] as Seat).label}
                  onFocus={() => setInputFocus(true)}
                  onBlur={() => setInputFocus(false)}
                  onChange={(e) => {
                    setItems((itemsMod) => {
                      const newItems = [...itemsMod];
                      (newItems[selected] as Seat).label = e.target.value;
                      return newItems;
                    });
                  }}
                ></input>
              </div>
              <div className="mt-4">
                <h3>Convert To</h3>
                <SeatTypeButtons
                  seatType={
                    items[selected].type === "SEAT"
                      ? "seat"
                      : `$${(items[selected] as Landmark).label}`
                  }
                  onChange={(newType) => {
                    setItems((itemsMod) => {
                      const newItems = [...itemsMod];
                      if (newType === "seat") {
                        newItems[selected].type = "SEAT";
                        (newItems[selected] as Seat).label = `${
                          maxSeatNumber + 1
                        }`;
                      } else {
                        newItems[selected].type = "LANDMARK";
                        (newItems[selected] as Landmark).label = newType;
                      }

                      return newItems;
                    });

                    setTimeout(() => {
                      document.dispatchEvent(
                        new CustomEvent("canvasItemSelectionChange", {
                          detail: selected,
                        })
                      );
                    }, 10);
                  }}
                />
              </div>
            </div>
          ) : (
            <div>
              <h1>This Room</h1>
            </div>
          )}
        </Sidebar>
      </div>
    </div>
  );
}
