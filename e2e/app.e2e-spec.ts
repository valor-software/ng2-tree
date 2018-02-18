import { TreePage } from './app.po';
import { browser, ExpectedConditions as EC } from 'protractor';

describe('Tree App', () => {
  let page: TreePage;

  beforeEach(() => {
    page = new TreePage();
  });

  it('should have a tree where first node value is "Fonts"', async () => {
    page.navigateTo();
    expect(await page.getFirstNodeValueText()).toEqual('Fonts');
  });

  it('should load node children asynchronously', async () => {
    page.navigateTo();

    page.getAsyncChildrenNodeFolding().click();

    const firstAsyncChild = page.getFirstAsyncChild();
    expect(await browser.isElementPresent(firstAsyncChild)).toBe(true);
    expect(await firstAsyncChild.getText()).toEqual('Input Mono');
    expect(await page.getLastAsyncChild().getText()).toEqual('Source Code Pro');
  });

  it('Should render tree node with HTML tags', async () => {
    page.navigateTo();

    const antiquaNode = page.getAntiquaNode();
    expect(browser.isElementPresent(antiquaNode)).toBeTruthy();
    expect(await antiquaNode.getText()).toEqual('Antiqua');

    const attrs = { id: 'antiqua', class: 'test' };

    const expectations = Object.keys(attrs).map((key: string) => {
      return antiquaNode.getAttribute(key).then((value: string) => expect(value).toEqual(attrs[key]));
    });

    return Promise.all(expectations as any);
  });
});
