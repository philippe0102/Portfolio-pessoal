// ══════════════════════════════
// NAV — destaca item conforme scroll
// ══════════════════════════════
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});


// ══════════════════════════════
// WHATSAPP — popup
// ══════════════════════════════
function toggleWhatsapp() {
  const popup   = document.getElementById('wpp-popup');
  const visible = popup.style.display !== 'none';
  popup.style.display = visible ? 'none' : 'block';
  if (!visible) setTimeout(() => document.getElementById('wpp-msg').focus(), 100);
}

function sendWpp() {
  const msg  = document.getElementById('wpp-msg').value.trim();
  const text = msg || 'Olá Philippe, vim pelo seu portfólio e gostaria de conversar!';
  window.open('https://wa.me/5582993079885?text=' + encodeURIComponent(text), '_blank');
}

// Fecha popup ao clicar fora
document.addEventListener('click', (e) => {
  const popup = document.getElementById('wpp-popup');
  if (
    popup.style.display !== 'none' &&
    !popup.contains(e.target) &&
    !e.target.closest('button[onclick="toggleWhatsapp()"]')
  ) {
    popup.style.display = 'none';
  }
});