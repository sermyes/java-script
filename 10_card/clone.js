var obj = {
    a: 1, 
    b: 2, 
    c: 3
};
var obj2 = {};

obj2 = obj;
console.log(obj2 === obj); // true, 참조관계
//! 오브젝트 참조 

obj = {
    a: 1, 
    b: 2, 
    c: 3
};
obj2 = {};
obj3 = {};

Object.keys(obj).forEach(function(key){
    obj2[key] = obj[key];
});
Object.assign(obj3, obj);

console.log(obj2 === obj); // false, 복사
console.log(obj3 === obj); // false, 복사
//! 오브젝트 1단계만 복사

obj = {
    a: 1, 
    b: { c: 3 }
};
obj2 = {};
Object.keys(obj).forEach(function(key){
    obj2[key] = obj[key];
});
//! 오브젝트 1단계복사, 2단계부터 참조(c객체는 참조)

obj = {
    a: 1, 
    b: { c: 3 }
};
obj2 = {};
obj2 = JSON.parse(JSON.stringify(obj));
//! 깊은 복사, 모두 복사된다

//! 배열의 경우 slice()함수를 사용할 수 있다. (1단계 복사)
