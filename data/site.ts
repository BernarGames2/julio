/**
 * ============================================================
 *  DADOS DO SITE — Júlio Bononi Salão de Beleza
 * ============================================================
 *  Este é o ÚNICO arquivo que o cliente precisa editar para
 *  atualizar textos, horários, serviços e depoimentos.
 *
 *  Regra: nada aqui é inventado. Tudo o que ainda não foi
 *  confirmado está marcado com `aConfirmar` / `TODO(cliente)`
 *  e NÃO é exibido no site até ser preenchido.
 * ============================================================
 */

export const site = {
  name: "Júlio Bononi Salão de Beleza",
  shortName: "Júlio Bononi",
  subtitle: "Salão de beleza · Uberlândia",
  tagline: "Mechas, alisamentos e reestruturação capilar.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.juliobononi.com.br",
  locale: "pt_BR",
  description:
    "Mechas, loiros, alisamentos e reestruturação capilar no Centro de Uberlândia. Toda cor e todo tratamento começam por uma avaliação do seu cabelo. Agende pelo WhatsApp.",
  promise: "Toda cor e todo tratamento começam por uma avaliação do seu cabelo.",
} as const;

export const contact = {
  // TODO(cliente): confirmar que este número é WhatsApp ativo.
  phoneDisplay: "(34) 99668-7848",
  phoneE164: "+5534996687848",
  whatsappNumber: "5534996687848",
  instagramHandle: "@espacojuliobononi",
  instagramUrl: "https://www.instagram.com/espacojuliobononi/",
  address: {
    street: "Rua Abdalla Haddad, 105",
    district: "Centro",
    city: "Uberlândia",
    state: "MG",
    postalCode: "38400-115",
    country: "BR",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+Abdalla+Haddad%2C+105+-+Centro%2C+Uberl%C3%A2ndia+-+MG%2C+38400-115",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Rua+Abdalla+Haddad,+105+-+Centro,+Uberl%C3%A2ndia+-+MG,+38400-115&output=embed",
  // TODO(cliente): coordenadas exatas (opcional). Deixe null se não souber.
  geo: null as null | { lat: number; lng: number },
} as const;

/** Mensagens pré-preenchidas do WhatsApp, por contexto. */
export const whatsappMessages = {
  geral: "Oi! Quero agendar uma avaliação com o Júlio.",
  mechas: "Oi! Quero fazer mechas/loiro com o Júlio.",
  saberMais: "Oi! Quero saber mais sobre mechas e loiros.",
} as const;
export type WhatsappContext = keyof typeof whatsappMessages;

/** Horário de funcionamento (fonte: Google). 0 = domingo. */
export const hours = [
  { day: 0, label: "Domingo", short: "Dom", open: null, close: null },
  { day: 1, label: "Segunda", short: "Seg", open: null, close: null },
  { day: 2, label: "Terça", short: "Ter", open: "09:00", close: "19:00" },
  { day: 3, label: "Quarta", short: "Qua", open: "09:00", close: "19:00" },
  { day: 4, label: "Quinta", short: "Qui", open: "09:00", close: "19:00" },
  { day: 5, label: "Sexta", short: "Sex", open: "09:00", close: "19:00" },
  { day: 6, label: "Sábado", short: "Sáb", open: "09:00", close: "19:00" },
] as const;
export const hoursSummary = "Terça a sábado, 9h às 19h";

/** Preços não são públicos. Nunca exibir valores. */
export const priceNote = "valor na avaliação";

/** Navegação principal (âncoras). */
export const nav = [
  { href: "#especialidade", label: "Especialidade" },
  { href: "#cartela", label: "Cartela" },
  { href: "#o-julio", label: "O Júlio" },
  { href: "#contato", label: "Contato" },
] as const;

/** Seções, na ordem — alimentam o contador "01 / 07". */
export const sections = [
  { id: "inicio", label: "Capa", bg: "cacau" },
  { id: "especialidade", label: "Especialidade", bg: "cacau" },
  { id: "manifesto", label: "Manifesto", bg: "linho" },
  { id: "cartela", label: "Cartela", bg: "linho" },
  { id: "o-julio", label: "O Júlio", bg: "areia" },
  { id: "resultados", label: "Resultados", bg: "linho" },
  { id: "contato", label: "Contato", bg: "areia" },
] as const;

/* ------------------------------------------------------------
 * A CARTELA — cada serviço é um tom numerado.
 * `tone` é a cor da amostra (mecha) desenhada no card.
 * ------------------------------------------------------------ */
export type Service = {
  n: string;
  name: string;
  line: string;
  description: string;
  tone: [string, string];
  featured?: boolean;
};

export const services: Service[] = [
  {
    n: "01",
    name: "Mechas e loiros",
    line: "BlondHair · Loiríssima",
    description:
      "Clareamento planejado em etapas, tonalização sob medida e o cuidado de manter a fibra inteira no caminho até o loiro.",
    tone: ["#F1DDB0", "#C9A46A"],
    featured: true,
  },
  {
    n: "02",
    name: "Morena iluminada",
    line: "Luz no castanho",
    description:
      "Pontos de luz que conversam com a sua base natural, para iluminar sem perder a identidade do castanho.",
    tone: ["#9A6B45", "#5A3826"],
  },
  {
    n: "03",
    name: "Ruivo",
    line: "Cobre e acobreados",
    description:
      "Do acobreado suave ao ruivo intenso, com a escolha do tom feita junto com você, olhando pele e rotina.",
    tone: ["#C2602F", "#7E2E14"],
  },
  {
    n: "04",
    name: "OmbréHair",
    line: "Transição de cor",
    description:
      "Degradê da raiz às pontas com passagem suave, pensado para crescer bonito e pedir menos retoque.",
    tone: ["#E2C38E", "#4A2E22"],
  },
  {
    n: "05",
    name: "Alisamentos",
    line: "Liso com movimento",
    description:
      "Técnica escolhida a partir da avaliação do fio, para reduzir volume e frizz respeitando o que o seu cabelo aguenta.",
    tone: ["#3B2A22", "#1E1410"],
  },
  {
    n: "06",
    name: "Exoplastia",
    line: "Alinhamento dos fios",
    description:
      "Procedimento de alinhamento e brilho indicado depois de avaliar a estrutura e o histórico químico do cabelo.",
    tone: ["#6E4B36", "#2E1D16"],
  },
  {
    n: "07",
    name: "Reestruturação capilar",
    line: "Tratamentos",
    description:
      "Para fios cansados de química e calor: um plano de cuidado em sessões, com calma e sem promessa milagrosa.",
    tone: ["#D8B77B", "#8C6A3E"],
  },
];

export const extras = ["Retoque de raiz", "Tratamentos de manutenção"] as const;

/* ------------------------------------------------------------
 * ESPECIALIDADE — Mechas e loiros
 * ------------------------------------------------------------ */
export const specialty = {
  eyebrow: "Especialidade da casa",
  title: ["Loiro bonito", "começa antes", "do pó descolorante."],
  lead:
    "Antes de clarear, o Júlio olha a história do seu cabelo: química anterior, resistência do fio e o tom que você imagina. É daí que sai o plano — às vezes em uma sessão, às vezes em mais.",
  benefits: [
    "Avaliação do fio antes de qualquer química",
    "Clareamento em etapas, sem pressa",
    "Tonalização pensada para o seu tom de pele",
  ],
  image: "/images/editorial/loiro-finalizado.jpg",
  imageAlt: "Cabelo loiro com mechas finalizado, visto de costas, com brilho e movimento",
};

/* ------------------------------------------------------------
 * MANIFESTO (statement com palavras que acendem)
 * ------------------------------------------------------------ */
export const manifesto =
  "Cabelo não é tela em branco. Cada fio carrega química, sol, calor e escolhas antigas. Por isso aqui nada começa pela tinta: começa por olhar, ouvir e entender o que o seu cabelo ainda pode ser.";

export const marqueeWords = ["Blond", "Alisamento", "Reestruturação", "Mechas"] as const;

/* ------------------------------------------------------------
 * O JÚLIO — sobre
 * TODO(cliente): validar os parágrafos (rascunho).
 * ------------------------------------------------------------ */
export const about = {
  name: "Júlio Bononi",
  role: "Mechas, alisamentos e reestruturação capilar",
  paragraphs: [
    "O Júlio trabalha com o cabelo como quem lê uma história: primeiro entende por onde ele passou, depois decide para onde ele pode ir. É dessa escuta que nascem os loiros, as morenas iluminadas e os ruivos que você vê no Instagram do salão.",
    "No salão do Centro de Uberlândia, cada atendimento começa por uma avaliação. Sem promessa milagrosa e sem pressa: técnica, produto certo e um plano honesto para o seu fio.",
  ],
  image: "/images/team/julio-retrato.jpg",
  imageAlt: "Retrato do cabeleireiro Júlio Bononi em estúdio",
  // TODO(cliente): anos de experiência e formação — não exibidos enquanto null.
  yearsOfExperience: null as number | null,
  education: null as string | null,
};

/** Métricas REAIS. Só use números verificáveis. */
export const metrics = [
  { value: 10.8, decimals: 1, suffix: " mil", label: "seguidores no Instagram", note: "perfil verificado" },
  { value: 3, decimals: 0, suffix: "", label: "especialidades declaradas", note: "mechas · alisamentos · reestruturação" },
  { value: null, text: "Ter–Sáb", label: "das 9h às 19h", note: "horário informado no Google" },
] as const;

/* ------------------------------------------------------------
 * PROVA — antes e depois (fotos reais do cliente)
 * TODO(cliente): autorização de uso das fotos do Instagram.
 * ------------------------------------------------------------ */
export const beforeAfter = {
  before: "/images/editorial/antes.jpg",
  after: "/images/editorial/depois.jpg",
  beforeAlt: "Cabelo antes do atendimento, com cor irregular e pontas ressecadas",
  afterAlt: "O mesmo cabelo depois do atendimento, com loiro uniforme e brilho",
  caption: "Antes / Retoque",
};

export const gallery = [
  { src: "/images/editorial/galeria-01.jpg", alt: "Loiríssima finalizada com escova e ondas leves", label: "Loiríssima", ratio: "4/5" },
  { src: "/images/editorial/galeria-02.jpg", alt: "Ruivo acobreado em cabelo longo, visto de lado", label: "Ruivo", ratio: "3/4" },
  { src: "/images/editorial/galeria-03.jpg", alt: "Morena iluminada com mechas suaves em tom mel", label: "Morena iluminada", ratio: "1/1" },
  { src: "/images/editorial/galeria-04.jpg", alt: "Cabelo alisado com brilho e movimento natural", label: "Alisamento", ratio: "4/5" },
] as const;

/* ------------------------------------------------------------
 * DEPOIMENTOS — SOMENTE REAIS, com nome e autorização.
 * Enquanto a lista estiver vazia, a seção não aparece em produção.
 * Formato: { name: "Ana P.", text: "...", service: "Mechas", source: "Google" }
 * ------------------------------------------------------------ */
export type Testimonial = { name: string; text: string; service?: string; source?: string };
export const testimonials: Testimonial[] = [];

/** Avaliação do Google — TODO(cliente). Não exibida enquanto null. */
export const googleRating = null as null | { rating: number; count: number; url: string };

/* ------------------------------------------------------------
 * HERO
 * ------------------------------------------------------------ */
export const hero = {
  badge: "Ateliê de cor e cuidado capilar · Centro de Uberlândia",
  h1Full: "Cabelo cansado tem jeito. E tem especialista.",
  display: ["Cabelo", "tem jeito"],
  italic: "E tem especialista.",
  image: "/images/hero/hero.jpg",
  imageAlt: "Retrato de mulher com cabelo loiro acobreado iluminado por luz quente",
  /** PNG recortado (pessoa/cabelo sem fundo). Se existir e `useCutout` for true, o texto fica ENTRE o fundo e o recorte. */
  cutout: "/images/hero/hero-recorte.png",
  useCutout: true,
  /** Vídeo opcional (mudo, loop). Deixe null para usar só a imagem. */
  video: null as null | { webm?: string; mp4?: string },
  floatingCards: ["Avaliação antes de qualquer química", "Mechas · Alisamento · Reestruturação"],
};

/* ------------------------------------------------------------
 * PENDÊNCIAS DO CLIENTE (também listadas no README)
 * ------------------------------------------------------------ */
export const pendencias = [
  "Autorização para usar as fotos do Instagram e o retrato do Júlio",
  "Confirmar que (34) 99668-7848 é WhatsApp ativo",
  "Depoimentos reais com nome e autorização",
  "Nota e número de avaliações do Google (se houver)",
  "Anos de experiência e formação",
  "Preços (somente se quiser divulgar)",
  "O que está atrás do link da bio do Instagram",
  "Validar os textos da seção 'O Júlio'",
] as const;
