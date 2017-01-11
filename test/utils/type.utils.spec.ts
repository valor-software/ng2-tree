import * as TypeUtils from '../../src/utils/type.utils';

describe('TypeUtils', () => {
  it('should know how to detect Renamable node', () => {
    const renamableNode = {
      setName: () => { }
    };

    const renamableNodeImposter = {
      setName: 42
    };

    const regularNode = {
      value: 42
    };

    expect(TypeUtils.isRenamable(renamableNode)).toBe(true);
    expect(TypeUtils.isRenamable(renamableNodeImposter)).toBe(false);
    expect(TypeUtils.isRenamable(regularNode)).toBe(false);
  });

  it('should detect empty string', () => {
    expect(TypeUtils.isValueEmpty('  ')).toBe(true);
    expect(TypeUtils.isValueEmpty(' \n \r ')).toBe(true);
    expect(TypeUtils.isValueEmpty('\r')).toBe(true);
    expect(TypeUtils.isValueEmpty(' \t ')).toBe(true);
    expect(TypeUtils.isValueEmpty('  ')).toBe(true);

    expect(TypeUtils.isValueEmpty('42')).toBe(false);
    expect(TypeUtils.isValueEmpty(' 42  \n')).toBe(false);
    expect(TypeUtils.isValueEmpty(' 42')).toBe(false);
    expect(TypeUtils.isValueEmpty('42 ')).toBe(false);
  });

  it('should be able to apply value to Renamable node', () => {
    const renamableNode = {
      name: '42',
      age: 'millions years',
      setName: function (value) {
        this.name = value;
      }
    };

    const changedRenamableNode = TypeUtils.applyNewValueToRenamable(renamableNode, '12');

    expect((changedRenamableNode as any).name).toEqual('12');
    expect((changedRenamableNode as any).age).toEqual(renamableNode.age);
  });
});
