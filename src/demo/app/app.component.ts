import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2TreeSettings, NodeEvent, RenamableNode, TreeModel } from '../../../index';
import { NodeMenuItemAction } from '../../menu/menu.events';
import { TreeController } from '../../tree-controller';
import { MenuItemSelectedEvent } from '../../tree.events';

declare const alertify: any;

@Component({
  selector: 'app',
  template: `
    <div class="tree-demo-app">
        <div class="tree-container">
            <div class="tree-info">
                <p class="tree-title">Fonts tree</p>
            </div>
            <div class="tree-content">
                <tree #treeFonts
                      [tree]="fonts"
                      [settings]="{rootIsVisible: false}"
                      (menuItemSelected)="onMenuItemSelected($event)"
                      (nodeRemoved)="onNodeRemoved($event)"
                      (nodeRenamed)="onNodeRenamed($event)"
                      (nodeSelected)="onNodeSelected($event)"
                      (nodeMoved)="onNodeMoved($event)"
                      (nodeCreated)="onNodeCreated($event)"
                      (nodeExpanded)="onNodeExpanded($event)"
                      (nodeCollapsed)="onNodeCollapsed($event)">
                </tree>
            </div>
        </div>
        <div class="tree-container">
            <div class="tree-info">
                <p class="tree-title">Programming languages tree</p>
                <p class="notice">this tree is loaded asynchronously</p>
            </div>
            <div class="tree-content">
                <tree [tree]="pls"
                      [settings]="disabledCheckboxesSettings"
                      (nodeRemoved)="onNodeRemoved($event)"
                      (nodeRenamed)="onNodeRenamed($event)"
                      (nodeSelected)="onNodeSelected($event)"
                      (nodeMoved)="onNodeMoved($event)"
                      (nodeCreated)="onNodeCreated($event)">
                </tree>
            </div>
        </div>
        <div class="tree-container tree-container--with-controls">
            <div class="tree-info">
                <p class="tree-title">Directory/File structure</p>
                <p class="notice">this tree has advanced configurations</p>
            </div>
            <div class="tree-content">
                <tree #treeFFS
                      [tree]="ffs"
                      (nodeRemoved)="onNodeRemoved($event)"
                      (nodeRenamed)="onNodeRenamed($event)"
                      (nodeSelected)="onNodeSelected($event)"
                      (nodeUnselected)="onNodeUnselected($event)"
                      (nodeMoved)="onNodeMoved($event)"
                      (nodeCreated)="onNodeFFSCreated($event)"
                      (nodeExpanded)="onNodeExpanded($event)"
                      (nodeCollapsed)="onNodeCollapsed($event)"
                      [settings]="settings">
                </tree>
            </div>

            <div class="tree-controlls">
                <p class="notice">Tree API exposed via TreeController</p>
                <button button (click)="handleActionOnFFS(21, 'expandToParent')">Select 'unicode.pf2' up to root</button>
                <button button (click)="handleActionOnFFS(13, 'select')">Select 'boot' node</button>
                <button button (click)="handleActionOnFFS(13, 'unselect')">Unselect 'boot' node</button>
                <button button (click)="handleActionOnFFS(13, 'allowSelection')">Allow selection of the 'boot' node</button>
                <button button (click)="handleActionOnFFS(13, 'forbidSelection')">Forbid selection of the 'boot' node</button>
                <button button (click)="handleActionOnFFS(2, 'collapse')">Collapse 'bin' node</button>
                <button button (click)="handleActionOnFFS(2, 'expand')">Expand 'bin' node</button>
                <button button (click)="renameFFS(21)">Rename 'unicode.pf2' to 'unicode.pf'</button>
                <button button (click)="handleActionOnFFS(12, 'remove')">Remove 'nano'</button>
                <button button (click)="handleActionOnFFS(52, 'reloadChildren')">Reload Music's children</button>
                <button button (click)="setChildrenFFS(36)">Set 'etc' children</button>
                <button button (click)="addChildFFS(2, {value: 'ping'})">Add a child with name 'ping' to 'bin'</button>
                <button button (click)="addChildFFS(22, {value: 'lost'})">Add a child with name 'lost' to 'lost+found'</button>
                <button button (click)="addChildFFS(22, {value: 'found', children: []})">Add a child with name 'found' to 'lost+found'</button>
                <button button (click)="addChildFFS(36, {value: 'found', children: []})">Add a child with name 'found' to 'etc'</button>
                <button button (click)="addChildFFS(78, {value: 'Voodo People'})">Add a child with name 'Voodo People' to '2Cellos'</button>
                <button button (click)="checkFolder(52)">Check Music folder</button>
                <button button (click)="uncheckFolder(52)">Uncheck Music folder</button>
            </div>
        </div>
        <div class="tree-container">
            <div class="tree-info">
                <p class="tree-title">Programming languages tree</p>
                <p class="notice">this tree is using a custom template</p>
            </div>
            <div class="tree-content">
                <tree [tree]="icons"
                      [settings]="settings"
                      (nodeRemoved)="onNodeRemoved($event)"
                      (nodeRenamed)="onNodeRenamed($event)"
                      (nodeSelected)="onNodeSelected($event)"
                      (nodeMoved)="onNodeMoved($event)"
                      (nodeCreated)="onNodeCreated($event)">
                    <ng-template let-node>
                        <i class="fa {{node.icon}}"></i>
                        <span class="node-name" [innerHTML]="node.value"></span>
                    </ng-template>
                </tree>
            </div>
        </div>
        <div>
            <div class="tree-info">
                <p class="tree-title">Custom right click GUI tree</p>
                <p class="notice">this tree is using a custom right click menu</p>
            </div>
            <div class="tree-content">
                <tree [tree]="custom"
                      (nodeSelected)="onNodeSelected($event)">
                </tree>
            </div>
        </div>
    </div>
  `,
  styles: [
    `
    .tree-info {
        flex: 1 0 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .tree-controlls {
        display: flex;
        flex-direction: column;
      }

      .tree-content {
        display: flex;
        flex-direction: column;
      }

      .tree-container {
        margin-bottom: 20px;

      }

      .tree-container--with-controls {
        display: flex;
        flex-wrap: wrap;
      }

      .tree-demo-app {
        display: flex;
        flex-direction: column;
        margin-bottom:50px;
      }

      .tree-title {
        margin: 0;
        color: #40a070;
        font-size: 2em;
      }

      .notice {
        color: #e91e63;
        font-size: 1.2em;
        font-style: italic;
      }

      :host /deep/ .fa {
        cursor: pointer;
      }

      :host /deep/ .fa.disabled {
        cursor: inherit;
        color: #757575;
      }

      .button {
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 #888;
        background-color: #fff;
        -webkit-appearance: none;
        border: 1px solid #000;
        height: 35px;
        outline: none;
      }

      .button-pressed {
        box-shadow: 0 0 1px 0 #888;
      }

      .tree-controlls button {
        margin: 5px;
      }
  `
  ]
})
export class AppComponent implements OnInit {
  public settings: Ng2TreeSettings = {
    rootIsVisible: false,
    showCheckboxes: true
  };

