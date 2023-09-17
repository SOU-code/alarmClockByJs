const secondLine = document.querySelector(".secondLine");
const minuteLine = document.querySelector(".minuteLine");
const hourLine = document.querySelector(".hourLine");
const digitalClockValue = document.querySelector(".digitalClock");
const hourInput = document.querySelector(".hourInput");
const minuteInput = document.querySelector(".minuteInput");
const apInput = document.querySelectorAll("option");
const buttons = document.querySelectorAll("button");
const submitAlarm = document.querySelector(".submit");
const alarmList = document.querySelector(".alarmList");
alarmList.innerHTML = window.localStorage.getItem("codeNinjaAlarms");
const sound = new Audio("./alarmMusic.wav");
const stopAlarm = document.querySelector(".stopAlarm");
const allNotifications = document.querySelector(".notifications");
function analogClock(hour, minute, second) {
  const secondDeg = 6 * second;
  const minuteDeg = 6 * minute;
  const hourDeg = 30 * hour + Math.floor(6 * (minute / 12));
  secondLine.style.transform = "rotate(" + secondDeg + "deg)";
  minuteLine.style.transform = "rotate(" + minuteDeg + "deg)";
  hourLine.style.transform = "rotate(" + hourDeg + "deg)";
}
let currtTime;
function digitalClock(hour, minute, second) {
  const ap = checkAP(hour);
  if (hour == 0) {
    hour = 12;
  }
  if (hour > 12) {
    hour = hour - 12;
  }
  function checkLessTen(ele) {
    if (ele < 10) {
      return "0" + ele;
    }
    return ele;
  }
  function checkAP(hour) {
    if (hour >= 12) {
      return "PM";
    }
    return "AM";
  }
  digitalClockValue.textContent =
    checkLessTen(hour) +
    ":" +
    checkLessTen(minute) +
    ":" +
    checkLessTen(second) +
    " " +
    ap;
  if (checkLessTen(second) == 0) {
    currtTime = checkLessTen(hour) + ":" + checkLessTen(minute) + " " + ap;
  } else {
    currtTime =
      checkLessTen(hour) +
      ":" +
      checkLessTen(minute) +
      ":" +
      checkLessTen(second) +
      " " +
      ap;
  }
}
setInterval(() => {
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  analogClock(hour, minute, second);
  digitalClock(hour, minute, second);
  const alarmAll = document.querySelectorAll(".alarmValue");
  if (alarmAll.length) {
    alarmAll.forEach((eachAlarm) => {
      if (eachAlarm.innerHTML == currtTime) {
        stopAlarm.style.display = "block";
        sound.loop = true;
        sound.play();
      }
    });
  }
}, 1000);
function alarmInput() {
  const nowTime = new Date();
  let hour = nowTime.getHours();
  let minute = nowTime.getMinutes();
  const ap = checkAP(hour);
  if (hour == 0) {
    hour = 12;
  }
  if (hour > 12) {
    hour = hour - 12;
  }
  function checkLessTen(ele) {
    if (ele < 10) {
      return "0" + ele;
    }
    return ele;
  }
  function checkAP(hour) {
    if (hour >= 12) {
      return "PM";
    }
    return "AM";
  }
  hourInput.textContent = checkLessTen(hour);
  minuteInput.textContent = checkLessTen(minute);
  apInput.forEach((element) => {
    if (element.value == ap) {
      element.selected = true;
    }
  });
  buttons.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.innerHTML == "+") {
        if (element.parentNode.className == "minuteAlarm") {
          if (element.previousElementSibling.textContent <= 58) {
            element.previousElementSibling.textContent = checkLessTen(
              ++element.previousElementSibling.textContent
            );
          } else {
            element.previousElementSibling.textContent = checkLessTen(0);
          }
        } else if (element.parentNode.className == "hourAlarm") {
          if (element.previousElementSibling.textContent <= 11) {
            element.previousElementSibling.textContent = checkLessTen(
              ++element.previousElementSibling.textContent
            );
          } else {
            element.previousElementSibling.textContent = checkLessTen(1);
          }
        }
      } else if (element.innerHTML == "-") {
        if (element.parentNode.className == "minuteAlarm") {
          if (element.nextElementSibling.textContent >= 1) {
            element.nextElementSibling.textContent = checkLessTen(
              --element.nextElementSibling.textContent
            );
          } else {
            element.nextElementSibling.textContent = "59";
          }
        } else if (element.parentNode.className == "hourAlarm") {
          if (element.nextElementSibling.textContent >= 2) {
            element.nextElementSibling.textContent = checkLessTen(
              --element.nextElementSibling.textContent
            );
          } else {
            element.nextElementSibling.textContent = 12;
          }
        }
      }
    });
  });
}
alarmInput();
submitAlarm.addEventListener("click", () => {
  const alarms = document.querySelectorAll("li");
  if (alarms.length < 3) {
    const alarmHour = hourInput.textContent;
    const alarmMinute = minuteInput.textContent;
    let alarmAP;
    apInput.forEach((element) => {
      if (element.selected) {
        alarmAP = element.value;
      }
    });
    const newAlarm = document.createElement("li");
    newAlarm.innerHTML = `<div class='alarmTime'><img src='./clock.png'><div class="alarmValue">${alarmHour}:${alarmMinute} ${alarmAP}</div></div><div class='alarmClear'>Clear</div>`;
    alarmList.append(newAlarm);
    saveData();
    const eachNotification = document.createElement("div");
    eachNotification.classList.add("success");
    eachNotification.innerText = "Alarm Added !!";
    console.log(eachNotification);
    allNotifications.appendChild(eachNotification);
    console.log(allNotifications);
    setTimeout(() => {
      eachNotification.remove();
    }, 3000);
  }
  else {
    const eachNotification = document.createElement("div");
    eachNotification.classList.add("warning");
    eachNotification.innerText = "Maximum Alarm Added !!";
    console.log(eachNotification);
    allNotifications.appendChild(eachNotification);
    console.log(allNotifications);
    setTimeout(() => {
      eachNotification.remove();
    }, 3000);
  }
});
function saveData() {
  window.localStorage.setItem("codeNinjaAlarms", alarmList.innerHTML);
}
alarmList.addEventListener("click", (e) => {
  if (e.target.className == "alarmClear") {
    e.target.parentNode.remove();
    saveData();
    const eachNotification = document.createElement("div");
    eachNotification.classList.add("danger");
    eachNotification.innerText = "Alarm Removed !!";
    console.log(eachNotification);
    allNotifications.appendChild(eachNotification);
    console.log(allNotifications);
    setTimeout(() => {
      eachNotification.remove();
    }, 3000);
  }
});
stopAlarm.addEventListener("click", () => {
  stopAlarm.style.display = "none";
  sound.pause();
});
