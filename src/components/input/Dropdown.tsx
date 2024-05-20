import React, { useEffect, useRef, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
export default function Dropdown(props: {
  options: string[];
  selectMessage: string;
  selected: number;
  defaultMessage: string;
  createNew?(): void;
  select(idx: number): void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const l = (e: MouseEvent) => {
        // @ts-ignore
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("click", l);

      return () => {
        document.removeEventListener("click", l);
      };
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className="px-6 py-4 bg-slate-50 flex flex-col gap-2"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p>
          <strong>{props.defaultMessage}</strong>
        </p>

        <p>{props.options[props.selected] || "None Selected"}</p>
      </div>
      {isOpen && (
        <div className="absolute top-full z-10 bg-white w-full shadow-lg">
          {props.options.map((o, i) => {
            return (
              <div
                className="px-4 py-2 border-x border-b border-slate-100 hover:bg-emerald-50 cursor-pointer flex gap-4 items-center"
                onClick={() => {
                  props.select(i);
                  setIsOpen(false);
                }}
              >
                {i === props.selected && (
                  <span>
                    <MdCheckCircle className="text-emerald-500" />
                  </span>
                )}
                <span>{o}</span>
              </div>
            );
          })}
          {props.createNew && (
            <div
              className="px-4 py-2 border-x border-b border-slate-100 text-gray-500 italic"
              onClick={() => {
                props.createNew?.();
                setIsOpen(false);
              }}
            >
              Create New
            </div>
          )}
        </div>
      )}
    </div>
  );
}
