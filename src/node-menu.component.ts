import {Component, EventEmitter, Output, Renderer, Inject, OnDestroy, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {MouseButtons, NodeMenuItemAction, NodeMenuItemSelectedEvent, NodeMenuAction} from './types';
import {NodeMenuService} from './node-menu.service';

@Component({
  selector: 'node-menu',
  styles: [require('./node-menu.component.styl')],
  template: require('./node-menu.component.html'),
  directives: [CORE_DIRECTIVES]
})
export class NodeMenuComponent implements OnInit, OnDestroy {
  @Output()
  private menuItemSelected: EventEmitter<NodeMenuItemSelectedEvent> = new EventEmitter<NodeMenuItemSelectedEvent>();

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

  private disposersForGlobalListeners: Function[] = [];

  public constructor(
    @Inject(Renderer) private renderer: Renderer,
    @Inject(NodeMenuService) private nodeMenuService: NodeMenuService) {
  }

  private onMenuItemSelected($event: any, selectedMenuItem: NodeMenuItem) {
    if (!this.isSelectionValid($event)) {
      return;
    }
    this.menuItemSelected.emit({nodeMenuItemAction: selectedMenuItem.action});
  }

  private isSelectionValid($event: any) {
    return $event.which === MouseButtons.Left;
  }

  private closeMenu(event: any) {
    const mouseClicked = event instanceof MouseEvent;
    const escapePressed = event instanceof KeyboardEvent && event.key === 'Escape';

    if (escapePressed || mouseClicked) {
      this.nodeMenuService.nodeMenuEvents$.next({sender: event.target, action: NodeMenuAction.Close});
    }
  }

  ngOnInit(): void {
    this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'keyup', this.closeMenu.bind(this)));
    this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'click', this.closeMenu.bind(this)));
  }

  ngOnDestroy(): void {
    this.disposersForGlobalListeners.forEach(dispose => dispose());
  }
}

interface NodeMenuItem {
  name: string;
  action: NodeMenuItemAction;
  cssClass: string;
}
