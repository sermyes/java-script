const body = document.body;
const table = document.createElement('table');
const result = document.createElement('div');
let columns = []; // data column
let rows = []; // data row
let turn = 'X';

function check(colIndex, rowIndex){ //! 승리 체크 함수
    let fulled = false; //! 승리조건 변수

    //! 승리조건 검사
    //! 1. 가로줄 검사
    if( 
        rows[colIndex][0].textContent === turn &&
        rows[colIndex][1].textContent === turn &&
        rows[colIndex][2].textContent === turn
    ){
        fulled = true;
    }

    //! 2. 세로줄 검사
    if(
        rows[0][rowIndex].textContent === turn &&
        rows[1][rowIndex].textContent === turn &&
        rows[2][rowIndex].textContent === turn
    ){
        fulled = true;
    }

    //! 3. 대각선 검사
    if(
        rows[0][0].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][2].textContent === turn
    ){
        fulled = true;
    }
    if(
        rows[0][2].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][0].textContent === turn
    ){
        fulled = true;
    }
    return fulled;
}

function init(tie){ //! 초기화 함수
    console.log(tie);
    if(tie){
        result.textContent = '무승부!'
    }else{
        result.textContent = turn + '님이 승리!';
    }
    turn = 'X';

    setTimeout(function(){
        result.textContent = '';
        rows.forEach(function(column){
            column.forEach(function(row){
                row.textContent = '';
            });
        });
    }, 1000);
}

const callback = function(event){ 
    // !비동기 콜백함수
    
    if(turn === 'O'){ //! 컴퓨터의 턴일 때 실행X
        return;
    }

    const colIndex = columns.indexOf(event.target.parentNode);
    const rowIndex = rows[colIndex].indexOf(event.target);

    if(rows[colIndex][rowIndex].textContent !== '') { 
        //! 빈칸이 아니라면?
        console.log('빈 칸아닙니다.');
    }else{ 
        //! 빈칸이면
        console.log('빈 칸입니다');

        rows[colIndex][rowIndex].textContent = turn; //! 'X' 추가
        
        let fulled = check(colIndex, rowIndex); //! 결과 체크 함수
        
        let candidates = []; //! 컴퓨터의 후보칸 배열
        
        rows.forEach(function(column){
            column.forEach(function(row){
                candidates.push(row);
                //! 모든 칸들을 candidate 배열에 저장
            });
        });
        
        candidates = candidates.filter(function(row){
            return (row.textContent === '');
            //! candidate의 빈값들만 필터링
        });

        if(fulled) {
            init(); //! 초기화 함수
        }else if(candidates.length === 0){
            let tie = true;
            init(tie);
        }else{ //! 게임 진행
            if(turn === 'X'){
                turn = 'O';
            }

            //! 컴퓨터의 턴
            setTimeout(function(){
                console.log('컴퓨터의 턴입니다.');

                const candidate = candidates[Math.floor(Math.random() * candidates.length)];
                candidate.textContent = turn;

                const colIndex = columns.indexOf(candidate.parentNode);
                const rowIndex = rows[colIndex].indexOf(candidate);

                let fulled = check(colIndex, rowIndex); //! 결과 체크 함수
                if(fulled){
                    init();
                }

                turn = 'X';
            }, 1000);
        }
    }
};

for (let i = 1; i <= 3; i++) {
    const column = document.createElement('tr');
    columns.push(column);
    rows.push([]);
    for (let j = 1; j <= 3; j++) {
        const row = document.createElement('td');
        row.addEventListener('click', callback);
        rows[i - 1].push(row);
        column.appendChild(row);
    }
    table.appendChild(column);
}
body.appendChild(table);
body.appendChild(result);