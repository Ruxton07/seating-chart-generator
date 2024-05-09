import React from "react";
import {
  MdChair,
  MdDesk,
  MdDoorBack,
  MdDoorFront,
  MdDoorSliding,
  MdDraw,
  MdStar,
  MdStarHalf,
  MdStarOutline,
  MdTv,
} from "react-icons/md";

function SeatTypeButton(props: {
  smallText?: boolean;
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick(): void;
}) {
  return (
    <div
      onClick={props.onClick}
      className={`p-4 border w-24 flex items-center justify-center flex-col gap-2 text-center  ${
        props.selected
          ? "border-transparent bg-slate-100"
          : "border-slate-200 hover:bg-slate-50 cursor-pointer"
      }`}
    >
      {props.icon}
      <p className={`${props.smallText ? "text-sm" : ""}`}>{props.label}</p>
    </div>
  );
}
export default function SeatTypeButtons(props: {
  onChange(newSeatType: string): void;
}) {
  return (
    <div className="flex flex-row gap-2 flex-wrap">
      <SeatTypeButton
        onClick={() => props.onChange("seat")}
        icon={<MdChair size={32} />}
        label="Seat"
        selected={true}
      />
      <SeatTypeButton
        icon={<MdTv size={32} />}
        label="TV"
        selected={false}
        onClick={() => props.onChange("TV")}
      />
      <SeatTypeButton
        icon={<MdDesk size={32} />}
        label="Teacher Desk"
        onClick={() => props.onChange("Teacher Desk")}
        selected={false}
        smallText
      />
      <SeatTypeButton
        icon={<MdDoorFront size={32} />}
        onClick={() => props.onChange("Door")}
        label="Door"
        selected={false}
      />
      <SeatTypeButton
        icon={<MdDraw size={32} />}
        label="Board"
        selected={false}
        onClick={() => props.onChange("Board")}
      />
      <SeatTypeButton
        onClick={() => props.onChange("Custom Landmark")}
        icon={<MdStar size={32} />}
        label="Custom Landmark"
        smallText
        selected={false}
      />
    </div>
  );
}
