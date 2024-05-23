import { Student, db } from "@/db/db.model";
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState, useCallback } from "react";
import StudentRow from "./StudentRow";
import BulkAddDialog from "./BulkAddDialog";

export default function StudentList(props: { periodId: number }) {
  const students = useLiveQuery(() =>
    db.students.where("period").equals(props.periodId).toArray()
  );

  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const addStudent = useCallback((name: string) => {
    db.students.add({
      name,
      period: props.periodId,
      seatingType: "ANYWHERE",
    });
  }, []);

  const deleteStudent = useCallback((id: number) => {
    console.log("Deleting student ", id, " from period ", props.periodId, " while in delete mode: ", isDeleteMode);
    isDeleteMode ? db.students.delete(id) : null;
  }, [isDeleteMode]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex flex-col gap-2">
        {students?.map((s, i) => (
          <StudentRow
            student={s}
            key={i}
            onDelete={() => s.id ? deleteStudent(s.id) : null}
            update={(c: any) => {
              db.students.update(s.id, c).then((v) => console.log(c));
            }}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <button
          className="button"
          onClick={() => {
            const name = prompt("Enter name");
            if (name) {
              addStudent(name);
            }
          }}
        >
          Add Student
        </button>
        <BulkAddDialog />
        <button // Enables delete mode for specific students (any Student name that is clicked on should be removed)
          className="button flex items-center justify-center"
          onClick={() => {
            console.log("Delete mode is was: ", isDeleteMode);
            setIsDeleteMode(!isDeleteMode);
          }}
        ><DeleteIcon className="mr-2" />{isDeleteMode ? 'Exit Delete Mode' : 'Delete Mode'}</button>
        <button
          className="button flex items-center justify-center"
          onClick={() => {
            const confirmation = prompt ("Are you sure you want to clear all students? This action is irreversible Type 'Clear' to confirm.");
            if (confirmation === "Clear") {
              db.students.clear();
            } else {
              alert("Invalid confirmation. Clear action cancelled.");
            }
          }}
        ><ClearIcon className="mr-2" />Clear Students</button>
      </div>
    </div>
  );
}
