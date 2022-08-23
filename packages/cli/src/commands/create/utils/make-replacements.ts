import { Ingredient } from '../../../interfaces/recipe-config.interface';
import { replaceWithParameter } from '../../../utils/files.utils';
import {
  makeQuestionsFromParameters,
  promptUser,
} from '../../../utils/prompts.utils';

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
