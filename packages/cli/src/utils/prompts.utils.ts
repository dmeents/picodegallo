import prompts, { PromptObject } from 'prompts';
import { Parameter } from '../interfaces/recipe-config.interface';
import { SimpleObject } from './parameter.utils';

/**
 * uses the parameters object to compose questions to prompt the user for input
 */
export const makeQuestionsFromParameters = (
  target: string,
  paramValues: SimpleObject,
  parameters?: Array<Parameter>,
): Array<PromptObject> => {
  if (!parameters) return [];

  const promptsToAsk = parameters.filter(
    parameter => !paramValues[parameter.id],
  );

  return promptsToAsk.map(param => {
    const message = `Enter value for "${target}" [${param.id}] ${
      param.required ? '(required)' : ''
    }:`;

    return {
      message,
      type: param.type || 'text',
      name: param.id,
      initial: param.initial,
      validate: input => {
        if (param.required && !input) return `Must include a ${param.id}!`;
        return true;
      },
    };
  });
};

/**
 * wraps the prompts.js library to always accept an array of PromptObjects
 */
export const promptUser = async (questions: Array<PromptObject>) =>
  prompts(questions);

/**
 * composes and prompts the user for command line options that are required
 * but not provided in the cli
 */
export const promptRequiredOptions = async (
  opts: any,
  required: Array<string>,
) => {
  const missing = required.filter(opt => !opts[opt]);

  return promptUser(
    missing.map(param => ({
      type: 'text',
      name: param,
      message: `Missing [${param}] (required):`,
      validate: input => {
        if (!input) return `Must include a ${param}`;
        return true;
      },
    })),
  );
};
