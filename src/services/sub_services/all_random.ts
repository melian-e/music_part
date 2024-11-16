import { StaveNote } from "vexflow";
import store from "./store";
import { draw } from "../vexflow";

export function allRandom() {
    let inputStave = document.getElementById(
      "input-number-staves",
    ) as HTMLInputElement;
    let inputBeatValue = document.getElementById(
      "input-beat-value",
    ) as HTMLInputElement;
    let inputNumBeat = document.getElementById(
      "input-num-beat",
    ) as HTMLInputElement;
  
    if (inputStave === null || inputBeatValue === null || inputNumBeat === null) {
      throw new Error("No input found");
    }
  
    const staveNumber = parseInt(inputStave.value);
    const beatValue = 2 ** parseInt(inputBeatValue.value);
    const numBeat = parseInt(inputNumBeat.value);
  
    const notes = [
      "c/4",
      "d/4",
      "e/4",
      "f/4",
      "g/4",
      "a/4",
      "b/4",
      "c/5",
      "d/5",
      "e/5",
      "f/5",
      "g/5",
      "a/5",
      "b/5",
      "c/6",
    ];
  
    const noteValues = ["w", "h", "q", "8"];
    const noteDurationsArray = [1 / 8, 1 / 4, 1 / 2, 1]; //reversed
  
    const noteDurations: {
      [key: string]: number;
    } = {
      "8": 1 / 8,
      "4": 1 / 4,
      "2": 1 / 2,
      "1": 1,
      q: 1 / 4,
      h: 1 / 2,
      w: 1,
    };
  
    store.setStaveNoteArray([]);
  
    for (let s = 0; s < staveNumber; s++) {
      let spaceLeft = numBeat * noteDurations[beatValue.toString()];
  
      const notesArray: StaveNote[] = [];
      for (let i = 0; spaceLeft > 0; i++) {
        const noteLimit = noteDurationsArray.findLastIndex((value) => {
          return value <= spaceLeft;
        });
  
        const tmpNotesValues = noteValues.slice(-noteLimit - 1);
  
        const value =
          tmpNotesValues[Math.floor(Math.random() * tmpNotesValues.length)];
  
        const note = notes[Math.floor(Math.random() * notes.length)];
        notesArray.push(
          new StaveNote({
            keys: [note],
            duration: value,
          }),
        );
  
        spaceLeft -= noteDurations[value];
      }
  
      store.pushStaveNoteArray({
        staveNumber: s,
        notes: notesArray,
      });
    }
  
    console.log(store.getStaveNoteArray());
  
    draw({ staveNumber, beatValue, numBeat });
  }