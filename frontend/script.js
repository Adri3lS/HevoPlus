function voltarinicio(){
    window.location.href = "index.html";
}

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  if (!header) {
    console.error('Header com classe .header não encontrado.');
    return;
  }

  const threshold = 50; // px

  function onScroll() {
    if (window.scrollY > threshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // garante o estado certo ao carregar
});