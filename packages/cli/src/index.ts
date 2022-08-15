#!/usr/bin/env node
/* eslint-disable no-console */
import { Command } from 'commander';
// @ts-ignore
import pkg from '../package.json';

const pico = new Command();

pico
  .name('pico')
  .version(pkg.version, '-v, --version', 'output the current version')
  .command('create', 'test this', {
    executableFile: `${__dirname}/create`,
  });

pico.parse(process.argv);
