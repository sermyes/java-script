const table = document.querySelector('#table');
const score = document.querySelector('#score');
let data = [];

function init(){
    const fragment = document.createDocumentFragment();
    //! fragment node를 생성해서 table에 넣으면 tbody 생성이 되지않는다.
    [1, 2, 3, 4].forEach(function() {
        let columnData = [];
        data.push(columnData);
        const tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(function() {
            columnData.push(0);
            const td = document.createElement('td');
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    table.appendChild(fragment);
}

function randomGenerator(){
    let emptyArray = [];
    data.forEach(function(columnData, i){
        columnData.forEach(function(rowData, j){
            if(!rowData){
                emptyArray.push([i, j]);
            }
        });
    });
    if(emptyArray.length === 0){
        alert('게임오버: ' + score.textContent);
        table.innerHTML = '';
        init();
    }else{
        let rand = emptyArray[ Math.floor(Math.random() * emptyArray.length) ];
        //! empty배열안에 [i, j]로 들어있는 random한 행과 열을 뽑는다.
    
        data[rand[0]][rand[1]] = 2;
        draw();
    }
}

function draw(){
    data.forEach(function(columnData, i){
        columnData.forEach(function(rowData, j){
            if(rowData > 0){
                table.children[i].children[j].textContent = rowData;
            }else{
                table.children[i].children[j].textContent = '';
            }
        });
    });
}

init();
randomGenerator();

let dragFlag = false;
let dragging = false;
let startCoordi;
let endCoordi;

window.addEventListener('mousedown', function(e){
    //! 마우스 이벤트 종류 
    //! screenX : 모니터기준, pageX: 페이지기준, clientX: 브라우저기준, offsetX: 이벤트타겟기준
    dragFlag = true;
    startCoordi = [e.clientX, e.clientY];
});

window.addEventListener('mousemove', function(e){
    if(dragFlag){
        dragging = true;
    }
});

window.addEventListener('mouseup', function(e){
    endCoordi = [e.clientX, e.clientY];
    let direction;

    if(dragging){
        let distanceX = endCoordi[0] - startCoordi[0];
        let distanceY = endCoordi[1] - startCoordi[1];

        if(distanceX < 0 && Math.abs(distanceX) / Math.abs(distanceY) > 1){
            direction = 'left';
        }else if(distanceX > 0 && Math.abs(distanceX) / Math.abs(distanceY) > 1){
            direction = 'right';
        }else if(distanceY > 0 && Math.abs(distanceX) / Math.abs(distanceY) < 1){
            direction = 'down';
        }else if(distanceY < 0 && Math.abs(distanceX) / Math.abs(distanceY) < 1){
            direction = 'up';
        }
    }
    
    dragFlag = false;
    dragging = false;

    switch(direction){
            case 'left': 
            var newData1 = [
                [],
                [],
                [],
                []
            ];
            data.forEach(function(columnData, i){
                columnData.forEach(function(rowData, j){
                    if(rowData){
                        if(newData1[i][newData1[i].length - 1] && newData1[i][newData1[i].length - 1] === rowData){
                            newData1[i][newData1[i].length - 1] *= 2;
                            let currentScore = Number(score.textContent);
                            score.textContent = currentScore + newData1[i][newData1[i].length - 1];
                        }else{
                            newData1[i].push(rowData);
                        }
                    }
                });
            });
            console.log(newData1[newData1.length]);
            [1, 2, 3, 4].forEach(function(columnData, i ){
                [1, 2, 3, 4].forEach(function(rowData, j){
                    data[i][j] = newData1[i][j] || 0;
                });    
            });
            break;
        case 'right':
            var newData2 = [
                [],
                [],
                [],
                []
            ];
            data.forEach(function(columnData, i){
                columnData.forEach(function(rowData, j){
                    if(rowData){
                        if(newData2[i][newData2[i].length - 1] && newData2[i][newData2[i].length - 1] === rowData){
                            newData2[i][newData2[i].length - 1] *= 2;
                            let currentScore = Number(score.textContent);
                            score.textContent = currentScore + newData2[i][newData2[i].length - 1];
                        }else{
                            newData2[i].unshift(rowData);
                        }
                    }
                });
            });
            [1, 2, 3, 4].forEach(function(columnData, i ){
                [1, 2, 3, 4].forEach(function(rowData, j){
                    data[i][3 - j] = newData2[i][j] || 0;
                });    
            });
            break;
        case 'up':
            let newData3 = [
                [],
                [],
                [],
                []
            ];
            data.forEach(function(columnData, i){
                columnData.forEach(function(rowData, j){
                    if(rowData){
                        if(newData3[j][newData3[j].length - 1] && newData3[j][newData3[j].length - 1] === rowData){
                            newData3[j][newData3[j].length - 1] *= 2;
                            let currentScore = Number(score.textContent);
                            score.textContent = currentScore + newData3[j][newData3[j].length - 1];
                        }else{
                            newData3[j].push(rowData);
                        }
                    }
                });
            });
            [1, 2, 3, 4].forEach(function(rowData, i ){
                [1, 2, 3, 4].forEach(function(columnData, j){
                    data[j][i] = newData3[i][j] || 0;
                });    
            });
            break;
        case 'down':
            var newData4 = [
                [],
                [],
                [],
                []
            ];
            data.forEach(function(columnData, i){
                columnData.forEach(function(rowData, j){
                    if(rowData){
                        if(newData4[j][newData4[j].length - 1] && newData4[j][newData4[j].length - 1] === rowData){
                            newData4[j][newData4[j].length - 1] *= 2;
                            let currentScore = Number(score.textContent);
                            score.textContent = currentScore + newData4[j][newData4[j].length - 1];
                        }else{
                            newData4[j].unshift(rowData);
                        }
                    }
                });
            });
            [1, 2, 3, 4].forEach(function(rowData, i ){
                [1, 2, 3, 4].forEach(function(columnData, j){
                    data[3 - j][i] = newData4[i][j] || 0;
                });    
            });
            break;
    }
    draw();
    randomGenerator();
});