import { db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import SidebarBox from "../sidebar/Sidebar";
import { Button, ButtonBase, Menu, MenuItem, Select } from "@mui/material";
import { IoAddOutline } from "react-icons/io5";
import { Add } from "@mui/icons-material";
import Dropdown from "../input/Dropdown";
export default function CurrentPeriodDisplay(props: {
  update(s: number): void;
}) {
  const [selectedPeriod, setSelectedPeriod] = useState<number>(-1);

  const allPeriods = useLiveQuery(() => db.periods.toArray());

  const allPeriodNames = useMemo(
    () => allPeriods?.map((a) => a.name) || [],
    [allPeriods]
  );

  const createPeriod = useCallback(async () => {
    const periodName = prompt("Enter period name");

    if (!periodName) return;

    const p = await db.periods.add({
      name: periodName,
    });

    setSelectedPeriod(p - 1);
  }, []);

  useEffect(() => {
    props.update(selectedPeriod);
  }, [selectedPeriod]);

  return (
    <div>
      <Dropdown
        select={setSelectedPeriod}
        defaultMessage="Class"
        options={allPeriodNames}
        selectMessage="Select a Class"
        selected={selectedPeriod}
        createNew={createPeriod}
      />
    </div>
  );
}
