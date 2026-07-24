// 1. 배열 생성
let arrA = new Array(); // 배열 생성자
let arrB = []; // 배열 리터럴 (대부분 사용)
//배열에 올수 있는 타입들
let arrC = [1, 2, 3, true, "hello", null, undefined, () => {}, {}, []];

//배열 요소 접근 출력
console.log(arrC[0]);

arrC[0] = "abcd";
console.log(arrC[0]);

arrC.push(6);
arrC.push({ name: "bsj" });
console.log(arrC);
