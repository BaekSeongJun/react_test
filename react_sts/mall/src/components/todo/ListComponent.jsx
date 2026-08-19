import { getList } from "../../api/todoApi";
import UseCustomMove from "../../hooks/UseCustomMove";
import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import PageComponent from "../commons/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = ({ page, size, moveToList, moveToRead, refresh }) => {
  const [serverData, setServerData] = useState(initState);
  useEffect(() => {
    getList({ page, size }).then((data) => {
      setServerData(data);
    });
  }, [page, size, refresh]);
  return (
    <Container className="px-5 justify-content-center">
      <Table striped bordered hover size="lg">
        <thead>
          <tr className="text-center">
            <th>TNO</th>
            <th>TITLE</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {serverData.dtoList.map((todo) => (
            <tr key={todo.tno} onClick={() => moveToRead(todo.tno)}>
              <td className="text-center">{todo.tno}</td>
              <td>{todo.title}</td>
              <td>{todo.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PageComponent serverData={serverData} moveToList={moveToList} />
    </Container>
  );
};
export default ListComponent;
