import { useEffect, useMemo } from "react";
import { Table, Container } from "react-bootstrap";
import CartItemComponent from "./CarItemComponent";
import UseCustomMove from "../../hooks/UseCustomMove";

const CartComponent = ({
  isLogin,
  loginState,
  refreshCart,
  cartItems,
  changeCart,
}) => {
  useEffect(() => {
    if (isLogin) {
      refreshCart();
    }
  }, [isLogin]);

  const { moveToProductList } = UseCustomMove();
  const caculateTotal = useMemo(() => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.qty;
    }
    return total;
  }, [cartItems]);

  return (
    <Container className="mt-5">
      <h2>🛒 장바구니</h2>
      {isLogin ? (
        <h4>
          {loginState.nickname}'s Cart {cartItems.length}
        </h4>
      ) : (
        <></>
      )}
      <Table striped bordered hover responsive>
        <thead className="text-center">
          <tr>
            <th>이미지</th>
            <th>상품번호</th>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>관리</th>
            <th>합계</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <CartItemComponent
              {...item}
              key={item.cino}
              changeCart={changeCart}
              email={loginState.email}
            />
          ))}
        </tbody>
      </Table>
      <h4>총 합계: {caculateTotal} 원</h4>
      <div className="text-center">
        <button
          className="btn btn-info"
          type="button"
          onClick={() => {
            moveToProductList();
          }}
        >
          리스트보기
        </button>
      </div>
    </Container>
  );
};

export default CartComponent;
