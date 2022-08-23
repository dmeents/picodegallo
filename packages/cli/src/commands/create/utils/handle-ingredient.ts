import { Ingredient } from '../../../interfaces/recipe-config.interface';
import { loadTxt, replaceWithParameter } from '../../../utils/files.utils';
import { promptUser } from '../../../utils/prompts.utils';
import { makeReplacements } from './make-replacements';

export const handleIngredient = async (
  ingredient: Ingredient,
  picodegallo: string,
  recipePath: string,
) => {
  const { id } = ingredient;
  let tempPico = picodegallo;

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
  }

  return tempPico;
};
