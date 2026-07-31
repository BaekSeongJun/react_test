import { useState, useRef } from "react";

const Register2 = () => {
  //상태값 변화 : name, birth, coutry, bio
  const [input, setInput] = useState({
    name: "",
    birth: "",
    country: "",
    bio: "",
  });

  // const countRef = useRef(0);
  const inputRef = useRef();

  // console.log(countRef);

  const onChangeInput = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const onSubmit = () => {
    if (input.name === "") {
      inputRef.current.focus();
      console.log(inputRef);
    }
  };
  return (
    <>
      <div>
        <div>
          <input
            ref={inputRef}
            type="text"
            name="name"
            value={input.name}
            onChange={onChangeInput}
            placeholder="홍길동"
          />
        </div>

        <div>
          <input
            type="date"
            name="birth"
            value={input.birth}
            onChange={onChangeInput}
          />
        </div>

        <div>
          <select name="country" value={input.country} onChange={onChangeInput}>
            <option value=""></option>
            <option value="kr">한국</option>
            <option value="us">미국</option>
            <option value="uk">영국</option>
          </select>
        </div>

        <div>
          <textarea name="bio" value={input.bio} onChange={onChangeInput} />
        </div>

        <div>
          <button onClick={onSubmit}>스프링부트전송</button>
        </div>
      </div>
    </>
  );
};

export default Register2;
