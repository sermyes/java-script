const computerTag = document.querySelector('#computer');
computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) 0 0`;
let computerChoice = 'rock';
const rspCoord = {
    rock: '0', // 바위
    scissors: '-142px', // 가위
    paper: '-284px', // 보
};

const intervalMaker = () => {
    return setInterval(() => {
        if(computerChoice === 'rock'){
            computerChoice = 'scissors';
        }else if(computerChoice === 'scissors'){
            computerChoice = 'paper';
        }else if(computerChoice === 'paper'){
            computerChoice = 'rock';
        }
        computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${rspCoord[computerChoice]} 0`;
    }, 100);
};

let intervalId = intervalMaker();
const rockTag = document.querySelector('#rock');
const scissorsTag = document.querySelector('#scissors');
const paperTag = document.querySelector('#paper');
const score = {
    rock: 0,
    scissors: 1,
    paper: -1,
};
//      컴퓨터 주먹(0) 가위(1) 보(-1)
//      나
//      주먹(0)     0     -1w     1        
//      가위(1)     1      0      2w
//      보(-1)     -1w    -2      0
// 이길경우 : 2 , -1

rockTag.addEventListener('click', clickButton('rock'));
scissorsTag.addEventListener('click', clickButton('scissors'));
paperTag.addEventListener('click', clickButton('paper'));
// 함수의 리턴값이 없으면 undefined이므로, clickButton은 모두 undefined가 된다.
// 그러므로 clickButton을 리턴함수로 만들면 원하는 결과값을 얻을수있다.

function clickButton(myChoice){
    return function(){
        const myScore = score[myChoice];
        const computerScore = score[computerChoice];
        const diff = myScore - computerScore;
        const scoreTag = document.querySelector('#score');
        let accScore = Number(scoreTag.textContent);
    
        if(diff === 2 || diff === -1){
            accScore += 1;
        }else if(diff === 1 || diff === -2){
            accScore -= 1;
        }
        scoreTag.textContent = accScore;

        clearInterval(intervalId);
        setTimeout(() => {
            intervalId = intervalMaker();
            // intervalMaker함수의 리턴값이 들어간다
        }, 1000);
    };
}


// 유사배열
// const arr = {
//     0: 'a',
//     1: 'b',
//     2: 'c',
//     length: 3,
//     map: () => {},
//     slice: () => {},
// }