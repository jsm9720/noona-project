let names = [
  "Steven Paul Jobs",
  "Bill Gates",
  "Mark Elliot Zuckerberg",
  "Elon Musk",
  "Jeff Bezos",
  "Warren Edward Buffett",
  "Larry Page",
  "Larry Ellison",
  "Tim Cook",
  "Lloyd Blankfein",
];

// map
// 1. 모든 이름을 대문자
function change (item){
    return item.toUpperCase()
}
console.log(names.map(change))

// 2. 성을제외한 이름만
console.log(names.map(function (item) {
    return item.slice(1,item.length)
}))

// 3. 이니셜
console.log(names.map((item)=>{
    let temp = "";
    for (let i = 0; i<item.length; i++){
        if (item[i] === item[i].toUpperCase() && item[i] != " ") {
            temp += item[i];
        }
    }
    return temp
}))

// filter
// 1번
console.log(names.filter(function (item){
    return item.includes("a")
}))

// 2번
console.log(names.filter((item)=>{
    let temp = item[0];
    for (let i = 1; i<names.length; i++){
        if (temp == item[i]){
            return item
        }
        temp = item[i]
    }
}))

// some
// 1번
console.log(names.some(function (item) {
    if (item.length >= 20){
        return item
    }
}))

// 2번
console.log(names.some((item) => {
    let name_arr = item.split(" ")
    let first_name = name_arr.slice(0,name_arr.length-1)
    // console.log(first_name)
    if (first_name.some((element) => {
        if (element.includes("p") || element.includes("P")){
            return element
        }
    })){
        return item
    }
}))

// every
// 1번
console.log(names.every(function (item){
    if(item.length >= 20){
        return item
    }
}))

// 2번
console.log(names.every((item)=>{
    if (item.includes("a"))
        return item
}))

// find
// 1번
console.log(names.find(function (item) {
    if (item.length >= 20){
        return item
    }
}))

// 2번
console.log(names.find(item =>{
    let cnt = 0;
    for (let i=0; i<item.length; i++){
        if (item[i] === " "){
            cnt += 1
        }

        if (cnt > 1){
            return item
        }
    }
}))

// findindex
// 1번
console.log(names.findIndex(function (item){
        if (item.length >= 20){
        return item
    }
}))

// 2번
console.log(names.findIndex(item => {
    let name_detail = item.split(" ")
    if (name_detail.length > 2){
        return item
    }
}))