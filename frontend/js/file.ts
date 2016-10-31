import * as fs from 'fs';
import * as iconv from 'iconv-lite';
import { FlatCWRepr } from './types';

/**
 * Convert from the original latin1 to proper utf8
 * @param buffer {Buffer} Take a javascript Buffer object as returned by readfile
 * @returns a utf-8 encoded string
 */
function fixEncoding(buffer: Buffer) {
  // Convert from an encoded buffer to js string.
  return iconv.decode(buffer, 'latin1');
}

// Load a flat grid from a file
export function loadCW(filepath: string): FlatCWRepr {
  const content = fixEncoding(fs.readFileSync(filepath));
  const width = content.substr(0, content.indexOf('\n'));
  // Remove header and carriage returns
  const cwlines = content.substr(content.indexOf('\n') + 1).replace(/\n/g, '');
  return new FlatCWRepr(
    parseInt(width, 10),
    cwlines,
  );
}

export function loadDict(filepath: string) : string[] {
  return fixEncoding(fs.readFileSync(filepath)).split('\n');
}
