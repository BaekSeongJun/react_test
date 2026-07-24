//객체를 순회해서 출력하기
const person = {
  name: "백성준",
  age: 25,
  tall: 179,
};

console.log(person);

//객체에 키값을 배열로 가져와서 출력
let keyArray = Object.keys(person);
let valueAraay = Object.values(person);
console.log(keyArray);

keyArray.forEach((e) => {
  console.log(person[e]);
});
valueAraay.forEach((e) => {
  console.log(`${e} : ${typeof e}`);
});

for (const e of keyArray) {
  console.log(`${e} : ${person[e]}`);
}

for (const e of valueAraay) {
  console.log(`${e} : ${typeof e}`);
}

Object.keys(person).forEach((e) => {
  `${e} : ${person[e]}`;
});

Object.values(person).forEach((e) => {
  `${e} : ${typeof e} `;
});
