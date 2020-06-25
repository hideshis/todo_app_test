import todoPage from '../pages/todoPage.js';

describe('TODOメモ', () => {
  it('"TODOメモ"ページを表示することを確認する', () => {
    const todoPageDriver = new todoPage();
    todoPageDriver.visit()
                  .getTitle()
                  .should('eq', 'TODOメモ');
  })
})
