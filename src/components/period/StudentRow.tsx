import { Student } from "@/db/db.model";
import React, { useMemo, useState } from "react";
import MultiColorRadio from "../input/MultiColorRadio";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import BlockDialog from "./BlockDialog";

export default function StudentRow(props: {
  student: Student;
  update(c: any): void;
}) {
  const SEATING_TYPES = ["ANYWHERE", "SUPERVISION", "INSTRUCTION"];
  const RADIO_COLORS = ["rgb(132 204 22)", "rgb(239 68 68)", "rgb(59 130 246)"];

  const radioIndex = useMemo(() => {
    if (props.student.seatingType === "INSTRUCTION") return 2;
    if (props.student.seatingType === "SUPERVISION") return 1;
    return 0;
  }, [props.student.seatingType]);

  const numSeparated = props.student.blocked?.length || 0;
  const numPaired = props.student.pairs?.length || 0;

  const [blockedDialogIsOpen, setBlockedDialogIsOpen] = useState(false);

  return (
    <div className="bg-slate-100 flex justify-between items-center">
      <div className="w-80 pl-4">
        <p>{props.student.name}</p>
      </div>
      <div className="flex items-center">
        <div>
          <MultiColorRadio
            options={RADIO_COLORS}
            selected={radioIndex}
            setSelected={(i) => {
              props.update({
                seatingType: SEATING_TYPES[i] as Student["seatingType"],
              });

              console.log({
                ...props.student,
                seatingType: SEATING_TYPES[i] as Student["seatingType"],
              });
            }}
          />
        </div>
        <div
          className="text-gray-400 italic py-2 pl-4 pr-6"
          onClick={() => {
            setBlockedDialogIsOpen(true);
          }}
        >
          <p>
            <span
              className={numPaired === 0 ? "" : "font-bold text-fuchsia-500"}
            >
              {numPaired} paired,{" "}
            </span>
            <span
              className={numSeparated === 0 ? "" : "font-bold text-indigo-500"}
            >
              {numSeparated} separated
            </span>
          </p>
        </div>
      </div>

      <Dialog
        open={blockedDialogIsOpen}
        onClose={() => {
          setBlockedDialogIsOpen(false);
        }}
      >
        <BlockDialog
          student={props.student}
          close={() => {
            setBlockedDialogIsOpen(false);
          }}
        />
      </Dialog>
    </div>
  );
}