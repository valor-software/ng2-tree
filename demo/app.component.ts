import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';
import {TreeComponent, NodeEvent, TreeModel, RenamableNode} from '../index';
import {TreeModule} from '../src/tree.module';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    </div>
    `,
  styleUrls: ['./app.css'],
})
class AppComponent {
  private fonts: TreeModel = {
    value: 'Fonts',
    children: [
      {
        value: 'Serif',
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
              {value: 'Guardian Egyptian'},
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
          {value: 'Liberation Sans'},
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
          {value: 'Source Code Pro'},
        ]
      }
    ]
  };

  private pls: TreeModel = {
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
            value: <RenamableNode>{
              name: 'Java',
              setName(name: string): void {
                this.name = name;
              },
              toString(): string {
                return this.name;
              }
            }
          },
          {value: 'C++'},
          {value: 'C#'},
        ]
      },
      {
        value: 'Prototype-based programming',
        children: [
          {value: 'JavaScript'},
          {value: 'CoffeeScript'},
          {value: 'TypeScript'},
        ]
      }
    ]
  };

  private onNodeRemoved(e: NodeEvent): void {
    this.logEvent(e, 'Removed');
  }

  private onNodeMoved(e: NodeEvent): void {
    this.logEvent(e, 'Moved');
  }

  private onNodeRenamed(e: NodeEvent): void {
    this.logEvent(e, 'Renamed');
  }

  private onNodeCreated(e: NodeEvent): void {
    this.logEvent(e, 'Created');
  }

  private onNodeSelected(e: NodeEvent): void {
    this.logEvent(e, 'Selected');
  }

  private logEvent(e: NodeEvent, message: string): void {
    console.log(e);
    alertify.message(`${message}: ${e.node.value}`);
  }
}

@NgModule({
  imports: [ BrowserModule, TreeModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export default class AppModule{}
platformBrowserDynamic().bootstrapModule(AppModule);

