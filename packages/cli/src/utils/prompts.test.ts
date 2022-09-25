import prompts from 'prompts';
import { invalidPromptInput, promptMessage } from '../messages/prompt.messages';
import {
  makeQuestionsFromParameters,
  promptRequiredOptions,
  promptUser,
  validateInput,
} from './prompts.utils';

const mockIngredient = 'mock-ingredient';

describe('validateInput', () => {
  it('should return an invalid message when param is required, but no value is provided', () => {
    const result = validateInput({ required: true, id: 'foobar' }, undefined);
    expect(result).toEqual(invalidPromptInput('foobar'));
  });

  it('should return true when param is required and is provided', () => {
    const result = validateInput({ required: true, id: 'foobar' }, 'hey there');
    expect(result).toEqual(true);
  });
});

describe('makeQuestionsFromParameters', () => {
  it('should return an empty array if no parameters provided', () => {
    const result = makeQuestionsFromParameters('', {}, undefined);
    expect(result).toEqual([]);
  });

  it('should return an array of prompt objects', () => {
    const result = makeQuestionsFromParameters(
      mockIngredient,
      { [mockIngredient]: 'foobar' },
      [{ id: 'foobar', type: 'text', required: false }],
    );

    expect(result[0].message).toEqual(
      promptMessage(mockIngredient, 'foobar', false),
    );

    expect(result[0].type).toEqual('text');
    expect(result[0].name).toEqual('foobar');
  });

  describe('promptUser', () => {
    it('should not fail', async () => {
      const questions = makeQuestionsFromParameters(
        mockIngredient,
        { [mockIngredient]: 'foobar' },
        [{ id: 'foobar', type: 'text', required: true }],
      );

      prompts.inject('hello world');
      const result = await promptUser(questions);
      expect(result).toEqual({ foobar: 'hello world' });
    });
  });

  describe('promptRequiredOptions', () => {
    it('should prompt a user for a required input that was not provided', async () => {
      prompts.inject('hello world');
      const result = await promptRequiredOptions({}, ['foobar']);
      expect(result).toEqual({ foobar: 'hello world' });
    });

    it('should return true if required inputs are met', async () => {
      const result = await promptRequiredOptions({ foobar: 'hey there' }, [
        'foobar',
      ]);
      expect(result).toEqual([]);
    });
  });
});
