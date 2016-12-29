import { Component } from '@angular/core';
import { NodeEvent, TreeModel, TreeOptions, RenamableNode } from '../index';

declare const alertify: any;

@Component({
  selector: 'app',
  template: `
    <div class="tree-demo-app">
      <div class="tree-container">
        <p>Fonts tree</p>
        <tree
          [tree]="fonts"
          [treeOptions]="fontsOptions"
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
        value: 'Serif',
        children: [
          {
            value: 'Antiqua',
            icon: {
              nodeLeaf: 'fa fa-circle-o'
            }
          },
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
  public fontsOptions: TreeOptions = {
    icon: {
      font: 'FontAwesome',
      nodeCollapsed: 'fa fa-folder-o',
      nodeExpanded: 'fa fa-folder-open-o',
      nodeLeaf: 'fa fa-file-o'
    },
    activateRightMenu: false
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
