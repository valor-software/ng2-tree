import { TreeModelOptions, TreeModel, FoldingType, Tree, RenamableNode } from '../src/tree.types';

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

describe('Tree', () => {
  it('should detect empty string', () => {
    expect(Tree.isValueEmpty('  ')).toBe(true);
    expect(Tree.isValueEmpty(' \n \r ')).toBe(true);
    expect(Tree.isValueEmpty('\r')).toBe(true);
    expect(Tree.isValueEmpty(' \t ')).toBe(true);
    expect(Tree.isValueEmpty('  ')).toBe(true);

    expect(Tree.isValueEmpty('42')).toBe(false);
    expect(Tree.isValueEmpty(' 42  \n')).toBe(false);
    expect(Tree.isValueEmpty(' 42')).toBe(false);
    expect(Tree.isValueEmpty('42 ')).toBe(false);
  });

  it('should be able to apply value to Renamable node', () => {
    const renamableNode = {
      name: '42',
      age: 'millions years',
      setName: function (value) {
        this.name = value;
      },
      toString: function () {
        return this.name;
      }
    };

    const tree = new Tree({value: renamableNode});

    tree.value = '12';
    expect(tree.value.toString()).toEqual('12');
    expect((tree.value as any).age).toEqual(renamableNode.age);
  });

  it('should know how to detect Renamable node', () => {
    const renamableNode = {
      setName: () => {},
      toString: () => {}
    };

    const renamableNodeImposter = {
      setName: 42,
      toString: 'bla'
    };

    const regularNode = {
      value: 42
    };

    expect(Tree.isRenamable(renamableNode)).toBe(true);
    expect(Tree.isRenamable(renamableNodeImposter)).toBe(false);
    expect(Tree.isRenamable(regularNode)).toBe(false);
  });

  it('TODO: should build a Tree from TreeModel', () => {
    const fonts: TreeModel = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        {value: 'Antiqua'},
        {value: 'DejaVu Serif'},
        {value: 'Garamond'},
        {value: 'Georgia'},
        {value: 'Times New Roman'},
        {
          value: 'Slab serif',
          children: [
            {value: 'Candida'},
            {value: 'Swift'},
            {value: 'Guardian Egyptian'}
          ]
        }
      ]
    };

    const tree = Tree.buildTree(fonts);
  });
});
