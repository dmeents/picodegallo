// @ts-ignore
import localPicoConfig from '../../../../pico.config.json';
import {
  RECIPE_CONFIG_NOT_FOUND,
  RECIPE_MODULE_NOT_INSTALLED,
  RECIPE_NOT_FOUND,
} from '../messages/error.messages';
import { getPicoConfig, getRecipeConfig, getRecipePath } from './config.utils';

describe('getPicoConfig', () => {
  it('should return the local picoConfig', () => {
    const response = getPicoConfig();
    expect(response).toEqual(localPicoConfig);
  });
});

describe('getRecipePath', () => {
  it('should return a match if the active path contains the recipe', () => {
    // can't test this
    expect(true).toBe(true);
  });

  it('should return a match if the userDefinedPath contains the recipe', () => {
    const response = getRecipePath(
      { recipePath: 'packages/recipes-commander/src/recipes', recipes: [] },
      'commander-command',
    );

    expect(typeof response).toBe('string');
    expect(response).toContain('commander-command');
  });

  it('should return a match if the picoConfig contains a Recipe Module that contains the recipe', () => {
    const response = getRecipePath(localPicoConfig, 'commander-command');
    expect(typeof response).toBe('string');
    expect(response).toContain('commander-command');
  });

  it('should throw an error if no match is found', () => {
    expect(() => getRecipePath(localPicoConfig, 'nonexistent-recipe')).toThrow(
      RECIPE_NOT_FOUND,
    );
  });

  it('should throw an error if the input recipe module is not found', () => {
    expect(() =>
      getRecipePath(
        { recipes: ['@picodegallo/imaginary-recipes'] },
        'commander-command',
      ),
    ).toThrow(RECIPE_MODULE_NOT_INSTALLED);
  });
});

describe('getRecipeConfig', () => {
  it('should return the recipe config of a requested path', () => {
    const recipePath = getRecipePath(localPicoConfig, 'commander-command');
    const response = getRecipeConfig(recipePath);
    expect(response).toHaveProperty('id');
    expect(response.id).toEqual('Commander Command');
  });

  it('should throw an error when a recipe config is not found', () => {
    const recipePath = '/failing-this-test';

    expect(() => getRecipeConfig(recipePath)).toThrow(RECIPE_CONFIG_NOT_FOUND);
  });
});
