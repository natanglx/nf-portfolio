/* =====================================================
   CONFIGURAÇÃO — edite aqui contatos e projetos
   ===================================================== */
const CONFIG = {
  whatsapp: {
    number: "5584991962780", // só números, com DDI + DDD
    message: "Olá, Natanael! Vi seu portfólio e gostaria de conversar sobre um projeto."
  },
  email: "natanoliveiragkx@gmail.com",
  github: "https://github.com/natanglx",
  instagram: "https://instagram.com/kkjnatan_dev", // vazio = card "Em breve"

  // Canais extras (LinkedIn etc.). icon: "link" | "gh" | "ig" | "mail" | "wa"
  // Exemplo: { name: "LinkedIn", desc: "Perfil profissional", icon: "link", url: "https://linkedin.com/in/seu-perfil" }
  extraChannels: [],

  // Projetos. Campos vazios não geram botões nem links.
  // image: caminho da capa, ex.: "assets/projects/conectalibras.png"
  projects: [
    {
      name: "ConectaLibras",
      description: "Projeto de acessibilidade que explora o uso de visão computacional e inteligência artificial para contribuir com a comunicação entre pessoas surdas e ouvintes, utilizando tecnologias relacionadas ao reconhecimento de sinais em Libras.",
      category: "Acessibilidade · Inteligência Artificial · Desenvolvimento Web",
      tech: ["HTML", "CSS", "JavaScript", "Visão computacional"],
      image: "",
      demo: "",        // link da demonstração (gera o botão "Ver projeto")
      demoLabel: "Ver projeto",
      repo: "",        // link do repositório (gera o botão "Ver código")
      status: ""
    },
    {
      name: "Jogo de Cafeteria 2D",
      description: "Jogo 2D com foco em atendimento de clientes, gerenciamento de uma cafeteria, progressão e automação gradual das atividades.",
      category: "Game Development · Simulação · JavaScript",
      tech: ["JavaScript", "Jogo 2D"],
      image: "",
      demo: "",        // preencha quando existir uma versão publicada (gera o botão "Jogar")
      demoLabel: "Jogar",
      repo: "",
      status: "Em desenvolvimento"
    },
    {
      name: "Próximo projeto",
      description: "Espaço reservado. Copie um bloco da lista CONFIG.projects em script.js para adicionar um novo projeto.",
      category: "Em breve",
      tech: [],
      image: "",
      demo: "",
      repo: "",
      status: "Espaço reservado",
      placeholder: true
    }
  ]
};

/* =====================================================
   Utilidades
   ===================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Logos oficiais (Simple Icons via jsDelivr, versão fixa). Os demais usam ícones SVG embutidos. */
const BRAND = { wa: ["whatsapp", "#25D366"], gh: ["github", "#24292f"], ig: ["instagram", "#E4405F"] };
const icon = (n, c = "") => BRAND[n]
  ? `<span class="bi ${c}" aria-hidden="true" style="--u:url(https://cdn.jsdelivr.net/npm/simple-icons@11.0.0/icons/${BRAND[n][0]}.svg);--bc:${BRAND[n][1]}"></span>`
  : `<svg class="ic ${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;

/* =====================================================
   Contato
   ===================================================== */
const C = CONFIG;
const waUrl = `https://wa.me/${C.whatsapp.number}?text=${encodeURIComponent(C.whatsapp.message)}`;
const channels = [
  { name: "WhatsApp", desc: "Conversa direta sobre o seu projeto", icon: "wa", url: waUrl, ext: true },
  { name: "GitHub", desc: "Código e projetos", icon: "gh", url: C.github, ext: true },
  { name: "E-mail", desc: C.email, icon: "mail", url: C.email ? "mailto:" + C.email : "" },
  { name: "Instagram", desc: "Perfil", icon: "ig", url: C.instagram, ext: true },
  ...C.extraChannels.map(x => ({ ...x, ext: true }))
];
$("#channels").innerHTML = channels.map(c => c.url
  ? `<li><a class="xp row" href="${esc(c.url)}"${c.ext ? ' target="_blank" rel="noopener noreferrer"' : ""} aria-label="${esc(c.name)}: ${esc(c.desc)}">${icon(c.icon)}<span><strong>${esc(c.name)}</strong><small>${esc(c.desc)}</small></span>${icon("arrow", "go")}</a></li>`
  : `<li><div class="xp row off" aria-disabled="true">${icon(c.icon)}<span><strong>${esc(c.name)}</strong><small>Em breve</small></span></div></li>`
).join("");

/* =====================================================
   Projetos
   ===================================================== */
const P = C.projects;
const tags = list => list.length ? `<ul class="tags">${list.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : "";
const links = p => [
  p.demo && `<a class="xp def sm" href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">${esc(p.demoLabel || "Ver projeto")}</a>`,
  p.repo && `<a class="xp sm" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">Ver código</a>`
].filter(Boolean).join("");

$("#projects").innerHTML = P.map((p, i) => `
  <li class="item"><div class="it"><span>${esc(p.name)}</span>${p.status ? `<span class="st">${esc(p.status)}</span>` : ""}</div>
    <div class="ib">${p.image
      ? `<img src="${esc(p.image)}" alt="Capa do projeto ${esc(p.name)}" loading="lazy">`
      : `<div class="ph">Imagem de capa · substitua em script.js</div>`}
      <span class="cl">${esc(p.category)}</span>
      <p>${esc(p.description)}</p>${tags(p.tech)}
      ${p.placeholder ? "" : `<div class="acts"><button class="xp sm" type="button" data-i="${i}">Ver detalhes</button>${links(p)}</div>`}
    </div></li>`).join("");

/* Janela de detalhes (<dialog> nativo: foco e tecla Esc já tratados) */
const dlg = $("#dlg");
$("#projects").addEventListener("click", e => {
  const b = e.target.closest("[data-i]");
  if (!b) return;
  const p = P[b.dataset.i];
  dlg.innerHTML = `<div class="tb"><span class="t">${esc(p.name)}</span><span class="ctl"><button type="button" class="x" data-close aria-label="Fechar">×</button></span></div>
    <div class="dc">${p.status ? `<span class="st">${esc(p.status)}</span>` : ""}<span class="cl">${esc(p.category)}</span>
    <p>${esc(p.description)}</p>${tags(p.tech)}${links(p) ? `<div class="acts">${links(p)}</div>` : ""}</div>`;
  dlg.showModal();
});
dlg.addEventListener("click", e => {
  if (e.target === dlg || e.target.closest("[data-close]")) dlg.close();
});

/* =====================================================
   Menu iniciar, relógio e animações
   ===================================================== */
const start = $("#start"), menu = $("#menu");
const setMenu = open => { menu.hidden = !open; start.setAttribute("aria-expanded", open); };
start.addEventListener("click", e => { e.stopPropagation(); setMenu(menu.hidden); });
menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("click", e => { if (!menu.hidden && !menu.contains(e.target)) setMenu(false); });
addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

const clock = $("#clock");
const tick = () => { clock.textContent = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }); };
tick(); setInterval(tick, 30000);

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.08 });
  $$(".reveal").forEach(el => io.observe(el));
} else {
  $$(".reveal").forEach(el => el.classList.add("in"));
}

$("#year").textContent = new Date().getFullYear();
