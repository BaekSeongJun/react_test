import Header from "../../include/Header";
import { Container } from "react-bootstrap";

import UseCustomLogin from "../../hooks/UseCustomLogin";
import LoginComponent from "../../components/member/LoginComponent";

const LoginPage = () => {
  const { doLogin, moveToPath } = UseCustomLogin();
  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <LoginComponent doLogin={doLogin} moveToPath={moveToPath} />
      </div>
    </Container>
  );
};
export default LoginPage;
