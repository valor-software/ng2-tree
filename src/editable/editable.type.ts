export type NodeEditableEventType = 'blur' | 'keyup';

export interface NodeEditableEvent {
  value: string,
  type: NodeEditableEventType
}
