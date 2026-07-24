//6가지의 요소 조작 메서드
//1.push
// 배열의 맨 뒤에 새로운 요소를 추가하는 메서드
let arr1 = [1, 2, 3];
arr1.push(4);
const newLength = arr1.push(5, 6, 7);
console.log(arr1);

//2.pop
//배열의 맨뒤에 있는 요소를 제거하고, 반환
let arr2 = [1, 2, 3];
console.log(arr2.pop());
console.log(arr2);

// 3. Shift(pop보다 속도가 느리다)
// 배열의 맨 앞에 있는 요소를 제거, 반환
let arr3 = [1, 2, 3];
const shiftedItem = arr3.shift();
console.log(shiftedItem);

// 4. Unshift(push 보다 속도가 느리다)
// 배열의 맨 앞에 새로운 요소를 추가하는 메서드
let arr4 = [1, 2, 3];
const newLength2 = arr4.unshift(0); //변경된 배열의 길이를 반환한다.
console.log(arr4);
// 0, 1, 2, 3
