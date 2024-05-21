import Image from "next/image";
import { Roboto } from "next/font/google";
import CurrentPeriodDisplay from "@/components/home/CurrentPeriodDisplay";
import Sidebar from "@/components/sidebar/Sidebar";
import RoomSelector from "@/components/home/RoomSelector";
import Tabs from "@/components/home/Tabs";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [currentRoom, setCurrentRoom] = useState(-1);
  const [currentPeriod, setCurrentPeriod] = useState(-1);

  const [ready, setReady] = useState(false);
  const tabs = useMemo(() => {
    const returnable = [
      {
        label: "Home",
        link: "/",
      },
    ];

    if (currentRoom !== -1)
      returnable.push({
        label: "Room Editor",
        link: `/room/${currentRoom + 1}`,
      });

    if (currentPeriod !== -1)
      returnable.push({
        label: "Class Editor",
        link: `/period/${currentPeriod + 1}`,
      });
    return returnable;
  }, [currentRoom, currentPeriod]);

  useEffect(() => {
    const storedRoom = localStorage.getItem("currentRoom");
    const storedPeriod = localStorage.getItem("currentPeriod");

    console.log(storedRoom);

    if (storedRoom !== null) {
      setCurrentRoom(Number(storedRoom));
    }
    if (storedPeriod !== null) {
      setCurrentPeriod(Number(storedPeriod));
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (currentRoom !== -1) {
      localStorage.setItem("currentRoom", currentRoom.toString());
    }
  }, [currentRoom]);

  // Save currentPeriod to local storage whenever it changes
  useEffect(() => {
    if (currentPeriod !== -1) {
      localStorage.setItem("currentPeriod", currentPeriod.toString());
    }
  }, [currentPeriod]);

  return (
    <div>
      {ready && (
        <Sidebar>
          <Tabs tabs={tabs} currentTab={0}></Tabs>
          <RoomSelector update={setCurrentRoom} current={currentPeriod} />
          <CurrentPeriodDisplay
            update={setCurrentPeriod}
            current={currentPeriod}
          />
          {currentRoom !== -1 && currentPeriod !== -1 ? (
            <Link
              href={`/generate/room/${currentRoom + 1}/period/${
                currentPeriod + 1
              }`}
            >
              <button className="bg-emerald-600 text-white uppercase text-sm py-2 px-4 tracking-wide rounded-lg ">
                Generate
              </button>
            </Link>
          ) : (
            <p className="text-gray-500 italic text-sm">
              Select a period and room to get started.
            </p>
          )}
        </Sidebar>
      )}
    </div>
  );
}
