#!/usr/bin/env node
/* eslint-disable no-console */
import { program } from 'commander';
// @ts-ignore
import pkg from '../package.json';

program
  .version(pkg.version, '-v, --version', 'output the current version')
  .command('install', 'test this', {
    executableFile: `${__dirname}/pico-install`,
  });

program.parse(process.argv);
