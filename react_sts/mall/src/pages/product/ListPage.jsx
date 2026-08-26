import Header from "../../include/Header";
import ListComponent from "../../components/product/ListComponent";
import { Container } from "react-bootstrap";
import UseCustomMove from "../../hooks/UseCustomMove";

const ListPage = () => {
  const { page, size, moveToProductList, moveToProductRead, refresh } =
    UseCustomMove();
  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <ListComponent
          page={page}
          size={size}
          moveToProductList={moveToProductList}
          moveToProductRead={moveToProductRead}
        />
      </div>
    </Container>
  );
};
export default ListPage;
