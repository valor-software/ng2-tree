export const styles: string[] = [`
  ul {
    padding: 3px 0 3px 25px;
  }
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .over-drop-target {
    border: 4px solid #757575;
    transition: padding 0.2s ease-out;
    padding: 5px;
    border-radius: 5%;
  }
  .tree {
    box-sizing: border-box;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .tree li {
    list-style: none;
    cursor: default;
  }
  .tree li div {
    display: inline-block;
    box-sizing: border-box;
  }
  .tree .node-value {
    display: inline-block;
    color: #212121;
  }
  .tree .node-value:after {
    display: block;
    padding-top: -3px;
    width: 0;
    height: 2px;
    background-color: #212121;
    content: '';
    transition: width 0.3s;
  }
  .tree .node-value:hover:after {
    width: 100%;
  }
  .tree .node-selected:after {
    width: 100%;
  }
  .tree .folding {
    width: 25px;
    display: inline-block;
    line-height: 1px;
    padding: 0 5px;
    font-weight: bold;
  }
  .tree .folding.node-collapsed {
    cursor: pointer;
  }
  .tree .folding.node-collapsed:before {
    content: '\\25B6';
    color: #757575;
  }
  .tree .folding.node-expanded {
    cursor: pointer;
  }
  .tree .folding.node-expanded:before {
    content: '\\25BC';
    color: #757575;
  }
  .tree .folding.node-leaf {
    color: #212121;
    text-align: center;
    font-size: 0.89em;
  }
  .tree .folding.node-leaf:before {
    content: '\\25CF';
    color: #757575;
  }
`];
