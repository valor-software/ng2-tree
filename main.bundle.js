webpackJsonp(["main"],{

/***/ "../../../../../index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_tree_types__ = __webpack_require__("../../../../../src/tree.types.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_tree__ = __webpack_require__("../../../../../src/tree.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_menu_menu_events__ = __webpack_require__("../../../../../src/menu/menu.events.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_tree_events__ = __webpack_require__("../../../../../src/tree.events.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_tree_component__ = __webpack_require__("../../../../../src/tree.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_tree_controller__ = __webpack_require__("../../../../../src/tree-controller.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_tree_module__ = __webpack_require__("../../../../../src/tree.module.ts");
/* unused harmony reexport Tree */
/* unused harmony reexport TreeModelSettings */
/* unused harmony reexport Ng2TreeSettings */
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
/* unused harmony reexport NodeUncheckedEvent */
/* unused harmony reexport NodeCheckedEvent */
/* unused harmony reexport NodeIndeterminedEvent */
/* unused harmony reexport NodeUnselectedEvent */
/* unused harmony reexport TreeComponent */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_6__src_tree_module__["a"]; });
/* unused harmony reexport NodeMenuItemAction */
/* unused harmony reexport MenuItemSelectedEvent */
/* unused harmony reexport TreeController */










/***/ }),

/***/ "../../../../../src/demo/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/demo/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/demo/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menu_menu_events__ = __webpack_require__("../../../../../src/menu/menu.events.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent() {
        this.settings = {
            rootIsVisible: false,
            showCheckboxes: true
        };
        this.disabledCheckboxesSettings = {
            rootIsVisible: false,
            showCheckboxes: true,
            enableCheckboxes: false
        };
        this.fonts = {
            value: 'Fonts',
            settings: {
                isCollapsedOnInit: true
            },
            children: [
                {
                    value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
                    id: 1,
                    settings: {
                        static: true
                    },
                    children: [
                        { value: '<a href="#" id="antiqua" class="test">Antiqua</a> with HTML tags.', id: 2 },
                        { value: 'DejaVu Serif', id: 3 },
                        { value: 'Garamond', id: 4 },
                        { value: 'Georgia', id: 5 },
                        { value: 'Times New Roman', id: 6 },
                        {
                            value: 'Slab serif',
                            id: 7,
                            children: [{ value: 'Candida', id: 8 }, { value: 'Swift', id: 9 }, { value: 'Guardian Egyptian', id: 10 }]
                        }
                    ]
                },
                {
                    value: 'Sans-serif (Right click me - I have a custom menu)',
                    id: 11,
                    settings: {
                        menuItems: [
                            { action: __WEBPACK_IMPORTED_MODULE_1__menu_menu_events__["b" /* NodeMenuItemAction */].Custom, name: 'Foo', cssClass: 'fa fa-arrow-right' },
                            { action: __WEBPACK_IMPORTED_MODULE_1__menu_menu_events__["b" /* NodeMenuItemAction */].Custom, name: 'Bar', cssClass: 'fa fa-arrow-right' },
                            { action: __WEBPACK_IMPORTED_MODULE_1__menu_menu_events__["b" /* NodeMenuItemAction */].Custom, name: 'Baz', cssClass: 'fa fa-arrow-right' }
                        ]
                    },
                    children: [
                        { value: 'Arial', id: 12 },
                        { value: 'Century Gothic', id: 13 },
                        { value: 'DejaVu Sans', id: 14 },
                        { value: 'Futura', id: 15 },
                        { value: 'Geneva', id: 16 },
                        { value: 'Liberation Sans', id: 17 }
                    ]
                },
                {
                    value: 'Monospace - With ASYNC CHILDREN',
                    id: 18,
                    // children property is ignored if "loadChildren" is present
                    children: [{ value: 'I am the font that will be ignored' }],
                    loadChildren: function (callback) {
                        setTimeout(function () {
                            callback([
                                { value: 'Input Mono', id: 19 },
                                { value: 'Roboto Mono', id: 20 },
                                { value: 'Liberation Mono', id: 21 },
                                { value: 'Hack', id: 22 },
                                { value: 'Consolas', id: 23 },
                                { value: 'Menlo', id: 24 },
                                { value: 'Source Code Pro', id: 25 }
                            ]);
                        }, 5000);
                    }
                }
            ]
        };
        this.ffs = {
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
                    ],
                    settings: {
                        isCollapsedOnInit: true
                    }
                },
                {
                    value: 'boot',
                    id: 13,
                    settings: {
                        isCollapsedOnInit: true,
                        keepNodesInDOM: true
                    },
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
                            children: [],
                            settings: {
                                checked: true
                            }
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
                {
                    value: 'etc',
                    id: 36,
                    loadChildren: function (callback) {
                        console.log('callback function called to load etc`s children');
                        setTimeout(function () {
                            callback([
                                { value: 'apache2', id: 82, children: [] },
                                { value: 'nginx', id: 83, children: [] },
                                { value: 'dhcp', id: 84, children: [] },
                                { value: 'dpkg', id: 85, children: [] }
                            ]);
                        });
                    }
                },
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
                                    children: [{ value: "won't be displayed" }],
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
        this.lastFFSNodeId = 86;
        this.icons = {
            value: 'Icons',
            children: [
                {
                    value: 'Web Application Icons',
                    children: [
                        { value: 'calendar', icon: 'fa-calendar' },
                        { value: 'download', icon: 'fa-download' },
                        { value: 'group', icon: 'fa-group' },
                        { value: 'print', icon: 'fa-print' }
                    ]
                },
                {
                    value: 'Hand Icons',
                    children: [
                        { value: 'pointer', icon: 'fa-hand-pointer-o' },
                        { value: 'grab', icon: 'fa-hand-rock-o' },
                        { value: 'thumbs up', icon: 'fa-thumbs-o-up ' },
                        { value: 'thumbs down', icon: 'fa-thumbs-o-down' }
                    ]
                },
                {
                    value: 'File Type Icons',
                    children: [
                        { value: 'file', icon: 'fa-file-o' },
                        { value: 'audio', icon: 'fa-file-audio-o' },
                        { value: 'movie', icon: 'fa-file-movie-o ' },
                        { value: 'archive', icon: 'fa-file-zip-o' }
                    ]
                }
            ]
        };
        this.custom = {
            settings: {
                menuItems: [
                    { action: __WEBPACK_IMPORTED_MODULE_1__menu_menu_events__["b" /* NodeMenuItemAction */].NewFolder, name: 'Add parent node', cssClass: '' },
                    { action: __WEBPACK_IMPORTED_MODULE_1__menu_menu_events__["b" /* NodeMenuItemAction */].NewTag, name: 'Add child node', cssClass: '' },
                    { action: __WEBPACK_IMPORTED_MODULE_1__menu_menu_events__["b" /* NodeMenuItemAction */].Remove, name: 'Remove node', cssClass: '' },
                    { action: __WEBPACK_IMPORTED_MODULE_1__menu_menu_events__["b" /* NodeMenuItemAction */].Rename, name: 'Rename node', cssClass: '' },
                    { action: __WEBPACK_IMPORTED_MODULE_1__menu_menu_events__["b" /* NodeMenuItemAction */].Custom, name: 'Custom Action', cssClass: '' }
                ]
            },
            value: 'TestParent',
            children: [{ value: 'TestChild', icon: '' }]
        };
    }
    AppComponent_1 = AppComponent;
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
                        children: [{ value: 'AspectJ' }, { value: 'AspectC++' }]
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
                        children: [{ value: 'JavaScript' }, { value: 'CoffeeScript' }, { value: 'TypeScript' }]
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
    AppComponent.prototype.onNodeFFSCreated = function (e, controller) {
        AppComponent_1.logEvent(e, 'Created');
        if (controller) {
            controller.changeNodeId(++this.lastFFSNodeId);
        }
    };
    AppComponent.prototype.onNodeSelected = function (e) {
        AppComponent_1.logEvent(e, 'Selected');
    };
    AppComponent.prototype.onNodeUnselected = function (e) {
        AppComponent_1.logEvent(e, 'Unselected');
    };
    AppComponent.prototype.onMenuItemSelected = function (e) {
        AppComponent_1.logEvent(e, "You selected " + e.selectedItem + " menu item");
    };
    AppComponent.prototype.onNodeExpanded = function (e) {
        AppComponent_1.logEvent(e, 'Expanded');
    };
    AppComponent.prototype.onNodeCollapsed = function (e) {
        AppComponent_1.logEvent(e, 'Collapsed');
    };
    AppComponent.prototype.handleActionOnFFS = function (id, action) {
        var treeController = this.treeFFS.getControllerByNodeId(id);
        if (treeController && typeof treeController[action] === 'function') {
            treeController[action]();
        }
        else {
            console.log('There isn`t a controller for a node with id - ' + id);
        }
    };
    AppComponent.prototype.renameFFS = function (id) {
        var treeController = this.treeFFS.getControllerByNodeId(id);
        if (treeController) {
            treeController.rename('unicode.pf');
        }
        else {
            console.log('There isn`t a controller for a node with id - ' + id);
        }
    };
    AppComponent.prototype.setChildrenFFS = function (id) {
        var treeController = this.treeFFS.getControllerByNodeId(id);
        if (treeController && typeof treeController.setChildren === 'function') {
            treeController.setChildren([
                { value: 'apache2', id: 82, children: [] },
                { value: 'nginx', id: 83, children: [] },
                { value: 'dhcp', id: 84, children: [] },
                { value: 'dpkg', id: 85, children: [] },
                { value: 'gdb', id: 86, children: [] }
            ]);
        }
        else {
            console.log('There isn`t a controller for a node with id - ' + id);
        }
    };
    AppComponent.prototype.addChildFFS = function (id, newNode) {
        newNode.id = ++this.lastFFSNodeId;
        var treeController = this.treeFFS.getControllerByNodeId(id);
        if (treeController) {
            treeController.addChild(newNode);
        }
        else {
            console.log("Controller is absent for a node with id: " + id);
        }
    };
    AppComponent.prototype.checkFolder = function (id) {
        var treeController = this.treeFFS.getControllerByNodeId(id);
        if (treeController) {
            treeController.check();
        }
        else {
            console.log("Controller is absent for a node with id: " + id);
        }
    };
    AppComponent.prototype.uncheckFolder = function (id) {
        var treeController = this.treeFFS.getControllerByNodeId(id);
        if (treeController) {
            treeController.uncheck();
        }
        else {
            console.log("Controller is absent for a node with id: " + id);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* ViewChild */])('treeFonts'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "treeFonts", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* ViewChild */])('treeFFS'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "treeFFS", void 0);
    AppComponent = AppComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app',
            template: "\n    <div class=\"tree-demo-app\">\n        <div class=\"tree-container\">\n            <div class=\"tree-info\">\n                <p class=\"tree-title\">Fonts tree</p>\n            </div>\n            <div class=\"tree-content\">\n                <tree #treeFonts\n                      [tree]=\"fonts\"\n                      [settings]=\"{rootIsVisible: false}\"\n                      (menuItemSelected)=\"onMenuItemSelected($event)\"\n                      (nodeRemoved)=\"onNodeRemoved($event)\"\n                      (nodeRenamed)=\"onNodeRenamed($event)\"\n                      (nodeSelected)=\"onNodeSelected($event)\"\n                      (nodeMoved)=\"onNodeMoved($event)\"\n                      (nodeCreated)=\"onNodeCreated($event)\"\n                      (nodeExpanded)=\"onNodeExpanded($event)\"\n                      (nodeCollapsed)=\"onNodeCollapsed($event)\">\n                </tree>\n            </div>\n        </div>\n        <div class=\"tree-container\">\n            <div class=\"tree-info\">\n                <p class=\"tree-title\">Programming languages tree</p>\n                <p class=\"notice\">this tree is loaded asynchronously</p>\n            </div>\n            <div class=\"tree-content\">\n                <tree [tree]=\"pls\"\n                      [settings]=\"disabledCheckboxesSettings\"\n                      (nodeRemoved)=\"onNodeRemoved($event)\"\n                      (nodeRenamed)=\"onNodeRenamed($event)\"\n                      (nodeSelected)=\"onNodeSelected($event)\"\n                      (nodeMoved)=\"onNodeMoved($event)\"\n                      (nodeCreated)=\"onNodeCreated($event)\">\n                </tree>\n            </div>\n        </div>\n        <div class=\"tree-container tree-container--with-controls\">\n            <div class=\"tree-info\">\n                <p class=\"tree-title\">Directory/File structure</p>\n                <p class=\"notice\">this tree has advanced configurations</p>\n            </div>\n            <div class=\"tree-content\">\n                <tree #treeFFS\n                      [tree]=\"ffs\"\n                      (nodeRemoved)=\"onNodeRemoved($event)\"\n                      (nodeRenamed)=\"onNodeRenamed($event)\"\n                      (nodeSelected)=\"onNodeSelected($event)\"\n                      (nodeUnselected)=\"onNodeUnselected($event)\"\n                      (nodeMoved)=\"onNodeMoved($event)\"\n                      (nodeCreated)=\"onNodeFFSCreated($event)\"\n                      (nodeExpanded)=\"onNodeExpanded($event)\"\n                      (nodeCollapsed)=\"onNodeCollapsed($event)\"\n                      [settings]=\"settings\">\n                </tree>\n            </div>\n\n            <div class=\"tree-controlls\">\n                <p class=\"notice\">Tree API exposed via TreeController</p>\n                <button button (click)=\"handleActionOnFFS(21, 'expandToParent')\">Select 'unicode.pf2' up to root</button>\n                <button button (click)=\"handleActionOnFFS(13, 'select')\">Select 'boot' node</button>\n                <button button (click)=\"handleActionOnFFS(13, 'unselect')\">Unselect 'boot' node</button>\n                <button button (click)=\"handleActionOnFFS(13, 'allowSelection')\">Allow selection of the 'boot' node</button>\n                <button button (click)=\"handleActionOnFFS(13, 'forbidSelection')\">Forbid selection of the 'boot' node</button>\n                <button button (click)=\"handleActionOnFFS(2, 'collapse')\">Collapse 'bin' node</button>\n                <button button (click)=\"handleActionOnFFS(2, 'expand')\">Expand 'bin' node</button>\n                <button button (click)=\"renameFFS(21)\">Rename 'unicode.pf2' to 'unicode.pf'</button>\n                <button button (click)=\"handleActionOnFFS(12, 'remove')\">Remove 'nano'</button>\n                <button button (click)=\"handleActionOnFFS(52, 'reloadChildren')\">Reload Music's children</button>\n                <button button (click)=\"setChildrenFFS(36)\">Set 'etc' children</button>\n                <button button (click)=\"addChildFFS(2, {value: 'ping'})\">Add a child with name 'ping' to 'bin'</button>\n                <button button (click)=\"addChildFFS(22, {value: 'lost'})\">Add a child with name 'lost' to 'lost+found'</button>\n                <button button (click)=\"addChildFFS(22, {value: 'found', children: []})\">Add a child with name 'found' to 'lost+found'</button>\n                <button button (click)=\"addChildFFS(36, {value: 'found', children: []})\">Add a child with name 'found' to 'etc'</button>\n                <button button (click)=\"addChildFFS(78, {value: 'Voodo People'})\">Add a child with name 'Voodo People' to '2Cellos'</button>\n                <button button (click)=\"checkFolder(52)\">Check Music folder</button>\n                <button button (click)=\"uncheckFolder(52)\">Uncheck Music folder</button>\n            </div>\n        </div>\n        <div class=\"tree-container\">\n            <div class=\"tree-info\">\n                <p class=\"tree-title\">Programming languages tree</p>\n                <p class=\"notice\">this tree is using a custom template</p>\n            </div>\n            <div class=\"tree-content\">\n                <tree [tree]=\"icons\"\n                      [settings]=\"settings\"\n                      (nodeRemoved)=\"onNodeRemoved($event)\"\n                      (nodeRenamed)=\"onNodeRenamed($event)\"\n                      (nodeSelected)=\"onNodeSelected($event)\"\n                      (nodeMoved)=\"onNodeMoved($event)\"\n                      (nodeCreated)=\"onNodeCreated($event)\">\n                    <ng-template let-node>\n                        <i class=\"fa {{node.icon}}\"></i>\n                        <span class=\"node-name\" [innerHTML]=\"node.value\"></span>\n                    </ng-template>\n                </tree>\n            </div>\n        </div>\n        <div>\n            <div class=\"tree-info\">\n                <p class=\"tree-title\">Custom right click GUI tree</p>\n                <p class=\"notice\">this tree is using a custom right click menu</p>\n            </div>\n            <div class=\"tree-content\">\n                <tree [tree]=\"custom\"\n                      (nodeSelected)=\"onNodeSelected($event)\">\n                </tree>\n            </div>\n        </div>\n    </div>\n  ",
            styles: [
                "\n    .tree-info {\n        flex: 1 0 100%;\n        display: flex;\n        flex-direction: column;\n        align-items: flex-start;\n      }\n\n      .tree-controlls {\n        display: flex;\n        flex-direction: column;\n      }\n\n      .tree-content {\n        display: flex;\n        flex-direction: column;\n      }\n\n      .tree-container {\n        margin-bottom: 20px;\n\n      }\n\n      .tree-container--with-controls {\n        display: flex;\n        flex-wrap: wrap;\n      }\n\n      .tree-demo-app {\n        display: flex;\n        flex-direction: column;\n        margin-bottom:50px;\n      }\n\n      .tree-title {\n        margin: 0;\n        color: #40a070;\n        font-size: 2em;\n      }\n\n      .notice {\n        color: #e91e63;\n        font-size: 1.2em;\n        font-style: italic;\n      }\n\n      :host /deep/ .fa {\n        cursor: pointer;\n      }\n\n      :host /deep/ .fa.disabled {\n        cursor: inherit;\n        color: #757575;\n      }\n\n      .button {\n        border-radius: 4px;\n        box-shadow: 0 2px 4px 0 #888;\n        background-color: #fff;\n        -webkit-appearance: none;\n        border: 1px solid #000;\n        height: 35px;\n        outline: none;\n      }\n\n      .button-pressed {\n        box-shadow: 0 0 1px 0 #888;\n      }\n\n      .tree-controlls button {\n        margin: 5px;\n      }\n  "
            ]
        })
    ], AppComponent);
    return AppComponent;
    var AppComponent_1;
}());



