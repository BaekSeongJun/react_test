import { useParams } from "react-router-dom";

useParams;
const Diary = () => {
  const params = useParams();
  return (
    <div>
      <h1>Diary {params.id}번 일기입니다.</h1>
    </div>
  );
};

export default Diary;
