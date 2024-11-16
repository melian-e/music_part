import { StaveNote } from "vexflow";

export class Store {
  staveNotesArray: {
    staveNumber: number;
    notes: StaveNote[];
  }[];

  constructor() {
    this.staveNotesArray = [];
  }

  setStaveNoteArray(
    value: {
      staveNumber: number;
      notes: StaveNote[];
    }[],
  ) {
    this.staveNotesArray = value;
  }

  pushStaveNoteArray(value: { staveNumber: number; notes: StaveNote[] }) {
    this.staveNotesArray.push(value);
  }

  getStaveNoteArray() {
    return this.staveNotesArray;
  }
}

const store = new Store();

export default store;
