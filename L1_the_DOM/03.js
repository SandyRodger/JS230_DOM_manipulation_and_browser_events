document.addEventListener('DOMContentLoaded', event => {
  let answer = Math.floor(Math.random() * 100) + 1;
  let input = document.getElementById('input');
  let form = document.querySelector('form');
  let message;
  console.log('blah from line 6')


  form.addEventListener('submit', event => {
    event.preventDefault
    let guess = parseInt(input.value, 10);
    if (guess > answer) {
      message = `Your guess ${guess} was too low (lol)`
    } else if (guess < answer) {
      message = `Your guess ${guess} was too high (embarassing for you)`
    } else {
      message = `correct! The number is indeed ${answer}`
    };
    console.log(message);
  });
});