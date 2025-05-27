let cursorInterval;

document.addEventListener('DOMContentLoaded', () => {
  let textField = document.querySelector('.text-field');

  textField.addEventListener('click', event => {
    event.stopPropagation();
    textField.classList.add('focused');
    clearInterval(cursorInterval);
    cursorInterval = setInterval(() => textField.classList.toggle('cursor'), 500);
  });

  document.addEventListener('keydown', event => {
    if (textField.classList.contains('focused')) {
      let contentDiv = textField.querySelector('.content');
      if (event.key === 'Backspace') {
        contentDiv.textContent = contentDiv.textContent.slice(0, contentDiv.textContent.length - 1);
      } else if (event.key.length === 1) {
        contentDiv.textContent += event.key;
      }
    }
  });

  document.addEventListener('click', event => {
    clearInterval(cursorInterval);
    if (textField.classList.contains('focused')) {
      textField.classList.remove('focused');
      textField.classList.remove('cursor');
    }
  });
});