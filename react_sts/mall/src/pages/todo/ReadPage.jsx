import Header from "../../include/Header";
import ReadComponent from "../../components/ReadComponent";
import { Container } from "react-bootstrap";
import UseCustomMove from "../../hooks/UseCustomMove";

const ReadPage = () => {
  const { moveToList, moveToModify, tno } = UseCustomMove();

  return (
    <Container>
      <Header />
      <div className="d-flex justify-content-center gap-2">
        <ReadComponent
          tno={tno}
          moveToList={moveToList}
          moveToModify={moveToModify}
        />
      </div>
    </Container>
  );
};
export default ReadPage;
