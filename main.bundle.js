webpackJsonp([1],{

/***/ "../../../../../index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_tree_types__ = __webpack_require__("../../../../../src/tree.types.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_tree__ = __webpack_require__("../../../../../src/tree.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_tree_events__ = __webpack_require__("../../../../../src/tree.events.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_tree_component__ = __webpack_require__("../../../../../src/tree.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_tree_module__ = __webpack_require__("../../../../../src/tree.module.ts");
/* unused harmony reexport Tree */
/* unused harmony reexport TreeModel */
/* unused harmony reexport TreeModelSettings */
/* unused harmony reexport Ng2TreeSettings */
/* unused harmony reexport RenamableNode */
/* unused harmony reexport FoldingType */
/* unused harmony reexport NodeEvent */
/* unused harmony reexport NodeCreatedEvent */
/* unused harmony reexport NodeRemovedEvent */
/* unused harmony reexport NodeRenamedEvent */
/* unused harmony reexport NodeMovedEvent */
/* unused harmony reexport NodeSelectedEvent */
/* unused harmony reexport NodeExpandedEvent */
/* unused harmony reexport NodeCollapsedEvent */
/* unused harmony reexport NodeDestructiveEvent */
/* unused harmony reexport TreeComponent */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__src_tree_module__["a"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/demo async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src/demo async recursive";

/***/ }),

/***/ "../../../../../src/demo/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = AppComponent_1 = (function () {
    function AppComponent() {
        this.settings = {
            rootIsVisible: false
        };
        this.fonts = {
            value: 'Fonts',
            children: [
                {
                    value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
                    settings: {
                        'static': true
                    },
                    children: [
                        { value: '<a href="#" id="antiqua" class="test">Antiqua</a> with HTML tags.' },
                        { value: 'DejaVu Serif' },
                        { value: 'Garamond' },
                        { value: 'Georgia' },
                        { value: 'Times New Roman' },
                        {
                            value: 'Slab serif',
                            children: [
                                { value: 'Candida' },
                                { value: 'Swift' },
                                { value: 'Guardian Egyptian' }
                            ]
                        }
                    ]
                },
                {
                    value: 'Sans-serif',
                    children: [
                        { value: 'Arial' },
                        { value: 'Century Gothic' },
                        { value: 'DejaVu Sans' },
                        { value: 'Futura' },
                        { value: 'Geneva' },
                        { value: 'Liberation Sans' }
                    ]
                },
                {
                    value: 'Monospace - With ASYNC CHILDREN',
                    // children property is ignored if "loadChildren" is present
                    children: [{ value: 'I am the font that will be ignored' }],
                    loadChildren: function (callback) {
                        setTimeout(function () {
                            callback([
                                { value: 'Input Mono' },
                                { value: 'Roboto Mono' },
                                { value: 'Liberation Mono' },
                                { value: 'Hack' },
                                { value: 'Consolas' },
                                { value: 'Menlo' },
                                { value: 'Source Code Pro' }
                            ]);
                        }, 5000);
                    }
                }
            ]
        };
        this.dfs = {
            value: '/',
            id: 1,
            settings: {
                cssClasses: {
                    expanded: 'fa fa-caret-down',
                    collapsed: 'fa fa-caret-right',
                    empty: 'fa fa-caret-right disabled',
                    leaf: 'fa'
                },
                templates: {
                    node: '<i class="fa fa-folder-o"></i>',
                    leaf: '<i class="fa fa-file-o"></i>'
                }
            },
            children: [
                {
                    value: 'bin',
                    id: 2,
                    children: [
                        { value: 'bash', id: 3 },
                        { value: 'umount', id: 4 },
                        { value: 'cp', id: 5 },
                        { value: 'less', id: 6 },
                        { value: 'rmdir', id: 7 },
                        { value: 'touch', id: 8 },
                        { value: 'chgrp', id: 9 },
                        { value: 'chmod', id: 10 },
                        { value: 'chown', id: 11 },
                        { value: 'nano', id: 12 }
                    ]
                },
                {
                    value: 'boot',
                    id: 13,
                    children: [
                        {
                            value: 'grub',
                            id: 14,
                            children: [
                                { value: 'fonts', id: 15 },
                                { value: 'gfxblacklist.txt', id: 16 },
                                { value: 'grub.cfg', id: 17 },
                                { value: 'grubenv', id: 18 },
                                { value: 'i386-pc', id: 19 },
                                { value: 'locale', id: 20 },
                                { value: 'unicode.pf2', id: 21 }
                            ]
                        },
                        {
                            value: 'lost+found',
                            id: 22,
                            children: []
                        },
                        { value: 'abi-4.4.0-57-generic', id: 23 },
                        { value: 'config-4.4.0-57-generic', id: 24 },
                        { value: 'initrd.img-4.4.0-47-generic', id: 25 },
                        { value: 'initrd.img-4.4.0-57-generic', id: 26 },
                        { value: 'memtest86+.bin', id: 27 },
                        { value: 'System.map-4.4.0-57-generic', id: 28 },
                        { value: 'memtest86+.elf', id: 29 },
                        { value: 'vmlinuz-4.4.0-57-generic', id: 30 },
                        { value: 'memtest86+_multiboot.bin', id: 31 }
                    ]
                },
                {
                    value: 'build-no-left-no-right-menus',
                    id: 32,
                    settings: {
                        leftMenu: false,
                        rightMenu: false
                    },
                    children: [
                        {
                            value: 'php5-left-menu',
                            id: 33,
                            settings: {
                                leftMenu: true
                            }
                        },
                        {
                            value: 'grails-left-menu',
                            id: 335,
                            settings: {
                                leftMenu: true
                            }
                        },
                        {
                            value: 'python-right-menu',
                            id: 333,
                            settings: {
                                rightMenu: true
                            }
                        }
                    ]
                },
                { value: 'cdrom', id: 34, children: [] },
                { value: 'dev', id: 35, children: [] },
                { value: 'etc', id: 36, children: [] },
                {
                    value: 'home',
                    id: 37,
                    children: [
                        {
                            value: 'firstUser',
                            id: 38,
                            children: [
                                {
                                    value: 'Documents',
                                    id: 39,
                                    children: [
                                        {
                                            value: 'home',
                                            id: 40,
                                            children: [
                                                {
                                                    value: 'bills',
                                                    id: 41,
                                                    children: [
                                                        { value: '2016-07-01-mobile.pdf', id: 42 },
                                                        { value: '2016-07-01-electricity.pdf', id: 43 },
                                                        { value: '2016-07-01-water.pdf', id: 44 },
                                                        { value: '2016-07-01-internet.pdf', id: 45 },
                                                        { value: '2016-08-01-mobile.pdf', id: 46 },
                                                        { value: '2016-10-01-internet.pdf', id: 47 }
                                                    ]
                                                },
                                                { value: 'photos', id: 48, children: [] }
                                            ]
                                        }
                                    ]
                                },
                                { value: 'Downloads', id: 49, children: [] },
                                { value: 'Desktop', id: 50, children: [] },
                                { value: 'Pictures', id: 51, children: [] },
                                {
                                    value: 'Music',
                                    id: 52,
                                    children: [{ value: 'won\'t be displayed' }],
                                    loadChildren: function (callback) {
                                        setTimeout(function () {
                                            callback([
                                                { value: '2Cellos', id: 78, children: [] },
                                                { value: 'Michael Jackson', id: 79, children: [] },
                                                { value: 'AC/DC', id: 80, children: [] },
                                                { value: 'Adel', id: 81, children: [] }
                                            ]);
                                        }, 5000);
                                    }
                                },
                                { value: 'Public', id: 53, children: [] }
                            ]
                        },
                        {
                            value: 'secondUser - left menu templates',
                            id: 54,
                            settings: {
                                leftMenu: true
                            },
                            children: [
                                { value: 'Documents', id: 55, children: [] },
                                {
                                    value: 'Downloads - custom left menu template',
                                    id: 56,
                                    settings: {
                                        templates: {
                                            leftMenu: '<i class="fa fa-navicon"></i>'
                                        }
                                    },
                                    children: [
                                        { value: 'Actobat3', id: 57 },
                                        { value: 'Complib', id: 58 },
                                        { value: 'Eudora', id: 59 },
                                        { value: 'java', id: 60 },
                                        { value: 'drivers', id: 61 },
                                        { value: 'kathy', id: 62 }
                                    ]
                                },
                                { value: 'Desktop', id: 63, children: [] },
                                { value: 'Pictures', id: 64, children: [] },
                                { value: 'Music', id: 65, children: [] },
                                { value: 'Public', id: 66, children: [] }
                            ]
                        }
                    ]
                },
                { value: 'lib', id: 67, children: [] },
                { value: 'media', id: 68, children: [] },
                { value: 'opt', id: 69, children: [] },
                { value: 'proc', id: 70, children: [] },
                { value: 'root', id: 71, children: [] },
                { value: 'run', id: 72, children: [] },
                { value: 'sbin', id: 73, children: [] },
                { value: 'srv', id: 74, children: [] },
                { value: 'sys', id: 75, children: [] },
                { value: 'usr', id: 76, children: [] },
                { value: 'var', id: 77, children: [] }
            ]
        };
    }
    AppComponent.logEvent = function (e, message) {
        console.log(e);
        alertify.message(message + ": " + e.node.value);
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.pls = {
                value: 'Programming languages by programming paradigm',
                children: [
                    {
                        value: 'Aspect-oriented programming',
                        children: [
                            { value: 'AspectJ' },
                            { value: 'AspectC++' }
                        ]
                    },
                    {
                        value: 'Object-oriented programming',
                        children: [
                            {
                                value: {
                                    name: 'Java',
                                    setName: function (name) {
                                        this.name = name;
                                    },
                                    toString: function () {
                                        return this.name;
                                    }
                                }
                            },
                            { value: 'C++' },
                            { value: 'C#' }
                        ]
                    },
                    {
                        value: 'Prototype-based programming',
                        children: [
                            { value: 'JavaScript' },
                            { value: 'CoffeeScript' },
                            { value: 'TypeScript' }
                        ]
                    }
                ]
            };
        }, 2000);
    };
    AppComponent.prototype.onNodeRemoved = function (e) {
        AppComponent_1.logEvent(e, 'Removed');
    };
    AppComponent.prototype.onNodeMoved = function (e) {
        AppComponent_1.logEvent(e, 'Moved');
    };
    AppComponent.prototype.onNodeRenamed = function (e) {
        AppComponent_1.logEvent(e, 'Renamed');
    };
    AppComponent.prototype.onNodeCreated = function (e) {
        AppComponent_1.logEvent(e, 'Created');
    };
    AppComponent.prototype.onNodeSelected = function (e) {
        AppComponent_1.logEvent(e, 'Selected');
    };
    AppComponent.prototype.onNodeExpanded = function (e) {
        AppComponent_1.logEvent(e, 'Expanded');
    };
    AppComponent.prototype.onNodeCollapsed = function (e) {
        AppComponent_1.logEvent(e, 'Collapsed');
    };
    return AppComponent;
}());
AppComponent = AppComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app',
        template: "\n    <div class=\"tree-demo-app\">\n      <div class=\"tree-container\">\n        <p class=\"tree-title\">Fonts tree</p>\n        <tree\n          [tree]=\"fonts\"\n          (nodeRemoved)=\"onNodeRemoved($event)\"\n          (nodeRenamed)=\"onNodeRenamed($event)\"\n          (nodeSelected)=\"onNodeSelected($event)\"\n          (nodeMoved)=\"onNodeMoved($event)\"\n          (nodeCreated)=\"onNodeCreated($event)\"\n          (nodeExpanded)=\"onNodeExpanded($event)\"\n          (nodeCollapsed)=\"onNodeCollapsed($event)\">\n        </tree>\n      </div>\n      <div class=\"tree-container\">\n        <p class=\"tree-title\">Programming languages tree</p>\n        <p class=\"notice\">this tree is loaded asynchronously</p>\n        <tree\n          [tree]=\"pls\"\n          [settings]=\"settings\"\n          (nodeRemoved)=\"onNodeRemoved($event)\"\n          (nodeRenamed)=\"onNodeRenamed($event)\"\n          (nodeSelected)=\"onNodeSelected($event)\"\n          (nodeMoved)=\"onNodeMoved($event)\"\n          (nodeCreated)=\"onNodeCreated($event)\">\n        </tree>\n      </div>\n      <div class=\"tree-container\">\n        <p class=\"tree-title\">Directory/File structure</p>\n        <p class=\"notice\">this tree has advanced configurations</p>\n        <tree\n          [tree]=\"dfs\"\n          (nodeRemoved)=\"onNodeRemoved($event)\"\n          (nodeRenamed)=\"onNodeRenamed($event)\"\n          (nodeSelected)=\"onNodeSelected($event)\"\n          (nodeMoved)=\"onNodeMoved($event)\"\n          (nodeCreated)=\"onNodeCreated($event)\"\n          (nodeExpanded)=\"onNodeExpanded($event)\"\n          (nodeCollapsed)=\"onNodeCollapsed($event)\">\n        </tree>\n      </div>\n    </div>\n  ",
        styles: ["\n    .tree-demo-app {\n      margin: auto;\n      width: -moz-fit-content;\n      width: -webkit-fit-content;\n      width: fit-content;\n    }\n\n    .tree-demo-app .tree-container {\n      float: left;\n      vertical-align: top;\n      width: 500px;\n    }\n\n    .tree-title {\n      color: #40a070;\n      font-size: 2em;\n    }\n\n    .notice {\n      color: #e91e63;\n      font-size: 1.2em;\n      font-style: italic;\n    }\n\n    :host /deep/ .fa {\n      cursor: pointer;\n    }\n\n    :host /deep/ .fa.disabled {\n      cursor: inherit;\n      color: #757575;\n    }\n  "]
    })
], AppComponent);

