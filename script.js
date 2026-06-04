// ─── HORÁRIOS CONST ───────────────────────────────────
const horarios = [
  { dia: 'Domingo', abre: '09:00', fecha: '18:00' },
  { dia: 'Segunda', abre: '07:00', fecha: '20:00' },
  { dia: 'Terça',   abre: '07:00', fecha: '20:00' },
  { dia: 'Quarta',  abre: '07:00', fecha: '20:00' },
  { dia: 'Quinta',  abre: '07:00', fecha: '21:00' },
  { dia: 'Sexta',   abre: '07:00', fecha: '22:00' },
  { dia: 'Sábado',  abre: '08:00', fecha: '22:00' },
];

function renderHorarios() {
  const now       = new Date();
  const diaSemana = now.getDay(); 
  const horaAtual = now.getHours() * 60 + now.getMinutes();
  const diasOrdem = [1, 2, 3, 4, 5, 6, 0]; 
  const grid      = document.getElementById('horariosGrid');

  if (!grid) return;
  grid.innerHTML = '';

  diasOrdem.forEach(idx => {
    const h        = horarios[idx];
    const isHoje   = idx === diaSemana;
    const [aH, aM] = h.abre.split(':').map(Number);
    const [fH, fM] = h.fecha.split(':').map(Number);
    const abreMin  = aH * 60 + aM;
    const fechaMin = fH * 60 + fM;
    const aberto   = isHoje && horaAtual >= abreMin && horaAtual < fechaMin;

    const card = document.createElement('div');
    card.className = 'horario-card' + (isHoje ? ' hoje' : '');
    card.innerHTML = `
      <div>
        <span class="dia-nome">
          ${h.dia}${isHoje ? '<span class="hoje-badge">Hoje</span>' : ''}
        </span>
      </div>
      <span class="horario-hora">${h.abre} – ${h.fecha}</span>
    `;
    grid.appendChild(card);

    if (isHoje) {
      const statusBar = document.querySelector('.status-bar');
      const txt = document.getElementById('statusText');
      if (statusBar && txt) {
        if (aberto) {
          statusBar.className = 'status-bar status-open';
          txt.textContent = `Aberto agora · Fechamos às ${h.fecha}`;
        } else if (horaAtual < abreMin) {
          statusBar.className = 'status-bar status-closed';
          txt.textContent = `Fechado · Abrimos hoje às ${h.abre}`;
        } else {
          statusBar.className = 'status-bar status-closed';
          txt.textContent = `Fechado hoje · Voltamos amanhã`;
        }
      }
    }
  });
}

// ─── PRODUTOS / SERVIÇOS ─────────────────────────────────
// Mantidos os IDs temporários para conversar com o HTML sem quebras
const produtos = [
  { nome: 'Escova Modelada',       cat: 'cafe',    emoji: '💇‍♀️', desc: 'Lavagem especial, secagem e modelagem dos fios', preco: 'R$ 60,00'  },
  { nome: 'Escova Lisa Classic',   cat: 'cafe',    emoji: '✨', desc: 'Fios super alinhados, brilho intenso e finalização', preco: 'R$ 50,00'  },
  { nome: 'Manicure Completa',     cat: 'bolo',    emoji: '💅', desc: 'Cututilagem, hidratação e esmaltação premium',      preco: 'R$ 35,00'  },
  { nome: 'Pedicure Relax',        cat: 'bolo',    emoji: '🦶', desc: 'Esfoliação, cuidados com as unhas e massagem',      preco: 'R$ 40,00'  },
  { nome: 'Spa dos Pés',           cat: 'bolo',    emoji: '🧼', desc: 'Tratamento profundo de hidratação para os pés',     preco: 'R$ 45,00'  },
  { nome: 'Progressiva Orgânica',  cat: 'salgado', emoji: '🧪', desc: 'Alinhamento térmico zero formol, brilho espelhado', preco: 'R$ 180,00' },
  { nome: 'Mechas / Luzes',        cat: 'salgado', emoji: '👱‍♀️', desc: 'Técnicas modernas para iluminar com saúde capilar',  preco: 'R$ 250,00' },
  { nome: 'Botox Capilar',         cat: 'salgado', emoji: '💧', desc: 'Reposição de massa e redução extrema do frizz',    preco: 'R$ 120,00' }
];

function renderProdutos() {
  const grid = document.getElementById('produtosGrid');
  if (!grid) return;
  grid.innerHTML = '';

  produtos.forEach(p => {
    const card = document.createElement('div');
    card.className    = 'produto-card visible';
    card.dataset.cat  = p.cat;
    card.innerHTML = `
      <div class="produto-img">${p.emoji}</div>
      <div class="produto-info">
        <div class="produto-nome">${p.nome}</div>
        <div class="produto-desc">${p.desc}</div>
        <div class="produto-preco">${p.preco}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filtrar(cat, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  document.querySelectorAll('.produto-card').forEach(card => {
    const show = cat === 'todos' || card.dataset.cat === cat;
    card.classList.toggle('visible', show);
    card.style.display = show ? 'block' : 'none';
  });
}

// ─── INTERAÇÕES E EVENTOS DE NAV ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderHorarios();
  renderProdutos();

  const nav = document.getElementById('mainNav');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  let lastScrollTop = 0;
  const shrinkOffset = 50;

  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isMobile = window.innerWidth <= 700;

    if (!nav) return;

    if (scrollTop > shrinkOffset) {
      nav.classList.add('shrink');
    } else {
      nav.classList.remove('shrink');
    }

    if (!isMobile) {
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        nav.classList.add('scroll-down');
        nav.classList.remove('scroll-up');
      } else {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
      }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle && navLinks) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });
});