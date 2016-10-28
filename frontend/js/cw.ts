
// 4
// .A.U
// ACON
// .ERE

const fs = require('fs');

class FlatCWRepr {
  width: number;
  lines: string;
}

class Word {
  x: number;
  y: number;
  value: string;
  length: number;
}

// Load a flat grid from a file
function loadCW(filepath): FlatCWRepr {
  const content = fs.readFileSync(filepath).toString('utf8');
  const width = content.substr(0, content.indexOf('\n'));
  const cwlines = content.substr(content.indexOf('\n') + 1).replace(/\n/g, '');
  return {
    width: parseInt(width, 10),
    lines: cwlines,
  };
}

// From the flat grid and a position in the lines, create a word object.
// The value is produced by the provided function.
function generateWord(flatCW: FlatCWRepr, i: number, buildfn: () => string) : Word {
  const word = {
    x: i % flatCW.width,
    y: Math.floor(i / flatCW.width),
    value: buildfn(),
    length: 0,
  };
  word.length = word.value.length;
  return word;
}

// Produce a list of words from a flat grid object
function generateCW(flatCW: FlatCWRepr) : Word[] {
  const { width, lines } = flatCW;
  function isFirstLetterHorizontal(i) : boolean {
    return (i % width === 0 || (i > 0 && lines[i - 1] === '.')) &&
      ((i % width) < (width - 1)) && lines[i + 1] !== '.';
  }
  function isFirstLetterVertical(i) : boolean {
    const Y = Math.floor(i / width); // Current Y position
    return (i < width || (i >= width && lines[i - width] === '.')) &&
      (Y < (lines.length / 4) - 1) && lines[i + width] !== '.';
  }
  const wordsList : Word[] = [];
  for (let i = 0; i < lines.length; ++i) {
    if (lines[i] === '.') continue; // Ignore definition square
    if (isFirstLetterHorizontal(i)) {
      wordsList.push(generateWord(flatCW, i, () => {
        let j;
        for (j = i + 1; ((j % width !== 0) && lines[j] !== '.'); ++j) ;
        return lines.substr(i, j - i);
      }));
    }
    if (isFirstLetterVertical(i)) {
      wordsList.push(generateWord(flatCW, i, () => {
        let w = lines[i];
        for (let j = i + width; ((j < lines.length) &&
          lines[j] !== '.'); j += width) {
          w += lines[j];
        }
        return w;
      }));
    }
  }
  return wordsList;
}

console.log(generateCW(loadCW('../../../cw/test.cw')));