var AppComponent_1;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/demo/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_component__ = __webpack_require__("../../../../../src/demo/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index__ = __webpack_require__("../../../../../index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* AppComponent */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_3__index__["a" /* TreeModule */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/demo/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/demo/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/demo/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/demo/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../../src/draggable/captured-node.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CapturedNode; });
var CapturedNode = (function () {
    function CapturedNode(anElement, aTree) {
        this.anElement = anElement;
        this.aTree = aTree;
    }
    CapturedNode.prototype.canBeDroppedAt = function (element) {
        return !this.sameAs(element) && !this.contains(element);
    };
    CapturedNode.prototype.contains = function (other) {
        return this.element.nativeElement.contains(other.nativeElement);
    };
    CapturedNode.prototype.sameAs = function (other) {
        return this.element === other;
    };
    Object.defineProperty(CapturedNode.prototype, "element", {
        get: function () {
            return this.anElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CapturedNode.prototype, "tree", {
        get: function () {
            return this.aTree;
        },
        enumerable: true,
        configurable: true
    });
    return CapturedNode;
}());

//# sourceMappingURL=captured-node.js.map

/***/ }),

/***/ "../../../../../src/draggable/draggable.events.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeDraggableEvent; });
var NodeDraggableEvent = (function () {
    function NodeDraggableEvent(captured, target) {
        this.captured = captured;
        this.target = target;
    }
    return NodeDraggableEvent;
}());

//# sourceMappingURL=draggable.events.js.map

/***/ }),

/***/ "../../../../../src/draggable/node-draggable.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_draggable_service__ = __webpack_require__("../../../../../src/draggable/node-draggable.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__captured_node__ = __webpack_require__("../../../../../src/draggable/captured-node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tree__ = __webpack_require__("../../../../../src/tree.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeDraggableDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var NodeDraggableDirective = NodeDraggableDirective_1 = (function () {
    function NodeDraggableDirective(element, nodeDraggableService, renderer) {
        this.element = element;
        this.nodeDraggableService = nodeDraggableService;
        this.renderer = renderer;
        this.disposersForDragListeners = [];
        this.nodeNativeElement = element.nativeElement;
    }
    NodeDraggableDirective.prototype.ngOnInit = function () {
        if (!this.tree.isStatic()) {
            this.renderer.setElementAttribute(this.nodeNativeElement, 'draggable', 'true');
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragenter', this.handleDragEnter.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragover', this.handleDragOver.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragstart', this.handleDragStart.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragleave', this.handleDragLeave.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'drop', this.handleDrop.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragend', this.handleDragEnd.bind(this)));
        }
    };
    NodeDraggableDirective.prototype.ngOnDestroy = function () {
        /* tslint:disable:typedef */
        this.disposersForDragListeners.forEach(function (dispose) { return dispose(); });
        /* tslint:enable:typedef */
    };
    NodeDraggableDirective.prototype.handleDragStart = function (e) {
        e.stopPropagation();
        this.nodeDraggableService.captureNode(new __WEBPACK_IMPORTED_MODULE_2__captured_node__["a" /* CapturedNode */](this.nodeDraggable, this.tree));
        e.dataTransfer.setData('text', NodeDraggableDirective_1.DATA_TRANSFER_STUB_DATA);
        e.dataTransfer.effectAllowed = 'move';
    };
    NodeDraggableDirective.prototype.handleDragOver = function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };
    NodeDraggableDirective.prototype.handleDragEnter = function (e) {
        e.preventDefault();
        if (this.containsElementAt(e)) {
            this.addClass('over-drop-target');
        }
    };
    NodeDraggableDirective.prototype.handleDragLeave = function (e) {
        if (!this.containsElementAt(e)) {
            this.removeClass('over-drop-target');
        }
    };
    NodeDraggableDirective.prototype.handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.removeClass('over-drop-target');
        if (!this.isDropPossible(e)) {
            return false;
        }
        if (this.nodeDraggableService.getCapturedNode()) {
            return this.notifyThatNodeWasDropped();
        }
    };
    NodeDraggableDirective.prototype.isDropPossible = function (e) {
        var capturedNode = this.nodeDraggableService.getCapturedNode();
        return capturedNode
            && capturedNode.canBeDroppedAt(this.nodeDraggable)
            && this.containsElementAt(e);
    };
    NodeDraggableDirective.prototype.handleDragEnd = function (e) {
        this.removeClass('over-drop-target');
        this.nodeDraggableService.releaseCapturedNode();
    };
    NodeDraggableDirective.prototype.containsElementAt = function (e) {
        var _a = e.x, x = _a === void 0 ? e.clientX : _a, _b = e.y, y = _b === void 0 ? e.clientY : _b;
        return this.nodeNativeElement.contains(document.elementFromPoint(x, y));
    };
    NodeDraggableDirective.prototype.addClass = function (className) {
        var classList = this.nodeNativeElement.classList;
        classList.add(className);
    };
    NodeDraggableDirective.prototype.removeClass = function (className) {
        var classList = this.nodeNativeElement.classList;
        classList.remove(className);
    };
    NodeDraggableDirective.prototype.notifyThatNodeWasDropped = function () {
        this.nodeDraggableService.fireNodeDragged(this.nodeDraggableService.getCapturedNode(), this.nodeDraggable);
    };
    return NodeDraggableDirective;
}());
NodeDraggableDirective.DATA_TRANSFER_STUB_DATA = 'some browsers enable drag-n-drop only when dataTransfer has data';
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* ElementRef */]) === "function" && _a || Object)
], NodeDraggableDirective.prototype, "nodeDraggable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__tree__["a" /* Tree */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__tree__["a" /* Tree */]) === "function" && _b || Object)
], NodeDraggableDirective.prototype, "tree", void 0);
NodeDraggableDirective = NodeDraggableDirective_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Directive */])({
        selector: '[nodeDraggable]'
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* ElementRef */])),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__node_draggable_service__["a" /* NodeDraggableService */])),
    __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Renderer */])),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* ElementRef */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__node_draggable_service__["a" /* NodeDraggableService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__node_draggable_service__["a" /* NodeDraggableService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Renderer */]) === "function" && _e || Object])
], NodeDraggableDirective);

