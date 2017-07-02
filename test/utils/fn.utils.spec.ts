import * as fn from '../../src/utils/fn.utils';

describe('fn.utils - multipurpose functions', () => {
  describe('trim', () => {
    it('returns empty string when input value is null or undefined', () => {
      expect(fn.trim(null)).toEqual('');
      expect(fn.trim(undefined)).toEqual('');
    });

    it('uses native trim method under the hood', () => {
      const stringSpy = jasmine.createSpyObj('string', ['trim']);
      stringSpy.trim.and.returnValue('Boo!');
      expect(fn.trim(stringSpy as string)).toEqual('Boo!');
    });
  });

  describe('once', () => {
    it('executes function only ones', () => {
      const onceTargetSpy = jasmine.createSpy('once');
      const onceExecutableFn = fn.once(onceTargetSpy);

      onceExecutableFn('Hello', ', ', 'World');
      onceExecutableFn('Hello');

      expect(onceTargetSpy).toHaveBeenCalledTimes(1);
      expect(onceTargetSpy).toHaveBeenCalledWith('Hello', ', ', 'World');
      expect(onceTargetSpy).not.toHaveBeenCalledWith('Hello');
    });
  });

  describe('defaultsDeep', () => {
    it('uses empty array if there were no sources given', () => {
      const options = fn.defaultsDeep({ msg: 'Boo!' });

      expect(options).toEqual({ msg: 'Boo!' });
    });
  });

  describe('defaultsDeep', () => {
    it('uses empty array if there were no sources given', () => {
      const options = fn.defaultsDeep({ msg: 'Boo!' });

      expect(options).toEqual({ msg: 'Boo!' });
    });
  });

  describe('includes', () => {
    it('works with strings', () => {
      expect(fn.includes('world', 'rl')).toEqual(true);
      expect(fn.includes('world', 'rrl')).toEqual(false);
    });
  });
});
