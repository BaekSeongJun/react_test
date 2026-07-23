//함수 호이스팅 기능
//함수 호이스팅은 함수 선언문에만 작동이 된다.
//함수 호이스팅은 함수표현식(익명함수, 화살표 함수)에서는 동작하지 않는다.
//함수 호이스팅 : 자바스크립트 엔진이 코드를 실행하기 전, 함수 선언문을 유효 범위의 최상단으로 끌어올리는 것처럼 동작하는 메커니즘
// 이로 인해 함수가 선언된 위치보다 앞선 코드에서도 해당 함수를 호출하고 실행할 수 있다.

// console.log(helloA()); // 이런 순서면 error 함수표현식은 호이스팅이 일어나지 않아서
// 문장의 위치가 중요함.
console.log(helloB());
// console.log(helloC()); // 마찬가지의 이유로 error

let helloA = function () {
  return "함수표현식에 익명함수입니다.";
};
console.log(helloA()); //무조건 표현식보다 뒤에 작성

function helloB() {
  return "함수선언문 함수입니다.";
}

let helloC = () => "함수표현식에 화살표 함수입니다.";
console.log(helloC());
