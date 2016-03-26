///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {Ng2Tree} from '../ng2-tree';

@Component({
    selector: 'app',
    template: `<ng2-tree [tree]="tree"></ng2-tree>`,
    directives: [Ng2Tree]
})
class App {
    private tree:any = {
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
}

bootstrap(App);
