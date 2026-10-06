/* =========================================================
   Árvore dos SOs
   NODES é a fonte única dos dados: a árvore, a linha do tempo,
   os cards das famílias e o painel de detalhes são gerados a partir dele.
   - parents[0] é o "pai" usado para desenhar a árvore;
     pais extras (ex.: XNU ← BSD) viram uma linha tracejada.
   ========================================================= */

const FAMILIES = {
  microsoft: 'Microsoft',
  unix: 'UNIX',
  bsd: 'BSD',
  apple: 'Apple',
  linux: 'Linux',
};

const NODES = [
  // ---------- Linhagem MS-DOS (Microsoft) ----------
  {
    id: 'msdos', name: 'MS-DOS', year: 1981, type: 'so', family: 'microsoft', parents: [],
    desc: 'O primeiro sistema operacional da Microsoft, criado para o IBM PC (que a IBM vendia como PC DOS). Funcionava todo em linha de comando, com o famoso prompt C:\\>, e executava um programa por vez. É o ponto de partida de toda a família Windows.',
  },
  {
    id: 'win3x', name: 'Windows 3.x', year: 1990, type: 'so', family: 'microsoft', parents: ['msdos'],
    desc: 'O Windows 3.0 (1990) e o 3.1 popularizaram a interface gráfica com janelas e mouse nos PCs. Ainda não era um sistema completo: era um ambiente gráfico que rodava por cima do MS-DOS.',
  },
  {
    id: 'win9x', name: 'Windows 9.x Kernel', year: 1995, type: 'kernel', family: 'microsoft', parents: ['win3x'],
    desc: 'O kernel usado pelo Windows 95 e pelo Windows 98. Era um híbrido de 16 e 32 bits que ainda dependia do MS-DOS para iniciar, o que o tornava mais sujeito a travamentos.',
  },
  {
    id: 'win95', name: 'Windows 95', year: 1995, type: 'so', family: 'microsoft', parents: ['win9x'],
    desc: 'Lançado em agosto de 1995, trouxe o Menu Iniciar, a barra de tarefas e o Windows Explorer. Foi um enorme sucesso e definiu a cara do Windows por décadas.',
  },
  {
    id: 'win98', name: 'Windows 98', year: 1998, type: 'so', family: 'microsoft', parents: ['win95'],
    desc: 'Evolução do Windows 95, com melhor suporte a USB, ao sistema de arquivos FAT32 e com o navegador Internet Explorer integrado. Foi um dos últimos Windows do kernel 9.x.',
  },
  {
    id: 'winnt', name: 'Windows NT Kernel', year: 1993, type: 'kernel', family: 'microsoft', parents: ['win9x'],
    desc: 'Kernel escrito do zero para ser 32 bits, estável, seguro e multiusuário, sem depender do MS-DOS. Estreou em 1993 no Windows NT 3.1, voltado a empresas. Ele aparece depois do 9.x na árvore porque, a partir do Windows XP, substituiu o 9.x também nos PCs domésticos. Todo Windows desde então usa o NT.',
  },
  {
    id: 'winxp', name: 'Windows XP', year: 2001, type: 'so', family: 'microsoft', parents: ['winnt'],
    desc: 'O primeiro Windows doméstico baseado no kernel NT, que levou a estabilidade dos sistemas empresariais para o público em geral. Com o visual “Luna”, foi um dos Windows mais duradouros e queridos.',
  },
  {
    id: 'vista', name: 'Windows Vista', year: 2007, type: 'so', family: 'microsoft', parents: ['winxp'],
    desc: 'Trouxe o visual Aero com transparências e o Controle de Conta de Usuário (UAC), que pede confirmação antes de ações administrativas. Era pesado para os PCs da época e foi mal recebido.',
  },
  {
    id: 'win7', name: 'Windows 7', year: 2009, type: 'so', family: 'microsoft', parents: ['vista'],
    desc: 'Refinou o Vista: ficou mais leve, rápido e estável, com uma nova barra de tarefas. Rapidamente se tornou o Windows mais usado do mundo.',
  },
  {
    id: 'win8', name: 'Windows 8', year: 2012, type: 'so', family: 'microsoft', parents: ['win7'],
    desc: 'Apostou em telas de toque com a interface de blocos (Metro) e removeu o Menu Iniciar tradicional, uma mudança polêmica que foi parcialmente desfeita no Windows 8.1.',
  },
  {
    id: 'win10', name: 'Windows 10', year: 2015, type: 'so', family: 'microsoft', parents: ['win8'],
    desc: 'Trouxe de volta o Menu Iniciar, estreou o navegador Edge e passou a receber atualizações contínuas, como um serviço. Seu suporte oficial terminou em 14 de outubro de 2025.',
  },
  {
    id: 'win11', name: 'Windows 11', year: 2021, type: 'so', family: 'microsoft', parents: ['win10'],
    desc: 'Lançado em 5 de outubro de 2021, com visual redesenhado, Menu Iniciar centralizado e exigências de hardware mais rígidas, como o chip de segurança TPM 2.0.',
  },

  // ---------- Linhagem UNIX ----------
  {
    id: 'unix', name: 'UNIX', year: 1969, type: 'kernel', family: 'unix', parents: [],
    desc: 'Criado por Ken Thompson e Dennis Ritchie nos Laboratórios Bell (AT&T). Começou em assembly num computador PDP-7 e, em 1973, foi reescrito na linguagem C, o que permitiu levá-lo para outras máquinas. Ideias como “tudo é arquivo” e pequenos programas combinados por pipes influenciam quase todos os sistemas modernos.',
  },
  {
    id: 'mach', name: 'Mach Kernel', year: 1985, type: 'kernel', family: 'apple', parents: ['unix'],
    desc: 'Microkernel desenvolvido na Universidade Carnegie Mellon. A ideia de um microkernel é deixar no núcleo só o essencial (memória, processos e comunicação) e rodar o resto como serviços separados. Foi adotado pela NeXT, empresa fundada por Steve Jobs.',
  },
  {
    id: 'bsd', name: 'BSD Kernel', year: 1978, type: 'kernel', family: 'bsd', parents: ['unix'],
    desc: 'A Berkeley Software Distribution foi criada na Universidade da Califórnia em Berkeley, com Bill Joy entre os principais nomes, a partir do código do UNIX. Versões como a 4.2BSD (1983) trouxeram a pilha de rede TCP/IP que ajudou a construir a internet.',
  },
  {
    id: 'linux', name: 'Linux Kernel', year: 1991, type: 'kernel', family: 'linux', parents: ['unix'],
    desc: 'Anunciado em 25 de agosto de 1991 por Linus Torvalds, um estudante finlandês, como “só um hobby”. Não usa código do UNIX, mas segue as mesmas ideias (é um sistema “Unix-like”). É software livre e hoje roda em servidores, celulares, supercomputadores e roteadores.',
  },
  {
    id: 'xnu', name: 'XNU Kernel', year: 1996, type: 'kernel', family: 'apple', parents: ['mach', 'bsd'], badge: 'Mach + BSD',
    desc: 'O nome vem de “X is Not Unix”. É um kernel híbrido que combina a arquitetura do microkernel Mach com elementos do BSD, como a rede, o sistema de arquivos e as permissões no estilo UNIX. Foi criado na NeXT e chegou à Apple quando ela comprou a empresa, no fim de 1996.',
  },
  {
    id: 'darwin', name: 'Darwin OS', year: 2000, type: 'so', family: 'apple', parents: ['xnu'],
    desc: 'Sistema operacional de código aberto da Apple construído sobre o kernel XNU. É a base comum dos sistemas da Apple: tudo o que roda num Mac ou num iPhone está, por baixo, rodando Darwin.',
  },
  {
    id: 'macos', name: 'macOS / OS X', year: 2001, type: 'so', family: 'apple', parents: ['darwin'],
    desc: 'O Mac OS X 10.0 (2001) levou o Darwin para os computadores da Apple, com a interface Aqua por cima. Hoje se chama macOS e é um UNIX com certificação oficial.',
  },
  {
    id: 'ios', name: 'iOS', year: 2007, type: 'so', family: 'apple', parents: ['darwin'],
    desc: 'Lançado junto com o primeiro iPhone, em 2007, com o nome “iPhone OS” (virou iOS em 2010). Usa o mesmo núcleo Darwin/XNU do macOS, adaptado para telas de toque e celulares.',
  },
  {
    id: 'freebsd', name: 'FreeBSD', year: 1993, type: 'so', family: 'bsd', parents: ['bsd'],
    desc: 'Descendente direto do BSD, com foco em desempenho e estabilidade, principalmente em servidores. Seu código é usado dentro de produtos comerciais, inclusive no sistema dos consoles PlayStation 4 e 5.',
  },
  {
    id: 'openbsd', name: 'OpenBSD', year: 1995, type: 'so', family: 'bsd', parents: ['bsd'],
    desc: 'Nasceu de uma divisão na comunidade BSD, liderada por Theo de Raadt. É famoso pelo foco extremo em segurança e por ter o código constantemente revisado. Dele saiu o OpenSSH, usado no mundo inteiro.',
  },
  {
    id: 'android', name: 'Android', year: 2008, type: 'so', family: 'linux', parents: ['linux'],
    desc: 'O sistema do Google para celulares, com a versão 1.0 lançada em setembro de 2008. Usa o kernel Linux por baixo e é hoje o SO mais usado do mundo em número de aparelhos.',
  },
  {
    id: 'debian', name: 'Debian', year: 1993, type: 'so', family: 'linux', parents: ['linux'],
    desc: 'Criado por Ian Murdock, é uma das distribuições Linux mais antigas e influentes. É conhecido pela estabilidade e pelo gerenciador de pacotes APT, e serve de base para dezenas de outras distribuições.',
  },
  {
    id: 'ubuntu', name: 'Ubuntu', year: 2004, type: 'so', family: 'linux', parents: ['debian'],
    desc: 'Lançado pela Canonical em 20 de outubro de 2004, baseado no Debian. Seu objetivo era deixar o Linux fácil para qualquer pessoa, e ele se tornou uma das distribuições mais populares em desktops e na nuvem.',
  },
  {
    id: 'mint', name: 'Linux Mint', year: 2006, type: 'so', family: 'linux', parents: ['ubuntu'],
    desc: 'Baseado no Ubuntu e pensado para quem está vindo do Windows: visual familiar e programas e codecs prontos para usar logo depois da instalação.',
  },
];