/***/ }),

/***/ "../../../../../src/demo/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_component__ = __webpack_require__("../../../../../src/demo/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index__ = __webpack_require__("../../../../../index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__button__ = __webpack_require__("../../../../../src/demo/app/button.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_4__button__["a" /* ButtonDirective */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_5__angular_common__["a" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_3__index__["a" /* TreeModule */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/demo/app/button.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ButtonDirective = (function () {
    function ButtonDirective(el) {
        this.el = el;
        el.nativeElement.classList.add('button');
        el.nativeElement.addEventListener('mousedown', function (e) {
            el.nativeElement.classList.add('button-pressed');
        });
        el.nativeElement.addEventListener('mouseup', function (e) {
            el.nativeElement.classList.remove('button-pressed');
        });
    }
    ButtonDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* Directive */])({
            selector: '[button]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* ElementRef */]])
    ], ButtonDirective);
    return ButtonDirective;
}());



/***/ }),

/***/ "../../../../../src/demo/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/demo/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/demo/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/demo/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);


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



/***/ }),

/***/ "../../../../../src/draggable/node-draggable.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeDraggableDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_draggable_service__ = __webpack_require__("../../../../../src/draggable/node-draggable.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__captured_node__ = __webpack_require__("../../../../../src/draggable/captured-node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tree__ = __webpack_require__("../../../../../src/tree.ts");
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




var NodeDraggableDirective = (function () {
    function NodeDraggableDirective(element, nodeDraggableService, renderer) {
        this.element = element;
        this.nodeDraggableService = nodeDraggableService;
        this.renderer = renderer;
        this.disposersForDragListeners = [];
        this.nodeNativeElement = element.nativeElement;
    }
    NodeDraggableDirective_1 = NodeDraggableDirective;
    NodeDraggableDirective.prototype.ngOnInit = function () {
        if (!this.tree.isStatic()) {
            this.renderer.setAttribute(this.nodeNativeElement, 'draggable', 'true');
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
        if (e.stopPropagation) {
            e.stopPropagation();
        }
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
        if (e.stopPropagation) {
            e.stopPropagation();
        }
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
        return capturedNode && capturedNode.canBeDroppedAt(this.nodeDraggable) && this.containsElementAt(e);
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
    NodeDraggableDirective.DATA_TRANSFER_STUB_DATA = 'some browsers enable drag-n-drop only when dataTransfer has data';
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* ElementRef */])
    ], NodeDraggableDirective.prototype, "nodeDraggable", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__tree__["a" /* Tree */])
    ], NodeDraggableDirective.prototype, "tree", void 0);
    NodeDraggableDirective = NodeDraggableDirective_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* Directive */])({
            selector: '[nodeDraggable]'
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* ElementRef */])),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__node_draggable_service__["a" /* NodeDraggableService */])),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Renderer2 */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* ElementRef */],
            __WEBPACK_IMPORTED_MODULE_1__node_draggable_service__["a" /* NodeDraggableService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Renderer2 */]])
    ], NodeDraggableDirective);
    return NodeDraggableDirective;
    var NodeDraggableDirective_1;
}());



