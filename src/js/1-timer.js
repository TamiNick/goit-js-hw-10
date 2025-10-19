import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const hour = document.querySelector("[data-hours]");
const day = document.querySelector("[data-days]");
const minute = document.querySelector("[data-minutes]");
const second = document.querySelector("[data-seconds]");
const startBtn = document.querySelector("[data-start]");

let userSelectedDate = null;
let timerId = null;

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
        iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight",
        });
        startBtn.disabled = true;
        return;
    }

    userSelectedDate = selectedDate;
    startBtn.disabled = false;
    },
};

flatpickr(input, options);

startBtn.addEventListener("click", onStartClick);

function onStartClick() {
    startBtn.disabled = true;
    input.disabled = true;

    timerId = setInterval(() => {
    const currentTime = new Date();
    const timeLeft = userSelectedDate - currentTime;

    if (timeLeft <= 0) {
        clearInterval(timerId);
        updateTimerFace(0);
        iziToast.success({
        title: "Time is up!",
        position: "topRight",
        timeout: 10000, 
        });
        input.disabled = false;
        return;
    }

    updateTimerFace(timeLeft);
    }, 1000);
}

function updateTimerFace(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);
    day.textContent = addLeadingZero(days);
    hour.textContent = addLeadingZero(hours);
    minute.textContent = addLeadingZero(minutes);
    second.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function convertMs(ms) {
    const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
