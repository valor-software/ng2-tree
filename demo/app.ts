///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {Ng2Tree} from '../ng2-tree';

@Component({
  selector: 'app',
  template: `
  <h1>{{msg}}</h1>
  <ng2-tree></ng2-tree>
  `,
  directives: [Ng2Tree]
})
class App {
    public msg:string = 'Hello, World!';
}

bootstrap(App);
