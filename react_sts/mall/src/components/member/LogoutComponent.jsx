import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";

export default function LogoutComponent({ doLogout, moveToPath }) {
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    doLogout();
    alert("로그아웃되었습니다.");
    moveToPath("/");
  };

  return (
    <Container className="p-5">
      <Card className="text-center">
        <Card.Header>Logout Component</Card.Header>
        <Card.Body>
          <Card.Title>로그아웃을 진행합니다.</Card.Title>
          <div className="d-grid gap-2 mt-3">
            <Button variant="outline-primary" onClick={handleClickLogout}>
              로그아웃
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
