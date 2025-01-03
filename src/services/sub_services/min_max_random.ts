import { CustomNote, Note } from "../../utilities/Note";
import { draw } from "../vexflow";
import { storePusher } from "./store_pusher";
import { Duration, DurationTool } from "../../utilities/DurationTool";

export function minMaxRandom() {
  const inputStave = document.getElementById(
    "input-number-staves",
  ) as HTMLInputElement;
  const inputBeatValue = document.getElementById(
    "input-beat-value",
  ) as HTMLInputElement;
  const inputNumBeat = document.getElementById(
    "input-num-beat",
  ) as HTMLInputElement;
  const inputMaxNote = document.getElementById("max-note") as HTMLInputElement;
  const inputMinNote = document.getElementById("min-note") as HTMLInputElement;
  const inputMaxOctave = document.getElementById(
    "max-octave",
  ) as HTMLInputElement;
  const inputMinOctave = document.getElementById(
    "min-octave",
  ) as HTMLInputElement;
  const inputMaxDuration = document.getElementById(
    "duration-max",
  ) as HTMLInputElement;
  const inputMinDuration = document.getElementById(
    "duration-min",
  ) as HTMLInputElement;
  const inputFirstNote = document.getElementById(
    "first-note",
  ) as HTMLInputElement;
  const inputFirstOctave = document.getElementById(
    "first-octave",
  ) as HTMLInputElement;
  const inputFirstDuration = document.getElementById(
    "duree-premiere-note",
  ) as HTMLInputElement;
  const ecartMax = document.getElementById("ecart-max") as HTMLInputElement;

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
    inputFirstOctave === null ||
    ecartMax === null
  ) {
    throw new Error("No input found");
  }

  const maxNote = new CustomNote(
    inputMaxNote.value as Note,
    parseInt(inputMaxOctave.value),
    "w",
  );
  const minNote = new CustomNote(
    inputMinNote.value as Note,
    parseInt(inputMinOctave.value),
    "w",
  );

  const firstNote = new CustomNote(
    inputFirstNote.value as Note,
    parseInt(inputFirstOctave.value),
    inputFirstDuration.value as "w" | "h" | "q" | "8",
  );

  const ecartMaxValue = parseInt(ecartMax.value);

  if (firstNote.higherThan(maxNote) || firstNote.lowerThan(minNote)) {
    throw new Error("Invalid max note");
  }

  const durationTool = new DurationTool(inputMaxDuration.value as Duration, inputMinDuration.value as Duration);

  const staveNumber = parseInt(inputStave.value);
  const beatValue = 2 ** parseInt(inputBeatValue.value);
  const numBeat = parseInt(inputNumBeat.value);

  const staveArray: CustomNote[][] = [];

  staveArray.push([firstNote]);

  for (let s = 0; s < staveNumber; s++) {
    let spaceLeft = numBeat * durationTool.dureeValues[beatValue.toString()];

    const stave: CustomNote[] = staveArray[s] ?? [];

    for (let t = 0; t < stave.length; t++) {
      spaceLeft -= durationTool.dureeValues[stave[t].duration];
    }

    for (let i = stave.length; spaceLeft > 0; i++) {
      const duree = durationTool.getRandomDuration(spaceLeft);
      const ecart = Math.floor(Math.random() * ecartMaxValue) + 1;

      const note = stave[i - 1]
        ? stave[i - 1].getRandomNote(minNote, maxNote, duree, ecart)
        : staveArray[s - 1][staveArray[s - 1].length - 1].getRandomNote(
            minNote,
            maxNote,
            duree,
            ecart,
          );

      stave.push(note);

      spaceLeft -= durationTool.dureeValues[duree];
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
