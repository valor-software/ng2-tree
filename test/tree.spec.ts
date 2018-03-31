import { Tree } from '../src/tree';
import { FoldingType, TreeModel, TreeModelSettings } from '../src/tree.types';
import { NodeMenuItemAction } from '../src/menu/menu.events';

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
      setName(value: string): void {
        this.name = value;
      },
      toString(): string {
        return this.name;
      }
    };

    const tree = new Tree({ value: renamableNode });

    tree.value = '12';
    expect(tree.value.toString()).toEqual('12');
    expect((tree.value as any).age).toEqual(renamableNode.age);
  });

  it('should be able to apply value to Renamable node: value might be another renamable node coerced to string', () => {
    const renamableNode = {
      name: '42',
      age: 'millions years',
      setName(value: string): void {
        this.name = value;
      },
      toString(): string {
        return this.name;
      }
    };

    const tree = new Tree({ value: renamableNode });

    tree.value = { setName: () => {}, toString: () => 'Hi!' };
    expect(tree.value.toString()).toEqual('Hi!');
  });

  it('should be able to apply value to regular node', () => {
    const tree = new Tree({ value: 'bla' });

    tree.value = '12';
    expect(tree.value).toEqual('12');
  });

  it('assigns only RenamableNodes and strings as values', () => {
    const tree = new Tree({ value: 'bla' });

    tree.value = ['boo!'];
    expect(tree.value).toEqual('bla');
  });

  it('should not apply value if it is empty', () => {
    const tree = new Tree({ value: 'bla' });

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
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' },
        {
          value: 'Slab serif',
          children: [{ value: 'Candida' }, { value: 'Swift' }, { value: 'Guardian Egyptian' }]
        }
      ]
    };

    const tree = new Tree(fonts);
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

  it('should build a Tree with html as a value', () => {
    const tags: TreeModel = {
      value: '<a href="#">Awesome Tree</a>'
    };

    const tree = new Tree(tags);
    expect(tree.value).toEqual(tags.value);
  });

  it('builds completely new structure from TreeModel and changes to TreeModel should not affect built Tree', () => {
    const fonts: TreeModel = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };

    const tree = new Tree(fonts);

    fonts.children[0].value = 'bla';

    expect(fonts.children[0].value).toEqual('bla');
    expect(tree.children[0].value).toEqual('Antiqua');
  });

  it('merges TreeModelSettings during Tree construction from TreeModel', () => {
    const fonts: TreeModel = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };

    spyOn(TreeModelSettings, 'merge');

    const tree = new Tree(fonts);

    expect(TreeModelSettings.merge).toHaveBeenCalledTimes(6);
    expect(TreeModelSettings.merge).toHaveBeenCalledWith(fonts, undefined);
  });

  it('adds child', () => {
    const fonts: TreeModel = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };

    const tree = new Tree(fonts);
    const child = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    const addedChild = tree.addChild(child);

    expect(addedChild === child).toBe(false);
    expect(addedChild.positionInParent).toEqual(5);
    expect(addedChild.parent).toBe(tree);
  });

  it('adds child and shallowly clones its TreeModel', () => {
    const fonts: TreeModel = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };

    const tree = new Tree(fonts);
    const child = new Tree({ value: 'Master' });

    const addedChild = tree.addChild(child);
    addedChild.value = 'Boo!';

    expect(addedChild.value).toEqual('Boo!');
    expect(child.value).toEqual('Master');
  });

  it('has position which equals to -1 when does not have a parent', () => {
    const fonts: TreeModel = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };

    const tree = new Tree(fonts);
    expect(tree.positionInParent).toEqual(-1);
  });

  it('has position which equals to -1 when still connected to parent but parent already does not have children', () => {
    const fonts: TreeModel = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };

    const tree = new Tree(fonts);
    const child = tree.children[3];

    (tree as any)._children = null;
    expect(child.positionInParent).toEqual(-1);
  });

  it('has position which equals to actual position rendered', () => {
    const fonts: TreeModel = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };

    const tree = new Tree(fonts);
    const child = tree.children[4];

    expect(child.positionInParent).toEqual(4);
  });

  it('adds child to a particular position in a tree', () => {
    const fonts: TreeModel = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };

    const tree = new Tree(fonts);
    const servantTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    const addedChild = tree.addChild(servantTree, 0);

    expect(tree.children.length).toEqual(6);
    expect(addedChild.positionInParent).toEqual(0);
    expect(tree.children[0].value).toEqual('Master');
  });

  it('adds child to tree with no children at creation moment', () => {
    const tree = new Tree({
      value: 'Recipient'
    });

    const servantTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    const addedChild = tree.addChild(servantTree);

    expect(tree.children.length).toEqual(1);
    expect(tree.children[0].value).toEqual('Master');
    expect(addedChild.positionInParent).toEqual(0);
    expect(addedChild.children.length).toEqual(2);
    expect(addedChild.children[1].value).toEqual('Servant#2');
  });

  it('adds child to tree with a not array children property', () => {
    const tree = new Tree({
      value: 'Recipient',
      children: null
    });

    const servantTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    const addedChild = tree.addChild(servantTree);

    expect(tree.children.length).toEqual(1);
    expect(tree.children[0].value).toEqual('Master');
    expect(addedChild.positionInParent).toEqual(0);
    expect(addedChild.children.length).toEqual(2);
    expect(addedChild.children[1].value).toEqual('Servant#2');
  });

  it('cannot add sibling if there is no parent: root node', () => {
    const tree = new Tree({
      value: 'Recipient',
      children: null
    });

    const addedSibling = tree.addSibling(new Tree({ value: 'bla' }));

    expect(addedSibling).toBeNull();
    expect(tree.parent).toBeNull();
  });

  it('creates child node (leaf)', () => {
    const servantTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    const child = servantTree.createNode(false);

    expect(servantTree.hasChild(child)).toEqual(true);
    expect(child.value).toEqual('');

    expect(child.id).toBeDefined();
    expect(child.id).toEqual(jasmine.any(String));

    expect(child.children).toEqual(null);
    expect(child.isLeaf()).toEqual(true);
    expect(child.isNew()).toEqual(true);
    expect(child.positionInParent).toEqual(2);
  });

  it('cannot create child node when children are loaded async', () => {
    const servantTree = new Tree({
      value: 'Master',
      loadChildren: (callback: Function) => {
        setTimeout(() => {
          callback([{ value: 'Servant#1' }, { value: 'Servant#2' }]);
        }, 10);
      }
    });

    const child = servantTree.createNode(false);

    expect(child).toEqual(null);
    expect(servantTree.hasChild(child)).toEqual(false);
  });

  it('can create tree without any children', () => {
    const master = new Tree({
      value: 'Master',
      children: []
    });

    expect(master.isRoot()).toEqual(true);
    expect(master.isBranch()).toEqual(true);
    expect(master.children).toEqual([]);
    expect(master.isLeaf()).toEqual(false);
    expect(master.isNodeExpanded()).toEqual(false);
    expect(master.isNodeCollapsed()).toEqual(false);
    expect(master.foldingType).toEqual(FoldingType.Empty);
  });

  it('creating a child to a collapsed node, will expand it', () => {
    const servantTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    expect(servantTree.isNodeExpanded()).toEqual(true);
    expect(servantTree.isNodeCollapsed()).toEqual(false);

    servantTree.switchFoldingType();

    expect(servantTree.isNodeExpanded()).toEqual(false);
    expect(servantTree.isNodeCollapsed()).toEqual(true);

    const child = servantTree.createNode(true);

    expect(servantTree.isNodeExpanded()).toEqual(true);
    expect(servantTree.isNodeCollapsed()).toEqual(false);

    expect(servantTree.hasChild(child)).toEqual(true);
    expect(child.value).toEqual('');
    expect(child.children).toEqual([]);
    expect(child.isLeaf()).toEqual(false);
    expect(child.isNew()).toEqual(true);
    expect(child.positionInParent).toEqual(2);
  });

  it('creates sibling node (leaf)', () => {
    const servantTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
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
    const servantTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
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
    const servantTree = new Tree({
      value: 'Master',
      settings: { static: true },
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    expect(servantTree.isStatic()).toEqual(true);
  });

  it('creates non-static tree by default', () => {
    const servantTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    expect(servantTree.isStatic()).toEqual(false);
    expect(servantTree.children[0].isStatic()).toEqual(false);
    expect(servantTree.children[1].isStatic()).toEqual(false);
  });

  it('creates static tree and makes all children static as well', () => {
    const servantTree = new Tree({
      value: 'Master',
      settings: { static: true },
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    expect(servantTree.isStatic()).toEqual(true);
    expect(servantTree.children[0].isStatic()).toEqual(true);
    expect(servantTree.children[1].isStatic()).toEqual(true);
  });

  it('creates static tree and makes all children static as well: children can override static option', () => {
    const servantTree = new Tree({
      value: 'Master',
      settings: { static: true },
      children: [{ value: 'Servant#1', settings: { static: false } }, { value: 'Servant#2' }]
    });

    expect(servantTree.isStatic()).toEqual(true);
    expect(servantTree.children[0].isStatic()).toEqual(false);
    expect(servantTree.children[1].isStatic()).toEqual(true);
  });

  it('knows that it is branch', () => {
    const servantTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    expect(servantTree.isLeaf()).toEqual(false);
    expect(servantTree.isBranch()).toEqual(true);
  });

  it('knows that it is leaf', () => {
    const servantTree = new Tree({
      value: 'Master'
    });

    expect(servantTree.isLeaf()).toEqual(true);
    expect(servantTree.isBranch()).toEqual(false);
  });

  it('knows that it is root', () => {
    const servantTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    expect(servantTree.isRoot()).toEqual(true);
    expect(servantTree.children[0].isRoot()).toEqual(false);
    expect(servantTree.children[1].isRoot()).toEqual(false);
  });

  it('knows its siblings', () => {
    const masterTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    const servantNumber1Tree = masterTree.children[0];
    const servantNumber2Tree = masterTree.children[1];

    expect(masterTree.hasSibling(servantNumber1Tree)).toEqual(false);
    expect(servantNumber1Tree.hasSibling(servantNumber1Tree)).toEqual(true);
    expect(servantNumber1Tree.hasSibling(servantNumber2Tree)).toEqual(true);
    expect(servantNumber2Tree.hasSibling(servantNumber1Tree)).toEqual(true);
  });

  it('knows its not leaf', () => {
    const masterTree = new Tree({
      value: 'Master',
      children: []
    });

    expect(masterTree.isRoot()).toEqual(true);
    expect(masterTree.isLeaf()).toEqual(false);
    expect(masterTree.hasChildren()).toEqual(false);
  });

  it('knows its children', () => {
    const masterTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    const servantNumber1Tree = masterTree.children[0];
    const servantNumber2Tree = masterTree.children[1];
    const imposter = new Tree({ value: 'HA-HA-HA!!!' });

    expect(masterTree.hasChild(servantNumber1Tree)).toEqual(true);
    expect(masterTree.hasChild(servantNumber2Tree)).toEqual(true);
    expect(masterTree.hasChild(imposter)).toEqual(false);
    expect(servantNumber2Tree.hasChild(masterTree)).toEqual(false);
    expect(servantNumber1Tree.hasChild(servantNumber2Tree)).toEqual(false);
  });

  it('can remove children', () => {
    const masterTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    const servantNumber1Tree = masterTree.children[0];
    const servantNumber2Tree = masterTree.children[1];

    masterTree.removeChild(servantNumber2Tree);

    expect(masterTree.hasChild(servantNumber2Tree)).toEqual(false);
    expect(masterTree.children.length).toEqual(1);
    expect(masterTree.children[0]).toBe(servantNumber1Tree);
  });

  it('cannot remove node that is not a child', () => {
    const masterTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    const imposter = new Tree({ value: 'HA-HA-HA!!!' });

    masterTree.removeChild(imposter);

    expect(masterTree.children.length).toEqual(2);
    expect(masterTree.children[0].value).toEqual('Servant#1');
    expect(masterTree.children[1].value).toEqual('Servant#2');
  });

  it('can remove itself from parent', () => {
    const masterTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    const servantNumber1Tree = masterTree.children[0];
    const servantNumber2Tree = masterTree.children[1];

    servantNumber2Tree.removeItselfFromParent();

    expect(masterTree.hasChild(servantNumber2Tree)).toEqual(false);
    expect(masterTree.children.length).toEqual(1);
    expect(masterTree.children[0]).toBe(servantNumber1Tree);
  });

  it("should do nothing when some tries to remove a tree without a parent from parent simply cause it hasn't parent", () => {
    const masterTree = new Tree({
      value: 'Master'
    });

    masterTree.removeItselfFromParent();
  });

  it('can swap its position in parent with sibling', () => {
    const masterTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
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
    const masterTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    const imposter = new Tree({ value: 'HA-HA-HA!!!' });

    const servantNumber1Tree = masterTree.children[0];
    const servantNumber2Tree = masterTree.children[1];

    expect(servantNumber1Tree.positionInParent).toEqual(0);
    expect(servantNumber2Tree.positionInParent).toEqual(1);

    servantNumber1Tree.swapWithSibling(imposter);

    expect(servantNumber1Tree.positionInParent).toEqual(0);
    expect(servantNumber2Tree.positionInParent).toEqual(1);
  });

  it('has "Leaf" folding type if it is leaf (by default for leaves)', () => {
    const masterTree = new Tree({
      value: 'Master'
    });

    expect(masterTree.isLeaf()).toEqual(true);
    expect(masterTree.isNodeExpanded()).toEqual(false);
    expect(masterTree.isNodeCollapsed()).toEqual(false);
    expect(masterTree.foldingType).toEqual(FoldingType.Leaf);
  });

  it('cannot switch "Leaf" folding type', () => {
    const masterTree = new Tree({
      value: 'Master'
    });

    expect(masterTree.foldingType).toEqual(FoldingType.Leaf);

    masterTree.switchFoldingType();

    expect(masterTree.foldingType).toEqual(FoldingType.Leaf);
  });

  it('has "Empty" folding type if it is branch and has no children', () => {
    const masterTree = new Tree({
      value: 'Master',
      children: []
    });

    expect(masterTree.isBranch()).toEqual(true);
    expect(masterTree.isNodeExpanded()).toEqual(false);
    expect(masterTree.isNodeCollapsed()).toEqual(false);
    expect(masterTree.foldingType).toEqual(FoldingType.Empty);
  });

  it('cannot switch "Empty" folding type', () => {
    const masterTree = new Tree({
      value: 'Master',
      children: []
    });

    expect(masterTree.foldingType).toEqual(FoldingType.Empty);

    masterTree.switchFoldingType();

    expect(masterTree.foldingType).toEqual(FoldingType.Empty);
  });

  it('has "Expanded" folding type if it is branch and expanded (by default for branches)', () => {
    const masterTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    expect(masterTree.isBranch()).toEqual(true);
    expect(masterTree.isNodeExpanded()).toEqual(true);
    expect(masterTree.isNodeCollapsed()).toEqual(false);
    expect(masterTree.foldingType).toEqual(FoldingType.Expanded);
  });

  it('can switch "Branch" folding type', () => {
    const masterTree = new Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });

    expect(masterTree.foldingType).toEqual(FoldingType.Expanded);
    expect(masterTree.isNodeExpanded()).toEqual(true);
    expect(masterTree.isNodeCollapsed()).toEqual(false);

    masterTree.switchFoldingType();

    expect(masterTree.foldingType).toEqual(FoldingType.Collapsed);
    expect(masterTree.isNodeExpanded()).toEqual(false);
    expect(masterTree.isNodeCollapsed()).toEqual(true);

    masterTree.switchFoldingType();

    expect(masterTree.foldingType).toEqual(FoldingType.Expanded);
    expect(masterTree.isNodeExpanded()).toEqual(true);
    expect(masterTree.isNodeCollapsed()).toEqual(false);
  });

  it('has undefined status by default', () => {
    const masterTree = new Tree({
      value: 'Master'
    });

    expect(masterTree.isNew()).toEqual(false);
    expect(masterTree.isBeingRenamed()).toEqual(false);
    expect(masterTree.isModified()).toEqual(false);
  });

  it('can be marked as new', () => {
    const masterTree = new Tree({ value: 'Master' });

    masterTree.markAsNew();
    expect(masterTree.isNew()).toEqual(true);
  });

  it('can be marked as modified', () => {
    const masterTree = new Tree({ value: 'Master' });

    masterTree.markAsModified();
    expect(masterTree.isModified()).toEqual(true);
  });

  it('can be marked as being renamed', () => {
    const masterTree = new Tree({ value: 'Master' });

    masterTree.markAsBeingRenamed();
    expect(masterTree.isBeingRenamed()).toEqual(true);
  });

  it('can load its children asynchronously', (done: Function) => {
    const tree = new Tree({
      value: 'AsyncParent',
      loadChildren: (callback: Function) => {
        setTimeout(() => {
          callback([{ value: 'Child#1' }, { value: 'Child#2' }]);
        }, 10);
      }
    });

    tree.switchFoldingType();
    tree.childrenAsync.subscribe((children: Tree[]) => {
      expect(tree.children.length).toEqual(2);
      expect(tree.children[0].value).toEqual(children[0].value);
      expect(tree.children[1].value).toEqual(children[1].value);
      done();
    });
  });

  it('has right statuses while loading its children asynchronously', (done: Function) => {
    const tree = new Tree({
      value: 'AsyncParent',
      loadChildren: (callback: Function) => {
        setTimeout(() => {
          callback([{ value: 'Child#1' }, { value: 'Child#2' }]);
        }, 200);
      }
    });

    tree.switchFoldingType();
    expect(tree.childrenWereLoaded()).toEqual(false);
    setTimeout(() => {
      expect(tree.childrenAreBeingLoaded()).toEqual(true);
    }, 110);
    tree.childrenAsync.subscribe((children: Tree[]) => {
      expect(tree.children.length).toEqual(2);
      expect(tree.children[0].value).toEqual(children[0].value);
      expect(tree.children[1].value).toEqual(children[1].value);
      expect(tree.childrenWereLoaded()).toEqual(true);
      expect(tree.childrenAreBeingLoaded()).toEqual(false);
      done();
    });
  });

  it('can load its children asynchronously: loads children only once', (done: Function) => {
    let loadCount = 0;
    const tree = new Tree({
      value: 'AsyncParent',
      loadChildren: (callback: Function) => {
        loadCount++;
        setTimeout(() => {
          callback([{ value: 'Child#1' }, { value: 'Child#2' }]);
        }, 10);
      }
    });

    tree.switchFoldingType();
    expect(tree.childrenAsync === tree.childrenAsync).toEqual(
      true,
      'observable for children loading gets created just once'
    );
    tree.childrenAsync.subscribe(() => {
      tree.childrenAsync.subscribe((children: Tree[]) => {
        expect(loadCount).toEqual(1, 'children should be loaded only once');
        expect(tree.children.length).toEqual(2);
        expect(tree.children[0].value).toEqual(children[0].value);
        expect(tree.children[1].value).toEqual(children[1].value);
        done();
      });
    });
  });

  it('can load its children asynchronously: node with async children should be collapsed by defualt', () => {
    const tree = new Tree({
      value: 'AsyncParent',
      loadChildren: (callback: Function) => {
        setTimeout(() => {
          callback([{ value: 'Child#1' }, { value: 'Child#2' }]);
        }, 10);
      }
    });

    expect(tree.foldingType).toEqual(FoldingType.Collapsed);
  });

  it('can add a custom template to the node or leaf', () => {
    const masterTree = new Tree({
      value: 'Master',
      settings: {
        templates: {
          node: '<i class="folder"></i>',
          leaf: '<i class="file"></i>'
        }
      },
      children: [
        { value: 'Servant#1' },
        {
          value: 'Servant#2',
          children: [{ value: 'Servant#2.1' }]
        }
      ]
    });

    expect(masterTree.nodeTemplate).toEqual('<i class="folder"></i>');
    expect(masterTree.children[0].nodeTemplate).toEqual('<i class="file"></i>');
    expect(masterTree.children[1].nodeTemplate).toEqual('<i class="folder"></i>');
  });

  it('can add a css classes for expanded, collapsed nodes', () => {
    const masterTree = new Tree({
      value: 'Master',
      settings: {
        cssClasses: {
          expanded: 'fa fa-caret-down',
          collapsed: 'fa fa-caret-right',
          leaf: 'fa'
        },
        templates: {
          node: '<i class="folder"></i>',
          leaf: '<i class="file"></i>'
        }
      },
      children: [
        { value: 'Servant#1' },
        {
          value: 'Servant#2',
          children: [{ value: 'Servant#2.1' }]
        }
      ]
    });

    expect(masterTree.isNodeExpanded()).toEqual(true, 'initially node is expanded');
    expect(masterTree.foldingCssClass).toEqual('fa fa-caret-down');

    masterTree.switchFoldingType();

    expect(masterTree.isNodeExpanded()).toEqual(false, 'node is collapsed');
    expect(masterTree.foldingCssClass).toEqual('fa fa-caret-right');
  });

  it('can add a css classes for empty nodes', () => {
    const masterTree = new Tree({
      value: 'Master',
      settings: {
        cssClasses: {
          empty: 'fa fa-caret-left'
        }
      },
      children: []
    });

    expect(masterTree.isNodeExpanded()).toEqual(false, 'initially node is not expanded');
    expect(masterTree.isNodeCollapsed()).toEqual(false, 'initially node is not collapsed');
    expect(masterTree.foldingCssClass).toEqual('fa fa-caret-left');

    masterTree.switchFoldingType();

    expect(masterTree.isNodeExpanded()).toEqual(false, 'node cannot collapsed');
    expect(masterTree.isNodeCollapsed()).toEqual(false, 'node cannot expand');
    expect(masterTree.foldingCssClass).toEqual('fa fa-caret-left');
  });

  it('can add a css classes for leaf nodes', () => {
    const masterTree = new Tree({
      value: 'Master',
      settings: {
        cssClasses: {
          expanded: 'fa fa-caret-down',
          collapsed: 'fa fa-caret-right',
          leaf: 'fa'
        },
        templates: {
          node: '<i class="folder"></i>',
          leaf: '<i class="file"></i>'
        }
      }
    });

    expect(masterTree.isLeaf()).toEqual(true, 'Node without children is leaf');
    expect(masterTree.foldingCssClass).toEqual('fa');
  });

  it('can add custom template to an element which opens left menu of a node', () => {
    const masterTree = new Tree({
      value: 'Master',
      settings: {
        templates: {
          leftMenu: '<i class="navigation"></i>'
        }
      },
      children: [
        { value: 'Servant#1' },
        {
          value: 'Servant#2',
          settings: {
            leftMenu: true
          },
          children: [{ value: 'Servant#2.1' }]
        }
      ]
    });

    expect(masterTree.leftMenuTemplate).toEqual('');
    expect(masterTree.children[0].leftMenuTemplate).toEqual('');
    expect(masterTree.children[1].leftMenuTemplate).toEqual('<i class="navigation"></i>');
  });

  it('should not load children when they are already loaded', () => {
    const model: TreeModel = {
      value: 'root'
    };

    const tree: Tree = new Tree(model);
    spyOn(tree, 'childrenWereLoaded').and.returnValue(true);

    expect(tree.childrenShouldBeLoaded()).toBe(false);
  });

  it('should load children when hasChildren is true', () => {
    const model: TreeModel = {
      value: 'root',
      emitLoadNextLevel: true,
      id: 6
    };

    const tree: Tree = new Tree(model);

    expect(tree.hasChildren).toBeTruthy();
    expect(tree.childrenShouldBeLoaded()).toBeTruthy();
  });

  it('should be considered as a branch if hasChildren is true', () => {
    const model: TreeModel = {
      value: 'root',
      emitLoadNextLevel: true,
      id: 6
    };

    const tree: Tree = new Tree(model);

    expect(tree.isBranch()).toBeTruthy();
  });

  it('can be converted to TreeModel', () => {
    const model: TreeModel = {
      id: 6,
      value: 'root',
      emitLoadNextLevel: false,
      settings: {
        isCollapsedOnInit: true,
        static: false,
        leftMenu: false,
        rightMenu: true,
        checked: true,
        selectionAllowed: true,
        keepNodesInDOM: true
      },
      children: [
        {
          value: 'child#1',
          emitLoadNextLevel: false,
          settings: {
            isCollapsedOnInit: true,
            static: false,
            leftMenu: false,
            rightMenu: true,
            checked: true,
            selectionAllowed: true,
            keepNodesInDOM: true
          }
        }
      ]
    };

    const tree: Tree = new Tree(model);

    expect(tree.toTreeModel()).toEqual(model);
  });

  it('has selection allowed by default', () => {
    const model: TreeModel = {
      id: 6,
      value: 'root'
    };

    const tree: Tree = new Tree(model);

    expect(tree.selectionAllowed).toBe(true);
  });

  it('can forbid selection', () => {
    const model: TreeModel = {
      id: 6,
      value: 'root'
    };

    const tree: Tree = new Tree(model);
    tree.selectionAllowed = false;

    expect(tree.selectionAllowed).toBe(false);
  });

  it('can allow selection', () => {
    const model: TreeModel = {
      id: 6,
      value: 'root',
      settings: {
        selectionAllowed: false
      }
    };

    const tree: Tree = new Tree(model);

    expect(tree.selectionAllowed).toBe(false);

    tree.selectionAllowed = true;
    expect(tree.selectionAllowed).toBe(true);
  });

  it('does not cascade selectionAllowed setting', () => {
    const model: TreeModel = {
      id: 6,
      value: 'root',
      settings: {
        selectionAllowed: false
      },
      children: [{ value: 'foo' }]
    };

    const tree: Tree = new Tree(model);

    expect(tree.selectionAllowed).toBe(false);
    expect(tree.children[0].selectionAllowed).toBe(true);
  });

  it('has an access to menu items', () => {
    const model: TreeModel = {
      id: 42,
      value: 'root',
      settings: {
        menuItems: [
          {
            action: NodeMenuItemAction.Custom,
            name: 'FooMenuItem',
            cssClass: 'fooMenuItemCss'
          }
        ]
      }
    };

    const tree: Tree = new Tree(model);

    expect(tree.hasCustomMenu()).toBe(true);
    expect(tree.menuItems).toEqual([
      {
        action: NodeMenuItemAction.Custom,
        name: 'FooMenuItem',
        cssClass: 'fooMenuItemCss'
      }
    ]);
  });

  it('static nodes cannot have custom menu', () => {
    const model: TreeModel = {
      id: 42,
      value: 'root',
      settings: {
        static: true,
        menuItems: [
          {
            action: NodeMenuItemAction.Custom,
            name: 'FooMenuItem',
            cssClass: 'fooMenuItemCss'
          }
        ]
      }
    };

    const tree: Tree = new Tree(model);

    expect(tree.hasCustomMenu()).toBe(false);
  });

  it('does not have custom menu without menu items', () => {
    const model: TreeModel = {
      id: 42,
      value: 'root'
    };

    const tree: Tree = new Tree(model);

    expect(tree.hasCustomMenu()).toBe(false);
  });
});
