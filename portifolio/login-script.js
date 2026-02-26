// ──────────────────────────────────────────
// CONFIGURAÇÃO — altere aqui sua senha
// ──────────────────────────────────────────
const SENHA_CORRETA = 'philippe2025';
// ──────────────────────────────────────────

function doLogin() {
  const userInput = document.getElementById('user');
  const passInput = document.getElementById('pass');
  const userError = document.getElementById('user-error');
  const passError = document.getElementById('pass-error');
  const btn       = document.getElementById('btn-login');

  // Limpa erros anteriores
  userInput.classList.remove('error');
  passInput.classList.remove('error');
  userError.classList.remove('show');
  passError.classList.remove('show');

  let valid = true;

  if (!userInput.value.trim()) {
    userInput.classList.add('error');
    userError.classList.add('show');
    valid = false;
  }

  if (!passInput.value.trim()) {
    passInput.classList.add('error');
    passError.textContent = 'Preencha a senha';
    passError.classList.add('show');
    valid = false;
  }

  if (!valid) return;

  if (passInput.value !== SENHA_CORRETA) {
    passInput.classList.add('error');
    passError.textContent = 'Senha incorreta';
    passError.classList.add('show');
    passInput.value = '';
    passInput.focus();

    // Animação shake no card
    const card = document.querySelector('.login-card');
    card.style.transition = 'transform 0.06s';
    let i = 0;
    const shake = setInterval(() => {
      card.style.transform = `translateX(${i % 2 === 0 ? '6px' : '-6px'})`;
      i++;
      if (i > 5) {
        clearInterval(shake);
        card.style.transform = 'translateX(0)';
      }
    }, 60);
    return;
  }

  // Sucesso com senha
  btn.classList.add('loading');
  btn.textContent = 'Entrando...';
  enterPortfolio();
}

function enterPortfolio() {
  const overlay = document.getElementById('success');
  overlay.classList.add('show');

  // Redireciona para o portfólio após 1.2s
  // IMPORTANTE: troque 'portfolio.html' pelo caminho correto na Vercel
  setTimeout(() => {
    window.location.href = 'portfolio.html';
  }, 1200);
}