/***/ }),

/***/ "../../../../../src/draggable/node-draggable.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeDraggableService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__draggable_events__ = __webpack_require__("../../../../../src/draggable/draggable.events.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NodeDraggableService = (function () {
    function NodeDraggableService() {
        this.draggableNodeEvents$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
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
    NodeDraggableService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Injectable */])()
    ], NodeDraggableService);
    return NodeDraggableService;
}());



/***/ }),

/***/ "../../../../../src/editable/editable.events.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeEditableEventAction; });
var NodeEditableEventAction;
(function (NodeEditableEventAction) {
    NodeEditableEventAction[NodeEditableEventAction["Cancel"] = 0] = "Cancel";
})(NodeEditableEventAction || (NodeEditableEventAction = {}));


/***/ }),

/***/ "../../../../../src/editable/node-editable.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeEditableDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editable_events__ = __webpack_require__("../../../../../src/editable/editable.events.ts");
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
        this.valueChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */](false);
    }
    NodeEditableDirective.prototype.ngOnInit = function () {
        var nativeElement = this.elementRef.nativeElement;
        if (nativeElement) {
            nativeElement.focus();
        }
        this.renderer.setProperty(nativeElement, 'value', this.nodeValue);
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
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('nodeEditable'),
        __metadata("design:type", String)
    ], NodeEditableDirective.prototype, "nodeValue", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
    ], NodeEditableDirective.prototype, "valueChanged", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* HostListener */])('keyup.enter', ['$event.target.value']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], NodeEditableDirective.prototype, "applyNewValue", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* HostListener */])('blur', ['$event.target.value']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], NodeEditableDirective.prototype, "applyNewValueByLoosingFocus", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* HostListener */])('keyup.esc'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NodeEditableDirective.prototype, "cancelEditing", null);
    NodeEditableDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* Directive */])({
            selector: '[nodeEditable]'
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Renderer2 */])),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* ElementRef */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Renderer2 */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* ElementRef */]])
    ], NodeEditableDirective);
    return NodeEditableDirective;
}());



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
    NodeMenuItemAction[NodeMenuItemAction["Custom"] = 4] = "Custom";
})(NodeMenuItemAction || (NodeMenuItemAction = {}));
var NodeMenuAction;
(function (NodeMenuAction) {
    NodeMenuAction[NodeMenuAction["Close"] = 0] = "Close";
})(NodeMenuAction || (NodeMenuAction = {}));


/***/ }),

/***/ "../../../../../src/menu/node-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_menu_service__ = __webpack_require__("../../../../../src/menu/node-menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_events__ = __webpack_require__("../../../../../src/menu/menu.events.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_event_utils__ = __webpack_require__("../../../../../src/utils/event.utils.ts");
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
        this.menuItemSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
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
        this.availableMenuItems = this.menuItems || this.availableMenuItems;
        this.disposersForGlobalListeners.push(this.renderer.listen('document', 'keyup', this.closeMenu.bind(this)));
        this.disposersForGlobalListeners.push(this.renderer.listen('document', 'mousedown', this.closeMenu.bind(this)));
    };
    NodeMenuComponent.prototype.ngOnDestroy = function () {
        this.disposersForGlobalListeners.forEach(function (dispose) { return dispose(); });
    };
    NodeMenuComponent.prototype.onMenuItemSelected = function (e, selectedMenuItem) {
        if (Object(__WEBPACK_IMPORTED_MODULE_3__utils_event_utils__["c" /* isLeftButtonClicked */])(e)) {
            this.menuItemSelected.emit({
                nodeMenuItemAction: selectedMenuItem.action,
                nodeMenuItemSelected: selectedMenuItem.name
            });
            this.nodeMenuService.fireMenuEvent(e.target, __WEBPACK_IMPORTED_MODULE_2__menu_events__["a" /* NodeMenuAction */].Close);
        }
    };
    NodeMenuComponent.prototype.closeMenu = function (e) {
        var mouseClicked = e instanceof MouseEvent;
        // Check if the click is fired on an element inside a menu
        var containingTarget = this.menuContainer.nativeElement !== e.target && this.menuContainer.nativeElement.contains(e.target);
        if ((mouseClicked && !containingTarget) || Object(__WEBPACK_IMPORTED_MODULE_3__utils_event_utils__["b" /* isEscapePressed */])(e)) {
            this.nodeMenuService.fireMenuEvent(e.target, __WEBPACK_IMPORTED_MODULE_2__menu_events__["a" /* NodeMenuAction */].Close);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
    ], NodeMenuComponent.prototype, "menuItemSelected", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", Array)
    ], NodeMenuComponent.prototype, "menuItems", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* ViewChild */])('menuContainer'),
        __metadata("design:type", Object)
    ], NodeMenuComponent.prototype, "menuContainer", void 0);
    NodeMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'node-menu',
            template: "\n    <div class=\"node-menu\">\n      <ul class=\"node-menu-content\" #menuContainer>\n        <li class=\"node-menu-item\" *ngFor=\"let menuItem of availableMenuItems\"\n          (click)=\"onMenuItemSelected($event, menuItem)\">\n          <div class=\"node-menu-item-icon {{menuItem.cssClass}}\"></div>\n          <span class=\"node-menu-item-value\">{{menuItem.name}}</span>\n        </li>\n      </ul>\n    </div>\n  "
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Renderer2 */])),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__node_menu_service__["a" /* NodeMenuService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Renderer2 */],
            __WEBPACK_IMPORTED_MODULE_1__node_menu_service__["a" /* NodeMenuService */]])
    ], NodeMenuComponent);
    return NodeMenuComponent;
}());



/***/ }),

/***/ "../../../../../src/menu/node-menu.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeMenuService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_events__ = __webpack_require__("../../../../../src/menu/menu.events.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NodeMenuService = (function () {
    function NodeMenuService() {
        this.nodeMenuEvents$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
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
    NodeMenuService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Injectable */])()
    ], NodeMenuService);
    return NodeMenuService;
}());



/***/ }),

/***/ "../../../../../src/rxjs-imports.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export noop */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_merge__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/merge.js");



// This forces angular compiler to generate a "rxjs-imports.metadata.json"
// with a valid metadata instead of "[null]"
var noop = function () { };


/***/ }),

/***/ "../../../../../src/tree-controller.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__menu_menu_events__ = __webpack_require__("../../../../../src/menu/menu.events.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_event_utils__ = __webpack_require__("../../../../../src/utils/event.utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_fn_utils__ = __webpack_require__("../../../../../src/utils/fn.utils.ts");



var TreeController = (function () {
    function TreeController(component) {
        this.component = component;
        this.tree = this.component.tree;
        this.treeService = this.component.treeService;
    }
    TreeController.prototype.select = function () {
        if (!this.isSelected()) {
            this.component.onNodeSelected({ button: __WEBPACK_IMPORTED_MODULE_1__utils_event_utils__["a" /* MouseButtons */].Left });
        }
    };
    TreeController.prototype.unselect = function () {
        if (this.isSelected()) {
            this.component.onNodeUnselected({ button: __WEBPACK_IMPORTED_MODULE_1__utils_event_utils__["a" /* MouseButtons */].Left });
        }
    };
    TreeController.prototype.isSelected = function () {
        return this.component.isSelected;
    };
    TreeController.prototype.expand = function () {
        if (this.isCollapsed()) {
            this.component.onSwitchFoldingType();
        }
    };
    TreeController.prototype.expandToParent = function (tree) {
        if (tree === void 0) { tree = this.tree; }
        if (tree) {
            var controller = this.treeService.getController(tree.id);
            if (controller) {
                controller.expand();
                this.expandToParent(tree.parent);
            }
        }
    };
    TreeController.prototype.isExpanded = function () {
        return this.tree.isNodeExpanded();
    };
    TreeController.prototype.collapse = function () {
        if (this.isExpanded()) {
            this.component.onSwitchFoldingType();
        }
    };
    TreeController.prototype.isCollapsed = function () {
        return this.tree.isNodeCollapsed();
    };
    TreeController.prototype.toTreeModel = function () {
        return this.tree.toTreeModel();
    };
    TreeController.prototype.rename = function (newValue) {
        this.tree.markAsBeingRenamed();
        this.component.applyNewValue({ type: 'keyup', value: newValue });
    };
    TreeController.prototype.remove = function () {
        this.component.onMenuItemSelected({ nodeMenuItemAction: __WEBPACK_IMPORTED_MODULE_0__menu_menu_events__["b" /* NodeMenuItemAction */].Remove });
    };
    TreeController.prototype.addChild = function (newNode) {
        if (this.tree.hasDeferredChildren() && !this.tree.childrenWereLoaded()) {
            return;
        }
        var newTree = this.tree.createNode(Array.isArray(newNode.children), newNode);
        this.treeService.fireNodeCreated(newTree);
    };
    TreeController.prototype.addChildAsync = function (newNode) {
        if (this.tree.hasDeferredChildren() && !this.tree.childrenWereLoaded()) {
            return Promise.reject(new Error('This node loads its children asynchronously, hence child cannot be added this way'));
        }
        var newTree = this.tree.createNode(Array.isArray(newNode.children), newNode);
        this.treeService.fireNodeCreated(newTree);
        // This will give TreeInternalComponent to set up a controller for the node
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(newTree);
            });
        });
    };
    TreeController.prototype.changeNodeId = function (id) {
        if (!id) {
            throw Error('You should supply an id!');
        }
        if (this.treeService.hasController(id)) {
            throw Error("Controller already exists for the given id: " + id);
        }
        this.treeService.deleteController(this.tree.id);
        this.tree.id = id;
        this.treeService.setController(this.tree.id, this);
    };
    TreeController.prototype.reloadChildren = function () {
        this.tree.reloadChildren();
    };
    TreeController.prototype.setChildren = function (children) {
        if (!this.tree.isLeaf()) {
            this.tree.setChildren(children);
        }
    };
    TreeController.prototype.startRenaming = function () {
        this.tree.markAsBeingRenamed();
    };
    TreeController.prototype.check = function () {
        this.component.onNodeChecked();
    };
    TreeController.prototype.uncheck = function () {
        this.component.onNodeUnchecked();
    };
    TreeController.prototype.isChecked = function () {
        return this.tree.checked;
    };
    TreeController.prototype.isIndetermined = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_2__utils_fn_utils__["b" /* get */])(this.component, 'checkboxElementRef.nativeElement.indeterminate');
    };
    TreeController.prototype.allowSelection = function () {
        this.tree.selectionAllowed = true;
    };
    TreeController.prototype.forbidSelection = function () {
        this.tree.selectionAllowed = false;
    };
    TreeController.prototype.isSelectionAllowed = function () {
        return this.tree.selectionAllowed;
    };
    return TreeController;
}());



