import Header from "../../include/Header";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import AddComponent from "../../components/todo/AddComponent";
import UseCustomMove from "../../hooks/UseCustomMove";

const AddPage = () => {
  const { page, size, moveToList } = UseCustomMove();
  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <AddComponent moveToList={moveToList} page={page} />
      </div>
    </Container>
  );
};
export default AddPage;
