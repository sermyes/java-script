const a = document.querySelector('#first');
const b = document.querySelector('#second');
// 여기에 .value를 하면 클릭전엔 빈값으로 인식된다.
const r = document.querySelector("#result");

document.querySelector("#click").addEventListener('click', () => {
    a.value;
    // input 값은 value로 가져온다.
    b.value;

    if(a){
        if(b){
            const c = a * b;
            r.textContent = c;
        }else{
            r.textContent = '두 번째 값 입력';
        }
    }else{
        r.textContent = '첫 번쨰 값 입력';
    }
});
