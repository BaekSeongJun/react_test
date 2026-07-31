import { useState } from "react";

const Register = () => {
  //상태값 변화 : name, birth, coutry, bio
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");

  return (
    <>
      <div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
          />
        </div>

        <div>
          <input
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </div>

        <div>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value=""></option>
            <option value="kr">한국</option>
            <option value="us">미국</option>
            <option value="uk">영국</option>
          </select>
        </div>

        <div>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
      </div>
    </>
  );
};

export default Register;
