var resul = document.querySelector(".resul");
var btns = document.querySelector(".buttons");
var ops = document.querySelectorAll(".operator");
var clearToggle = false;
var timeFlag = false;
var valStack = [];
var canOperate = false;

btns.addEventListener("click",function(e){
    var resulValue = resul.innerHTML;
    var btn = e.target;

    // var doubleBordered = document.querySelector(".doubleBordered");
    // if(null !== doubleBordered) doubleBordered.classList.remove("doubleBordered");

    if(btn.className.indexOf("resetBtn") > -1){
        init();
    }else if(btn.className.indexOf("number") > -1){
        canOperate = true;
        if(clearToggle){
            resulValue = "";
            clearToggle = false;
        }
        if(resulValue == '0' && btn.className.indexOf("dot") === -1){
            resulValue = "";
        }
        resul.innerHTML = resulValue + btn.innerHTML;
    }else {
        clearToggle = true;
        if(canOperate){
            btn.classList.add("doubleBordered");

            if(btn.innerHTML === '*' || btn.innerHTML === '/'){
                if(!timeFlag){
                    valStack.push(resulValue);
                    valStack.push(btn.innerHTML);
                    timeFlag = true;
                    return;
                }
            }else if(btn.innerHTML === '%'){
                resulValue = parseFloat(resulValue/100);
                // valStack.push(resulValue);
                resul.innerHTML = resulValue;
                return;
            }

            if(valStack.length > 1){
                var op = valStack.pop();
                var num1 = valStack.pop();
                resulValue = calculate(num1,resulValue,op);
                if((btn.innerHTML === '+' || btn.innerHTML === '-'|| btn.innerHTML === '=') && timeFlag){
                    while(valStack.length > 1){
                        op = valStack.pop();
                        num1 = valStack.pop();
                        resulValue = calculate(num1,resulValue,op);
                    }
                    timeFlag = false;
                }

            }
            valStack.push(resulValue);
            valStack.push(btn.innerHTML);
            resul.innerHTML = resulValue;
            if(btn.innerHTML === '='){
                clearToggle = true;
                timeFlag = false;
                valStack = [];
                return;
            }
        }
        canOperate = false;
    }

},false);

function calculate(num1,num2,op){
    switch (op) {
        case "+":
            return parseFloat(num1) + parseFloat(num2);
        case "-":
            return parseFloat(num1) - parseFloat(num2);
        case "*":
            return parseFloat(num1) * parseFloat(num2);
        case "/":
            return parseFloat(num1) / parseFloat(num2);

    }
}

function init(){
    clearToggle = false;
    timeFlag = false;
    valStack = [];
    canOperate = false;
    resul.innerHTML = "0";
}