var NodeDraggableDirective_1, _a, _b, _c, _d, _e;
//# sourceMappingURL=node-draggable.directive.js.map

/***/ }),

/***/ "../../../../../src/draggable/node-draggable.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__draggable_events__ = __webpack_require__("../../../../../src/draggable/draggable.events.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeDraggableService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NodeDraggableService = (function () {
    function NodeDraggableService() {
        this.draggableNodeEvents$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
    }
    NodeDraggableService.prototype.fireNodeDragged = function (captured, target) {
        if (!captured.tree || captured.tree.isStatic()) {
            return;
        }
        this.draggableNodeEvents$.next(new __WEBPACK_IMPORTED_MODULE_2__draggable_events__["a" /* NodeDraggableEvent */](captured, target));
    };
    NodeDraggableService.prototype.captureNode = function (node) {
        this.capturedNode = node;
    };
    NodeDraggableService.prototype.getCapturedNode = function () {
        return this.capturedNode;
    };
    NodeDraggableService.prototype.releaseCapturedNode = function () {
        this.capturedNode = null;
    };
    return NodeDraggableService;
}());
NodeDraggableService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
], NodeDraggableService);

//# sourceMappingURL=node-draggable.service.js.map

/***/ }),

/***/ "../../../../../src/editable/editable.events.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeEditableEventAction; });
var NodeEditableEventAction;
(function (NodeEditableEventAction) {
    NodeEditableEventAction[NodeEditableEventAction["Cancel"] = 0] = "Cancel";
})(NodeEditableEventAction || (NodeEditableEventAction = {}));
//# sourceMappingURL=editable.events.js.map

/***/ }),

/***/ "../../../../../src/editable/node-editable.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editable_events__ = __webpack_require__("../../../../../src/editable/editable.events.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeEditableDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var NodeEditableDirective = (function () {
    function NodeEditableDirective(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        /* tslint:enable:no-input-rename */
        this.valueChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */](false);
    }
    NodeEditableDirective.prototype.ngOnInit = function () {
        var nativeElement = this.elementRef.nativeElement;
        this.renderer.invokeElementMethod(nativeElement, 'focus', []);
        this.renderer.setElementProperty(nativeElement, 'value', this.nodeValue);
    };
    NodeEditableDirective.prototype.applyNewValue = function (newNodeValue) {
        this.valueChanged.emit({ type: 'keyup', value: newNodeValue });
    };
    NodeEditableDirective.prototype.applyNewValueByLoosingFocus = function (newNodeValue) {
        this.valueChanged.emit({ type: 'blur', value: newNodeValue });
    };
    NodeEditableDirective.prototype.cancelEditing = function () {
        this.valueChanged.emit({
            type: 'keyup',
            value: this.nodeValue,
            action: __WEBPACK_IMPORTED_MODULE_1__editable_events__["a" /* NodeEditableEventAction */].Cancel
        });
    };
    return NodeEditableDirective;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Input */])('nodeEditable'),
    __metadata("design:type", String)
], NodeEditableDirective.prototype, "nodeValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]) === "function" && _a || Object)
], NodeEditableDirective.prototype, "valueChanged", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* HostListener */])('keyup.enter', ['$event.target.value']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NodeEditableDirective.prototype, "applyNewValue", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* HostListener */])('blur', ['$event.target.value']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NodeEditableDirective.prototype, "applyNewValueByLoosingFocus", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* HostListener */])('keyup.esc'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NodeEditableDirective.prototype, "cancelEditing", null);
NodeEditableDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Directive */])({
        selector: '[nodeEditable]'
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Renderer */])),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* ElementRef */])),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Renderer */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* ElementRef */]) === "function" && _c || Object])
], NodeEditableDirective);

var _a, _b, _c;
//# sourceMappingURL=node-editable.directive.js.map

/***/ }),

/***/ "../../../../../src/menu/menu.events.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NodeMenuItemAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeMenuAction; });
var NodeMenuItemAction;
(function (NodeMenuItemAction) {
    NodeMenuItemAction[NodeMenuItemAction["NewFolder"] = 0] = "NewFolder";
    NodeMenuItemAction[NodeMenuItemAction["NewTag"] = 1] = "NewTag";
    NodeMenuItemAction[NodeMenuItemAction["Rename"] = 2] = "Rename";
    NodeMenuItemAction[NodeMenuItemAction["Remove"] = 3] = "Remove";
})(NodeMenuItemAction || (NodeMenuItemAction = {}));
var NodeMenuAction;
(function (NodeMenuAction) {
    NodeMenuAction[NodeMenuAction["Close"] = 0] = "Close";
})(NodeMenuAction || (NodeMenuAction = {}));
//# sourceMappingURL=menu.events.js.map

/***/ }),

/***/ "../../../../../src/menu/node-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_menu_service__ = __webpack_require__("../../../../../src/menu/node-menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_events__ = __webpack_require__("../../../../../src/menu/menu.events.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_event_utils__ = __webpack_require__("../../../../../src/utils/event.utils.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeMenuComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var NodeMenuComponent = (function () {
    function NodeMenuComponent(renderer, nodeMenuService) {
        this.renderer = renderer;
        this.nodeMenuService = nodeMenuService;
        this.menuItemSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]();
        this.availableMenuItems = [
            {
                name: 'New tag',
                action: __WEBPACK_IMPORTED_MODULE_2__menu_events__["b" /* NodeMenuItemAction */].NewTag,
                cssClass: 'new-tag'
            },
            {
                name: 'New folder',
                action: __WEBPACK_IMPORTED_MODULE_2__menu_events__["b" /* NodeMenuItemAction */].NewFolder,
                cssClass: 'new-folder'
            },
            {
                name: 'Rename',
                action: __WEBPACK_IMPORTED_MODULE_2__menu_events__["b" /* NodeMenuItemAction */].Rename,
                cssClass: 'rename'
            },
            {
                name: 'Remove',
                action: __WEBPACK_IMPORTED_MODULE_2__menu_events__["b" /* NodeMenuItemAction */].Remove,
                cssClass: 'remove'
            }
        ];
        this.disposersForGlobalListeners = [];
    }
    NodeMenuComponent.prototype.ngOnInit = function () {
        this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'keyup', this.closeMenu.bind(this)));
        this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'mousedown', this.closeMenu.bind(this)));
    };
    NodeMenuComponent.prototype.ngOnDestroy = function () {
        this.disposersForGlobalListeners.forEach(function (dispose) { return dispose(); });
    };
    NodeMenuComponent.prototype.onMenuItemSelected = function (e, selectedMenuItem) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_event_utils__["a" /* isLeftButtonClicked */])(e)) {
            this.menuItemSelected.emit({ nodeMenuItemAction: selectedMenuItem.action });
            this.nodeMenuService.fireMenuEvent(e.target, __WEBPACK_IMPORTED_MODULE_2__menu_events__["a" /* NodeMenuAction */].Close);
        }
    };
    NodeMenuComponent.prototype.closeMenu = function (e) {
        var mouseClicked = e instanceof MouseEvent;
        // Check if the click is fired on an element inside a menu
        var containingTarget = (this.menuContainer.nativeElement !== e.target && this.menuContainer.nativeElement.contains(e.target));
        if (mouseClicked && !containingTarget || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_event_utils__["c" /* isEscapePressed */])(e)) {
            this.nodeMenuService.fireMenuEvent(e.target, __WEBPACK_IMPORTED_MODULE_2__menu_events__["a" /* NodeMenuAction */].Close);
        }
    };
    return NodeMenuComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]) === "function" && _a || Object)
], NodeMenuComponent.prototype, "menuItemSelected", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* ViewChild */])('menuContainer'),
    __metadata("design:type", Object)
], NodeMenuComponent.prototype, "menuContainer", void 0);
NodeMenuComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'node-menu',
        template: "\n    <div class=\"node-menu\">\n      <ul class=\"node-menu-content\" #menuContainer>\n        <li class=\"node-menu-item\" *ngFor=\"let menuItem of availableMenuItems\"\n          (click)=\"onMenuItemSelected($event, menuItem)\">\n          <div class=\"node-menu-item-icon {{menuItem.cssClass}}\"></div>\n          <span class=\"node-menu-item-value\">{{menuItem.name}}</span>\n        </li>\n      </ul>\n    </div>\n  "
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Renderer */])),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__node_menu_service__["a" /* NodeMenuService */])),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Renderer */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__node_menu_service__["a" /* NodeMenuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__node_menu_service__["a" /* NodeMenuService */]) === "function" && _c || Object])
], NodeMenuComponent);

var _a, _b, _c;
//# sourceMappingURL=node-menu.component.js.map

/***/ }),

