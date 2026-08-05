import "../css/Editor.css";
import { useState, useRef, useContext } from "react";
import { TodoDispatchContext } from "../App";

const Editor = () => {
  const { onCreate } = useContext(TodoDispatchContext);
  const [content, setContent] = useState("");
  const inputRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onKeyDownContent = (e) => {
    //엔터를 입력했는지 점검
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (content === "") {
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };

  return (
    <div className="Editor">
      <input
        ref={inputRef}
        type="text"
        placeholder="오늘의 할 일을 입력"
        onChange={onChangeContent}
        onKeyDown={onKeyDownContent}
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
