import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ModifyComponent from "../../components/product/ModifyComponent";
import UseCustomMove from "../../hooks/UseCustomMove";

const ModifyPage = () => {
  const { pno, moveToProductList, moveToProductRead } = UseCustomMove();

  return (
    <Container>
      <Header />
      <ModifyComponent
        pno={pno}
        moveToProductRead={moveToProductRead}
        moveToProductList={moveToProductList}
      />
    </Container>
  );
};
export default ModifyPage;
