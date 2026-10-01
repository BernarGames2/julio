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
1. Importe o repositório na Vercel (o framework Next.js é detectado sozinho).
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
- Coreografia em `components/ui/SmoothScroll.tsx` (motor global: Lenis + ScrollTrigger, reveals, cor de fundo interpolada, ondas, clip-path, contadores) e ilhas por seção (`HeroMotion`, `ManifestoMotion`, `CartelaMotion`), além de `Marquee`, `BeforeAfter`, `Cursor`, `Preloader` e `ScrollProgress`.
- GSAP e Lenis são carregados por *dynamic import*. Só animam `transform`, `opacity`, `clip-path` e `filter`.
- **Sem JS o conteúdo fica todo visível.** O estado inicial "escondido" só é aplicado quando o JS confirma que vai rodar, com uma rede de segurança de 4s.
- `prefers-reduced-motion`: sem Lenis, preloader, parallax, cursor, marquee, split por letra nem pin horizontal. Ficam só fades curtos e o comparador continua funcional.
- O Framer Motion foi avaliado e **retirado**: as microinterações (magnético, preenchimento, ondulação) são feitas com CSS e transform puros, o que economizou cerca de 30 KB de JS e melhorou o TBT no mobile.

## Verificação feita
- Screenshots (Playwright) em 375, 390, 768, 1440 e 1920, mais reduced-motion: sem scroll horizontal e sem erros de console.
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
