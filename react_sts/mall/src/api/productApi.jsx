import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";
//클라이언트 -> 서버 (5가지 method, 서버주소, port 번호, params, query string, body)

//서버 주소
// export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/products`;

//http://localhost:8080/api/products/{tno} get방식
export const productGetOne = async (pno) => {
  const res = await jwtAxios.get(`${prefix}/${pno}`);
  return res.data;
};

export const productGetList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

export const productPostAdd = async (product) => {
  //파일업로드 할때에는 기본값인  ‘Content-Type’: ‘application/json’을 ‘multipart/form-data’ 변경해야됨
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.post(`${prefix}`, product, header);
  return res.data;
};
export const productDeleteOne = async (pno) => {
  const res = await jwtAxios.delete(`${prefix}/${pno}`);
  return res.data;
};

export const productPutOne = async (pno, product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${prefix}/${pno}`, product, header);
  return res.data;
};
