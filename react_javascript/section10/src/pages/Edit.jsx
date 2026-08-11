import { useParams } from "react-router-dom";

const Edit = () => {
  const params = useParams();
  return (
    <div>
      <h1>Edit {params.id} 편집합니다</h1>
    </div>
  );
};

export default Edit;
