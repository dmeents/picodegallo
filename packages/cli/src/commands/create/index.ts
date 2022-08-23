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

// TODO: accept parameters via command line
// TODO: include ingredients
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
