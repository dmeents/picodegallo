import { Falsy, PromptType, ValueOrFunc } from 'prompts';

export interface Parameter {
  id: string;
  type?: ValueOrFunc<PromptType> | Falsy;
  required?: boolean;
  initial?: boolean;
  description?: string;
}

export interface Ingredient {
  id: string;
  description?: string;
  required?: boolean;
  many?: boolean;
  parameters?: Array<Parameter>;
}

export interface RecipeConfig {
  id: string;
  description?: string;
  parameters?: Array<Parameter>;
  ingredients?: Array<Ingredient>;
}
