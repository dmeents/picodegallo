import { Ingredient } from '../../../interfaces/recipe-config.interface';
import { replaceWithParameter } from '../../../utils/files.utils';
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
) => {
  const { id, parameters } = ingredient;
  let tempPico = template;

  const questions = makeQuestionsFromParameters(id, parameters);
  const responses = await promptUser(questions);

  Object.keys(responses).forEach(key => {
    tempPico = replaceWithParameter(tempPico, key, responses[key]);
  });

  return tempPico;
};
