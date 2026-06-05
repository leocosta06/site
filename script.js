// ─── HORÁRIOS CONST ───────────────────────────────────
const horarios = [
  { dia: 'Domingo', abre: null, fecha: null, fechado: true },
  { dia: 'Segunda', abre: '09:00', fecha: '19:00' },
  { dia: 'Quarta',  abre: '09:00', fecha: '19:00' },
  { dia: 'Terça',   abre: '09:00', fecha: '19:00' },
  { dia: 'Quinta',  abre: '09:00', fecha: '19:00' },
  { dia: 'Sexta',   abre: '09:00', fecha: '19:00' },
  { dia: 'Sábado',  abre: '09:00', fecha: '19:00' },
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
    const h      = horarios[idx];
    const isHoje = idx === diaSemana;

    const card = document.createElement('div');
    card.className = 'horario-card' + (isHoje ? ' hoje' : '');

    if (h.fechado) {
      card.innerHTML = `
        <div>
          <span class="dia-nome">
            ${h.dia}${isHoje ? '<span class="hoje-badge">Hoje</span>' : ''}
          </span>
        </div>
        <span class="horario-hora" style="color:#e74c3c;">Fechado</span>
      `;
      grid.appendChild(card);

      if (isHoje) {
        const statusBar = document.querySelector('.status-bar');
        const txt = document.getElementById('statusText');
        if (statusBar && txt) {
          statusBar.className = 'status-bar status-closed';
          txt.textContent = 'Fechado hoje · Voltamos na Segunda';
        }
      }
      return;
    }

    const [aH, aM] = h.abre.split(':').map(Number);
    const [fH, fM] = h.fecha.split(':').map(Number);
    const abreMin  = aH * 60 + aM;
    const fechaMin = fH * 60 + fM;
    const aberto   = isHoje && horaAtual >= abreMin && horaAtual < fechaMin;

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
const produtos = [
  { nome: 'Escova',       cat: 'escova',    emoji: '💇‍♀️', desc: 'Lavagem , secagem e modelagem dos fios', preco: 'À Partir de R$ 40,00'  },
  { nome: 'Chapinha',   cat: 'escova',    emoji: '✨', desc: 'Fios super alinhados, brilho intenso e finalização', preco: 'R$ 40,00'  },
  { nome: 'Manicure Completa',     cat: 'mão&pés',    emoji: '💅', desc: 'Cututilagem, hidratação e esmaltação premium',      preco: 'R$ 30,00'  },
  { nome: 'Pedicure Completa',        cat: 'mão&pés',    emoji: '🦶', desc: 'Cututilagem, hidratação e esmaltação ',      preco: 'R$ 30,00'  },
  { nome: 'Spa dos Pés',           cat: 'mão&pés',    emoji: '🧼', desc: 'Tratamento profundo de hidratação para os pés',     preco: 'R$ 70,00'  },
  { nome: 'Progressiva Orgânica',  cat: 'quimicas', emoji: '🧪', desc: 'Alinhamento térmico zero formol, brilho espelhado', preco: 'R$ 200,00' },
  { nome: 'Mechas / Luzes',        cat: 'quimicas', emoji: '👱‍♀️', desc: 'Técnicas modernas para iluminar com saúde capilar',  preco: 'À Partir de R$ 250,00' },
  { nome: 'Retoque de Raiz',         cat: 'quimicas', emoji: '💧', desc: 'Reposição de massa e redução extrema do frizz',    preco: 'À Partir de R$ 70,00' },
  { nome: 'Pedicure + Manicure',        cat: 'mão&pés',    emoji: '🦶', desc: 'De segunda a Quarta',      preco: 'R$ 35,00'  }
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
  const menuClose = document.getElementById('menuClose'); // Captura o novo botão de fechar (X)
  
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

  // Evento para abrir/fechar pelo botão hambúrguer
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // NOVO: Evento dedicado para fechar o menu ao clicar no botão "X"
  if (menuClose && menuToggle && navLinks) {
    menuClose.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  }

  // Fecha o menu automaticamente ao clicar em qualquer link interno
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle && navLinks) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });
});