const byId = new Map(NODES.map((n) => [n.id, n]));
const typeLabel = (n) => (n.type === 'kernel' ? 'Kernel' : 'Sistema operacional');
const childrenOf = (id) => NODES.filter((n) => n.parents.includes(id));
const treeChildrenOf = (id) => NODES.filter((n) => n.parents[0] === id);

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else node.setAttribute(key, value);
  }
  node.append(...children);
  return node;
}

/* ---------- Árvore ---------- */

function nodeButton(n) {
  const btn = el('button', {
    class: 'node',
    type: 'button',
    'data-open': n.id,
    'data-family': n.family,
    'data-type': n.type,
    'aria-label': `${n.name}, ${typeLabel(n).toLowerCase()}, ${n.year}`,
  },
  el('span', { class: 'node-name' }, n.name),
  el('span', { class: 'node-year' }, String(n.year)));
  if (n.badge) btn.append(el('span', { class: 'node-badge' }, n.badge));
  return btn;
}

function buildBranch(n) {
  const li = el('li', {}, nodeButton(n));
  const kids = treeChildrenOf(n.id);
  if (kids.length) li.append(el('ul', {}, ...kids.map(buildBranch)));
  return li;
}

function renderTrees() {
  document.querySelectorAll('[data-tree-root]').forEach((tree) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('tree-links');
    svg.setAttribute('aria-hidden', 'true');
    tree.append(svg, el('ul', {}, buildBranch(byId.get(tree.dataset.treeRoot))));
  });
}

