import { Component, EventEmitter, ViewChild, ElementRef, Input, Output, Renderer, Inject, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { MenuItemSelectedEvent, MenuItemAction, MenuEvent, MenuAction } from './menu.types';
import { MenuOptions, MenuItem } from '../options.types';
import { isLeftButtonClicked, isEscapePressed } from '../utils/event.utils';
import { TreeModel, TreeStatus } from '../tree.types';

@Component({
  selector: 'menu',
  template: `
  <div [ngClass]="menuOptions.menuClass">
    <button #button class="menu-button">
      <div #buttonIcon class="collapsed"></div>
      <span>Menu</span>
    </button>
    <ul #menuContent class="menu-content collapsed">
      <li class="menu-item" *ngFor="let menuItem of availableMenuItems"
          (click)="onMenuItemSelected($event, menuItem)">
        <div class="menu-item-icon" [ngClass]="menuItem.cssClass"></div>
        <span>{{menuItem.name}}</span>
      </li>
    </ul>
  </div>
  `

})
export class MenuComponent implements OnInit, OnDestroy {
  @Input()
  public menuOptions: MenuOptions;

  @Input()
  public rootNode: TreeModel;

  @Output()
  public menuItemSelected: EventEmitter<MenuItemSelectedEvent> = new EventEmitter<MenuItemSelectedEvent>();

  @ViewChild('menuContent') menuContent: ElementRef;
  @ViewChild('button') button: ElementRef;
  @ViewChild('buttonIcon') buttonIcon: ElementRef;

  public availableMenuItems: Array<MenuItem>;

  private disposersForListeners: Function[] = [];
  private disposersForGlobalListeners: Function[] = [];
  private isMenuVisible: boolean = false;

  public constructor(@Inject(Renderer) private renderer: Renderer,
                     @Inject(MenuService) private menuService: MenuService) {
  }

  public ngOnInit(): void {
    this.isMenuVisible = false;
    this.menuOptions = new MenuOptions(this.menuOptions);
    this.availableMenuItems = MenuOptions.getMainMenuItems(this.menuOptions, this.rootNode);
    this.disposersForListeners.push(this.renderer.listen(this.button.nativeElement, 'click', this.showMenu.bind(this)));
  }

  public ngOnDestroy(): void {
    this.disposersForGlobalListeners.forEach((dispose: Function) => dispose());
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
            var newNode: TreeModel = {value: '', systems: this.rootNode.systems};
            newNode.systems.status = TreeStatus.New;
            this.rootNode.children.push(newNode)
            break;
          case MenuItemAction.NewNode.name:
            console.log('in MenuItemAction.NewNode.name');
            if (!this.rootNode.children || !this.rootNode.children.push) {
              this.rootNode.children = [];
            }
            var newNode: TreeModel = {value: '', systems: this.rootNode.systems};
            newNode.systems.status = TreeStatus.New;
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

  private fireCloseMenu(e: MouseEvent | KeyboardEvent): void {
    const mouseClicked = e instanceof MouseEvent;
    const escapePressed = e instanceof KeyboardEvent && isEscapePressed(e);

    if (escapePressed || mouseClicked) {
      let isLocalElementClicked = false;
      for (let i = 0; i < this.button.nativeElement.children.length; i++) {
        isLocalElementClicked = isLocalElementClicked || this.button.nativeElement.children[i] === e.target;
      }
      console.log(isLocalElementClicked);
      if (!isLocalElementClicked) {
        this.closeMenu(e);
      }
    }
  }

  private closeMenu(e: MouseEvent | KeyboardEvent): void {
    if (this.isMenuVisible) {
      console.log('close');
      this.isMenuVisible = !this.isMenuVisible;
      this.disposersForListeners.forEach((dispose: Function) => dispose());
      this.disposersForListeners = [];
      this.disposersForListeners.push(this.renderer.listen(this.button.nativeElement, 'click', this.showMenu.bind(this)));

      this.menuContent.nativeElement.className = this.menuContent.nativeElement.className.replace('expanded', 'collapsed');
      this.buttonIcon.nativeElement.className = this.buttonIcon.nativeElement.className.replace('expanded', 'collapsed');

      this.disposersForGlobalListeners.forEach((dispose: Function) => dispose());
      this.disposersForGlobalListeners = [];
    }
  }

  // MENU --------------------------------------------------------------------------------------------------------------

  private showMenu(e: MouseEvent): void {
    if (isLeftButtonClicked(e)) {
      console.log('showMenu');
      this.disposersForListeners.forEach((dispose: Function) => dispose());
      this.disposersForListeners = [];
      this.disposersForListeners.push(this.renderer.listen(this.button.nativeElement, 'click', this.closeMenu.bind(this)));

      this.menuContent.nativeElement.className = this.menuContent.nativeElement.className.replace('collapsed', 'expanded');
      this.buttonIcon.nativeElement.className = this.buttonIcon.nativeElement.className.replace('collapsed', 'expanded');

      this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'keydown', this.fireCloseMenu.bind(this)));
      this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'click', this.fireCloseMenu.bind(this)));

      this.isMenuVisible = !this.isMenuVisible;
    }
  }

}
