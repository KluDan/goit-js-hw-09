import { Notify } from 'notiflix/build/notiflix-notify-aio';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMins = document.querySelector('[data-minutes]');
const timerSecs = document.querySelector('[data-seconds]');

let timerData = null;

startBtn.disabled = true;

class Timer {
    constructor({onTick}){
        this.intervalId = null;
        this.onTick = onTick;
    }
    start(){
        startBtn.disabled = true;
        this.intervalId = setInterval(()=>{
            const currentTime = Date.now();
            const deltaTime = timerData - currentTime;
            const ms = this.convertMs(deltaTime);
           
            this.onTick(ms);
            if(deltaTime <= 1000){
                Notify.success("The timer is complete! Reload to start again.");
                clearInterval(this.intervalId);
                const ms = this.convertMs(0);
                this.onTick(ms);
                startBtn.disabled = false;
            }
            
        },1000)
    }

    stop(){
        clearInterval(this.intervalId);
    }

    convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        // Remaining days
        const days = this.addLeadingZero(Math.floor(ms / day));
        // Remaining hours
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        // Remaining minutes
        const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
        const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
      
        return { days, hours, minutes, seconds };
    }

    addLeadingZero(value){
        return String(value).padStart(2, '0');
    }
}

const timer = new Timer({
    onTick: updateClockFace
});

function updateClockFace({ days, hours, minutes, seconds }){
    timerDays.textContent = `${days}`;
    timerHours.textContent = `${hours}`;
    timerMins.textContent = `${minutes}`;
    timerSecs.textContent = `${seconds}`;
}

startBtn.addEventListener('click', timer.start.bind(timer));


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timerData = selectedDates[0];
    if (timerData <= options.defaultDate) {
        Notify.failure('Please choose a date in the future');
      }
      startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);


