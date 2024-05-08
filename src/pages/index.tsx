import Image from "next/image";
import { Roboto } from "next/font/google";
import CurrentPeriodDisplay from "@/components/home/CurrentPeriodDisplay";
import Sidebar from "@/components/sidebar/Sidebar";
import RoomSelector from "@/components/home/RoomSelector";
import Tabs from "@/components/home/Tabs";
import { useMemo, useState } from "react";

export default function Home() {
  const [currentRoom, setCurrentRoom] = useState(-1);
  const [currentPeriod, setCurrentPeriod] = useState(-1);

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
        link: `/room/${currentRoom}`,
      });

    if (currentPeriod !== -1)
      returnable.push({
        label: "Class Editor",
        link: `/period/${currentPeriod}`,
      });
    return returnable;
  }, [currentRoom, currentPeriod]);
  return (
    <div>
      <Sidebar>
        <Tabs tabs={tabs} currentTab={0}></Tabs>
        <RoomSelector update={setCurrentRoom} />
        <CurrentPeriodDisplay update={setCurrentPeriod} />
      </Sidebar>
    </div>
  );
}
