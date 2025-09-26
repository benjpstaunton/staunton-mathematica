// Auto-update year
document.querySelectorAll('#year').forEach(e => e.textContent = new Date().getFullYear());

// Hero image zoom effect (start at 100%, end at 120%)
const heroImg = document.getElementById('hero-img');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const rect = heroSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    const totalDistance = rect.height + windowHeight;
    const progress = 1 - (rect.bottom / totalDistance);
    const scale = 1 + Math.max(0, Math.min(progress, 1)) * 0.2; // from 1 → 1.2
    heroImg.style.transform = `scale(${scale})`;
  }
});
