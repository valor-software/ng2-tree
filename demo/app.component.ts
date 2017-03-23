import { Component, OnInit } from '@angular/core';
import { NodeEvent, TreeModel, RenamableNode, Ng2TreeSettings } from '../index';

require('../src/styles.css');

declare const alertify: any;

@Component({
  selector: 'app',
  template: `
    <div class="tree-demo-app">
      <div class="tree-container">
        <p class="tree-title">Fonts tree</p>
        <tree
          [tree]="fonts"
          (nodeRemoved)="onNodeRemoved($event)"
          (nodeRenamed)="onNodeRenamed($event)"
          (nodeSelected)="onNodeSelected($event)"
          (nodeMoved)="onNodeMoved($event)"
          (nodeCreated)="onNodeCreated($event)"
          (nodeExpanded)="onNodeExpanded($event)"
          (nodeCollapsed)="onNodeCollapsed($event)">
        </tree>
      </div>
      <div class="tree-container">
        <p class="tree-title">Programming languages tree</p>
        <p class="notice">this tree is loaded asynchronously</p>
        <tree
          [tree]="pls"
          [settings]="settings"
          (nodeRemoved)="onNodeRemoved($event)"
          (nodeRenamed)="onNodeRenamed($event)"
          (nodeSelected)="onNodeSelected($event)"
          (nodeMoved)="onNodeMoved($event)"
          (nodeCreated)="onNodeCreated($event)">
        </tree>
      </div>
      <div class="tree-container">
        <p class="tree-title">Directory/File structure</p>
        <p class="notice">this tree has advanced configurations</p>
        <tree
          [tree]="dfs"
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
    .tree-title {
      color: #40a070;
      font-size: 2em;
    }
    .notice {
      color: #e91e63;
      font-size: 1.2em;
      font-style: italic;
    }
  `]
})
export class AppComponent implements OnInit {
  public settings: Ng2TreeSettings = {
    rootIsVisible: false
  };

  public fonts: TreeModel = {
    value: 'Fonts',
    children: [
      {
        value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
        settings: {
          'static': true
        },
        children: [
          { value: 'Antiqua' },
          { value: 'DejaVu Serif' },
          { value: 'Garamond' },
          { value: 'Georgia' },
          { value: 'Times New Roman' },
          {
            value: 'Slab serif',
            children: [
              { value: 'Candida' },
              { value: 'Swift' },
              { value: 'Guardian Egyptian' }
            ]
          }
        ]
      },
      {
        value: 'Sans-serif',
        children: [
          { value: 'Arial' },
          { value: 'Century Gothic' },
          { value: 'DejaVu Sans' },
          { value: 'Futura' },
          { value: 'Geneva' },
          { value: 'Liberation Sans' }
        ]
      },
      {
        value: 'Monospace - With ASYNC CHILDREN',
        // children property is ignored if "loadChildren" is present
        children: [{value: 'I am the font that will be ignored'}],
        loadChildren: (callback) => {
          setTimeout(() => {
            callback([
              { value: 'Input Mono' },
              { value: 'Roboto Mono' },
              { value: 'Liberation Mono' },
              { value: 'Hack' },
              { value: 'Consolas' },
              { value: 'Menlo' },
              { value: 'Source Code Pro' }
            ]);
          }, 5000);
        }
      }
    ]
  };

  public pls: TreeModel;

  public dfs: TreeModel = {
    value: '/',
    id: 1,
    settings: {
      cssClasses: {
        expanded: 'fa fa-caret-down',
        collapsed: 'fa fa-caret-right',
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
                          {value: '2016-07-01-mobile.pdf', id: 42},
                          {value: '2016-07-01-electricity.pdf', id: 43},
                          {value: '2016-07-01-water.pdf', id: 44},
                          {value: '2016-07-01-internet.pdf', id: 45},
                          {value: '2016-08-01-mobile.pdf', id: 46},
                          {value: '2016-10-01-internet.pdf', id: 47}
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
            value: 'secondUser - left menu templates',
            id: 54,
            settings: {
              leftMenu: true
            },
            children: [
              {value: 'Documents', id: 55, children: []},
              {
                value: 'Downloads - custom left menu template',
                id: 56,
                settings: {
                  templates: {
                    leftMenu: '<i class="fa fa-navicon"></i>'
                  }
                },
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

  public ngOnInit(): void {
    setTimeout(() => {
      this.pls = {
        value: 'Programming languages by programming paradigm',
        children: [
          {
            value: 'Aspect-oriented programming',
            children: [
              { value: 'AspectJ' },
              { value: 'AspectC++' }
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
              { value: 'C++' },
              { value: 'C#' }
            ]
          },
          {
            value: 'Prototype-based programming',
            children: [
              { value: 'JavaScript' },
              { value: 'CoffeeScript' },
              { value: 'TypeScript' }
            ]
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

  public onNodeSelected(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Selected');
  }

  public onNodeExpanded(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Expanded');
  }

  public onNodeCollapsed(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Collapsed');
  }

  private static logEvent(e: NodeEvent, message: string): void {
    console.log(e);
    alertify.message(`${message}: ${e.node.value}`);
  }
}
