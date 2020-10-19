let proto = {
    type: '카드',
}

//! 생성자함수
function Card(name, attr, hp){
    // "use strict"
    //! 함수내에 엄격모드를 쓰면 new를 붙이지않고 생성시 에러발생한다.
    this.name = name;
    this.attr = attr;
    this.hp = hp;
}
Card.prototype = proto; 
//! 생성자함수일땐 __proto__가 아닌 prototype을 사용해야한다.

let card = new Card('무지', 5, 10);
//! new로 생성시 this는 새로 생성된 객체에 바인딩된다.
console.log(card.attack());

Card('바보', 1, 2);
//! 생성자함수에 new를 붙이지않으면 this는 윈도우객체가 변경된다.
console.log(window.name); //! 바보
