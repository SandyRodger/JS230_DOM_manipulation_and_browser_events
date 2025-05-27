document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a').forEach(tab => {
    tab.addEventListener('click', event => {
      event.preventDefault();
      const blockName = tab.dataset.block;

      document.querySelectorAll('article').forEach(article => {
        article.style.display = article.dataset.block === blockName ? 'block' : 'none';
      });
    });
  });
});