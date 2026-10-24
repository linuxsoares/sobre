// Todo o conteúdo do site fica aqui. Textos com { pt, en } trocam com o idioma;
// strings simples aparecem iguais nos dois.
window.CONTENT = {
  name: "Gil Soares",
  place: { pt: "São Paulo · Brasil", en: "São Paulo · Brazil" },
  role: {
    pt: "Tech Lead · <strong>Jusbrasil</strong>",
    en: "Tech Lead · <strong>Jusbrasil</strong>",
  },
  lead: {
    pt: "Mais de uma década construindo sistemas distribuídos e aplicações de alta escala para marketplaces, fintechs e plataformas de alto tráfego. Hoje lidero times no Jusbrasil.",
    en: "Over a decade building distributed systems and high-scale applications for marketplaces, fintechs and high-traffic platforms. Today I lead teams at Jusbrasil.",
  },
  skills: ["Go", "Python", "Java", "Scala", "Spark", "BigTable", "Redis", "GCP", "AWS", "LLMs"],
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/gilmarsoares/" },
    { label: "GitHub", url: "https://github.com/linuxsoares" },
    { label: "Blog", url: "https://linuxsoares.github.io" },
  ],
  email: "linux.soares@gmail.com",

  // Abertura estilo "letreiro". Aparece na primeira visita e pelo botão "Rever abertura".
  crawl: {
    episode: { pt: "Episódio IV", en: "Episode IV" },
    title: { pt: "UMA NOVA ARQUITETURA", en: "A NEW ARCHITECTURE" },
    paragraphs: [
      {
        pt: "É um período de tráfego intenso. Há mais de uma década, um jovem estagiário do Museu de Arte Moderna de São Paulo deixou os servidores da intranet para entrar na guerra contra os bugs.",
        en: "It is a period of heavy traffic. Over a decade ago, a young intern at the São Paulo Museum of Modern Art left the intranet servers behind to join the war against bugs.",
      },
      {
        pt: "Na Autopass, seus sistemas acompanharam 7 milhões de passageiros por dia em 39 municípios. No luizalabs, cuidou das finanças dos sellers de um marketplace que responde por 20% das vendas online do Magalu.",
        en: "At Autopass, his systems tracked 7 million passengers a day across 39 cities. At luizalabs, he took care of seller finances for a marketplace behind 20% of Magalu's online sales.",
      },
      {
        pt: "Hoje, como Tech Lead no Jusbrasil, ele lidera times na construção de sistemas distribuídos em Go, Python e na nuvem, em busca de plataformas cada vez mais resilientes…",
        en: "Today, as Tech Lead at Jusbrasil, he leads teams building distributed systems in Go, Python and the cloud, in search of ever more resilient platforms…",
      },
    ],
  },

  // Experiências, da mais recente para a mais antiga. A numeração dos episódios é automática
  // (a mais antiga é o Episódio I).
  // arch desenha a arquitetura num plano de 100×72: kind é client, gateway, service, queue, db ou server;
  // edges são as rotas das naves e sources são as origens que lançam frotas quando clicadas.
  episodes: [
    {
      id: "tech-lead",
      company: "Jusbrasil",
      period: { pt: "mai 2023 – atual", en: "May 2023 – present" },
      title: { pt: "Liderando times em sistemas distribuídos", en: "Leading teams on distributed systems" },
      intro: {
        pt: "Como Tech Lead, lidero times no desenvolvimento de sistemas que precisam suportar grande volume de dados e tráfego, garantindo estabilidade, performance e escalabilidade em cenários críticos.",
        en: "As Tech Lead, I lead teams building systems that must handle large volumes of data and traffic, keeping them stable, fast and scalable in critical scenarios.",
      },
      facts: [
        { pt: "Liderança técnica de times, <strong>100% remoto</strong>", en: "Technical leadership of teams, <strong>fully remote</strong>" },
        { pt: "Serviços em <strong>Go</strong> e Python na nuvem", en: "Services in <strong>Go</strong> and Python in the cloud" },
        { pt: "Foco em arquitetura robusta, observabilidade e evolução contínua", en: "Focus on robust architecture, observability and continuous evolution" },
      ],
      arch: {
        nodes: [
          { id: "users", kind: "client", x: 8, y: 36, label: { pt: "Usuários", en: "Users" } },
          { id: "gw", kind: "gateway", x: 28, y: 36, label: "Gateway" },
          { id: "go1", kind: "service", x: 50, y: 12, label: "Go" },
          { id: "go2", kind: "service", x: 50, y: 36, label: "Go" },
          { id: "py", kind: "service", x: 50, y: 60, label: "Python" },
          { id: "db", kind: "db", x: 74, y: 18, label: "Storage" },
          { id: "q", kind: "queue", x: 74, y: 54, label: { pt: "Fila", en: "Queue" } },
          { id: "work", kind: "service", x: 93, y: 54, label: "Workers" },
        ],
        edges: [["users", "gw"], ["gw", "go1"], ["gw", "go2"], ["gw", "py"], ["go1", "db"], ["go2", "db"], ["go2", "q"], ["py", "q"], ["q", "work"], ["work", "db"]],
        sources: ["users"],
      },
    },
    {
      id: "jusbrasil",
      company: "Jusbrasil",
      period: { pt: "set 2020 – mai 2023", en: "Sep 2020 – May 2023" },
      title: { pt: "Dados em escala com Spark e BigTable", en: "Data at scale with Spark and BigTable" },
      intro: {
        pt: "Engenheiro de software construindo sistemas e pipelines de dados de alto volume, a base que me levou à liderança técnica.",
        en: "Software engineer building high-volume systems and data pipelines, the groundwork that led me to technical leadership.",
      },
      facts: [
        { pt: "Processamento distribuído com <strong>Apache Spark</strong>", en: "Distributed processing with <strong>Apache Spark</strong>" },
        { pt: "Armazenamento de alta escala com <strong>BigTable</strong>", en: "High-scale storage with <strong>BigTable</strong>" },
        { pt: "Python, Scala e Google Cloud", en: "Python, Scala and Google Cloud" },
      ],
      arch: {
        nodes: [
          { id: "src1", kind: "client", x: 8, y: 16, label: { pt: "Fontes", en: "Sources" } },
          { id: "src2", kind: "client", x: 8, y: 56, label: { pt: "Fontes", en: "Sources" } },
          { id: "ing", kind: "queue", x: 28, y: 36, label: { pt: "Ingestão", en: "Ingestion" } },
          { id: "sp1", kind: "service", x: 50, y: 14, label: "Spark" },
          { id: "sp2", kind: "service", x: 50, y: 36, label: "Spark" },
          { id: "sp3", kind: "service", x: 50, y: 58, label: "Spark" },
          { id: "bt", kind: "db", x: 72, y: 36, label: "BigTable" },
          { id: "api", kind: "gateway", x: 92, y: 36, label: "API" },
        ],
        edges: [["src1", "ing"], ["src2", "ing"], ["ing", "sp1"], ["ing", "sp2"], ["ing", "sp3"], ["sp1", "bt"], ["sp2", "bt"], ["sp3", "bt"], ["bt", "api"]],
        sources: ["src1", "src2"],
      },
    },
    {
      id: "magalu",
      company: "luizalabs · Magalu",
      period: { pt: "ago 2016 – set 2020", en: "Aug 2016 – Sep 2020" },
      title: { pt: "A fintech do marketplace", en: "The marketplace fintech" },
      intro: {
        pt: "No time da Fintech do Magalu, cuidando da parte financeira dos sellers dentro da plataforma de Marketplace, com aplicações API First para o modelo “Magalu as a Service”.",
        en: "On Magalu's Fintech team, handling seller finances inside the Marketplace platform, with API First applications for the “Magalu as a Service” model.",
      },
      facts: [
        { pt: "Marketplace responsável por <strong>20%</strong> das vendas online do Magalu", en: "Marketplace behind <strong>20%</strong> of Magalu's online sales" },
        { pt: "APIs REST e ETL com Pentaho", en: "REST APIs and ETL with Pentaho" },
        { pt: "Python, Java, SQL, Redis, GCP e AWS", en: "Python, Java, SQL, Redis, GCP and AWS" },
      ],
      arch: {
        nodes: [
          { id: "sellers", kind: "client", x: 8, y: 18, label: "Sellers" },
          { id: "orders", kind: "client", x: 8, y: 54, label: { pt: "Pedidos", en: "Orders" } },
          { id: "api", kind: "gateway", x: 28, y: 36, label: "API First" },
          { id: "fin", kind: "service", x: 50, y: 20, label: "Fintech" },
          { id: "redis", kind: "db", x: 50, y: 52, label: "Redis" },
          { id: "etl", kind: "queue", x: 72, y: 36, label: "ETL Pentaho" },
          { id: "dw", kind: "db", x: 92, y: 36, label: { pt: "Dados", en: "Data" } },
        ],
        edges: [["sellers", "api"], ["orders", "api"], ["api", "fin"], ["api", "redis"], ["redis", "fin"], ["fin", "etl"], ["etl", "dw"]],
        sources: ["sellers", "orders"],
      },
    },
    {
      id: "autopass",
      company: "Autopass",
      period: { pt: "mai 2011 – jul 2016", en: "May 2011 – Jul 2016" },
      title: { pt: "Bilhetagem do transporte metropolitano", en: "Fare systems for metropolitan transit" },
      intro: {
        pt: "Aplicações para o transporte coletivo da Região Metropolitana de São Paulo, controlando as utilizações e gerando relatórios para os centros de controle de transporte.",
        en: "Applications for public transit in Greater São Paulo, tracking ridership and producing reports for the transit control centers.",
      },
      facts: [
        { pt: "<strong>7 milhões</strong> de usuários por dia em <strong>39 municípios</strong>", en: "<strong>7 million</strong> riders a day across <strong>39 cities</strong>" },
        { pt: "Relatórios para EMTU, CPTM e EMTC", en: "Reports for EMTU, CPTM and EMTC" },
        { pt: "Configuração dos validadores dos ônibus intermunicipais", en: "Configuration of intercity bus fare validators" },
        { pt: "Java, webservices, Oracle, MongoDB, Redis, WebLogic e WebSphere", en: "Java, web services, Oracle, MongoDB, Redis, WebLogic and WebSphere" },
      ],
      arch: {
        nodes: [
          { id: "bus1", kind: "client", x: 8, y: 16, label: { pt: "Validadores", en: "Validators" } },
          { id: "bus2", kind: "client", x: 8, y: 56, label: { pt: "Ônibus", en: "Buses" } },
          { id: "ws", kind: "service", x: 28, y: 36, label: "Webservices" },
          { id: "ora", kind: "db", x: 50, y: 16, label: "Oracle" },
          { id: "mongo", kind: "db", x: 50, y: 56, label: "MongoDB" },
          { id: "rep", kind: "service", x: 72, y: 36, label: { pt: "Relatórios", en: "Reports" } },
          { id: "emtu", kind: "client", x: 93, y: 12, label: "EMTU" },
          { id: "cptm", kind: "client", x: 93, y: 36, label: "CPTM" },
          { id: "emtc", kind: "client", x: 93, y: 60, label: "EMTC" },
        ],
        edges: [["bus1", "ws"], ["bus2", "ws"], ["ws", "ora"], ["ws", "mongo"], ["ora", "rep"], ["mongo", "rep"], ["rep", "emtu"], ["rep", "cptm"], ["rep", "emtc"]],
        sources: ["bus1", "bus2"],
      },
    },
  ],

  // Linha do tempo da seção "Origens".
  timeline: [
    { year: "2008–11", text: { pt: "Estagiário e depois analista de suporte e dev Java, Museu de Arte Moderna de São Paulo", en: "Intern, then support analyst and Java developer, São Paulo Museum of Modern Art" } },
    { year: "2011", text: { pt: "Analista de projetos, <a href=\"#autopass\">Autopass</a>: Oracle, SQL e C#", en: "Project analyst, <a href=\"#autopass\">Autopass</a>: Oracle, SQL and C#" } },
    { year: "2012–16", text: { pt: "Analista de sistemas, <a href=\"#autopass\">Autopass</a>", en: "Systems analyst, <a href=\"#autopass\">Autopass</a>" } },
    { year: "2016–20", text: { pt: "Desenvolvedor, <a href=\"#magalu\">luizalabs</a>", en: "Software developer, <a href=\"#magalu\">luizalabs</a>" } },
    { year: "2020–23", text: { pt: "Engenheiro de software, <a href=\"#jusbrasil\">Jusbrasil</a>", en: "Software engineer, <a href=\"#jusbrasil\">Jusbrasil</a>" } },
    { year: "2023–", text: { pt: "Tech Lead, <a href=\"#tech-lead\">Jusbrasil</a>", en: "Tech Lead, <a href=\"#tech-lead\">Jusbrasil</a>" } },
    { year: { pt: "formação", en: "education" }, text: "Centro Universitário Sant'Anna" },
  ],
  originsArch: {
    nodes: [
      { id: "staff", kind: "client", x: 10, y: 36, label: { pt: "Equipe", en: "Staff" } },
      { id: "net", kind: "gateway", x: 36, y: 36, label: { pt: "Rede", en: "Network" } },
      { id: "intra", kind: "server", x: 64, y: 16, label: "Intranet" },
      { id: "linux", kind: "server", x: 90, y: 16, label: "Linux" },
      { id: "files", kind: "server", x: 64, y: 56, label: { pt: "Arquivos", en: "Files" } },
      { id: "win", kind: "server", x: 90, y: 56, label: "Windows" },
    ],
    edges: [["staff", "net"], ["net", "intra"], ["net", "files"], ["intra", "linux"], ["files", "win"]],
    sources: ["staff"],
  },
  hobby: {
    pt: "Gosto de trocar ideias sobre arquitetura de software, desafios de escala e engenharia de plataformas.",
    en: "I enjoy talking about software architecture, scaling challenges and platform engineering.",
  },

  // Passe o mouse para ver o título completo. Deixe a lista vazia para esconder a seção.
  certs: [
    { name: "Machine Learning", title: "Introdução a machine learning · Hype Data & AI · 2025" },
    { name: "Prompts", title: "Comece a escrever prompts como um profissional · Google · 2025" },
    { name: { pt: "Prompts de design", en: "Design prompts" }, title: "Prompts de design para tarefas cotidianas de trabalho · Google · 2025" },
    { name: { pt: "Análise de dados com IA", en: "Data analysis with AI" }, title: "Acelerar a análise de dados e a criação de apresentações · Google · 2025" },
    { name: "MongoDB", title: "MongoDB for Java Developers · MongoDB · 2015" },
  ],
};