/***/ }),

/***/ "../../../../../src/tree-internal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeInternalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tree_types__ = __webpack_require__("../../../../../src/tree.types.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tree__ = __webpack_require__("../../../../../src/tree.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tree_controller__ = __webpack_require__("../../../../../src/tree-controller.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_node_menu_service__ = __webpack_require__("../../../../../src/menu/node-menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__menu_menu_events__ = __webpack_require__("../../../../../src/menu/menu.events.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__editable_editable_events__ = __webpack_require__("../../../../../src/editable/editable.events.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tree_service__ = __webpack_require__("../../../../../src/tree.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_event_utils__ = __webpack_require__("../../../../../src/utils/event.utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_fn_utils__ = __webpack_require__("../../../../../src/utils/fn.utils.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var TreeInternalComponent = (function () {
    function TreeInternalComponent(nodeMenuService, treeService, nodeElementRef) {
        this.nodeMenuService = nodeMenuService;
        this.treeService = treeService;
        this.nodeElementRef = nodeElementRef;
        this.isSelected = false;
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
        this.isReadOnly = false;
        this.subscriptions = [];
    }
    TreeInternalComponent.prototype.ngAfterViewInit = function () {
        if (this.tree.checked && !this.tree.firstCheckedFired) {
            this.tree.firstCheckedFired = true;
            this.treeService.fireNodeChecked(this.tree);
        }
    };
    TreeInternalComponent.prototype.ngOnInit = function () {
        var _this = this;
        var nodeId = Object(__WEBPACK_IMPORTED_MODULE_9__utils_fn_utils__["b" /* get */])(this.tree, 'node.id', '');
        if (nodeId) {
            this.controller = new __WEBPACK_IMPORTED_MODULE_3__tree_controller__["a" /* TreeController */](this);
            this.treeService.setController(nodeId, this.controller);
        }
        this.settings = this.settings || new __WEBPACK_IMPORTED_MODULE_1__tree_types__["b" /* Ng2TreeSettings */]();
        this.isReadOnly = !Object(__WEBPACK_IMPORTED_MODULE_9__utils_fn_utils__["b" /* get */])(this.settings, 'enableCheckboxes', true);
        if (this.tree.isRoot() && this.settings.rootIsVisible === false) {
            this.tree.disableCollapseOnInit();
        }
        this.subscriptions.push(this.nodeMenuService.hideMenuStream(this.nodeElementRef).subscribe(function () {
            _this.isRightMenuVisible = false;
            _this.isLeftMenuVisible = false;
        }));
        this.subscriptions.push(this.treeService.unselectStream(this.tree).subscribe(function () { return (_this.isSelected = false); }));
        this.subscriptions.push(this.treeService.draggedStream(this.tree, this.nodeElementRef).subscribe(function (e) {
            if (_this.tree.hasSibling(e.captured.tree)) {
                _this.swapWithSibling(e.captured.tree, _this.tree);
            }
            else if (_this.tree.isBranch()) {
                _this.moveNodeToThisTreeAndRemoveFromPreviousOne(e, _this.tree);
            }
            else {
                _this.moveNodeToParentTreeAndRemoveFromPreviousOne(e, _this.tree);
            }
        }));
        this.subscriptions.push(this.treeService.nodeChecked$
            .merge(this.treeService.nodeUnchecked$)
            .filter(function (e) { return _this.eventContainsId(e) && _this.tree.hasChild(e.node); })
            .subscribe(function (e) { return _this.updateCheckboxState(); }));
    };
    TreeInternalComponent.prototype.ngOnChanges = function (changes) {
        this.controller = new __WEBPACK_IMPORTED_MODULE_3__tree_controller__["a" /* TreeController */](this);
    };
    TreeInternalComponent.prototype.ngOnDestroy = function () {
        if (Object(__WEBPACK_IMPORTED_MODULE_9__utils_fn_utils__["b" /* get */])(this.tree, 'node.id', '')) {
            this.treeService.deleteController(this.tree.node.id);
        }
        this.subscriptions.forEach(function (sub) { return sub && sub.unsubscribe(); });
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
        if (!this.tree.selectionAllowed) {
            return;
        }
        if (__WEBPACK_IMPORTED_MODULE_8__utils_event_utils__["c" /* isLeftButtonClicked */](e)) {
            this.isSelected = true;
            this.treeService.fireNodeSelected(this.tree);
        }
    };
    TreeInternalComponent.prototype.onNodeUnselected = function (e) {
        if (!this.tree.selectionAllowed) {
            return;
        }
        if (__WEBPACK_IMPORTED_MODULE_8__utils_event_utils__["c" /* isLeftButtonClicked */](e)) {
            this.isSelected = false;
            this.treeService.fireNodeUnselected(this.tree);
        }
    };
    TreeInternalComponent.prototype.showRightMenu = function (e) {
        if (!this.tree.hasRightMenu()) {
            return;
        }
        if (__WEBPACK_IMPORTED_MODULE_8__utils_event_utils__["d" /* isRightButtonClicked */](e)) {
            this.isRightMenuVisible = !this.isRightMenuVisible;
            this.nodeMenuService.hideMenuForAllNodesExcept(this.nodeElementRef);
        }
        e.preventDefault();
    };
    TreeInternalComponent.prototype.showLeftMenu = function (e) {
        if (!this.tree.hasLeftMenu()) {
            return;
        }
        if (__WEBPACK_IMPORTED_MODULE_8__utils_event_utils__["c" /* isLeftButtonClicked */](e)) {
            this.isLeftMenuVisible = !this.isLeftMenuVisible;
            this.nodeMenuService.hideMenuForAllNodesExcept(this.nodeElementRef);
            if (this.isLeftMenuVisible) {
                e.preventDefault();
            }
        }
    };
    TreeInternalComponent.prototype.onMenuItemSelected = function (e) {
        switch (e.nodeMenuItemAction) {
            case __WEBPACK_IMPORTED_MODULE_5__menu_menu_events__["b" /* NodeMenuItemAction */].NewTag:
                this.onNewSelected(e);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__menu_menu_events__["b" /* NodeMenuItemAction */].NewFolder:
                this.onNewSelected(e);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__menu_menu_events__["b" /* NodeMenuItemAction */].Rename:
                this.onRenameSelected();
                break;
            case __WEBPACK_IMPORTED_MODULE_5__menu_menu_events__["b" /* NodeMenuItemAction */].Remove:
                this.onRemoveSelected();
                break;
            case __WEBPACK_IMPORTED_MODULE_5__menu_menu_events__["b" /* NodeMenuItemAction */].Custom:
                this.onCustomSelected();
                this.treeService.fireMenuItemSelected(this.tree, e.nodeMenuItemSelected);
                break;
            default:
                throw new Error("Chosen menu item doesn't exist");
        }
    };
    TreeInternalComponent.prototype.onNewSelected = function (e) {
        this.tree.createNode(e.nodeMenuItemAction === __WEBPACK_IMPORTED_MODULE_5__menu_menu_events__["b" /* NodeMenuItemAction */].NewFolder);
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    };
    TreeInternalComponent.prototype.onRenameSelected = function () {
        this.tree.markAsBeingRenamed();
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    };
    TreeInternalComponent.prototype.onRemoveSelected = function () {
        this.treeService.deleteController(Object(__WEBPACK_IMPORTED_MODULE_9__utils_fn_utils__["b" /* get */])(this.tree, 'node.id', ''));
        this.treeService.fireNodeRemoved(this.tree);
    };
    TreeInternalComponent.prototype.onCustomSelected = function () {
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    };
    TreeInternalComponent.prototype.onSwitchFoldingType = function () {
        this.tree.switchFoldingType();
        this.treeService.fireNodeSwitchFoldingType(this.tree);
    };
    TreeInternalComponent.prototype.applyNewValue = function (e) {
        if ((e.action === __WEBPACK_IMPORTED_MODULE_6__editable_editable_events__["a" /* NodeEditableEventAction */].Cancel || this.tree.isNew()) && __WEBPACK_IMPORTED_MODULE_2__tree__["a" /* Tree */].isValueEmpty(e.value)) {
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
    TreeInternalComponent.prototype.hasCustomMenu = function () {
        return this.tree.hasCustomMenu();
    };
    TreeInternalComponent.prototype.switchNodeCheckStatus = function () {
        if (!this.tree.checked) {
            this.onNodeChecked();
        }
        else {
            this.onNodeUnchecked();
        }
    };
    TreeInternalComponent.prototype.onNodeChecked = function () {
        if (!this.checkboxElementRef) {
            return;
        }
        this.checkboxElementRef.nativeElement.indeterminate = false;
        this.treeService.fireNodeChecked(this.tree);
        this.executeOnChildController(function (controller) { return controller.check(); });
        this.tree.checked = true;
    };
    TreeInternalComponent.prototype.onNodeUnchecked = function () {
        if (!this.checkboxElementRef) {
            return;
        }
        this.checkboxElementRef.nativeElement.indeterminate = false;
        this.treeService.fireNodeUnchecked(this.tree);
        this.executeOnChildController(function (controller) { return controller.uncheck(); });
        this.tree.checked = false;
    };
    TreeInternalComponent.prototype.executeOnChildController = function (executor) {
        var _this = this;
        if (this.tree.hasLoadedChildern()) {
            this.tree.children.forEach(function (child) {
                var controller = _this.treeService.getController(child.id);
                if (!Object(__WEBPACK_IMPORTED_MODULE_9__utils_fn_utils__["g" /* isNil */])(controller)) {
                    executor(controller);
                }
            });
        }
    };
    TreeInternalComponent.prototype.updateCheckboxState = function () {
        var _this = this;
        // Calling setTimeout so the value of isChecked will be updated and after that I'll check the children status.
        setTimeout(function () {
            var checkedChildrenAmount = _this.tree.checkedChildrenAmount();
            if (checkedChildrenAmount === 0) {
                _this.checkboxElementRef.nativeElement.indeterminate = false;
                _this.tree.checked = false;
                _this.treeService.fireNodeUnchecked(_this.tree);
            }
            else if (checkedChildrenAmount === _this.tree.loadedChildrenAmount()) {
                _this.checkboxElementRef.nativeElement.indeterminate = false;
                _this.tree.checked = true;
                _this.treeService.fireNodeChecked(_this.tree);
            }
            else {
                _this.tree.checked = false;
                _this.checkboxElementRef.nativeElement.indeterminate = true;
                _this.treeService.fireNodeIndetermined(_this.tree);
            }
        });
    };
    TreeInternalComponent.prototype.eventContainsId = function (event) {
        if (!event.node.id) {
            console.warn('"Node with checkbox" feature requires a unique id assigned to every node, please consider to add it.');
            return false;
        }
        return true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__tree__["a" /* Tree */])
    ], TreeInternalComponent.prototype, "tree", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__tree_types__["b" /* Ng2TreeSettings */])
    ], TreeInternalComponent.prototype, "settings", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* TemplateRef */])
    ], TreeInternalComponent.prototype, "template", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* ViewChild */])('checkbox'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* ElementRef */])
    ], TreeInternalComponent.prototype, "checkboxElementRef", void 0);
    TreeInternalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'tree-internal',
            template: "\n  <ul class=\"tree\" *ngIf=\"tree\" [ngClass]=\"{rootless: isRootHidden()}\">\n    <li>\n      <div class=\"value-container\"\n        [ngClass]=\"{rootless: isRootHidden()}\"\n        [class.selected]=\"isSelected\"\n        (contextmenu)=\"showRightMenu($event)\"\n        [nodeDraggable]=\"nodeElementRef\"\n        [tree]=\"tree\">\n\n        <div class=\"folding\" (click)=\"onSwitchFoldingType()\" [ngClass]=\"tree.foldingCssClass\"></div>\n\n        <div class=\"node-checkbox\" *ngIf=\"settings.showCheckboxes\">\n        <input checkbox  type=\"checkbox\" [disabled]=\"isReadOnly\" [checked]=\"this.tree.checked\" (change)=\"switchNodeCheckStatus()\" #checkbox />\n         </div>\n\n        <div class=\"node-value\"\n          *ngIf=\"!shouldShowInputForTreeValue()\"\n          [class.node-selected]=\"isSelected\"\n          (click)=\"onNodeSelected($event)\">\n            <div *ngIf=\"tree.nodeTemplate\" class=\"node-template\" [innerHTML]=\"tree.nodeTemplate | safeHtml\"></div>\n            <span *ngIf=\"!template\" class=\"node-name\" [innerHTML]=\"tree.value | safeHtml\"></span>\n            <span class=\"loading-children\" *ngIf=\"tree.childrenAreBeingLoaded()\"></span>\n            <ng-template [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{ $implicit: tree.node }\"></ng-template>\n        </div>\n\n        <input type=\"text\" class=\"node-value\"\n           *ngIf=\"shouldShowInputForTreeValue()\"\n           [nodeEditable]=\"tree.value\"\n           (valueChanged)=\"applyNewValue($event)\"/>\n\n        <div class=\"node-left-menu\" *ngIf=\"tree.hasLeftMenu()\" (click)=\"showLeftMenu($event)\" [innerHTML]=\"tree.leftMenuTemplate\">\n        </div>\n        <node-menu *ngIf=\"tree.hasLeftMenu() && isLeftMenuVisible && !hasCustomMenu()\"\n          (menuItemSelected)=\"onMenuItemSelected($event)\">\n        </node-menu>\n      </div>\n\n      <node-menu *ngIf=\"isRightMenuVisible && !hasCustomMenu()\"\n           (menuItemSelected)=\"onMenuItemSelected($event)\">\n      </node-menu>\n\n      <node-menu *ngIf=\"hasCustomMenu() && (isRightMenuVisible || isLeftMenuVisible)\"\n           [menuItems]=\"tree.menuItems\"\n           (menuItemSelected)=\"onMenuItemSelected($event)\">\n      </node-menu>\n\n      <div *ngIf=\"tree.keepNodesInDOM()\" [ngStyle]=\"{'display': tree.isNodeExpanded() ? 'block' : 'none'}\">\n        <tree-internal *ngFor=\"let child of tree.childrenAsync | async\" [tree]=\"child\" [template]=\"template\" [settings]=\"settings\"></tree-internal>\n      </div>\n      <ng-template [ngIf]=\"tree.isNodeExpanded() && !tree.keepNodesInDOM()\">\n        <tree-internal *ngFor=\"let child of tree.childrenAsync | async\" [tree]=\"child\" [template]=\"template\" [settings]=\"settings\"></tree-internal>\n      </ng-template>\n    </li>\n  </ul>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__menu_node_menu_service__["a" /* NodeMenuService */],
            __WEBPACK_IMPORTED_MODULE_7__tree_service__["a" /* TreeService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* ElementRef */]])
    ], TreeInternalComponent);
    return TreeInternalComponent;
}());



