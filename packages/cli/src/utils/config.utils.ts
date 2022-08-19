import reqlib from 'app-root-path';
import * as fs from 'fs';
import { PicoConfig } from '../interfaces/pico-config.interface';

export const getPicoConfig = () => {
  const picoConfigPath = `${reqlib.toString()}/pico.config.json`;
  const data = fs.readFileSync(`${picoConfigPath}`, 'utf-8');
  return JSON.parse(data) as PicoConfig;
};

export const getRecipe = (picoConfig: PicoConfig, recipe: string) => {
  const projectRoot = reqlib.toString();
  const userDefinedPath = `${projectRoot}/${picoConfig.recipePath}/${recipe}`;
  const currentPath = `./recipes/${recipe}.config.json`;

  // does recipe exist in picoConfig recipePath
  if (fs.existsSync(userDefinedPath)) return userDefinedPath;

  // does recipe exist in current directory
  if (fs.existsSync(currentPath)) return currentPath;

  throw Error('no recipe found');
};