  public disabledCheckboxesSettings: Ng2TreeSettings = {
    rootIsVisible: false,
    showCheckboxes: true,
    enableCheckboxes: false
  };

  public fonts: TreeModel = {
    value: 'Fonts',
    settings: {
      isCollapsedOnInit: true
    },
    children: [
      {
        value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
        id: 1,
        settings: {
          static: true
        },
        children: [
          { value: '<a href="#" id="antiqua" class="test">Antiqua</a> with HTML tags.', id: 2 },
          { value: 'DejaVu Serif', id: 3 },
          { value: 'Garamond', id: 4 },
          { value: 'Georgia', id: 5 },
          { value: 'Times New Roman', id: 6 },
          {
            value: 'Slab serif',
            id: 7,
            children: [{ value: 'Candida', id: 8 }, { value: 'Swift', id: 9 }, { value: 'Guardian Egyptian', id: 10 }]
          }
        ]
      },
      {
        value: 'Sans-serif (Right click me - I have a custom menu)',
        id: 11,
        settings: {
          menuItems: [
            { action: NodeMenuItemAction.Custom, name: 'Foo', cssClass: 'fa fa-arrow-right' },
            { action: NodeMenuItemAction.Custom, name: 'Bar', cssClass: 'fa fa-arrow-right' },
            { action: NodeMenuItemAction.Custom, name: 'Baz', cssClass: 'fa fa-arrow-right' }
          ]
        },
        children: [
          { value: 'Arial', id: 12 },
          { value: 'Century Gothic', id: 13 },
          { value: 'DejaVu Sans', id: 14 },
          { value: 'Futura', id: 15 },
          { value: 'Geneva', id: 16 },
          { value: 'Liberation Sans', id: 17 }
        ]
      },
      {
        value: 'Monospace - With ASYNC CHILDREN',
        id: 18,
        // children property is ignored if "loadChildren" is present
        children: [{ value: 'I am the font that will be ignored' }],
        loadChildren: callback => {
          setTimeout(() => {
            callback([
              { value: 'Input Mono', id: 19 },
              { value: 'Roboto Mono', id: 20 },
              { value: 'Liberation Mono', id: 21 },
              { value: 'Hack', id: 22 },
              { value: 'Consolas', id: 23 },
              { value: 'Menlo', id: 24 },
              { value: 'Source Code Pro', id: 25 }
            ]);
          }, 5000);
        }
      }
    ]
  };

