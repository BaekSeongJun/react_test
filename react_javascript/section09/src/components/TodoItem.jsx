import { memo } from "react";
import "../css/TodoItem.css";
import { useContext } from "react";
import { TodoDispatchContext } from "../App";

const TodoItem = ({ id, isDone, content, date }) => {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);
  const onChangeCheckBox = () => {
    onUpdate(id);
  };

  const onClickBtn = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <input type="checkbox" checked={isDone} onChange={onChangeCheckBox} />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickBtn}>삭제</button>
    </div>
  );
};

//React.memo의 문제점은(props 객체 값이 변동에 대한 작동은 잘 된다. 핸들러 함수는 함수자체를 재생성하기 때문에 문제가 된다.)
//이런방식 고차컴포넌트로 처리를해야한다. (Higher Order Component: HOC)
export default memo(TodoItem);
// export default memo(TodoItem, (prevProbs, nextProbs) => {
//   if (prevProbs.id !== nextProbs.id) {
//     return false;
//   }
//   if (prevProbs.isDone !== nextProbs.isDone) {
//     return false;
//   }
//   if (prevProbs.content !== nextProbs.content) {
//     return false;
//   }
//   if (prevProbs.date !== nextProbs.date) {
//     return false;
//   }
//   return true;
// });
