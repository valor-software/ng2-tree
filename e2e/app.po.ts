import { browser, element, by, promise, ElementFinder } from 'protractor';

export class TreePage {
  public navigateTo(): promise.Promise<any> {
    return browser.get('/');
  }

  public getFirstNodeValueText(): promise.Promise<string> {
    return element(by.css('.node-value')).getText();
  }

  public getFirstAsyncChild(): ElementFinder {
    return element.all(by.css('.node-value')).get(19);
  }

  public getLastAsyncChild(): ElementFinder {
    return element.all(by.css('.node-value')).get(25);
  }

  public getAsyncChildrenNodeFolding(): ElementFinder {
    return element.all(by.css('.folding')).get(18);
  }

  public getAntiquaNode(): ElementFinder {
    return element(by.id('antiqua'));
  }
}
