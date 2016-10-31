import { EMPTY } from './types';
import { DEFINITION } from './types';
import { getNLettersWord } from './dict';

// Return true on a probability provided as 0.XX
export function makeChoice(probability: number) : boolean {
  return Math.random() < probability;
}

export function generateCrossWord(dict: string[], width: number, height: number) : string {
  function backtracking(cw: string, position: number) : string {
    if (position === width * height) {
      return cw;
    }
    if (cw[position] !== EMPTY) {
      backtracking(cw, position + 1);
    }
    if (position < width) {
      // On the first line, we'll alternate definition and words and all words
      // will be going downards
      if (cw[cw.length - 1] !== DEFINITION) {
        return cw + DEFINITION;
      } else {
        const wordMaxLength = (width * height - cw.length) / width;
        const word = getNLettersWord(dict, Math.floor(Math.random() * wordMaxLength));
        for (int i = 0; i < word.length; ++i) {}
      }
    }
  }

  // Always start with a definition
  const cw = DEFINITION + [width * height - 1];
  return backtracking(cw, 2);
}
