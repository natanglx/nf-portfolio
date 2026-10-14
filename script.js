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
  instagram: "", // ex.: "https://instagram.com/seu_usuario" (vazio = card "Em breve")

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
const BRAND = { wa: ["whatsapp", "#25D366"], gh: ["github", "#ffffff"], ig: ["instagram", "#E4405F"] };
const icon = (n, c = "") => BRAND[n]
  ? `<span class="bi ${c}" aria-hidden="true" style="--u:url(https://cdn.jsdelivr.net/npm/simple-icons@11.0.0/icons/${BRAND[n][0]}.svg);--bc:${BRAND[n][1]}"></span>`
  : `<svg class="ic ${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;

/* =====================================================
   Contato e redes
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
  ? `<li><a class="card chan" href="${esc(c.url)}"${c.ext ? ' target="_blank" rel="noopener noreferrer"' : ""} aria-label="${esc(c.name)}: ${esc(c.desc)}">${icon(c.icon)}<span><strong>${esc(c.name)}</strong><small>${esc(c.desc)}</small></span>${icon("arrow", "go")}</a></li>`
  : `<li><div class="card chan off" aria-disabled="true">${icon(c.icon)}<span><strong>${esc(c.name)}</strong><small>${esc(c.desc)}</small></span><em>Em breve</em></div></li>`
).join("");

$("#social").innerHTML = channels.filter(c => c.url).map(c =>
  `<li><a href="${esc(c.url)}"${c.ext ? ' target="_blank" rel="noopener noreferrer"' : ""} aria-label="${esc(c.name)}">${icon(c.icon)}</a></li>`
).join("");

/* =====================================================
   Projetos
   ===================================================== */
const P = C.projects;
const tags = list => list.length ? `<ul class="tags">${list.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : "";
const links = p => [
  p.demo && `<a class="btn p sm" href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">${esc(p.demoLabel || "Ver projeto")}</a>`,
  p.repo && `<a class="btn sm" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">Ver código</a>`
].filter(Boolean).join("");

$("#projects").innerHTML = P.map((p, i) => `
  <li><article class="card proj">
    <div class="cover">${p.image
      ? `<img src="${esc(p.image)}" alt="Capa do projeto ${esc(p.name)}" loading="lazy">`
      : `<div class="ph" role="img" aria-label="Imagem de capa ainda não adicionada"><b>${esc(p.name.split(" ").map(w => w[0]).join("").slice(0, 3))}</b><span>Imagem de capa · substitua em script.js</span></div>`}</div>
    <div class="pbody">
      ${p.status ? `<span class="status">${esc(p.status)}</span>` : ""}
      <h3>${esc(p.name)}</h3>
      <span class="cat-l">${esc(p.category)}</span>
      <p>${esc(p.description)}</p>
      ${tags(p.tech)}
      ${p.placeholder ? "" : `<div class="acts"><button class="btn sm" type="button" data-i="${i}">Ver detalhes</button>${links(p)}</div>`}
    </div>
  </article></li>`).join("");

/* Janela de detalhes (<dialog> nativo: foco e tecla Esc já tratados) */
const dlg = $("#dlg");
$("#projects").addEventListener("click", e => {
  const b = e.target.closest("[data-i]");
  if (!b) return;
  const p = P[b.dataset.i];
  dlg.innerHTML = `<div class="dc">
    <button class="x" type="button" data-close aria-label="Fechar">&times;</button>
    ${p.status ? `<span class="status">${esc(p.status)}</span>` : ""}
    <h3>${esc(p.name)}</h3><span class="cat-l">${esc(p.category)}</span>
    <p>${esc(p.description)}</p>${tags(p.tech)}
    ${links(p) ? `<div class="acts">${links(p)}</div>` : ""}
  </div>`;
  dlg.showModal();
});
dlg.addEventListener("click", e => {
  if (e.target === dlg || e.target.closest("[data-close]")) dlg.close();
});

/* =====================================================
   Menu, cabeçalho e seção ativa
   ===================================================== */
const hdr = $("#top"), nav = $("#nav"), burger = $("#burger");
const setMenu = open => {
  nav.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
};
burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

const onScroll = () => hdr.classList.toggle("scrolled", scrollY > 12);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

if ("IntersectionObserver" in window) {
  const links = $$("nav .l");
  const spy = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    links.forEach(a => a.setAttribute("aria-current", a.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => spy.observe(s));

  /* Animações de entrada ao rolar */
  $$(".stagger").forEach(g => [...g.children].forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--d", i * 70 + "ms");
  }));
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$(".reveal").forEach(el => io.observe(el));
} else {
  /* Navegador antigo: mostra tudo sem animar */
  $$(".reveal").forEach(el => el.classList.add("in"));
}

$("#year").textContent = new Date().getFullYear();
   
