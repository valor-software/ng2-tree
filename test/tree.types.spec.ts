import { TreeModelSettings, TreeModel, FoldingType } from '../src/tree.types';

describe('TreeModelSettings', () => {
  it('should correctly merge TreeModelSettings: static is false by default', () => {
    const treeModelA: TreeModel = {
      value: "42"
    };

    const treeModelB: TreeModel = {
      value: "12"
    };

    expect(TreeModelSettings.merge(treeModelA, treeModelB)).toEqual({static: false});
  });

  it('should correctly merge TreeModelSettings: first settings source has higher priority', () => {
    const treeModelA: TreeModel = {
      value: "42",
      settings: {
        static: true
      }
    };

    const treeModelB: TreeModel = {
      value: "12",
      settings: {
        static: false
      }
    };

    expect(TreeModelSettings.merge(treeModelA, treeModelB)).toEqual({static: true});
  });

  it('should correctly merge TreeModelSettings: second settings source has priority if first settings source doesn\'t have the option', () => {
    const treeModelA: TreeModel = {
      value: "42"
    };

    const treeModelB: TreeModel = {
      value: "12",
      settings: {
        static: true
      }
    };

    expect(TreeModelSettings.merge(treeModelA, treeModelB)).toEqual({static: true});
  });
});

describe('FoldingType', () => {
  it('should have correct cssClass per folding type', () => {
    expect(FoldingType.Expanded.cssClass).toEqual('node-expanded');
    expect(FoldingType.Collapsed.cssClass).toEqual('node-collapsed');
    expect(FoldingType.Leaf.cssClass).toEqual('node-leaf');
  });
});