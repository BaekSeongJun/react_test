import ModifyComponent from "../../components/member/ModifyComponent";

import { Container } from "react-bootstrap";
import Header from "../../include/Header";

const ModifyPage = () => {
  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <ModifyComponent />
      </div>
    </Container>
  );
};

export default ModifyPage;
