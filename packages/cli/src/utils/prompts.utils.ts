import prompts, { PromptObject } from 'prompts';
import { Parameter } from '../interfaces/recipe-config.interface';

export const makeQuestionsFromParameters = (
  target: string,
  parameters?: Array<Parameter>,
): Array<PromptObject> => {
  if (!parameters) return [];

  return parameters.map(param => {
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
