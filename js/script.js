let prevNumber = undefined;
let operator = undefined;
addNumberButtonFunctionality();
addOperatorButtonFunctionality();
addClearButtonFunctionality();
addDotButtonFunctionality();
addRootButtonFunctionality();
addPlusminusButtonFunctionality();
addEqualsButtonFunctionality();
clickedBackspace();

function addNumberButtonFunctionality() {
    const buttons = document.querySelectorAll('button.number');

    buttons.forEach((button) => {
        let num = button.getAttribute('data-num');
        button.addEventListener('click', () => getNewNumber(num));
    });
}

function addOperatorButtonFunctionality() {
    const buttons = document.querySelectorAll('button.operator');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if(!operator) {
                const curr = document.querySelector('.screen-current');
                if(curr.textContent.trim() === 'NaN') {
                    return;
                }
                prevNumber = +curr.textContent;
                operator = button.innerHTML;
                const prev = document.querySelector('.screen-last');
                prev.textContent = prevNumber + ' ' + operator;
                curr.textContent = 0;
            }
        });
    });
}

function addPlusminusButtonFunctionality() {
    const button = document.querySelector('button.plusminus');
    button.addEventListener('click', () => {
        const curr = document.querySelector('.screen-current');
        curr.textContent = (+curr.textContent) * -1;
    });
}

function addRootButtonFunctionality() {
    const button = document.querySelector('button.root');
    button.addEventListener('click', () => {
        const curr = document.querySelector('.screen-current');
        curr.textContent = Math.sqrt(+curr.textContent);
    });
}

function addClearButtonFunctionality() {
    const button = document.querySelector('button.clear');
    button.addEventListener('click', () => {
        const curr = document.querySelector('.screen-current');
        curr.textContent = '';
        const prev = document.querySelector('.screen-last');
        prev.textContent = '';
        prevNumber = undefined;
        operator = undefined;
    });
}

function addDotButtonFunctionality() {
    const button = document.querySelector('button.dot');
    button.addEventListener('click', () => {
        const curr = document.querySelector('.screen-current');
        let num = curr.textContent;
        if(num.includes('.')) {
            return;
        }
        curr.textContent = num + ".";
    });
}

function addEqualsButtonFunctionality() {
    
    const button = document.querySelector('button.equals');
    button.addEventListener('click', () => {
        const curr = document.querySelector('.screen-current');
        let num = +curr.textContent;
        const prev = document.querySelector('.screen-last');
        if(prevNumber === undefined || operator === undefined){
            return;
        }
        if(operator === "+") {
            prev.textContent = prevNumber + " + " + num + " = ";
            curr.textContent = +prevNumber + num;
        } else if(operator === '-') {
            prev.textContent = prevNumber + " - " + num + " = ";
            curr.textContent = +prevNumber - num;
        } else if(operator === '%') {
            prev.textContent = prevNumber + " % " + num + " = ";
            curr.textContent = +prevNumber % num;
        } else if(operator === 'x') {
            prev.textContent = prevNumber + " x " + num + " = ";
            curr.textContent = +prevNumber * num;
        } else {
            prev.textContent = prevNumber + " / " + num + " = ";
            curr.textContent = +prevNumber / num;
        }
        prevNumber = +curr.textContent;
        operator = undefined;
    });
}

function getNewNumber(number) {
    const curr = document.querySelector('.screen-current');
    if(curr.textContent.trim() === '0' || curr.textContent.trim() === '' || curr.textContent.trim() === 'NaN') {
        curr.textContent = number;
        return;
    }
    curr.textContent += number;
}

function clickedBackspace(){
    document.querySelector('.main').addEventListener('keydown',(event) => {
        if(event.key === "Backspace") {
            const curr = document.querySelector('.screen-current');
            curr.textContent = curr.textContent.slice(0, -1);
        }
    });
}