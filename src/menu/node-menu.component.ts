import { Component, EventEmitter, Output, Renderer, Inject, OnDestroy, OnInit } from '@angular/core';
import { NodeMenuService } from './node-menu.service';
import { NodeMenuItemSelectedEvent, NodeMenuItemAction, NodeMenuAction } from './menu.events';
import { isLeftButtonClicked, isEscapePressed } from '../utils/event.utils';

@Component({
  selector: 'node-menu',
  template: `
    <div class="node-menu">
      <ul class="node-menu-content">
        <li class="node-menu-item" *ngFor="let menuItem of availableMenuItems"
            (click)="onMenuItemSelected($event, menuItem)">
          <div class="node-menu-item-icon {{menuItem.cssClass}}"></div>
          <span class="node-menu-item-value">{{menuItem.name}}</span>
        </li>
      </ul>
    </div>
  `
})
export class NodeMenuComponent implements OnInit, OnDestroy {
  @Output()
  public menuItemSelected: EventEmitter<NodeMenuItemSelectedEvent> = new EventEmitter<NodeMenuItemSelectedEvent>();

  public availableMenuItems: NodeMenuItem[] = [
    {
      name: 'New tag',
      action: NodeMenuItemAction.NewTag,
      cssClass: 'new-tag'
    },
    {
      name: 'New folder',
      action: NodeMenuItemAction.NewFolder,
      cssClass: 'new-folder'
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
    }
  ];

  private disposersForGlobalListeners: Function[] = [];

  public constructor(@Inject(Renderer) private renderer: Renderer,
                     @Inject(NodeMenuService) private nodeMenuService: NodeMenuService) {
  }

  public ngOnInit(): void {
    this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'keyup', this.closeMenu.bind(this)));
    this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'click', this.closeMenu.bind(this)));
  }

  public ngOnDestroy(): void {
    this.disposersForGlobalListeners.forEach((dispose: Function) => dispose());
  }

  public onMenuItemSelected(e: MouseEvent, selectedMenuItem: NodeMenuItem): void {
    if (isLeftButtonClicked(e)) {
      this.menuItemSelected.emit({nodeMenuItemAction: selectedMenuItem.action});
    }
  }

  private closeMenu(e: MouseEvent | KeyboardEvent): void {
    const mouseClicked = e instanceof MouseEvent;
    if (mouseClicked || isEscapePressed(e as KeyboardEvent)) {
      this.nodeMenuService.fireMenuEvent(e.target as HTMLElement, NodeMenuAction.Close);
    }
  }
}

export interface NodeMenuItem {
  name: string;
  action: NodeMenuItemAction;
  cssClass: string;
}
