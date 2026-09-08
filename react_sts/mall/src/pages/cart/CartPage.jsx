import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import CartComponent from "../../components/cart/CartComponent";
import UseCustomLogin from "../../hooks/UseCustomLogin";
import useCustomCart from "../../hooks/useCustomCart";

const CartPage = () => {
  const { isLogin, loginState } = UseCustomLogin();
  const { refreshCart, cartItems, changeCart } = useCustomCart();

  return (
    <Container>
      <Header />
      <div className="d-grid mt-3">
        <CartComponent
          isLogin={isLogin}
          loginState={loginState}
          refreshCart={refreshCart}
          cartItems={cartItems}
          changeCart={changeCart}
        />
      </div>
    </Container>
  );
};
export default CartPage;
