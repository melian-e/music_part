import { CircularArray } from "./CircularArray";

export type Note = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export class CustomNote {
  public static noteOrder: CircularArray<Note> = new CircularArray(
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
  );

  constructor(
    public note: Note,
    public octave: number,
    public duration: "w" | "h" | "q" | "8",
  ) {}

  public getNext(duration: "w" | "h" | "q" | "8") {
    return new CustomNote(
      CustomNote.noteOrder.next(this.note),
      this.octave + (this.note === "B" ? 1 : 0),
      duration,
    );
  }

  public getPrev(duration: "w" | "h" | "q" | "8") {
    return new CustomNote(
      CustomNote.noteOrder.prev(this.note),
      this.octave - (this.note === "C" ? 1 : 0),
      duration,
    );
  }

  public getMultipleNext(n: number, duration: "w" | "h" | "q" | "8") {
    let note: CustomNote = new CustomNote(this.note, this.octave, duration);
    for (let i = 0; i < n; i++) {
      note = note.getNext(duration);
    }
    return note;
  }

  public getMultiplePrev(n: number, duration: "w" | "h" | "q" | "8") {
    let note: CustomNote = new CustomNote(this.note, this.octave, duration);
    for (let i = 0; i < n; i++) {
      note = note.getPrev(duration);
    }
    return note;
  }

  public getRandomNote(
    min: CustomNote,
    max: CustomNote,
    duration: "w" | "h" | "q" | "8",
    span: number = 1,
  ) {
    let note: CustomNote = new CustomNote(this.note, this.octave, duration);
    let next = this.getMultipleNext(span, duration);
    let prev = this.getMultiplePrev(span, duration);

    const allowNext = next.lowerThan(max);
    const allowPrev = prev.higherThan(min);

    let random = Math.random();

    if (allowNext && allowPrev) {
      if (random < 0.33) {
        return next;
      } else if (random < 0.66) {
        return prev;
      } else {
        return note;
      }
    } else if (allowNext) {
      if (random < 0.5) {
        return next;
      } else {
        return note;
      }
    } else if (allowPrev) {
      if (random < 0.5) {
        return prev;
      } else {
        return note;
      }
    } else {
      return note;
    }
  }

  public lowerThan(other: CustomNote) {
    return (
      this.octave < other.octave ||
      (this.octave === other.octave &&
        CustomNote.noteOrder.indexOf(this.note) <
          CustomNote.noteOrder.indexOf(other.note))
    );
  }

  public higherThan(other: CustomNote) {
    return (
      this.octave > other.octave ||
      (this.octave === other.octave &&
        CustomNote.noteOrder.indexOf(this.note) >
          CustomNote.noteOrder.indexOf(other.note))
    );
  }

  public equals(other: CustomNote) {
    return this.octave === other.octave && this.note === other.note;
  }

  public __str__() {
    return `${this.note}/${this.octave}`;
  }

  public __repr__() {
    return `${this.note}/${this.octave}`;
  }
}
