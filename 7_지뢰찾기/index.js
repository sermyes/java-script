const tbody = document.querySelector('#table tbody');
let openBlock = 0;
const code = {
    openBlock: -1,
    qst: -2,
    qstMine: -3,
    flag: -4,
    flagMine: -5,
    mine: 1,
    block: 0,
};

document.querySelector('#exec').addEventListener('click', () => {
    tbody.innerHTML = '';
    document.querySelector('#result').textContent = '';
    let flag = false;
    openBlock = 0;
    // ! tbody의 내부tag들을 초기화

    const hor = Number(document.querySelector('#hor').value);
    const ver = Number(document.querySelector('#ver').value);
    const mine = Number(document.querySelector('#mine').value);
    const candidate = Array(hor * ver).fill().map((item, index) => {
        return index; 
    });
    const shuffle = [];
    for(let i = 0; i < mine; i++){
        const rand = Math.random()*candidate.length;
        // ! candidate.length만큼 랜덤으로 추출
        const value = candidate.splice(rand, 1)[0];
        // ! splice는 배열로 나오기때문에 [0]을 해서 값으로 추출한다.
        shuffle.push(value);
    }

    // ! dataset[]을 만들어 화면에 보이는것과 데이터상을 일치시킨다.
    const dataset = [];
    for(let i = 0; i < ver; i++){
        const arr = [];
        const tr = document.createElement('tr');
        dataset.push(arr);
        for(let j = 0; j < hor; j++){
            arr.push(code.block);
            const td = document.createElement('td');
            console.log(dataset);
            // ! 오른쪽 마우스클릭 이벤트 contextmenu
            // ! eventlistener가 달린게 currentTarget, 실제 이벤트가 발생한 target
            td.addEventListener('contextmenu', (e) => {
                if(flag){
                    return;
                }
                //! 지뢰를 누르면 게임 종료

                e.preventDefault();
                const parent_tr = e.currentTarget.parentNode;
                const parent_tbody = e.currentTarget.parentNode.parentNode;
                const row = Array.prototype.indexOf.call(parent_tr.children, e.currentTarget);
                const column = Array.prototype.indexOf.call(parent_tbody.children, tr);
                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X'){
                    e.currentTarget.textContent = '!';
                    e.currentTarget.classList.add('flag');
                    if(dataset[column][row] === code.mine){
                        dataset[column][row] = code.flagMine;
                    }else{
                        dataset[column][row] = code.flag;
                    }
                }else if(e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('qst');
                    if(dataset[column][row] === code.flagMine){
                        dataset[column][row] = code.qstMine;
                    }else{
                        dataset[column][row] = code.qst;
                    }
                }else if(e.currentTarget.textContent === '?'){
                    e.currentTarget.classList.remove('qst');
                    if(dataset[column][row] === code.qstMine){
                        e.currentTarget.textContent = 'X';
                        dataset[column][row] === code.mine;
                    }else{
                        e.currentTarget.textContent = '';
                        dataset[column][row] === code.block;
                    }
                }
            });
            
            // ! 왼쪽클릭했을 때
            td.addEventListener('click', (e) => {
                if(flag){
                    return;
                } 
                //! 지뢰를 누르면 게임 종료

                const parent_tr = e.currentTarget.parentNode;
                const parent_tbody = e.currentTarget.parentNode.parentNode;
                const row = Array.prototype.indexOf.call(parent_tr.children, e.currentTarget);
                const column = Array.prototype.indexOf.call(parent_tbody.children, parent_tr);
                
                if([code.openBlock, code.flag, code.flagMine, code.qst, code.qstMine].includes(dataset[column][row])){
                    return;
                }
                //! 중복클릭 방지
                
                e.currentTarget.classList.add('opened');
                //! 클래스 추가

                openBlock += 1;
                //! 오픈칸 1추가

                if(dataset[column][row] === code.mine){
                    e.currentTarget.textContent = '펑';
                    document.querySelector('#result').textContent = '실패';
                    flag = true;
                }else{
                    dataset[column][row] = code.openBlock;
                    //! 지뢰가 아닌 경우 클릭한 블록 1로 변경.

                    let aroundMine = [];
                    if(dataset[column-1]){
                        aroundMine = aroundMine.concat([dataset[column-1][row-1], dataset[column-1][row], dataset[column-1][row+1]]);
                    }
                    aroundMine = aroundMine.concat([dataset[column][row-1],dataset[column][row+1]]);
                    if(dataset[column+1]){
                        aroundMine = aroundMine.concat([dataset[column+1][row-1], dataset[column+1][row], dataset[column+1][row+1]]);
                    }

                    let aroundMineCount = aroundMine.filter( (x) => {
                        return [code.mine, code.flagMine, code.qstMine].includes(x);
                    }).length;
                    e.currentTarget.textContent = aroundMineCount || '';
                    // ! 주변지뢰 갯수
                    
                    // ? 재귀 주변 블록오픈
                    if(aroundMineCount === code.block){
                        // ! 마인이 0이면 주변블록 오픈
                        var aroundBlock = [];
                        if(tbody.children[column-1]){
                            aroundBlock = aroundBlock.concat([
                                tbody.children[column-1].children[row-1],
                                tbody.children[column-1].children[row],
                                tbody.children[column-1].children[row+1],
                            ])
                        }
                        aroundBlock = aroundBlock.concat([
                            tbody.children[column].children[row-1],
                            tbody.children[column].children[row+1]
                        ]);
                        if(tbody.children[column+1]){
                            aroundBlock = aroundBlock.concat([
                                tbody.children[column+1].children[row-1],
                                tbody.children[column+1].children[row],
                                tbody.children[column+1].children[row+1],
                            ]);
                        }

                        aroundBlock.filter( v => !!v ).forEach( block => {
                            const parent_tr = block.parentNode;
                            const parent_tbody = block.parentNode.parentNode;
                            const row = Array.prototype.indexOf.call(parent_tr.children, block);
                            const column = Array.prototype.indexOf.call(parent_tbody.children, parent_tr);
                            if(dataset[column][row] !== code.openBlock){
                                block.click();
                            }
                        });
                        //! !!v는 undefined, null, 빈값 등을 제거해준다.
                        //! 그리고 그 빈값들을 forEach 각각 click해준다.
                    }
                }
                if(openBlock === hor * ver - mine){
                    flag = true;
                    document.querySelector('#result').textContent = '승리';
                }
            });

            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // 지뢰심기
    for(let i = 0; i < shuffle.length; i++){ // 60
        const verti = Math.floor(shuffle[i] / ver) ;
        const hori = shuffle[i] % hor; 
        tbody.children[verti].children[hori].textContent = 'X';
        dataset[verti][hori] = code.mine;
    }
});