/***/ "../../../../../src/menu/node-menu.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_events__ = __webpack_require__("../../../../../src/menu/menu.events.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeMenuService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NodeMenuService = (function () {
    function NodeMenuService() {
        this.nodeMenuEvents$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
    }
    NodeMenuService.prototype.fireMenuEvent = function (sender, action) {
        var nodeMenuEvent = { sender: sender, action: action };
        this.nodeMenuEvents$.next(nodeMenuEvent);
    };
    NodeMenuService.prototype.hideMenuStream = function (treeElementRef) {
        return this.nodeMenuEvents$
            .filter(function (e) { return treeElementRef.nativeElement !== e.sender; })
            .filter(function (e) { return e.action === __WEBPACK_IMPORTED_MODULE_2__menu_events__["a" /* NodeMenuAction */].Close; });
    };
    NodeMenuService.prototype.hideMenuForAllNodesExcept = function (treeElementRef) {
        this.nodeMenuEvents$.next({
            sender: treeElementRef.nativeElement,
            action: __WEBPACK_IMPORTED_MODULE_2__menu_events__["a" /* NodeMenuAction */].Close
        });
    };
    return NodeMenuService;
}());
NodeMenuService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
], NodeMenuService);

//# sourceMappingURL=node-menu.service.js.map

/***/ }),

/***/ "../../../../../src/tree-internal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tree_types__ = __webpack_require__("../../../../../src/tree.types.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tree__ = __webpack_require__("../../../../../src/tree.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_node_menu_service__ = __webpack_require__("../../../../../src/menu/node-menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_menu_events__ = __webpack_require__("../../../../../src/menu/menu.events.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__editable_editable_events__ = __webpack_require__("../../../../../src/editable/editable.events.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tree_service__ = __webpack_require__("../../../../../src/tree.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_event_utils__ = __webpack_require__("../../../../../src/utils/event.utils.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeInternalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var TreeInternalComponent = (function () {
    function TreeInternalComponent(nodeMenuService, treeService, element) {
        this.nodeMenuService = nodeMenuService;
        this.treeService = treeService;
        this.element = element;
        this.isSelected = false;
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    }
    TreeInternalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settings = this.settings || { rootIsVisible: true };
        this.nodeMenuService.hideMenuStream(this.element)
            .subscribe(function () {
            _this.isRightMenuVisible = false;
            _this.isLeftMenuVisible = false;
        });
        this.treeService.unselectStream(this.tree)
            .subscribe(function () { return _this.isSelected = false; });
        this.treeService.draggedStream(this.tree, this.element)
            .subscribe(function (e) {
            if (_this.tree.hasSibling(e.captured.tree)) {
                _this.swapWithSibling(e.captured.tree, _this.tree);
            }
            else if (_this.tree.isBranch()) {
                _this.moveNodeToThisTreeAndRemoveFromPreviousOne(e, _this.tree);
            }
            else {
                _this.moveNodeToParentTreeAndRemoveFromPreviousOne(e, _this.tree);
            }
        });
    };
    TreeInternalComponent.prototype.swapWithSibling = function (sibling, tree) {
        tree.swapWithSibling(sibling);
        this.treeService.fireNodeMoved(sibling, sibling.parent);
    };
    TreeInternalComponent.prototype.moveNodeToThisTreeAndRemoveFromPreviousOne = function (e, tree) {
        this.treeService.fireNodeRemoved(e.captured.tree);
        var addedChild = tree.addChild(e.captured.tree);
        this.treeService.fireNodeMoved(addedChild, e.captured.tree.parent);
    };
    TreeInternalComponent.prototype.moveNodeToParentTreeAndRemoveFromPreviousOne = function (e, tree) {
        this.treeService.fireNodeRemoved(e.captured.tree);
        var addedSibling = tree.addSibling(e.captured.tree, tree.positionInParent);
        this.treeService.fireNodeMoved(addedSibling, e.captured.tree.parent);
    };
    TreeInternalComponent.prototype.onNodeSelected = function (e) {
        if (__WEBPACK_IMPORTED_MODULE_7__utils_event_utils__["a" /* isLeftButtonClicked */](e)) {
            this.isSelected = true;
            this.treeService.fireNodeSelected(this.tree);
        }
    };
    TreeInternalComponent.prototype.showRightMenu = function (e) {
        if (!this.tree.hasRightMenu()) {
            return;
        }
        if (__WEBPACK_IMPORTED_MODULE_7__utils_event_utils__["b" /* isRightButtonClicked */](e)) {
            this.isRightMenuVisible = !this.isRightMenuVisible;
            this.nodeMenuService.hideMenuForAllNodesExcept(this.element);
        }
        e.preventDefault();
    };
    TreeInternalComponent.prototype.showLeftMenu = function (e) {
        if (!this.tree.hasLeftMenu()) {
            return;
        }
        if (__WEBPACK_IMPORTED_MODULE_7__utils_event_utils__["a" /* isLeftButtonClicked */](e)) {
            this.isLeftMenuVisible = !this.isLeftMenuVisible;
            this.nodeMenuService.hideMenuForAllNodesExcept(this.element);
            if (this.isLeftMenuVisible) {
                e.preventDefault();
            }
        }
    };
    TreeInternalComponent.prototype.onMenuItemSelected = function (e) {
        switch (e.nodeMenuItemAction) {
            case __WEBPACK_IMPORTED_MODULE_4__menu_menu_events__["b" /* NodeMenuItemAction */].NewTag:
                this.onNewSelected(e);
                break;
            case __WEBPACK_IMPORTED_MODULE_4__menu_menu_events__["b" /* NodeMenuItemAction */].NewFolder:
                this.onNewSelected(e);
                break;
            case __WEBPACK_IMPORTED_MODULE_4__menu_menu_events__["b" /* NodeMenuItemAction */].Rename:
                this.onRenameSelected();
                break;
            case __WEBPACK_IMPORTED_MODULE_4__menu_menu_events__["b" /* NodeMenuItemAction */].Remove:
                this.onRemoveSelected();
                break;
            default:
                throw new Error("Chosen menu item doesn't exist");
        }
    };
    TreeInternalComponent.prototype.onNewSelected = function (e) {
        this.tree.createNode(e.nodeMenuItemAction === __WEBPACK_IMPORTED_MODULE_4__menu_menu_events__["b" /* NodeMenuItemAction */].NewFolder);
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    };
    TreeInternalComponent.prototype.onRenameSelected = function () {
        this.tree.markAsBeingRenamed();
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    };
    TreeInternalComponent.prototype.onRemoveSelected = function () {
        this.treeService.fireNodeRemoved(this.tree);
    };
    TreeInternalComponent.prototype.onSwitchFoldingType = function () {
        this.tree.switchFoldingType();
        this.treeService.fireNodeSwitchFoldingType(this.tree);
    };
    TreeInternalComponent.prototype.applyNewValue = function (e) {
        if ((e.action === __WEBPACK_IMPORTED_MODULE_5__editable_editable_events__["a" /* NodeEditableEventAction */].Cancel || this.tree.isNew()) && __WEBPACK_IMPORTED_MODULE_2__tree__["a" /* Tree */].isValueEmpty(e.value)) {
            return this.treeService.fireNodeRemoved(this.tree);
        }
        if (this.tree.isNew()) {
            this.tree.value = e.value;
            this.treeService.fireNodeCreated(this.tree);
        }
        if (this.tree.isBeingRenamed()) {
            var oldValue = this.tree.value;
            this.tree.value = e.value;
            this.treeService.fireNodeRenamed(oldValue, this.tree);
        }
        this.tree.markAsModified();
    };
    TreeInternalComponent.prototype.shouldShowInputForTreeValue = function () {
        return this.tree.isNew() || this.tree.isBeingRenamed();
    };
    TreeInternalComponent.prototype.isRootHidden = function () {
        return this.tree.isRoot() && !this.settings.rootIsVisible;
    };
    return TreeInternalComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__tree__["a" /* Tree */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__tree__["a" /* Tree */]) === "function" && _a || Object)
], TreeInternalComponent.prototype, "tree", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Input */])(),
    __metadata("design:type", typeof (_b = (typeof __WEBPACK_IMPORTED_MODULE_1__tree_types__ !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__tree_types__).Ng2TreeSettings) === "function" && _b || Object)
], TreeInternalComponent.prototype, "settings", void 0);
TreeInternalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'tree-internal',
        template: "\n  <ul class=\"tree\" *ngIf=\"tree\" [ngClass]=\"{rootless: isRootHidden()}\">\n    <li>\n      <div class=\"value-container\"\n        [ngClass]=\"{rootless: isRootHidden()}\"\n        (contextmenu)=\"showRightMenu($event)\"\n        [nodeDraggable]=\"element\"\n        [tree]=\"tree\">\n\n        <div class=\"folding\" (click)=\"onSwitchFoldingType()\" [ngClass]=\"tree.foldingCssClass\"></div>\n        <div class=\"node-value\"\n          *ngIf=\"!shouldShowInputForTreeValue()\"\n          [class.node-selected]=\"isSelected\"\n          (click)=\"onNodeSelected($event)\">\n            <div *ngIf=\"tree.nodeTemplate\" class=\"node-template\" [innerHTML]=\"tree.nodeTemplate | safeHtml\"></div>\n            <span class=\"node-name\" [innerHTML]=\"tree.value | safeHtml\"></span>\n            <span class=\"loading-children\" *ngIf=\"tree.childrenAreBeingLoaded()\"></span>\n        </div>\n\n        <input type=\"text\" class=\"node-value\"\n           *ngIf=\"shouldShowInputForTreeValue()\"\n           [nodeEditable]=\"tree.value\"\n           (valueChanged)=\"applyNewValue($event)\"/>\n\n        <div class=\"node-left-menu\" *ngIf=\"tree.hasLeftMenu()\" (click)=\"showLeftMenu($event)\" [innerHTML]=\"tree.leftMenuTemplate\">\n        </div>\n        <node-menu *ngIf=\"tree.hasLeftMenu() && isLeftMenuVisible\"\n          (menuItemSelected)=\"onMenuItemSelected($event)\">\n        </node-menu>\n      </div>\n\n      <node-menu *ngIf=\"isRightMenuVisible\" (menuItemSelected)=\"onMenuItemSelected($event)\"></node-menu>\n\n      <ng-template [ngIf]=\"tree.isNodeExpanded()\">\n        <tree-internal *ngFor=\"let child of tree.childrenAsync | async\" [tree]=\"child\"></tree-internal>\n      </ng-template>\n    </li>\n  </ul>\n  "
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__menu_node_menu_service__["a" /* NodeMenuService */])),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])(__WEBPACK_IMPORTED_MODULE_6__tree_service__["a" /* TreeService */])),
    __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* ElementRef */])),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__menu_node_menu_service__["a" /* NodeMenuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__menu_node_menu_service__["a" /* NodeMenuService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__tree_service__["a" /* TreeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__tree_service__["a" /* TreeService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* ElementRef */]) === "function" && _e || Object])
], TreeInternalComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=tree-internal.component.js.map

