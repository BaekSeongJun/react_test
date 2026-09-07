import { useEffect } from "react";
import UseCustomLogin from "../../hooks/UseCustomLogin";
import { Table, Container } from "react-bootstrap";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "./CarItemComponent";

const CartComponent = () => {
  const { isLogin, loginState } = UseCustomLogin();
  const { refreshCart, cartItems, changeCart } = useCustomCart();

  useEffect(() => {
    if (isLogin) {
      refreshCart();
    }
  }, [isLogin]);

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
      <h4>총 합계: {} 원</h4>
    </Container>
  );
};

export default CartComponent;
