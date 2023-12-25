import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  myInput: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

refs.startButton.addEventListener('click', counter);

const TIMER_DELAY = 1000;

let userSelectedDate = '';
refs.startButton.disabled = true;

//опції до бібліотеки flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate.getTime() < Date.now()) {
      //Бібліотека iziToast
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      refs.startButton.disabled = true;
    } else {
      refs.startButton.disabled = false;
    }
  },
};
//Бібліотека flatpickr
const fp = flatpickr(refs.myInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function counter() {
  const intervalTime = setInterval(() => {
    const difference = userSelectedDate.getTime() - Date.now();
    const { days, hours, minutes, seconds } = convertMs(difference);

    refs.startButton.disabled = true;
    refs.myInput.disabled = true;

    if (difference <= 0) {
      clearInterval(intervalTime);
      this.intervalTime = null;

      refs.startButton.disabled = true;
      refs.myInput.disabled = false;
    } else {
      refs.dataDays.textContent = addLeadingZero(days);
      refs.dataHours.textContent = addLeadingZero(hours);
      refs.dataMinutes.textContent = addLeadingZero(minutes);
      refs.dataSeconds.textContent = addLeadingZero(seconds);
    }
  }, TIMER_DELAY);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
