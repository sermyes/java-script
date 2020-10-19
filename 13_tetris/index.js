const tetris = document.querySelector('#tetris');
let tetrisData = [];
let currentBlock;
let nextBlock;
let currentTopLeft = [0, 3];
//! let은 블록스코프, var는 함수스코프
const blocks = [
    {
        name: 's', //! 네모
        center: false,
        numCode: 1,
        color: 'red',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [0, 1, 1],
                [0, 1, 1],
            ]
        ],
    },
    {
        name: 't', //! T자
        center: true,
        numCode: 2,
        color: 'orange',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0],
            ],
        ]
    },
    {
        name: 'z', //! 지그재그
        center: true,
        numCode: 3,
        color: 'yellow',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0],
            ],
            [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0],
            ],
        ]
    },
    {
        name: 'zr', //! 반대 지그재그
        center: true,
        numCode: 4,
        color: 'green',
        startRow: 1,
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0],
            ],
            [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 0, 1],
            ],
        ]
    },
    {
        name: 'l', //! L자
        center: true,
        numCode: 5,
        color: 'blue',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [1, 0, 0],
            ],
            [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1],
            ],
        ]
    },
    {
        name: 'lr', //! 반대 L자
        center: true,
        numCode: 6,
        color: 'navy',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1],
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0],
            ],
            [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0],
            ],
        ]
    },
    {
        name: 'b', //! 1자
        center: true,
        numCode: 7,
        color: 'violet',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
            ],    
            [ 
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
            ],
        ]
    },
];

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'violet'];

const isActiveBlock = value => (value > 0 && value < 10);
const isInvalidBlock = value => (value === undefined || value >= 10);

function init() {
    const fragment = document.createDocumentFragment();
    //! documentFragment는 메모리를 절약하는데 쓰인다.
    [...Array(20).keys()].forEach((col, i) => {
        //! [...Aray(숫자).keys()] => [0, 1, 2, ..., 숫자-1.keys()] 나열해준다.
        //! ...[1,2,3] => 1, 2, 3 배열 괄호를 벗겨준다.

        const tr = document.createElement('tr');
        fragment.appendChild(tr);
        [...Array(10).keys()].forEach((row, j) => {
            const td = document.createElement('td');
            tr.appendChild(td);
        });
        const column = Array(10).fill(0);
        tetrisData.push(column);
    });
    tetris.appendChild(fragment);
}   

function draw() {
    // console.log('drawed', JSON.parse(JSON.stringify(tetrisData)), JSON.parse(JSON.stringify(currentBlock)));
    tetrisData.forEach((col, i) => {
        col.forEach((row, j) => {
            if (row > 0) {
                tetris.children[i].children[j].className = tetrisData[i][j] >= 10 ? colors[(tetrisData[i][j] / 10) - 1]: colors[tetrisData[i][j] - 1];
            } else {
                tetris.children[i].children[j].className = '';
            }
        });
    });
}

function drawNext() { //! 다음 블록 그리는 함수
    const nextTable = document.getElementById('next-table');
    const tr = nextTable.querySelectorAll('tr');
    tr.forEach((col, i) => {
        Array.from(col.children).forEach((row, j) => {
            if (nextBlock.shape[0][i] && nextBlock.shape[0][i][j] > 0) {
                //! nextBlock.shape[0][i]는 3x3 , 4x4 를 구분하기 위함
                tr[i].children[j].className = colors[nextBlock.numCode - 1];
            } else {
                tr[i].children[j].className = 'white';
            }
        });
    })
}

function generate() { //! 테트리스 블록 생성
    if (!currentBlock) {
        //! 처음실행시 블록이 없을 때.
        currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
    } else {
        currentBlock = nextBlock;
    }
    currentBlock.currentShapeIndex = 0;
    nextBlock = blocks[Math.floor(Math.random() * blocks.length)]; //! 다음 블록 미리 생성
    // (currentBlock);

    drawNext(); //! 다음 블록그려주기
    currentTopLeft = [-1, 3]; //! 가상의 칸을 놓고 위로 한칸 올린다.

    let isGameOver = false;
    currentBlock.shape[0].slice(1).forEach((col, i) => { //! 게임 오버 판단
        col.forEach((row, j) => {
            if (row && tetrisData[i][j + 3]) {
                isGameOver = true;
            }
        });
    });

    currentBlock.shape[0].slice(1).forEach((col, i) => { //! 블록 데이터 생성
        //! 가상의 칸으로 한칸 올렸기때문에 slice(1)로 한칸을 자르고 그린다.
        // console.log(currentBlock.shape[0], currentBlock.shape[0].slice(1), col);
        col.forEach((row, j) => {
            if (row) {
                tetrisData[i][j + 3] = currentBlock.numCode;
            }
        });
    });

    // console.log('generate', JSON.parse(JSON.stringify(currentBlock)));
    if (isGameOver) {
        clearInterval(int);
        draw();
        alert('game over');
    } else {
        draw();
    }
}

