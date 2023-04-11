const hourDiv = document.querySelector(".hour");
const removePer = document.querySelector(".removePer");
const minuteDiv = document.querySelector(".minute");
const removePer1 = document.querySelector(".removePer1");
const secondsDiv = document.querySelector(".seconds");
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
const timerHold = document.querySelector(".timerhold");
let resetedHour;
let resetedMinute;
let resetedSecond;
let resetedTime;

// Functions
function InputNumOnly(inputElement) {
  inputElement.addEventListener("input", function () {
    const inputValue = inputElement.value;
    const numericRegex = /^[0-9]*$/;

    if (!numericRegex.test(inputValue)) {
      inputElement.value = inputValue.replace(/[^0-9]/g, "");
    }
  });
}

function numMax2Input(inputElement) {
  inputElement.addEventListener("input", function () {
    if (inputElement.value.length > 2) {
      const costumeTimeValue = [];
      costumeTimeValue.push(inputElement.value);
      const fixedSliceValue = costumeTimeValue[0].slice(0, 2);
      inputElement.value = fixedSliceValue;
    }
  });
}

function numPlus60(inputElement) {
  inputElement.addEventListener("input", function () {
    if (inputElement.value > 60) {
      inputElement.value = 59;
      console.log("test");
    }
  });
}

function timeValueSet(hourVal, minVal, secVal) {
  resetedTime = setInterval(() => {
    if (hourVal > 0 && minVal == 0 && secVal == 0) {
      minVal = 59;
      secVal = 59;
      hourVal--;
    } else if (secVal === 0 && minVal > 0) {
      secVal = 59;
      minVal--;
    } else if (secVal > 0) {
      secVal--;
    }

    timerHold.textContent = `${hourVal}h${minVal}m${secVal}s`;
  }, 1000);
}

numMax2Input(hourDiv);
numMax2Input(minuteDiv);
numMax2Input(secondsDiv);
InputNumOnly(minuteDiv);
InputNumOnly(minuteDiv);
InputNumOnly(secondsDiv);
numPlus60(minuteDiv);
numPlus60(secondsDiv);

// Event Listeners
start.addEventListener("click", () => {
  clearInterval(resetedTime);
  timerHold.textContent = "";
  let hourValue = hourDiv.value;
  let minuteValue = minuteDiv.value;
  let secondsValue = secondsDiv.value;
  resetedHour = hourValue;
  resetedMinute = minuteValue;
  resetedSecond = secondsValue;
  if (start.textContent === "Start") {
    start.textContent = "Stop";

    if (hourValue === "") {
      hourValue = 0;
    }
    if (minuteValue === "") {
      minuteValue = 0;
    }
    if (secondsValue === "") {
      secondsValue = 0;
    }
    if (hourDiv.parentNode === timerHold) {
      timerHold.removeChild(hourDiv);
      timerHold.removeChild(removePer1);
      timerHold.removeChild(secondsDiv);
      timerHold.removeChild(minuteDiv);
      timerHold.removeChild(removePer);
    }
    timerHold.textContent = `${hourValue}h${minuteValue}m${secondsValue}s`;
    timeValueSet(hourValue, minuteValue, secondsValue);
  } else if (start.textContent === "Stop") {
    start.textContent = "Start";
    timerHold.textContent = "";
    timerHold.appendChild(hourDiv);
    timerHold.appendChild(removePer);
    timerHold.appendChild(minuteDiv);
    timerHold.appendChild(removePer1);
    timerHold.appendChild(secondsDiv);
  }
});

reset.addEventListener("click", () => {
  start.textContent = "Stop";
  clearInterval(resetedTime);

  if (resetedHour === "" || resetedHour === undefined) {
    resetedHour = 0;
  }
  if (resetedMinute === "" || resetedMinute === undefined) {
    resetedMinute = 0;
  }
  if (resetedSecond === "" || resetedSecond === undefined) {
    resetedSecond = 0;
  }
  timeValueSet(resetedHour, resetedMinute, resetedSecond);

  timerHold.textContent = `${resetedHour}h${resetedMinute}m${resetedSecond}s`;
});
