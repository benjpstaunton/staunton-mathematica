// Auto-update year
document.querySelectorAll('#year').forEach(e => e.textContent = new Date().getFullYear());

// ------------------- Hero Zoom Effect -------------------
function enableHeroZoom() {
  const heroImg = document.getElementById('hero-img');
  const heroSection = document.querySelector('.hero');
  if (!heroImg || !heroSection) return;

  window.addEventListener('scroll', () => {
    const rect = heroSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const totalDistance = rect.height;
      const scrolled = Math.min(Math.max(-rect.top, 0), totalDistance);
      const progress = scrolled / totalDistance;
      const scale = 1 + progress * 0.2; // 1 → 1.2
      heroImg.style.transform = `scale(${scale})`;
    }
  });
}

function setupHeroZoom() {
  const isWide = window.innerWidth > 768;
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  if (isWide && !isPortrait) {
    enableHeroZoom();
  }
}
setupHeroZoom();
window.addEventListener('resize', setupHeroZoom);

// ------------------- Mobile Nav Toggle -------------------
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('primary-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    navToggle.classList.toggle('open');
  });
}