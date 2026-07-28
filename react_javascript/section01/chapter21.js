//1.함수 선언식
function task(a, b, callBack) {
  setTimeout(() => {
    let sum = a + b;
    callBack(sum);
    // console.log(a + b);
  }, 1000);
}

//비동기식으로 프로그램 실행
console.log(1);

//비동기식 처리방식을 요청(WEB API : 시간/ms, () => {})
// setTimeout(() => {
//   console.log(2);
// }, 1000);
// task(10, 20, (sum) => {
//   console.log(sum);
// });

console.log(3);

// function callBack(sum) {
//   console.log(sum);
// }

//2. 비동기 방식으로 1단계 : 음식을 주문하는 상황
function orderFood(food, callBack) {
  console.log(`스프링 부트에 음식을 주문합니다 : ${food}`);
  setTimeout(() => {
    callBack(food);
  }, 2000);
}

// orderFood("백숙", (food) => {
//   console.log(`${food} 음식을 완료했습니다.`);
// });

// function callBack(food) {
//   console.log(`${food} 음식을 완료했습니다.`);
// }

//3. 비동기 방식으로 1단계 : 음식을 차게요청하는 상황
function coolFood(food, callBack) {
  console.log(`스프링 부트에 음식을 차게 해주세요 : ${food}`);
  setTimeout(() => {
    callBack(food);
  }, 2000);
}

// coolFood("뜨거운 백숙", (food) => {
//   console.log(`${food} 음식을 차갑게 만들었습니다.`);
// });

//4. 비동기 방식으로 1단계 : 음식을 냉동시키는 상황
function freezeFood(food, callBack) {
  console.log(`스프링 부트에 음식을 냉동시켜주세요 : ${food}`);
  setTimeout(() => {
    callBack(food);
  }, 2000);
}

// freezeFood("차가운 백숙", (food) => {
//   console.log(`${food}를 냉동시켰습니다.`);
// });

//5. 비동기 방식으로 2단계 : 백숙 -> 뜨거운 백숙 -> 차가운 백숙으로 주문을 변경하는 상황

orderFood("백숙", (food) => {
  console.log(`${food} 음식을 완료했습니다.`);
  coolFood("뜨거운 " + food, (food) => {
    console.log(`${food} 음식을 차갑게 만들었습니다.`);
  });
});

//6. 비동기 방식으로 3단계 : 백숙 => 뜨거운 백숙 => 차가운백숙 => 냉동 백숙으로 주문을 변경하는 상황

orderFood("백숙", (food) => {
  console.log(`${food} 음식을 완료했습니다.`);
  coolFood("뜨거운 " + food, (food) => {
    console.log(`${food} 음식을 차갑게 만들었습니다.`);
    freezeFood("차가운 " + food, (food) => {
      console.log(`${food}를 냉동시켰습니다.`);
    });
  });
});
