import reqlib from 'app-root-path';
import * as fs from 'fs';
import { PicoConfig } from '../interfaces/pico-config.interface';
import { RecipeConfig } from '../interfaces/recipe-config.interface';
import { loadJSON } from './files.utils';

/**
 * finds the project root of the current directory and returns a pico config
 * if found
 */
export const getPicoConfig = () => {
  const picoConfigPath = `${reqlib.toString()}/pico.config.json`;
  const data = fs.readFileSync(`${picoConfigPath}`, 'utf-8');
  return JSON.parse(data) as PicoConfig;
};

/**
 * checks known locations for a requested recipe, starting at the user defined path
 */
export const getRecipePath = (picoConfig: PicoConfig, recipe: string) => {
  const projectRoot = reqlib.toString();
  const userDefinedPath = `${projectRoot}/${picoConfig.recipePath}/${recipe}`;
  const currentPath = `./recipes/${recipe}.config.json`;

  // does recipe exist in picoConfig recipePath
  if (fs.existsSync(userDefinedPath)) return userDefinedPath;

  // does recipe exist in current directory
  if (fs.existsSync(currentPath)) return currentPath;

  throw Error('no recipe found');
};

/**
 * helper function that loads the config file from a provided recipe
 * and types it correctly
 */
export const getRecipeConfig = recipePath =>
  loadJSON(`${recipePath}/config.json`) as RecipeConfig;