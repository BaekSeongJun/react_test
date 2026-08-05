import TodoItem from "./TodoItem";
import "../css/List.css";
import { useState, useMemo, useContext } from "react";
import { TodoStateContext } from "../App";

const List = () => {
  const [search, setSearch] = useState("");
  const { todos, onUpdate, onDelete } = useContext(TodoStateContext);
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  //search 없다. 1번방식 todos,search 있다. 2번방식 todos = filter작업
  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) => {
      return todo.content.toLowerCase().includes(search.toLowerCase());
    });
  };

  const filterTodos = getFilteredData();

  //렌더링이 일어날떄 마다 todo lIst에 등록된 전체갯수, 완료된 갯수, 미완료된 갯수를 연산
  //useMemo => useEffect
  const [totalCount, doneCount, notDoneCount] = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;
    console.log(`${totalCount} `);
    return [totalCount, doneCount, notDoneCount];
  }, [todos]);

  return (
    <div className="List">
      <h4>Todo List</h4>
      <div>
        <div>total:{totalCount}</div>
        <div>done:{doneCount}</div>
        <div>not done:{notDoneCount}</div>
      </div>
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        value={search}
        onChange={onChangeSearch}
      />
      <div className="todos_wrapper">
        {/* foreach, map, filter */}
        {filterTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
};

export default List;
