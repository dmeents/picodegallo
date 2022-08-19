#!/usr/bin/env node
/* eslint-disable no-console */
import { Command } from 'commander';
import { writeFileSync } from 'fs';
import { getPicoConfig, getRecipe } from '../../utils/config.utils';
import { getFiles, replaceWithParameter } from '../../utils/files.utils';
import {
  makeQuestionsFromParameters,
  promptRequiredOptions,
  promptUser,
} from '../../utils/prompts.utils';

const command = new Command();

// TODO: accept parameters via command line
// TODO: include ingredients
command
  .name('create')
  .argument('recipe')
  .option('-t, --target <path>', 'where to output the template')
  .action(async (args, opts) => {
    const recipePath = getRecipe(getPicoConfig(), args);
    const { recipeConfig, recipe } = getFiles(recipePath, args);
    const questions = makeQuestionsFromParameters(recipeConfig.parameters);
    let picodegallo = recipe;

    // get base level parameters
    const responses = {
      ...(await promptRequiredOptions(opts, ['target'])),
      ...(await promptUser(questions)),
    };

    // make replacements on base
    Object.keys(responses).forEach(key => {
      picodegallo = replaceWithParameter(picodegallo, key, responses[key]);
    });

    // handle ingredients

    // write new file
    writeFileSync(`${opts.target || responses.target}`, picodegallo, 'utf-8');
  });

command.parse(process.argv);
