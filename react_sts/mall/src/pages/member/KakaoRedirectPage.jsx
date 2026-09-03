import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import UseCustomLogin from "../../hooks/UseCustomLogin";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");
  const dispatch = useDispatch();
  const { moveToPath } = UseCustomLogin();

  useEffect(() => {
    getAccessToken(authCode).then((accessToken) => {
      console.log(accessToken);
      getMemberWithAccessToken(accessToken).then((memberInfo) => {
        dispatch(login(memberInfo));
        console.log("-------------");
        console.log(memberInfo);
        if (memberInfo && !memberInfo.social) {
          moveToPath("/");
        } else {
          moveToPath("/member/modify");
        }
      });
    });
  }, [authCode, dispatch, moveToPath]);
  return (
    <div>
      <div>Kakao Login Redirect</div>
      <div>{authCode}</div>
    </div>
  );
};
export default KakaoRedirectPage;
