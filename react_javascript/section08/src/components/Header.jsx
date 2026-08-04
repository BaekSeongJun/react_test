import "../css/Header.css";
import { memo } from "react";
const Header = () => {
  return (
    <div>
      <div className="Header">
        <h3>오늘의 📅</h3>
        <h1>{new Date().toDateString()}</h1>
      </div>
    </div>
  );
};
export default memo(Header);
