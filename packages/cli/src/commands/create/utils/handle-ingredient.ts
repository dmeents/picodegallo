import { Ingredient } from '../../../interfaces/recipe-config.interface';
import { loadTxt, replaceWithParameter } from '../../../utils/files.utils';
import {
  makeQuestionsFromParameters,
  promptUser,
} from '../../../utils/prompts.utils';

export const handleIngredient = async (
  ingredient: Ingredient,
  picodegallo: string,
  recipePath: string,
) => {
  const { id, parameters } = ingredient;
  let template = loadTxt(`${recipePath}/ingredients/${id}.txt`);
  let tempPico = picodegallo;

  const questions = makeQuestionsFromParameters(id, parameters);
  const responses = await promptUser(questions);

  Object.keys(responses).forEach(key => {
    template = replaceWithParameter(template, key, responses[key]);
  });

  tempPico = replaceWithParameter(picodegallo, id, template);

  return tempPico;
};
