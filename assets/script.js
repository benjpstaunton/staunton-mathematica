// Auto-update year
document.querySelectorAll('#year').forEach(e => e.textContent = new Date().getFullYear());

// Hero image zoom effect (start at 100%, end at 120%)
const heroImg = document.getElementById('hero-img');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const rect = heroSection.getBoundingClientRect();

  if (rect.top < window.innerHeight && rect.bottom > 0) {
    const totalDistance = rect.height;
    const scrolled = Math.min(Math.max(-rect.top, 0), totalDistance);
    const progress = scrolled / totalDistance;
    const scale = 1 + progress * 0.2; // 1 at top, 1.2 at bottom
    heroImg.style.transform = `scale(${scale})`;
  }
});
