import Link from "next/link";
import React from "react";

export default function Tabs(props: {
  tabs: {
    label: string;
    link: string;
  }[];
  currentTab: number;
}) {
  return (
    <div className="fixed top-4 left-4 z-20 flex gap-2">
      {props.tabs.map((t, i) => {
        const inner = (
          <div
            className={`border bg-white border-slate-200 px-4 py-2 text-sm shadow-inner ${
              i === props.currentTab
                ? "font-bold"
                : "hover:bg-blue-50 cursor-pointer"
            }`}
          >
            {t.label}
          </div>
        );

        if (i === props.currentTab) return inner;
        else return <Link href={t.link}>{inner}</Link>;
      })}
    </div>
  );
}
