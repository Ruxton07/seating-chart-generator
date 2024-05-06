import StudentList from "@/components/period/StudentList";
import RoomCanvas from "@/components/room/RoomCanvas";
import { db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

export default function PeriodEditor() {
  const router = useRouter();

  const periodId = useMemo(() => {
    if (router.query.id) {
      const asNum = parseInt(`${router.query.id}`);
      if (!isNaN(asNum)) {
        return asNum;
      }
    }
    return -1;
  }, [router.query.id]);

  const period = useLiveQuery(() => {
    if (periodId !== -1) {
      return db.periods.get(periodId);
    }
  }, [periodId]);

  useEffect(() => {
    // if (period == null) {
    //   router.push("/404");
    // }
  }, []);

  return <div>{period && <StudentList periodId={periodId} />}</div>;
}
