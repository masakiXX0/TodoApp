import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  // state：データの管理
  constructor(props) {
    super(props);
    // データの入れ物 stateの中にtodoという配列を格納
    this.state = {
      todo: [
        {
          id: 0,
          task: "item1"
        }
      ],
      currentId: 0
    };
  }

  // データの追加
  handleAdd(e) {
    e.preventDefault(); // 画面の更新を止める
    // console.log(e.target.task.value);
    const task = e.target.task.value;
    if (task === "") {
      return;
    }

    const nextId = this.state.currentId + 1;

    e.target.task.value = "";

    this.setState({
      todo: [
        ...this.state.todo, // 元の配列がすべて入る(これ入れないと元の配列に上書きされてしまう。)
        {
          id: nextId,
          task: task
        }
      ],
      currentId: nextId // currentIdを更新
    });
  }

  // 削除処理
  handleRemove(id) {
    // todoからidが一致しているものを削除している
    const taskList = this.state.todo.filter(item => {
      return item.id !== id;
    });

    this.setState({
      todo: taskList
    });
  }

  // view（画面の表示）
  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <form onSubmit={e => this.handleAdd(e)}>
          Todo:
          <input name="task" />
          <input type="submit" />
        </form>

        <ul>
          {// 配列の要素をリストに出す書き方はよくやる方法
          this.state.todo.map(item => {
            return (
              <li key={item.id}>
                {item.task}
                <button onClick={() => this.handleRemove(item.id)}>
                  delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
