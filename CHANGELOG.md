<a name="2.0.0-alpha.5"></a>
# [2.0.0-alpha.5](https://github.com/valor-software/ng2-tree/compare/v2.0.0-alpha.4...v2.0.0-alpha.5) (2017-03-04)


### Bug Fixes

* **scripts:** do not update web-driver on postinstall ([fadd8de](https://github.com/valor-software/ng2-tree/commit/fadd8de))
* **scripts:** remove not ready things from scripts ([c74b977](https://github.com/valor-software/ng2-tree/commit/c74b977))



<a name="2.0.0-alpha.4"></a>
# 2.0.0-alpha.4 (2017-03-04)


### Bug Fixes

* add demo/**/*.css to .gitignore ([2b2e597](https://github.com/valor-software/ng2-tree/commit/2b2e597))
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



