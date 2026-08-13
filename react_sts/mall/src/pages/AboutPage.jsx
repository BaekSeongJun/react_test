import Header from "../include/Header";
import { Container } from "react-bootstrap";

const AboutPage = () => {
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
