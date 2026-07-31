// 버튼색상 color, 버튼내용 text
const Button = ({ color = "black", text = "zeus", size, children }) => {
  //이벤트처리함수
  const onClickButton = () => {
    alert(text);
  };

  return (
    <>
      <button
        onClick={onClickButton}
        style={{
          color: color,
          width: "200px",
          margin: "0 auto",
          fontSize: size,
        }}
      >
        {text} {size} {children}
      </button>
    </>
  );
};

export default Button;
