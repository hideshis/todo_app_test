import todoPage from '../pages/todoPage.js';

describe('TODO一覧機能', () => {
  beforeEach (() => {
    const todoPageDriver = new todoPage();
    todoPageDriver.visit();
  });

  it('TODOが1件登録された場合、TODOが一覧に表示される', () => {
    const todoPageDriver = new todoPage();
    const todoContent = 'テスト用TODO';

    todoPageDriver.addTodo('テスト用TODO')
                  .assertThatHeaderIsCorrectlyDisplayed()
                  .assertThatNthRowIsCorrectlyDisplayed(1, todoContent);
  });

  it('TODOは、登録された順に一覧表示される', () => {
    const todoPageDriver = new todoPage();
    const todoContentBase = 'テスト用TODO';

    for (let num = 1; num <= 3; num++) {
      const todoContent = todoContentBase + num;
      todoPageDriver.addTodo(todoContent);
    }

    /*
    登録したTODOそれぞれについて、No.、内容、「完了」ボタンが表示されていることを確認する
    ただし、一覧全体の表示順が仕様通りであることを確認するため、アサーションはTODO登録を実行し終えてから行う
    */
    for (let num = 1; num <= 3; num++) {
      const todoContent = todoContentBase + num;
      todoPageDriver.assertThatNthRowIsCorrectlyDisplayed(num, todoContent);
    }
  });

  it('初期表示は、TODOが0件である', () => {
    const todoPageDriver = new todoPage();
    todoPageDriver.assertThatTodoListIsEmpty();
  });

  it('「完了」ボタンをクリックすると、クリックした行のTODOを削除する', () => {
    const todoPageDriver = new todoPage();
    var todoContentList = [];

    for (let num = 1; num <= 3; num++) {
      const todoContent = 'テスト用TODO' + num;
      todoPageDriver.addTodo(todoContent);
      todoContentList.push(todoContent);
    }

    // 一覧の最上位に表示されるTODOの「完了」ボタンをクリックし、当該TODOが一覧から削除されることを確認する
    for (let num = 1; num <= 3; num++) {
      const completedTodoContent = todoContentList[0];
      todoPageDriver.completeTodo(1);
      // 完了したTODOが、TODO一覧に存在しないことを確認する
      for (let numCheck = 1; numCheck <= (3 - num); numCheck++) {
        const remainedTodo = todoPageDriver.getNthRowContent(numCheck);
        remainedTodo.should('not.have.text', completedTodoContent);
      }
      todoContentList.splice(0,0);
    }
    todoPageDriver.assertThatTodoListIsEmpty();
  });
});
