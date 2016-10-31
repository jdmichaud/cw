import { checkDefinition } from './cw';
import { checkNoOverlappingWords } from './cw';
import { createWordsList } from './cw';
import { getCrossingWords } from './cw';
import { checkNoEmptyDefinition } from './cw';

import { loadCW } from './file';
import { loadDict } from './file';

import { getNLettersWord } from './dict';

const flatCW = loadCW('../../../data/test.cw');
const wordsList = createWordsList(flatCW);
console.log('Words list:', wordsList);
console.log(wordsList[0].value, ':', getCrossingWords(wordsList, wordsList[0]));
console.log(wordsList[1].value, ':', getCrossingWords(wordsList, wordsList[1]));
console.log(wordsList[2].value, ':', getCrossingWords(wordsList, wordsList[2]));
console.log(wordsList[3].value, ':', getCrossingWords(wordsList, wordsList[3]));
console.log(wordsList[4].value, ':', getCrossingWords(wordsList, wordsList[4]));
// console.log('checkNoOverlappingWords:', checkNoOverlappingWords(wordsList));
// console.log('checkDefinition:', checkDefinition({ flat: flatCW, entryList: wordsList}));
console.log('loading directionary...');
console.time('DICTLOAD');
const dict = loadDict('../../../data/dict.txt');
console.timeEnd('DICTLOAD');
console.log(dict.length, 'words loaded');
console.time('PICKWORD');
console.log(getNLettersWord(dict, 6));
console.timeEnd('PICKWORD');
console.time('PICKWORD');
console.log(getNLettersWord(dict, 6, /^a..c..$/));
console.timeEnd('PICKWORD');
