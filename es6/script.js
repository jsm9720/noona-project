// 1번 문제
let name="noona's fruit store"
let fruits = ["banana","apple","mango"]
let address="Seoul"

let store = {name, fruits, address}
console.log(store)

// -----------------------------------------
// 2번 문제

console.log(`제 가게 이름은 ${store.name}입니다. 위치는 ${store.address}에 있습니다`)

// -----------------------------------------
// 3번 문제 (Destructoring)

function calculate(obj){
    let {a, b, c} = obj;
    return a+b+c
}

console.log(calculate({a:1,b:2,c:3}))

// -----------------------------------------
// 4번 문제 (true 나오게 하시오)

let name_4="noona store"
let fruits_4 = ["banana","apple","mango"]
let address_4={
    country:"Korea",
    city:"Seoul"
}

function findStore(obj){
    return obj.name_4==="noona store" && obj.address_4.city === "Seoul"
}
console.log(findStore({name_4,fruits_4,address_4}))

// -----------------------------------------
// 5번 문제 (true 나오게 하시오)

function getNumber(){
    let array = [1,2,3,4,5,6]    // 여기서부터 바꾸시오
    let [first, second, third, forth, ...rest] = array
    return {first,third,forth}
}
console.log(getNumber()) //  결과값 { first: 1, third: 3, forth: 4 }

// -----------------------------------------
// 6번 문제 (true 나오게 하시오)

function getCalendar(first, ...rest) {
  return (
    first === "January" &&
    rest[0] === "Febuary" &&
    rest[1] === "March" &&
    rest[2] === undefined
  );
}
console.log(getCalendar("January", "Febuary", "March")); // 여기를 바꾸시오

// -----------------------------------------
// 7번 문제 (두 어레이들중 최소값을 찾는 함수)
function getMinimum(){
    let a = [45,23,78]
    let b = [54,11,9]
    return Math.min(...a,...b) // 여기를 바꾸시오
}
console.log(getMinimum())

// -----------------------------------------
// 8번 문제 (화살표 함수)
function sumNumber() {
  // 여기서부터 바꾸시오
  const sum = (a, b) => {
    return a + b;
  };
  return sum(40, 10);
}
console.log(sumNumber())

// -----------------------------------------
// 9번 문제 (화살표 함수)
function sumNumber() {
  //여기 아래부분 함수 정의를 바꾸시오 
    let addNumber = (a) =>{
        return (b) => {
            return (c) => {
                return a+b+c;
            }
        }
    }
    return addNumber(1)(2)(3);
}
console.log(sumNumber());
