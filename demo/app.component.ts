import { Component } from '@angular/core';
import { NodeEvent, TreeModel, TreeComponent, RenamableNode } from '../index';

require('../src/styles.css');

declare const alertify: any;

@Component({
  selector: 'app',
  template: `
    <div class="tree-demo-app">
      <div class="tree-container">
        <p>Fonts tree</p>
        <tree
          [tree]="fonts"
          (nodeRemoved)="onNodeRemoved($event)"
          (nodeRenamed)="onNodeRenamed($event)"
          (nodeSelected)="onNodeSelected($event)"
          (nodeMoved)="onNodeMoved($event)"
          (nodeCreated)="onNodeCreated($event)">
        </tree>
      </div>
      <div class="tree-container">
        <p>Programming languages tree</p>
        <tree
          [tree]="pls"
          (nodeRemoved)="onNodeRemoved($event)"
          (nodeRenamed)="onNodeRenamed($event)"
          (nodeSelected)="onNodeSelected($event)"
          (nodeMoved)="onNodeMoved($event)"
          (nodeCreated)="onNodeCreated($event)">
        </tree>
      </div>
      <div class="tree-container">
        <p>Files tree</p>
        <tree
          [tree]="files"
          [options]="filesOptions"
          (nodeRemoved)="onNodeRemoved($event)"
          (nodeRenamed)="onNodeRenamed($event)"
          (nodeSelected)="onNodeSelected($event)"
          (nodeMoved)="onNodeMoved($event)"
          (nodeCreated)="onNodeCreated($event)"
          (nodeExpanded)="onNodeExpanded($event)"
          (nodeCollapsed)="onNodeCollapsed($event)">
        </tree>
      </div>
      <button (click)="fireClickOnNode($event)">Fire Select</button>
      <button (click)="fireUnClickOnNode($event)">Fire Deselect</button>
      <button (click)="fireExpandOnNode($event)">Fire Expand</button>
      <button (click)="fireCollapseOnNode($event)">Fire Collapse</button>
    </div>
    `,
  styles: [`
   .tree-demo-app {
      margin: auto;
      width: -moz-fit-content;
      width: -webkit-fit-content;
      width: fit-content;
    }
    .tree-demo-app .tree-container {
      float: left;
      vertical-align: top;
      width: 500px;
    }
    .tree-demo-app .tree-container p {
      color: #40a070;
      font-size: 2em;
    }
  `]
})
export class AppComponent {
  public fonts: TreeModel = {
    value: 'Fonts',
    children: [
      {
        value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
        options: {
          static: true
        },
        children: [
          {value: 'Antiqua'},
          {value: 'DejaVu Serif'},
          {value: 'Garamond'},
          {value: 'Georgia'},
          {value: 'Times New Roman'},
          {
            value: 'Slab serif',
            children: [
              {value: 'Candida'},
              {value: 'Swift'},
              {value: 'Guardian Egyptian'}
            ]
          }
        ]
      },
      {
        value: 'Sans-serif',
        children: [
          {value: 'Arial'},
          {value: 'Century Gothic'},
          {value: 'DejaVu Sans'},
          {value: 'Futura'},
          {value: 'Geneva'},
          {value: 'Liberation Sans'}
        ]
      },
      {
        value: 'Monospace',
        children: [
          {value: 'Input Mono'},
          {value: 'Roboto Mono'},
          {value: 'Liberation Mono'},
          {value: 'Hack'},
          {value: 'Consolas'},
          {value: 'Menlo'},
          {value: 'Source Code Pro'}
        ]
      }
    ]
  };