  @ViewChild('treeFonts') public treeFonts;

  public pls: TreeModel;

  public ffs: TreeModel = {
    value: '/',
    id: 1,
    settings: {
      cssClasses: {
        expanded: 'fa fa-caret-down',
        collapsed: 'fa fa-caret-right',
        empty: 'fa fa-caret-right disabled',
        leaf: 'fa'
      },
      templates: {
        node: '<i class="fa fa-folder-o"></i>',
        leaf: '<i class="fa fa-file-o"></i>'
      }
    },
    children: [
      {
        value: 'bin',
        id: 2,
        children: [
          { value: 'bash', id: 3 },
          { value: 'umount', id: 4 },
          { value: 'cp', id: 5 },
          { value: 'less', id: 6 },
          { value: 'rmdir', id: 7 },
          { value: 'touch', id: 8 },
          { value: 'chgrp', id: 9 },
          { value: 'chmod', id: 10 },
          { value: 'chown', id: 11 },
          { value: 'nano', id: 12 }
        ],
        settings: {
          isCollapsedOnInit: true
        }
      },
      {
        value: 'boot',
        id: 13,
        settings: {
          isCollapsedOnInit: true,
          keepNodesInDOM: true
        },
        children: [
          {
            value: 'grub',
            id: 14,
            children: [
              { value: 'fonts', id: 15 },
              { value: 'gfxblacklist.txt', id: 16 },
              { value: 'grub.cfg', id: 17 },
              { value: 'grubenv', id: 18 },
              { value: 'i386-pc', id: 19 },
              { value: 'locale', id: 20 },
              { value: 'unicode.pf2', id: 21 }
            ]
          },
          {
            value: 'lost+found',
            id: 22,
            children: [],
            settings: {
              checked: true
            }
          },
          { value: 'abi-4.4.0-57-generic', id: 23 },
          { value: 'config-4.4.0-57-generic', id: 24 },
          { value: 'initrd.img-4.4.0-47-generic', id: 25 },
          { value: 'initrd.img-4.4.0-57-generic', id: 26 },
          { value: 'memtest86+.bin', id: 27 },
          { value: 'System.map-4.4.0-57-generic', id: 28 },
          { value: 'memtest86+.elf', id: 29 },
          { value: 'vmlinuz-4.4.0-57-generic', id: 30 },
          { value: 'memtest86+_multiboot.bin', id: 31 }
        ]
      },
      {
        value: 'build-no-left-no-right-menus',
        id: 32,
        settings: {
          leftMenu: false,
          rightMenu: false
        },
        children: [
          {
            value: 'php5-left-menu',
            id: 33,
            settings: {
              leftMenu: true
            }
          },
          {
            value: 'grails-left-menu',
            id: 335,
            settings: {
              leftMenu: true
            }
          },
          {
            value: 'python-right-menu',
            id: 333,
            settings: {
              rightMenu: true
            }
          }
        ]
      },
      { value: 'cdrom', id: 34, children: [] },
      { value: 'dev', id: 35, children: [] },
      {
        value: 'etc',
        id: 36,
        loadChildren: callback => {
          console.log('callback function called to load etc`s children');
          setTimeout(() => {
            callback([
              { value: 'apache2', id: 82, children: [] },
              { value: 'nginx', id: 83, children: [] },
              { value: 'dhcp', id: 84, children: [] },
              { value: 'dpkg', id: 85, children: [] }
            ]);
          });
        }
      },
      {
        value: 'home',
        id: 37,
        children: [
          {
            value: 'firstUser',
            id: 38,
            children: [
              {
                value: 'Documents',
                id: 39,
                children: [
                  {
                    value: 'home',
                    id: 40,
                    children: [
                      {
                        value: 'bills',
                        id: 41,
                        children: [
                          { value: '2016-07-01-mobile.pdf', id: 42 },
                          { value: '2016-07-01-electricity.pdf', id: 43 },
                          { value: '2016-07-01-water.pdf', id: 44 },
                          { value: '2016-07-01-internet.pdf', id: 45 },
                          { value: '2016-08-01-mobile.pdf', id: 46 },
                          { value: '2016-10-01-internet.pdf', id: 47 }
                        ]
                      },
                      { value: 'photos', id: 48, children: [] }
                    ]
                  }
                ]
              },
              { value: 'Downloads', id: 49, children: [] },
              { value: 'Desktop', id: 50, children: [] },
              { value: 'Pictures', id: 51, children: [] },
              {
                value: 'Music',
                id: 52,
                children: [{ value: "won't be displayed" }],
                loadChildren: callback => {
                  setTimeout(() => {
                    callback([
                      { value: '2Cellos', id: 78, children: [] },
                      { value: 'Michael Jackson', id: 79, children: [] },
                      { value: 'AC/DC', id: 80, children: [] },
                      { value: 'Adel', id: 81, children: [] }
                    ]);
                  }, 5000);
                }
              },
              { value: 'Public', id: 53, children: [] }
            ]
          },
          {
            value: 'secondUser - left menu templates',
            id: 54,
            settings: {
              leftMenu: true
            },
            children: [
              { value: 'Documents', id: 55, children: [] },
              {
                value: 'Downloads - custom left menu template',
                id: 56,
                settings: {
                  templates: {
                    leftMenu: '<i class="fa fa-navicon"></i>'
                  }
                },
                children: [
                  { value: 'Actobat3', id: 57 },
                  { value: 'Complib', id: 58 },
                  { value: 'Eudora', id: 59 },
                  { value: 'java', id: 60 },
                  { value: 'drivers', id: 61 },
                  { value: 'kathy', id: 62 }
                ]
              },
              { value: 'Desktop', id: 63, children: [] },
              { value: 'Pictures', id: 64, children: [] },
              { value: 'Music', id: 65, children: [] },
              { value: 'Public', id: 66, children: [] }
            ]
          }
        ]
      },
      { value: 'lib', id: 67, children: [] },
      { value: 'media', id: 68, children: [] },
      { value: 'opt', id: 69, children: [] },
      { value: 'proc', id: 70, children: [] },
      { value: 'root', id: 71, children: [] },
      { value: 'run', id: 72, children: [] },
      { value: 'sbin', id: 73, children: [] },
      { value: 'srv', id: 74, children: [] },
      { value: 'sys', id: 75, children: [] },
      { value: 'usr', id: 76, children: [] },
      { value: 'var', id: 77, children: [] }
    ]
  };
  private lastFFSNodeId = 86;

