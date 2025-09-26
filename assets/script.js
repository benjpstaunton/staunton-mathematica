// Auto-update year
document.querySelectorAll('#year').forEach(e => e.textContent = new Date().getFullYear());

// Hero image zoom effect
const heroImg = document.getElementById('hero-img');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const rect = heroSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    const progress = 1 - (rect.bottom / (rect.height + windowHeight));
    const scale = 1 + Math.min(progress, 1) * 0.2; // up to 120%
    heroImg.style.transform = `scale(${scale})`;
  }
});
