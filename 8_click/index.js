const screen = document.querySelector('#screen');
const status = {

};
let start;
let now;
let timerId;

screen.addEventListener('click', () => {
    if(screen.classList.contains('waiting')){
        //! classList.contains로 현재 클래스를 파악가능
        screen.classList.remove('waiting');
        screen.classList.add('ready');
        screen.textContent = '초록색이되면 클릭하세요';

        timerId = setTimeout(() => {
            start = new Date();
            screen.click();
        }, Math.floor(Math.random() * 1000) + 2000);
        // !2~3초 사이에 자동클릭

    }else if(screen.classList.contains('ready')){
        if(!start){ // 부정클릭
            clearTimeout(timerId);
            screen.classList.remove('ready');
            screen.classList.add('waiting');
            screen.textContent = '클릭해서 시작하세요';
            alert('너무 성급하시군요!');
        }else{
            screen.classList.remove('ready');
            screen.classList.add('now');
            screen.textContent = '클릭하세요';
        }
    }else if(screen.classList.contains('now')){
        now = new Date();
        console.log( '반응속도 : ' + (now - start) + 'ms');
        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent = '클릭해서 시작하세요';
    } 
});


// ! 콘솔 시간 측정(내용이 같아야한다.)
//  console.time('시간') 
//  console.timeEnd('시간');

// ! date 시간측정
// const start = new Date();
// const last = new Date();
// (last - start) / 1000; 초단위

//! perfomance(date보다 더 정밀) 시간측정
// const start = perfomance.now();
// const last = perfomance.now();
// (last - start) / 1000; 초단위