import { Component, EventEmitter, Input, Output, Renderer, Inject, OnDestroy, OnInit } from '@angular/core';
import { NodeMenuService } from './node-menu.service';
import { MenuItemSelectedEvent, MenuItemAction, MenuEvent, MenuAction } from './menu.types';
import { MenuOptions, MenuItem } from '../options.types';
import { TreeModel } from '../tree.types';
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
  @Input()
  public menuOptions: MenuOptions;

  @Output()
  public menuItemSelected: EventEmitter<MenuItemSelectedEvent> = new EventEmitter<MenuItemSelectedEvent>();

  public availableMenuItems: Array<MenuItem> = MenuOptions.getRightMenuItems(this.menuOptions);

  private disposersForGlobalListeners: Function[] = [];

  public constructor(@Inject(Renderer) private renderer: Renderer,
                     @Inject(NodeMenuService) private nodeMenuService: NodeMenuService) {
  }

  public ngOnInit(): void {
    this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'keyup', this.closeMenu.bind(this)));
    this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'click', this.closeMenu.bind(this)));
    this.availableMenuItems = MenuOptions.getRightMenuItems(this.menuOptions);
  }

  public ngOnDestroy(): void {
    this.disposersForGlobalListeners.forEach((dispose: Function) => dispose());
  }

  private onMenuItemSelected(e: MouseEvent, selectedMenuItem: MenuItem): void {
    if (isLeftButtonClicked(e)) {
      if (selectedMenuItem.action !== undefined) {
        this.menuItemSelected.emit({nodeMenuItemAction: selectedMenuItem.action});
      }
    }
  }

  private closeMenu(e: MouseEvent | KeyboardEvent): void {
    const mouseClicked = e instanceof MouseEvent;
    const escapePressed = e instanceof KeyboardEvent && isEscapePressed(e);

    if (escapePressed || mouseClicked) {
      const nodeMenuEvent: MenuEvent = {
        sender: (e.target as HTMLElement),
        action: MenuAction.Close
      };

      this.nodeMenuService.nodeMenuEvents$.next(nodeMenuEvent);
    }
  }
}
