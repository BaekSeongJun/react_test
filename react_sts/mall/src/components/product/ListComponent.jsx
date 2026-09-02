import { productGetList } from "../../api/productApi";
import { useState, useEffect } from "react";
import { Container, Card, Row } from "react-bootstrap";
import PageComponent from "../commons/PageComponent";
import { API_SERVER_HOST } from "../../api/todoApi";
import FetchingModal from "../commons/FetchingModal";
import { exceptionHandle } from "../commons/exceptionHandle";

const host = API_SERVER_HOST;
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

const ListComponent = ({
  page,
  size,
  moveToProductList,
  moveToProductRead,
  exceptionHandle,
  refresh,
}) => {
  const [serverData, setServerData] = useState(initState);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    productGetList({ page, size })
      .then((data) => {
        setServerData(data);
      })
      .catch((e) => {
        exceptionHandle(e);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [page, size, refresh]);

  return (
    <>
      <Container className="px-5 justify-content-center mb-5">
        {fetching ? <FetchingModal /> : <></>}
        <Row className="display-content-around mt-5 gap-4">
          {serverData.dtoList.map((product) => (
            <>
              <Card
                className="p-3"
                style={{ width: "14rem", height: "20rem" }}
                key={product.pno}
                onClick={() => moveToProductRead(product.pno)}
              >
                <Card.Body>
                  <Card.Title>PNO :{product.pno}</Card.Title>
                  <Card.Title>NAME : {product.pname}</Card.Title>
                  <Card.Title>PRICE : {product.price}원</Card.Title>
                  <Card.Text></Card.Text>
                </Card.Body>
                <img
                  alt="product"
                  width={150}
                  height={150}
                  src={`${host}/api/products/view/s_${product.uploadFileNames[0]} `}
                />
              </Card>
            </>
          ))}
        </Row>
        <PageComponent serverData={serverData} moveToList={moveToProductList} />
      </Container>
    </>
  );
};
export default ListComponent;