/* Linhas tracejadas para os pais extras (ex.: BSD → XNU), só no modo organograma */
const orgChart = window.matchMedia('(min-width: 760px)');
const SVG_NS = 'http://www.w3.org/2000/svg';

function drawExtraLinks() {
  document.querySelectorAll('.tree').forEach((tree) => {
    const svg = tree.querySelector('.tree-links');
    svg.replaceChildren();
    if (!orgChart.matches) return;

    const box = tree.getBoundingClientRect();
    svg.setAttribute('width', box.width);
    svg.setAttribute('height', box.height);
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    const defs = document.createElementNS(SVG_NS, 'defs');
    svg.append(defs);

    tree.querySelectorAll('.node').forEach((childBtn) => {
      const child = byId.get(childBtn.dataset.open);
      child.parents.slice(1).forEach((pid) => {
        const parentBtn = tree.querySelector(`.node[data-open="${pid}"]`);
        if (!parentBtn) return;
        const p = parentBtn.getBoundingClientRect();
        const c = childBtn.getBoundingClientRect();
        const parentIsRight = p.left > c.right;
        const x1 = (parentIsRight ? p.left : p.right) - box.left;
        const y1 = p.top + p.height / 2 - box.top;
        const x2 = (parentIsRight ? c.right : c.left) - box.left;
        const y2 = c.top + c.height / 2 - box.top;
        const dx = parentIsRight ? -48 : 48;

        const color = `var(--c-${byId.get(pid).family})`;
        const markerId = `arrow-${pid}-${child.id}`;
        const marker = document.createElementNS(SVG_NS, 'marker');
        marker.setAttribute('id', markerId);
        marker.setAttribute('viewBox', '0 0 10 10');
        marker.setAttribute('refX', '9');
        marker.setAttribute('refY', '5');
        marker.setAttribute('markerWidth', '7');
        marker.setAttribute('markerHeight', '7');
        marker.setAttribute('orient', 'auto');
        const tip = document.createElementNS(SVG_NS, 'path');
        tip.setAttribute('d', 'M0 0 L10 5 L0 10 z');
        tip.style.fill = color;
        marker.append(tip);
        defs.append(marker);

        const path = document.createElementNS(SVG_NS, 'path');
        path.setAttribute('d', `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`);
        path.setAttribute('marker-end', `url(#${markerId})`);
        path.style.stroke = color;
        svg.append(path);
      });
    });
  });
}

