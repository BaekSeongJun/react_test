import { useEffect } from "react";

const Even = () => {
  //마운트, 언마운트 될때 작동
  useEffect(() => {
    //마운트 콜
    console.log(`Even Monut`);

    return () => {
      console.log(`Even UnMonut`);
    };
  }, []);

  return (
    <>
      <div>
        <h1>짝수입니다.</h1>
      </div>
    </>
  );
};

export default Even;
