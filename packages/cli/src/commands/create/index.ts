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
import { handleIngredient } from './utils/handle-ingredient';
import { makeReplacements } from './utils/make-replacements';

const command = new Command();

interface Options {
  target: string;
}

/**
 * handles the creation of some picodegallo, gets config options, prompts user for input
 * and combines ingredients
 *
 * TODO: accept parameters via command line
 * TODO: accept ingredients via command line
 * TODO: allow users to include logic in their recipes
 */
command
  .name('create')
  .argument('recipe')
  .option(
    '-t, --target <path>',
    'where to output the template, and the file name',
  )
  .action(async (args, opts: Options) => {
    const recipePath = getRecipePath(getPicoConfig(), args);
    const recipeConfig = getRecipeConfig(recipePath);
    const base = loadTxt(`${recipePath}/base.txt`);
    let picodegallo = await makeReplacements(recipeConfig, base);

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
