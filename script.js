let timerInterval;
let stopwatchInterval;
let timerRunning = false;
let stopwatchRunning = false;
let timerStart;
let stopwatchStart;
let stopwatchPassed = 0;

const timerDisplay = document.getElementById("timerDisplay");
const timerHours = document.getElementById("timerHours");
const timerMin = document.getElementById("timerMinutes");
const timerSec = document.getElementById("timerSeconds");
const stopwatchDisplay = document.getElementById("stopwatchDisplay");

document.getElementById("startTimer").addEventListener("click", () => {
  if (!timerRunning) {
    const duration = calculateTimerDuration();

    if (!timerStart || timerDisplay.textContent === "Time's up!") {
      timerStart = Date.now();
    } else {
      const remainingTime = duration - (Date.now() - timerStart);
      timerStart = Date.now() - (duration - remainingTime);
    }

    timerInterval = setInterval(updateTimer, 100);
    timerRunning = true;

    setTimeout(() => {
      clearInterval(timerInterval);
      timerRunning = false;
      timerDisplay.textContent = "Time's up!";
    }, duration);
  }
});

document.getElementById("stopTimer").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerRunning = false;
});

document.getElementById("startStopwatch").addEventListener("click", () => {
  if (!stopwatchRunning) {
    stopwatchStart = Date.now() - stopwatchPassed;
    stopwatchInterval = setInterval(updateStopwatch, 10);
    stopwatchRunning = true;
  }
});

document.getElementById("stopStopwatch").addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchPassed = Date.now() - stopwatchStart;
});

document.getElementById("resetStopwatch").addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchPassed = 0;
  stopwatchDisplay.textContent = "00:00:00";
});

function updateTimer() {
  const elapsed = Date.now() - timerStart;
  const remaining = Math.max(0, calculateTimerDuration() - elapsed);
  timerDisplay.textContent = formatTime(remaining);
}

function calculateTimerDuration() {
  return (
    parseInt(timerHours.value) * 3600 * 1000 +
    parseInt(timerMin.value) * 60 * 1000 +
    parseInt(timerSec.value) * 1000
  );
}

function updateStopwatch() {
  stopwatchPassed = Date.now() - stopwatchStart;
  stopwatchDisplay.textContent = formatTime(stopwatchPassed);
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
}

function formatNumber(number) {
  return number.toString().padStart(2, "0");
}
