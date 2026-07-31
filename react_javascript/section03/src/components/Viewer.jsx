const Viewer = ({ count = 0 }) => {
  return (
    <div>
      <div>현재 카운트 :</div>
      <h1>{count}</h1>
    </div>
  );
};
export default Viewer;
