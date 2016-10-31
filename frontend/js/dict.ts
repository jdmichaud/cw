const cache = {};

// Extract N letters word from the dictionnary and return a random one
export function getNLettersWord(dict: string[], N: number) : string {
  function getRandomWord(subdict: string[]) : string {
    return cache[N][Math.floor(Math.random() * cache[N].length)];
  }
  if (cache[N] !== undefined) {
    return getRandomWord(cache[N]);
  }
  cache[N] = dict.filter((word) => word.length === N);
  return getRandomWord(cache[N]);
}

export function toto() {
  console.log('unused');
}
