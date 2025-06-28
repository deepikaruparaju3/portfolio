// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Back to Top button logic
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// AOS animations initialization
AOS.init({
  duration: 1000,
  once: true
});

// Custom cursor implementation
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

let posX = 0, posY = 0;
let mouseX = 0, mouseY = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

  document.body.style.background = `
    radial-gradient(
      circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.05),
      transparent 150px
    ),
    linear-gradient(-45deg, #050c1b, #0a1a2f, #10253f, #050c1b)
  `;
});

function animate() {
  posX += (mouseX - posX) / 8;
  posY += (mouseY - posY) / 8;
  follower.style.transform = `translate(${posX}px, ${posY}px)`;
  requestAnimationFrame(animate);
}
animate();

// Settings button rotation and toggle theme switch display
const settingsButton = document.getElementById('settingsButton');
const themeToggleContainer = document.getElementById('themeToggleContainer');
let rotated = 0;

settingsButton.addEventListener('click', () => {
  rotated += 180;
  settingsButton.querySelector('i').style.transform = `rotate(${rotated}deg)`;
  themeToggleContainer.style.display =
    themeToggleContainer.style.display === 'inline-block' ? 'none' : 'inline-block';
});

// Theme toggle switch logic
const themeToggleCheckbox = document.getElementById('themeToggleCheckbox');
themeToggleCheckbox.addEventListener('change', () => {
  document.body.classList.toggle('light-theme');
});
// Get all sections and nav items
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links li');

window.addEventListener('scroll', () => {
  let currentSection = 'home';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150; // offset for fixed nav
    if (scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navItems.forEach(li => {
    li.classList.remove('active');
    const link = li.querySelector('a');
    if (link.getAttribute('href') === `#${currentSection}`) {
      li.classList.add('active');
    }
  });
});

// Make sure Home is active on load
window.addEventListener('load', () => {
  navItems[0].classList.add('active');
});
