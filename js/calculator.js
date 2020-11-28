// Követelmények:
// Az eval metódus használata SZIGORÚAN TILOS! Most és mindörökké!
// Egyelőre nem kell foglalkozni azzal az esettel, hogy mi történik,
// ha két műveleti jel van egymás után. Ilyen esetekben dobhattok hibát.
// A felső input mezőben jelenjen meg az ERROR szöveg.
// Egymás után több művelet is végrehajtható, pl.: 10 - 20 + 3 * 2.
// Ilyen esetben a precedencia szabályokra még nem kell odafigyeled,
// csak balról jobbra, sorban értékelődjenek ki a műveletek!
// A számok és műveleti jelek a felső input mezőben jelenjenek meg.
// Az egyenlőségjelre kattintva az inputban megjelenik a művelet(ek) eredménye
// A C gomb törli az input mező tartamát

'use strict'

// ezekben gyűjtjük a kijelzöbe kerülő számokat / aritmetikai műveleteket
const numericAccu = [];
let numericStringTaylor; // az aktuális numerikus adat ebben gyűlik
const arithmAccu = [];
let result = 0;

// a gombok
const arithmButtons = document.querySelectorAll('.arithmButton');
const numButtons = document.querySelectorAll('.num');
const dotButton = document.querySelector('.dot');
const clearButton = document.querySelector('.clear');
const equButton = document.querySelector('.equButton');

// a kijelző
const calcDisplay = document.querySelector('#calcDisplay');

// figyeljük, az előző karakter műveleti jel, illetve pont volt-e
// nem engedünk meg egymást követően sem két .-ot, sem két műveleti jelet
let lastCharIsArithmSign = false;    //
let noDotYet = true;

// toDOs:
//
// firstDot helyett noDotYet kell, és akkor nem kell a lastCharIsDot sem ! fulfilled
// a kijelzőt (kezdeti 0-t, eredményt) törölni kell, ha még üres a  numericStringTaylor ! fulfilled
// kell egy  result  változó -- ebbe kerül az eredmény + a kijelzőre
// a calculate() hiányzik -- = jel leütésére aktiválni ! fulfilled
// a resetAll-nak törölnie kell a  result-ot  is, és a  noDotYet-et true-ra ! fulfilled
// tesztelés után a resultot a returnbe közvetlenül

const resetResult = () => result = 0;

const resetNumericTaylor = () => numericStringTaylor = '';
resetNumericTaylor();

const resetNumericAccu = () => numericAccu.length = 0;
resetNumericAccu();

const resetArithmAccu = () => arithmAccu.length = 0;
resetArithmAccu();

const setLastCharIsArithmSignWatch = () => lastCharIsArithmSign = true;
const setDotWatch = () => noDotYet = false; // ************
const resetLastCharIsArithmSignWatch = () => lastCharIsArithmSign = false;
const resetDotWatch = () => noDotYet = true; // ***********

const resetWatches = () => {
    resetLastCharIsArithmSignWatch();
    resetDotWatch(); // *************** hol fordul elő????
}

// const isLastCharArithmSign = () => lastCharIsArithmSign;

const putCharInNumericTaylor = (char) => {
    numericStringTaylor += char;
}

const moveResult2NumericTaylor = (result) => {
    numericStringTaylor = result;
}

const moveNumberStringInNumericAccu = () => {
    numericAccu[numericAccu.length] = numericStringTaylor;
    resetNumericTaylor();
}
const putSignInArithmAccu = (sign) => arithmAccu[arithmAccu.length] = sign;

const putCharInDisplay = (char) => {
    calcDisplay.value = (calcDisplay.value == '0') ? char : calcDisplay.value + char;
}

const displayResult = (result) => calcDisplay.value = result;

const sendErrorMessage = () => calcDisplay.value = "*** ERROR ***";
const clearDisplay = () => calcDisplay.value = '0';

const resetAll = () => {
    console.log('total clear');
    resetNumericTaylor();
    resetNumericAccu();
    resetArithmAccu();
    resetWatches();
    clearDisplay();
    resetResult();
}

const manageError = () => {
    sendErrorMessage();
    setTimeout(() => resetAll(), 2000);
}

const manageArithmetics = (button) => {
    let arithmSign = button.getAttribute('value');
    console.log(arithmSign);
    if (!lastCharIsArithmSign && numericStringTaylor.length && numericStringTaylor != '.') {
        moveNumberStringInNumericAccu();
        putSignInArithmAccu(arithmSign);
        putCharInDisplay(arithmSign);
        setLastCharIsArithmSignWatch();
        resetDotWatch();
    } else {
        manageError();
    }
}

const manageNums = (button) => {
    let numChar = button.getAttribute('value');
    console.log(numChar);
    putCharInDisplay(numChar);
    putCharInNumericTaylor(numChar);
    resetLastCharIsArithmSignWatch();
}

const manageDot = () => {
    if (noDotYet) {    // *************
        putCharInNumericTaylor('.');
        putCharInDisplay('.');
        resetLastCharIsArithmSignWatch();
        setDotWatch();
    } else {
        manageError();
    }
}

const calculate = () => {
    console.log('calculation in progress');
    moveNumberStringInNumericAccu();
    // tesztelés után ezt a returnbe közvetlenül *************
    result = numericAccu.reduce((sum, item, idx) => console.log(item, idx));
    console.log(result);
    return result;
}

// gombok aktívvá tétele
const activateArithmButtons = () => arithmButtons.forEach((button) => button.addEventListener('click', () => manageArithmetics(button)));
activateArithmButtons();

const activateNumButtons = () => numButtons.forEach((button) => button.addEventListener('click', () => manageNums(button)));
activateNumButtons();

const activateDotButton = () => dotButton.addEventListener('click', () => manageDot());
activateDotButton();

const activateEquButton = () => equButton.addEventListener('click', () => {
    let temp = calculate();
    resetAll();
    displayResult(temp);
    moveResult2NumericTaylor(temp);
});
activateEquButton();

const activateClearButton = () => clearButton.addEventListener('click', () => resetAll());
activateClearButton();

// just while testing
const testVariables = () => {
    console.log('numericAccu: ', numericAccu);
    console.log('numericStringTaylor: ', numericStringTaylor);
    console.log('arithmAccu: ', arithmAccu);
    console.log('lastCharIsArithmSign: ', lastCharIsArithmSign);
    console.log('noDotYet: ', noDotYet);
}
