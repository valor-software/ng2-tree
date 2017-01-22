import { TreeModelOptions, TreeModel, FoldingType, Tree } from '../src/tree.types';

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

  it('should be able to apply value to Renamable node: value might be another renamable node coerced to string', () => {
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

    tree.value = {setName: () => {}, toString: () => 'Hi!'};
    expect(tree.value.toString()).toEqual('Hi!');
  });

  it('should be able to apply value to regular node', () => {
    const tree = new Tree({value: 'bla'});

    tree.value = '12';
    expect(tree.value).toEqual('12');
  });

  it('assigns only RenamableNodes and strings as values', () => {
    const tree = new Tree({value: 'bla'});

    tree.value = ['boo!'];
    expect(tree.value).toEqual('bla');
  });

  it('should not apply value if it is empty', () => {
    const tree = new Tree({value: 'bla'});

    tree.value = '';
    expect(tree.value).toEqual('bla');

    tree.value = ' ';
    expect(tree.value).toEqual('bla');

    tree.value = ' \n\r\t';
    expect(tree.value).toEqual('bla');
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

  it('should build a Tree from TreeModel', () => {
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

    const tree = Tree.buildTreeFromModel(fonts);
    expect(tree).not.toBeFalsy('Constructed tree should exist');
    expect(tree instanceof Tree).toBe(true, 'tree should be instance of Tree');
    expect(tree.value).toEqual(fonts.value);
    expect(tree.children.length).toEqual(6);
    expect(tree.children[0].value).toEqual('Antiqua');
    expect(tree.children[0].positionInParent).toEqual(0);

    const slabSerifFontsTree = tree.children[5];
    expect(slabSerifFontsTree.value).toEqual('Slab serif');
    expect(slabSerifFontsTree.children.length).toEqual(3);
    expect(slabSerifFontsTree.children[1].value).toEqual('Swift');
    expect(slabSerifFontsTree.children[1].positionInParent).toEqual(1);
   });

  it('builds completely new structure from TreeModel and changes to TreeModel should not affect built Tree', () => {
    const fonts: TreeModel = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        {value: 'Antiqua'},
        {value: 'DejaVu Serif'},
        {value: 'Garamond'},
        {value: 'Georgia'},
        {value: 'Times New Roman'},
      ]
    };

    const tree = Tree.buildTreeFromModel(fonts);

    fonts.children[0].value = 'bla';

    expect(fonts.children[0].value).toEqual('bla');
    expect(tree.children[0].value).toEqual('Antiqua');
  });

  it('merges TreeModelOptions during Tree construction from TreeModel', () => {
    const fonts: TreeModel = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        {value: 'Antiqua'},
        {value: 'DejaVu Serif'},
        {value: 'Garamond'},
        {value: 'Georgia'},
        {value: 'Times New Roman'},
      ]
    };

    spyOn(TreeModelOptions, 'merge');

    Tree.buildTreeFromModel(fonts);

    expect(TreeModelOptions.merge).toHaveBeenCalledTimes(6);
    expect(TreeModelOptions.merge).toHaveBeenCalledWith(fonts, undefined);
  });

  it('adds child', () => {
    const fonts: TreeModel = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        {value: 'Antiqua'},
        {value: 'DejaVu Serif'},
        {value: 'Garamond'},
        {value: 'Georgia'},
        {value: 'Times New Roman'},
      ]
    };

    const tree = Tree.buildTreeFromModel(fonts);
    const child = new Tree({value: 'Master', children: [
      {value: 'Servant#1'},
      {value: 'Servant#2'},
    ]});

    const addedChild = tree.addChild(child);

    expect(addedChild === child).toBe(false);
    expect(addedChild.positionInParent).toEqual(5);
    expect(addedChild.parent).toBe(tree);
  });

  it('adds child and shallowly clones its TreeModel', () => {
    const fonts: TreeModel = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        {value: 'Antiqua'},
        {value: 'DejaVu Serif'},
        {value: 'Garamond'},
        {value: 'Georgia'},
        {value: 'Times New Roman'},
      ]
    };

    const tree = Tree.buildTreeFromModel(fonts);
    const child = new Tree({value: 'Master'});

    const addedChild = tree.addChild(child);
    addedChild.value = 'Boo!';

    expect(addedChild.value).toEqual('Boo!');
    expect(child.value).toEqual('Master');
  });

  it('adds child to a particular position in a tree', () => {
    const fonts: TreeModel = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        {value: 'Antiqua'},
        {value: 'DejaVu Serif'},
        {value: 'Garamond'},
        {value: 'Georgia'},
        {value: 'Times New Roman'},
      ]
    };

    const tree = Tree.buildTreeFromModel(fonts);
    const servantTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    const addedChild = tree.addChild(servantTree, 0);

    expect(tree.children.length).toEqual(6);
    expect(addedChild.positionInParent).toEqual(0);
    expect(tree.children[0].value).toEqual('Master');
  });

  it('adds child to tree with no children at creation moment', () => {
    const tree = Tree.buildTreeFromModel({
      value: 'Recipient',
    });

    const servantTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    const addedChild = tree.addChild(servantTree);

    expect(tree.children.length).toEqual(1);
    expect(tree.children[0].value).toEqual('Master');
    expect(addedChild.positionInParent).toEqual(0);
    expect(addedChild.children.length).toEqual(2);
    expect(addedChild.children[1].value).toEqual('Servant#2');
  });

  it('adds child to tree with a not array children property', () => {
    const tree = Tree.buildTreeFromModel({
      value: 'Recipient',
      children: null
    });

    const servantTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    const addedChild = tree.addChild(servantTree);

    expect(tree.children.length).toEqual(1);
    expect(tree.children[0].value).toEqual('Master');
    expect(addedChild.positionInParent).toEqual(0);
    expect(addedChild.children.length).toEqual(2);
    expect(addedChild.children[1].value).toEqual('Servant#2');
  });

  it('creates child node (leaf)', () => {
    const servantTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    const child = servantTree.createNode(false);

    expect(servantTree.hasChild(child)).toEqual(true);
    expect(child.value).toEqual('');
    expect(child.children).toEqual(null);
    expect(child.isLeaf()).toEqual(true);
    expect(child.isNew()).toEqual(true);
    expect(child.positionInParent).toEqual(2);
  });

  it('creates sibling node (leaf)', () => {
    const servantTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    const servantNumber1Tree = servantTree.children[0];
    expect(servantNumber1Tree.value).toEqual('Servant#1');

    const sibling = servantNumber1Tree.createNode(false);

    expect(servantTree.hasChild(sibling)).toEqual(true);
    expect(sibling.value).toEqual('');
    expect(sibling.children).toEqual(null);
    expect(sibling.isLeaf()).toEqual(true);
    expect(sibling.isNew()).toEqual(true);
    expect(sibling.positionInParent).toEqual(2);
  });

  it('creates child node (branch)', () => {
    const servantTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    const child = servantTree.createNode(true);

    expect(servantTree.hasChild(child)).toEqual(true);
    expect(child.value).toEqual('');
    expect(child.children).toEqual([]);
    expect(child.isBranch()).toEqual(true);
    expect(child.isNew()).toEqual(true);
    expect(child.positionInParent).toEqual(2);
  });

  it('creates static tree', () => {
    const servantTree = Tree.buildTreeFromModel({
      value: 'Master',
      options: { 'static': true },
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    expect(servantTree.isStatic()).toEqual(true);
  });

  it('creates non-static tree by default', () => {
    const servantTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    expect(servantTree.isStatic()).toEqual(false);
    expect(servantTree.children[0].isStatic()).toEqual(false);
    expect(servantTree.children[1].isStatic()).toEqual(false);
  });

  it('creates static tree and makes all children static as well', () => {
    const servantTree = Tree.buildTreeFromModel({
      value: 'Master',
      options: { 'static': true },
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    expect(servantTree.isStatic()).toEqual(true);
    expect(servantTree.children[0].isStatic()).toEqual(true);
    expect(servantTree.children[1].isStatic()).toEqual(true);
  });

  it('creates static tree and makes all children static as well: children can override static option', () => {
    const servantTree = Tree.buildTreeFromModel({
      value: 'Master',
      options: { 'static': true },
      children: [
        {value: 'Servant#1', options: { 'static': false }},
        {value: 'Servant#2'}
      ]
    });

    expect(servantTree.isStatic()).toEqual(true);
    expect(servantTree.children[0].isStatic()).toEqual(false);
    expect(servantTree.children[1].isStatic()).toEqual(true);
  });

  it('knows that it is branch', () => {
    const servantTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    expect(servantTree.isLeaf()).toEqual(false);
    expect(servantTree.isBranch()).toEqual(true);
  });

  it('knows that it is leaf', () => {
    const servantTree = Tree.buildTreeFromModel({
      value: 'Master'
    });

    expect(servantTree.isLeaf()).toEqual(true);
    expect(servantTree.isBranch()).toEqual(false);
  });

  it('knows that it is root', () => {
    const servantTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    expect(servantTree.isRoot()).toEqual(true);
    expect(servantTree.children[0].isRoot()).toEqual(false);
    expect(servantTree.children[1].isRoot()).toEqual(false);
  });

  it('knows its siblings', () => {
    const masterTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    const servantNumber1Tree = masterTree.children[0];
    const servantNumber2Tree = masterTree.children[1];

    expect(masterTree.hasSibling(servantNumber1Tree)).toEqual(false);
    expect(servantNumber1Tree.hasSibling(servantNumber1Tree)).toEqual(true);
    expect(servantNumber1Tree.hasSibling(servantNumber2Tree)).toEqual(true);
    expect(servantNumber2Tree.hasSibling(servantNumber1Tree)).toEqual(true);
  });

  it('knows its children', () => {
    const masterTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    const servantNumber1Tree = masterTree.children[0];
    const servantNumber2Tree = masterTree.children[1];
    const imposter = new Tree({value: 'HA-HA-HA!!!'});

    expect(masterTree.hasChild(servantNumber1Tree)).toEqual(true);
    expect(masterTree.hasChild(servantNumber2Tree)).toEqual(true);
    expect(masterTree.hasChild(imposter)).toEqual(false);
    expect(servantNumber2Tree.hasChild(masterTree)).toEqual(false);
    expect(servantNumber1Tree.hasChild(servantNumber2Tree)).toEqual(false);
  });

  it('can remove children', () => {
    const masterTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    const servantNumber1Tree = masterTree.children[0];
    const servantNumber2Tree = masterTree.children[1];

    masterTree.removeChild(servantNumber2Tree);

    expect(masterTree.hasChild(servantNumber2Tree)).toEqual(false);
    expect(masterTree.children.length).toEqual(1);
    expect(masterTree.children[0]).toBe(servantNumber1Tree);
  });

  it('cannot remove node that is not a child', () => {
    const masterTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    const imposter = new Tree({value: 'HA-HA-HA!!!'});

    masterTree.removeChild(imposter);

    expect(masterTree.children.length).toEqual(2);
    expect(masterTree.children[0].value).toEqual('Servant#1');
    expect(masterTree.children[1].value).toEqual('Servant#2');
  });

  it('can remove itself from parent', () => {
    const masterTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    const servantNumber1Tree = masterTree.children[0];
    const servantNumber2Tree = masterTree.children[1];

    servantNumber2Tree.removeItselfFromParent();

    expect(masterTree.hasChild(servantNumber2Tree)).toEqual(false);
    expect(masterTree.children.length).toEqual(1);
    expect(masterTree.children[0]).toBe(servantNumber1Tree);
  });

  it('can swap its position in parent with sibling', () => {
    const masterTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    const servantNumber1Tree = masterTree.children[0];
    const servantNumber2Tree = masterTree.children[1];

    expect(servantNumber1Tree.positionInParent).toEqual(0);
    expect(servantNumber2Tree.positionInParent).toEqual(1);

    servantNumber1Tree.swapWithSibling(servantNumber2Tree);

    expect(servantNumber1Tree.positionInParent).toEqual(1);
    expect(servantNumber2Tree.positionInParent).toEqual(0);
  });

  it('cannot swap its position in parent with node that is not its sibling', () => {
    const masterTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    const imposter = new Tree({value: 'HA-HA-HA!!!'});

    const servantNumber1Tree = masterTree.children[0];
    const servantNumber2Tree = masterTree.children[1];

    expect(servantNumber1Tree.positionInParent).toEqual(0);
    expect(servantNumber2Tree.positionInParent).toEqual(1);

    servantNumber1Tree.swapWithSibling(imposter);

    expect(servantNumber1Tree.positionInParent).toEqual(0);
    expect(servantNumber2Tree.positionInParent).toEqual(1);
  });

  it('has "Leaf" folding type if it is leaf (by default for leaves)', () => {
    const masterTree = Tree.buildTreeFromModel({
      value: 'Master'
    });

    expect(masterTree.isLeaf()).toEqual(true);
    expect(masterTree.isNodeExpanded()).toEqual(false);
    expect(masterTree.foldingType).toEqual(FoldingType.Leaf);
  });

  it('cannot switch "Leaf" folding type', () => {
    const masterTree = Tree.buildTreeFromModel({
      value: 'Master'
    });

    expect(masterTree.foldingType).toEqual(FoldingType.Leaf);

    masterTree.switchFoldingType();

    expect(masterTree.foldingType).toEqual(FoldingType.Leaf);
  });

  it('has "Expanded" folding type if it is branch and expanded (by default for branches)', () => {
    const masterTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    expect(masterTree.isBranch()).toEqual(true);
    expect(masterTree.isNodeExpanded()).toEqual(true);
    expect(masterTree.foldingType).toEqual(FoldingType.Expanded);
  });

  it('can switch "Branch" folding type', () => {
    const masterTree = Tree.buildTreeFromModel({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    expect(masterTree.foldingType).toEqual(FoldingType.Expanded);
    expect(masterTree.isNodeExpanded()).toEqual(true);

    masterTree.switchFoldingType();

    expect(masterTree.foldingType).toEqual(FoldingType.Collapsed);
    expect(masterTree.isNodeExpanded()).toEqual(false);

    masterTree.switchFoldingType();

    expect(masterTree.foldingType).toEqual(FoldingType.Expanded);
    expect(masterTree.isNodeExpanded()).toEqual(true);
  });

  it('has undefined status by default', () => {
    const masterTree = Tree.buildTreeFromModel({
      value: 'Master'
    });

    expect(masterTree.isNew()).toEqual(false);
    expect(masterTree.isBeingRenamed()).toEqual(false);
    expect(masterTree.isModified()).toEqual(false);
  });

  it('can be marked as new', () => {
    const masterTree = new Tree({value: 'Master'});

    masterTree.markAsNew();
    expect(masterTree.isNew()).toEqual(true);
  });

  it('can be marked as modified', () => {
    const masterTree = new Tree({value: 'Master'});

    masterTree.markAsModified();
    expect(masterTree.isModified()).toEqual(true);
  });

  it('can be marked as being renamed', () => {
    const masterTree = new Tree({value: 'Master'});

    masterTree.markAsBeingRenamed();
    expect(masterTree.isBeingRenamed()).toEqual(true);
  });
});
