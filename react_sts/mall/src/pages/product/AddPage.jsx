import Header from "../../include/Header";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import AddComponent from "../../components/product/AddComponent";
import UseCustomMove from "../../hooks/UseCustomMove";

const AddPage = () => {
  const { page, size, moveToProductList } = UseCustomMove();
  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <AddComponent moveToProductList={moveToProductList} />
      </div>
    </Container>
  );
};
export default AddPage;
