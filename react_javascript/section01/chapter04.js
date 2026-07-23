// 1. 묵시적 형 변환
//자바스크립트 엔진이 알아서 형 변환

let num = 10;
let str = "20";

const result = num + str;
console.log(result);

let numberA = 12;
let numberB = "2";
console.log(numberA * numberB); //24

numberA = 12;
numberB = "2a";
console.log(numberA * numberB); //NaN

numberA = 12;
numberB = "2";
console.log(numberA + numberB); //”122”

// 2. 명시적 형 변환
//프로그래머가 내장함수 등을 이용해서 직접 형 변환을 명시
//문자열 -> 숫자
let str1 = "10";
let strToNum1 = Number(str1);
console.log(10 + strToNum1); //20 출력

let str2 = "10개";
let strToNum2 = Number(str2); // NaN 출력이된다. 이럴때는 parseInt() 사용할것
console.log(strToNum2);
let strToNum3 = parseInt(str2);
console.log(strToNum3); //10 출력
//숫자 -> 문자열
let num1 = 20;
let numToStr1 = String(num1);
console.log(numToStr1 + "입니다"); //20입니다
