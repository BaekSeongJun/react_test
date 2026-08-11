import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { DiaryStateContext } from "../App";
import { useContext } from "react";

const Home = () => {
  const data = useContext(DiaryStateContext);
  return (
    <div>
      <Header
        leftChild={<Button text={"<"} />}
        title={"2026년 8월 6일"}
        rightChild={<Button text={">"} />}
      />
      <DiaryList data={data} />
    </div>
  );
};

export default Home;
