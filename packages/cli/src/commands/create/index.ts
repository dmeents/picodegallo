#!/usr/bin/env node
/* eslint-disable no-console */
import { Command } from 'commander';
import {
  getPicoConfig,
  getRecipeConfig,
  getRecipePath,
} from '../../utils/config.utils';
import { loadTxt, saveTxt } from '../../utils/files.utils';
import { convertOptionStringToObject } from '../../utils/parameter.utils';
import { promptRequiredOptions } from '../../utils/prompts.utils';
import { handleIngredient } from './utils/ingredient.utils';
import { makeReplacements } from './utils/replacement.utils';

const command = new Command();

export interface Options {
  target: string;
  parameters: string;
}

/**
 * handles the creation of some picodegallo, gets config options, prompts user for input
 * and combines ingredients
 *
 * TODO: accept ingredients via command line
 * TODO: allow users to include logic in their recipes
 */
command
  .name('create')
  .argument('recipe')
  .option(
    '-t, --target <path>',
    'where to output the template, and to what file name (eg, ./src/components/my-component.tsx)',
  )
  .option(
    '-p, --parameters <param=value>',
    'a comma delimited string of key=value pairs that will be used instead of prompting for input (eg, name=helloWorld)',
  )
  .action(async (args, opts: Options) => {
    const recipePath = getRecipePath(getPicoConfig(), args);
    const recipeConfig = getRecipeConfig(recipePath);
    const base = loadTxt(`${recipePath}/base.txt`);
    const paramValues = convertOptionStringToObject(opts.parameters || '');
    let picodegallo = await makeReplacements(recipeConfig, base, paramValues);

    for (const ingredient of recipeConfig.ingredients || []) {
      picodegallo = await handleIngredient(ingredient, picodegallo, recipePath);
    }

    const options = {
      ...opts,
      ...(await promptRequiredOptions(opts, ['target'])),
    };

    saveTxt(options.target, picodegallo);
  });

command.parse(process.argv);
