# :herb: ng2-tree

ng2-tree is a simple [Angular 2](https://github.com/angular/angular) component for visualizing data that can be naturally represented as a tree.

## :clapper: Usage
Ok, let's start with an installation - all you need to do is:

`npm install --save ng2-tree`

Now when you have ng2-tree installed you need to add `TreeModule` to your application's module `imports`

```typescript
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { TreeModule } from 'ng2-tree';

@NgModule({
  declarations: [MyComponent],
  imports:      [BrowserModule, TreeModule],
  bootstrap:    [MyComponent]
})
export class MyModule {
}
```

As soon as the previous step is done we need to give ng2-tree a model to render - this can be accomplished by populating its `[tree]` attribute with an object that confirms to `TreeModel` interface (see [API](#wrench-api)):

```typescript
// 1 - import required classes and interfaces
import {TreeModel} from 'ng2-tree';

@Component({
  selector: 'myComp',
  // 2 - set [tree] attribute to tree object
  template: `<tree [tree]="tree"></tree>`
})
class MyComponent {
  // 3 - make sure tree object confirms to TreeModel interface
  public tree: TreeModel = {
    value: 'Programming languages by programming paradigm',
    children: [
      {
        value: 'Object-oriented programming',
        children: [
          {value: 'Java'},
          {value: 'C++'},
          {value: 'C#'},
        ]
      },
      {
        value: 'Prototype-based programming',
        children: [
          {value: 'JavaScript'},
          {value: 'CoffeeScript'},
          {value: 'Lua'},
        ]
      }
    ]
  };
}
```

Apart from that I suppose you'd want to listen to tree events (for a full list of supported events look at [API](#wrench-api)). No problem, this is also easy to do - for example let's add a listener for `node was selected` events:

```typescript
// 1 - import required classes and interfaces
import {TreeModel, NodeEvent} from 'ng2-tree';

@Component({
  selector: 'myComp',
  // 2 - listent for nodeSelected events and handle them
  template: `<tree [tree]="tree" (nodeSelected)="logEvent($event)"></tree>`
})
class MyComponent {
  public tree: TreeModel = { ... };

  // 3 - print caught event to the console
  public logEvent(e: NodeEvent): void {
    console.log(e);
  }
}
```

You can configure your tree by setting an options object in the `tree` tag:
```html
<tree [tree]="files" [options]="options"></tree>
```
Options are:
* icon.nodeCollapsed - The class or classes, when a node is collapsed
* icon.nodeExpanded - The class or classes, when a node is expanded
* icon.nodeLeaf - The class or classes, when a node is a leaf
* rightMenu - true / false - if true show a custom menu on right click on the mouse, default: true
* expanded - true / false - The initial state of the tree - expanded (true) or collapsed (false), default: true

For example:
```typescript
options = {
  icon: {
    nodeCollapsed: 'classWhenCollapsed',
    nodeExpanded: 'classWhenExpanded',
    nodeLeaf: 'classWhenLeaf',
  },
  rightMenu: false,
  expanded: false
};
```

You can also configure a particular node or a subtree by adding an options property to it.
Options are:
* static - true / false - When true disables dragging of a node and dragging other nodes below it, default: false
* drag - true / false - When true a node cannot be dragged but other nodes can be dragged below it (if it isn't a leaf), default: false
* icon - Has the same options as tree icon configurations
* applyToSubtree - true / false - When true all options apply to the this node and its subtree, when false - only to the node

For example:
```typescript
public files: TreeModel = {
  value: '/',
  children: [
    {
      value: 'home',
      children: [
        {
          value: 'firstUser',
          options: {
            disableDraging: true,
            icon: {
              nodeCollapsed: 'fa fa-folder',
              nodeExpanded: 'fa fa-folder-open',
              nodeLeaf: 'fa fa-file'
            },
            applyToSubtree: false
          },
          children: [
            {
              value: 'Documents',
              children: [
                {
                  value: 'home',
                  children: [
                    {
                      value: 'bills',
                      children: [
                        {value: '2016-07-01-mobile.pdf', options: {icon: {nodeLeaf: 'fa fa-file-pdf-o'}}},
                        {value: '2016-07-01-electricity.pdf', options: {icon: {nodeLeaf: 'fa fa-file-excel-o'}}},
                        {value: '2016-07-01-water.pdf', options: {icon: {nodeLeaf: 'fa fa-file-sound-o'}}},
                        {value: '2016-07-01-internet.pdf', options: {icon: {nodeLeaf: 'fa fa-file-word-o'}}},
                        {value: '2016-08-01-mobile.pdf', options: {icon: {nodeLeaf: 'fa fa-file-archive-o'}}},
                        {value: '2016-10-01-internet.pdf', options: {icon: {nodeLeaf: 'fa fa-file-pdf-o'}}}
                      ]
                    },
                    {value: 'photos', children: []}
                  ]
                }
              ]
            },
            {value: 'Downloads', children: []},
            {value: 'Desktop', children: []},
            {value: 'Pictures', children: []},
            {value: 'Music', children: []},
            {value: 'Public', children: []}
          ]
        }
      ]
    }
  ]
};
```

Voila! That's pretty much it - enjoy :blush:

## :eyes: Demo
Feel free to examine the [demo](https://valor-software.github.io/ng2-tree) and its [sources](demo/) to find out how things are wired.

## :wrench: API

Here is the fully stuffed *tree* tag that you can use in your templates:

```html
    <tree
      [tree]="tree"
      (nodeRemoved)="handleRemoved($event)"
      (nodeRenamed)="handleRenamed($event)"
      (nodeSelected)="handleSelected($event)"
      (nodeMoved)="handleMoved($event)"
      (nodeCreated)="handleCreated($event)">
    </tree>
```

Let's go through every element of this structure one by one.

### tree

`tree` is the selector for `TreeComponent` which is bundled into `TreeModule`:

### [tree]

`tree` has `[tree]` attribute which need to be populated with an object implementing `TreeModel` interface. You can import this interface as following

```typescript
import {TreeModel} from 'ng2-tree';
```

Here is the definition of TreeModel interface:

```typescript
interface TreeModel {
  value: string | RenamableNode;
  children?: Array<TreeModel>;
}
```

As you can see it is recursive and can be represented as the following object:

```typescript
{
    value: 'Programming languages by programming paradigm',
    children: [
      {
        value: 'Object-oriented programming',
        children: [
          {value: 'Java'},
          {value: 'C++'},
          {value: 'C#'},
        ]
      },
      {
        value: 'Prototype-based programming',
        children: [
          {value: 'JavaScript'},
          {value: 'CoffeeScript'},
          {value: 'Lua'},
        ]
      }
    ]
  }
```

Property `value` can be of type `string` or `RenamableNode`.
`RenamableNode` gives you additional control over the way node is renamed and rendered (by rendered I mean its text representation). Here is the definition of `RenamableNode` interface:

```typescript
interface RenamableNode {
  setName(name: string): void;
  toString(): string;
}
```

Here is an example of such a node in the `TreeModel` object:

```typescript
{
    value: 'Programming languages by programming paradigm',
    children: [
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
```

### events (nodeMoved, nodeSelected, nodeRenamed, nodeRemoved, nodeCreated)

Here is the diagram that shows tree events' hierarchy

![tree events hierarchy](media/tree-events-hierarchy.png)

`NodeEvent` is the root of tree events' hierarchy. It defines property `node` that contains a receiver of the event's action (`node` confirms to `TreeModel`).


`NodeDestructiveEvent` is the parent for all events that cause changes to a structure of the tree or to a node value.
It defines property `parent` that contains an object implementing `TreeModel` interface and gives context to the event's action.

#### NodeSelectedEvent

You can subscribe to `NodeSelectedEvent` by attaching listener to `(nodeSelected)` attribute

```html
    <tree
      [tree]="tree"
      (nodeSelected)="handleSelected($event)">
    </tree>
```

`NodeSelectedEvent` has just one property `node` which contains `TreeModel` object of a selected node.

```typescript
{node: <TreeModel>{...}}
```

`NodeSelectedEvent` inherits its property directly from `NodeEvent`.

#### NodeMovedEvent

You can subscribe to `NodeMovedEvent` by attaching listener to `(nodeMoved)` attribute

```html
    <tree
      [tree]="tree"
      (nodeMoved)="handleMoved($event)">
    </tree>
```

`NodeMovedEvent` has two properties `node` and `parent` both of which contain `TreeModel` objects.
`node` contains moved node.
`parent` contains new parent of the moved node.

```typescript
{node: <TreeModel>{...}, parent: <TreeModel>{...}}
```

`NodeMovedEvent` inherits its properties from `NodeDestructiveEvent`.

#### NodeRemovedEvent

You can subscribe to `NodeRemovedEvent` by attaching listener to `(nodeRemoved)` attribute

```html
    <tree
      [tree]="tree"
      (nodeRemoved)="handleRemoved($event)">
    </tree>
```

`NodeRemovedEvent` has two properties `node` and `parent` both of which contain `TreeModel` objects.
`node` contains removed node.
`parent` contains parent of the removed node.

```typescript
{node: <TreeModel>{...}, parent: <TreeModel>{...}}
```

`NodeRemovedEvent` inherits its properties from `NodeDestructiveEvent`.

#### NodeCreatedEvent

You can subscribe to `NodeCreatedEvent` by attaching listener to `(nodeCreated)` attribute

```html
    <tree
      [tree]="tree"
      (nodeCreated)="handleCreated($event)">
    </tree>
```

`NodeCreatedEvent` has two properties `node` and `parent` both of which contain `TreeModel` objects.
`node` contains created node.
`parent` contains parent of the newly created node.

```typescript
{node: <TreeModel>{...}, parent: <TreeModel>{...}}
```

`NodeCreatedEvent` inherits its properties from `NodeDestructiveEvent`.

#### NodeRenamedEvent

You can subscribe to `NodeRenamedEvent` by attaching listener to `(nodeRenamed)` attribute

```html
    <tree
      [tree]="tree"
      (nodeRenamed)="handleRenamed($event)">
    </tree>
```

`NodeRenamedEvent` has four properties:

- `node` contains node that was renamed (implements `TreeModel`).
- `parent` contains parent (implements `TreeModel`) for the renamed node.
- `oldValue` contains value node used to have (it might be `string` or `RenamableNode`)
- `newValue` contains new value of the node (it might be `string` or `RenamableNode`)

```typescript
{
  node: <TreeModel>{...},
  parent: <TreeModel>{...},
  oldValue: <string|RenamableNode>{...},
  newValue: <string|RenamableNode>{...}
}
```

`NodeRenamedEvent` inherits its `node` and `parent` properties from `NodeDestructiveEvent`.

## :-1: Bad parts
Currently I feel really bad because of two things:
- ng2-tree doesn't have tests (yet), so I wouldn't recommend you to use this in a production environment
- ng2-tree doesn't have proper mechanism for customizing its look

## :thumbsup: Good parts
I really want to deminish all the [Bad parts](#-1-bad-parts) and extend ng2-tree with a new stuff

## :bulb: Want to help?

I am very appreciate for your ideas, proposals and found bugs which you can leave in [github issues](https://github.com/valor-software/ng2-tree/issues). Thanks in advance!

**P.S.** If you find it hard going through documentation, please, let me know which parts of it was difficult to grasp and I will improve them.
