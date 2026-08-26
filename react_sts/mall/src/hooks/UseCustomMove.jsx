import { useState, useCallback } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";

// 컴포넌트 콜 :  : 쿼리스트링을 받고(page,size), 이벤트 기능 : movoToList, movoToModify, moveToRead
//값과 함수를 리턴한다.
const UseCustomMove = () => {
  const { tno, pno } = useParams();
  const nav = useNavigate();
  //내가 컴포넌트를 다시 refresh
  const [refresh, setRefresh] = useState(false);
  //todo/read?page=1&size=10
  const [queryParams] = useSearchParams();
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;
  const queryDefault = createSearchParams({ page, size }).toString();

  const moveToList = (pageParam) => {
    let queryStr;
    if (pageParam) {
      const pageNum = pageParam.page ? parseInt(pageParam.page) : page;
      const sizeNum = pageParam.size ? parseInt(pageParam.size) : size;
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }

    nav({
      pathname: `../todo/list`,
      search: queryStr,
    });

    setRefresh(!refresh); //컴퓨넌트 데이터 변함에 의해서 작동이 되는것이 아니라 개발자에 의해서 작동
  };

  const moveToModify = useCallback(
    (tno) => {
      console.log(queryDefault);
      nav({
        pathname: `../todo/modify/${tno}`,
        search: queryDefault, //수정시에 기존의 쿼리 스트링 유지를 위해
      });
    },
    [nav, queryDefault],
  );

  const moveToRead = useCallback(
    (tno) => {
      nav({
        pathname: `../todo/read/${tno}`,
        search: queryDefault, //수정시에 기존의 쿼리 스트링 유지를 위해
      });
    },
    [nav, queryDefault],
  );

  const moveToProductList = (pageParam) => {
    let queryStr = "";
    if (pageParam) {
      const pageNum = pageParam.page ? parseInt(pageParam.page) : page;
      const sizeNum = pageParam.size ? parseInt(pageParam.size) : size;
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }
    nav({
      pathname: `../product/list`,
      search: queryStr,
    });

    setRefresh(!refresh); //추가
  };

  const moveToProductRead = useCallback(
    (pno) => {
      nav({
        pathname: `../product/read/${pno}`,
        search: queryDefault, //수정시에 기존의 쿼리 스트링 유지를 위해
      });
    },
    [nav, queryDefault],
  );

  const moveToProductModify = useCallback(
    (pno) => {
      console.log(queryDefault);
      nav({
        pathname: `../product/modify/${pno}`,
        search: queryDefault, //수정시에 기존의 쿼리 스트링 유지를 위해
      });
    },
    [nav, queryDefault],
  );

  return {
    moveToList,
    moveToModify,
    moveToRead,
    moveToProductList,
    moveToProductRead,
    moveToProductModify,
    page,
    size,
    tno,
    pno,
    nav,
    refresh,
  }; //moveToModify 추가
};

export default UseCustomMove;
