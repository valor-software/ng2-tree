export type NodeEditableEventType = 'blur' | 'keyup';

export enum NodeEditableEventAction {
  Cancel
}

export interface NodeEditableEvent {
  value: string;
  type: NodeEditableEventType;
  action?: NodeEditableEventAction;
}
