import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, OnInit} from '@angular/core';
import {Ng2Tree} from '../ng2-tree';
import {Ng2TreeService} from '../components/ng2-tree.service';

@Component({
    selector: 'app',
    template: `
        <ng2-tree [tree]="tree"></ng2-tree>
        <ng2-tree [tree]="tree2"></ng2-tree>
    `,
    directives: [Ng2Tree]
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

}

bootstrap(App, [Ng2TreeService]);
