#!/usr/bin/env node
/* eslint-disable no-console */
import { Command } from 'commander';
// @ts-ignore
import pkg from '../package.json';

const pico = new Command();
const commandDir = `${__dirname}/commands`;

pico
  .name('pico')
  .version(pkg.version, '-v, --version', 'output the current version')
  .command('create', 'create a recipe', {
    executableFile: `${commandDir}/create/index`,
  });

pico.parse(process.argv);
