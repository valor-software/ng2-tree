import { TreeModelOptions, TreeModel, FoldingType } from '../src/tree.types';

describe('TreeModelOptions', () => {
  it('should correctly merge TreeModelOptions: static is false by default', () => {
    const treeModelA: TreeModel = {
      value: "42"
    };

    const treeModelB: TreeModel = {
      value: "12"
    };

    expect(TreeModelOptions.merge(treeModelA, treeModelB)).toEqual({static: false});
  });

  it('should correctly merge TreeModelOptions: first options source has higher priority', () => {
    const treeModelA: TreeModel = {
      value: "42",
      options: {
        static: true
      }
    };

    const treeModelB: TreeModel = {
      value: "12",
      options: {
        static: false
      }
    };

    expect(TreeModelOptions.merge(treeModelA, treeModelB)).toEqual({static: true});
  });

  it('should correctly merge TreeModelOptions: second options source has priority if first options source doesn\'t have the option', () => {
    const treeModelA: TreeModel = {
      value: "42"
    };

    const treeModelB: TreeModel = {
      value: "12",
      options: {
        static: true
      }
    };

    expect(TreeModelOptions.merge(treeModelA, treeModelB)).toEqual({static: true});
  });
});

describe('FoldingType', () => {
  it('should have correct cssClass per folding type', () => {
    expect(FoldingType.Expanded.cssClass).toEqual('node-expanded');
    expect(FoldingType.Collapsed.cssClass).toEqual('node-collapsed');
    expect(FoldingType.Leaf.cssClass).toEqual('node-leaf');
  });
});
