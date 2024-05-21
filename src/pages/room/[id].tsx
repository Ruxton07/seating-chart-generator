import RoomCanvas from "@/components/room/RoomCanvas";
import { db } from "@/db/db.model";
import { RoomCanvasItem } from "@/types/RoomCanvasItem";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useRouter } from "next/router";
import { useMemo } from "react";

export default function RoomEditor() {
  const router = useRouter();

  const roomId = useMemo(() => {
    if (router.query.id != null) {
      const asNum = parseInt(`${router.query.id}`);
      if (!isNaN(asNum)) {
        return asNum;
      }
    }
    return -1;
  }, [router.query.id]);

  const room = useLiveQuery(() => {
    if (roomId !== -1) {
      return db.rooms.get(roomId);
    }
  }, [roomId]);

  const parseStr = (s: string) => {
    const asNum = parseFloat(s);
    if (!isNaN(asNum)) return asNum;
    return 0;
  };

  const startingItems = useMemo(() => {
    const str = room?.layout || "";

    const items: RoomCanvasItem[] = [];

    str.split("^").forEach((o) => {
      const parts = o.split("$");
      if (parts.length < 4) return;

      const type = parts[0];

      const location = {
        x: parseStr(parts[1]),
        y: parseStr(parts[2]),
      };

      const label = parts[3];

      console.log(type);

      if (type === "s") {
        items.push({
          type: "SEAT",
          label,
          location,
        });
      } else if (type === "l") {
        items.push({
          type: "LANDMARK",
          label,
          location,
        });
      } else if (type === "o") {
        items.push({
          type:
            label === "i"
              ? "INSTRUCTION"
              : label === "s"
              ? "SUPERVISION"
              : "TEMPORARY",
          location,
        });
      }
    });

    console.log(items);

    return items;
  }, [room?.layout]);
  return (
    <div className="flex justify-start w-full">
      {room && (
        <RoomCanvas
          startingItems={startingItems}
          setLayout={(l) => {
            console.log(l);

            db.rooms.update(roomId, {
              layout: l,
            });
          }}
        />
      )}
    </div>
  );
}
