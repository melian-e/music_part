import { Formatter, Renderer, Stave, StaveNote, Voice } from "vexflow";
import store from "./sub_services/store";
import { CustomNote } from "../utilities/Note";

export function draw(data?: {
  staveNumber?: number;
  numBeat?: number;
  beatValue?: number;
}) {
  const staveNumber = data?.staveNumber ?? 1;
  const beatValue = data?.beatValue ?? 4;
  const numBeat = data?.numBeat ?? 4;

  // Create an SVG renderer and attach it to the DIV element with id="output".
  const div = document.getElementById("output");

  if (div === null || div instanceof HTMLDivElement === false) {
    throw new Error("No output div found");
  }

  const staveWidth = 400;

  let svgs = document.getElementsByTagName("svg");

  if (svgs.length > 0) {
    for (const svg of svgs) {
      svg.remove();
    }
  }

  const renderer = new Renderer(div, Renderer.Backends.SVG);

  // Configure the rendering context.
  renderer.resize(594.95, 604); //size of A4 paper
  const context = renderer.getContext();
  context.setFont("Arial", 10);

  let staves: Stave[] = [];

  for (let i = 0; i < staveNumber; i++) {
    // Create a stave of width 400 at position 0, 40.
    staves.push(new Stave(staveWidth * i, 40, staveWidth));
  }

  // Add a clef and time signature.
  staves[0].addClef("treble").addTimeSignature(`${numBeat}/${beatValue}`);

  for (const stave of staves) {
    // Create a stave of width 400 at position 0, 40.
    stave.setContext(context).draw();
  }

  try {
    for (const staveNotes of store.getStaveNoteArray()) {
      // Create a voice in 4/4 and add above notes
      const voice = new Voice({
        num_beats: numBeat,
        beat_value: beatValue,
      });

      if (staveNotes.notes.length === 0) {
        continue;
      }

      voice.addTickables(staveNotes.notes);

      // Format and justify the notes to 400 pixels.
      new Formatter()
        .joinVoices([voice])
        .format([voice], staveNotes.staveNumber == 0 ? 320 : staveWidth);

      voice.draw(context, staves[staveNotes.staveNumber]);
    }
  } catch (error) {
    console.error(error);
    console.log("No notes to draw");
  }

  svgs = document.getElementsByTagName("svg");

  if (svgs.length === 1) {
    svgs[0].viewBox.baseVal.y = 0;
    svgs[0].viewBox.baseVal.x = 0;
    svgs[0].viewBox.baseVal.width = staveWidth * staveNumber + 1;
    svgs[0].viewBox.baseVal.height = 200;
  }
}

export function update() {
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

  try {
    draw({ staveNumber, beatValue, numBeat });
  } catch (error) {
    console.error(error);
  }
}
