import prompts, { PromptObject } from 'prompts';
import { FlatObject } from '../commands/create/utils/parse.utils';
import { Parameter } from '../interfaces/recipe-config.interface';
import {
  invalidPromptInput,
  missingRequiredInput,
  promptMessage,
} from '../messages/prompt.messages';

export const validateInput = (field: Parameter, input: any) => {
  if (field.required && !input) return invalidPromptInput(field.id);
  return true;
};

/**
 * uses the parameters object to compose questions to prompt the user for input
 */
export const makeQuestionsFromParameters = (
  ingredient: string,
  paramValues: FlatObject,
  parameters?: Array<Parameter>,
): Array<PromptObject> => {
  if (!parameters) return [];

  const promptsToAsk = parameters.filter(
    parameter => !paramValues[parameter.id],
  );

  return promptsToAsk.map(param => {
    return {
      message: promptMessage(ingredient, param.id, param.required),
      type: param.type || 'text',
      name: param.id,
      initial: param.initial,
      validate: input => validateInput(param, input),
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
  opts: FlatObject,
  required: Array<string>,
) => {
  const missing = required.filter(opt => !opts[opt]);

  if (missing.length === 0) return [];

  return promptUser(
    missing.map(param => ({
      type: 'text',
      name: param,
      message: missingRequiredInput(param),
      validate: input => validateInput({ required: true, id: param }, input),
    })),
  );
};
