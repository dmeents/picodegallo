import prompts, { PromptObject } from 'prompts';
import { Parameters } from '../interfaces/recipe-config.interface';

export const makeQuestionsFromParameters = (
  parameters?: Array<Parameters>,
): Array<PromptObject> => {
  if (!parameters) return [];

  return parameters.map(param => {
    const message = `Enter parameter [${param.id}] ${
      param.required ? '(required)' : null
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

export const promptUser = async (questions: Array<PromptObject>) =>
  prompts(questions);

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
