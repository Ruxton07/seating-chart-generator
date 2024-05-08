export type Location = {
  x: number;
  y: number;
};
export type Seat = {
  type: "SEAT";
  label: string;
  location: Location;
};

export type Landmark = {
  type: "LANDMARK";
  label: string;
  location: Location;
};

export type SpecialArea = {
  type: "SUPERVISION" | "INSTRUCTION" | "TEMPORARY";
  location: Location;
};

type RoomCanvasItem = Seat | Landmark | SpecialArea;

export type { RoomCanvasItem };
