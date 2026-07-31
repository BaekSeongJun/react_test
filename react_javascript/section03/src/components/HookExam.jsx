// import { useState } from "react";
import UseInput from "../hooks/UseInput";

//사용자가 정의한 Hooks
//1. 함수 컴포넌트에서만 사용 가능하다.(커스텀 훅 내부에서만 호출이 가능하다.)
//2. 조건부로 호촐 할 수 없다.
//값을 기억하는 변수, 변수 값을 셋팅하는 함수
//사용자가 정의한 Hooks
// function useInput(value) {
//   const [input, setInput] = useState(value);
//   const onChange = (e) => setInput(e.target.value);

//   return [input, onChange];
// }

const HookExam = () => {
  //사용자가 정의한 변수
  // const [input, setInput] = useState("");
  // const [input2, setInput2] = useState("");
  const [input, onChange] = UseInput("");
  const [input2, onChange2] = UseInput("");
  const [input3, onChange3] = UseInput("");
  //사용자가 정의한 함수
  // const onChange = (e) => {
  //   setInput(e.target.value);
  // };
  // const onChange2 = (e) => {
  //   setInput2(e.target.value);
  // };
  return (
    <>
      <div>
        <input type="text" value={input} onChange={onChange}></input>
        <input type="text" value={input2} onChange={onChange2}></input>
        <input type="text" value={input3} onChange={onChange3}></input>
      </div>
    </>
  );
};

export default HookExam;