/***/ }),

/***/ "../../../../../src/tree.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tree_service__ = __webpack_require__("../../../../../src/tree.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tree_types__ = __webpack_require__("../../../../../src/tree.types.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tree__ = __webpack_require__("../../../../../src/tree.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var TreeComponent = TreeComponent_1 = (function () {
    function TreeComponent(treeService) {
        this.treeService = treeService;
        this.nodeCreated = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]();
        this.nodeRemoved = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]();
        this.nodeRenamed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]();
        this.nodeSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]();
        this.nodeMoved = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]();
        this.nodeExpanded = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]();
        this.nodeCollapsed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]();
    }
    TreeComponent.prototype.ngOnChanges = function (changes) {
        if (!this.treeModel) {
            this.tree = TreeComponent_1.EMPTY_TREE;
        }
        else {
            this.tree = new __WEBPACK_IMPORTED_MODULE_3__tree__["a" /* Tree */](this.treeModel);
        }
    };
    TreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.treeService.nodeRemoved$.subscribe(function (e) {
            _this.nodeRemoved.emit(e);
        });
        this.treeService.nodeRenamed$.subscribe(function (e) {
            _this.nodeRenamed.emit(e);
        });
        this.treeService.nodeCreated$.subscribe(function (e) {
            _this.nodeCreated.emit(e);
        });
        this.treeService.nodeSelected$.subscribe(function (e) {
            _this.nodeSelected.emit(e);
        });
        this.treeService.nodeMoved$.subscribe(function (e) {
            _this.nodeMoved.emit(e);
        });
        this.treeService.nodeExpanded$.subscribe(function (e) {
            _this.nodeExpanded.emit(e);
        });
        this.treeService.nodeCollapsed$.subscribe(function (e) {
            _this.nodeCollapsed.emit(e);
        });
    };
    return TreeComponent;
}());
TreeComponent.EMPTY_TREE = new __WEBPACK_IMPORTED_MODULE_3__tree__["a" /* Tree */]({ value: '' });
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Input */])('tree'),
    __metadata("design:type", typeof (_a = (typeof __WEBPACK_IMPORTED_MODULE_2__tree_types__ !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__tree_types__).TreeModel) === "function" && _a || Object)
], TreeComponent.prototype, "treeModel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Input */])(),
    __metadata("design:type", typeof (_b = (typeof __WEBPACK_IMPORTED_MODULE_2__tree_types__ !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__tree_types__).Ng2TreeSettings) === "function" && _b || Object)
], TreeComponent.prototype, "settings", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Output */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]) === "function" && _c || Object)
], TreeComponent.prototype, "nodeCreated", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Output */])(),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]) === "function" && _d || Object)
], TreeComponent.prototype, "nodeRemoved", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Output */])(),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]) === "function" && _e || Object)
], TreeComponent.prototype, "nodeRenamed", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Output */])(),
    __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]) === "function" && _f || Object)
], TreeComponent.prototype, "nodeSelected", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Output */])(),
    __metadata("design:type", typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]) === "function" && _g || Object)
], TreeComponent.prototype, "nodeMoved", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Output */])(),
    __metadata("design:type", typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]) === "function" && _h || Object)
], TreeComponent.prototype, "nodeExpanded", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Output */])(),
    __metadata("design:type", typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]) === "function" && _j || Object)
], TreeComponent.prototype, "nodeCollapsed", void 0);
TreeComponent = TreeComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'tree',
        template: "<tree-internal [tree]=\"tree\" [settings]=\"settings\"></tree-internal>",
        providers: [__WEBPACK_IMPORTED_MODULE_1__tree_service__["a" /* TreeService */]]
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__tree_service__["a" /* TreeService */])),
    __metadata("design:paramtypes", [typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1__tree_service__["a" /* TreeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__tree_service__["a" /* TreeService */]) === "function" && _k || Object])
], TreeComponent);

var TreeComponent_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=tree.component.js.map

/***/ }),

/***/ "../../../../../src/tree.events.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NodeEvent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NodeSelectedEvent; });
/* unused harmony export NodeDestructiveEvent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return NodeMovedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeRemovedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NodeCreatedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NodeRenamedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return NodeExpandedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return NodeCollapsedEvent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NodeEvent = (function () {
    function NodeEvent(node) {
        this.node = node;
    }
    return NodeEvent;
}());

var NodeSelectedEvent = (function (_super) {
    __extends(NodeSelectedEvent, _super);
    function NodeSelectedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeSelectedEvent;
}(NodeEvent));

var NodeDestructiveEvent = (function (_super) {
    __extends(NodeDestructiveEvent, _super);
    function NodeDestructiveEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeDestructiveEvent;
}(NodeEvent));

var NodeMovedEvent = (function (_super) {
    __extends(NodeMovedEvent, _super);
    function NodeMovedEvent(node, previousParent) {
        var _this = _super.call(this, node) || this;
        _this.previousParent = previousParent;
        return _this;
    }
    return NodeMovedEvent;
}(NodeDestructiveEvent));

var NodeRemovedEvent = (function (_super) {
    __extends(NodeRemovedEvent, _super);
    function NodeRemovedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeRemovedEvent;
}(NodeDestructiveEvent));

var NodeCreatedEvent = (function (_super) {
    __extends(NodeCreatedEvent, _super);
    function NodeCreatedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeCreatedEvent;
}(NodeDestructiveEvent));

var NodeRenamedEvent = (function (_super) {
    __extends(NodeRenamedEvent, _super);
    function NodeRenamedEvent(node, oldValue, newValue) {
        var _this = _super.call(this, node) || this;
        _this.oldValue = oldValue;
        _this.newValue = newValue;
        return _this;
    }
    return NodeRenamedEvent;
}(NodeDestructiveEvent));

var NodeExpandedEvent = (function (_super) {
    __extends(NodeExpandedEvent, _super);
    function NodeExpandedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeExpandedEvent;
}(NodeEvent));

var NodeCollapsedEvent = (function (_super) {
    __extends(NodeCollapsedEvent, _super);
    function NodeCollapsedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeCollapsedEvent;
}(NodeEvent));

//# sourceMappingURL=tree.events.js.map

/***/ }),

/***/ "../../../../../src/tree.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tree_component__ = __webpack_require__("../../../../../src/tree.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tree_internal_component__ = __webpack_require__("../../../../../src/tree-internal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__draggable_node_draggable_directive__ = __webpack_require__("../../../../../src/draggable/node-draggable.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__draggable_node_draggable_service__ = __webpack_require__("../../../../../src/draggable/node-draggable.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__editable_node_editable_directive__ = __webpack_require__("../../../../../src/editable/node-editable.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__menu_node_menu_component__ = __webpack_require__("../../../../../src/menu/node-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__menu_node_menu_service__ = __webpack_require__("../../../../../src/menu/node-menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tree_service__ = __webpack_require__("../../../../../src/tree.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_safe_html_pipe__ = __webpack_require__("../../../../../src/utils/safe-html.pipe.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var TreeModule = (function () {
    function TreeModule() {
    }
    return TreeModule;
}());
TreeModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__angular_common__["a" /* CommonModule */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__draggable_node_draggable_directive__["a" /* NodeDraggableDirective */],
            __WEBPACK_IMPORTED_MODULE_1__tree_component__["a" /* TreeComponent */],
            __WEBPACK_IMPORTED_MODULE_6__editable_node_editable_directive__["a" /* NodeEditableDirective */],
            __WEBPACK_IMPORTED_MODULE_7__menu_node_menu_component__["a" /* NodeMenuComponent */],
            __WEBPACK_IMPORTED_MODULE_2__tree_internal_component__["a" /* TreeInternalComponent */],
            __WEBPACK_IMPORTED_MODULE_10__utils_safe_html_pipe__["a" /* SafeHtmlPipe */]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_1__tree_component__["a" /* TreeComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_5__draggable_node_draggable_service__["a" /* NodeDraggableService */], __WEBPACK_IMPORTED_MODULE_8__menu_node_menu_service__["a" /* NodeMenuService */], __WEBPACK_IMPORTED_MODULE_9__tree_service__["a" /* TreeService */]]
    })
], TreeModule);

//# sourceMappingURL=tree.module.js.map

/***/ }),

