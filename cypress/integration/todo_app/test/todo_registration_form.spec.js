import todoPage from '../pages/todoPage.js';

describe('TODO登録フォーム機能', () => {
  beforeEach (() => {
    const todoPageDriver = new todoPage();
    todoPageDriver.visit();
  });

  it('TODOメモを新規登録する', () => {
    const todoPageDriver = new todoPage();
    const todoContent = 'テスト用TODO';

    todoPageDriver.addTodo(todoContent)
                  .getTextForm()
                  .should('have.text', ''); // テキストフォームがクリアされていることを確認する
    todoPageDriver.assertThatNthRowIsCorrectlyDisplayed(1, todoContent);
  });

  it('内容が空（0 文字）の状態で「登録」ボタンを押した場合、エラーが表示される', () => {
    const todoPageDriver = new todoPage();
    const todoContent = '';

    todoPageDriver.addTodo(todoContent)
                  .assertThatErrorMessageHasExpectedText('内容を入力してください。')
                  .assertThatTodoListIsEmpty();
  });

  it('内容が20文字の状態で「登録」ボタンを押した場合、TODOメモを登録することができる', () => {
    const todoPageDriver = new todoPage();
    const todoContent = 'abcdefghijklmnopqrst';

    todoPageDriver.addTodo(todoContent)
                  .getErrorMessage()
                  .should('not.exist'); // エラーメッセージが表示されないことを確認する
    todoPageDriver.assertThatNthRowIsCorrectlyDisplayed(1, todoContent);
  });

  it('内容が21文字の状態で「登録」ボタンを押した場合、エラーが表示される', () => {
    const todoPageDriver = new todoPage();
    const todoContent = 'abcdefghijklmnopqrstu';

    todoPageDriver.addTodo(todoContent)
                  .assertThatErrorMessageHasExpectedText('内容は20文字以内で入力してください。')
                  .assertThatTodoListIsEmpty();
  });

  it('TODO がすでに 5 件登録されている状態で「登録」ボタンを押した場合、エラーが表示される', () => {
    const todoPageDriver = new todoPage();
    const todoContent = 'テスト用TODO';

    for (let num = 1; num <= 6; num++) {
      todoPageDriver.addTodo(todoContent + num);
    }

    todoPageDriver.assertThatErrorMessageHasExpectedText('TODOは5個までしか登録できません。')
                  .getNthRow(6)
                  .should('not.exist') // 6つめに登録したTODOが一覧に表示されていないことを確認する
  });
});
