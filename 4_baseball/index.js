const input = document.querySelector('#input');
const check = document.querySelector('#check');
const logs = document.querySelector('#logs');
let count = 0;

let numbers = [];
let answer = [];

for(let n = 0; n <= 9; n++){
    numbers.push(n);
}
for(let i = 0; i < 4; i++){
    let index = Math.floor(Math.random() * numbers.length);
    answer.push( numbers[index] );
    numbers.splice(index, 1);
}
console.log(answer);

check.addEventListener('click', () => {
    const value = input.value;

    if(value && value.length === 4){
        if(answer.join('') === value){
            logs.appendChild(document.createTextNode('homerun'));
        }else{
            let strike = 0;
            let ball = 0;
            
            for(let i = 0; i < answer.length; i++){
                for(let j = 0; j < value.length; j++){
                    console.log(answer[i], value[j])
                    if(answer[i] === Number(value[j]) && i === j){
                        strike++;
                    }
                    if(answer[i] === Number(value[j]) && i !== j){
                        ball++;
                    }
                }
            }
            
            // for(const [aIndex, aNumber] of answer.entries()){
            //     for(const [vIndex, vString] of value.split('').entries()){
            //         console.log(aNumber, vString);
            //         console.log(aIndex, vIndex);
            //         if(aNumber === Number(vString) && aIndex === vIndex){
            //             strike++;
            //         }
            //         if(aNumber === Number(vString) && aIndex !== vIndex){
            //             ball++;
            //         }
            //     }
            // }

            logs.appendChild(document.createTextNode(`${value} : ${strike} strike ${ball} ball`));
            logs.appendChild(document.createElement('br'));
            // logs.append(`${value} : ${strike} strike ${ball} ball`, document.createElement('br'))
            // EI에서는 사용불가
        }
    }

    if(count > 10){
        logs.appendChild(document.createTextNode(`Game Over - Answer : ${answer.join('')}`));
    }else{
        count++;
    }
});

//? textConent - 기존내용 덮어쓰기, appendchild - 뒤에 추가하기
//? text추가 document.createTextNode('text');
//? 태그추가 document.createElement('br');

//? false값 => '', NaN, undefined, null, 0, false

//? *.repeat(3); 같은것 반복함수
// for(let i = 4; i >= -4; i -= 2){
//   console.log(' '.repeat(Math.abs(i) / 2) + '*'.repeat(5 - Math.abs(i)));
// } 
// for(let i = 4; i >= -4; i -= 2){
//   console.log(' '.repeat(Math.abs(i)) + '*'.repeat(5 - Math.abs(i)));
// } 





