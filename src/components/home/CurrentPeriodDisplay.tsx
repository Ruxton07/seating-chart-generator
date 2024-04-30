import { db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState } from "react";
import SidebarBox from "../sidebar/SidebarBox";
import { Button, ButtonBase, Menu, MenuItem, Select } from "@mui/material";
import { IoAddOutline } from "react-icons/io5";
import { Add } from "@mui/icons-material";
export default function CurrentPeriodDisplay() {
  const [selectedPeriod, setSelectedPeriod] = useState<number>(-1);

  const currentPeriod = useLiveQuery(() => db.periods.get(selectedPeriod));

  return (
    <>
      <SidebarBox>
        <p>
          <strong>{currentPeriod ? "Class" : "Select a Class"}</strong>
        </p>

        <p>
          {currentPeriod
            ? currentPeriod.name
            : "Complete this step to continue"}
        </p>
      </SidebarBox>

      <Menu open className="p-16">
        <MenuItem value={"b"}>Ten</MenuItem>
        <Button startIcon={<Add />} variant="contained">
          New Class
        </Button>
      </Menu>
    </>
  );
}