  @ViewChild('treeFFS') public treeFFS;

  public icons: TreeModel = {
    value: 'Icons',
    children: [
      {
        value: 'Web Application Icons',
        children: [
          { value: 'calendar', icon: 'fa-calendar' },
          { value: 'download', icon: 'fa-download' },
          { value: 'group', icon: 'fa-group' },
          { value: 'print', icon: 'fa-print' }
        ]
      },
      {
        value: 'Hand Icons',
        children: [
          { value: 'pointer', icon: 'fa-hand-pointer-o' },
          { value: 'grab', icon: 'fa-hand-rock-o' },
          { value: 'thumbs up', icon: 'fa-thumbs-o-up ' },
          { value: 'thumbs down', icon: 'fa-thumbs-o-down' }
        ]
      },
      {
        value: 'File Type Icons',
        children: [
          { value: 'file', icon: 'fa-file-o' },
          { value: 'audio', icon: 'fa-file-audio-o' },
          { value: 'movie', icon: 'fa-file-movie-o ' },
          { value: 'archive', icon: 'fa-file-zip-o' }
        ]
      }
    ]
  };

  public custom: TreeModel = {
    settings: {
      menuItems: [
        { action: NodeMenuItemAction.NewFolder, name: 'Add parent node', cssClass: '' },
        { action: NodeMenuItemAction.NewTag, name: 'Add child node', cssClass: '' },
        { action: NodeMenuItemAction.Remove, name: 'Remove node', cssClass: '' },
        { action: NodeMenuItemAction.Rename, name: 'Rename node', cssClass: '' },
        { action: NodeMenuItemAction.Custom, name: 'Custom Action', cssClass: '' }
      ]
    },
    value: 'TestParent',
    children: [{ value: 'TestChild', icon: '' }]
  };

