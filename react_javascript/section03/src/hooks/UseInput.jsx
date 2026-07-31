import { useState } from "react";

function UseInput(value) {
  const [input, setInput] = useState(value);
  const onChange = (e) => setInput(e.target.value);

  return [input, onChange];
}

export default UseInput;
