const clickSound = new Audio("click-sound.wav");
const equalsSound = new Audio("equals-sound.wav");

class Calculator{
    // Constructor KYA 
    constructor( previousOperandTextElement , currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();           // Initialy clears the screen
    }
    
    // Variables are declared here
    clear(){
        this.currentOperand ='';            // Empyty string
        this.previousOperand ='';
        this.operation = undefined;
        
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, this.currentOperand.length-1);    
    }
    appendNumber(number){
        if(number === '.'  && this.currentOperand.includes('.'))    return ;
        this.currentOperand = this.currentOperand.toString() + number.toString() ; // To avoid actual adding of numbers
    }
    chooseOperation(Operation){
        if(this.currentOperand === '')   return;
        if(this.previousOperand !==''){
            this.compute();
        }
        this.operation = Operation ;
        this.previousOperand = this.currentOperand ;
        this.currentOperand = '';
        this.previousOperand = this.previousOperand.toString() + Operation.toString();
    }
    compute(){
        let ans;
        let previous = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);

        if(isNaN(previous) || isNaN(current))   return; // isNaN means not a number
        switch(this.operation){
            case '+':
                ans = previous + current;
                break;
            case '/':
                ans = previous / current;
                break;
            case '-':
                ans = previous - current;
                break;
            case '*':
                ans = previous * current;
                break;
            default :
                return;
        }
        this.currentOperand = ans;
        this.operation = undefined ;
        this.previousOperand = '';

    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
        
    }
}
// Selecting all the required elements
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')

const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// creating object of Calculator class
const calculator = new Calculator(previousOperandTextElement ,currentOperandTextElement  )

numberButtons.forEach(value =>{
    value.addEventListener('click' ,()=>{
        clickSound.play();
        calculator.appendNumber(value.innerText);
        calculator.updateDisplay();
    })
} )

operationButtons.forEach(value =>{
    value.addEventListener('click' ,()=>{
        clickSound.play();
        calculator.chooseOperation(value.innerText);
        calculator.updateDisplay();
    })
} )
equalsButton.addEventListener('click' ,() =>{
    equalsSound.play();
    calculator.compute();
    calculator.updateDisplay();
})
allClearButton.addEventListener('click' ,()=>{
    clickSound.play();
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click' , ()=>{
    clickSound.play();
    calculator.delete();
    calculator.updateDisplay();
})