//1. 비동기 처리방식 Promise

function task(a, b, callBack) {
  setTimeout(() => {
    let sum = a + b;
    callBack(sum);
  }, 1000);
}

const promise = new Promise((a, b, callBack) => {
  setTimeout(() => {
    let sum = a + b;
    callBack(sum);
  }, 1000);
});
