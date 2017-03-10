import { TreeModelSettings, TreeModel, FoldingType } from '../src/tree.types';

describe('TreeModelSettings', () => {
  it('should correctly merge TreeModelSettings - default values: static - false; leftMenu - false; rightMenu - true', () => {
    const treeModelA: TreeModel = {
      value: "42"
    };

    const treeModelB: TreeModel = {
      value: "12"
    };

    expect(TreeModelSettings.merge(treeModelA, treeModelB)).toEqual({static: false, leftMenu: false, rightMenu: true});
  });

  it('should correctly merge TreeModelSettings: first settings source has higher priority', () => {
    const treeModelA: TreeModel = {
      value: "42",
      settings: {
        static: true,
        leftMenu: true,
        rightMenu: true
      }
    };

    const treeModelB: TreeModel = {
      value: "12",
      settings: {
        static: false,
        leftMenu: false,
        rightMenu: false
      }
    };

    expect(TreeModelSettings.merge(treeModelA, treeModelB)).toEqual({static: true, leftMenu: true, rightMenu: true});
  });

  it('should correctly merge TreeModelSettings: second settings source has priority if first settings source doesn\'t have the option', () => {
    const treeModelA: TreeModel = {
      value: "42"
    };

    const treeModelB: TreeModel = {
      value: "12",
      settings: {
        static: true,
        leftMenu: true,
        rightMenu: false
      }
    };

    expect(TreeModelSettings.merge(treeModelA, treeModelB)).toEqual({static: true, leftMenu: true, rightMenu: false});
  });
});

describe('FoldingType', () => {
  it('should have correct cssClass per folding type', () => {
    expect(FoldingType.Expanded.cssClass).toEqual('node-expanded');
    expect(FoldingType.Collapsed.cssClass).toEqual('node-collapsed');
    expect(FoldingType.Leaf.cssClass).toEqual('node-leaf');
  });
});
