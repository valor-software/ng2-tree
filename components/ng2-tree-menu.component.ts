import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Tree} from "./types";

@Component({
  selector: 'tree-menu',
  directive: [CORE_DIRECTIVES],
  template: `
    
  `
})
export class Ng2TreeMenu {
  @Input()
  private tree: Tree


}
