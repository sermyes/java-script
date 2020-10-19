// todo.1 자신의 이름을 한 글자씩 나누어 변수에 담은 후, 다시 하나의 변수에 담아 출력.
function stringOperator(){
    var l = 'l', e = 'e', s = 's', h = 'h', o = 'o', n = 'n', myName = '';
    myName = l.toUpperCase() + e + e + ' ' + s + e + h + o + o + n;
    console.log(myName);
}


// todo.2 다음 숫자가 출력 되도록 연산자를 활용하여 코드를 작성.
function numberOperator(){
    var number = 10;
    console.log(number++); // - 10
    console.log(++number); // - 12
    console.log(number--); // - 12
    console.log(--number); // - 10
}