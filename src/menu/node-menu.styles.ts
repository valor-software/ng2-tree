export const styles: string[] = [`
  .node-menu {
    position: relative;
    width: 150px;
  }
  .node-menu .node-menu-content {
    width: 100%;
    padding: 5px;
    position: absolute;
    border: 1px solid #bdbdbd;
    border-radius: 5%;
    box-shadow: 0 0 5px #bdbdbd;
    background-color: #eee;
    color: #212121;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .node-menu .node-menu-content li.node-menu-item {
    list-style: none;
    padding: 3px;
  }
  .node-menu .node-menu-content .node-menu-item:hover {
    border-radius: 5%;
    opacity: unset;
    cursor: pointer;
    background-color: #bdbdbd;
    transition: background-color 0.2s ease-out;
  }
  .node-menu .node-menu-content .node-menu-item .node-menu-item-icon {
    display: inline-block;
    width: 16px;
  }
  .node-menu .node-menu-content .node-menu-item .node-menu-item-icon.new-tag:before {
    content: '\\25CF';
  }
  .node-menu .node-menu-content .node-menu-item .node-menu-item-icon.new-folder:before {
    content: '\\25B6';
  }
  .node-menu .node-menu-content .node-menu-item .node-menu-item-icon.rename:before {
    content: '\\270E';
  }
  .node-menu .node-menu-content .node-menu-item .node-menu-item-icon.remove:before {
    content: '\\2716';
  }
  .node-menu .node-menu-content .node-menu-item .node-menu-item-value {
    margin-left: 5px;
  }
`];
