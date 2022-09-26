import reqlib from 'app-root-path';
import * as fs from 'fs';
import { PicoConfig } from '../interfaces/pico-config.interface';
import { RecipeConfig } from '../interfaces/recipe-config.interface';
import { RecipeModule } from '../interfaces/recipe-modules.interface';
import {
  RECIPE_CONFIG_NOT_FOUND,
  RECIPE_MODULE_NOT_INSTALLED,
  RECIPE_NOT_FOUND,
} from '../messages/error.messages';
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
  const activePath = `./recipes/${recipe}`;

  // does recipe exist in current directory
  if (fs.existsSync(activePath)) return activePath;

  // does recipe exist in picoConfig recipePath
  if (picoConfig.recipePath) {
    const userDefinedPath = `${projectRoot}/${picoConfig?.recipePath}/${recipe}`;
    if (fs.existsSync(userDefinedPath)) return userDefinedPath;
  }

  // does the recipe exist in any of the provided recipes in the picoConfig
  if (picoConfig.recipes && Array.isArray(picoConfig.recipes)) {
    let foundPath = '';

    picoConfig.recipes.find((i: string) => {
      try {
        const { getModuleRecipePath } = require(i) as RecipeModule;
        const pathToTest = `${getModuleRecipePath()}/${recipe}`;

        if (fs.existsSync(pathToTest)) {
          foundPath = pathToTest;
          return true;
        }
      } catch {
        throw Error(RECIPE_MODULE_NOT_INSTALLED);
      }
      return false;
    });

    if (foundPath) return foundPath;
  }

  throw Error(RECIPE_NOT_FOUND);
};

/**
 * helper function that loads the config file from a provided recipe
 * and types it correctly
 */
export const getRecipeConfig = (recipePath: string) => {
  try {
    return loadJSON(`${recipePath}/config.json`) as RecipeConfig;
  } catch {
    throw Error(RECIPE_CONFIG_NOT_FOUND);
  }
};
