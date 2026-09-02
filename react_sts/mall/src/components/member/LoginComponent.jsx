import { useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";

const initState = {
  email: "",
  pw: "",
};

export default function LoginComponent({ doLogin, moveToPath }) {
  const [loginParam, setLoginParam] = useState({ ...initState });

  const handleChange = (e) => {
    setLoginParam({ ...loginParam, [e.target.name]: e.target.value });
  };

  const handleClickLogin = (e) => {
    doLogin(loginParam).then((data) => {
      console.log("after unwrap...");
      console.log(data);
      if (data.error) {
        alert("이메일과 패스워드를 다시확인하세요.");
      } else {
        alert("로그인 성공!");
        moveToPath("/");
      }
    });
  };

  return (
    <>
      <h2 className="text-center mb-3">Login Component</h2>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          name="email"
          type="email"
          placeholder="name@example.com"
          value={loginParam.email}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          name="pw"
          type="password"
          placeholder="Password"
          value={loginParam.pw}
          onChange={handleChange}
        />
      </FloatingLabel>
      <div className="d-grid gap-2 mt-3">
        <Button variant="outline-primary" onClick={handleClickLogin}>
          로그인
        </Button>
      </div>
    </>
  );
}
