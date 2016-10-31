export const DEFINITION = '#';
export const EMPTY = '.';

export class FlatCWRepr {
  constructor(width: number, lines: string) {
    this.width = width;
    this.lines = lines;
  }
  public width: number;
  public lines: string;
  public getLetter(x: number, y: number) : string {
    if (x < 0 || x > this.width || y < 0 || y > this.lines.length / this.width) {
      return '';
    }
    return this.lines[x + y * this.width];
  };
}

export enum Direction {
  Down = 0,
  Right
}

export class Word {
  constructor(x: number, y: number, value: string, direction: Direction) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.length = value.length;
    this.direction = direction;
  }
  public kind: 'word';
  public x: number;
  public y: number;
  public value: string;
  public length: number;
  public direction: Direction;
}

export class Definition {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    length = 0;
  }
  public kind: 'def';
  public x: number;
  public y: number;
  public length: number;
}

export type Entry = Word | Definition;

export class Grid {
  public flat: FlatCWRepr;
  public entryList: Entry[];
  public getWords() : Entry[] {
    return this.entryList.filter((entry) => entry instanceof Word);
  }
  public getEntry(x: number, y: number) : Entry {
    return this.entryList.filter((entry) => entry.x === x && entry.y === y)[0];
  }
}
