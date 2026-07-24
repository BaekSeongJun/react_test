// 1. Falsy한 값
let f1 = undefined;
let f2 = null;
let f3 = 0;
let f4 = 0.0;
let f5 = NaN;
let f6 = "";
let f7 = false;

// 2. Truthy 한 값
// -> 7가지 Falsy 한 값들 제외한 나머지 모든 값
let t1 = "hello";
let t2 = 123;
let t3 = [];
let t4 = {};
let t5 = () => {};

// 3. 활용사례:이름을 가져오는 방법에서 객체가 아닐 때 해결하는 방법
function printName(person) {
  if (!person) {
    console.log("person의 값이 없음");
    return;
  }
  console.log(person.name);
}

function printName2(person) {
  console.log((person && person.name) || "person name 값이 없음");
}

let person = { name: "홍길동" };
printName(person);
printName2(person);
printName2();
