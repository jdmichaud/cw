
// 4
// .A.U
// ACON
// .ERE

const fs = require('fs');

// Load a flat grid from a file
function LoadCW(filepath) {
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
function generateWord(flatCW, i, buildfn) {
  const word = {
    x: i % flatCW.width,
    y: Math.floor(i / flatCW.width),
    value: buildfn(),
  };
  word.length = word.value.length;
  console.log('word:', word);
  return word;
}

// Produce a list of words from a flat grid object
function generateCW(flatCW) {
  const { width, lines } = flatCW;
  // Create a array of 0 as long as the string containing the grid
  // Much simpler in python...
  const mask = [...Array(lines.length)].map((item) => 0);
  const wordsList = [];
  for (let i = 0; i < lines.length; ++i) {
    console.log(lines[i]);
    if (lines[i] === '.') { // Ignore definition square
      mask[i] = 1;
      continue;
    }
    if (mask[i]) continue; // Ignore already selected letter
    // If we find a letter with another letter not already selected on the right, we create a word
    if (((i % width) < (width - 1)) && lines[i + 1] !== '.' && mask[i + 1] === 0) {
      wordsList.push(generateWord(flatCW, i, () => {
        let j;
        for (j = i + 1; ((j % width < width) &&
          lines[j] !== '.' && mask[j] !== 0); ++j) mask[j] = 1;
        return lines.substr(i, j - i + 1);
      }));
    }
    // If we find a letter with another letter not already selected on the bottom, we create a word
    const Y = Math.floor(i / width); // Current Y position
    if ((Y < (lines.length / 4) - 1) && lines[i + width] !== '.' && mask[i + width] === 0) {
      wordsList.push(generateWord(flatCW, i, () => {
        let w = '';
        for (let j = i + width; ((j < lines.length) &&
          lines[j] !== '.' && mask[j] !== 0); j += width) {
          w += lines[j];
          mask[j] = 1;
        }
        return w;
      }));
    }
  }
  return wordsList;
}

// generate_cw(load_cw('/tmp/test.cw'));
