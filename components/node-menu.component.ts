import {Component, EventEmitter, Output} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {MouseButtons} from "./types";

@Component({
  selector: 'node-menu',
  styles: [require('./node-menu.component.styl')],
  template: require('./node-menu.component.html'),
  directives: [CORE_DIRECTIVES]
})
export class NodeMenuComponent {

  @Output()
  private newSelected: EventEmitter<any> = new EventEmitter();

  @Output()
  private removeSelected: EventEmitter<any> = new EventEmitter();

  @Output()
  private renameSelected: EventEmitter<any> = new EventEmitter();

  private onNew($event: any, isFolder: boolean = false) {
    if (!this.menuItemSelected($event)) {
      return;
    }

    this.newSelected.emit({isFolder});
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
