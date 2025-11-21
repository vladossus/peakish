document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('pageLoader');
  const content = document.getElementById('pageContent');

  // через небольшой таймаут можно показать прогрессбар, но контент уже грузится
  setTimeout(() => {
    loader.style.display = 'none';
    content.classList.add('show');
  }, 400);
});