  private static logEvent(e: NodeEvent, message: string): void {
    console.log(e);
    alertify.message(`${message}: ${e.node.value}`);
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this.pls = {
        value: 'Programming languages by programming paradigm',
        children: [
          {
            value: 'Aspect-oriented programming',
            children: [{ value: 'AspectJ' }, { value: 'AspectC++' }]
          },
          {
            value: 'Object-oriented programming',
            children: [
              {
                value: {
                  name: 'Java',
                  setName(name: string): void {
                    this.name = name;
                  },
                  toString(): string {
                    return this.name;
                  }
                } as RenamableNode
              },
              { value: 'C++' },
              { value: 'C#' }
            ]
          },
          {
            value: 'Prototype-based programming',
            children: [{ value: 'JavaScript' }, { value: 'CoffeeScript' }, { value: 'TypeScript' }]
          }
        ]
      };
    }, 2000);
  }

  public onNodeRemoved(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Removed');
  }

  public onNodeMoved(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Moved');
  }

  public onNodeRenamed(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Renamed');
  }

  public onNodeCreated(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Created');
  }

  public onNodeFFSCreated(e: NodeEvent, controller?: TreeController): void {
    AppComponent.logEvent(e, 'Created');
    if (controller) {
      controller.changeNodeId(++this.lastFFSNodeId);
    }
  }

  public onNodeSelected(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Selected');
  }

  public onNodeUnselected(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Unselected');
  }

  public onMenuItemSelected(e: MenuItemSelectedEvent) {
    AppComponent.logEvent(e, `You selected ${e.selectedItem} menu item`);
  }

  public onNodeExpanded(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Expanded');
  }

  public onNodeCollapsed(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Collapsed');
  }

  public handleActionOnFFS(id: number | string, action: string) {
    const treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController && typeof treeController[action] === 'function') {
      treeController[action]();
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  }

  public renameFFS(id: number | string) {
    const treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController) {
      treeController.rename('unicode.pf');
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  }

  public setChildrenFFS(id: number | string) {
    const treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController && typeof treeController.setChildren === 'function') {
      treeController.setChildren([
        { value: 'apache2', id: 82, children: [] },
        { value: 'nginx', id: 83, children: [] },
        { value: 'dhcp', id: 84, children: [] },
        { value: 'dpkg', id: 85, children: [] },
        { value: 'gdb', id: 86, children: [] }
      ]);
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  }

  public addChildFFS(id: number | string, newNode: TreeModel) {
    newNode.id = ++this.lastFFSNodeId;
    const treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController) {
      treeController.addChild(newNode);
    } else {
      console.log(`Controller is absent for a node with id: ${id}`);
    }
  }

  public checkFolder(id: number): void {
    const treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController) {
      treeController.check();
    } else {
      console.log(`Controller is absent for a node with id: ${id}`);
    }
  }

  public uncheckFolder(id: number): void {
    const treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController) {
      treeController.uncheck();
    } else {
      console.log(`Controller is absent for a node with id: ${id}`);
    }
  }
}
