import React, { useEffect, useMemo, useState } from "react";

export default function ReferenceItem(props: {
  parameters: any;
  boundingClientRect: DOMRect;
}) {
  const scale = useMemo(
    () => props.parameters.canvasWidth / 750,
    [props.parameters.canvasWidth]
  );
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [show, setShow] = useState(false);
  const [inRegion, setInRegion] = useState(false);

  useEffect(() => {
    if (!props.boundingClientRect) return;

    const mouseMove = (e: MouseEvent) => {
      // @ts-ignore
      setShow(!e.target?.closest(".movable-item"));
      const { clientX, clientY } = e;
      const { width, height, x, y } = props.boundingClientRect;

      const newItemX = ((clientX - x) / width) * 100 - 7.768;
      const newItemY = ((clientY - y) / height) * 100 - 7.768;

      setXPos(Math.round(newItemX / 2) * 2);
      setYPos(Math.round(newItemY / 2) * 2);

      const OFFSET = 20 * scale;
      setInRegion(
        clientX - OFFSET > x &&
          clientX < x + width - OFFSET * 1.5 &&
          clientY - OFFSET > y &&
          clientY < y + height - OFFSET * 1.5
      );
    };

    document.addEventListener("mousemove", mouseMove);

    return () => document.removeEventListener("mousemove", mouseMove);
  }, [props.boundingClientRect]);

  return (
    <div
      className={`absolute pointer-events-none transition-opacity ${
        !inRegion ? "hidden" : show ? "block" : "opacity-20"
      }`}
      style={{
        left: `${xPos}%`,
        top: `${yPos}%`,
      }}
    >
      <div style={{ transform: `scale(${scale})` }} className="w-fit">
        <div className="p-2 border-2 border-transparent">
          <div className="p-2 border-2 border-dashed border-slate-300 w-16 h-16 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
