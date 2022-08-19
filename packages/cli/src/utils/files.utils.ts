import fs from 'fs';
import { RecipeConfig } from '../interfaces/recipe-config.interface';

export const loadJSON = (path: string) => {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

export const loadTxt = (path: string) =>
  fs.readFileSync(`${path}.txt`, 'utf-8');

export const getFiles = (recipePath: string, recipeName: string) => {
  const path = `${recipePath}/${recipeName}`;
  const recipeConfig: RecipeConfig = loadJSON(`${path}.config.json`);
  const recipe = loadTxt(`${path}.txt`);

  return { recipeConfig, recipe };
};

export const replaceWithParameter = (
  recipe: string,
  id: string,
  value: string,
) => {
  const regex = new RegExp(`%${id}%`, 'g');
  return recipe.replace(regex, value);
};