function checkRows() { // 한 줄 다 찼는지 검사
    const fullRows = [];
    tetrisData.forEach((col, i) => {
        let count = 0;
        col.forEach((row, j) => {
            if (row > 0) {
                count++;
            }
        });
        if (count === 10) {
            fullRows.push(i);
        }
    });
    //! 꽉찬줄의 index를 fullRows배열에 저장.

    const fullRowsCount = fullRows.length;
    tetrisData = tetrisData.filter((row, i) => !fullRows.includes(i));
    //! tetrisData에서 fullRows에 저장된 줄들을 필터링으로 제거

    for (let i = 0; i < fullRowsCount; i++) {
        tetrisData.unshift([0,0,0,0,0,0,0,0,0,0]);
    }
    //! 제거된 줄들만큼 위에 빈줄로 채워넣는다.

    // console.log(fullRows, JSON.parse(JSON.stringify(tetrisData)));
    let score = Number(document.querySelector('#score').textContent);
    score += fullRowsCount ** 2;
    //! 한번에 제거된 줄의 제곱만큼 점수 제공.
    document.getElementById('score').textContent = String(score);
}

function tick() { // 한 칸 아래로
    const nextTopLeft = [currentTopLeft[0] + 1, currentTopLeft[1]];
    //! [-1, 3]이었던 값을 [0, 3]으로 한칸 내린다.
    const activeBlocks = [];
    let canGoDown = true; //! 블럭을 내릴수있는지 flag변수
    let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
    //! 3x3이라면 length는 3 (curentShapeIndex는 up키로 변하는 블럭의 모양)
    
    for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 아래 블럭이 있으면
        if (i < 0 || i >= 20) continue;
        //! 움직이는 블럭이 아니라면 continue
        for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
            // console.log('tick: ' + i, j);
            if (isActiveBlock(tetrisData[i][j])) { //! 움직이는 블럭이면
                activeBlocks.push([i, j]);
                if (isInvalidBlock(tetrisData[i + 1] && tetrisData[i + 1][j])) {
                    //! 아래의 칸이 없거나 아래에 블럭이 있다면
                    // console.log('아래 블럭이 있다!', i, j, tetrisData[i][j], tetrisData[i + 1] && tetrisData[i + 1][j], JSON.parse(JSON.stringify(tetrisData)));
                    canGoDown = false;
                }
            }
        }
    }
    //! canGoDown 판단하는 반복문 (true / false)

    // console.log('activeBlock: ' + activeBlocks);
    if (!canGoDown) {
        activeBlocks.forEach((blocks) => {
            tetrisData[blocks[0]][blocks[1]] *= 10;
            //! block고정
        });
        checkRows(); //! 지워질 줄 있나 확인
        generate(); //! 새 블록 생성
        return false; //! false라면 setInterval 종료

    } else if (canGoDown) {
        for (let i = tetrisData.length - 1; i >= 0; i--) {
            const col = tetrisData[i];
            col.forEach((row, j) => {
                if (row < 10 && tetrisData[i + 1] && tetrisData[i + 1][j] < 10) {
                    //! row는 열에 들어있는 numCode값. (10미만은 움직이는 배열값)
                    //! tetrisData[i+1]은 아래줄이 있는지 확인, 
                    //! 한칸 아래 numCode가 움직이는 배열인지 확인
                    tetrisData[i + 1][j] = row;
                    tetrisData[i][j] = 0;
                }
            });
        }
        currentTopLeft = nextTopLeft;
        draw();
        //! 계속 한칸씩내리면서 다시 그리기
        return true; //! true라면 setInterval 실행
    }
}

let int = setInterval(tick, 2000);
init();
generate();

document.querySelector('#stop').addEventListener('click', function() {
    clearInterval(int);
});

document.querySelector('#start').addEventListener('click', function() {
    if (int) {
        clearInterval(int);
    }
    int = setInterval(tick, 2000);
});

document.querySelector('#mute').addEventListener('click', function() {
    if (document.querySelector('#bgm').paused) {
        document.querySelector('#bgm').play();
    } else {
        document.querySelector('#bgm').pause();
    }
});

