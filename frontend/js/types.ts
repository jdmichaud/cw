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
  public x: number;
  public y: number;
  public value: string;
  public length: number;
  public direction: Direction;
}

export class Grid {
  public flat: FlatCWRepr;
  public wordsList: Word[];
}
