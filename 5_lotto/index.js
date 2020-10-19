const candidate = Array(45).fill().map((v, i) => i + 1);
// fill() - undefined로 채워진 배열생성. fill(1)은 1로 채워짐
// map((value, index) => {})은 fill을 쓰고 map을 써야한다.
const shuffle = [];
while(candidate.length > 0){
    const rand = Math.random()*candidate.length;
    // candidate.length만큼 랜덤으로 추출
    const value = candidate.splice(rand, 1)[0];
    // splice는 배열로 나오기때문에 [0]을 해서 값으로 추출한다.
    shuffle.push(value);
}
console.log(shuffle);
const winBalls = shuffle.slice(0, 6).sort((p, c) => p - c);
// slice(0, 6) - 0번째부터 (6 - 1 = 5)까지 6개.
const bonus = shuffle[6];
console.log(winBalls);
console.log(bonus);

function colorize(number, tag){
    if(number <= 10){
        tag.style.backgroundColor = 'red';
        tag.style.color = 'white';
    }else if(number <= 20){
        tag.style.backgroundColor = 'orange';
    }else if(number <= 30){
        tag.style.backgroundColor = 'yellow';
    }else if(number <= 40){
        tag.style.backgroundColor = 'blue';
        tag.style.color = 'white';
    }else if(number <= 50){
        tag.style.backgroundColor = 'black';
        tag.style.color = 'white';
    }
}

const resultTag = document.querySelector('#result');
for(let i = 0; i < 6; i++){ // 클로저문제는 let사용하면서 없어짐.
    setTimeout(function(){
        const ball = document.createElement('div');
        ball.className = 'ball';
        ball.textContent = winBalls[i];
        colorize(winBalls[i], ball);
        result.appendChild(ball);
    }, 1000 * (i + 1) );
}

const bonusTag = document.querySelector('#bonus');
const ball = document.createElement('div');
setTimeout(function(){
    ball.className = 'ball';
    ball.textContent = bonus;
    colorize(bonus, ball);
    bonusTag.appendChild(ball);
}, 7000);



