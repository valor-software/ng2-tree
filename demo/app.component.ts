import { Component } from '@angular/core';
import { NodeEvent, TreeModel, RenamableNode } from '../index';

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
          (nodeCreated)="onNodeCreated($event)">
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
    children: [
      {
        value: 'bin',
        children: [
          {value: 'bash'},
          {value: 'umount'},
          {value: 'cp'},
          {value: 'less'},
          {value: 'rmdir'},
          {value: 'touch'},
          {value: 'chgrp'},
          {value: 'chmod'},
          {value: 'chown'},
          {value: 'nano'}
        ]
      },
      {
        value: 'boot',
        children: [
          {
            value: 'grub',
            children: [
              {value: 'fonts'},
              {value: 'gfxblacklist.txt'},
              {value: 'grub.cfg'},
              {value: 'grubenv'},
              {value: 'i386-pc'},
              {value: 'locale'},
              {value: 'unicode.pf2'}
            ]
          },
          {
            value: 'lost+found',
            options: {
              icon: {
                nodeExpanded: 'fa fa-circle',
                nodeCollapsed: 'fa fa-circle',
                nodeLeaf: 'fa fa-circle'
              }
            },
            children: []
          },
          {value: 'abi-4.4.0-57-generic'},
          {value: 'config-4.4.0-57-generic'},
          {value: 'initrd.img-4.4.0-47-generic'},
          {value: 'initrd.img-4.4.0-57-generic'},
          {value: 'memtest86+.bin'},
          {value: 'System.map-4.4.0-57-generic'},
          {value: 'memtest86+.elf'},
          {value: 'vmlinuz-4.4.0-57-generic'},
          {value: 'memtest86+_multiboot.bin'}
        ]
      },
      {value: 'build', children: [{value: 'php5-XxiyHJ'}]},
      {value: 'cdrom', children: []},
      {value: 'dev', children: []},
      {value: 'etc', children: []},
      {
        value: 'home',
        children: [
          {
            value: 'firstUser',
            options: {
              drag: false,
              icon: {
                nodeCollapsed: 'fa fa-folder',
                nodeExpanded: 'fa fa-folder-open',
                nodeLeaf: 'fa fa-file'
              },
              applyToSubtree: false
            },
            children: [
              {
                value: 'Documents',
                children: [
                  {
                    value: 'home',
                    children: [
                      {
                        value: 'bills',
                        children: [
                          {value: '2016-07-01-mobile.pdf', options: {icon: {nodeLeaf: 'fa fa-file-pdf-o'}}},
                          {value: '2016-07-01-electricity.pdf', options: {icon: {nodeLeaf: 'fa fa-file-excel-o'}}},
                          {value: '2016-07-01-water.pdf', options: {icon: {nodeLeaf: 'fa fa-file-sound-o'}}},
                          {value: '2016-07-01-internet.pdf', options: {icon: {nodeLeaf: 'fa fa-file-word-o'}}},
                          {value: '2016-08-01-mobile.pdf', options: {icon: {nodeLeaf: 'fa fa-file-archive-o'}}},
                          {value: '2016-10-01-internet.pdf', options: {icon: {nodeLeaf: 'fa fa-file-pdf-o'}}}
                        ]
                      },
                      {value: 'photos', children: []}
                    ]
                  }
                ]
              },
              {value: 'Downloads', children: []},
              {value: 'Desktop', children: []},
              {value: 'Pictures', children: []},
              {value: 'Music', children: []},
              {value: 'Public', children: []}
            ]
          },
          {
            value: 'secondUser',
            options: {
              icon: {
                nodeCollapsed: 'fa fa-folder-o',
                nodeExpanded: 'fa fa-folder-open-o',
                nodeLeaf: 'fa fa-file-o'
              }
            },
            children: [
              {value: 'Documents', children: []},
              {
                value: 'Downloads',
                children: [
                  {value: 'Actobat3'},
                  {value: 'Complib'},
                  {value: 'Eudora'},
                  {value: 'java'},
                  {value: 'drivers'},
                  {value: 'kathy'}
                ]
              },
              {value: 'Desktop', children: []},
              {value: 'Pictures', children: []},
              {value: 'Music', children: []},
              {value: 'Public', children: []}
            ]
          }
        ]
      },
      {value: 'lib', children: [] },
      {value: 'media', children: [] },
      {value: 'opt', children: [] },
      {value: 'proc', children: [] },
      {value: 'root', children: [] },
      {value: 'run', children: [] },
      {value: 'sbin', children: [] },
      {value: 'srv', children: [] },
      {value: 'sys', children: [] },
      {value: 'usr', children: [] },
      {value: 'var', children: [] }
    ]
  };

  public filesOptions = {
    icon: {
      nodeCollapsed: 'fa fa-folder-o',
      nodeExpanded: 'fa fa-folder-open-o',
      nodeLeaf: 'fa fa-file-o'
    },
    rightMenu: false,
    expanded: false
  };

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

  public logEvent(e: NodeEvent, message: string): void {
    console.log(e);
    alertify.message(`${message}: ${e.node.value}`);
  }
}
