import { Ingredient } from '../../../interfaces/recipe-config.interface';
import { loadTxt, replaceWithParameter } from '../../../utils/files.utils';
import { promptUser } from '../../../utils/prompts.utils';
import { makeReplacements } from './make-replacements';

/**
 * takes the ingredient config and allows the user to create multiple of them
 * asking for prompts for any ingredient parameters along the way
 */
export const handleIngredient = async (
  ingredient: Ingredient,
  picodegallo: string,
  recipePath: string,
) => {
  const { id } = ingredient;
  let tempPico = picodegallo;

  /**
   * loads the ingredient template and determines what parameters must be included
   * in a prompt. Populates the ingredient template then injects it into the pico
   * before prompting the user add another of the same ingredient (when applicable)
   */
  const fillIngredient = async () => {
    let template = loadTxt(`${recipePath}/ingredients/${id}.txt`);
    template = await makeReplacements(ingredient, template);

    if (ingredient.many) {
      const responses = await promptUser([
        { type: 'confirm', name: 'another', message: `Add another "${id}"?` },
      ]);

      if (responses.another) {
        template = template.concat(`\n%${id}%`);
        tempPico = replaceWithParameter(tempPico, id, template);
        await fillIngredient();
      } else {
        tempPico = replaceWithParameter(tempPico, id, template);
      }
    }
  };

  if (!ingredient.required) {
    const responses = await promptUser([
      { type: 'confirm', name: 'include', message: `Add ingredient "${id}"?` },
    ]);

    if (responses.include) {
      await fillIngredient();
    } else {
      tempPico = replaceWithParameter(tempPico, id, '');
    }
  } else {
    await fillIngredient();
  }

  return tempPico;
};
