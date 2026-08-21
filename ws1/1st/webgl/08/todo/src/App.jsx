import { useState } from 'react';
import './App.css';

// --- ① リスト1行分のコンポーネント（部品） ---
function TodoItem(props) {
  return (
    <li className="todo-item">
      {/* 親からPropsで受け取ったタスクの文字を表示 */}
      <span>{props.text}</span>

      {/* 親からPropsで受け取った削除関数に、自分の番号(index)を渡して実行！ */}
      <button onClick={() => props.deleteTodo(props.index)}>完了</button>
    </li>
  );
}
// ----------------------------------------

function App() {
  const [todos, setTodos] = useState(["Reactを勉強する", "3Dモデルを完成させる"]);
  const [inputText, setInputText] = useState("");

  // タスクを追加する関数
  const addTodo = () => {
    if (inputText === "") {
      alert("タスクを入力してください！");
      return;
    }
    const newTodos = [...todos, inputText];
    setTodos(newTodos);
    setInputText("");
  };

  // タスクを削除する関数
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // すべて削除する関数（練習問題の答え）
  const deleteAll = () => {
    setTodos([]);
  };

  return (
    <div className="container">
      <h1>My Todo List</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="新しいタスクを入力"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className="btn" onClick={addTodo}>追加</button>
      </div>

      <ul>
        {/* ② mapの中で、自作した TodoItem コンポーネントを呼び出す */}
        {todos.map((todo, index) => {
          return (
            <TodoItem
              key={index}           /* mapの目印 */
              text={todo}           /* タスクの文字 */
              index={index}         /* 自分の番号 */
              deleteTodo={deleteTodo} /* 削除するための関数 */
            />
          );
        })}
      </ul>

      {/* すべて削除ボタン */}
      <button className="btn-danger" onClick={deleteAll} style={{ marginTop: "20px" }}>
        すべて削除
      </button>
    </div>
  );
}

export default App;