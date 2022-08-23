import { Ingredient } from '../../../interfaces/recipe-config.interface';
import { replaceWithParameter } from '../../../utils/files.utils';
import {
  makeQuestionsFromParameters,
  promptUser,
} from '../../../utils/prompts.utils';

export const makeReplacements = async (
  ingredient: Ingredient,
  picodegallo: string,
) => {
  const { id, parameters } = ingredient;
  let tempPico = picodegallo;

  const questions = makeQuestionsFromParameters(id, parameters);
  const responses = await promptUser(questions);

  Object.keys(responses).forEach(key => {
    tempPico = replaceWithParameter(picodegallo, key, responses[key]);
  });

  return tempPico;
};
