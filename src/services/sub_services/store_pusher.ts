import { StaveNote } from "vexflow";
import { CustomNote } from "../../utilities/Note";
import store from "./store";

export function storePusher(staves: CustomNote[][]) {
  console.log(staves);

  store.setStaveNoteArray([]);

  for (let s = 0; s < staves.length; s++) {
    const notesArray = [];
    for (let n = 0; n < staves[s].length; n++) {
      notesArray.push(
        new StaveNote({
          keys: [staves[s][n].__str__()],
          duration: staves[s][n].duration,
        }),
      );
    }

    store.pushStaveNoteArray({
      staveNumber: s,
      notes: notesArray,
    });
  }
}
