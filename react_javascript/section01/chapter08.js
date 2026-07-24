//전역변수, 지역변수
let a = 1;

function funcA() {
  let a = 3;
  let b = 2;
  console.log(a);
  //지역 함수 선언
  function funcB(index) {
    console.log("지역함수선언" + index);
  }
  funcB(10);
}

funcA();
console.log(a);
// console.log(b); // error

//모든 블럭에 들어있는 변수 선언은 다 지역변수이다.
//매개 변수 다 지역변수

if (true) {
  let c = 10;
  console.log(c);
}
// console.log(c); // error

for (let index = 0; index < 10; index++) {
  let count = 1;
  count += index;
  console.log(count);
}
// console.log(count); // error
// console.log(index); // error
// funcB(50); // error 지역함수도 지역변수랑 마찬가지로 밖에서는 부를 수 없다.