/* ---------- Filtro por família ---------- */

function applyFilter(filter) {
  document.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.filter === filter));
  });
  document.querySelectorAll('.tree .node').forEach((btn) => {
    const fam = btn.dataset.family;
    // O UNIX continua visível ao filtrar qualquer uma das famílias que descendem dele
    const visible = filter === 'all' || fam === filter || (fam === 'unix' && filter !== 'microsoft');
    btn.classList.toggle('is-dimmed', !visible);
  });
}

/* ---------- Destaque de parentes ao passar o mouse ---------- */

function setRelated(id, on) {
  const n = byId.get(id);
  const ids = [...n.parents, ...childrenOf(id).map((c) => c.id)];
  ids.forEach((rid) => {
    document.querySelectorAll(`.tree .node[data-open="${rid}"]`).forEach((b) => b.classList.toggle('is-related', on));
  });
}

/* ---------- Painel de detalhes ---------- */

const dialog = document.getElementById('node-dialog');

function relButton(n) {
  return el('button', { class: 'rel-btn', type: 'button', 'data-open': n.id, 'data-family': n.family },
    n.name, el('span', {}, String(n.year)));
}

function showDetails(id) {
  const n = byId.get(id);
  if (!n) return;
  const d = (key) => dialog.querySelector(`[data-d="${key}"]`);

  dialog.dataset.family = n.family;
  d('family').textContent = FAMILIES[n.family];
  d('type').textContent = typeLabel(n);
  d('name').textContent = n.name;
  d('year').textContent = String(n.year);
  d('desc').textContent = n.desc;

  const parents = n.parents.map((pid) => byId.get(pid));
  d('parents').replaceChildren(...(parents.length
    ? parents.map(relButton)
    : [el('p', { class: 'rel-empty' }, 'É uma das raízes da árvore.')]));

  const kids = childrenOf(id);
  d('children').replaceChildren(...(kids.length
    ? kids.map(relButton)
    : [el('p', { class: 'rel-empty' }, 'Nenhum descendente nesta árvore.')]));

  document.querySelectorAll('.tree .node.is-active').forEach((b) => b.classList.remove('is-active'));
  document.querySelectorAll(`.tree .node[data-open="${id}"]`).forEach((b) => b.classList.add('is-active'));

  if (!dialog.open) dialog.showModal();
  dialog.querySelector('.dialog-close').focus();
}

