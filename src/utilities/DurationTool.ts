export type Note = "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type Duration = "w" | "h" | "q" | "8";

export class DurationTool {
  public dureeOrder: Duration[] = ["w", "h", "q", "8"];
  public dureeValues: {
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

  public inverseDuration: number[] = [1/8, 1/4, 1/2, 1];

  constructor(private minDuration: Duration, private maxDuration: Duration) {
    if (this.dureeOrder.findIndex((value) => value === minDuration) > this.dureeOrder.findIndex((value) => value === maxDuration)) {
      throw new Error("Invalid duration");
    }

    while (this.dureeOrder[0] != minDuration) {
      this.dureeOrder.shift();
      this.inverseDuration.pop();
    }

    while (this.dureeOrder[this.dureeOrder.length - 1] != maxDuration) {
      this.dureeOrder.pop();
      this.inverseDuration.shift();
    }
  }

  public getRandomDuration(spaceLeft: number): Duration {
    const noteLimit = this.inverseDuration.findIndex((value) => {
      return value <= spaceLeft;
    });

    const tmpNotesValues = this.dureeOrder.slice(-noteLimit - 1);

    const duree = tmpNotesValues[Math.floor(Math.random() * tmpNotesValues.length)];

    return duree;
  }
}
