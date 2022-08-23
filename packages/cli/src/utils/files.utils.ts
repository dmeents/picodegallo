import fs, { writeFileSync } from 'fs';

/**
 *  load and parse JSON
 */
export const loadJSON = (path: string) => {
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
export const saveTxt = (target: string, data: string) =>
  writeFileSync(target, data, 'utf-8');

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
