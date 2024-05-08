import { Student, db } from "@/db/db.model";
import {
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function StudentRow(props: { student: Student; otherStudent: Student }) {
  const s = props.otherStudent;
  if (s.id === props.student.id) return;

  const isBlocked = props.student.blocked?.includes(s.id!);
  const isPaired = !isBlocked && props.student.pairs?.includes(s.id!);

  const relationship = isBlocked ? "BLOCKED" : isPaired ? "PAIRED" : "NONE";

  const [relationshipOptimistic, setRelationshipOptimistic] =
    useState(relationship);
  return (
    <div className="w-full flex justify-between items-center py-2 border-b border-b-slate-200 px-8 gap-20">
      <p>{s.name}</p>

      <FormControl variant="standard" sx={{ width: 160 }}>
        <Select
          value={relationshipOptimistic}
          onChange={(v): any => {
            setRelationshipOptimistic(v.target.value);
            if (isBlocked && v.target.value !== "BLOCKED") {
              const oldBlockListA = s.blocked || [];

              db.students.update(s.id, {
                blocked: oldBlockListA.filter((s2) => s2 !== props.student.id),
              });

              const oldBlockListB = props.student.blocked || [];

              db.students.update(props.student.id, {
                blocked: oldBlockListB.filter((s2) => s2 !== s.id),
              });
            }
            if (isPaired && v.target.value !== "PAIRED") {
              const oldPairListA = s.pairs || [];

              db.students.update(s.id, {
                pairs: oldPairListA.filter((s2) => s2 !== props.student.id),
              });

              const oldPairListB = props.student.pairs || [];

              db.students.update(props.student.id, {
                pairs: oldPairListB.filter((s2) => s2 !== s.id),
              });
            }
            if (v.target.value === "BLOCKED") {
              const oldBlockListA = s.blocked || [];
              oldBlockListA.push(props.student.id!);
              db.students.update(s.id, {
                blocked: oldBlockListA,
              });

              const oldBlockListB = props.student.blocked || [];
              oldBlockListB.push(s.id!);
              db.students.update(props.student.id, {
                blocked: oldBlockListB,
              });
            }
            if (v.target.value === "PAIRED") {
              const oldPairListA = s.pairs || [];
              oldPairListA.push(props.student.id!);
              db.students.update(s.id, {
                pairs: oldPairListA,
              });

              const oldPairListB = props.student.pairs || [];
              oldPairListB.push(s.id!);
              db.students.update(props.student.id, {
                pairs: oldPairListB,
              });
            }
          }}
          label="Relationship"
        >
          <MenuItem value={"NONE"}>No Relationship</MenuItem>
          <MenuItem value={"PAIRED"}>Paired</MenuItem>
          <MenuItem value={"BLOCKED"}>Separated</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
export default function BlockDialog(props: {
  student: Student;
  close(): void;
}) {
  const otherStudents = useLiveQuery(() =>
    db.students.where("period").equals(props.student.period).toArray()
  );

  return (
    <div>
      <div className="mr-16">
        <DialogTitle>Connections for {props.student.name}</DialogTitle>
      </div>
      <IconButton
        aria-label="close"
        onClick={() => {
          props.close();
        }}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      {otherStudents?.map((s, i) => {
        return <StudentRow student={props.student} otherStudent={s} key={i} />;
      })}
      {/* <DialogActions>
          <But autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
    </div>
  );
}
