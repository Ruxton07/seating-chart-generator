import RoomCanvas from "@/components/room/RoomCanvas";
import React, { useRouter } from "next/router";

export default function RoomEditor() {
  const router = useRouter();
  const roomId = router.query.id;

  return (
    <div>
      <RoomCanvas />
    </div>
  );
}
