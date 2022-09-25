#!/usr/bin/env node
/* eslint-disable no-console */
import { Command } from 'commander';
import {
  getPicoConfig,
  getRecipeConfig,
  getRecipePath,
} from '../../utils/config.utils';
import { loadTxt, saveTxt } from '../../utils/files.utils';
import { promptRequiredOptions } from '../../utils/prompts.utils';
import { handleIngredient } from './utils/ingredient.utils';
import { FlatObject, parseParameters } from './utils/parse.utils';
import { makeReplacements } from './utils/replacement.utils';

const command = new Command();

export interface CreateOptions {
  target: string;
  parameters: Array<string>;
  dryRun: boolean;
}

/**
 * handles the creation of some picodegallo, gets config options, prompts user for input
 * and combines ingredients
 *
 * TODO: accept ingredients via command line (future/tentative)
 * TODO: allow users to include logic in their recipes
 * TODO: allow commas in param/ingredient option values
 * TODO: user defined split character
 */
export const createAction = async (args: string, opts: CreateOptions) => {
  const recipePath = getRecipePath(getPicoConfig(), args);
  const recipeConfig = getRecipeConfig(recipePath);
  const base = loadTxt(`${recipePath}/base.txt`);

  const paramValues = parseParameters(opts.parameters || ['']);
  let picodegallo = await makeReplacements(recipeConfig, base, paramValues);

  for (const ingredient of recipeConfig.ingredients || []) {
    picodegallo = await handleIngredient(ingredient, picodegallo, recipePath);
  }

  const options = {
    ...opts,
    ...(await promptRequiredOptions(opts as unknown as FlatObject, ['target'])),
  };

  if (opts.dryRun) {
    console.log(picodegallo);
  } else {
    saveTxt(options.target, picodegallo);
  }
};

command
  .name('create')
  .argument('recipe')
  .option('--dry-run', "don't output the file, but print it to console instead")
  .option(
    '-t, --target <path>',
    'where to output the template, and to what file name (eg, ./src/components/my-component.tsx)',
  )
  .option(
    '-p, --parameters <param=value...>',
    'a space delimited string of parameter=value pairs that will be used instead of prompting for input (eg, name=helloWorld)',
  )
  .action(createAction);

command.parse(process.argv);
