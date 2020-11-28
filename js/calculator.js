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
let lastCharIsArithmSign = false;//
// javítani noDotYet-re
// let lastCharIsDot = false; ***********
let noDotYet = true;
//
// javítani noDotYet-re
// let firstDot = true; ************* ez már nem is kell

// toDOs:
//
// firstDot helyett noDotYet kell, és akkor nem kell a lastCharIsDot sem !
// kell egy  result  változó -- ebbe kerül az eredmény + a kijelzőre
// a kijelzőt (kezdeti 0-t, eredményt) törölni kell, ha még üres a  numericStringTaylor
// a calculate() hiányzik -- = jel leütésére aktiválni
// a resetAll-nak törölnie kell a  result-ot  is, és a  noDotYet-et true-ra

const resetNumericTaylor = () => numericStringTaylor = '';
resetNumericTaylor();

const resetNumericAccu = () => numericAccu.length = 0;
resetNumericAccu();

const resetArithmAccu = () => arithmAccu.length = 0;
resetArithmAccu();

const setLastCharIsArithmSignWatch = () => lastCharIsArithmSign = true;
// javítani noDotYet-re
// const setDotWatch = () => lastCharIsDot = true;
const setDotWatch = () => noDotYet = false; // ************
const resetLastCharIsArithmSignWatch = () => lastCharIsArithmSign = false;
// javítani noDotYet-re
// const resetDotWatch = () => lastCharIsDot = false;
const resetDotWatch = () => noDotYet = true; // ***********

const resetWatches = () => {
    resetLastCharIsArithmSignWatch();
    resetDotWatch(); // *************** hol fordul elő????
}

// const isLastCharArithmSign = () => lastCharIsArithmSign;
// nincs már ilyen: lastCharIsDot
// const isLastCharDot = () => lastCharIsDot;

const putCharInNumericTaylor = (char) => numericStringTaylor += char;
const moveNumberStringInNumericAccu = () => {
    numericAccu[numericAccu.length] = numericStringTaylor;
    resetNumericTaylor();
}
const putSignInArithmAccu = (sign) => arithmAccu[arithmAccu.length] = sign;
const putCharInDisplay = (char) => calcDisplay.value += char;

const sendErrorMessage = () => calcDisplay.value = "*** ERROR ***";
const clearDisplay = () => setTimeout(() => {
    calcDisplay.value = '0';
}, 2000);

const manageError = () => {
    sendErrorMessage();
    resetNumericTaylor();
    resetNumericAccu();
    resetArithmAccu();
    resetWatches();
    // javítani noDotYet-re
    // firstDot = true;
    // noDotYet = true;    // ************ erre nincs is szükség
    clearDisplay();
}

const manageArithmetics = (button) => {
    let arithmSign = button.getAttribute('value');
    console.log(arithmSign);
    if (!lastCharIsArithmSign && numericStringTaylor.length) {
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
    putCharInNumericTaylor(numChar);
    putCharInDisplay(numChar);
    resetLastCharIsArithmSignWatch();
}

const manageDot = () => {
    // javítani mindkettőt noDotYet-re
    // if (!lastCharIsDot && firstDot) {
    if (noDotYet) {    // *************
        putCharInNumericTaylor('.');
        putCharInDisplay('.');
        resetLastCharIsArithmSignWatch();
        setDotWatch();
        // javítani noDotYet-re
        // firstDot = false;
        // noDotYet = false;   // ************** ez nem is kell
    } else {
        manageError();
    }
}

const calculate = () => {
    console.log('calculation in progress');
}

const resetAll = () => {
    console.log('total clear');
}

// gombok aktívvá tétele
const activateArithmButtons = () => arithmButtons.forEach((button) => button.addEventListener('click', () => manageArithmetics(button)));
activateArithmButtons();

const activateNumButtons = () => numButtons.forEach((button) => button.addEventListener('click', () => manageNums(button)));
activateNumButtons();

const activateDotButton = () => dotButton.addEventListener('click', () => manageDot());
activateDotButton();

const activateEquButton = () => equButton.addEventListener('click', () => calculate());
activateEquButton();

const activateClearButton = () => clearButton.addEventListener('click', () => resetAll());
activateClearButton();



// const manageButtonClick = (button) => {

// }

const testVariables = () => {
    console.log('numericAccu: ', numericAccu);
    console.log('numericStringTaylor: ', numericStringTaylor);
    console.log('arithmAccu: ', arithmAccu);
    console.log('lastCharIsArithmSign: ', lastCharIsArithmSign);
    console.log('noDotYet: ', noDotYet);
}
