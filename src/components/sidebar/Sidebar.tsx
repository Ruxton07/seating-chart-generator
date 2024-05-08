import React from "react";

export default function Sidebar(props: { children: React.ReactNode }) {
  return (
    <div className="bg-white shadow-lg fixed right-0 top-0 w-96 h-full p-4 flex flex-col gap-4">
      {props.children}
    </div>
  );
}
