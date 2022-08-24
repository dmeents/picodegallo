import { Ingredient } from '../../../interfaces/recipe-config.interface';
import { replaceWithParameter } from '../../../utils/files.utils';
import { SimpleObject } from '../../../utils/parameter.utils';
import {
  makeQuestionsFromParameters,
  promptUser,
} from '../../../utils/prompts.utils';

/**
 * uses the recipeConfig to create any prompts and then awaits user
 * input. Uses the gathered values to make substitutions in the
 * picodegallo
 */
export const makeReplacements = async (
  ingredient: Ingredient,
  template: string,
  paramValues: SimpleObject = {},
) => {
  const { id, parameters } = ingredient;
  let tempPico = template;

  const questions = makeQuestionsFromParameters(id, paramValues, parameters);
  const responses = await promptUser(questions);

  parameters?.forEach(key => {
    const value = responses[key.id] || paramValues[key.id] || null;
    tempPico = replaceWithParameter(tempPico, key.id, value);
  });

  return tempPico;
};
