#!/usr/bin/env node
/* eslint-disable no-console */
import { Command } from 'commander';

const command = new Command();

command
  .name('install')
  .option('-t', 'test this')
  .action(x => {
    console.log('you made it here', x);
  });

command.parse(process.argv);
