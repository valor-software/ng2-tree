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
          (nodeCreated)="onNodeCreated($event)">
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
    value: 'Fonts',typeModel: 'societe',
    children: [
      {
        value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
        typeModel: 'societe',
        settings: {
          'static': true
        },
        children: [
          { value: 'Antiqua',typeModel: 'societe'},
          { value: 'DejaVu Serif',typeModel: 'societe' },
          { value: 'Garamond',typeModel: 'societe' },
          { value: 'Georgia',typeModel: 'societe' },
          { value: 'Times New Roman',typeModel: 'societe' },
          {
            value: 'Slab serif',typeModel: 'societe',
            children: [
              { value: 'Candida',typeModel: 'societe' },
              { value: 'Swift' ,typeModel: 'societe'},
              { value: 'Guardian Egyptian',typeModel: 'societe' }
            ]
          }
        ]
      },
      {
        value: 'Sans-serif',
        typeModel: 'societe',
        children: [
          { value: 'Arial' ,typeModel: 'societe'},
          { value: 'Century Gothic',typeModel: 'societe' },
          { value: 'DejaVu Sans' ,typeModel: 'societe'},
          { value: 'Futura' ,typeModel: 'societe'},
          { value: 'Geneva' ,typeModel: 'societe'},
          { value: 'Liberation Sans' ,typeModel: 'societe'}
        ]
      },
      {
        value: 'Monospace - With ASYNC CHILDREN',
         typeModel: 'societe',
        // children property is ignored if "loadChildren" is present
        children: [{value: 'I am the font that will be ignored',typeModel: 'societe'}],
        loadChildren: (callback) => {
          setTimeout(() => {
            callback([
              { value: 'Input Mono' ,typeModel: 'societe'},
              { value: 'Roboto Mono',typeModel: 'societe' },
              { value: 'Liberation Mono',typeModel: 'societe' },
              { value: 'Hack',typeModel: 'societe' },
              { value: 'Consolas',typeModel: 'societe' },
              { value: 'Menlo',typeModel: 'societe'},
              { value: 'Source Code Pro',typeModel: 'societe' }
            ]);
          }, 5000);
        }
      }
    ]
  };

  public pls: TreeModel;

  public ngOnInit(): void {
    setTimeout(() => {
      this.pls = {
        value: 'Programming languages by programming paradigm',
        typeModel: 'societe',
        children: [
          {
            value: 'Aspect-oriented programming',
            typeModel: 'societe',
            children: [
              { value: 'AspectJ',typeModel: 'societe' },
              { value: 'AspectC++',typeModel: 'societe' }
            ]
          },
          {
            value: 'Object-oriented programming',typeModel: 'societe',
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
                } as RenamableNode,typeModel: 'societe'
              },
              { value: 'C++' ,typeModel: 'societe'},
              { value: 'C#',typeModel: 'societe' }
            ]
          },
          {
            value: 'Prototype-based programming',typeModel: 'societe',
            children: [
              { value: 'JavaScript',typeModel: 'societe' },
              { value: 'CoffeeScript',typeModel: 'societe' },
              { value: 'TypeScript',typeModel: 'societe' }
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

  private static logEvent(e: NodeEvent, message: string): void {
    console.log(e);
    alertify.message(`${message}: ${e.node.value}`);
  }
}
