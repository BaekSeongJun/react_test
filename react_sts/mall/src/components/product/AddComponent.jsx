import { useState, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { productPostAdd } from "../../api/todoApi";
import InfoModal from "../commons/InfoModal";
import FetchingModal from "../commons/FetchingModal";

const initState = {
  pname: "",
  pdesc: "",
  price: 0,
  files: [],
};

const AddComponent = ({ moveToProductList, page }) => {
  const [product, setProduct] = useState(initState);
  const uploadRef = useRef();
  const [flag, setFlag] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [fetching, setFetching] = useState(false);

  const onChangeProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onClickInsert = () => {
    const formData = new FormData();
    const files = uploadRef.current.files;

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    setFetching(true);

    productPostAdd(formData)
      .then((data) => {
        setFetching(false);
        setProduct({ ...initState });
        setTitle("SUCCESS");
        setContent(`${data.result} 성공`);
        setFlag(true);
      })
      .catch((e) => {
        setFetching(false);
        setTitle("FAIL");
        setContent(`${e} 저장에 실패`);
        setFlag(true);
        console.log(e);
      });
  };

  const closeModal = () => {
    setFlag(false);
    moveToProductList();
  };
  return (
    <Container className="p-5">
      {fetching ? <FetchingModal /> : <></>}
      <InfoModal
        show={flag}
        title={title}
        content={content}
        callbackFn={closeModal}
      />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            name="pname"
            type="text"
            value={product.pname}
            onChange={onChangeProduct}
            placeholder="Enter pname"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            name="pdesc"
            value={product.pdesc}
            as="textarea"
            rows={4}
            onChange={onChangeProduct}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={product.price}
            onChange={onChangeProduct}
            placeholder="Enter price"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Files</Form.Label>
          <Form.Control ref={uploadRef} type="file" multiple={true} />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center gap-2 ">
        <Button variant="primary" type="button" onClick={onClickInsert}>
          저장
        </Button>
      </div>
    </Container>
  );
};
export default AddComponent;
