import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";

function App() {
  const nav = useNavigate();
  return (
    <>
      <div>
        <h1>페이지요청 LINK , NAV</h1>
        <Link to={"/"}>HOME </Link>
        <Link to={"/new"}>NEW </Link>
        <Link to={"/diary"}>DIARY </Link>
        <Link to={"/edit"}>EDIT </Link>
        <Link to={"/bsj"}>BSJ </Link>
        <h1>이벤트를 클릭해서 페이지 이동</h1>
        <button onClick={(e) => nav("/")}>HOME</button>
        <button onClick={(e) => nav("/new")}>NEW</button>
        <button onClick={(e) => nav("/diary")}>DIARY</button>
        <button onClick={(e) => nav("/edit")}>EDIT</button>
        <button onClick={(e) => nav("/*")}>BSJ</button>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new/*" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <h1>Footer</h1>
    </>
  );
}

export default App;
