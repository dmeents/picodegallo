import { Falsy, PromptType, ValueOrFunc } from 'prompts';

/**
 * an object that describes a parameter which is used to prompt the user for values
 * which are used to make recipe substitutions
 */
export interface Parameter {
  // the identifier for the parameter
  id: string;
  // prompts.js prompt type
  type?: ValueOrFunc<PromptType> | Falsy;
  // must the user input this parameter
  required?: boolean;
  // sets the default value of the prompt
  initial?: boolean;
  // describes the parameter
  description?: string;
}

/**
 * an object that defines recipe modules that can be injected into a recipe
 * to expand their capability
 */
export interface Ingredient {
  // the identifier for the ingredient
  id: string;
  // describes the function of the ingredient
  description?: string;
  // must this ingredient be provided
  required?: boolean;
  // is the user allowed to include multiple of these ingredients
  many?: boolean;
  // the user provided values to populate the ingredient
  parameters?: Array<Parameter>;
}

/**
 * defines the available parameters and ingredients of a recipe
 */
export interface RecipeConfig {
  // the identifier for the recipe
  id: string;
  // describes the function and use of the recipe
  description?: string;
  // list of the allowed parameters for the recipe
  parameters?: Array<Parameter>;
  // list of the allowed ingredients in the recipe
  ingredients?: Array<Ingredient>;
}