  public pls: TreeModel = {
    value: 'Programming languages by programming paradigm',
    children: [
      {
        value: 'Aspect-oriented programming',
        children: [
          {value: 'AspectJ'},
          {value: 'AspectC++'}
        ]
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
          {value: 'C++'},
          {value: 'C#'}
        ]
      },
      {
        value: 'Prototype-based programming',
        children: [
          {value: 'JavaScript'},
          {value: 'CoffeeScript'},
          {value: 'TypeScript'}
        ]
      }
    ]
  };

  public files: TreeModel = {
    value: '/',
    id: 1,
    options: {
      expanded: true,
      applyToSubtree: false
    },
    children: [
      {
        value: 'bin',
        id: 2,
        children: [
          {value: 'bash', id: 3},
          {value: 'umount', id: 4},
          {value: 'cp', id: 5},
          {value: 'less', id: 6},
          {value: 'rmdir', id: 7},
          {value: 'touch', id: 8},
          {value: 'chgrp', id: 9},
          {value: 'chmod', id: 10},
          {value: 'chown', id: 11},
          {value: 'nano', id: 12}
        ]
      },
      {
        value: 'boot',
        id: 13,
        children: [
          {
            value: 'grub',
            id: 14,
            children: [
              {value: 'fonts', id: 15},
              {value: 'gfxblacklist.txt', id: 16},
              {value: 'grub.cfg', id: 17},
              {value: 'grubenv', id: 18},
              {value: 'i386-pc', id: 19},
              {value: 'locale', id: 20},
              {value: 'unicode.pf2', id: 21}
            ]
          },
          {
            value: 'lost+found',
            id: 22,
            options: {
              cssClasses: {
                nodeExpanded: 'fa fa-circle',
                nodeCollapsed: 'fa fa-circle',
                nodeLeaf: 'fa fa-circle'
              }
            },
            children: []
          },
          {value: 'abi-4.4.0-57-generic', id: 23},
          {value: 'config-4.4.0-57-generic', id: 24},
          {value: 'initrd.img-4.4.0-47-generic', id: 25},
          {value: 'initrd.img-4.4.0-57-generic', id: 26},
          {value: 'memtest86+.bin', id: 27},
          {value: 'System.map-4.4.0-57-generic', id: 28},
          {value: 'memtest86+.elf', id: 29},
          {value: 'vmlinuz-4.4.0-57-generic', id: 30},
          {value: 'memtest86+_multiboot.bin', id: 31}
        ]
      },
      {value: 'build', id: 32, children: [{value: 'php5-XxiyHJ', id: 33}]},
      {value: 'cdrom', id: 34, children: []},
      {value: 'dev', id: 35, children: []},
      {value: 'etc', id: 36, children: []},
      {
        value: 'home',
        id: 37,
        children: [
          {
            value: 'firstUser',
            id: 38,
            options: {
              drag: false,
              cssClasses: {
                nodeCollapsed: 'fa fa-folder',
                nodeExpanded: 'fa fa-folder-open',
                nodeLeaf: 'fa fa-file'
              },
              applyToSubtree: false
            },
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
                          {value: '2016-07-01-mobile.pdf', id: 42, options: {cssClasses: {nodeLeaf: 'fa fa-file-pdf-o'}}},
                          {value: '2016-07-01-electricity.pdf', id: 43, options: {cssClasses: {nodeLeaf: 'fa fa-file-excel-o'}}},
                          {value: '2016-07-01-water.pdf', id: 44, options: {cssClasses: {nodeLeaf: 'fa fa-file-sound-o'}}},
                          {value: '2016-07-01-internet.pdf', id: 45, options: {cssClasses: {nodeLeaf: 'fa fa-file-word-o'}}},
                          {value: '2016-08-01-mobile.pdf', id: 46, options: {cssClasses: {nodeLeaf: 'fa fa-file-archive-o'}}},
                          {value: '2016-10-01-internet.pdf', id: 47, options: {cssClasses: {nodeLeaf: 'fa fa-file-pdf-o'}}}
                        ]
                      },
                      {value: 'photos', id: 48, children: []}
                    ]
                  }
                ]
              },
              {value: 'Downloads', id: 49, children: []},
              {value: 'Desktop', id: 50, children: []},
              {value: 'Pictures', id: 51, children: []},
              {value: 'Music', id: 52, children: []},
              {value: 'Public', id: 53, children: []}
            ]
          },
          {
            value: 'secondUser',
            id: 54,
            options: {
              cssClasses: {
                nodeCollapsed: 'fa fa-folder-o',
                nodeExpanded: 'fa fa-folder-open-o',
                nodeLeaf: 'fa fa-file-o'
              }
            },
            children: [
              {value: 'Documents', id: 55, children: []},
              {
                value: 'Downloads',
                id: 56,
                children: [
                  {value: 'Actobat3', id: 57},
                  {value: 'Complib', id: 58},
                  {value: 'Eudora', id: 59},
                  {value: 'java', id: 60},
                  {value: 'drivers', id: 61},
                  {value: 'kathy', id: 62}
                ]
              },
              {value: 'Desktop', id: 63, children: []},
              {value: 'Pictures', id: 64, children: []},
              {value: 'Music', id: 65, children: []},
              {value: 'Public', id: 66, children: []}
            ]
          }
        ]
      },
      {value: 'lib', id: 67, children: [] },
      {value: 'media', id: 68, children: [] },
      {value: 'opt', id: 69, children: [] },
      {value: 'proc', id: 70, children: [] },
      {value: 'root', id: 71, children: [] },
      {value: 'run', id: 72, children: [] },
      {value: 'sbin', id: 73, children: [] },
      {value: 'srv', id: 74, children: [] },
      {value: 'sys', id: 75, children: [] },
      {value: 'usr', id: 76, children: [] },
      {value: 'var', id: 77, children: [] }
    ]
  };

  public filesOptions = {
    cssClasses: {
      nodeIcon: 'fa fa-folder-o',
      leafIcon: 'fa fa-file-o',
      nodeCollapsed: 'fa fa-arrow-right',
      nodeExpanded: 'fa fa-arrow-down',
      nodeLeaf: ''
    },
    rightMenu: false,
    leftMenu: true,
    mainMenu: true,
    expanded: false,
    selectEvent: false,
    editOnDouleClick: true
  };

  private filesNodes = [];

  constructor() {
    this.getNodes(this.files);
  }

  public getNodes(tree: TreeModel): void {
    this.filesNodes[tree.id] = tree;
    if (tree.children !== undefined) {
      for (let i = 0; i < tree.children.length; i++) {
        this.getNodes(tree.children[i]);
      }
    }
  }

  public onNodeRemoved(e: NodeEvent): void {
    this.logEvent(e, 'Removed');
  }

  public onNodeMoved(e: NodeEvent): void {
    this.logEvent(e, 'Moved');
  }

  public onNodeRenamed(e: NodeEvent): void {
    this.logEvent(e, 'Renamed');
  }

  public onNodeCreated(e: NodeEvent): void {
    this.logEvent(e, 'Created');
  }

  public onNodeSelected(e: NodeEvent): void {
    this.logEvent(e, 'Selected');
  }

  public onNodeExpanded(e: NodeEvent): void {
    this.logEvent(e, 'Expanded');
  }

  public onNodeCollapsed(e: NodeEvent): void {
    this.logEvent(e, 'Collapsed');
  }

  public onNodeCustom(e: NodeEvent, object: any): void {
    console.log('Custom');
    console.log(e);
    console.log(object);
  }

  public logEvent(e: NodeEvent, message: string): void {
    console.log(e);
    alertify.message(`${message}: ${e.node.value}`);
  }

  public fireClickOnNode(e: MouseEvent): void {
    console.log('in fireClickOnNode');
    if (this.filesNodes[5] !== undefined) {
      console.log(this.filesNodes[5]);
      if (this.filesNodes[5].api !== undefined) {
        console.log(this.filesNodes[5].api);
        if (this.filesNodes[5].api.select !== undefined) {
          console.log(this.filesNodes[5].api.select);
          this.filesNodes[5].api.select(e, this.filesNodes[5]);
        } else {
          console.log('no select function');
        }
      } else {
        console.log('no api available');
      }
    } else {
      console.log('no node available');
    }
  }

  public fireUnClickOnNode(e: MouseEvent): void {
    console.log('in fireUnClickOnNode');
    if (this.filesNodes[5] !== undefined) {
      console.log(this.filesNodes[5]);
      if (this.filesNodes[5].api !== undefined) {
        console.log(this.filesNodes[5].api);
        if (this.filesNodes[5].api.deselect !== undefined) {
          console.log(this.filesNodes[5].api.deselect);
          this.filesNodes[5].api.deselect(e, this.filesNodes[5]);
        } else {
          console.log('no deselect function');
        }
      } else {
        console.log('no api available');
      }
    } else {
      console.log('no node available');
    }
  }

  public fireExpandOnNode(e: MouseEvent): void {
    console.log('in fireExpandOnNode');
    if (this.filesNodes[5] !== undefined) {
      console.log(this.filesNodes[5]);
      if (this.filesNodes[5].api !== undefined) {
        console.log(this.filesNodes[5].api);
        if (this.filesNodes[5].api.deselect !== undefined) {
          console.log(this.filesNodes[5].api.deselect);
          this.filesNodes[5].api.deselect(e, this.filesNodes[5]);
        } else {
          console.log('no expand function');
        }
      } else {
        console.log('no api available');
      }
    } else {
      console.log('no node available');
    }
  }

  public fireCollapseOnNode(e: MouseEvent): void {
    console.log('in fireCollapseOnNode');
    if (this.filesNodes[5] !== undefined) {
      console.log(this.filesNodes[5]);
      if (this.filesNodes[5].api !== undefined) {
        console.log(this.filesNodes[5].api);
        if (this.filesNodes[5].api.deselect !== undefined) {
          console.log(this.filesNodes[5].api.deselect);
          this.filesNodes[5].api.deselect(e, this.filesNodes[5]);
        } else {
          console.log('no collapse function');
        }
      } else {
        console.log('no api available');
      }
    } else {
      console.log('no node available');
    }
  }
}
