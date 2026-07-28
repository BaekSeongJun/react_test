//1.얕은복사
let arr1 = [1, 2, 3];
let arr2 = arr1;
console.log(arr1);
console.log(arr2);
if (arr1 === arr2) {
  console.log("얕은복사");
}

//2.깊은 복사
let arr3 = [1, 2, 3];
let arr4 = [...arr3]; //[1,2,3]
arr3 == arr4 ? console.log("얕은 복사") : console.log("깊은 복사");

// 2. Spread 연산자(객체)
let obj1 = {
  a: 1,
  b: 2,
};

let obj2 = {
  a: obj1.a,
  b: obj1.b,
  c: 3,
  d: 4,
};

let obj3 = {
  ...obj2,
  c: 3,
  d: 4,
};

console.log(obj2);
console.log(obj3);

// 3. Spread 연산자(함수매개변수)
function funcA(p1, p2, p3, p4 = 10) {
  console.log(p1, p2, p3, p4);
}
let arr5 = [1, 2, 3];
funcA(...arr5);

function funcB([p1, p2, p3, p4 = 10]) {
  console.log(p1, p2, p3, p4);
}
funcB(arr5);

// 4. rest 매개변수
// rest는 나머지 , 나머지 매개변수
arr6 = [1, 2, 3];
function funcC(one, ...rest) {
  console.log(one); //[2, 3] 출력
  console.log(rest); //[2, 3] 출력
  console.log(...rest); //[2, 3] 출력
}
funcC(...arr6);

// //주의: rest매개변수 뒤에는 추가로 다른 변수가 올수 없다.
// function funcD(one, ...ds, as) {  //as 추가로 올 수 없다
//   console.log(ds);
// }
