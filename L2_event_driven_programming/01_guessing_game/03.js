document.addEventListener('DOMContentLoaded', event => {

  const originalMessage = 'Guess a number from 1 to 100';
  let totalGuesses = 0;

  let answerGenerator = () => Math.floor(Math.random() * 100) + 1;
  let answer = answerGenerator();
  let input = document.querySelector('#guess');
  let form = document.querySelector('form');
  let message;

  form.addEventListener('submit', event => {
    event.preventDefault();
    totalGuesses += 1;
    let guess = parseInt(input.value, 10);
    message = document.querySelector("#message");
    if (guess > answer) {
      message.textContent = `guess is ${guess}: too high`;
    } else if (guess < answer) {
      message.textContent = `guess is ${guess}: too low`;
    } else {
      message.textContent = `correct! Answer is ${guess}. \n Total guesses: ${totalGuesses}.`;
      totalGuesses = 0;
      answer = answerGenerator();
    }
  });

  let link = document.querySelector('a');
  link.addEventListener('click', event => {
    event.preventDefault;
    answer = answerGenerator();
    message.textContent = originalMessage;
  })
});