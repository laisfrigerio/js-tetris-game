let hour = 0;
let minute = 0;
let second = 0;
let hourID = document.querySelector('#hour');
let minuteID = document.querySelector("#minute");
let secondID = document.querySelector("#second");
let interval = null;

function startTimer () {
  interval = window.setInterval(function() {
    if (!PAUSE) {
      updateTimer();
    }
  }, 1000);
}

function updateTimer() {
  if (minute === 59) {
    second = 0;
    minute = 0;
    hour++;
  }
  
  if (second === 59) {
    minute++;
    second = 0;
  }
  
  second++;
  
  hourID.innerText = hour < 10 ? (0 + String(hour)) : String(hour);
  minuteID.innerText = minute < 10 ? (0 + String(minute)) : String(minute);
  secondID.innerText = second < 10 ? (0 + String(second)) : String(second);
}

function clearTimer () {
  clearInterval(interval);
  hour = 0;
  minute = 0;
  second = 0;
  interval = null;
}