
function func(temp){
    temp.a = 10;
    console.log(temp.a);
}

let temp = { a: 5 };
func(temp); //! 10
console.log(temp.a); //! 10
//! 자바스크립트는 모두 call by value.
//! 매개변수가 객체일때는 참조로 같이 변경되지만, 원시값은 적용되지않는다.

function func2(temp){
    temp = 8;
    console.log(temp);
}

func2(temp); //! 8
console.log(temp.a); //! 8
//! call by reference와 다른점은 매개변수인 객체자체를 변경하면 복사되지만,
//! 객체속성을 변경하면 참조된다.

