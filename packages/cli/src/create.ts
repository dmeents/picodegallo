#!/usr/bin/env node
/* eslint-disable no-console */
import { Command } from 'commander';
import * as fs from 'fs';
import { writeFileSync } from 'fs';
import prompts from 'prompts';

const command = new Command();

command
  .name('create')
  .argument('ingredient')
  .option('-t, --target <path>', 'where to output the template')
  .action(async (args, opts) => {
    const recipePath = `./recipes/${args}`;
    const data = fs.readFileSync(`${recipePath}/${args}.config.json`, 'utf-8');
    const recipe = fs.readFileSync(`${recipePath}/${args}.txt`, 'utf-8');
    const config = JSON.parse(data);

    const parameters = config.parameters.map(i =>
      typeof i === 'object' && !Array.isArray(i) && i !== null ? i.name : i,
    );

    const questions = parameters.map(i => ({
      type: 'text',
      name: i,
      message: `Enter the ${i}`,
    }));

    const responses = await prompts(questions);
    let picodegallo = recipe;

    parameters.forEach(i => {
      console.log(i);
      const regex = new RegExp(`%${i.toUpperCase()}%`, 'g');
      picodegallo = picodegallo.replace(regex, responses[i]);
    });

    console.log(opts);

    writeFileSync(
      `${opts.target}.${config.outputExtension}`,
      picodegallo,
      'utf-8',
    );
  });

command.parse(process.argv);
