import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
let formData = {};

form.addEventListener('input', onInputChange);

function onInputChange(e){
  if(e.target.nodeName !== 'INPUT'){
    return
  }
  formData[e.target.name] = Number(e.target.value);
}

form.addEventListener('submit', onCreateBtnClick);

function onCreateBtnClick(e){
  e.preventDefault();

  const { step: promiseDelay, amount } = formData;
  let { delay: firstDelay } = formData;

  for( let i = 1; i <= amount; i += 1 ){
    
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

      firstDelay += promiseDelay;
  }
}

  function createPromise(position, delay) {
  
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
    
      setTimeout(()=>{
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
          },delay);
      });
    };