// 1. 콜백함수
//함수선언문(호이스팅)
function checkMod(mood, goodCallBack, badCallBack) {
  if (mood == "good") {
    goodCallBack();
  } else {
    badCallBack();
  }
}
/*
//함수선언문
function sing() {
  console.log("노래를 부릅니다.");
}


function cry() {
  console.log("노래를 부르지 못하여 울고 있습니다.");
}
  
function dance() {
  console.log("춤을 추고 있습니다.");
}
checkMod("good",dance,cry);
*/
checkMod(
  "good",
  () => console.log("노래를 부르고 춤까지 춥니다."),
  () => console.log("기분이 안 좋아요"),
);

checkMod(
  "sad",
  () => console.log("노래를 부릅니다."),
  () => console.log("기분이 안 좋아요"),
);

//2.콜백함수 응용방법
function repeat(count, callBack) {
  for (let index = 0; index < count; index++) {
    callBack(index);
  }
}

repeat(5, (idx) => console.log("화이팅" + idx));
repeat(4, (idx) => console.log("아자아자" + idx * 3));
