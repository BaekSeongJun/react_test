import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import "./App.css";
import { useState, useRef } from "react";

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockData);

  const idRef = useRef(3);
  //핸들러 함수

  //생성하기
  const onCreate = (value) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: value,
      date: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
  };
  //핸들러함수(수정하기)
  const onUpdate = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
      }),
    );
  };

  //핸들러함수 (삭제하기)
  const onDelete = (id) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      }),
    );
  };

  return (
    <>
      <div className="App">
        <Header />
        <Editor onCreate={onCreate} />
        <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
      </div>
    </>
  );
}

export default App;