/***/ "../../../../../src/tree.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tree_events__ = __webpack_require__("../../../../../src/tree.events.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__draggable_node_draggable_service__ = __webpack_require__("../../../../../src/draggable/node-draggable.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var TreeService = (function () {
    function TreeService(nodeDraggableService) {
        this.nodeDraggableService = nodeDraggableService;
        this.nodeMoved$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
        this.nodeRemoved$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
        this.nodeRenamed$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
        this.nodeCreated$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
        this.nodeSelected$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
        this.nodeExpanded$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
        this.nodeCollapsed$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
        this.nodeRemoved$.subscribe(function (e) { return e.node.removeItselfFromParent(); });
    }
    TreeService.prototype.unselectStream = function (tree) {
        return this.nodeSelected$.filter(function (e) { return tree !== e.node; });
    };
    TreeService.prototype.fireNodeRemoved = function (tree) {
        this.nodeRemoved$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["a" /* NodeRemovedEvent */](tree));
    };
    TreeService.prototype.fireNodeCreated = function (tree) {
        this.nodeCreated$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["b" /* NodeCreatedEvent */](tree));
    };
    TreeService.prototype.fireNodeSelected = function (tree) {
        this.nodeSelected$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["c" /* NodeSelectedEvent */](tree));
    };
    TreeService.prototype.fireNodeRenamed = function (oldValue, tree) {
        this.nodeRenamed$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["d" /* NodeRenamedEvent */](tree, oldValue, tree.value));
    };
    TreeService.prototype.fireNodeMoved = function (tree, parent) {
        this.nodeMoved$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["e" /* NodeMovedEvent */](tree, parent));
    };
    TreeService.prototype.fireNodeSwitchFoldingType = function (tree) {
        if (tree.isNodeExpanded()) {
            this.fireNodeExpanded(tree);
        }
        else if (tree.isNodeCollapsed()) {
            this.fireNodeCollapsed(tree);
        }
    };
    TreeService.prototype.fireNodeExpanded = function (tree) {
        this.nodeExpanded$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["f" /* NodeExpandedEvent */](tree));
    };
    TreeService.prototype.fireNodeCollapsed = function (tree) {
        this.nodeCollapsed$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["g" /* NodeCollapsedEvent */](tree));
    };
    TreeService.prototype.draggedStream = function (tree, element) {
        return this.nodeDraggableService.draggableNodeEvents$
            .filter(function (e) { return e.target === element; })
            .filter(function (e) { return !e.captured.tree.hasChild(tree); });
    };
    return TreeService;
}());
TreeService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["c" /* Injectable */])(),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["d" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__draggable_node_draggable_service__["a" /* NodeDraggableService */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__draggable_node_draggable_service__["a" /* NodeDraggableService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__draggable_node_draggable_service__["a" /* NodeDraggableService */]) === "function" && _a || Object])
], TreeService);

var _a;
//# sourceMappingURL=tree.service.js.map

/***/ }),

