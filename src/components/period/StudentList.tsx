import { Student, db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useCallback } from "react";
import StudentRow from "./StudentRow";
import BulkAddDialog from "./BulkAddDialog";

export default function StudentList(props: { periodId: number }) {
  const students = useLiveQuery(() =>
    db.students.where("period").equals(props.periodId).toArray()
  );

  const addStudent = useCallback((name: string) => {
    db.students.add({
      name,
      period: props.periodId,
      seatingType: "ANYWHERE",
    });
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2">
        {students?.map((s, i) => (
          <StudentRow
            student={s}
            key={i}
            update={(c: any) => {
              db.students.update(s.id, c).then((v) => console.log(c));
            }}
          />
        ))}
      </div>
      <button
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
    </div>
  );
}
