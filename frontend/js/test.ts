import { checkDefinition } from './cw';
import { checkNoOverlappingWords } from './cw';
import { generateCW } from './cw';
import { getCrossingWords } from './cw';
import { loadCW } from './cw';
import { checkNoEmptyDefinition } from './cw';

const flatCW = loadCW('../../../cw/test.cw');
const wordsList = generateCW(flatCW);
console.log('Words list:', wordsList);
console.log(wordsList[0].value, ':', getCrossingWords(wordsList, wordsList[0]));
console.log(wordsList[1].value, ':', getCrossingWords(wordsList, wordsList[1]));
console.log(wordsList[2].value, ':', getCrossingWords(wordsList, wordsList[2]));
console.log(wordsList[3].value, ':', getCrossingWords(wordsList, wordsList[3]));
console.log(wordsList[4].value, ':', getCrossingWords(wordsList, wordsList[4]));
console.log('checkNoOverlappingWords:', checkNoOverlappingWords(wordsList));
console.log('checkDefinition:', checkDefinition({ flat: flatCW, wordsList: wordsList}));