/***/ }),

/***/ "../../../../../src/tree.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tree_service__ = __webpack_require__("../../../../../src/tree.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tree_types__ = __webpack_require__("../../../../../src/tree.types.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tree__ = __webpack_require__("../../../../../src/tree.ts");
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




var TreeComponent = (function () {
    function TreeComponent(treeService) {
        this.treeService = treeService;
        this.nodeCreated = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.nodeRemoved = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.nodeRenamed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.nodeSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.nodeUnselected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.nodeMoved = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.nodeExpanded = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.nodeCollapsed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.loadNextLevel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.nodeChecked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.nodeUnchecked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.menuItemSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.subscriptions = [];
    }
    TreeComponent_1 = TreeComponent;
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
        this.subscriptions.push(this.treeService.nodeRemoved$.subscribe(function (e) {
            _this.nodeRemoved.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeRenamed$.subscribe(function (e) {
            _this.nodeRenamed.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeCreated$.subscribe(function (e) {
            _this.nodeCreated.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeSelected$.subscribe(function (e) {
            _this.nodeSelected.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeUnselected$.subscribe(function (e) {
            _this.nodeUnselected.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeMoved$.subscribe(function (e) {
            _this.nodeMoved.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeExpanded$.subscribe(function (e) {
            _this.nodeExpanded.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeCollapsed$.subscribe(function (e) {
            _this.nodeCollapsed.emit(e);
        }));
        this.subscriptions.push(this.treeService.menuItemSelected$.subscribe(function (e) {
            _this.menuItemSelected.emit(e);
        }));
        this.subscriptions.push(this.treeService.loadNextLevel$.subscribe(function (e) {
            _this.loadNextLevel.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeChecked$.subscribe(function (e) {
            _this.nodeChecked.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeUnchecked$.subscribe(function (e) {
            _this.nodeUnchecked.emit(e);
        }));
    };
    TreeComponent.prototype.getController = function () {
        return this.rootComponent.controller;
    };
    TreeComponent.prototype.getControllerByNodeId = function (id) {
        return this.treeService.getController(id);
    };
    TreeComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub && sub.unsubscribe(); });
    };
    TreeComponent.EMPTY_TREE = new __WEBPACK_IMPORTED_MODULE_3__tree__["a" /* Tree */]({ value: '' });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('tree'),
        __metadata("design:type", Object)
    ], TreeComponent.prototype, "treeModel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__tree_types__["b" /* Ng2TreeSettings */])
    ], TreeComponent.prototype, "settings", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
    ], TreeComponent.prototype, "nodeCreated", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
    ], TreeComponent.prototype, "nodeRemoved", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
    ], TreeComponent.prototype, "nodeRenamed", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
    ], TreeComponent.prototype, "nodeSelected", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
    ], TreeComponent.prototype, "nodeUnselected", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
    ], TreeComponent.prototype, "nodeMoved", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
    ], TreeComponent.prototype, "nodeExpanded", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
    ], TreeComponent.prototype, "nodeCollapsed", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
    ], TreeComponent.prototype, "loadNextLevel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
    ], TreeComponent.prototype, "nodeChecked", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
    ], TreeComponent.prototype, "nodeUnchecked", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
    ], TreeComponent.prototype, "menuItemSelected", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* ViewChild */])('rootComponent'),
        __metadata("design:type", Object)
    ], TreeComponent.prototype, "rootComponent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ContentChild */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* TemplateRef */]),
        __metadata("design:type", Object)
    ], TreeComponent.prototype, "template", void 0);
    TreeComponent = TreeComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'tree',
            template: "<tree-internal #rootComponent [tree]=\"tree\" [settings]=\"settings\" [template]=\"template\"></tree-internal>",
            providers: [__WEBPACK_IMPORTED_MODULE_1__tree_service__["a" /* TreeService */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__tree_service__["a" /* TreeService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__tree_service__["a" /* TreeService */]])
    ], TreeComponent);
    return TreeComponent;
    var TreeComponent_1;
}());



/***/ }),