/***/ "../../../../../src/tree.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_map__ = __webpack_require__("../../../../lodash/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty__ = __webpack_require__("../../../../lodash/isEmpty.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_trim__ = __webpack_require__("../../../../lodash/trim.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_trim___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash_trim__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_has__ = __webpack_require__("../../../../lodash/has.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_has___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash_has__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_isFunction__ = __webpack_require__("../../../../lodash/isFunction.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_isFunction___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash_isFunction__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash_clone__ = __webpack_require__("../../../../lodash/clone.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash_clone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash_clone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_merge__ = __webpack_require__("../../../../lodash/merge.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash_extend__ = __webpack_require__("../../../../lodash/extend.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash_extend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_lodash_extend__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash_get__ = __webpack_require__("../../../../lodash/get.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_lodash_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash_omit__ = __webpack_require__("../../../../lodash/omit.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash_omit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lodash_omit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_lodash_forEach__ = __webpack_require__("../../../../lodash/forEach.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_lodash_forEach___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_lodash_forEach__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash_toString__ = __webpack_require__("../../../../lodash/toString.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash_toString___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_lodash_toString__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_lodash_isArray__ = __webpack_require__("../../../../lodash/isArray.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_lodash_isArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_lodash_isArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_lodash_size__ = __webpack_require__("../../../../lodash/size.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_lodash_size___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_lodash_size__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_lodash_indexOf__ = __webpack_require__("../../../../lodash/indexOf.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_lodash_indexOf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_lodash_indexOf__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_lodash_includes__ = __webpack_require__("../../../../lodash/includes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_lodash_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_lodash_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_lodash_findIndex__ = __webpack_require__("../../../../lodash/findIndex.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_lodash_findIndex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_lodash_findIndex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_lodash_once__ = __webpack_require__("../../../../lodash/once.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_lodash_once___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_lodash_once__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__tree_types__ = __webpack_require__("../../../../../src/tree.types.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tree; });




















var ChildrenLoadingState;
(function (ChildrenLoadingState) {
    ChildrenLoadingState[ChildrenLoadingState["NotStarted"] = 0] = "NotStarted";
    ChildrenLoadingState[ChildrenLoadingState["Loading"] = 1] = "Loading";
    ChildrenLoadingState[ChildrenLoadingState["Completed"] = 2] = "Completed";
})(ChildrenLoadingState || (ChildrenLoadingState = {}));
var Tree = (function () {
    /**
     * Build an instance of Tree from an object implementing TreeModel interface.
     * @param {TreeModel} model - A model that is used to build a tree.
     * @param {Tree} [parent] - An optional parent if you want to build a tree from the model that should be a child of an existing Tree instance.
     * @param {boolean} [isBranch] - An option that makes a branch from created tree. Branch can have children.
     */
    function Tree(node, parent, isBranch) {
        if (parent === void 0) { parent = null; }
        if (isBranch === void 0) { isBranch = false; }
        var _this = this;
        this._childrenLoadingState = ChildrenLoadingState.NotStarted;
        this._childrenAsyncOnce = __WEBPACK_IMPORTED_MODULE_17_lodash_once__(function () {
            return new __WEBPACK_IMPORTED_MODULE_18_rxjs_Rx__["Observable"](function (observer) {
                setTimeout(function () {
                    _this._childrenLoadingState = ChildrenLoadingState.Loading;
                    _this._loadChildren(function (children) {
                        _this._children = __WEBPACK_IMPORTED_MODULE_0_lodash_map__(children, function (child) { return new Tree(child, _this); });
                        _this._childrenLoadingState = ChildrenLoadingState.Completed;
                        observer.next(_this.children);
                        observer.complete();
                    });
                });
            });
        });
        this.buildTreeFromModel(node, parent, isBranch || Array.isArray(node.children));
    }
    // STATIC METHODS ----------------------------------------------------------------------------------------------------
    /**
     * Check that value passed is not empty (it doesn't consist of only whitespace symbols).
     * @param {string} value - A value that should be checked.
     * @returns {boolean} - A flag indicating that value is empty or not.
     * @static
     */
    Tree.isValueEmpty = function (value) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty__(__WEBPACK_IMPORTED_MODULE_2_lodash_trim__(value));
    };
    /**
     * Check whether a given value can be considered RenamableNode.
     * @param {any} value - A value to check.
     * @returns {boolean} - A flag indicating whether given value is Renamable node or not.
     * @static
     */
    Tree.isRenamable = function (value) {
        return (__WEBPACK_IMPORTED_MODULE_3_lodash_has__(value, 'setName') && __WEBPACK_IMPORTED_MODULE_4_lodash_isFunction__(value.setName))
            && (__WEBPACK_IMPORTED_MODULE_3_lodash_has__(value, 'toString') && __WEBPACK_IMPORTED_MODULE_4_lodash_isFunction__(value.toString) && value.toString !== Object.toString);
    };
    Tree.cloneTreeShallow = function (origin) {
        var tree = new Tree(__WEBPACK_IMPORTED_MODULE_5_lodash_clone__(origin.node));
        tree._children = origin._children;
        return tree;
    };
    Tree.applyNewValueToRenamable = function (value, newValue) {
        var renamableValue = __WEBPACK_IMPORTED_MODULE_6_lodash_merge__({}, value);
        renamableValue.setName(newValue);
        return renamableValue;
    };
    Tree.prototype.buildTreeFromModel = function (model, parent, isBranch) {
        var _this = this;
        this.parent = parent;
        this.node = __WEBPACK_IMPORTED_MODULE_7_lodash_extend__(__WEBPACK_IMPORTED_MODULE_9_lodash_omit__(model, 'children'), {
            settings: __WEBPACK_IMPORTED_MODULE_19__tree_types__["TreeModelSettings"].merge(model, __WEBPACK_IMPORTED_MODULE_8_lodash_get__(parent, 'node'))
        });
        if (__WEBPACK_IMPORTED_MODULE_4_lodash_isFunction__(this.node.loadChildren)) {
            this._loadChildren = this.node.loadChildren;
        }
        else {
            __WEBPACK_IMPORTED_MODULE_10_lodash_forEach__(__WEBPACK_IMPORTED_MODULE_8_lodash_get__(model, 'children'), function (child, index) {
                _this._addChild(new Tree(child, _this), index);
            });
        }
        if (!Array.isArray(this._children)) {
            this._children = this.node.loadChildren || isBranch ? [] : null;
        }
    };
    /**
     * Check whether children of the node are being loaded.
     * Makes sense only for nodes that define `loadChildren` function.
     * @returns {boolean} A flag indicating that children are being loaded.
     */
    Tree.prototype.childrenAreBeingLoaded = function () {
        return (this._childrenLoadingState === ChildrenLoadingState.Loading);
    };
    /**
     * Check whether children of the node were loaded.
     * Makes sense only for nodes that define `loadChildren` function.
     * @returns {boolean} A flag indicating that children were loaded.
     */
    Tree.prototype.childrenWereLoaded = function () {
        return (this._childrenLoadingState === ChildrenLoadingState.Completed);
    };
    Tree.prototype.canLoadChildren = function () {
        return (this._childrenLoadingState === ChildrenLoadingState.NotStarted)
            && (this.foldingType === __WEBPACK_IMPORTED_MODULE_19__tree_types__["FoldingType"].Expanded)
            && (!!this._loadChildren);
    };
    /**
     * Check whether children of the node should be loaded and not loaded yet.
     * Makes sense only for nodes that define `loadChildren` function.
     * @returns {boolean} A flag indicating that children should be loaded for the current node.
     */
    Tree.prototype.childrenShouldBeLoaded = function () {
        return !!this._loadChildren;
    };
    Object.defineProperty(Tree.prototype, "children", {
        /**
         * Get children of the current tree.
         * @returns {Tree[]} The children of the current tree.
         */
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "childrenAsync", {
        /**
         * By getting value from this property you start process of loading node's children using `loadChildren` function.
         * Once children are loaded `loadChildren` function won't be called anymore and loaded for the first time children are emitted in case of subsequent calls.
         * @returns {Observable<Tree[]>} An observable which emits children once they are loaded.
         */
        get: function () {
            if (this.canLoadChildren()) {
                return this._childrenAsyncOnce();
            }
            return __WEBPACK_IMPORTED_MODULE_18_rxjs_Rx__["Observable"].of(this.children);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create a new node in the current tree.
     * @param {boolean} isBranch - A flag that indicates whether a new node should be a "Branch". "Leaf" node will be created by default
     * @returns {Tree} A newly created child node.
     */
    Tree.prototype.createNode = function (isBranch) {
        var tree = new Tree({ value: '' }, null, isBranch);
        tree.markAsNew();
        if (this.childrenShouldBeLoaded() && !(this.childrenAreBeingLoaded() || this.childrenWereLoaded())) {
            return null;
        }
        if (this.isLeaf()) {
            return this.addSibling(tree);
        }
        else {
            return this.addChild(tree);
        }
    };
    Object.defineProperty(Tree.prototype, "value", {
        /**
         * Get the value of the current node
         * @returns {(string|RenamableNode)} The value of the node.
         */
        get: function () {
            return this.node.value;
        },
        /**
         * Set the value of the current node
         * @param {(string|RenamableNode)} value - The new value of the node.
         */
        set: function (value) {
            if (typeof value !== 'string' && !Tree.isRenamable(value)) {
                return;
            }
            if (Tree.isRenamable(this.value)) {
                var newValue = typeof value === 'string' ? value : __WEBPACK_IMPORTED_MODULE_11_lodash_toString__(value);
                this.node.value = Tree.applyNewValueToRenamable(this.value, newValue);
            }
            else {
                this.node.value = Tree.isValueEmpty(value) ? this.node.value : __WEBPACK_IMPORTED_MODULE_11_lodash_toString__(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add a sibling node for the current node. This won't work if the current node is a root.
     * @param {Tree} sibling - A node that should become a sibling.
     * @param [number] position - Position in which sibling will be inserted. By default it will be inserted at the last position in a parent.
     * @returns {Tree} A newly inserted sibling, or null if you are trying to make a sibling for the root.
     */
    Tree.prototype.addSibling = function (sibling, position) {
        if (__WEBPACK_IMPORTED_MODULE_12_lodash_isArray__(__WEBPACK_IMPORTED_MODULE_8_lodash_get__(this.parent, 'children'))) {
            return this.parent.addChild(sibling, position);
        }
        return null;
    };
    /**
     * Add a child node for the current node.
     * @param {Tree} child - A node that should become a child.
     * @param [number] position - Position in which child will be inserted. By default it will be inserted at the last position in a parent.
     * @returns {Tree} A newly inserted child.
     */
    Tree.prototype.addChild = function (child, position) {
        return this._addChild(Tree.cloneTreeShallow(child), position);
    };
    Tree.prototype._addChild = function (child, position) {
        if (position === void 0) { position = __WEBPACK_IMPORTED_MODULE_13_lodash_size__(this._children) || 0; }
        child.parent = this;
        if (Array.isArray(this._children)) {
            this._children.splice(position, 0, child);
        }
        else {
            this._children = [child];
        }
        this._setFoldingType();
        if (this.isNodeCollapsed()) {
            this.switchFoldingType();
        }
        return child;
    };
    /**
     * Swap position of the current node with the given sibling. If node passed as a parameter is not a sibling - nothing happens.
     * @param {Tree} sibling - A sibling with which current node shold be swapped.
     */
    Tree.prototype.swapWithSibling = function (sibling) {
        if (!this.hasSibling(sibling)) {
            return;
        }
        var siblingIndex = sibling.positionInParent;
        var thisTreeIndex = this.positionInParent;
        this.parent._children[siblingIndex] = this;
        this.parent._children[thisTreeIndex] = sibling;
    };
    Object.defineProperty(Tree.prototype, "positionInParent", {
        /**
         * Get a node's position in its parent.
         * @returns {number} The position inside a parent.
         */
        get: function () {
            return __WEBPACK_IMPORTED_MODULE_14_lodash_indexOf__(this.parent.children, this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check whether or not this tree is static.
     * @returns {boolean} A flag indicating whether or not this tree is static.
     */
    Tree.prototype.isStatic = function () {
        return __WEBPACK_IMPORTED_MODULE_8_lodash_get__(this.node.settings, 'static', false);
    };
    /**
     * Check whether or not this tree has a left menu.
     * @returns {boolean} A flag indicating whether or not this tree has a left menu.
     */
    Tree.prototype.hasLeftMenu = function () {
        return !__WEBPACK_IMPORTED_MODULE_8_lodash_get__(this.node.settings, 'static', false) && __WEBPACK_IMPORTED_MODULE_8_lodash_get__(this.node.settings, 'leftMenu', false);
    };
    /**
     * Check whether or not this tree has a right menu.
     * @returns {boolean} A flag indicating whether or not this tree has a right menu.
     */
    Tree.prototype.hasRightMenu = function () {
        return !__WEBPACK_IMPORTED_MODULE_8_lodash_get__(this.node.settings, 'static', false) && __WEBPACK_IMPORTED_MODULE_8_lodash_get__(this.node.settings, 'rightMenu', false);
    };
    /**
     * Check whether this tree is "Leaf" or not.
     * @returns {boolean} A flag indicating whether or not this tree is a "Leaf".
     */
    Tree.prototype.isLeaf = function () {
        return !this.isBranch();
    };
    /**
     * Check whether this tree is "Branch" or not. "Branch" is a node that has children.
     * @returns {boolean} A flag indicating whether or not this tree is a "Branch".
     */
    Tree.prototype.isBranch = function () {
        return Array.isArray(this._children);
    };
    /**
     * Check whether this tree has children.
     * @returns {boolean} A flag indicating whether or not this tree has children.
     */
    Tree.prototype.hasChildren = function () {
        return !__WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty__(this._children) || this.childrenShouldBeLoaded();
    };
    /**
     * Check whether this tree is a root or not. The root is the tree (node) that doesn't have parent (or technically its parent is null).
     * @returns {boolean} A flag indicating whether or not this tree is the root.
     */
    Tree.prototype.isRoot = function () {
        return this.parent === null;
    };
    /**
     * Check whether provided tree is a sibling of the current tree. Sibling trees (nodes) are the trees that have the same parent.
     * @param {Tree} tree - A tree that should be tested on a siblingness.
     * @returns {boolean} A flag indicating whether or not provided tree is the sibling of the current one.
     */
    Tree.prototype.hasSibling = function (tree) {
        return !this.isRoot() && __WEBPACK_IMPORTED_MODULE_15_lodash_includes__(this.parent.children, tree);
    };
    /**
     * Check whether provided tree is a child of the current tree.
     * This method tests that provided tree is a <strong>direct</strong> child of the current tree.
     * @param {Tree} tree - A tree that should be tested (child candidate).
     * @returns {boolean} A flag indicating whether provided tree is a child or not.
     */
    Tree.prototype.hasChild = function (tree) {
        return __WEBPACK_IMPORTED_MODULE_15_lodash_includes__(this._children, tree);
    };
    /**
     * Remove given tree from the current tree.
     * The given tree will be removed only in case it is a direct child of the current tree (@see {@link hasChild}).
     * @param {Tree} tree - A tree that should be removed.
     */
    Tree.prototype.removeChild = function (tree) {
        var childIndex = __WEBPACK_IMPORTED_MODULE_16_lodash_findIndex__(this._children, function (child) { return child === tree; });
        if (childIndex >= 0) {
            this._children.splice(childIndex, 1);
        }
        this._setFoldingType();
    };
    /**
     * Remove current tree from its parent.
     */
    Tree.prototype.removeItselfFromParent = function () {
        if (!this.parent) {
            return;
        }
        this.parent.removeChild(this);
    };
    /**
     * Switch folding type of the current tree. "Leaf" node cannot switch its folding type cause it doesn't have children, hence nothing to fold.
     * If node is a "Branch" and it is expanded, then by invoking current method state of the tree should be switched to "collapsed" and vice versa.
     */
    Tree.prototype.switchFoldingType = function () {
        if (this.isLeaf() || !this.hasChildren()) {
            return;
        }
        this.node._foldingType = this.isNodeExpanded() ? __WEBPACK_IMPORTED_MODULE_19__tree_types__["FoldingType"].Collapsed : __WEBPACK_IMPORTED_MODULE_19__tree_types__["FoldingType"].Expanded;
    };
    /**
     * Check that tree is expanded.
     * @returns {boolean} A flag indicating whether current tree is expanded. Always returns false for the "Leaf" tree and for an empty tree.
     */
    Tree.prototype.isNodeExpanded = function () {
        return this.foldingType === __WEBPACK_IMPORTED_MODULE_19__tree_types__["FoldingType"].Expanded;
    };
    /**
     * Check that tree is collapsed.
     * @returns {boolean} A flag indicating whether current tree is collapsed. Always returns false for the "Leaf" tree and for an empty tree.
     */
    Tree.prototype.isNodeCollapsed = function () {
        return this.foldingType === __WEBPACK_IMPORTED_MODULE_19__tree_types__["FoldingType"].Collapsed;
    };
    /**
     * Set a current folding type: expanded, collapsed or leaf.
     */
    Tree.prototype._setFoldingType = function () {
        if (this.childrenShouldBeLoaded()) {
            this.node._foldingType = __WEBPACK_IMPORTED_MODULE_19__tree_types__["FoldingType"].Collapsed;
        }
        else if (this._children && !__WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty__(this._children)) {
            this.node._foldingType = __WEBPACK_IMPORTED_MODULE_19__tree_types__["FoldingType"].Expanded;
        }
        else if (Array.isArray(this._children)) {
            this.node._foldingType = __WEBPACK_IMPORTED_MODULE_19__tree_types__["FoldingType"].Empty;
        }
        else {
            this.node._foldingType = __WEBPACK_IMPORTED_MODULE_19__tree_types__["FoldingType"].Leaf;
        }
    };
    Object.defineProperty(Tree.prototype, "foldingType", {
        /**
         * Get a current folding type: expanded, collapsed or leaf.
         * @returns {FoldingType} A folding type of the current tree.
         */
        get: function () {
            if (!this.node._foldingType) {
                this._setFoldingType();
            }
            return this.node._foldingType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "foldingCssClass", {
        /**
         * Get a css class for element which displayes folding state - expanded, collapsed or leaf
         * @returns {string} A string icontaining css class (classes)
         */
        get: function () {
            return this.getCssClassesFromSettings() || this.foldingType.cssClass;
        },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.getCssClassesFromSettings = function () {
        if (!this.node._foldingType) {
            this._setFoldingType();
        }
        if (this.node._foldingType === __WEBPACK_IMPORTED_MODULE_19__tree_types__["FoldingType"].Collapsed) {
            return __WEBPACK_IMPORTED_MODULE_8_lodash_get__(this.node.settings, 'cssClasses.collapsed', null);
        }
        else if (this.node._foldingType === __WEBPACK_IMPORTED_MODULE_19__tree_types__["FoldingType"].Expanded) {
            return __WEBPACK_IMPORTED_MODULE_8_lodash_get__(this.node.settings, 'cssClasses.expanded', null);
        }
        else if (this.node._foldingType === __WEBPACK_IMPORTED_MODULE_19__tree_types__["FoldingType"].Empty) {
            return __WEBPACK_IMPORTED_MODULE_8_lodash_get__(this.node.settings, 'cssClasses.empty', null);
        }
        return __WEBPACK_IMPORTED_MODULE_8_lodash_get__(this.node.settings, 'cssClasses.leaf', null);
    };
    Object.defineProperty(Tree.prototype, "nodeTemplate", {
        /**
         * Get a html template to render before every node's name.
         * @returns {string} A string representing a html template.
         */
        get: function () {
            return this.getTemplateFromSettings();
        },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.getTemplateFromSettings = function () {
        if (this.isLeaf()) {
            return __WEBPACK_IMPORTED_MODULE_8_lodash_get__(this.node.settings, 'templates.leaf', '');
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_8_lodash_get__(this.node.settings, 'templates.node', '');
        }
    };
    Object.defineProperty(Tree.prototype, "leftMenuTemplate", {
        /**
         * Get a html template to render for an element activatin left menu of a node.
         * @returns {string} A string representing a html template.
         */
        get: function () {
            if (this.hasLeftMenu()) {
                return __WEBPACK_IMPORTED_MODULE_8_lodash_get__(this.node.settings, 'templates.leftMenu', '<span></span>');
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check that current tree is newly created (added by user via menu for example). Tree that was built from the TreeModel is not marked as new.
     * @returns {boolean} A flag whether the tree is new.
     */
    Tree.prototype.isNew = function () {
        return this.node._status === __WEBPACK_IMPORTED_MODULE_19__tree_types__["TreeStatus"].New;
    };
    /**
     * Mark current tree as new (@see {@link isNew}).
     */
    Tree.prototype.markAsNew = function () {
        this.node._status = __WEBPACK_IMPORTED_MODULE_19__tree_types__["TreeStatus"].New;
    };
    /**
     * Check that current tree is being renamed (it is in the process of its value renaming initiated by a user).
     * @returns {boolean} A flag whether the tree is being renamed.
     */
    Tree.prototype.isBeingRenamed = function () {
        return this.node._status === __WEBPACK_IMPORTED_MODULE_19__tree_types__["TreeStatus"].IsBeingRenamed;
    };
    /**
     * Mark current tree as being renamed (@see {@link isBeingRenamed}).
     */
    Tree.prototype.markAsBeingRenamed = function () {
        this.node._status = __WEBPACK_IMPORTED_MODULE_19__tree_types__["TreeStatus"].IsBeingRenamed;
    };
    /**
     * Check that current tree is modified (for example it was renamed).
     * @returns {boolean} A flag whether the tree is modified.
     */
    Tree.prototype.isModified = function () {
        return this.node._status === __WEBPACK_IMPORTED_MODULE_19__tree_types__["TreeStatus"].Modified;
    };
    /**
     * Mark current tree as modified (@see {@link isModified}).
     */
    Tree.prototype.markAsModified = function () {
        this.node._status = __WEBPACK_IMPORTED_MODULE_19__tree_types__["TreeStatus"].Modified;
    };
    return Tree;
}());

//# sourceMappingURL=tree.js.map

/***/ }),

/***/ "../../../../../src/tree.types.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_defaultsDeep__ = __webpack_require__("../../../../lodash/defaultsDeep.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_defaultsDeep___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_defaultsDeep__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_get__ = __webpack_require__("../../../../lodash/get.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_get__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoldingType", function() { return FoldingType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeModelSettings", function() { return TreeModelSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeStatus", function() { return TreeStatus; });


var FoldingType = (function () {
    function FoldingType(_cssClass) {
        this._cssClass = _cssClass;
    }
    Object.defineProperty(FoldingType.prototype, "cssClass", {
        get: function () {
            return this._cssClass;
        },
        enumerable: true,
        configurable: true
    });
    return FoldingType;
}());

FoldingType.Expanded = new FoldingType('node-expanded');
FoldingType.Collapsed = new FoldingType('node-collapsed');
FoldingType.Empty = new FoldingType('node-empty');
FoldingType.Leaf = new FoldingType('node-leaf');
var TreeModelSettings = (function () {
    function TreeModelSettings() {
    }
    TreeModelSettings.merge = function (sourceA, sourceB) {
        return __WEBPACK_IMPORTED_MODULE_0_lodash_defaultsDeep__({}, __WEBPACK_IMPORTED_MODULE_1_lodash_get__(sourceA, 'settings'), __WEBPACK_IMPORTED_MODULE_1_lodash_get__(sourceB, 'settings'), { static: false, leftMenu: false, rightMenu: true });
    };
    return TreeModelSettings;
}());

var TreeStatus;
(function (TreeStatus) {
    TreeStatus[TreeStatus["New"] = 0] = "New";
    TreeStatus[TreeStatus["Modified"] = 1] = "Modified";
    TreeStatus[TreeStatus["IsBeingRenamed"] = 2] = "IsBeingRenamed";
})(TreeStatus || (TreeStatus = {}));
//# sourceMappingURL=tree.types.js.map

/***/ }),

/***/ "../../../../../src/utils/event.utils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Keys */
/* unused harmony export MouseButtons */
/* harmony export (immutable) */ __webpack_exports__["a"] = isLeftButtonClicked;
/* harmony export (immutable) */ __webpack_exports__["b"] = isRightButtonClicked;
/* harmony export (immutable) */ __webpack_exports__["c"] = isEscapePressed;
var Keys;
(function (Keys) {
    Keys[Keys["Escape"] = 27] = "Escape";
})(Keys || (Keys = {}));
var MouseButtons;
(function (MouseButtons) {
    MouseButtons[MouseButtons["Left"] = 0] = "Left";
    MouseButtons[MouseButtons["Right"] = 2] = "Right";
})(MouseButtons || (MouseButtons = {}));
function isLeftButtonClicked(e) {
    return e.button === MouseButtons.Left;
}
function isRightButtonClicked(e) {
    return e.button === MouseButtons.Right;
}
function isEscapePressed(e) {
    return e.keyCode === Keys.Escape;
}
//# sourceMappingURL=event.utils.js.map

/***/ }),

/***/ "../../../../../src/utils/safe-html.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafeHtmlPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafeHtmlPipe = (function () {
    function SafeHtmlPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeHtmlPipe.prototype.transform = function (value) {
        // return value;
        return this.sanitizer.bypassSecurityTrustHtml(value);
    };
    return SafeHtmlPipe;
}());
SafeHtmlPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Pipe */])({ name: 'safeHtml' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */]) === "function" && _a || Object])
], SafeHtmlPipe);

var _a;
//# sourceMappingURL=safe-html.pipe.js.map

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/demo/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map