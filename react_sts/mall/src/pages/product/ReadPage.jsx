import Header from "../../include/Header";
import ReadComponent from "../../components/product/ReadComponent";
import { Container } from "react-bootstrap";
import UseCustomMove from "../../hooks/UseCustomMove";

const ReadPage = () => {
  const { moveToProductList, moveToProductModify, pno } = UseCustomMove();

  return (
    <Container>
      <Header />
      <div className="d-flex justify-content-center gap-2">
        <ReadComponent
          pno={pno}
          moveToProductList={moveToProductList}
          moveToProductModify={moveToProductModify}
        />
      </div>
    </Container>
  );
};
export default ReadPage;