/***/ "../../../../../src/tree.events.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NodeEvent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return NodeSelectedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return NodeUnselectedEvent; });
/* unused harmony export NodeDestructiveEvent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return NodeMovedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return NodeRemovedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return NodeCreatedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return NodeRenamedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return NodeExpandedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NodeCollapsedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MenuItemSelectedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadNextLevelEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NodeCheckedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return NodeUncheckedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return NodeIndeterminedEvent; });
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

var NodeUnselectedEvent = (function (_super) {
    __extends(NodeUnselectedEvent, _super);
    function NodeUnselectedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeUnselectedEvent;
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
    function NodeRemovedEvent(node, lastIndex) {
        var _this = _super.call(this, node) || this;
        _this.lastIndex = lastIndex;
        return _this;
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

var MenuItemSelectedEvent = (function (_super) {
    __extends(MenuItemSelectedEvent, _super);
    function MenuItemSelectedEvent(node, selectedItem) {
        var _this = _super.call(this, node) || this;
        _this.selectedItem = selectedItem;
        return _this;
    }
    return MenuItemSelectedEvent;
}(NodeEvent));

var LoadNextLevelEvent = (function (_super) {
    __extends(LoadNextLevelEvent, _super);
    function LoadNextLevelEvent(node) {
        return _super.call(this, node) || this;
    }
    return LoadNextLevelEvent;
}(NodeEvent));

var NodeCheckedEvent = (function (_super) {
    __extends(NodeCheckedEvent, _super);
    function NodeCheckedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeCheckedEvent;
}(NodeEvent));

var NodeUncheckedEvent = (function (_super) {
    __extends(NodeUncheckedEvent, _super);
    function NodeUncheckedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeUncheckedEvent;
}(NodeEvent));

var NodeIndeterminedEvent = (function (_super) {
    __extends(NodeIndeterminedEvent, _super);
    function NodeIndeterminedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeIndeterminedEvent;
}(NodeEvent));



/***/ }),

/***/ "../../../../../src/tree.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rxjs_imports__ = __webpack_require__("../../../../../src/rxjs-imports.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tree_component__ = __webpack_require__("../../../../../src/tree.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tree_internal_component__ = __webpack_require__("../../../../../src/tree-internal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__draggable_node_draggable_directive__ = __webpack_require__("../../../../../src/draggable/node-draggable.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__draggable_node_draggable_service__ = __webpack_require__("../../../../../src/draggable/node-draggable.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__editable_node_editable_directive__ = __webpack_require__("../../../../../src/editable/node-editable.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__menu_node_menu_component__ = __webpack_require__("../../../../../src/menu/node-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__menu_node_menu_service__ = __webpack_require__("../../../../../src/menu/node-menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__tree_service__ = __webpack_require__("../../../../../src/tree.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils_safe_html_pipe__ = __webpack_require__("../../../../../src/utils/safe-html.pipe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var TreeModule = (function () {
    function TreeModule() {
    }
    TreeModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_4__angular_common__["a" /* CommonModule */]],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__draggable_node_draggable_directive__["a" /* NodeDraggableDirective */],
                __WEBPACK_IMPORTED_MODULE_2__tree_component__["a" /* TreeComponent */],
                __WEBPACK_IMPORTED_MODULE_7__editable_node_editable_directive__["a" /* NodeEditableDirective */],
                __WEBPACK_IMPORTED_MODULE_8__menu_node_menu_component__["a" /* NodeMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_3__tree_internal_component__["a" /* TreeInternalComponent */],
                __WEBPACK_IMPORTED_MODULE_11__utils_safe_html_pipe__["a" /* SafeHtmlPipe */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_2__tree_component__["a" /* TreeComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_6__draggable_node_draggable_service__["a" /* NodeDraggableService */], __WEBPACK_IMPORTED_MODULE_9__menu_node_menu_service__["a" /* NodeMenuService */], __WEBPACK_IMPORTED_MODULE_10__tree_service__["a" /* TreeService */]]
        })
    ], TreeModule);
    return TreeModule;
}());



/***/ }),

/***/ "../../../../../src/tree.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tree_events__ = __webpack_require__("../../../../../src/tree.events.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__draggable_node_draggable_service__ = __webpack_require__("../../../../../src/draggable/node-draggable.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_fn_utils__ = __webpack_require__("../../../../../src/utils/fn.utils.ts");
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
        this.nodeMoved$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.nodeRemoved$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.nodeRenamed$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.nodeCreated$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.nodeSelected$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.nodeUnselected$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.nodeExpanded$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.nodeCollapsed$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.menuItemSelected$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.loadNextLevel$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.nodeChecked$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.nodeUnchecked$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.nodeIndetermined$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.controllers = new Map();
        this.nodeRemoved$.subscribe(function (e) { return e.node.removeItselfFromParent(); });
    }
    TreeService.prototype.unselectStream = function (tree) {
        return this.nodeSelected$.filter(function (e) { return tree !== e.node; });
    };
    TreeService.prototype.fireNodeRemoved = function (tree) {
        this.nodeRemoved$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["i" /* NodeRemovedEvent */](tree, tree.positionInParent));
    };
    TreeService.prototype.fireNodeCreated = function (tree) {
        this.nodeCreated$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["e" /* NodeCreatedEvent */](tree));
    };
    TreeService.prototype.fireNodeSelected = function (tree) {
        this.nodeSelected$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["k" /* NodeSelectedEvent */](tree));
    };
    TreeService.prototype.fireNodeUnselected = function (tree) {
        this.nodeUnselected$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["m" /* NodeUnselectedEvent */](tree));
    };
    TreeService.prototype.fireNodeRenamed = function (oldValue, tree) {
        this.nodeRenamed$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["j" /* NodeRenamedEvent */](tree, oldValue, tree.value));
    };
    TreeService.prototype.fireNodeMoved = function (tree, parent) {
        this.nodeMoved$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["h" /* NodeMovedEvent */](tree, parent));
    };
    TreeService.prototype.fireMenuItemSelected = function (tree, selectedItem) {
        this.menuItemSelected$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["b" /* MenuItemSelectedEvent */](tree, selectedItem));
    };
    TreeService.prototype.fireNodeSwitchFoldingType = function (tree) {
        if (tree.isNodeExpanded()) {
            this.fireNodeExpanded(tree);
            if (this.shouldFireLoadNextLevel(tree)) {
                this.fireLoadNextLevel(tree);
            }
        }
        else if (tree.isNodeCollapsed()) {
            this.fireNodeCollapsed(tree);
        }
    };
    TreeService.prototype.fireNodeExpanded = function (tree) {
        this.nodeExpanded$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["f" /* NodeExpandedEvent */](tree));
    };
    TreeService.prototype.fireNodeCollapsed = function (tree) {
        this.nodeCollapsed$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["d" /* NodeCollapsedEvent */](tree));
    };
    TreeService.prototype.fireLoadNextLevel = function (tree) {
        this.loadNextLevel$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["a" /* LoadNextLevelEvent */](tree));
    };
    TreeService.prototype.fireNodeChecked = function (tree) {
        this.nodeChecked$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["c" /* NodeCheckedEvent */](tree));
    };
    TreeService.prototype.fireNodeUnchecked = function (tree) {
        this.nodeUnchecked$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["l" /* NodeUncheckedEvent */](tree));
    };
    TreeService.prototype.draggedStream = function (tree, element) {
        return this.nodeDraggableService.draggableNodeEvents$
            .filter(function (e) { return e.target === element; })
            .filter(function (e) { return !e.captured.tree.hasChild(tree); });
    };
    TreeService.prototype.setController = function (id, controller) {
        this.controllers.set(id, controller);
    };
    TreeService.prototype.deleteController = function (id) {
        if (this.controllers.has(id)) {
            this.controllers.delete(id);
        }
    };
    TreeService.prototype.getController = function (id) {
        if (this.controllers.has(id)) {
            return this.controllers.get(id);
        }
        return null;
    };
    TreeService.prototype.hasController = function (id) {
        return this.controllers.has(id);
    };
    TreeService.prototype.shouldFireLoadNextLevel = function (tree) {
        var shouldLoadNextLevel = tree.node.emitLoadNextLevel &&
            !tree.node.loadChildren &&
            !tree.childrenAreBeingLoaded() &&
            Object(__WEBPACK_IMPORTED_MODULE_4__utils_fn_utils__["e" /* isEmpty */])(tree.children);
        if (shouldLoadNextLevel) {
            tree.loadingChildrenRequested();
        }
        return shouldLoadNextLevel;
    };
    TreeService.prototype.fireNodeIndetermined = function (tree) {
        this.nodeIndetermined$.next(new __WEBPACK_IMPORTED_MODULE_0__tree_events__["g" /* NodeIndeterminedEvent */](tree));
    };
    TreeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["y" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["x" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__draggable_node_draggable_service__["a" /* NodeDraggableService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__draggable_node_draggable_service__["a" /* NodeDraggableService */]])
    ], TreeService);
    return TreeService;
}());



/***/ }),

