import "../css/DiaryItem.css";
import Button from "./Button";
import { getEmotionImage } from "../util/get-emotion-image";

const DiaryItem = ({ id, emotionId, createdDate, content }) => {
  return (
    <div className="DiaryItem">
      <div className="img_section">
        <img src={getEmotionImage(emotionId)} />
      </div>
      179
      <div className="info_section">
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button text={"수정하기"} />
      </div>
    </div>
  );
};
export default DiaryItem;
