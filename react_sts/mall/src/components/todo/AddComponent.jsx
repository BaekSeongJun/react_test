import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { postAdd } from "../../api/todoApi";
import InfoModal from "../commons/InfoModal";

const initState = {
  title: "",
  writer: "",
  complete: false,
  dueDate: "",
};

const AddComponent = ({ moveToList, page }) => {
  const [todo, setTodo] = useState(initState);
  const [flag, setFlag] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onChangeTodo = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onClickInsert = () => {
    postAdd(todo)
      .then((result) => {
        setTodo({ ...initState });
        setTitle("SUCCESS");
        setContent(`${result.TNO} 성공`);
        setFlag(true);
      })
      .catch((e) => {
        setTitle("FAIL");
        setContent(`${e} 저장에 실패`);
        setFlag(true);
        console.log(e);
      });
  };

  const closeModal = () => {
    setFlag(false);
    moveToList({ page: `${page}` });
  };
  return (
    <Container className="p-5">
      <InfoModal
        show={flag}
        title={title}
        content={content}
        callbackFn={closeModal}
      />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>TITLE</Form.Label>
          <Form.Control
            name="title"
            type="text"
            value={todo.title}
            onChange={onChangeTodo}
            placeholder="Enter Title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>WRITER</Form.Label>
          <Form.Control
            name="writer"
            type="text"
            value={todo.writer}
            onChange={onChangeTodo}
            placeholder="Enter Writer"
          />
        </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label>DUEDATE</Form.Label>
          <Form.Control
            name="dueDate"
            type="date"
            value={todo.dueDate}
            onChange={onChangeTodo}
            placeholder="Enter dueDate"
          />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center gap-2 ">
        <Button variant="primary" type="button" onClick={onClickInsert}>
          저장
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={() => {
            moveToList({ page: `${page}` });
          }}
        >
          목록
        </Button>
      </div>
    </Container>
  );
};
export default AddComponent;
