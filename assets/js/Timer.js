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
  if (minute === 60) {
    second = 0;
    minute = 0;
    hour++;
  }
  
  if (second === 60) {
    minute++;
    second = 0;
  }
  
  second++;
  
  hourID.innerText = String(hour);
  minuteID.innerText = String(minute);
  secondID.innerText = String(second);
}

function clearTimer () {
  clearInterval(interval);
  hour = 0;
  minute = 0;
  second = 0;
  interval = null;
}