import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]')
const valueDays = document.querySelector('[data-days]')
const valueHours = document.querySelector('[data-hours]')
const valueMinutes = document.querySelector('[data-minutes]')
const valueSeconds = document.querySelector('[data-seconds]')

let timerId = null
let date = new Date()

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: date,
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < date) {
            Notiflix.Notify.warning('Please choose a date in the future')
        }

        let countdown = selectedDates[0].getTime()
        
        if (selectedDates[0] > date) {
            startBtn.disabled = false;
            function onBtnClick() {
                timerId = setInterval(() => {
                    const { days, hours, minutes, seconds } = convertMs(countdown - Date.now())
                    valueDays.textContent = days
                    valueHours.textContent = hours
                    valueMinutes.textContent = minutes
                    valueSeconds.textContent = seconds
                    valueDays.textContent = days
                    valueHours.textContent = hours
                    valueMinutes.textContent = minutes
                    valueSeconds.textContent = seconds
                    if (Number(valueDays.textContent) === 0 &&
                        Number(valueHours.textContent) === 0 &&
                        Number(valueMinutes.textContent) === 0 &&
                        Number(valueSeconds.textContent) === 0) {
                        clearInterval(timerId)
                    }
                }, 1000)
            }
            startBtn.addEventListener('click', onBtnClick)
        }
    },
}
flatpickr("#datetime-picker", options)

function addZero(value) {
    return String(value).padStart(2,'0')
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
