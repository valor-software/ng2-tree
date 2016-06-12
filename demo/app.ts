import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';
import {BranchyComponent} from '../ng2-branchy';

@Component({
  selector: 'app',
  template: `
        <branchy [model]="tree"></branchy>
        <branchy [model]="tree2"></branchy>
    `,
  directives: [BranchyComponent]
})
class App {
  private tree: any = {
    value: 'A',
    children: [
      {
        value: 'B',
      },
      {
        value: 'C',
      },
      {
        value: 'D',
        children: [
          {
            value: 'X',
            children: [
              {
                value: 'X',
              },
              {
                value: 'Y',
              }
            ]
          },
          {
            value: 'Y',
            children: [
              {
                value: 'X',
              },
              {
                value: 'Y',
                children: [
                  {
                    value: 'X',
                  },
                  {
                    value: 'Y',
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        value: 'W'
      }
    ]
  };

  private tree2: any = {
    value: 'Hello, World!',
    children: [
      {
        value: 'Javascript',
      },
      {
        value: 'Java',
      },
      {
        value: 'Web',
        children: [
          {
            value: 'HTML',
            children: [
              {
                value: 'html5',
              },
              {
                value: 'bootstrap',
              }
            ]
          },
          {
            value: 'css',
            children: [
              {
                value: 'tricks',
              },
              {
                value: 'codestyle',
                children: [
                  {
                    value: 'spaces',
                  },
                  {
                    value: 'naming conventions',
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        value: 'W'
      }
    ]
  };

}

bootstrap(App);