/***/ "../../../../../src/tree.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tree; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__ = __webpack_require__("../../../../../src/utils/fn.utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tree_types__ = __webpack_require__("../../../../../src/tree.types.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_uuid_v4__ = __webpack_require__("../../../../uuid/v4.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_uuid_v4___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_uuid_v4__);




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
        this._childrenAsyncOnce = Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["i" /* once */])(function () {
            return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (observer) {
                setTimeout(function () {
                    _this._childrenLoadingState = ChildrenLoadingState.Loading;
                    _this._loadChildren(function (children) {
                        _this._children = (children || []).map(function (child) { return new Tree(child, _this); });
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
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["e" /* isEmpty */])(Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["k" /* trim */])(value));
    };
    /**
     * Check whether a given value can be considered RenamableNode.
     * @param {any} value - A value to check.
     * @returns {boolean} - A flag indicating whether given value is Renamable node or not.
     * @static
     */
    Tree.isRenamable = function (value) {
        return (Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["c" /* has */])(value, 'setName') &&
            Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["f" /* isFunction */])(value.setName) &&
            (Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["c" /* has */])(value, 'toString') && Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["f" /* isFunction */])(value.toString) && value.toString !== Object.toString));
    };
    Tree.cloneTreeShallow = function (origin) {
        var tree = new Tree(Object.assign({}, origin.node));
        tree._children = origin._children;
        return tree;
    };
    Tree.applyNewValueToRenamable = function (value, newValue) {
        var renamableValue = Object.assign({}, value);
        renamableValue.setName(newValue);
        return renamableValue;
    };
    Tree.prototype.buildTreeFromModel = function (model, parent, isBranch) {
        var _this = this;
        this.parent = parent;
        this.node = Object.assign(Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["h" /* omit */])(model, 'children'), { settings: __WEBPACK_IMPORTED_MODULE_2__tree_types__["c" /* TreeModelSettings */].merge(model, Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(parent, 'node')) }, { emitLoadNextLevel: model.emitLoadNextLevel === true });
        if (Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["f" /* isFunction */])(this.node.loadChildren)) {
            this._loadChildren = this.node.loadChildren;
        }
        else {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(model, 'children', []).forEach(function (child, index) {
                _this._addChild(new Tree(child, _this), index);
            });
        }
        if (!Array.isArray(this._children)) {
            this._children = this.node.loadChildren || isBranch ? [] : null;
        }
    };
    Tree.prototype.hasDeferredChildren = function () {
        return typeof this._loadChildren === 'function';
    };
    /* Setting the children loading state to Loading since a request was dispatched to the client */
    Tree.prototype.loadingChildrenRequested = function () {
        this._childrenLoadingState = ChildrenLoadingState.Loading;
    };
    /**
     * Check whether children of the node are being loaded.
     * Makes sense only for nodes that define `loadChildren` function.
     * @returns {boolean} A flag indicating that children are being loaded.
     */
    Tree.prototype.childrenAreBeingLoaded = function () {
        return this._childrenLoadingState === ChildrenLoadingState.Loading;
    };
    /**
     * Check whether children of the node were loaded.
     * Makes sense only for nodes that define `loadChildren` function.
     * @returns {boolean} A flag indicating that children were loaded.
     */
    Tree.prototype.childrenWereLoaded = function () {
        return this._childrenLoadingState === ChildrenLoadingState.Completed;
    };
    Tree.prototype.canLoadChildren = function () {
        return (this._childrenLoadingState === ChildrenLoadingState.NotStarted &&
            this.foldingType === __WEBPACK_IMPORTED_MODULE_2__tree_types__["a" /* FoldingType */].Expanded &&
            !!this._loadChildren);
    };
    /**
     * Check whether children of the node should be loaded and not loaded yet.
     * Makes sense only for nodes that define `loadChildren` function.
     * @returns {boolean} A flag indicating that children should be loaded for the current node.
     */
    Tree.prototype.childrenShouldBeLoaded = function () {
        return !this.childrenWereLoaded() && (!!this._loadChildren || this.node.emitLoadNextLevel === true);
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
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].of(this.children);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * By calling this method you start process of loading node's children using `loadChildren` function.
     */
    Tree.prototype.reloadChildren = function () {
        var _this = this;
        if (this.childrenShouldBeLoaded()) {
            this._childrenLoadingState = ChildrenLoadingState.Loading;
            this._loadChildren(function (children) {
                _this._children = children && children.map(function (child) { return new Tree(child, _this); });
                _this._childrenLoadingState = ChildrenLoadingState.Completed;
            });
        }
    };
    /**
     * By calling this method you will remove all current children of a treee and create new.
     */
    Tree.prototype.setChildren = function (children) {
        var _this = this;
        this._children = children && children.map(function (child) { return new Tree(child, _this); });
        if (this.childrenShouldBeLoaded()) {
            this._childrenLoadingState = ChildrenLoadingState.Completed;
        }
    };
    /**
     * Create a new node in the current tree.
     * @param {boolean} isBranch - A flag that indicates whether a new node should be a "Branch". "Leaf" node will be created by default
     * @param {TreeModel} model - Tree model of the new node which will be inserted. Empty node will be created by default and it will fire edit mode of this node
     * @returns {Tree} A newly created child node.
     */
    Tree.prototype.createNode = function (isBranch, model) {
        if (model === void 0) { model = { value: '' }; }
        var tree = new Tree(model, this, isBranch);
        if (!model.id) {
            tree.markAsNew();
        }
        tree.id = tree.id || __WEBPACK_IMPORTED_MODULE_3_uuid_v4__();
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
            var stringifiedValue = '' + value;
            if (Tree.isRenamable(this.value)) {
                this.node.value = Tree.applyNewValueToRenamable(this.value, stringifiedValue);
            }
            else {
                this.node.value = Tree.isValueEmpty(stringifiedValue) ? this.node.value : stringifiedValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "checked", {
        get: function () {
            return !!Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'checked');
        },
        set: function (checked) {
            this.node.settings = Object.assign({}, this.node.settings, { checked: checked });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "checkedChildren", {
        get: function () {
            return this.hasLoadedChildern() ? this.children.filter(function (child) { return child.checked; }) : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "selectionAllowed", {
        get: function () {
            var value = Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'selectionAllowed');
            return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["g" /* isNil */])(value) ? true : !!value;
        },
        set: function (selectionAllowed) {
            this.node.settings = Object.assign({}, this.node.settings, { selectionAllowed: selectionAllowed });
        },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.hasLoadedChildern = function () {
        return !Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["e" /* isEmpty */])(this.children);
    };
    Tree.prototype.loadedChildrenAmount = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["j" /* size */])(this.children);
    };
    Tree.prototype.checkedChildrenAmount = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["j" /* size */])(this.checkedChildren);
    };
    /**
     * Add a sibling node for the current node. This won't work if the current node is a root.
     * @param {Tree} sibling - A node that should become a sibling.
     * @param [number] position - Position in which sibling will be inserted. By default it will be inserted at the last position in a parent.
     * @returns {Tree} A newly inserted sibling, or null if you are trying to make a sibling for the root.
     */
    Tree.prototype.addSibling = function (sibling, position) {
        if (Array.isArray(Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.parent, 'children'))) {
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
        var newborn = this._addChild(Tree.cloneTreeShallow(child), position);
        this._setFoldingType();
        if (this.isNodeCollapsed()) {
            this.switchFoldingType();
        }
        return newborn;
    };
    Tree.prototype._addChild = function (child, position) {
        if (position === void 0) { position = Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["j" /* size */])(this._children) || 0; }
        child.parent = this;
        if (Array.isArray(this._children)) {
            this._children.splice(position, 0, child);
        }
        else {
            this._children = [child];
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
            if (this.isRoot()) {
                return -1;
            }
            return this.parent.children ? this.parent.children.indexOf(this) : -1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check whether or not this tree is static.
     * @returns {boolean} A flag indicating whether or not this tree is static.
     */
    Tree.prototype.isStatic = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'static', false);
    };
    /**
     * Check whether or not this tree has a left menu.
     * @returns {boolean} A flag indicating whether or not this tree has a left menu.
     */
    Tree.prototype.hasLeftMenu = function () {
        return !Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'static', false) && Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'leftMenu', false);
    };
    /**
     * Check whether or not this tree has a right menu.
     * @returns {boolean} A flag indicating whether or not this tree has a right menu.
     */
    Tree.prototype.hasRightMenu = function () {
        return !Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'static', false) && Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'rightMenu', false);
    };
    /**
     * Check whether this tree is "Leaf" or not.
     * @returns {boolean} A flag indicating whether or not this tree is a "Leaf".
     */
    Tree.prototype.isLeaf = function () {
        return !this.isBranch();
    };
    Object.defineProperty(Tree.prototype, "menuItems", {
        /**
         * Get menu items of the current tree.
         * @returns {NodeMenuItem[]} The menu items of the current tree.
         */
        get: function () {
            return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'menuItems');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check whether or not this tree has a custom menu.
     * @returns {boolean} A flag indicating whether or not this tree has a custom menu.
     */
    Tree.prototype.hasCustomMenu = function () {
        return !this.isStatic() && !!Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'menuItems', false);
    };
    /**
     * Check whether this tree is "Branch" or not. "Branch" is a node that has children.
     * @returns {boolean} A flag indicating whether or not this tree is a "Branch".
     */
    Tree.prototype.isBranch = function () {
        return this.node.emitLoadNextLevel === true || Array.isArray(this._children);
    };
    /**
     * Check whether this tree has children.
     * @returns {boolean} A flag indicating whether or not this tree has children.
     */
    Tree.prototype.hasChildren = function () {
        return !Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["e" /* isEmpty */])(this._children) || this.childrenShouldBeLoaded();
    };
    /**
     * Check whether this tree is a root or not. The root is the tree (node) that doesn't have parent (or technically its parent is null).
     * @returns {boolean} A flag indicating whether or not this tree is the root.
     */
    Tree.prototype.isRoot = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["g" /* isNil */])(this.parent);
    };
    /**
     * Check whether provided tree is a sibling of the current tree. Sibling trees (nodes) are the trees that have the same parent.
     * @param {Tree} tree - A tree that should be tested on a siblingness.
     * @returns {boolean} A flag indicating whether or not provided tree is the sibling of the current one.
     */
    Tree.prototype.hasSibling = function (tree) {
        return !this.isRoot() && Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["d" /* includes */])(this.parent.children, tree);
    };
    /**
     * Check whether provided tree is a child of the current tree.
     * This method tests that provided tree is a <strong>direct</strong> child of the current tree.
     * @param {Tree} tree - A tree that should be tested (child candidate).
     * @returns {boolean} A flag indicating whether provided tree is a child or not.
     */
    Tree.prototype.hasChild = function (tree) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["d" /* includes */])(this._children, tree);
    };
    /**
     * Remove given tree from the current tree.
     * The given tree will be removed only in case it is a direct child of the current tree (@see {@link hasChild}).
     * @param {Tree} tree - A tree that should be removed.
     */
    Tree.prototype.removeChild = function (tree) {
        if (!this.hasChildren()) {
            return;
        }
        var childIndex = this._children.findIndex(function (child) { return child === tree; });
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
        this.disableCollapseOnInit();
        this.node._foldingType = this.isNodeExpanded() ? __WEBPACK_IMPORTED_MODULE_2__tree_types__["a" /* FoldingType */].Collapsed : __WEBPACK_IMPORTED_MODULE_2__tree_types__["a" /* FoldingType */].Expanded;
    };
    /**
     * Check that tree is expanded.
     * @returns {boolean} A flag indicating whether current tree is expanded. Always returns false for the "Leaf" tree and for an empty tree.
     */
    Tree.prototype.isNodeExpanded = function () {
        return this.foldingType === __WEBPACK_IMPORTED_MODULE_2__tree_types__["a" /* FoldingType */].Expanded;
    };
    /**
     * Check that tree is collapsed.
     * @returns {boolean} A flag indicating whether current tree is collapsed. Always returns false for the "Leaf" tree and for an empty tree.
     */
    Tree.prototype.isNodeCollapsed = function () {
        return this.foldingType === __WEBPACK_IMPORTED_MODULE_2__tree_types__["a" /* FoldingType */].Collapsed;
    };
    /**
     * Set a current folding type: expanded, collapsed or leaf.
     */
    Tree.prototype._setFoldingType = function () {
        if (this.childrenShouldBeLoaded()) {
            this.node._foldingType = __WEBPACK_IMPORTED_MODULE_2__tree_types__["a" /* FoldingType */].Collapsed;
        }
        else if (this._children && !Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["e" /* isEmpty */])(this._children)) {
            this.node._foldingType = this.isCollapsedOnInit() ? __WEBPACK_IMPORTED_MODULE_2__tree_types__["a" /* FoldingType */].Collapsed : __WEBPACK_IMPORTED_MODULE_2__tree_types__["a" /* FoldingType */].Expanded;
        }
        else if (Array.isArray(this._children)) {
            this.node._foldingType = __WEBPACK_IMPORTED_MODULE_2__tree_types__["a" /* FoldingType */].Empty;
        }
        else {
            this.node._foldingType = __WEBPACK_IMPORTED_MODULE_2__tree_types__["a" /* FoldingType */].Leaf;
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
        if (this.node._foldingType === __WEBPACK_IMPORTED_MODULE_2__tree_types__["a" /* FoldingType */].Collapsed) {
            return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'cssClasses.collapsed', null);
        }
        else if (this.node._foldingType === __WEBPACK_IMPORTED_MODULE_2__tree_types__["a" /* FoldingType */].Expanded) {
            return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'cssClasses.expanded', null);
        }
        else if (this.node._foldingType === __WEBPACK_IMPORTED_MODULE_2__tree_types__["a" /* FoldingType */].Empty) {
            return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'cssClasses.empty', null);
        }
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'cssClasses.leaf', null);
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
            return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'templates.leaf', '');
        }
        else {
            return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'templates.node', '');
        }
    };
    Object.defineProperty(Tree.prototype, "leftMenuTemplate", {
        /**
         * Get a html template to render for an element activatin left menu of a node.
         * @returns {string} A string representing a html template.
         */
        get: function () {
            if (this.hasLeftMenu()) {
                return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'templates.leftMenu', '<span></span>');
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.disableCollapseOnInit = function () {
        if (this.node.settings) {
            this.node.settings.isCollapsedOnInit = false;
        }
    };
    Tree.prototype.isCollapsedOnInit = function () {
        return !!Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'isCollapsedOnInit');
    };
    Tree.prototype.keepNodesInDOM = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node.settings, 'keepNodesInDOM');
    };
    /**
     * Check that current tree is newly created (added by user via menu for example). Tree that was built from the TreeModel is not marked as new.
     * @returns {boolean} A flag whether the tree is new.
     */
    Tree.prototype.isNew = function () {
        return this.node._status === __WEBPACK_IMPORTED_MODULE_2__tree_types__["d" /* TreeStatus */].New;
    };
    Object.defineProperty(Tree.prototype, "id", {
        get: function () {
            return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(this.node, 'id');
        },
        set: function (id) {
            this.node.id = id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Mark current tree as new (@see {@link isNew}).
     */
    Tree.prototype.markAsNew = function () {
        this.node._status = __WEBPACK_IMPORTED_MODULE_2__tree_types__["d" /* TreeStatus */].New;
    };
    /**
     * Check that current tree is being renamed (it is in the process of its value renaming initiated by a user).
     * @returns {boolean} A flag whether the tree is being renamed.
     */
    Tree.prototype.isBeingRenamed = function () {
        return this.node._status === __WEBPACK_IMPORTED_MODULE_2__tree_types__["d" /* TreeStatus */].IsBeingRenamed;
    };
    /**
     * Mark current tree as being renamed (@see {@link isBeingRenamed}).
     */
    Tree.prototype.markAsBeingRenamed = function () {
        this.node._status = __WEBPACK_IMPORTED_MODULE_2__tree_types__["d" /* TreeStatus */].IsBeingRenamed;
    };
    /**
     * Check that current tree is modified (for example it was renamed).
     * @returns {boolean} A flag whether the tree is modified.
     */
    Tree.prototype.isModified = function () {
        return this.node._status === __WEBPACK_IMPORTED_MODULE_2__tree_types__["d" /* TreeStatus */].Modified;
    };
    /**
     * Mark current tree as modified (@see {@link isModified}).
     */
    Tree.prototype.markAsModified = function () {
        this.node._status = __WEBPACK_IMPORTED_MODULE_2__tree_types__["d" /* TreeStatus */].Modified;
    };
    /**
     * Makes a clone of an underlying TreeModel instance
     * @returns {TreeModel} a clone of an underlying TreeModel instance
     */
    Tree.prototype.toTreeModel = function () {
        var model = Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["a" /* defaultsDeep */])(this.isLeaf() ? {} : { children: [] }, this.node);
        if (this.children) {
            this.children.forEach(function (child) {
                model.children.push(child.toTreeModel());
            });
        }
        return model;
    };
    return Tree;
}());



