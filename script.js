//SAKSHI<*_*>
let startTime, elapsedTime = 0, intervalId, lapTimes = [];

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapListEl = document.getElementById('lap-list');
const colorSchemeSelect = document.getElementById('color-scheme');
const fontStyleSelect = document.getElementById('font-style');
const analogClockContainer = document.getElementById('analog-clock-container');
const currentDateEl = document.getElementById('current-date');

let targetTime, totalTime, pomodoroInterval, breakInterval, isStudyTime = true;
let hourHand, minuteHand, secondHand;

//CALL FN
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
colorSchemeSelect.addEventListener('change', changeColorScheme);
fontStyleSelect.addEventListener('change', changeFontStyle);
document.getElementById('gender').addEventListener('change', changeThemeBasedOnGender);

//ANALOG CLOCK
function initializeAnalogClock() {
  const clockCenter = analogClockContainer.offsetWidth / 2;

  hourHand = document.createElement('div');
  hourHand.classList.add('hour-hand');
  analogClockContainer.appendChild(hourHand);

  minuteHand = document.createElement('div');
  minuteHand.classList.add('minute-hand');
  analogClockContainer.appendChild(minuteHand);

  secondHand = document.createElement('div');
  secondHand.classList.add('second-hand');
  analogClockContainer.appendChild(secondHand);

  setInterval(updateAnalogClock, 1000);
}

function updateAnalogClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30;
  const minutesDegrees = (minutes / 60) * 360;
  const secondsDegrees = (seconds / 60) * 360;

  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
}

//CURRENT DATW
updateCurrentDate();
  setInterval(updateCurrentDate, 1000);

function updateTimer() {
  const currentTime = new Date().getTime();
  const timeElapsed = currentTime - startTime + elapsedTime;

  const milliseconds = Math.floor((timeElapsed % 1000) / 10);
  const seconds = Math.floor((timeElapsed / 1000) % 60);
  const minutes = Math.floor((timeElapsed / (1000 * 60)) % 60);

  minutesEl.textContent = formatTime(minutes);
  secondsEl.textContent = formatTime(seconds);
  millisecondsEl.textContent = formatTime(milliseconds);

  updateProgress(timeElapsed);
  updateRemainingTime(timeElapsed);

  if (targetTime && timeElapsed >= targetTime) {
    clearInterval(intervalId);
    if (isStudyTime) {
      startBreakTime();
    } else {
      startStudyTime();
    }
  }
}

function updateCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  currentDateEl.textContent = `${day}/${month}/${year}`;
}

function formatTime(time) {
  return time.toString().padStart(2, '0');
}

