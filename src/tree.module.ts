import { NodeDraggableDirective } from './draggable/node-draggable.directive';
import { NodeMenuComponent } from './menu/node-menu.component';
import { NodeEditableDirective } from './editable/node-editable.directive';
import { TreeInternalComponent, TreeComponent } from './tree.component';
import { NgModule }      from '@angular/core';
import { CommonModule }        from '@angular/common';

@NgModule({
    imports: [CommonModule],
    providers: [],
    declarations: [NodeEditableDirective, NodeMenuComponent, NodeDraggableDirective, TreeInternalComponent, TreeComponent],
    exports: [TreeComponent]
})
export class TreeModule {}