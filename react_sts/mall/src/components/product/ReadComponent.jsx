import { useEffect, useState, useRef } from "react";
import { productGetOne } from "../../api/productApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FetchingModal from "../commons/FetchingModal";
import { exceptionHandle } from "../commons/exceptionHandle";
import useCustomCart from "../../hooks/useCustomCart";
import UseCustomLogin from "../../hooks/UseCustomLogin";
import { useNavigate } from "react-router-dom";

const initState = {
  pno: 0,
  pname: "",
  price: 0,
  pdesc: "",
  files: [],
  uploadFileNames: [],
};
const host = API_SERVER_HOST;

const ReadComponent = ({ pno, moveToProductList, moveToProductModify }) => {
  const [product, setProduct] = useState(initState);
  const [fetching, setFetching] = useState(true);
  const { changeCart, cartItems } = useCustomCart();
  const { loginState } = UseCustomLogin();
  const navigate = useNavigate();

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

  const handleClickAddCart = () => {
    let qty = 1;
    const itemArr = cartItems.filter(
      (item) => parseInt(item.pno) === parseInt(pno),
    );
    const addItem = itemArr[0];
    if (addItem) {
      const flag = window.confirm(
        "고객님 이미 추가된 상품입니다. 갯수를 더 추가하시겠습니까?",
      );
      if (flag === false) {
        return;
      }
      qty = addItem.qty + 1;
    }
    changeCart({ email: loginState.email, pno: pno, qty: qty });
    navigate({
      pathname: "/cart/read",
    });
  };
  return (
    <Container className="p-5">
      {fetching ? <FetchingModal /> : <></>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>PNO</Form.Label>
          <Form.Control
            value={pno}
            type="text"
            placeholder="Enter pno"
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>PNAME</Form.Label>
          <Form.Control
            value={product.pname}
            type="text"
            placeholder="Enter name"
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>PRICE</Form.Label>
          <Form.Control
            type="text"
            value={product.price + "원"}
            placeholder="Enter price"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>DESCRIPTION</Form.Label>
          <Form.Control
            type="text"
            value={product.pdesc}
            placeholder="Enter price"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-center">
          {product.uploadFileNames.map((imgFile, i) => (
            <img
              alt="product"
              key={i}
              style={{ width: "14rem", height: "14rem", marginLeft: "10px" }}
              src={`${host}/api/products/view/s_${imgFile}`}
            />
          ))}
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            moveToProductModify(pno);
          }}
        >
          수정하기
        </button>
        <button
          className="btn btn-info"
          type="button"
          onClick={() => {
            moveToProductList();
          }}
        >
          리스트보기
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleClickAddCart}
        >
          장바구니담기
        </button>
      </div>
    </Container>
  );
};

export default ReadComponent;
