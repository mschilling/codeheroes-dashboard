import { CodeheroesDashboardPage } from './app.po';

describe('codeheroes-dashboard App', () => {
  let page: CodeheroesDashboardPage;

  beforeEach(() => {
    page = new CodeheroesDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
