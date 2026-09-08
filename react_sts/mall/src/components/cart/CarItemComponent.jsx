import { Button, Image } from "react-bootstrap";
import { API_SERVER_HOST } from "../../api/todoApi";
import UseCustomMove from "../../hooks/UseCustomMove";

const host = API_SERVER_HOST;

const CartItemComponent = ({
  cino,
  pname,
  price,
  pno,
  qty,
  imageFile,
  changeCart,
  email,
}) => {
  const { page, size, moveToProductRead } = UseCustomMove();

  const handleClickQty = (amount) => {
    const param = { email, cino: cino, pno: pno, qty: qty + amount };
    changeCart(param);
  };

  return (
    <>
      <tr key={cino}>
        <td className="text-center">
          <Image
            src={`${host}/api/products/view/s_${imageFile}`}
            roundedCircle
            className="border shadow-sm"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => moveToProductRead(pno)}
          />
        </td>
        <td className="text-center align-middle">{cino}</td>
        <td className="text-center align-middle">{pname}</td>
        <td className="text-center align-middle">{price}원</td>
        <td className="text-center align-middle">{qty} EA</td>
        <td className="text-center align-middle">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleClickQty(-1)}
          >
            감소
          </Button>{" "}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleClickQty(1)}
          >
            증가
          </Button>
        </td>
        <td className="text-center align-middle">({price * qty})원</td>
        <td className="text-center align-middle">
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleClickQty(-1 * qty)}
          >
            삭제
          </Button>
        </td>
      </tr>
    </>
  );
};
export default CartItemComponent;
