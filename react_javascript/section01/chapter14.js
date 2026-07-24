//배열의 내장함수 forEach
const arr = [1, 2, 3, 4];
const newArr = [];

for (const e of arr) {
  console.log(e);
  newArr.push(e * 2);
}

arr.forEach((e) => {
  console.log(e);
  newArr.push(e * 2);
});

console.log(newArr);

console.log("========================");
// [1]
let newArr2 = arr.map((e) => {
  e % 2 === 0 ? e * 2 : e * 3;
});

console.log(newArr2);

//[2]
newArr2 = arr.map((e) => (e % 2 === 0 ? e * 2 : e * 3));

console.log(newArr2);

//[1]과 [2]식은 같은것처럼 보이지만 {}안에 넣을경우 반드시 return을 해줘야 값이 들어간다.

//배열의 내장함수 includes : 배열속에 원하는 값이 있는지 찾는 함수
let number = 6;
let flag = false;
arr.forEach((e) => {
  if (e === number) {
    flag = true;
  }
});
console.log(flag);
//34~40번 문장들과 42번 문장이 의미와 결과가 같음
console.log(arr.includes(number));

//배열의 내장함수 indexOf 배열에서 찾고자 하는 값의 index를 출력
let index1 = -1;
let count1 = 0;
arr.forEach((e) => {
  if (e === number) {
    index1 = count1;
  }
  count1++;
});
console.log(index1);
//45~53번 문장들과 55번문장이 의미와 결과가 같음
console.log(arr.indexOf(number));

//배열의 내장함수 findIndex 배열에서 찾고자 하는 값의 index를 출력
let index2 = -1;
let count2 = 0;
arr.forEach((e) => {
  if (e === number) {
    index2 = count2;
  }
  count2++;
});
console.log(index2);
//58~66번 문장들과 68~69번 문장들이 의미와 결과가 같음
let index = arr.findIndex((e) => e === number);
console.log(index);

const arr2 = [
  { color: "red" },
  { color: "blue" },
  { color: "yellow" },
  { color: "white" },
];

let index3 = -1;
let count3 = 0;

arr2.forEach((e) => {
  if (e.color === "white") {
    index3 = count3;
  }
  count3++;
});
console.log(index3);
console.log(arr2[index3]);

let index4 = arr2.findIndex((e) => {
  return e.color === "white";
});

console.log(index4);
console.log(arr2[index4]);

//배열의 내장함수 find 배열에서 찾고자하는 값을 찾아서 반환
const arr3 = [
  { color: "red" },
  { color: "blue" },
  { color: "yellow" },
  { color: "white" },
];

let findObject = null;

arr3.forEach((e) => {
  if (e.color === "white") {
    findObject = e;
  }
});
console.log(findObject || "찾는객체가 없습니다.");

const findObject2 = arr3.find((e) => {
  return e.color === "white";
});
console.log(findObject2 || "찾으시는 객체가 없습니다.");

//배열의 내장함수 filter 배열에서 조건에 맞는 객체를 필터링하여 return
let arr4 = [
  { name: "구길동", hobby: "테니스" },
  { name: "저길동", hobby: "테니스" },
  { name: "홍길동", hobby: "독서" },
];

const filterArry = [];
arr4.forEach((e) => {
  if (e.hobby === "테니스") {
    filterArry.push(e);
  }
});
console.log(filterArry);
console.log(arr4.filter((e, index, arr) => e.hobby === "테니스"));

// map 배열의 모든 요소를 순회하면서 새로운 배열을 생성해서 반환
let arr5 = [
  { name: "구길동", hobby: "테니스" },
  { name: "저길동", hobby: "테니스" },
  { name: "홍길동", hobby: "독서" },
];

const nameArray = [];
arr5.forEach((e, index, ar) => nameArray.push(e.hobby));
console.log(nameArray);

console.log(arr5.map((e) => e.hobby));

console.log(
  arr5.map((e) => {
    return { hobby: e.hobby };
  }),
);

// 배열의 내장함수 slice
let arr6 = [
  { name: "구길동", hobby: "테니스" },
  { name: "저길동", hobby: "테니스" },
  { name: "홍길동1", hobby: "독서1" },
  { name: "홍길동2", hobby: "독서2" },
  { name: "홍길동3", hobby: "독서3" },
  { name: "홍길동4", hobby: "독서4" },
];

console.log(arr6.slice(0, 3));

//배열의 내장함수 concat 배열끼리 합치는 함수
let arr7 = [
  { name: "구길동", hobby: "테니스" },
  { name: "저길동", hobby: "테니스" },
  { name: "홍길동", hobby: "독서" },
];

let arr8 = [
  { name: "홍길동1", hobby: "독서" },
  { name: "홍길동2", hobby: "독서" },
];

const concatArray = arr7.concat(arr8);
console.log(concatArray);

//배열의 내장함수 sort 배열을 정렬하는 함수
let arr9 = ["나", "가", "라", "다"];

//arr9.sort();
//console.log(arr9);

const sortArray = arr9.toSorted();
const sortArray2 = arr9.toSorted().reverse();
console.log(sortArray);
console.log(sortArray2);

//숫자배열을 정렬할때에는 주의
let arr10 = [0, 1, 3, 2, 10, 30, 20];
arr10.sort();
console.log(arr10); //[0, 1, 10, 2, 20, 3, 30]

//숫자 정렬
arr10.sort((a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
});
console.log(arr10);
//숫자 역정렬
arr10.sort((a, b) => {
  if (a > b) {
    return -1;
  } else if (a < b) {
    return 1;
  } else {
    return 0;
  }
});
console.log(arr10);

//배열의 내장함수 join 배열을 한개의 문자열로 만들기
const arr11 = ["백성준", "님", "안녕하세요", "반가워요"];
console.log(arr11.join("/"));
