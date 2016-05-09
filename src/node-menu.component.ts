import {Component, EventEmitter, Output} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {MouseButtons, NodeMenuItemAction, NodeMenuItemSelectedEvent} from './types';

@Component({
  selector: 'node-menu',
  styles: [require('./node-menu.component.styl')],
  template: require('./node-menu.component.html'),
  directives: [CORE_DIRECTIVES]
})
export class NodeMenuComponent {
  @Output()
  private menuItemSelected: EventEmitter<NodeMenuItemSelectedEvent> = new EventEmitter();

  private availableMenuItems: NodeMenuItem[] = [
    {
      name: 'New tag',
      action: NodeMenuItemAction.NewTag,
      cssClass: 'new-tag'
    },
    {
      name: 'New folder',
      action: NodeMenuItemAction.NewFolder,
      cssClass: 'new-folder',
    },
    {
      name: 'Rename',
      action: NodeMenuItemAction.Rename,
      cssClass: 'rename'
    },
    {
      name: 'Remove',
      action: NodeMenuItemAction.Remove,
      cssClass: 'remove'
    },
  ];

  private onMenuItemSelected($event: any, selectedMenuItem: NodeMenuItem) {
    if (!this.isSelectionValid($event)) {
      return;
    }

    this.menuItemSelected.emit({nodeMenuItemAction: selectedMenuItem.action});
  }

  private isSelectionValid($event: any) {
    return $event.which === MouseButtons.Left;
  }
}

interface NodeMenuItem {
  name: string;
  action: NodeMenuItemAction;
  cssClass: string;
}
