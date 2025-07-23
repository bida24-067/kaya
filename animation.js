// Image animation on page load
  window.addEventListener('DOMContentLoaded', () => {
    const kayaImg = document.getElementById('KayaIN');
    kayaImg.classList.add('expanded');
    setTimeout(() => {
      kayaImg.classList.remove('expanded');
    }, 3000);
  });