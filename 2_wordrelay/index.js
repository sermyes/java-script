const btn = document.querySelector("#button");
const dictionary = [];
btn.addEventListener('click', () => {
    const inputTag = document.querySelector("#input");
    const wordTag = document.querySelector("#word");
    const resultTag = document.querySelector("#result");
    const dictionaryTag = document.querySelector("#dictionary");
    const input = inputTag.value;
    const word = wordTag.textContent;

    if(input[0] === word[word.length-1]){
        if(dictionary.includes(input)){
            resultTag.textContent = '중복입니다'
            inputTag.value = '';
            inputTag.focus();
        }else{
            wordTag.textContent = input;
            resultTag.textContent = '다음 단어를 입력하세요'
            inputTag.value = '';
            inputTag.focus();
            dictionary.push(input);
            dictionaryTag.textContent = dictionary;
        }
    }else{
        resultTag.textContent = '틀렸습니다'
        inputTag.value = '';
        inputTag.focus();
    }
});

// input은 값을 가져오거나 변경할 때 value, 나머지(span,div..)는 textContent로 값을 가져온다.
// click 대신 submit 을하고 form tag를 쓰면 엔터로 사용할 수 있다.