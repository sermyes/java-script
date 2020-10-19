const land = 4;
const port = 3;
let cardLength = land * port;

const colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
let colorCandidate = colors.slice();
//! 원시값은 복사가 되지만, 객체는 넣으면 레퍼런스참조로 인해 값이 같이 바뀐다

let color = [];
let openflag = true;
let openCard = [];
let compliteCard = [];
let start;

//! color shuffle
function colorShuffle(){
    for(let i = 0; i < cardLength; i++){
        let rand = Math.floor(Math.random() * colorCandidate.length);
        color = color.concat(colorCandidate.splice(rand, 1));
    }
}
colorShuffle();



function cardSetting(cardLength){
    openflag = false;
    for(let i = 0; i < cardLength; i++){
        const wrapper = document.querySelector('.wrapper');
        const card = document.createElement('div');
        card.className = 'card';
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', function(){
            if(openflag && !compliteCard.includes()){
                card.classList.toggle('flipped');
                openCard.push(card);
                if(openCard.length === 2){
                    if(openCard[0].querySelector('.card-back').style.backgroundColor === openCard[1].querySelector('.card-back').style.backgroundColor){
                        compliteCard.push(openCard[0]);
                        compliteCard.push(openCard[1]);
                        openCard = [];
                        if(compliteCard.length === cardLength){
                            let last = new Date();
                            setTimeout(function(){
                                alert('축하합니다! 기록은 ' + (last - start) / 1000 + '초 입니다.');
                                wrapper.innerHTML = '';
                                compliteCard = [];
                                colorCandidate = colors.slice();
                                color = [];
                                colorShuffle();
                                cardSetting(cardLength);
                            }, 1000);
                        }
                    }else{
                        openflag = false;
                        setTimeout(function(){
                            openCard[0].classList.remove('flipped');
                            openCard[1].classList.remove('flipped');
                            openCard = [];
                            openflag = true;
                        }, 1000);
                    }
                }
            }
        });
        
        wrapper.appendChild(card);
    }
    
    document.querySelectorAll('.card').forEach(function(card, index){
        //! querySelectorAll('.card') 모든 card클래스 선택.
        
        setTimeout(function(){
            card.classList.add('flipped');
        }, 1000 + 100 * index);
        
        setTimeout(function(){
            card.classList.remove('flipped');
            openflag = true;
            start = new Date();
        }, 3000);
    });
}

cardSetting(cardLength);

