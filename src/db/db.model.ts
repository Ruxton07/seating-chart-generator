import Dexie, { Table } from "dexie";

// table inteface
export interface Room {
  id?: number;
  name: string;
  date: string;
  layout: string;
}

// table inteface
export interface Student {
  id?: number;
  name: string;
  seatingType: "ANYWHERE" | "INSTRUCTION" | "SUPERVISION";
  pairs?: number[];
  blocked?: number[];
  period: number;
}

export interface Period {
  id?: number;
  name: string;
}

export class DB extends Dexie {
  // table name is student
  rooms!: Table<Room>;
  students!: Table<Student>;
  periods!: Table<Period>;
  constructor() {
    super("myDb");
    this.version(1).stores({
      rooms: "++id, name, date",
      students: "++id, name, seatingType, pairs*, blocked*, period",
      periods: "++id, name",
    });
  }
}

export const db = new DB(); // export the db
