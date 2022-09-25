import fs, { writeFileSync } from 'fs';
import { ERROR_WRITING_FILE } from '../messages/error.messages';

/**
 *  load and parse JSON
 */
export const loadJSON = (path: string): any => {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

/**
 * helper that loads a text file
 */
export const loadTxt = (path: string) => fs.readFileSync(path, 'utf-8');

/**
 * helper that saves text files to a designated target
 */
export const saveTxt = (target: string, data: string) => {
  /* istanbul ignore next - can't test coverage of local file sync */
  try {
    writeFileSync(target, data, 'utf-8');
  } catch {
    throw Error(ERROR_WRITING_FILE);
  }
};

/**
 * takes the existing picodegallo and replaces pico variables
 * with provided values
 */
export const replaceWithParameter = (
  picodegallo: string,
  id: string,
  value: string,
) => {
  const regex = new RegExp(`%${id}%`, 'g');
  return picodegallo.replace(regex, value).trim();
};
