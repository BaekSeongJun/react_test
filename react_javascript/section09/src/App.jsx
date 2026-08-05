import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import Exam from "./components/Exam";
import "./App.css";
import {
  useState,
  useRef,
  useReducer,
  useCallback,
  createContext,
  useMemo,
} from "react";

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

function reducer(todos, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...todos];
    case "UPDATE":
      return todos.map((todo) => {
        return todo.id === action.data
          ? { ...todo, isDone: !todo.isDone }
          : todo;
      });
    case "DELETE":
      return todos.filter((todo) => {
        return todo.id !== action.data;
      });
    default:
      return todos;
  }
}

//공유장소를 생성하고, 모든 컴포넌트들이 import해서 사용할 수 있도록 export
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();
function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const [count, setCount] = useState(0);

  const idRef = useRef(3);
  //핸들러 함수

  //생성하기

  const onCreate = useCallback((value) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: value,
        date: new Date().getTime(),
      },
    });
  }, []);
  // const onCreate = (value) => {
  //   dispatch({
  //     type: "CREATE",
  //     data: {
  //       id: idRef.current++,
  //       isDone: false,
  //       content: value,
  //       date: new Date().getTime(),
  //     },
  //   });
  // };
  //핸들러함수(수정하기)
  const onUpdate = useCallback((id) => {
    dispatch({ type: "UPDATE", data: id });
  }, []);

  //핸들러함수 (삭제하기)
  const onDelete = useCallback((id) => {
    dispatch({ type: "DELETE", data: id });
  }, []);

  //한번만 실행해라
  const memoriseDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, [onCreate, onUpdate, onDelete]);
  return (
    <>
      <div className="App">
        <Header />
        <Exam />
        <TodoStateContext.Provider value={{ todos }}>
          <TodoDispatchContext.Provider value={memoriseDispatch}>
            <Editor />
            <List />
          </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
      </div>
    </>
  );
}

export default App;
