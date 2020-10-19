const rival = {
    hero: document.querySelector('#rival-hero'),
    deck: document.querySelector('#rival-deck'),
    field: document.querySelector('#rival-cards'),
    cost: document.querySelector('#rival-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    selectedCard: null,
    selectedCardData: null,
}
const my = {
    hero: document.querySelector('#my-hero'),
    deck: document.querySelector('#my-deck'),
    field: document.querySelector('#my-cards'),
    cost: document.querySelector('#my-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    selectedCard: null,
    selectedCardData: null,
}
const turnBtn = document.querySelector('#turn-btn');
let turn = true;

function deckToField(data, myTurn){
    let obj = myTurn ? my : rival;
    let currentCost = Number(obj.cost.textContent);

    //! 남은 코스트가 카드 코스트보다 적다면 리턴
    if(currentCost < data.cost){
        return 'end';
    }

    let idx = obj.deckData.indexOf(data);
    obj.deckData.splice(idx, 1);
    obj.fieldData.push(data);
    deckDraw(obj);
    fieldDraw(obj);

    data.field = true;
    //! data는 참조관계이므로 field속성이 추가된다.

    obj.cost.textContent = currentCost - data.cost;
    //! 남은 코스트 반영
}

function draw(myTurn){
    let obj = myTurn ? my : rival;
    fieldDraw(obj);
    deckDraw(obj);
    heroDraw(obj);
}

function fieldDraw(obj){
    obj.field.innerHTML = '';
    obj.fieldData.forEach(function(data){
        cardDataLink(data, obj.field);
    });
}

function deckDraw(obj){
    obj.deck.innerHTML = '';
    obj.deckData.forEach(function(data){
        cardDataLink(data, obj.deck);
    });
}

function heroDraw(obj){
    obj.hero.innerHTML = '';
    cardDataLink(obj.heroData, obj.hero, true);
}

function attack(card, data, myTurn){
    let obj = myTurn ? my : rival;
    if(card.classList.contains('card-turnover')){
        return;
    }

    let reverseCard = myTurn ? !data.mine : data.mine;
    let reverseObj =  myTurn ? rival : my;

    if(reverseCard && obj.selectedCard){
        data.hp = data.hp - obj.selectedCardData.att;
        if(data.hp <= 0){
            //! 상대카드 hp가 0이 되었을 때,
            let index = reverseObj.fieldData.indexOf(data);
            if(index > -1){ // 필드카드가 죽었을 때,
                reverseObj.fieldData.splice(index, 1);
            }else{ // 영웅이 죽었을 때,
                myTurn ? alert('승리하셨습니다.') : alert('패배하셨습니다.'); 
                init();
            }
        }
        draw(!myTurn);
        obj.selectedCard.classList.remove('card-selected');
        obj.selectedCard.classList.add('card-turnover');
        obj.selectedCard = null;
        obj.selectedCardData = null;

        // console.log(my.heroData);
        // console.log(my.deckData);
        // console.log(my.fieldData);
        // console.log(rival.heroData);
        // console.log(rival.deckData);
        // console.log(rival.fieldData);
    }else if(reverseCard){ 
        //! 상대카드를 뽑으면 리턴
        return;
    }

    if(data.field){
        document.querySelectorAll('.card').forEach(function(card){
            card.classList.remove('card-selected');
        });
        card.classList.add('card-selected');
        obj.selectedCard = card;
        obj.selectedCardData = data;
    }else{
        if(deckToField(data, myTurn) !== 'end'){
            myTurn ? createMyDeck(1) : createRivalDeck(1);
        }
    }
}

function cardDataLink(data, target, hero){
    let card = document.querySelector('.card-hidden .card').cloneNode(true);
    //! cloneNode(true)는 html 태그를 내부까지 그대로 복사해준다
    card.querySelector('.card-cost').textContent = data.cost;
    card.querySelector('.card-att').textContent = data.att;
    card.querySelector('.card-hp').textContent = data.hp;
    if(hero){
        card.querySelector('.card-cost').style.display = 'none';
        let name = document.createElement('div');
        name.textContent = '영웅';
        card.appendChild(name);
    }

    card.addEventListener('click', function(){
        if(turn){ //! 내턴일경우
            attack(card, data, true);

        }else{ //! 상대턴일경우
            attack(card, data, false);
        }
    });

    target.appendChild(card);
}

function createRivalDeck(count){
    for(let i = 0; i < count; i++){
        rival.deckData.push(cardFactory(false, false));
    }
    deckDraw(rival);
}

function createRivalHero(){
    rival.heroData = cardFactory(true, false);
    cardDataLink(rival.heroData, rival.hero, true);
}

function createMyDeck(count){
    for(let i = 0; i < count; i++){
        my.deckData.push(cardFactory(false, true));
    }
    deckDraw(my);
}

function createMyHero(){
    my.heroData = cardFactory(true, true);
    cardDataLink(my.heroData, my.hero, true);
}

function dataInit(obj){
    obj.deckData = [];
    obj.fieldData = [];    
}

function init(){
    dataInit(my);
    dataInit(rival);
    createRivalDeck(5);
    createMyDeck(5);
    createMyHero();
    createRivalHero();
    draw(true);
    draw(false);
}

function Card(hero, myCard){
    if(hero){
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
    }else{
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }

    if(myCard){
        this.mine = true;
    }
}

function cardFactory(hero, myCard){
    return new Card(hero, myCard);
}

turnBtn.addEventListener('click', function(){
    let obj = turn ? my : rival;
    obj.field.innerHTML = '';
    obj.hero.innerHTML = '';
    obj.fieldData.forEach(function(data){
        cardDataLink(data, obj.field);
    });
    cardDataLink(obj.heroData, obj.hero, true);

    turn = !turn;
    my.cost.textContent = 10;
    rival.cost.textContent = 10;
    document.querySelector('#my').classList.toggle('turn');
    document.querySelector('#rival').classList.toggle('turn');
});

init();
