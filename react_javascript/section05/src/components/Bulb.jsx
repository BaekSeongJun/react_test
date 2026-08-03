const Bulb = ({ light }) => {
  console.log(light);
  return (
    <>
      <div>
        <h1>전구상태{light}</h1>
      </div>
    </>
  );
};

export default Bulb;
