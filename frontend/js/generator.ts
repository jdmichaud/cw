import * as _ from 'lodash';

import { getCrossingWords } from './cw';

import { getNLettersWord } from './dict';

import { Entry } from './types';
import { Direction } from './types';
import { Definition } from './types';
import { Word } from './types';

// Return true on a probability provided as 0.XX
export function makeChoice(probability: number) : boolean {
  return Math.random() < probability;
}

export function randInt(low: number, high: number) : number {
  return Math.floor(Math.random() * (high - low)) + low;
}

export function getRegexConstraint(words: Word[], x: number, y: number,
                                   length: number, direction: Direction) : RegExp {
  // From a grid, a position and direction, get the condition for which a word
  // is valid
  const regex = _.fill(Array(length), '.');
  for (const word of getCrossingWords(words, x, y, length, direction)) {
    regex[direction === Direction.Right ? word.x - x : word.y - y] =
      word.value[direction === Direction.Right ? y - word.y : x - word.x];
  }
  return new RegExp(regex);
}

function isSquareFree(entries: Entry[], x: number, y: number) : boolean {
  return entries.filter((word) => {
    return (word.x === x && word.y + word.length >= y) ||
            (word.y === y && word.x + word.length >= x);
  }).length === 0;
}

export function generateCrossWord(dict: string[], width: number, height: number) : Entry[] {
  function backtracking(entries: Entry[], position: number) : [boolean, Entry[]] {
    if (position === width * height) {
      return [true, entries];
    }
    const x = position % width;
    const y = Math.floor(position / width);
    if (!isSquareFree(entries, x, y)) {
      backtracking(entries, position + 1);
    }
    let newEntry : Entry;
    if (position < width) {
      // On the first line, we'll alternate definition and words and all words
      // will be going downards
      if (entries.filter((entry) => entry.x === x - 1 && entry.y === y)[0].kind !== 'def') {
        newEntry = new Definition(x, y);
      } else {
        const wordMaxLength = (width * height - y);
        const word = getNLettersWord(dict, Math.floor(Math.random() * wordMaxLength));
        newEntry = new Word(x, y, word, Direction.Down);
      }
    } else if (position > width * (height - 1)) {
      // On the last line
    } else {
      // Definition or word?
      if (makeChoice(0.55)) {
        // Word. Down or right?
        const direction = makeChoice(0.5) ? Direction.Down : Direction.Right;
        // Down. Pick a size for the word.
        const length = (direction === Direction.Down) ? randInt(2, (height - y)) : randInt(2, (width - x));
        const value = getNLettersWord(dict, length,
          getRegexConstraint(<Word[]>entries.filter((e) => e.kind === 'word'), x, y, length, direction));
      } else {
        // Definition
        newEntry = new Definition(x, y);
      }
    }
    return [true, [...entries, newEntry]];
  }

  // Always start with a definition
  const [success, entries] = backtracking([new Definition(0, 0)], 2);
  return entries;
}
