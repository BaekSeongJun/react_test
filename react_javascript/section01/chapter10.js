//1.상수 객체
const animal = {
  type: "고양이",
  name: "나비",
  color: "black",
  //메서드 선언
  func1() {
    console.log(`${this.name}`);
  },
  //익명 함수
  func2: function () {
    console.log(`${this.name}`);
  },
  //화살표 함수 (주의 화살표 함수에서는 this가 먹히지 않는다)
  func3: () => {
    console.log(`${animal.name}`);
  },
};

/* 상수 변수에는 다른 객체를 재선언하면 안된다.
animal = {
  type : "나비"
}; */

//animal 객체에 있는 proptery 수정, 삽입, 삭제는 모두 가능
animal.age = 5;
animal.name = "나비2";
animal.color = 123456;
delete animal["type"];
console.log(animal);
console.log(typeof animal.color);

animal.func1();
animal.func2();
animal.func3();
