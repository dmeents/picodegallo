#!/usr/bin/env node
import { Command } from 'commander';
import * as path from 'path';
// @ts-ignore
import pkg from '../package.json';

const pico = new Command();
const moduleDir = path.dirname(require.resolve('@picodegallo/cli'));

/**
 * instantiates the picodegallo cli and catches top level commands
 */
pico
  .name('pico')
  .version(pkg.version, '-v, --version', 'output the current version')
  .command('create', 'create a recipe', {
    executableFile: `${moduleDir}/commands/create/index.js`,
  });

pico.parse(process.argv);
