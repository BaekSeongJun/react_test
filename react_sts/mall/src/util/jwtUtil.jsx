import axios from "axios";
import { getCookie } from "./cookieUtil";

const jwtAxios = axios.create();
//before request  요청 보내기 전에 추가작업(쿠키의 정보를 가져와서 Acess Token 전달)
const beforeReq = (config) => {
  console.log("before request .......................................... ");
  const memberInfo = getCookie("member");

  //회원정보가 없으면 에러메세지를 발생시킨다
  if (!memberInfo) {
    console.log("Member NOT FOUND");
    return Promise.reject({
      response: {
        data: { error: "REQUIRE_LOGIN" },
      },
    });
  } //end of if
  const { accessToken } = memberInfo;
  // Authorization 헤더 처리
  config.headers.Authorization = `Bearer  ${accessToken}`;
  return config;
};
//fail request  요청 보내기 하다가 실패했을 때 추가작업
const requestFail = (err) => {
  console.log("request error. ........................................ ");
  return Promise.reject(err);
};

//before return response 성공적인 응답이 왔을 때 추가 작업
const beforeRes = async (res) => {
  console.log(
    "before return response .......................................... ",
  );
  return res;
};

//fail response 성공적인 응답이 실패했을때 추가작업
const responseFail = (err) => {
  console.log(
    "response fail error. ............................................... ",
  );
  return Promise.reject(err);
};

//jwtAxios 인터셉터(interceptors) 걸어서 반환을 한다.
jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);
export default jwtAxios;
