import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NodeEvent, TreeModel, RenamableNode, Ng2TreeSettings } from '../index';

require('../src/styles.css');
require('../node_modules/font-awesome/css/font-awesome.min.css');

declare const alertify: any;

@Component({
  selector: 'server-tree',
  template: `
    <div class="tree-demo-app">
      <div class="tree-container">
        <p class="tree-title">Server tree</p>
        <tree #treeServer
          [tree]="serverTree"
          (nodeRemoved)="onNodeRemoved($event)"
          (nodeRenamed)="onNodeRenamed($event)"
          (nodeSelected)="onNodeSelected($event)"
          (nodeMoved)="onNodeMoved($event)"
          (nodeCreated)="onNodeCreated($event)"
          (nodeExpanded)="onNodeExpanded($event)"
          (nodeCollapsed)="onNodeCollapsed($event)">
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
export class ServerTreeComponent implements OnInit {
  public serverTree: TreeModel;

  private treeChildrenList = {
    1: [
      { value: 'Serif' , id: 2, loadChildren: this.getChildren.call(this, 2) },
      { value: 'Sans-serif', id: 25, loadChildren: this.getChildren.call(this, 25) },
      { value: 'Monospace', id: 18, loadChildren: this.getChildren.call(this, 18) }
    ],
    2: [
      { value: 'Antiqua', id: 3 },
      { value: 'DejaVu Serif', id: 4 },
      { value: 'Garamond', id: 5 },
      { value: 'Georgia', id: 6 },
      { value: 'Times New Roman', id: 7 },
      { value: 'Slab serif', id: 8, loadChildren: this.getChildren.call(this, 8) }
    ],
    8: [
      { value: 'Candida', id: 9 },
      { value: 'Swift', id: 10 },
      { value: 'Guardian Egyptian', id: 11 }
    ],
    25: [
      { value: 'Arial', id: 12 },
      { value: 'Century Gothic', id: 13 },
      { value: 'DejaVu Sans', id: 14 },
      { value: 'Futura', id: 15 },
      { value: 'Geneva', id: 16 },
      { value: 'Liberation Sans', id: 17 }
    ],
    18: [
      { value: 'Input Mono', id: 19 },
      { value: 'Roboto Mono', id: 20 },
      { value: 'Liberation Mono', id: 21 },
      { value: 'Hack', id: 22 },
      { value: 'Consolas', id: 23 },
      { value: 'Menlo', id: 24 },
      { value: 'Source Code Pro', id: 26 }
    ]
  };

  @ViewChild('treeServer') public treeServer;

  constructor (private http: Http) {}

  public ngOnInit(): void {
    setTimeout(() => {
      this.serverTree = {
        value: 'Server tree',
        id: 1,
        loadChildren: this.getChildren.call(this, 1),
        settings: {
        }
      };
    }, 2000);
  }

  public onNodeRemoved(e: NodeEvent): void {
    ServerTreeComponent.logEvent(e, 'Removed');
  }

  public onNodeMoved(e: NodeEvent): void {
    ServerTreeComponent.logEvent(e, 'Moved');
  }

  public onNodeRenamed(e: NodeEvent): void {
    ServerTreeComponent.logEvent(e, 'Renamed');
  }

  public onNodeCreated(e: NodeEvent): void {
    ServerTreeComponent.logEvent(e, 'Created');
  }

  public onNodeSelected(e: NodeEvent): void {
    ServerTreeComponent.logEvent(e, 'Selected');
  }

  public onNodeExpanded(e: NodeEvent): void {
    ServerTreeComponent.logEvent(e, 'Expanded');
  }

  public onNodeCollapsed(e: NodeEvent): void {
    ServerTreeComponent.logEvent(e, 'Collapsed');
  }

  public handleActionOnFFS(id: number | string, action: string) {
    let treeController = this.treeServer.getChildControllerById(id);
    if (treeController && typeof treeController[action] === 'function') {
      treeController[action]();
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  }

  public renameFFS(id: number | string) {
    let treeController = this.treeServer.getChildControllerById(id);
    if (treeController) {
      treeController.rename('unicode.pf');
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  }

  private static logEvent(e: NodeEvent, message: string): void {
    console.log(e);
    alertify.message(`${message}: ${e.node.value}`);
  }

  public getChildren(nodeId) {
    return function(id, callback) {
      console.log('called function for loading children');
      setTimeout(() => {
        this.http.get('/').subscribe(
          (response: Response) => {
            console.log('successful loading');
            if (this.treeChildrenList.hasOwnProperty(id)) {
              callback(this.treeChildrenList[id]);
            }
          },
          error => {
            console.log('error encountered', error);
          }
        );
      });
    }.bind(this, nodeId);
  }
}
