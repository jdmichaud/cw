const cache = {};

// Extract N letters word from the dictionnary and return a random one
export function getNLettersWord(dict: string[], N: number, regex?: RegExp) : string {
  function getRandomWord(subdict: string[]) : string {
    if (subdict.length === 0) {
      return null;
    }
    return subdict[Math.floor(Math.random() * subdict.length)];
  }
  if (cache[N] === undefined) {
    cache[N] = dict.filter((word) => word.length === N);
  }
  if (regex === undefined) {
    console.log('Doh!');
    return getRandomWord(cache[N]);
  }
  return getRandomWord(cache[N].filter((word) => word.match(regex)));
}

export function toto() {
  console.log('unused');
}
