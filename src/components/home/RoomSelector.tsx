import { db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import SidebarBox from "../sidebar/Sidebar";
import { Button, ButtonBase, Menu, MenuItem, Select } from "@mui/material";
import { IoAddOutline } from "react-icons/io5";
import { Add } from "@mui/icons-material";
import Dropdown from "../input/Dropdown";
export default function RoomSelector(props: { update(s: number): void }) {
  const [selectedRoom, setSelectedRoom] = useState<number>(-1);

  const allRooms = useLiveQuery(() => db.rooms.toArray());

  const allRoomNames = useMemo(
    () => allRooms?.map((a) => a.name) || [],
    [allRooms]
  );

  const createRoom = useCallback(async () => {
    const roomName = prompt("Enter room name");

    if (!roomName) return;

    const p = await db.rooms.add({
      date: new Date().toISOString(),
      layout: "",
      name: roomName,
    });

    setSelectedRoom(p - 1);
  }, []);

  useEffect(() => {
    props.update(selectedRoom);
  }, [selectedRoom]);
  return (
    <div>
      <Dropdown
        select={setSelectedRoom}
        defaultMessage="Room"
        options={allRoomNames}
        selectMessage="Select a Room"
        selected={selectedRoom}
        createNew={createRoom}
      />
    </div>
  );
}
