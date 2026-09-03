import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
const rest_api_key = "315f57314432ef552f95c4a8247a5a78";
const redirect_uri = "http://localhost:5173/member/kakao";
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";

//https://kauth.kako.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code

//client_id
//redirect_uri
//response_type

//엑세스 토큰 얻기
const access_token_uri = `https://kauth.kakao.com/oauth/token`;
//보안코드 활성화시 사용
//const client_secret = `12shfjshfsisfjis- - - - hdfsahdf435g`;

export const getKakaoLoginLink = () => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

export const getAccessToken = async (authCode) => {
  const header = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
    //client_secret: client_secret
  };

  const res = await axios.post(access_token_uri, params, header);
  const accessToken = res.data.access_token;
  return accessToken;
};

export const getMemberWithAccessToken = async (accessToken) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`,
  );
  return res.data;
};