window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowLeft': { //! 키보드 왼쪽 클릭 = 좌측 한 칸 이동
            const nextTopLeft = [currentTopLeft[0], currentTopLeft[1] - 1];
            let isMovable = true;
            let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
            for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 왼쪽 공간 체크
                if (!isMovable) break;

                for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
                    //! isMovable을 정하는 반복문 (움직일수있는지 없는지 판단)
                    if (!tetrisData[i] || !tetrisData[i][j]) continue;
                        //! 공간이 비어있다면 continue
                    if (isActiveBlock(tetrisData[i][j]) && isInvalidBlock(tetrisData[i] && tetrisData[i][j - 1])) {
                        //! 움직일수는 있는 블럭이지만, 더이상 못내리는 블럭이거나 왼쪽으로 못움직일때
                        isMovable = false;
                    }   
                }
            }
            console.log('left', 'isMovable', isMovable);
            if (isMovable) {
                currentTopLeft = nextTopLeft;
                tetrisData.forEach((col, i) => {
                    for (var j = 0; j < col.length; j++) {
                        const row = col[j];
                        if (tetrisData[i][j - 1] === 0 && row < 10) {
                            console.log(row, tetrisData[i][j - 1], i, j);
                            tetrisData[i][j - 1] = row;
                            tetrisData[i][j] = 0;
                        }
                    }
                });
                draw();
            }
            break;
        }   
        case 'ArrowRight': { //! 키보드 오른쪽 클릭 = 우측 한 칸 이동
            const nextTopLeft = [currentTopLeft[0], currentTopLeft[1] + 1];
            let isMovable = true;
            let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
            for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 오른쪽 공간 체크
                if (!isMovable) break;
                for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
                    if (!tetrisData[i] || !tetrisData[i][j]) continue;
                    if (isActiveBlock(tetrisData[i][j]) && isInvalidBlock(tetrisData[i] && tetrisData[i][j + 1])) {
                        console.log(i, j);
                        isMovable = false;
                    }
                }
            }
            console.log('right', 'isMovable', isMovable);
            if (isMovable) {
                currentTopLeft = nextTopLeft;
                tetrisData.forEach((col, i) => {
                    for (var j = col.length - 1; j >= 0; j--) {
                        const row = col[j];
                        if (tetrisData[i][j + 1] === 0 && row < 10) {
                            tetrisData[i][j + 1] = row;
                            tetrisData[i][j] = 0;
                        }
                    }
                });
                draw();
            }
            break;
        }
        case 'ArrowDown': { //! 키보드 아래쪽 클릭 = 하방측 한 칸 이동
            tick();
        }
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'ArrowUp': { //! 방향 전환
        let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
        let isChangeable = true;
        const nextShapeIndex = currentBlock.currentShapeIndex + 1 === currentBlock.shape.length
            ? 0
            : currentBlock.currentShapeIndex + 1;
        const nextBlockShape = currentBlock.shape[nextShapeIndex];
        for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { //! 돌린 이후 공간 체크
            if (!isChangeable) break;
            for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
                if (!tetrisData[i]) continue;
                if (nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]] > 0 && isInvalidBlock(tetrisData[i] && tetrisData[i][j])) {
                    // console.log(i, j, currentTopLeft[0], currentTopLeft[1]);
                    isChangeable = false;
                }
            }
        }
        console.log('isChangeable', isChangeable);
        if (isChangeable) {
            console.log('isChangeable', JSON.parse(JSON.stringify(currentBlock)), nextBlockShape);
            while (currentTopLeft[0] < 0) {
                tick();
            }
            for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { //! 돌린 이후 공간 체크
                for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
                    if (!tetrisData[i]) continue;
                    let nextBlockShapeCell = nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]];
                    
                    if (nextBlockShapeCell > 0 && tetrisData[i][j] === 0) {
                        //! 다음 모양은 있는데 현재 칸이 없으면
                        tetrisData[i][j] = currentBlock.numCode;
                    } else if (nextBlockShapeCell === 0 && tetrisData[i][j] && tetrisData[i][j] < 10) {
                        //! 다음 모양은 없는데  현재 칸이 있으면
                        tetrisData[i][j] = 0;
                    }
                }
            }
            currentBlock.currentShapeIndex = nextShapeIndex;
        }
        draw();
        break;
    }

    case 'Space': // 한방에 쭉 떨구기
        while (tick()) {}
        break;
    }
});
