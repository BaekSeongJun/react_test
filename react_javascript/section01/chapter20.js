// JSON.stringfy => JSON 방식을 String으로 변환할때 사용

let object1 = { name: "제우스", age: 40 };
let object2 = { ...object1, hobby: "축구" };
let object3 = object1;

if (object1 === object2) {
  console.log("얕은 복사");
} else {
  console.log("깊은 복사");
}

console.log(JSON.stringify(object1) + "문자열 입니다.");

if (JSON.stringify(object1) === JSON.stringify(object2)) {
  console.log("같은 객체");
} else {
  console.log("다른 객체");
}
