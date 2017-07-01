import { TreeModelSettings, TreeModel, FoldingType } from '../src/tree.types';
import { TreeDataProvider } from './data-provider/tree.data-provider';

const using = require('jasmine-data-provider');

describe('TreeModelSettings', () => {
  describe('Merge TreeModelSettings', () => {
    using(TreeDataProvider.treeModelSettings, (data: any, description: string) => {
      it(description, () => {
        expect(TreeModelSettings.merge(data.treeModelA, data.treeModelB)).toEqual(data.result);
      });
    });
  });
});

describe('FoldingType', () => {
  it('should have correct cssClass per folding type', () => {
    expect(FoldingType.Expanded.cssClass).toEqual('node-expanded');
    expect(FoldingType.Collapsed.cssClass).toEqual('node-collapsed');
    expect(FoldingType.Empty.cssClass).toEqual('node-empty');
    expect(FoldingType.Leaf.cssClass).toEqual('node-leaf');
  });
});
