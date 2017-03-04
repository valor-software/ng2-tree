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

  private static logEvent(e: NodeEvent, message: string): void {
    console.log(e);
    alertify.message(`${message}: ${e.node.value}`);
  }
}
