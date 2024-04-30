import React from "react";

export default function SidebarBox(props: { children: React.ReactNode }) {
  return (
    <div className="p-8 bg-slate-100 flex flex-col gap-2">{props.children}</div>
  );
}