/***/ }),

/***/ "../../../../../src/tree.types.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FoldingType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TreeModelSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Ng2TreeSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return TreeStatus; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__ = __webpack_require__("../../../../../src/utils/fn.utils.ts");

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
    FoldingType.Expanded = new FoldingType('node-expanded');
    FoldingType.Collapsed = new FoldingType('node-collapsed');
    FoldingType.Empty = new FoldingType('node-empty');
    FoldingType.Leaf = new FoldingType('node-leaf');
    return FoldingType;
}());

var TreeModelSettings = (function () {
    function TreeModelSettings() {
    }
    TreeModelSettings.merge = function (child, parent) {
        var parentCascadingSettings = Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["h" /* omit */])(Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(parent, 'settings'), TreeModelSettings.NOT_CASCADING_SETTINGS);
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["a" /* defaultsDeep */])({}, Object(__WEBPACK_IMPORTED_MODULE_0__utils_fn_utils__["b" /* get */])(child, 'settings'), parentCascadingSettings, {
            static: false,
            leftMenu: false,
            rightMenu: true,
            isCollapsedOnInit: false,
            checked: false,
            keepNodesInDOM: false,
            selectionAllowed: true
        });
    };
    TreeModelSettings.NOT_CASCADING_SETTINGS = ['selectionAllowed'];
    return TreeModelSettings;
}());

var Ng2TreeSettings = (function () {
    function Ng2TreeSettings() {
        /**
         * Indicates root visibility in the tree. When true - root is invisible.
         * @name Ng2TreeSettings#rootIsVisible
         * @type boolean
         */
        this.rootIsVisible = true;
        this.showCheckboxes = false;
        this.enableCheckboxes = true;
    }
    return Ng2TreeSettings;
}());

var TreeStatus;
(function (TreeStatus) {
    TreeStatus[TreeStatus["New"] = 0] = "New";
    TreeStatus[TreeStatus["Modified"] = 1] = "Modified";
    TreeStatus[TreeStatus["IsBeingRenamed"] = 2] = "IsBeingRenamed";
})(TreeStatus || (TreeStatus = {}));


/***/ }),

/***/ "../../../../../src/utils/event.utils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Keys */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MouseButtons; });
/* harmony export (immutable) */ __webpack_exports__["c"] = isLeftButtonClicked;
/* harmony export (immutable) */ __webpack_exports__["d"] = isRightButtonClicked;
/* harmony export (immutable) */ __webpack_exports__["b"] = isEscapePressed;
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


/***/ }),

/***/ "../../../../../src/utils/fn.utils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = isEmpty;
/* harmony export (immutable) */ __webpack_exports__["k"] = trim;
/* harmony export (immutable) */ __webpack_exports__["c"] = has;
/* harmony export (immutable) */ __webpack_exports__["f"] = isFunction;
/* harmony export (immutable) */ __webpack_exports__["b"] = get;
/* harmony export (immutable) */ __webpack_exports__["h"] = omit;
/* harmony export (immutable) */ __webpack_exports__["j"] = size;
/* harmony export (immutable) */ __webpack_exports__["i"] = once;
/* harmony export (immutable) */ __webpack_exports__["a"] = defaultsDeep;
/* harmony export (immutable) */ __webpack_exports__["d"] = includes;
/* harmony export (immutable) */ __webpack_exports__["g"] = isNil;
function isEmpty(value) {
    if (typeof value === 'string') {
        return !/\S/.test(value);
    }
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    return isNil(value);
}
function trim(value) {
    return isNil(value) ? '' : value.trim();
}
function has(value, prop) {
    return value && typeof value === 'object' && value.hasOwnProperty(prop);
}
function isFunction(value) {
    return typeof value === 'function';
}
function get(value, path, defaultValue) {
    var result = value;
    for (var _i = 0, _a = path.split('.'); _i < _a.length; _i++) {
        var prop = _a[_i];
        if (!result || !Reflect.has(result, prop)) {
            return defaultValue;
        }
        result = result[prop];
    }
    return isNil(result) || result === value ? defaultValue : result;
}
function omit(value, propsToSkip) {
    if (!value) {
        return value;
    }
    var normalizedPropsToSkip = typeof propsToSkip === 'string' ? [propsToSkip] : propsToSkip;
    return Object.keys(value).reduce(function (result, prop) {
        if (includes(normalizedPropsToSkip, prop)) {
            return result;
        }
        return Object.assign(result, (_a = {}, _a[prop] = value[prop], _a));
        var _a;
    }, {});
}
function size(value) {
    return isEmpty(value) ? 0 : value.length;
}
function once(fn) {
    var result;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (fn) {
            result = fn.apply(null, args);
            fn = null;
        }
        return result;
    };
}
function defaultsDeep(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    return [target].concat(sources).reduce(function (result, source) {
        if (!source) {
            return result;
        }
        Object.keys(source).forEach(function (prop) {
            if (isNil(result[prop])) {
                result[prop] = source[prop];
                return;
            }
            if (typeof result[prop] === 'object' && !Array.isArray(result[prop])) {
                result[prop] = defaultsDeep(result[prop], source[prop]);
                return;
            }
        });
        return result;
    }, {});
}
function includes(target, value) {
    if (isNil(target)) {
        return false;
    }
    var index = typeof target === 'string' ? target.indexOf(value) : target.indexOf(value);
    return index > -1;
}
function isNil(value) {
    return value === undefined || value === null;
}


/***/ }),

/***/ "../../../../../src/utils/safe-html.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafeHtmlPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
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
    SafeHtmlPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Pipe */])({ name: 'safeHtml' }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */]])
    ], SafeHtmlPipe);
    return SafeHtmlPipe;
}());



/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/demo/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map