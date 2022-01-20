import Notiflix from 'notiflix'
const form = document.querySelector('.form')
const inputDelay = document.querySelector('[name = delay]')
const inputStep = document.querySelector('[name = step]')
const inputAmount = document.querySelector('[name = amount]')

form.addEventListener('submit', onBtnSubmit)
 
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  })
}

function onBtnSubmit(e) {
  e.preventDefault()

  let delay = Number(inputDelay.value)
  let step = Number(inputStep.value)
  let amount = Number(inputAmount.value)

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.warning(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      })
    delay += step
  }
}
