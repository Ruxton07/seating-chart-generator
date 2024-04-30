import React from "react";
import PlusButton from "./PlusButton";

export default function SidebarSection(props: {
  name: string;
  includePlusButton?: boolean;
  onPressButton?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex justify-between">
        <h3>{props.name}</h3>
        {props.includePlusButton && (
          <PlusButton onClick={props.onPressButton} />
        )}
      </div>

      <div>{props.children}</div>
    </div>
  );
}
