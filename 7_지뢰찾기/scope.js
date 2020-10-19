var name = 'zero';

function log(){
    console.log(name); //zero
}

function wrapper(){
    var name = 'nero';
    log();
}

wrapper();
// ! 자바스크립트는 정적스코프(렉시컬스코프)이므로 코드작성후 스코프가 정해진다.
// ! name은 외부 name인 zero로 고정.


// ! 반복문과 비동기가 만났을 떄, 클로저문제 발생
for(var i = 0; i < 5; i++){
    setTimeout(function(){
        console.log(i); //! 함수 내부의 i는 실행되는 순간에 i가 되므로 이미 계산된 9가 적용된다.
    }, i*1000); //! 함수 외부 i는 0 ~ 9까지 적용된다.
}

// ! 1. let을 이용
for(let i = 0; i < 5; i++){
    setTimeout(function(){
        console.log(i); 
    }, i*1000); 
}

// ! 2. 즉시실행함수 이용
for(var i = 0; i < 5; i++){
    (function(x){
        setTimeout(function(){
            console.log(x);
        }, 1000*x)
    })(i);
} 

for(let i = 0; i < 5; i++){
    function closure(i){
        setTimeout(function(){
            console.log(i); 
        }, i*1000);
    }
    closure(i);
}

