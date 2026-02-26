// ── PUZZLE AUTH & SHATTER LOGIC (index.html) ──
const puzzlePiece = document.getElementById('puzzle-piece');
const puzzleSlot = document.getElementById('puzzle-slot');
const wrapper = document.getElementById('main-wrapper');

if (puzzlePiece && puzzleSlot) {
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    const SUCCESS_THRESHOLD = 20;

    // Mobile/Desktop compatible drag
    const startDrag = (e) => {
        if (puzzlePiece.classList.contains('success-spin')) return;
        isDragging = true;
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        startX = clientX - currentX;
    };

    const onDrag = (e) => {
        if (!isDragging) return;
        if (e.type === 'touchmove') e.preventDefault();
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const x = clientX - startX;
        const maxX = puzzleSlot.offsetLeft - puzzlePiece.offsetLeft;
        currentX = Math.max(0, Math.min(x, maxX + 10));
        puzzlePiece.style.transform = `translateX(${currentX}px) scale(0.66)`;

        if (Math.abs(currentX - maxX) < SUCCESS_THRESHOLD) {
            isDragging = false;
            triggerSuccess(maxX);
        }
    };

    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        currentX = 0;
        puzzlePiece.style.transition = 'transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
        puzzlePiece.style.transform = `translateX(0) scale(0.66)`;
    };

    // Função de sucesso: acionada quando o puzzle é resolvido
    const triggerSuccess = (targetX) => {
        // Trava a peça na posição absoluta do encaixe
        puzzlePiece.style.transform = `translateX(${targetX}px) scale(0.66)`;

        // Adiciona a classe de giro (definida no CSS)
        puzzlePiece.classList.add('success-spin');

        // Pequeno atraso para o usuário ver o sucesso antes da página cair
        setTimeout(() => {
            if (wrapper) wrapper.classList.add('falling-shatter');
            // Redireciona para o portfólio após a animação de queda (1.6 segundos)
            setTimeout(() => window.location.href = 'portfolio.html', 1600);
        }, 800);
    };

    puzzlePiece.addEventListener('mousedown', startDrag);
    puzzlePiece.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('touchmove', onDrag, { passive: false });
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);
}

// ── LÓGICA DE REVELAÇÃO NO SCROLL (portfolio.html) ──
// Seleciona todos os elementos que têm a classe '.reveal'
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top; // Posição do elemento na tela
        const windowHeight = window.innerHeight;    // Altura da janela do navegador

        // Se o elemento estiver aparecendo no campo de visão (com folga de 100px)
        if (top < windowHeight - 100) {
            el.classList.add('active'); // Ativa a animação do CSS
        }
    });
};

if (reveals.length > 0) {
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
}

// ── CONTACT UTILS ──
function toggleWhatsapp() {
    window.open('https://wa.me/5582993079885?text=Olá Philippe, vi seu portfólio corporativo e quero conversar!', '_blank');
}

function enterPortfolio() {
    if (wrapper) wrapper.classList.add('falling-shatter');
    setTimeout(() => window.location.href = 'portfolio.html', 1600);
}
