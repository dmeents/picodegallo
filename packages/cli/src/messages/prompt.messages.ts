export const promptMessage = (
  ingredient: string,
  id: string,
  required?: boolean,
) => `Enter value for "${ingredient}" [${id}] ${required ? '(required)' : ''}:`;

export const invalidPromptInput = (id: string) => `Must include a ${id}!`;

export const missingRequiredInput = (id: string) =>
  `Missing [${id}] (required)`;