// STOPWATCH
//START
function startTimer() {
  startTime = new Date().getTime();
  intervalId = setInterval(updateTimer, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled = false;
}

//PAUSE
function pauseTimer() {
  clearInterval(intervalId);
  elapsedTime += new Date().getTime() - startTime;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

//RESET
function resetTimer() {
  clearInterval(intervalId);
  elapsedTime = 0;
  lapTimes = [];
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  minutesEl.textContent = '00';
  secondsEl.textContent = '00';
  millisecondsEl.textContent = '00';
  lapListEl.innerHTML = '';
}


//LAPS
function recordLap() {
  const lapTime = `${minutesEl.textContent}:${secondsEl.textContent}:${millisecondsEl.textContent}`;
  lapTimes.push(lapTime);
  const li = document.createElement('li');
  li.textContent = lapTime;
  lapListEl.appendChild(li);
}


//THEME CHANGING 
function changeColorScheme() {
  const colorScheme = colorSchemeSelect.value;
  document.body.style.backgroundColor = getColorSchemeColor(colorScheme, 'background');
  document.querySelector('.container').style.backgroundColor = getColorSchemeColor(colorScheme, 'container');
  document.querySelectorAll('h1, h2').forEach((heading) => {
    heading.style.color = getColorSchemeColor(colorScheme, 'heading');
  });
  document.querySelector('.display').style.color = getColorSchemeColor(colorScheme, 'display');
  document.querySelectorAll('.controls button').forEach((button) => {
    button.style.backgroundColor = getColorSchemeColor(colorScheme, 'button');
    button.style.color = getColorSchemeColor(colorScheme, 'buttonText');
  });
  document.querySelectorAll('.laps li').forEach((lapItem) => {
    lapItem.style.backgroundColor = getColorSchemeColor(colorScheme, 'lapItem');
  });
  analogClockContainer.style.backgroundColor = getColorSchemeColor(colorScheme, 'container');
  hourHand.style.backgroundColor = getColorSchemeColor(colorScheme, 'clockHands');
  minuteHand.style.backgroundColor = getColorSchemeColor(colorScheme, 'clockHands');
  secondHand.style.backgroundColor = getColorSchemeColor(colorScheme, 'clockSecondHand');
}

//THEME CHANGING ELEMENTS
function getColorSchemeColor(scheme, element) {
  const colorSchemes = {
    'pastel-pink': {
      background: '#fff',      //PASTEL PINK         .............FEMALE
      container: '#ffedf6',
      heading: '#ff69b4',
      display: '#ff1493',
      button: '#ff69b4',
      buttonText: '#fff',
      lapItem: '#ffedf6',
      taskItem: '#ffedf6',
      clockHands: '#ff69b4',
      clockSecondHand: '#ff1493'
    },
    'lavender': {
      background: '#fff',      //LAVENDER
      container: '#e6e6fa',
      heading: '#9370db',
      display: '#8a2be2',
      button: '#9370db',
      buttonText: '#fff',
      lapItem: '#e6e6fa',
      taskItem: '#e6e6fa',
      clockHands: '#9370db',
      clockSecondHand: '#8a2be2'
    },
    'mint-green': {
      background: '#fff',      //MINT GREEN
      container: '#f5fffa',
      heading: '#32cd32',
      display: '#3cb371',
      button: '#32cd32',
      buttonText: '#fff',
      lapItem: '#f5fffa',
      taskItem: '#f5fffa',
      clockHands: '#32cd32',
      clockSecondHand: '#3cb371'
    },
    'ocean-blue': {
      background: '#fff',      //OCEAN BLUE                ...............MALE
      container: '#e0ffff',
      heading: '#00bfff',
      display: '#1e90ff',
      button: '#00bfff',
      buttonText: '#fff',
      lapItem: '#e0ffff',
      taskItem: '#e0ffff',
      clockHands: '#00bfff',
      clockSecondHand: '#1e90ff'
    },
    'forest-green': {
      background: '#fff',      //FOREST GREEN     
      container: '#f0fff0',
      heading: '#228b22',
      display: '#006400',
      button: '#228b22',
      buttonText: '#fff',
      lapItem: '#f0fff0',
      taskItem: '#f0fff0',
      image: 'forest-green.png',
      clockHands: '#228b22',
      clockSecondHand: '#006400'
    }
  };
  return colorSchemes[scheme][element];
}

//FONT CHANGING
const fontStyles = [
  'Cursive',
  'Dancing Script',
  'handwriting',
  'sans-serif',
  'monospace',
  'fantasy',
  'brush-script'
];

fontStyles.forEach(style => {
  const option = document.createElement('option');
  option.value = style;
  option.textContent = style.charAt(0).toUpperCase() + style.slice(1);
  fontStyleSelect.appendChild(option);
});

function changeFontStyle() {
  const fontStyle = fontStyleSelect.value;
  document.body.style.fontFamily = fontStyle;
}

fontStyleSelect.addEventListener('change', changeFontStyle);


//GENDER THEME
function changeThemeBasedOnGender() {
  const gender = document.getElementById('gender').value;
  if (gender === 'male') {
    colorSchemeSelect.value = 'ocean-blue';                //MALE
  } else {
    colorSchemeSelect.value = 'pastel-pink';              //FEMALE
  }
  changeColorScheme();
}

//current date


//ONLOAD FN
window.onload = function() {
  initializeAnalogClock();
  changeThemeBasedOnGender();
  changeFontStyle();
};