/* ---------- Linha do tempo ---------- */

function decadeLabel(decade) {
  return decade < 2000 ? `Anos ${decade % 100}` : `Anos ${decade}`;
}

function renderTimeline() {
  const timeline = document.getElementById('timeline');
  const sorted = [...NODES].sort((a, b) => a.year - b.year); // sort estável: empate mantém a ordem de NODES
  const decades = new Map();
  sorted.forEach((n) => {
    const decade = Math.floor(n.year / 10) * 10;
    if (!decades.has(decade)) decades.set(decade, []);
    decades.get(decade).push(n);
  });

  decades.forEach((items, decade) => {
    const list = el('ol', { class: 'tl-list' }, ...items.map((n) => el('li', { class: 'tl-item', 'data-family': n.family },
      el('button', { class: 'tl-btn', type: 'button', 'data-open': n.id },
        el('span', { class: 'tl-dot', 'aria-hidden': 'true' }),
        el('span', { class: 'tl-year' }, String(n.year)),
        el('span', { class: 'tl-body' },
          el('span', { class: 'tl-name' }, n.name),
          el('span', { class: 'tl-meta' }, `${typeLabel(n)} · ${FAMILIES[n.family]}`))))));
    timeline.append(el('div', { class: 'tl-decade reveal' }, el('h3', {}, decadeLabel(decade)), list));
  });
}

/* ---------- Cards das famílias e números do topo ---------- */

function renderFamilyChips() {
  document.querySelectorAll('[data-family-list]').forEach((list) => {
    const fam = list.dataset.familyList;
    list.append(...NODES.filter((n) => n.family === fam)
      .map((n) => el('li', {}, el('button', { class: 'chip-btn', type: 'button', 'data-open': n.id }, n.name))));
  });
}

function renderStats() {
  const years = NODES.map((n) => n.year);
  const set = (key, value) => {
    const target = document.querySelector(`[data-stat="${key}"]`);
    if (target) target.textContent = value;
  };
  set('kernels', NODES.filter((n) => n.type === 'kernel').length);
  set('so', NODES.filter((n) => n.type === 'so').length);
  set('span', `${Math.min(...years)}–${Math.max(...years)}`);
}

/* ---------- Animação ao rolar ---------- */

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  items.forEach((item) => observer.observe(item));
}

/* ---------- Inicialização ---------- */

document.addEventListener('DOMContentLoaded', () => {
  renderTrees();
  renderTimeline();
  renderFamilyChips();
  renderStats();
  setupReveal();

  // Um único listener para tudo que abre detalhes (árvore, linha do tempo, chips, painel)
  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-open]');
    if (opener) showDetails(opener.dataset.open);
  });

  document.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  document.querySelectorAll('.tree').forEach((tree) => {
    tree.addEventListener('pointerover', (e) => {
      const node = e.target.closest('.node');
      if (node && !node.contains(e.relatedTarget)) setRelated(node.dataset.open, true);
    });
    tree.addEventListener('pointerout', (e) => {
      const node = e.target.closest('.node');
      if (node && !node.contains(e.relatedTarget)) setRelated(node.dataset.open, false);
    });
    tree.addEventListener('focusin', (e) => e.target.matches('.node') && setRelated(e.target.dataset.open, true));
    tree.addEventListener('focusout', (e) => e.target.matches('.node') && setRelated(e.target.dataset.open, false));
  });

  // Fechar o painel ao clicar fora dele
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.querySelectorAll('.tree .node.is-active').forEach((b) => b.classList.remove('is-active'));
  });

  // Redesenha as linhas tracejadas sempre que o tamanho da árvore mudar
  const resizeObserver = new ResizeObserver(drawExtraLinks);
  document.querySelectorAll('.tree').forEach((tree) => resizeObserver.observe(tree));
  orgChart.addEventListener('change', drawExtraLinks);
  document.fonts?.ready.then(drawExtraLinks);
});
