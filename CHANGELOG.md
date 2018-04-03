<a name="2.0.0-rc.11"></a>

# [2.0.0-rc.11](https://github.com/valor-software/ng2-tree/compare/v2.0.0-rc.10...v2.0.0-rc.11) (2018-04-03)

### Bug Fixes

* **tree-controller:** handle change dection in expandToParent properly ([#248](https://github.com/valor-software/ng2-tree/issues/248)) ([d6414d5](https://github.com/valor-software/ng2-tree/commit/d6414d5))

<a name="2.0.0-rc.10"></a>

# [2.0.0-rc.10](https://github.com/valor-software/ng2-tree/compare/v2.0.0-rc.9...v2.0.0-rc.10) (2018-04-02)

### Features

* **tree:** expand node up to parent ([#245](https://github.com/valor-software/ng2-tree/issues/245)) ([3493ff1](https://github.com/valor-software/ng2-tree/commit/3493ff1))

<a name="2.0.0-rc.9"></a>

# [2.0.0-rc.9](https://github.com/valor-software/ng2-tree/compare/v2.0.0-rc.6...v2.0.0-rc.9) (2018-02-22)

### Bug Fixes

* **custom-menu:** close menu when custom menu item gets clicked ([#218](https://github.com/valor-software/ng2-tree/issues/218)) ([ae75381](https://github.com/valor-software/ng2-tree/commit/ae75381))
* **types:** export missed type definitions ([8335cf9](https://github.com/valor-software/ng2-tree/commit/8335cf9))

### Features

* **selection:** add ability to allow and forbid a node selection (closes [#220](https://github.com/valor-software/ng2-tree/issues/220)) ([#221](https://github.com/valor-software/ng2-tree/issues/221)) ([12852c9](https://github.com/valor-software/ng2-tree/commit/12852c9))
* **tree:** unselect tree via controller ([6c43391](https://github.com/valor-software/ng2-tree/commit/6c43391))

<a name="2.0.0-rc.8"></a>

# [2.0.0-rc.8](https://github.com/valor-software/ng2-tree/compare/v2.0.0-rc.7...v2.0.0-rc.8) (2018-02-20)

### Features

* **tree:** unselect tree via controller ([6c43391](https://github.com/valor-software/ng2-tree/commit/6c43391))

<a name="2.0.0-rc.7"></a>

# [2.0.0-rc.7](https://github.com/valor-software/ng2-tree/compare/v2.0.0-rc.5...v2.0.0-rc.7) (2018-02-18)

### Bug Fixes

* **checkboxes:** get rid of performance issue with cyclic event firing; fix indetermined state ([55b975e](https://github.com/valor-software/ng2-tree/commit/55b975e))
* **custom-menu:** close menu when custom menu item gets clicked ([#218](https://github.com/valor-software/ng2-tree/issues/218)) ([ae75381](https://github.com/valor-software/ng2-tree/commit/ae75381))

### Features

* **selection:** add ability to allow and forbid a node selection (closes [#220](https://github.com/valor-software/ng2-tree/issues/220)) ([#221](https://github.com/valor-software/ng2-tree/issues/221)) ([12852c9](https://github.com/valor-software/ng2-tree/commit/12852c9))

<a name="2.0.0-rc.6"></a>

# [2.0.0-rc.6](https://github.com/valor-software/ng2-tree/compare/v2.0.0-rc.5...v2.0.0-rc.6) (2018-02-12)

### Bug Fixes

* **checkboxes:** get rid of performance issue with cyclic event firing; fix indetermined state ([55b975e](https://github.com/valor-software/ng2-tree/commit/55b975e))

<a name="2.0.0-rc.5"></a>

# [2.0.0-rc.5](https://github.com/valor-software/ng2-tree/compare/v2.0.0-rc.4...v2.0.0-rc.5) (2018-02-11)

### Bug Fixes

* **dragndrop:** check whether stopPropagation is available on event (closes [#115](https://github.com/valor-software/ng2-tree/issues/115)) ([93b5f9c](https://github.com/valor-software/ng2-tree/commit/93b5f9c))
* **tree:** add method for creating children asynchronously (closes [#204](https://github.com/valor-software/ng2-tree/issues/204)) ([72cfcb6](https://github.com/valor-software/ng2-tree/commit/72cfcb6))
* **tree:** does not collapse root node when it is hidden (closes [#209](https://github.com/valor-software/ng2-tree/issues/209)) ([9aaa065](https://github.com/valor-software/ng2-tree/commit/9aaa065))

### Features

* **tree:** add checkboxes support (closes [#181](https://github.com/valor-software/ng2-tree/issues/181), closes [#79](https://github.com/valor-software/ng2-tree/issues/79)) ([5069953](https://github.com/valor-software/ng2-tree/commit/5069953))

<a name="2.0.0-rc.4"></a>

# [2.0.0-rc.4](https://github.com/valor-software/ng2-tree/compare/v2.0.0-rc.3...v2.0.0-rc.4) (2017-11-25)

### Bug Fixes

* export noop function from rxjs-imports in order to force ngc to generate a proper metadata.json file. Closes [#175](https://github.com/valor-software/ng2-tree/issues/175) ([#177](https://github.com/valor-software/ng2-tree/issues/177)) ([c0aab34](https://github.com/valor-software/ng2-tree/commit/c0aab34))

<a name="2.0.0-rc.3"></a>

# [2.0.0-rc.3](https://github.com/valor-software/ng2-tree/compare/v2.0.0-rc.2...v2.0.0-rc.3) (2017-11-24)

### Bug Fixes

* import rxjs in a proper way. Closes [#172](https://github.com/valor-software/ng2-tree/issues/172) ([#173](https://github.com/valor-software/ng2-tree/issues/173)) ([5360828](https://github.com/valor-software/ng2-tree/commit/5360828))

<a name="2.0.0-rc.2"></a>

# [2.0.0-rc.2](https://github.com/valor-software/ng2-tree/compare/v2.0.0-rc.1...v2.0.0-rc.2) (2017-11-19)

### Bug Fixes

* **TreeController:** populate new nodes with ids unless they have them. Closes [#145](https://github.com/valor-software/ng2-tree/issues/145) ([3d0826a](https://github.com/valor-software/ng2-tree/commit/3d0826a))

### Features

* **node-menu:** bring custom menu items to the node menu. Closes [#48](https://github.com/valor-software/ng2-tree/issues/48), closes [#53](https://github.com/valor-software/ng2-tree/issues/53), closes [#25](https://github.com/valor-software/ng2-tree/issues/25), closes [#161](https://github.com/valor-software/ng2-tree/issues/161) ([#170](https://github.com/valor-software/ng2-tree/issues/170)) ([d776886](https://github.com/valor-software/ng2-tree/commit/d776886))
* **tree:** make it possible to collapse a tree on a first load. Closes [#102](https://github.com/valor-software/ng2-tree/issues/102) ([be42398](https://github.com/valor-software/ng2-tree/commit/be42398))
* **Tree:** adds ability to acquire tree underlying model ([#168](https://github.com/valor-software/ng2-tree/issues/168)). Closes [#147](https://github.com/valor-software/ng2-tree/issues/147) ([68c4dcf](https://github.com/valor-software/ng2-tree/commit/68c4dcf))

<a name="2.0.0-rc.1"></a>

# [2.0.0-rc.1](https://github.com/valor-software/ng2-tree/compare/v2.0.0-alpha.10...v2.0.0-rc.1) (2017-11-05)

### Bug Fixes

* **tree:** should not load children when they were already loaded (closes [#149](https://github.com/valor-software/ng2-tree/issues/149)) ([aa44992](https://github.com/valor-software/ng2-tree/commit/aa44992))
* **TreeController:** fix inconsistent root node ([9626db7](https://github.com/valor-software/ng2-tree/commit/9626db7))

### Features

* add ability to pass a template to the tree for nodes rendering ([a83c1e4](https://github.com/valor-software/ng2-tree/commit/a83c1e4))
* support ngrx (or loading children using any other redux-like library via special LoadNextLevel event) ([1e4095d](https://github.com/valor-software/ng2-tree/commit/1e4095d))

<a name="2.0.0-alpha.10"></a>

# [2.0.0-alpha.10](https://github.com/valor-software/ng2-tree/compare/v2.0.0-alpha.9...v2.0.0-alpha.10) (2017-08-27)

### Bug Fixes

* remove lodash 'get' ([5bf144d](https://github.com/valor-software/ng2-tree/commit/5bf144d))

<a name="2.0.0-alpha.9"></a>

# [2.0.0-alpha.9](https://github.com/valor-software/ng2-tree/compare/v2.0.0-alpha.8...v2.0.0-alpha.9) (2017-08-27)

### Bug Fixes

* handle rxjs subscriptions ([5db73e0](https://github.com/valor-software/ng2-tree/commit/5db73e0))
* **tree, menu:** return proper value for positionInParent call; change z-index of the menu ([0db681c](https://github.com/valor-software/ng2-tree/commit/0db681c))

<a name="2.0.0-alpha.8"></a>

# [2.0.0-alpha.8](https://github.com/valor-software/ng2-tree/compare/v2.0.0-alpha.6...v2.0.0-alpha.8) (2017-07-02)

### Bug Fixes

* fix demo build output dir, add missing dependency for gh-pages, add extrab badge - version ([cef0385](https://github.com/valor-software/ng2-tree/commit/cef0385))
* replace lodash functions with own ones in order to avoid tree-shaking issues (closes [#108](https://github.com/valor-software/ng2-tree/issues/108)) ([e6eb712](https://github.com/valor-software/ng2-tree/commit/e6eb712))
* **fn.utils:** cover with tests critical paths (though coverage should be increased definitely for those utils) ([87eaff5](https://github.com/valor-software/ng2-tree/commit/87eaff5))
* **system.js:** add section for SystemJS configuration, use lodash-es instead of lodash (closes [#104](https://github.com/valor-software/ng2-tree/issues/104), [#103](https://github.com/valor-software/ng2-tree/issues/103), [#58](https://github.com/valor-software/ng2-tree/issues/58)) ([4b36690](https://github.com/valor-software/ng2-tree/commit/4b36690))

<a name="2.0.0-alpha.7"></a>

# [2.0.0-alpha.7](https://github.com/valor-software/ng2-tree/compare/v2.0.0-alpha.6...v2.0.0-alpha.7) (2017-06-23)

### Bug Fixes

* fix demo build output dir, add missing dependency for gh-pages, add extrab badge - version ([cef0385](https://github.com/valor-software/ng2-tree/commit/cef0385))
* **system.js:** add section for SystemJS configuration, use lodash-es instead of lodash (closes [#104](https://github.com/valor-software/ng2-tree/issues/104), [#103](https://github.com/valor-software/ng2-tree/issues/103), [#58](https://github.com/valor-software/ng2-tree/issues/58)) ([4b36690](https://github.com/valor-software/ng2-tree/commit/4b36690))

<a name="2.0.0-alpha.6"></a>

# [2.0.0-alpha.6](https://github.com/valor-software/ng2-tree/compare/v2.0.0-alpha.5...v2.0.0-alpha.6) (2017-06-10)

### Bug Fixes

* **async-children:** create observable for aysnc children only once (fixes [#80](https://github.com/valor-software/ng2-tree/issues/80)) ([c74e1b4](https://github.com/valor-software/ng2-tree/commit/c74e1b4))
* **tree:** option to have an empty folder node (no children) ([ac4f777](https://github.com/valor-software/ng2-tree/commit/ac4f777)), closes [#87](https://github.com/valor-software/ng2-tree/issues/87)

### Features

* add cssClasses setting for folding elements and html templates for node and left menu activation elements ([adc3c78](https://github.com/valor-software/ng2-tree/commit/adc3c78))
* **html value:** render html properly in a node.value ([baa62f4](https://github.com/valor-software/ng2-tree/commit/baa62f4))
* **tree:** add left menu and an option to control availability of menus ([1afb6fc](https://github.com/valor-software/ng2-tree/commit/1afb6fc))

<a name="2.0.0-alpha.5"></a>

# [2.0.0-alpha.5](https://github.com/valor-software/ng2-tree/compare/v2.0.0-alpha.4...v2.0.0-alpha.5) (2017-03-04)

### Bug Fixes

* **scripts:** do not update web-driver on postinstall ([fadd8de](https://github.com/valor-software/ng2-tree/commit/fadd8de))
* **scripts:** remove not ready things from scripts ([c74b977](https://github.com/valor-software/ng2-tree/commit/c74b977))

<a name="2.0.0-alpha.4"></a>

# 2.0.0-alpha.4 (2017-03-04)

### Bug Fixes

* add demo/\*_/_.css to .gitignore ([2b2e597](https://github.com/valor-software/ng2-tree/commit/2b2e597))
* apply new node value on blur (fixes [#4](https://github.com/valor-software/ng2-tree/issues/4)) ([378a36f](https://github.com/valor-software/ng2-tree/commit/378a36f))
* enable drag-n-drop for safari ([27d344a](https://github.com/valor-software/ng2-tree/commit/27d344a))
* export only public api, ignore .publish ([b7c22a3](https://github.com/valor-software/ng2-tree/commit/b7c22a3))
* handle coordinates via e.x, e.y or e.clientX, e.clientY - otherwise it causes issues ([096c08b](https://github.com/valor-software/ng2-tree/commit/096c08b))
* include font-awesome into built module ([48246bc](https://github.com/valor-software/ng2-tree/commit/48246bc))
* add previously ignored umd-bundler.js ([af0ce27](https://github.com/valor-software/ng2-tree/commit/af0ce27))
* **build:** copy styles to build directory ([45c62e7](https://github.com/valor-software/ng2-tree/commit/45c62e7))
* **package.json:** add lodash missing dependency ([bf31a0a](https://github.com/valor-software/ng2-tree/commit/bf31a0a))
* **tree.component:** make sure tree can be loaded asynchronously ([fc68654](https://github.com/valor-software/ng2-tree/commit/fc68654))
* **type.utils:** change lodash import from "lodash/index" to "lodash" ([128fd97](https://github.com/valor-software/ng2-tree/commit/128fd97))
* **webpack.config:** override css loader ([4cc9a99](https://github.com/valor-software/ng2-tree/commit/4cc9a99))
* replace font-awesome icons with utf-8 symbols as a workaround to problem with fonts bundling ([a93726a](https://github.com/valor-software/ng2-tree/commit/a93726a))
* update README.md ([f09b711](https://github.com/valor-software/ng2-tree/commit/f09b711))
* update README.md ([ecff57d](https://github.com/valor-software/ng2-tree/commit/ecff57d))

### Features

* **drag-n-drop:** add support of nodes' drag-n-drop ([69e57d7](https://github.com/valor-software/ng2-tree/commit/69e57d7))
* **ng2-tree:** add stylus, webpack-dev-server support ([be3d56e](https://github.com/valor-software/ng2-tree/commit/be3d56e))
* **ng2-tree:** tree is implemented as an Angular2 component ([f03846a](https://github.com/valor-software/ng2-tree/commit/f03846a))
* **node editing:** add support of cancel and applying actions for the node value ([aa0e651](https://github.com/valor-software/ng2-tree/commit/aa0e651))
* **node menu:** add support of node renaming ([15597c1](https://github.com/valor-software/ng2-tree/commit/15597c1))
* **node menu:** extracted into separate component ([3c2915f](https://github.com/valor-software/ng2-tree/commit/3c2915f))
* **node menu:** implement 'Add node' menu item ([d171504](https://github.com/valor-software/ng2-tree/commit/d171504))
* **node removal:** implement remove action in the node menu ([d9dc8be](https://github.com/valor-software/ng2-tree/commit/d9dc8be))
* **styles:** make it possible to override styles (refs [#16](https://github.com/valor-software/ng2-tree/issues/16)) ([3435441](https://github.com/valor-software/ng2-tree/commit/3435441))
* **tree:** add ability to hide root node (refs [#25](https://github.com/valor-software/ng2-tree/issues/25)) ([7d64cdf](https://github.com/valor-software/ng2-tree/commit/7d64cdf))
* **tree:** add support of async children loading on node expand ([bbbb8f7](https://github.com/valor-software/ng2-tree/commit/bbbb8f7))
* **tree:** make it possible to create static tree (refs [#21](https://github.com/valor-software/ng2-tree/issues/21)) ([d9b3c79](https://github.com/valor-software/ng2-tree/commit/d9b3c79))
