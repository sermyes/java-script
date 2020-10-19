let proto = {
    type: '카드',
    attack: function (){ console.log('attack'); },
    defend: function (){ console.log('defend!'); }
}

function cardFactory1(name, attr, hp){
    let card = Object.create(proto);
    card.name = name;
    card.attr = attr;
    card.hp = hp;
    return card;
}

function cardFactory2(name, attr, hp){
    let card = {
        name : name,
        attr : attr,
        hp : hp,
    }
    card.__proto__ = proto;
    return card;
}

var newObj = Object.assign({}, proto);
//! 오브젝트 1단계 복사. ( 2단계부터 참조 )

// var newObj = Object.assign({}, obj1, obj2, obj2);
//! 빈객체에 obj1,2,3을 1단계 복사해서 newObj에 넣는다.

// Object.assign(obj2, obj);
//! obj2에 obj를 1단계 복사


