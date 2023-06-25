const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const template = document.querySelector('body');
let intervalId = null;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

function onStopClick() {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function onStartClick() {
  getBodyRandomColor();
  intervalId = setInterval(() => {
    getBodyRandomColor();
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function getBodyRandomColor() {
  template.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
