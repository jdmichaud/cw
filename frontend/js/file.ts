import * as fs from 'fs';
import { FlatCWRepr } from './types';

// Load a flat grid from a file
export function loadCW(filepath: string): FlatCWRepr {
  const content = fs.readFileSync(filepath).toString('utf8');
  const width = content.substr(0, content.indexOf('\n'));
  const cwlines = content.substr(content.indexOf('\n') + 1).replace(/\n/g, '');
  return new FlatCWRepr(
    parseInt(width, 10),
    cwlines,
  );
}

export function loadDict(filepath: string) : string[] {
  return fs.readFileSync(filepath).toString('utf-8').split('\n');
}
