import Header from "../../include/Header";
import ListComponent from "../../components/todo/ListComponent";
import { Container } from "react-bootstrap";
import UseCustomMove from "../../hooks/UseCustomMove";

const ListPage = () => {
  const { page, size, moveToList, moveToRead, refresh } = UseCustomMove();
  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <ListComponent
          page={page}
          size={size}
          moveToList={moveToList}
          moveToRead={moveToRead}
          refresh={refresh}
        />
      </div>
    </Container>
  );
};
export default ListPage;
