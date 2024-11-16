import { CustomNote, Note } from "../../utilities/Note";
import { draw } from "../vexflow";
import { storePusher } from "./store_pusher";
import { DurationTool } from "../../utilities/DurationTool";

export function gamme() {
  let inputStave = document.getElementById(
    "input-number-staves",
  ) as HTMLInputElement;
  let inputBeatValue = document.getElementById(
    "input-beat-value",
  ) as HTMLInputElement;
  let inputNumBeat = document.getElementById(
    "input-num-beat",
  ) as HTMLInputElement;
  let inputMaxNote = document.getElementById("max-note") as HTMLInputElement;
  let inputMinNote = document.getElementById("min-note") as HTMLInputElement;
  let inputMaxOctave = document.getElementById(
    "max-octave",
  ) as HTMLInputElement;
  let inputMinOctave = document.getElementById(
    "min-octave",
  ) as HTMLInputElement;
  let inputMaxDuration = document.getElementById(
    "duration-max",
  ) as HTMLInputElement;
  let inputMinDuration = document.getElementById(
    "duration-min",
  ) as HTMLInputElement;
  let inputFirstNote = document.getElementById(
    "first-note",
  ) as HTMLInputElement;
  let inputFirstOctave = document.getElementById(
    "first-octave",
  ) as HTMLInputElement;
  let inputFirstDuration = document.getElementById(
    "duree-premiere-note",
  ) as HTMLInputElement;

  if (
    inputStave === null ||
    inputBeatValue === null ||
    inputNumBeat === null ||
    inputMaxNote === null ||
    inputMinNote === null ||
    inputMaxOctave === null ||
    inputMinOctave === null ||
    inputMaxDuration === null ||
    inputMinDuration === null ||
    inputFirstNote === null ||
    inputFirstOctave === null
  ) {
    throw new Error("No input found");
  }

  let maxNote = new CustomNote(
    inputMaxNote.value as Note,
    parseInt(inputMaxOctave.value),
    "w",
  );
  let minNote = new CustomNote(
    inputMinNote.value as Note,
    parseInt(inputMinOctave.value),
    "w",
  );

  let firstNote = new CustomNote(
    inputFirstNote.value as Note,
    parseInt(inputFirstOctave.value),
    inputFirstDuration.value as "w" | "h" | "q" | "8",
  );

  if (firstNote.higherThan(maxNote) || firstNote.lowerThan(minNote)) {
    throw new Error("Invalid max note");
  }

  const staveNumber = parseInt(inputStave.value);
  const beatValue = 2 ** parseInt(inputBeatValue.value);
  const numBeat = parseInt(inputNumBeat.value);

  const noteValues: ("w" | "h" | "q" | "8")[] = ["w", "h", "q", "8"];
  const noteDurationsArrayRev = [1 / 8, 1 / 4, 1 / 2, 1]; //reversed

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

  let staveArray: CustomNote[][] = [];

  staveArray.push([firstNote]);

  for (let s = 0; s < staveNumber; s++) {
    let spaceLeft = numBeat * noteDurations[beatValue.toString()];

    const stave: CustomNote[] = staveArray[s] ?? [];

    for (let t = 0; t < stave.length; t++) {
      spaceLeft -= noteDurations[stave[t].duration];
    }

    for (let i = stave.length; spaceLeft > 0; i++) {
      const noteLimit = noteDurationsArrayRev.findLastIndex((value) => {
        return value <= spaceLeft;
      });

      const tmpNotesValues = noteValues.slice(-noteLimit - 1);

      const duree =
        tmpNotesValues[Math.floor(Math.random() * tmpNotesValues.length)];

      const note = stave[i - 1]
        ? stave[i - 1].getNext(duree)
        : staveArray[s - 1][staveArray[s - 1].length - 1].getNext(duree);

      stave.push(note);

      spaceLeft -= noteDurations[duree];
    }

    if (staveArray[s]) {
      staveArray[s] = stave;
    } else {
      staveArray.push(stave);
    }
  }

  storePusher(staveArray);
  draw({ staveNumber, beatValue, numBeat });
}
