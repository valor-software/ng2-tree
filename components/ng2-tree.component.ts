import {Component} from 'angular2/core';

@Component({
  selector: 'ng2-tree',
  template: `
  <pre>
   [-] A
    |
    +-----B
    |
    +-----C
    |
    +-----[-] D
    |      |
    |      +-----X
    |      |
    |      +-----Y
    |
   [+]
  </pre>
  `
})
export class Ng2Tree {

}
