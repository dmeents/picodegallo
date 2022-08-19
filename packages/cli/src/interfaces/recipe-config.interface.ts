import { Falsy, PromptType, ValueOrFunc } from 'prompts';

export interface Parameters {
  id: string;
  type?: ValueOrFunc<PromptType> | Falsy;
  required?: boolean;
  initial?: boolean;
  description?: string;
}

export interface Ingredients {
  id: string;
  description?: string;
  required?: boolean;
  many?: boolean;
  parameters?: Array<Parameters>;
}

export interface RecipeConfig {
  id: string;
  description?: string;
  parameters?: Array<Parameters>;
  ingredients?: Array<Ingredients>;
}
