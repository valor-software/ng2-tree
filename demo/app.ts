import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';
import {BranchyComponent} from '../ng2-branchy';
import {NodeEvent} from '../src/branchy.types';

@Component({
  selector: 'app',
  template: `
    <branchy 
      [model]="tree" 
      (nodeRemoved)="logEvent($event)"
      (nodeRenamed)="logEvent($event)"
      (nodeSelected)="logEvent($event)"
      (nodeMoved)="logEvent($event)"
      (nodeCreated)="logEvent($event)">
    </branchy>

    <branchy 
      [model]="tree2" 
      (nodeRemoved)="logEvent($event)"
      (nodeRenamed)="logEvent($event)"
      (nodeSelected)="logEvent($event)"
      (nodeMoved)="logEvent($event)"
      (nodeCreated)="logEvent($event)">
    </branchy>
    `,
  directives: [BranchyComponent]
})
class App {
  private tree: any = {
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

  private tree2: any = {
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
            value: { //Non string value
              id: 'Java',
              setName(name: string): void {
                this.id = name;
              },
              toString(): string {
                return this.id;
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

  private logEvent(event: NodeEvent): void {
    console.log(event);
  }
}

bootstrap(App);
