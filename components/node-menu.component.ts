import {Component, EventEmitter, Output} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {MouseButtons} from "./types";

@Component({
  selector: 'node-menu',
  directives: [CORE_DIRECTIVES],
  template: `
    <div class="node-menu">
      <ul class="node-menu-content">
        <li (click)="onNew($event)">New</li>
        <li (click)="onRename($event)">Rename</li>
        <li (click)="onRemove($event)">Remove</li>
      </ul>          
    </div>
  `
})
export class NodeMenuComponent {

  @Output()
  private newSelected: EventEmitter<any> = new EventEmitter();

  @Output()
  private removeSelected: EventEmitter<any> = new EventEmitter();

  @Output()
  private renameSelected: EventEmitter<any> = new EventEmitter();

  private onNew($event: any) {
    if (!this.menuItemSelected($event)) {
      return;
    }

    this.newSelected.emit(null);
  }

  private onRename($event: any) {
    if (!this.menuItemSelected($event)) {
      return;
    }

    this.renameSelected.emit(null);
  }

  private onRemove($event: any) {
    if (!this.menuItemSelected($event)) {
      return;
    }

    this.removeSelected.emit(null);
  }

  private menuItemSelected(event: any) {
    return event.which === MouseButtons.Left;
  }
}
