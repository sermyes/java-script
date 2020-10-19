//todo.1 구구단 숫자를 입력받아 출력하는 for문.
function gugudan(){
    var num = parseInt(window.prompt("원하는 구구단을 숫자로 입력하세요"));
    document.write(num + "단 출력" + "<br>");
    if(num < 10){
        for(let i = 1; i <= 9; i++){
            document.write(num + " * " + i + " = " + (num * i) + "<br>");
        }
    }
    else{
        for(let i = 1; i <= num; i++){
            document.write(num + " * " + i + " = " + (num * i) + "<br>");
        }
    }
}


// todo.2 배열의 총 합을 구하기. var data = [10,20,30,40,50];
function sumArray(){
    var data = [10,20,30,40,50];
    var sum = 0;
    for (let i in data){
        sum += data[i];
    }
    return sum;
}