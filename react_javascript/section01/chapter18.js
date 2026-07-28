// 1. 배열의 구조 분해 할당
let arr = [1, 2, 3];
let [one, two, three, four = 4] = arr;
console.log(one, two, three, four);

// 2. 객체의 구조 분해 할당(변수명은 반드시 키값과 같게 해야한다.)
let person = {
  name: "홍길동",
  age: 27,
  hobby: "테니스",
};

let { age: myAge, hobby, name, extra = "hello" } = person;
console.log(myAge, name, hobby, extra);

// 3. 객체 구조 분해 할당을 이용해서 함수의 매개변수를 받는 방법
const func = ({ name, age: extra2, hobby = 축구, extra = "hello" }) => {
  console.log(name, hobby, extra, extra2);
};

func(person);

// 4. 배열 구조 분해 할당을 이용해서 함수의 매개변수를 받는 방법
const func2 = ([name, age, hobby = 축구, extra = "hello"]) => {
  console.log(name, hobby, extra, age);
};

func2(arr);
