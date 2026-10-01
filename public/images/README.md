# Fotos do site — Júlio Bononi

Coloque as fotos **reais** (com autorização) exatamente nestes caminhos. O site detecta no build se cada arquivo existe:
- arquivo presente → foto aparece (com `next/image`, proporção fixa, blur placeholder, lazy loading);
- arquivo ausente → em **desenvolvimento** aparece um placeholder cacau com o nome esperado; em **produção** aparece uma arte abstrata de mecha (sem texto).

Formato: **JPG ou WebP** (o site é exportado estático; converta para WebP/AVIF com qualidade ~75 antes de subir). Mantenha nomes e extensões ou ajuste em `data/site.ts`.

| Arquivo | Proporção | Tamanho máx. recomendado | Onde aparece |
|---|---|---|---|
| `hero/hero.jpg` | 16:9 (recorte central em mobile: rosto/cabelo entre 50–70% horizontal) | 2400×1350, ≤ 350 KB | Capa (fundo em tela cheia, LCP) |
| `hero/hero-recorte.png` *(opcional)* | mesmo enquadramento do `hero.jpg`, fundo transparente | 2400×1350, ≤ 450 KB | Camada à frente da tipografia (o cabelo passa na frente das letras). Desative com `hero.useCutout = false` |
| `hero/hero.webm` / `hero.mp4` *(opcional)* | 16:9, mudo, loop curto | ≤ 2,5 MB | Vídeo de fundo da capa (configure `hero.video` em `data/site.ts`) |
| `editorial/loiro-finalizado.jpg` | 4:5 vertical | 1600×2000, ≤ 300 KB | Especialidade — Mechas e loiros |
| `team/julio-retrato.jpg` | 4:5 vertical (recortado em arco no topo — deixe respiro acima da cabeça) | 1400×1750, ≤ 250 KB | Seção "O Júlio" |
| `editorial/antes.jpg` | 4:5 | 1600×2000, ≤ 250 KB | Comparador antes/depois (mesmo enquadramento do "depois") |
| `editorial/depois.jpg` | 4:5 | 1600×2000, ≤ 250 KB | Comparador antes/depois |
| `editorial/galeria-01.jpg` | 16:10 | 1600×1000, ≤ 200 KB | Colagem — Loiríssima |
| `editorial/galeria-02.jpg` | 3:4 | 900×1200, ≤ 160 KB | Colagem — Ruivo |
| `editorial/galeria-03.jpg` | 3:4 | 900×1200, ≤ 160 KB | Colagem — Morena iluminada |
| `editorial/galeria-04.jpg` | 16:9 | 1400×790, ≤ 180 KB | Colagem — Alisamento |

Pastas `services/` e `decorations/` ficam reservadas (hoje os cards da cartela usam amostras desenhadas em SVG, sem foto).

## Tratamento
- Luz quente, fundo neutro, sem filtros pesados. O site aplica overlay cacau no hero; nas demais fotos, mantenha a cor fiel ao resultado.
- Antes/depois: mesma luz, mesmo ângulo, mesma distância.
- Não use banco de imagens. Se precisar de imagem de reserva gerada por IA, use apenas para fundo/textura (nunca logos, textos, UI ou "resultados").
