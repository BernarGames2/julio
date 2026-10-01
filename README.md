# Júlio Bononi Salão de Beleza — site

Site one-page do ateliê de cor e cuidado capilar do Júlio Bononi (Centro de Uberlândia/MG).
Conceito: **uma revista editorial de beleza onde cada serviço é um tom numerado de uma cartela de cores.**

Stack: Next.js 15 (App Router, exportação estática) · React 19 · TypeScript · Tailwind CSS · GSAP + ScrollTrigger · Lenis.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000 (mostra placeholders das fotos que faltam)
npm run build      # gera o site estático em /out
npm start          # serve /out localmente
npm run lint && npm run typecheck
```

## Onde editar

| O quê | Onde |
|---|---|
| Textos, telefone, endereço, horários, serviços, mensagens de WhatsApp, métricas, depoimentos, nota do Google | **`data/site.ts`** (único arquivo de dados) |
| Fotos | `public/images/...` — veja **`public/images/README.md`** |
| Cores, tipografia, espaçamentos, raios, easing | `styles/globals.css` (`:root`) + `tailwind.config.ts` |
| SEO / schema.org | `app/layout.tsx`, `lib/schema.ts`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` |

### Depoimentos
Adicione em `testimonials` (`data/site.ts`) apenas depoimentos **reais, com nome e autorização**. Enquanto a lista estiver vazia, a seção não aparece em produção (em `npm run dev` aparece um placeholder tracejado).

### Hero com recorte ou vídeo
- `hero.useCutout` + `public/images/hero/hero-recorte.png` → a tipografia fica **entre** o fundo e o recorte (o cabelo passa na frente das letras). Sem o PNG, o texto fica por cima com `mix-blend-mode`.
- `hero.video = { webm: "/images/hero/hero.webm", mp4: "/images/hero/hero.mp4" }` → vídeo mudo em loop, com o `hero.jpg` de pôster. Ele é desligado automaticamente em *reduced motion* e em economia de dados.

## Deploy na Vercel
1. Em vercel.com → **Add New… → Project**, importe `bernargames2/julio` (o framework Next.js é detectado sozinho; não precisa mudar build command nem output). Hoje a branch padrão do repositório é `claude/trusting-bohr-hna1xu`, então o primeiro deploy já sai dela; cada push novo gera outro deploy, e outras branches viram *Preview*.
2. Defina `NEXT_PUBLIC_SITE_URL` com o domínio final (canonical, sitemap e Open Graph usam esse valor).
3. Deploy. Por usar `output: "export"`, o mesmo `/out` também funciona em qualquer hospedagem estática.

## Analytics (desligado por padrão)
Copie `.env.example` para `.env.local` (ou configure na Vercel):

```
NEXT_PUBLIC_GA_ID=G-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=000000000
```

Com alguma das duas preenchida, aparece o banner de cookies (LGPD), com **Aceitar** e **Recusar** visíveis. Os scripts só carregam depois do aceite.
Eventos (sem dados pessoais): `whatsapp_click` (com `section`: header, hero, especialidade, cartela, sobre, contato, fab), `phone_click`, `directions_click`, `instagram_click`.

## Motion
- **Abertura em CSS puro** (`styles/globals.css`, seção "ABERTURA"): preloader (anel, contagem 00→100 e cortina) e entrada do hero (letras, itálico, zoom, fios, cards). Roda no compositor desde a 1ª pintura e não espera o JS baixar, o que importa em 4G.
- **GSAP + Lenis** (dynamic import) para o que depende de rolagem: `components/ui/SmoothScroll.tsx` (reveals, cor de fundo entre seções, ondas, clip-path, contadores) e as ilhas `HeroMotion` (parallax e vídeo), `ManifestoMotion` e `CartelaMotion`, além de `Marquee`, `BeforeAfter`, `Cursor` e `ScrollProgress`.
- **O conteúdo nasce visível.** Quando o GSAP chega, ele prepara para o reveal só o que ainda está abaixo da tela. Sem JS, ou com JS lento, nada fica em branco.
- **Regras de desempenho** (não quebre ao editar):
  - Anime só `transform`, `opacity`, `clip-path` e `filter`.
  - **Nunca anime uma variável CSS no `:root`.** Isso recalcula o estilo da página inteira a cada quadro. A cor de fundo anima o `background-color` do `<body>` direto.
  - Sem `will-change` permanente.
  - Sem `backdrop-filter` nem `mix-blend-mode` em áreas grandes no celular.
- `prefers-reduced-motion`: sem Lenis, preloader, parallax, cursor, marquee, split por letra nem pin horizontal. Ficam só fades curtos e o comparador continua funcional.
- O Framer Motion foi avaliado e **retirado**: as microinterações (magnético, preenchimento, ondulação) são feitas com CSS e transform puros, o que economizou cerca de 30 KB de JS.

## Verificação feita
- Screenshots (Playwright) em 375, 390, 768, 1440 e 1920, mais reduced-motion: sem scroll horizontal e sem erros de console.
- Emulação de aparelhos com toque (iPhone SE 320px, iPhone 13, Pixel 7, Galaxy S9+ e iPad Pro 11 na horizontal): o CTA do hero aparece na primeira tela, o botão de WhatsApp é tocável e abre o `wa.me` com a mensagem, e o reveal funciona ao pular por âncora ou recarregar no meio da página. Na emulação não existe barra de endereço real nem Safari/WebKit, então **confira num celular de verdade**.
- Desempenho medido com CPU 4x mais lenta e 4G simulado (celular médio). Rolagem no celular: travadas acima de 100ms caíram de ~25 para 1–4 por percurso, e o p95 de quadro foi de 117ms para 33ms. Desktop com a Cartela fixada: de 19fps para 44fps. Botão "Agendar avaliação" do hero visível em 2,5s, contra 4,2s antes.
- Lighthouse mobile (servidor local, sem fotos reais): Performance 92–95, Acessibilidade 100, Boas práticas 100, SEO 100. CLS 0, LCP de 2,2 a 2,5s (o TTFB local de cerca de 450ms pesa; na Vercel a tendência é ficar menor). **Rode o Lighthouse de novo depois de colocar as fotos reais**, porque o `hero.jpg` passa a ser o elemento de LCP. Mantenha-o abaixo de 350 KB.
- Lint, typecheck e build passando.

## Honestidade dos dados
Nenhum preço, depoimento, nota do Google, número de avaliações, anos de experiência ou promessa de resultado foi inventado. Os números exibidos são só: 10,8 mil seguidores (Instagram verificado), 3 especialidades (bio) e o horário Ter–Sáb, 9h–19h (Google).

## Pendências do cliente
- [ ] Autorização para usar as fotos do Instagram e o retrato do Júlio, e o envio das fotos (lista em `public/images/README.md`)
- [ ] Confirmar que (34) 99668-7848 é WhatsApp ativo
- [ ] Depoimentos reais com nome e autorização
- [ ] Nota e número de avaliações do Google (se houver), em `googleRating`
- [ ] Anos de experiência e formação (`about.yearsOfExperience`, `about.education`)
- [ ] Preços (somente se quiser divulgar; hoje: "valor na avaliação")
- [ ] O que está atrás do link da bio do Instagram
- [ ] Validar os dois parágrafos da seção "O Júlio" (rascunho)
- [ ] Domínio final (`NEXT_PUBLIC_SITE_URL`) e, se quiser, coordenadas para o schema (`contact.geo`)
