import { NgModule } from '@angular/core';
import { TreeComponent, TreeInternalComponent } from './tree.component';
import { CommonModule } from '@angular/common';
import { NodeDraggableDirective } from './draggable/node-draggable.directive';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { NodeEditableDirective } from './editable/node-editable.directive';
import { NodeMenuComponent } from './menu/node-menu.component';
import { MenuComponent } from './menu/menu.component';
import { NodeMenuService } from './menu/node-menu.service';
import { MenuService } from './menu/menu.service';
import { TreeService } from './tree.service';

@NgModule({
  imports: [CommonModule],
  declarations: [NodeDraggableDirective, TreeComponent, NodeEditableDirective, MenuComponent, NodeMenuComponent, TreeInternalComponent],
  exports: [TreeComponent],
  providers: [NodeDraggableService, MenuService, NodeMenuService, TreeService]
})
export class TreeModule {
}
