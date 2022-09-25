import { replaceWithParameter } from './files.utils';

describe('replaceWithParameter', () => {
  it('should replace the proved variable with the substitution', () => {
    const result = replaceWithParameter('%test-me%', 'test-me', 'hello world');
    expect(result).toEqual('hello world');
  });
});
