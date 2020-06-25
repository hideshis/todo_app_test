// todo_appのページオブジェクト
export default class todoPage {
  // "TODOメモ"ページを表示する
  visit() {
    cy.visit('/');
    return this;
  }

  // Webページのタイトルを取得する
  getTitle() {
    return cy.title();
  }

  // テキストフォームを取得する
  getTextForm() {
    return cy.get('input');
  }

  // エラーメッセージを取得する
  getErrorMessage() {
    return cy.get('.error-message');
  }

  // TODOを登録する
  addTodo(todoTitle) {
    if (todoTitle) {
      cy.get('input').type(todoTitle);
    }
    cy.get('#todoForm > button').click();
    cy.get('#todoForm > button').should('not.have.attr', 'disabled');
    return this;
  }

  // TODO一覧のindex行目のタスクを完了する
  completeTodo(index) {
    cy.get('#app > table > tbody > tr:nth-child(' + index + ') > td.todo-control-menu > button').click();
    return this;
  }

  // TODO一覧のindex行目のTODO内容を取得する
  getNthRowContent(index) {
    return cy.get('#app > table > tbody > tr:nth-child(' + index + ') > td.todo-text');
  }

  // TODO一覧のindex行目を取得する
  getNthRow(index) {
    return cy.get('#app > table > tbody > tr:nth-child(' + index + ')');
  }

  // TODO一覧のヘッダー行が正しく表示されていることを確認する
  assertThatHeaderIsCorrectlyDisplayed() {
    cy.get('#app > table > thead > tr > th:nth-child(1)').should('have.text', 'No.');
    cy.get('#app > table > thead > tr > th:nth-child(2)').should('have.text', '内容');
    cy.get('#app > table > thead > tr > th:nth-child(3)').should('have.text', '操作');
    return this;
  }

  // TODO一覧のindex行目のタスクが正しく表示されていることを確認する
  assertThatNthRowIsCorrectlyDisplayed(index, todoContent) {
    cy.get('#app > table > tbody > tr:nth-child(' + index + ') > td.todo-no').should('have.text', index);
    cy.get('#app > table > tbody > tr:nth-child(' + index + ') > td.todo-text').should('have.text', todoContent);
    cy.get('#app > table > tbody > tr:nth-child(' + index + ') > td.todo-control-menu > button').should('exist');
    return this;
  }

  // エラーメッセージの内容がexpectedErrorMessageと同一であることを確認する
  assertThatErrorMessageHasExpectedText(expectedErrorMessage) {
    cy.get('.error-message').then(($err_msg) => {
      const txt = $err_msg.text().trim();
      expect(txt).eq(expectedErrorMessage);
    });
    return this;
  }

  // TODO一覧が空(=TODOの登録件数が0)であることを確認する
  assertThatTodoListIsEmpty() {
    // TODO一覧が表示されていないことを確認する
    cy.get('#app > table').should('not.exist');

    // TODOが0件のときに表示されるメッセージを確認する
    cy.get('#app').then(($msg) => {
      const txt = $msg.text().trim();
      expect(txt).match(/TODOはありません。$/);
    })
    return this;
  }

}
