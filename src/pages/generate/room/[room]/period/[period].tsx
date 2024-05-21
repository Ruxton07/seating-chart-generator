import RoomCanvas from "@/components/room/RoomCanvas";
import RoomDisplay from "@/components/room/RoomDisplay";
import Sidebar from "@/components/sidebar/Sidebar";
import { Student, db } from "@/db/db.model";
import { RoomCanvasItem } from "@/types/RoomCanvasItem";
import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { MdDoorFront, MdGroup, MdPerson, MdRefresh } from "react-icons/md";

export default function Genenator() {
  const router = useRouter();

  const periodId = useMemo(() => {
    if (router.query.period != null) {
      const asNum = parseInt(`${router.query.period}`);
      if (!isNaN(asNum)) {
        return asNum;
      }
    }
    return -1;
  }, [router.query.period]);

  const roomId = useMemo(() => {
    if (router.query.room != null) {
      const asNum = parseInt(`${router.query.room}`);
      if (!isNaN(asNum)) {
        return asNum;
      }
    }
    return -1;
  }, [router.query.room]);

  const period = useLiveQuery(() => {
    if (periodId !== -1) {
      return db.periods.get(periodId);
    }
  }, [periodId]);

  const students = useLiveQuery(() => {
    if (periodId !== -1) {
      return db.students.where("period").equals(periodId).toArray();
    } else {
      return new Promise<Student[]>((resolve) => {
        resolve([]);
      });
    }
  }, [periodId]);

  const room = useLiveQuery(() => {
    if (periodId !== -1) {
      return db.rooms.get(roomId);
    }
  }, [periodId]);

  useEffect(() => {
    // if (period == null) {
    //   router.push("/404");
    // }
  }, []);

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

  const [regenerateKey, setRegenerateKey] = useState(0);

  const seatsRandomized = useMemo(() => {
    console.log("students", students);

    if (!students) return startingItems;

    const people = students.sort((a, b) => 0.5 - Math.random());

    console.log("random", people);
    let studentIdx = 0;
    let seatIdx = 0;

    const seatsWithStudents = [];

    const randomizedIdxs = startingItems
      .filter((i) => i.type === "SEAT")
      .map((_, idx) => idx)
      .sort((a, b) => 0.5 - Math.random())
      .slice(0, people.length);

    console.log("ri", randomizedIdxs, startingItems, people.length);

    const randomizedSeating = startingItems.map((item) => {
      if (item.type === "SEAT") {
        if (!randomizedIdxs.includes(seatIdx)) {
          seatIdx++;
          return {
            ...item,
            label: "",
          };
        }

        const newItem = {
          ...item,
          label: (item.label = people[studentIdx]?.name || ""),
        };

        seatIdx++;

        studentIdx++;
        return newItem;
      } else {
        return item;
      }
    });
    console.log(randomizedSeating);
    return randomizedSeating;
  }, [startingItems, students, regenerateKey]);

  return (
    <div>
      {seatsRandomized && room && (
        <div>
          <RoomDisplay startingItems={seatsRandomized} setLayout={(l) => {}} />
          <div className="do-not-deselect">
            <Sidebar>
              <div>
                <h1>Seating Plan</h1>
                <div className="flex flex-col gap-2">
                  <div
                    className="w-full py-2 bg-emerald-600 flex gap-2 items-center px-4 text-white"
                    onClick={() => {
                      setRegenerateKey(regenerateKey + 1);
                    }}
                  >
                    <MdRefresh /> <p>Regenerate</p>
                  </div>
                  <Link href={`/room/${room.id}`}>
                    <div className="w-full py-2  flex gap-2 items-center px-4 text-black border border-slate-200">
                      <MdDoorFront /> <p>Edit Room</p>
                    </div>
                  </Link>
                  <Link href={`/period/${periodId}`}>
                    <div className="w-full py-2 flex gap-2 items-center px-4 text-black border border-slate-200">
                      <MdGroup /> <p>Edit Period</p>
                    </div>
                  </Link>
                </div>
              </div>
            </Sidebar>
          </div>
        </div>
      )}
    </div>
  );
}
