import { Component, EventEmitter, ViewChild, ElementRef, Input, Output, Renderer, Inject, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { MenuService } from './menu.service';
import { MenuItemSelectedEvent, MenuItemAction, MenuEvent, MenuAction, MenuOptions, MenuItem } from './menu.types';
import { isLeftButtonClicked, isEscapePressed } from '../utils/event.utils';
import { TreeModel, TreeStatus } from '../tree.types';

@Component({
  selector: 'menu',
  template: `
  <div [ngClass]="menuOptions.menuClass">
    <button [ngClass]="menuOptions.buttonClass" (click)="showMenu($event)">
      <div #buttonIcon [ngClass]="menuOptions.buttonIconCollapsedClass"></div>
      <span [ngClass]="menuOptions.buttonTextClass">Menu</span>
    </button>
    <ul #menuContent [ngClass]="menuOptions.menuContentClass + ' ' + menuOptions.menuContentCollapsedClass">
      <li [ngClass]="menuOptions.menuItemClass" *ngFor="let menuItem of availableMenuItems"
          (click)="onMenuItemSelected($event, menuItem)">
        <div [ngClass]="'menu-item-icon ' + menuItem.cssClass"></div>
        <span>{{menuItem.name}}</span>
      </li>
    </ul>
  </div>
  `

})
export class MenuComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input()
  public menuOptions: MenuOptions;

  @Input()
  public rootNode: TreeModel;

  @Output()
  public menuItemSelected: EventEmitter<MenuItemSelectedEvent> = new EventEmitter<MenuItemSelectedEvent>();

  @ViewChild('menuContent') menuContent: ElementRef;
  @ViewChild('buttonIcon') buttonIcon: ElementRef;

  public availableMenuItems: Array<MenuItem> = MenuOptions.getMainMenuItems(this.menuOptions);

  private disposersForGlobalListeners: Function[] = [];
  private isMenuVisible: boolean;

  public constructor(@Inject(Renderer) private renderer: Renderer,
                     @Inject(MenuService) private menuService: MenuService) {
  }

  public ngOnInit(): void {
    this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'keyup', this.closeMenu.bind(this)));
    this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'click', this.closeMenu.bind(this)));
    this.menuOptions = new MenuOptions(this.menuOptions);
    this.availableMenuItems = MenuOptions.getMainMenuItems(this.menuOptions);
    this.isMenuVisible = false;
  }

  public ngOnDestroy(): void {
    this.disposersForGlobalListeners.forEach((dispose: Function) => dispose());
  }

  public ngAfterViewInit() {
  }

  private onMenuItemSelected(e: MouseEvent, selectedMenuItem: MenuItem): void {
    console.log('in onMenuItemSelected');
    if (isLeftButtonClicked(e)) {
      console.log('in onMenuItemSelected first if');
      if (selectedMenuItem.action !== undefined) {
        console.log('in onMenuItemSelected second if');
        console.log(selectedMenuItem);
        switch (selectedMenuItem.action.name) {
          case MenuItemAction.NewLeaf.name:
            console.log('in MenuItemAction.NewLeaf.name');
            if (!this.rootNode.children || !this.rootNode.children.push) {
              this.rootNode.children = [];
            }
            var newNode: TreeModel = {value: '', _status: TreeStatus.New};
            this.rootNode.children.push(newNode)
            break;
          case MenuItemAction.NewNode.name:
            console.log('in MenuItemAction.NewNode.name');
            if (!this.rootNode.children || !this.rootNode.children.push) {
              this.rootNode.children = [];
            }
            var newNode: TreeModel = {value: '', _status: TreeStatus.New};
            newNode.children = [];
            this.rootNode.children.push(newNode)
            break;
          default:
            console.log('in MenuItemAction.Custom.name');
            selectedMenuItem.actionFunction({rootNode: this.rootNode});
        }
      }
    }
  }

  private closeMenu(e: MouseEvent | KeyboardEvent): void {
    const mouseClicked = e instanceof MouseEvent;
    const escapePressed = e instanceof KeyboardEvent && isEscapePressed(e);

    if (this.isMenuVisible) {
      if (escapePressed || mouseClicked) {
        console.log('close');
        this.menuContent.nativeElement.className = this.menuContent.nativeElement.className.replace(this.menuOptions.menuContentExpandedClass, this.menuOptions.menuContentCollapsedClass);
        this.buttonIcon.nativeElement.className = this.buttonIcon.nativeElement.className.replace(this.menuOptions.buttonIconExpandedClass, this.menuOptions.buttonIconCollapsedClass);
        const nodeMenuEvent: MenuEvent = {
          sender: (e.target as HTMLElement),
          action: MenuAction.Close
        };

        this.menuService.menuEvents$.next(nodeMenuEvent);
      }
    }
  }

  // MENU --------------------------------------------------------------------------------------------------------------

  private showMenu(e: MouseEvent): void {
    if (this.rootNode.options.static) {
      return;
    }

    if (isLeftButtonClicked(e)) {
      this.isMenuVisible = !this.isMenuVisible;
      this.menuContent.nativeElement.className = this.menuContent.nativeElement.className.replace(this.menuOptions.menuContentCollapsedClass, this.menuOptions.menuContentExpandedClass);
      this.buttonIcon.nativeElement.className = this.buttonIcon.nativeElement.className.replace(this.menuOptions.buttonIconCollapsedClass, this.menuOptions.buttonIconExpandedClass);
    }
  }

}
