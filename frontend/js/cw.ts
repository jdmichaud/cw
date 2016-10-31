// http://www.pallier.org/ressources/dicofr/liste.de.mots.francais.frgut.txt

import { DEFINITION, Direction, FlatCWRepr, Grid, Word } from './types';

// From the flat grid and a position in the lines, create a word object.
// The value is produced by the provided function.
export function generateWord(flatCW: FlatCWRepr, i: number,
                             buildfn: () => string, direction: Direction) : Word {
  const word = {
    x: i % flatCW.width,
    y: Math.floor(i / flatCW.width),
    value: buildfn(),
    length: 0,
    direction: direction,
  };
  word.length = word.value.length;
  return word;
}

// Produce a list of words from a flat grid object
export function createWordsList(flatCW: FlatCWRepr) : Word[] {
  const { width, lines } = flatCW;
  function isFirstLetterHorizontal(i: number) : boolean {
    return (i % width === 0 || (i > 0 && lines[i - 1] === DEFINITION)) &&
      ((i % width) < (width - 1)) && lines[i + 1] !== DEFINITION;
  }
  function isFirstLetterVertical(i: number) : boolean {
    const Y = Math.floor(i / width); // Current Y position
    return (i < width || (i >= width && lines[i - width] === DEFINITION)) &&
      (Y < (lines.length / 4) - 1) && lines[i + width] !== DEFINITION;
  }
  const wordsList : Word[] = [];
  for (let i = 0; i < lines.length; ++i) {
    if (lines[i] === DEFINITION) { continue; } // Ignore definitioN square
    if (isFirstLetterHorizontal(i)) {
      wordsList.push(generateWord(flatCW, i, () => {
        let j;
        for (j = i + 1; ((j % width !== 0) && lines[j] !== DEFINITION); ++j) ;
        return lines.substr(i, j - i);
      }, Direction.Right));
    }
    if (isFirstLetterVertical(i)) {
      wordsList.push(generateWord(flatCW, i, () => {
        let w = lines[i];
        for (let j = i + width; ((j < lines.length) &&
          lines[j] !== DEFINITION); j += width) {
          w += lines[j];
        }
        return w;
      }, Direction.Down));
    }
  }
  return wordsList;
}

export function getCrossingWords(wordsList: Word[], word: Word) : Word[] {
  if (word.direction === Direction.Right) { // Word from left to right
    return wordsList
      .filter((wordItem) => {
        return wordItem !== word &&
          wordItem.direction === Direction.Down &&
          wordItem.x < word.x + word.length && wordItem.x >= word.x &&
          wordItem.y > word.y - wordItem.length && wordItem.y <= word.y;
      });
  } else { // Word going down
    return wordsList
      .filter((wordItem) => {
        return wordItem !== word &&
          wordItem.direction === Direction.Right &&
          wordItem.x > word.x - wordItem.length && wordItem.x <= word.x &&
          wordItem.y < word.y + word.length && wordItem.y >= word.y;
      });
  }
}

export function checkNoOverlappingWords(wordsList: Word[]) : boolean {
  return wordsList.map((word) => {
    return getCrossingWords(wordsList, word).map((crossingWord) => {
      if (word.direction === Direction.Right) {
        return word.value[crossingWord.x - word.x] === crossingWord.value[word.y - crossingWord.y];
      }
      return word.value[crossingWord.y - word.y] === crossingWord.value[word.x - crossingWord.x];
    }).filter((result) => (!result)); // This will return a list of non corresponding letters
  }).filter((list) => list.length !== 0).length === 0; // This will return all the non empty list
}

// Check every word has a definition
export function checkDefinition(grid: Grid) : boolean {
  return grid.wordsList.map((word) => {
    console.log(word);
    if (word.direction === Direction.Right) {
      return grid.flat.getLetter(word.x, word.y - 1) === DEFINITION ||
        grid.flat.getLetter(word.x - 1, word.y - 1) === DEFINITION ||
        grid.flat.getLetter(word.x - 1, word.y) === DEFINITION ||
        grid.flat.getLetter(word.x - 1, word.y + 1) === DEFINITION ||
        grid.flat.getLetter(word.x, word.y + 1) === DEFINITION;
    }
    return grid.flat.getLetter(word.x - 1, word.y) === DEFINITION ||
      grid.flat.getLetter(word.x - 1, word.y - 1) === DEFINITION ||
      grid.flat.getLetter(word.x, word.y - 1) === DEFINITION ||
      grid.flat.getLetter(word.x + 1, word.y - 1) === DEFINITION ||
      grid.flat.getLetter(word.x + 1, word.y) === DEFINITION;
  }).filter((result) => !result).length === 0;
}

export function checkNoEmptyDefinition(grid: Grid) : boolean {
  return true;
}

export function checkContraints(grid: Grid) : boolean {
  return checkNoOverlappingWords(grid.wordsList) &&
    checkDefinition(grid) && checkNoEmptyDefinition(grid);
}
