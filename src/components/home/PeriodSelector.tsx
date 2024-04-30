import { db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useCallback } from "react";
import SidebarSection from "../sidebar/SidebarSection";

export default function PeriodSelector() {
  const periodList = useLiveQuery(() => db.periods.toArray());

  const addPeriod = useCallback(async (name: string) => {
    await db.periods.add({
      name: name,
    });
  }, []);

  return (
    <SidebarSection
      name="Seating Generator"
      includePlusButton
      onPressButton={() => {
        addPeriod("B7");
      }}
    >
      <h1>hello</h1>
      {periodList?.map((p) => (
        <p>{p.name}</p>
      ))}
    </SidebarSection>
  );
}
