import Header from "../include/Header";
import { Container } from "react-bootstrap";
import UseCustomLogin from "../hooks/UseCustomLogin";

const AboutPage = () => {
  const { isLogin, moveToPath } = UseCustomLogin();
  if (!isLogin) {
    alert("회원전용페이지");
    moveToPath("/");
  }
  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <button className="btn btn-outline-primary" type="button">
          About Page
        </button>
      </div>
    </Container>
  );
};
export default AboutPage;
