import { useSearchParams } from "react-router-dom";

const New = () => {
  const [params, setParams] = useSearchParams();

  return (
    <div>
      <h1>New {params.get("name")}님 반갑습니다.</h1>
      <h1>{params.get("age")}</h1>
    </div>
  );
};

export default New;
