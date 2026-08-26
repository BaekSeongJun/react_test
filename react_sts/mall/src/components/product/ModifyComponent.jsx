import { useEffect, useState, useRef } from "react";
import {
  productGetOne,
  productPutOne,
  productDeleteOne,
} from "../../api/productApi";
import { Container, Form, Row, Card, Button } from "react-bootstrap";
import InfoModal from "../commons/InfoModal";
import FetchingModal from "../commons/FetchingModal";
import { API_SERVER_HOST } from "../../api/productApi";
import { exceptionHandle } from "../commons/exceptionHandle";

const initState = {
  pno: 0,
  pname: "",
  price: 0,
  pdesc: "",
  files: [],
  delFlag: false,
  uploadFileNames: [],
};
const host = API_SERVER_HOST;

const ModifyComponent = ({ pno, moveToProductList, moveToProductRead }) => {
  const [product, setProduct] = useState(initState);
  const uploadRef = useRef();
  const [fetching, setFetching] = useState(true);
  const [flag, setFlag] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    productGetOne(pno)
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((e) => {
        exceptionHandle(e);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [pno]);

  const handleChangeProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onChangeUseDel = (e) => {
    const value = e.target.value === "true" ? true : false;
    setProduct({ ...product, delFlag: value });
  };

  //이미지 삭제 기능( 화면 이미지 삭제, uploadFileNames: [선택된 이미지명 삭제])
  const deleteImages = (imageName) => {
    //선택된 이미지 이름을 제외한 필터링
    const filterFileName = product.uploadFileNames.filter(
      (fileName) => fileName != imageName,
    );
    setProduct({ ...product, uploadFileNames: [...filterFileName] });
  };

  const handleClickModify = () => {
    setFetching(true);
    const files = uploadRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    formData.append("delFlag", product.delFlag);

    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", product.uploadFileNames[i]);
    }
    productPutOne(pno, formData)
      .then((data) => {
        setFetching(false);
        setTitle("SUCCESS");
        setContent(`${data.RESULT} 수정 성공`);
        setFlag(true);
      })
      .catch((e) => {
        setFetching(false);
        setTitle("FAIL");
        setContent(`${e} 수정에 실패`);
        setFlag(true);
        console.log(e);
      });
  };

  const closeModal = () => {
    setFlag(false);
    moveToProductList();
  };

  const handleClickDelete = () => {
    56;
    setFetching(true);
    productDeleteOne(pno)
      .then((data) => {
        setFetching(false);
        setTitle("SUCCESS");
        setContent(`${data.RESULT} 삭제 성공`);
        setFlag(true);
      })
      .catch((e) => {
        setFetching(false);
        setTitle("FAIL");
        setContent(`${e} 삭제에 실패`);
        setFlag(true);
        console.log(e);
      });
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
          <Form.Label>PNAME</Form.Label>
          <Form.Control
            name="pname"
            value={product.pname}
            type="text"
            placeholder="Enter name"
            onChange={handleChangeProduct}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>PRICE</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={product.price}
            placeholder="Enter price"
            onChange={handleChangeProduct}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>DESCRIPTION</Form.Label>
          <Form.Control
            name="pdesc"
            defaultValue={product.pdesc}
            as="textarea"
            rows={5}
            onChange={handleChangeProduct}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>DELETE</Form.Label>
          <Form.Select
            name="delFlag"
            value={product.delFlag ? "true" : "false"}
            onChange={onChangeUseDel}
          >
            <option value="false">사용</option>
            <option value="true">삭제</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Files</Form.Label>
          <Form.Control ref={uploadRef} type="file" multiple="true" />
        </Form.Group>
      </Form>
      <Row className="d-flex justify-content-center mt-5 gap-4">
        {product.uploadFileNames.map((imgFile, i) => (
          <>
            <Card style={{ width: "14rem", height: "14rem" }} key={i}>
              <Button variant="primary" onClick={() => deleteImages(imgFile)}>
                DELETE
              </Button>
              <Card.Body>
                <img
                  alt="img"
                  style={{ width: "10rem" }}
                  src={`${host}/api/products/view/s_${imgFile} `}
                />
              </Card.Body>
            </Card>
          </>
        ))}
      </Row>

      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleClickDelete}
        >
          DELETE
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={handleClickModify}
        >
          MODIFY
        </button>
        <button
          className="btn btn-primary"
          type="text"
          onClick={moveToProductList}
        >
          LIST
        </button>
      </div>
    </Container>
  );
};

export default ModifyComponent;
