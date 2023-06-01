const swDisplay = document.querySelector("#swDisplay");
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;
let milis = 0;

startBtn.addEventListener('click', () => {
    if(paused){
        paused = false;
        startBtn.style.backgroundColor = 'rgb(184, 24, 24)';
        startBtn.textContent = 'Stop';
        resetBtn.style.backgroundColor = 'rgb(99, 95, 95)'
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
    } else if (!paused) {
        paused = true;
        startBtn.style.backgroundColor = 'rgb(24, 158, 24)'
        startBtn.textContent = 'Start';
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
})

resetBtn.addEventListener('click', () => {
    paused = true;
    clearInterval(intervalId);
    resetBtn.style.backgroundColor = 'rgb(56, 54, 54)';
    startBtn.style.backgroundColor = 'rgb(24, 158, 24)'
    startBtn.textContent = 'Start';
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    intervalId = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    milis = 0;
    swDisplay.textContent = '00:00:00:00';
})

function updateTime(){
    elapsedTime = Date.now() - startTime;

    milis = Math.floor(elapsedTime / 10);
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    milis = milis.toString();
    if(milis.length > 2){
        milis = milis.slice(-2);
    }

    milis = format(milis);
    secs = format(secs);
    mins = format(mins);
    hrs = format(hrs);

    swDisplay.textContent = `${hrs}:${mins}:${secs}:${milis}`;

    function format(unit){
        if((("0") + unit).length > 2){
            return unit;
        } else {
            return "0" + unit;
        }
    }
}