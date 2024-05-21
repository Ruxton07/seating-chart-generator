export type Location = {
  x: number;
  y: number;
};
export type Seat = {
  type: "SEAT";
  label: string;
  location: Location;
  hidden?: boolean;
};

export type Landmark = {
  type: "LANDMARK";
  label: string;
  location: Location;
  hidden?: boolean;
};

export type SpecialArea = {
  type: "SUPERVISION" | "INSTRUCTION" | "TEMPORARY";
  location: Location;
  hidden?: boolean;
};

type RoomCanvasItem = Seat | Landmark | SpecialArea;

export type { RoomCanvasItem };
