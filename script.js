// script.js

let startTime, updatedTime, difference, tInterval;
let paused = true;
let lapCount = 1;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

document.getElementById("start").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", recordLap);

function start() {
    if (paused) {
        paused = false;
        startTime = startTime ? Date.now() - difference : Date.now();
        tInterval = setInterval(updateTime, 10); // Update every 10 milliseconds
    }
}

function pause() {
    if (!paused) {
        paused = true;
        clearInterval(tInterval);
        difference = Date.now() - startTime;
    }
}

function reset() {
    paused = true;
    clearInterval(tInterval);
    startTime = null;
    difference = 0;
    display.textContent = "00:00:00";
    laps.innerHTML = "";
    lapCount = 1;
}

function recordLap() {
    if (!paused) {
        const lapTime = display.textContent;
        const lapElement = document.createElement("li");
        lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
        laps.appendChild(lapElement);
        lapCount++;
    }
}

function updateTime() {
    updatedTime = Date.now() - startTime;
    const minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((updatedTime % 1000) / 10);
    display.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(unit) {
    return unit < 10 ? "0" + unit : unit;
}
