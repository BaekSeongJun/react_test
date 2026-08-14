import Header from "../../include/Header";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ModifyPage = () => {
  const { tno } = useParams();
  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <h1>Todo Modify Page tno={tno}</h1>
      </div>
    </Container>
  );
};
export default ModifyPage;
