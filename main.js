(() => {
  const C = window.CONTENT;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const UI = {
    far: {
      pt: "Há algum tempo, num repositório não muito distante…",
      en: "A while ago, in a repository not so far away…",
    },
    skip: { pt: "Pular abertura", en: "Skip intro" },
    replay: { pt: "▶ Rever abertura", en: "▶ Replay intro" },
    cue: { pt: "Role para conhecer a saga", en: "Scroll to explore the saga" },
    episode: { pt: "Episódio", en: "Episode" },
    nav: { pt: "Seções", en: "Sections" },
    start: { pt: "Início", en: "Start" },
    originsEyebrow: { pt: "De onde eu vim", en: "Where I came from" },
    originsTitle: { pt: "As origens", en: "The origins" },
    contactEyebrow: { pt: "Contato", en: "Contact" },
    contactTitle: { pt: "Junte-se à Aliança", en: "Join the Alliance" },
    contactLead: {
      pt: "Tem um projeto, uma vaga ou só quer trocar uma ideia? Me chame por onde preferir.",
      en: "Have a project, a role or just want to chat? Reach me wherever you prefer.",
    },
    experience: { pt: "Experiência", en: "Experience" },
    certs: { pt: "Certificações", en: "Certifications" },
    back: { pt: "Voltar ao início", en: "Back to start" },
    farewell: { pt: "Que a Força esteja com você", en: "May the Force be with you" },
    sabers: { pt: "Cor do sabre de luz", en: "Lightsaber color" },
    archCaption: { pt: "Arquitetura ilustrativa", en: "Illustrative architecture" },
    archTry: {
      pt: "Clique nas origens piscando para lançar uma frota e ver os serviços escalarem.",
      en: "Click the blinking sources to launch a fleet and watch the services scale.",
    },
    archLabel: { pt: "Diagrama de arquitetura com naves como tráfego", en: "Architecture diagram with starships as traffic" },
    launch: { pt: "Lançar frota de", en: "Launch fleet from" },
  };

  const SABERS = [
    { id: "blue", color: "#4fc3ff", pt: "Azul", en: "Blue" },
    { id: "green", color: "#5dff7a", pt: "Verde", en: "Green" },
    { id: "purple", color: "#c77dff", pt: "Roxo", en: "Purple" },
    { id: "red", color: "#ff3b3b", pt: "Vermelho (lado sombrio)", en: "Red (dark side)" },
  ];

  const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };

  let lang = pickLang();
  const t = (v) => (v == null || typeof v === "string" ? v ?? "" : v[lang] ?? v.pt);

  function pickLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "pt" || q === "en") return q;
    const saved = store.get("lang");
    if (saved === "pt" || saved === "en") return saved;
    return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
  }

  // ---------- render ----------

  // ---------- arquiteturas: nós são estações, o tráfego são naves ----------

  const SVGNS = "http://www.w3.org/2000/svg";
  const LABEL_DY = { client: 7.4, gateway: 7.6, queue: 6.8, db: 9, server: 9.2, service: 8.4 };
  const MAX_SHIPS = 60;
  const diagrams = new Map();

  function svg(tag, attrs, parent) {
    const e = document.createElementNS(SVGNS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    parent?.appendChild(e);
    return e;
  }

  function hexagon(r) {
    return Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i;
      return `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`;
    }).join(" ");
  }

  function stationShape(kind, g) {
    switch (kind) {
      case "client":
        svg("circle", { r: 3.2 }, g);
        svg("ellipse", { rx: 5.4, ry: 1.3, class: "ring" }, g);
        break;
      case "gateway":
        svg("rect", { x: -7, y: -3.6, width: 14, height: 7.2, rx: 1.6 }, g);
        break;
      case "queue":
        svg("rect", { x: -8, y: -2.6, width: 16, height: 5.2, rx: 2.6 }, g);
        for (const x of [-2.6, 0, 2.6]) svg("line", { x1: x, y1: -2.6, x2: x, y2: 2.6 }, g);
        break;
      case "db":
        svg("circle", { r: 5 }, g);
        svg("line", { x1: -5, y1: 0.5, x2: 5, y2: 0.5 }, g);
        svg("circle", { cx: -1.9, cy: -2, r: 1.3 }, g);
        break;
      case "server":
        svg("rect", { x: -4, y: -5, width: 8, height: 10, rx: 1 }, g);
        for (const y of [-1.7, 1.7]) svg("line", { x1: -4, y1: y, x2: 4, y2: y }, g);
        break;
      default:
        svg("polygon", { points: hexagon(4.6) }, g);
    }
  }

  // caça em cunha ou TIE; o rastro fica atrás, no sentido do movimento
  function shipShape(g) {
    svg("line", { x1: -1.2, y1: 0, x2: -5.5, y2: 0, class: "trail" }, g);
    if (Math.random() < 0.3) {
      svg("line", { x1: -1.3, y1: -1.8, x2: -1.3, y2: 1.8, class: "wing" }, g);
      svg("line", { x1: 1.3, y1: -1.8, x2: 1.3, y2: 1.8, class: "wing" }, g);
      svg("circle", { r: 0.9, class: "hull" }, g);
    } else {
      svg("path", { d: "M2.4 0 L-1.4 -1.5 L-0.6 0 L-1.4 1.5 Z", class: "hull" }, g);
    }
  }

  // autoscaling: serviços e gateways ganham réplicas quando a carga por réplica passa do limite
  const SCALABLE = new Set(["service", "gateway", "server"]);
  const MAX_REPLICAS = 3;
  const LOAD_WINDOW = 2000;
  const SCALE_UP_AT = 3;
  const SCALE_DOWN_BELOW = 1.5;
  const REPLICA_OFFSET = 3.2;

  const slotOffset = (slot) => slot * REPLICA_OFFSET;

  function buildArch(arch) {
    const fig = document.createElement("figure");
    fig.className = "arch";
    const root = svg("svg", { viewBox: "0 0 100 72", role: "img", "aria-label": t(UI.archLabel) }, fig);
    const caption = document.createElement("figcaption");
    caption.textContent = t(UI.archCaption);
    fig.append(caption);

    const edgesG = svg("g", { class: "edges" }, root);
    const nodesG = svg("g", { class: "nodes" }, root);
    const shipsG = svg("g", { class: "ships" }, root);
    const d = { shipsG, nodes: {}, sources: arch.sources, ships: [], visible: false, next: 0, nextCheck: 0, log: null };

    for (const n of arch.nodes) {
      d.nodes[n.id] = { ...n, out: [], replicas: 1, arrivals: [], pressure: 0, cooldown: 0, lastBusy: 0 };
    }
    for (const [a, b] of arch.edges) {
      const from = d.nodes[a];
      const to = d.nodes[b];
      from.out.push(to);
      svg("line", { x1: from.x, y1: from.y, x2: to.x, y2: to.y }, edgesG);
    }

    for (const n of Object.values(d.nodes)) {
      const isSource = arch.sources.includes(n.id);
      n.g = svg("g", { class: `node ${n.kind}${isSource ? " source" : ""}`, transform: `translate(${n.x} ${n.y})` }, nodesG);
      n.stack = svg("g", { class: "stack" }, n.g);
      n.shape = svg("g", { class: "shape" }, n.g);
      stationShape(n.kind, n.shape);
      if (n.label) {
        const text = svg("text", { y: LABEL_DY[n.kind] ?? 8.4 }, n.g);
        text.textContent = t(n.label);
      }
      if (SCALABLE.has(n.kind)) {
        n.badge = svg("text", { class: "badge", x: 6.4, y: -5.2 }, n.g);
      }
      if (isSource && !reducedMotion) {
        n.g.setAttribute("tabindex", "0");
        n.g.setAttribute("role", "button");
        n.g.setAttribute("aria-label", `${t(UI.launch)} ${t(n.label)}`);
        n.g.addEventListener("click", () => burst(d, n));
        n.g.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            burst(d, n);
          }
        });
      }
    }
    return { fig, d };
  }

  const nextHop = (n) => n.out[(Math.random() * n.out.length) | 0];

  // a nave mira a réplica com menos naves a caminho
  function pickSlot(d, n) {
    let best = 0;
    let bestCount = Infinity;
    for (let slot = 0; slot < n.replicas; slot++) {
      const count = d.ships.filter((s) => s.to === n && s.toSlot === slot).length;
      if (count < bestCount) [best, bestCount] = [slot, count];
    }
    return best;
  }

  function depart(d, s, from, fromSlot) {
    s.from = from;
    s.fromSlot = fromSlot;
    s.to = nextHop(from);
    s.toSlot = pickSlot(d, s.to);
    s.t = 0;
  }

  function launch(d, from) {
    if (!from.out.length || d.ships.length >= MAX_SHIPS) return;
    const g = svg("g", { class: "ship" }, d.shipsG);
    shipShape(g);
    const ship = { g, speed: 18 + Math.random() * 12 };
    depart(d, ship, from, 0);
    d.ships.push(ship);
    place(ship);
  }

  function burst(d, from) {
    for (let i = 0; i < 12; i++) setTimeout(() => launch(d, from), i * 100);
  }

  function place(s) {
    const x0 = s.from.x + slotOffset(s.fromSlot);
    const y0 = s.from.y - slotOffset(s.fromSlot);
    const dx = s.to.x + slotOffset(s.toSlot) - x0;
    const dy = s.to.y - slotOffset(s.toSlot) - y0;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    s.g.setAttribute(
      "transform",
      `translate(${(x0 + dx * s.t).toFixed(2)} ${(y0 + dy * s.t).toFixed(2)}) rotate(${angle.toFixed(1)})`
    );
  }

  function arrive(n, now) {
    n.arrivals.push(now);
    n.g.classList.add("hit");
    clearTimeout(n.hitTimer);
    n.hitTimer = setTimeout(() => n.g.classList.remove("hit"), 240);
  }

  function logScale(d, n, up) {
    if (!d.log) return;
    const label = t(n.label) || n.id;
    d.log.textContent = up
      ? t({ pt: `▲ ${label} escalou para ${n.replicas} réplicas`, en: `▲ ${label} scaled up to ${n.replicas} replicas` })
      : t({
          pt: `▼ ${label} voltou para ${n.replicas} ${n.replicas > 1 ? "réplicas" : "réplica"}`,
          en: `▼ ${label} scaled down to ${n.replicas} ${n.replicas > 1 ? "replicas" : "replica"}`,
        });
    d.log.classList.remove("flash");
    void d.log.offsetWidth;
    d.log.classList.add("flash");
  }

  function setBadge(n) {
    n.badge.textContent = n.replicas > 1 ? `×${n.replicas}` : "";
  }

  function scaleUp(d, n) {
    const replica = n.shape.cloneNode(true);
    replica.setAttribute("class", "replica");
    replica.setAttribute("transform", `translate(${slotOffset(n.replicas)} ${-slotOffset(n.replicas)})`);
    // réplicas mais novas ficam atrás das anteriores
    n.stack.prepend(replica);
    n.replicas++;
    setBadge(n);
    logScale(d, n, true);
  }

  function scaleDown(d, n) {
    const replica = n.stack.firstElementChild;
    replica.classList.add("leaving");
    setTimeout(() => replica.remove(), 400);
    n.replicas--;
    // quem ia para (ou saía de) a réplica removida passa para a última que sobrou
    for (const s of d.ships) {
      if (s.to === n && s.toSlot >= n.replicas) s.toSlot = n.replicas - 1;
      if (s.from === n && s.fromSlot >= n.replicas) s.fromSlot = n.replicas - 1;
    }
    setBadge(n);
    logScale(d, n, false);
  }

  function autoscale(d, now) {
    for (const n of Object.values(d.nodes)) {
      if (!SCALABLE.has(n.kind)) continue;
      while (n.arrivals.length && now - n.arrivals[0] > LOAD_WINDOW) n.arrivals.shift();
      n.pressure = n.arrivals.length / n.replicas;
      if (n.pressure >= SCALE_UP_AT * 0.7) n.lastBusy = now;
      n.g.classList.toggle("hot", n.pressure >= SCALE_UP_AT && n.replicas === MAX_REPLICAS);
      if (now < n.cooldown) continue;
      if (n.pressure >= SCALE_UP_AT && n.replicas < MAX_REPLICAS) {
        scaleUp(d, n);
        n.cooldown = now + 700;
      } else if (n.replicas > 1 && n.arrivals.length / (n.replicas - 1) < SCALE_DOWN_BELOW && now - n.lastBusy > 3500) {
        scaleDown(d, n);
        n.cooldown = now + 1200;
      }
    }
  }

  // nó sobrecarregado deixa as naves que chegam nele mais lentas: é a latência subindo
  const congestion = (n) => 1 / (1 + Math.max(0, n.pressure - 2) * 0.3);

  function stepDiagram(d, dt, now) {
    for (let i = d.ships.length - 1; i >= 0; i--) {
      const s = d.ships[i];
      const len = Math.hypot(
        s.to.x + slotOffset(s.toSlot) - s.from.x - slotOffset(s.fromSlot),
        s.to.y - slotOffset(s.toSlot) - s.from.y + slotOffset(s.fromSlot)
      );
      s.t += (s.speed * congestion(s.to) * dt) / len;
      if (s.t >= 1) {
        arrive(s.to, now);
        if (s.to.out.length) {
          depart(d, s, s.to, s.toSlot);
        } else {
          s.g.remove();
          d.ships.splice(i, 1);
          continue;
        }
      }
      place(s);
    }
  }

  let lastFrame = 0;
  function fleetLoop(now) {
    const dt = Math.min(0.05, (now - lastFrame) / 1000 || 0);
    lastFrame = now;
    for (const d of diagrams.values()) {
      if (!d.visible) continue;
      if (now > d.next) {
        launch(d, d.nodes[d.sources[(Math.random() * d.sources.length) | 0]]);
        d.next = now + 450 + Math.random() * 650;
      }
      stepDiagram(d, dt, now);
      if (now > d.nextCheck) {
        autoscale(d, now);
        d.nextCheck = now + 250;
      }
    }
    requestAnimationFrame(fleetLoop);
  }
  if (!reducedMotion) requestAnimationFrame(fleetLoop);

  function mountDiagrams() {
    diagrams.clear();
    const archs = { origens: C.originsArch };
    for (const ep of C.episodes) archs[ep.id] = ep.arch;
    document.querySelectorAll("[data-arch]").forEach((slot) => {
      const arch = archs[slot.dataset.arch];
      if (!arch) return slot.remove();
      const { fig, d } = buildArch(arch);
      d.log = slot.closest("section").querySelector(".scale-log");
      slot.replaceWith(fig);
      diagrams.set(slot.dataset.arch, d);
    });
  }

  const archTry = () =>
    reducedMotion ? "" : `<p class="try">${t(UI.archTry)}</p><p class="scale-log" aria-live="polite"></p>`;

  function list(items, cls) {
    return `<ul class="${cls}">${items.join("")}</ul>`;
  }

  function contactLinks(cls) {
    const items = C.links.map((l) => `<li><a href="${l.url}" rel="noopener">${l.label}</a></li>`);
    if (C.email) items.push(`<li><a class="mail" href="mailto:${C.email}">${C.email}</a></li>`);
    return list(items, cls);
  }

  function render() {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    const total = C.episodes.length;

    const hero = `
      <section id="inicio" class="panel centered" data-label="${t(UI.start)}">
        <div class="card">
          <p class="eyebrow">${t(C.place)}</p>
          <h1>${C.name}</h1>
          <p class="role">${t(C.role)}</p>
          <div class="saber-line"></div>
          <p class="lead">${t(C.lead)}</p>
          ${list(C.skills.map((s) => `<li>${s}</li>`), "chips")}
          ${contactLinks("links")}
          <div class="actions">
            <button class="replay" type="button" data-replay>${t(UI.replay)}</button>
          </div>
          <div class="actions">
            <a class="scroll-cue" href="#${C.episodes[0]?.id ?? "origens"}">
              <span>${t(UI.cue)}</span><span class="chevron" aria-hidden="true"></span>
            </a>
          </div>
        </div>
      </section>`;

    const episodes = C.episodes
      .map(
        (ep, i) => `
      <section id="${ep.id}" class="panel has-arch" data-label="${ep.company}">
        <div class="card">
          <p class="eyebrow">${t(UI.episode)} ${NUMERALS[total - 1 - i] ?? total - i} · ${ep.company} · ${t(ep.period)}</p>
          <h2>${t(ep.title)}</h2>
          <div class="saber-line"></div>
          <p>${t(ep.intro)}</p>
          ${list(ep.facts.map((f) => `<li>${t(f)}</li>`), "facts")}
          ${ep.arch ? archTry() : ""}
        </div>
        <div data-arch="${ep.id}"></div>
      </section>`
      )
      .join("");

    const origins = `
      <section id="origens" class="panel has-arch" data-label="${t(UI.originsTitle)}">
        <div class="card">
          <p class="eyebrow">${t(UI.originsEyebrow)}</p>
          <h2>${t(UI.originsTitle)}</h2>
          <div class="saber-line"></div>
          ${list(C.timeline.map((e) => `<li><span>${t(e.year)}</span><div>${t(e.text)}</div></li>`), "timeline")}
          ${C.hobby ? `<p>${t(C.hobby)}</p>` : ""}
        </div>
        <div data-arch="origens"></div>
      </section>`;

    const experience = C.episodes.map(
      (ep) => `<li><a href="#${ep.id}">${ep.company} <span>${t(ep.period)}</span></a></li>`
    );
    const certs = (C.certs || []).map((c) => `<li title="${t(c.title)}">${t(c.name)}</li>`);

    const contact = `
      <section id="contato" class="panel centered" data-label="${t(UI.contactEyebrow)}">
        <div class="card">
          <p class="eyebrow">${t(UI.contactEyebrow)}</p>
          <h2 class="display">${t(UI.contactTitle)}</h2>
          <div class="saber-line"></div>
          <p class="lead">${t(UI.contactLead)}</p>
          ${contactLinks("pills")}
          <h3 class="eyebrow">${t(UI.experience)}</h3>
          ${list(experience, "chips")}
          ${certs.length ? `<h3 class="eyebrow">${t(UI.certs)}</h3>${list(certs, "chips")}` : ""}
          <p class="farewell">${t(UI.farewell)}</p>
          <div class="actions">
            <a class="scroll-cue up" href="#inicio">
              <span class="chevron" aria-hidden="true"></span><span>${t(UI.back)}</span>
            </a>
          </div>
        </div>
      </section>`;

    document.getElementById("content").innerHTML = hero + episodes + origins + contact;
    mountDiagrams();

    const sections = [...document.querySelectorAll("main section")];
    const dots = document.getElementById("dots");
    dots.setAttribute("aria-label", t(UI.nav));
    dots.innerHTML = sections
      .map((s) => `<a href="#${s.id}" aria-label="${s.dataset.label}" title="${s.dataset.label}"></a>`)
      .join("");

    document.querySelectorAll(".lang a").forEach((a) => {
      a.setAttribute("aria-current", String(a.dataset.lang === lang));
    });

    renderSabers();
    observe(sections);
    document.querySelector("[data-replay]").addEventListener("click", playIntro);
  }

  // ---------- seção ativa ----------

  let observer;
  let active = null;

  function observe(sections) {
    observer?.disconnect();
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("visible");
          const d = diagrams.get(e.target.id);
          if (d) d.visible = e.isIntersecting;
          if (e.isIntersecting && e.intersectionRatio >= 0.5 && active !== e.target.id) {
            if (active !== null) stars.warp();
            active = e.target.id;
            document.querySelectorAll(".dots a").forEach((a) => {
              a.setAttribute("aria-current", String(a.hash === "#" + active));
            });
          }
        }
      },
      { threshold: [0.15, 0.5] }
    );
    sections.forEach((s) => observer.observe(s));
  }

  // ---------- sabre ----------

  function renderSabers() {
    const box = document.getElementById("sabers");
    const current = store.get("saber") || "blue";
    box.setAttribute("aria-label", t(UI.sabers));
    box.innerHTML = SABERS.map(
      (s) =>
        `<button type="button" data-saber="${s.id}" style="--c:${s.color}" aria-label="${s[lang]}" title="${s[lang]}" aria-pressed="${s.id === current}"></button>`
    ).join("");
    setSaber(current);
  }

  function setSaber(id) {
    const s = SABERS.find((x) => x.id === id) || SABERS[0];
    document.documentElement.style.setProperty("--saber", s.color);
    stars.tint = s.color;
    document.querySelectorAll("#sabers button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.saber === s.id));
    });
    store.set("saber", s.id);
  }

  document.getElementById("sabers").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-saber]");
    if (b) setSaber(b.dataset.saber);
  });

  document.querySelector(".lang").addEventListener("click", (e) => {
    const a = e.target.closest("a[data-lang]");
    if (!a) return;
    e.preventDefault();
    lang = a.dataset.lang;
    store.set("lang", lang);
    history.replaceState(null, "", `?lang=${lang}${location.hash}`);
    active = null;
    render();
  });

  // ---------- campo de estrelas ----------

  const stars = (() => {
    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");
    const BASE = reducedMotion ? 0 : 0.0007;
    let w, h, list = [];
    let speed = BASE;
    let target = BASE;
    let warpUntil = 0;
    const api = { tint: "#4fc3ff", warp };

    function spawn(z = Math.random()) {
      return { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.max(z, 0.02), pz: null };
    }

    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(900, Math.round((w * h) / 2200));
      list = Array.from({ length: n }, () => spawn());
      if (reducedMotion) draw();
    }

    function warp() {
      if (reducedMotion) return;
      target = 0.028;
      warpUntil = performance.now() + 450;
    }

    function project(x, y, z) {
      const f = Math.max(w, h) * 0.5;
      return [w / 2 + (x / z) * f, h / 2 + (y / z) * f];
    }

    function draw() {
      ctx.fillStyle = "#03040a";
      ctx.fillRect(0, 0, w, h);
      const streak = speed > 0.004;
      for (const s of list) {
        s.pz = s.z;
        s.z -= speed;
        if (s.z <= 0.02) {
          Object.assign(s, spawn(1));
          s.pz = s.z;
        }
        const [x, y] = project(s.x, s.y, s.z);
        if (x < -50 || x > w + 50 || y < -50 || y > h + 50) {
          Object.assign(s, spawn(1));
          continue;
        }
        const near = 1 - s.z;
        if (streak) {
          const [px, py] = project(s.x, s.y, s.pz + speed * 3);
          ctx.strokeStyle = near > 0.6 ? api.tint : "rgba(255,255,255,0.85)";
          ctx.lineWidth = 0.5 + near * 1.8;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(x, y);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(255,255,255,${0.25 + near * 0.75})`;
          const r = 0.3 + near * 1.4;
          ctx.fillRect(x - r / 2, y - r / 2, r, r);
        }
      }
    }

    function frame(now) {
      if (now > warpUntil) target = BASE;
      speed += (target - speed) * 0.08;
      draw();
      requestAnimationFrame(frame);
    }

    addEventListener("resize", resize);
    resize();
    if (!reducedMotion) requestAnimationFrame(frame);
    return api;
  })();

  // ---------- abertura ----------

  const intro = document.getElementById("intro");

  function playIntro() {
    if (reducedMotion) return;
    document.getElementById("introFar").textContent = t(UI.far);
    document.getElementById("introLogo").innerHTML = C.name.toUpperCase().replace(" ", "<br>");
    document.getElementById("crawl").innerHTML =
      `<p class="ep">${t(C.crawl.episode)}</p><h2>${t(C.crawl.title)}</h2>` +
      C.crawl.paragraphs.map((p) => `<p>${t(p)}</p>`).join("");
    document.getElementById("skip").textContent = t(UI.skip);

    // remonta os nós para reiniciar as animações CSS
    intro.querySelectorAll(".intro-far, .intro-logo, .crawl").forEach((el) => {
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = "";
    });
    intro.hidden = false;
    document.body.style.overflow = "hidden";
    store.set("introSeen", "1");
  }

  function closeIntro() {
    if (intro.hidden) return;
    intro.hidden = true;
    document.body.style.overflow = "";
    stars.warp();
  }

  document.getElementById("skip").addEventListener("click", closeIntro);
  document.getElementById("crawl").addEventListener("animationend", closeIntro);
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeIntro();
  });

  render();
  // as seções nascem via JS, então o navegador não acha a âncora sozinho no carregamento
  if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
  else if (!store.get("introSeen")) playIntro();
})();
