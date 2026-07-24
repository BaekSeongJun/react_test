// 1. 객체 생성
let obj1 = new Object(); // 객체 생성자
let obj2 = {}; // 객체 리터럴 (대부분 사용)

// 2. 객체 프로퍼티 (객체 속성)
let person = {
  name: "홍길동",
  age: 30,
  gender: false,
  hobby: "축구",
  job: "Developer",
  extra: {
    ext1: 10,
    ext2: "str",
    ext3: false,
  }, //객체도 들어올수 있음
  extra2: function () {
    console.log(this.age + "살");
  }, //함수도 들어올수 있음
  extra3: [1, 2, 3, 4, 5],
  extra4: () => {
    console.log("person의 extra4");
  },
  "like cat": true, //한칸띄는 변수가 있으면 “”
};

// 3. 객체 프로퍼티를 다루는 방법
// 3.1 특정 프로퍼티에 접근 (점 표기법, 대괄호 표기법)
console.log(person.age);
console.log(person["age"]); // " "이나 ' '을 써도 됨
console.log(person.extra["ext1"]);
console.log(person["like cat"]);
// console.log(person."like cat"); //이거는 안됨, 이런상황때문에 대괄호 표기법을 사용함
console.log(person.extra3[0]);

person.extra2();
person.extra4();

//객체 property setter
person.name = "아무개";
console.log(person.name);
person["name"] = "저길동";
console.log(person.name);

//객체 property 삭제
delete person.age;
delete person["hobby"];
console.log(person);

//객체 속에 property가 존재하는지 체크(in)
let result1 = "name" in person;
console.log(result1);
let result2 = "hobby" in person;
console.log(result2);

//객체 속에 property를 추가
console.log("age" in person);
person.age = 30;
console.log("age" in person);
