import fs, { writeFileSync } from 'fs';

export const loadJSON = (path: string) => {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

export const loadTxt = (path: string) => fs.readFileSync(path, 'utf-8');

export const saveTxt = (target: string, data: string) =>
  writeFileSync(target, data, 'utf-8');

export const replaceWithParameter = (
  recipe: string,
  id: string,
  value: string,
) => {
  const regex = new RegExp(`%${id}%`, 'g');
  return recipe.replace(regex, value);
};
