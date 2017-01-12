import * as _ from 'lodash';
import { RenamableNode, TreeModel, TreeStatus } from '../tree.types';

export function applyNewValueToRenamable(value: RenamableNode, newValue: string): RenamableNode {
  const renamableValue: RenamableNode = _.merge({}, value as RenamableNode);
  renamableValue.setName(newValue);
  return renamableValue;
}

export function isValueEmpty(value: string): boolean {
  return _.isEmpty(_.trim(value));
}

export function isRenamable(value: any): boolean {
  return value.setName !== undefined && _.isFunction(value.setName);
}

export function isLeaf(node: TreeModel): boolean {
  return !isFolder(node);
}

export function isFolder(node: TreeModel): boolean {
  return Array.isArray(node.children);
}

export function createTreeNode(isFolder: boolean): TreeModel {
  const newNode: TreeModel = {value: '', _status: TreeStatus.New};
  if (isFolder) {
    newNode.children = [];
  }
  return newNode;
}
