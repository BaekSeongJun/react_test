import axios from "axios";

//클라이언트 -> 서버 (5가지 method, 서버주소, port 번호, params, query string, body)

//서버 주소
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/todo`;

//http://localhost:8080/api/todo/{tno} get방식
export const getOne = async (tno) => {
  const res = await axios.get(`${prefix}/${tno}`);
  return res.data;
};
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};
