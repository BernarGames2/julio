import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";
export const alt = "Júlio Bononi Salão de Beleza — mechas, alisamentos e reestruturação capilar em Uberlândia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const [regular, italic] = await Promise.all([
    readFile(path.join(process.cwd(), "assets/BodoniModa-Regular.ttf")),
    readFile(path.join(process.cwd(), "assets/BodoniModa-Italic.ttf")),
  ]);
  const ring = (cx: number, cy: number, r: number, color: string) => (
    <div style={{ position: "absolute", left: cx - r, top: cy - r, width: r * 2, height: r * 2, borderRadius: r, border: `2px solid ${color}` }} />
  );
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#2A1A15", color: "#FFF8EF", padding: 72, fontFamily: "Bodoni", position: "relative" }}>
        {ring(1040, 140, 120, "#D8B77B")}
        {ring(1040, 140, 96, "rgba(216,183,123,.4)")}
        <div style={{ position: "absolute", left: 1040 - 40, top: 140 - 34, fontSize: 56, fontStyle: "italic", color: "#D8B77B" }}>01</div>
        <div style={{ fontSize: 22, letterSpacing: 6, color: "#D8B77B", textTransform: "uppercase" }}>Salão de beleza · Uberlândia</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, lineHeight: 0.9, textTransform: "uppercase" }}>Cabelo</div>
          <div style={{ fontSize: 132, lineHeight: 0.9, textTransform: "uppercase", paddingLeft: 120 }}>tem jeito</div>
          <div style={{ fontSize: 54, fontStyle: "italic", color: "#E5875C", marginTop: 18 }}>E tem especialista.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
          <span>Júlio Bononi</span>
          <span style={{ fontStyle: "italic", color: "#CFC8BC" }}>Mechas · Alisamentos · Reestruturação</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bodoni", data: regular, style: "normal", weight: 400 },
        { name: "Bodoni", data: italic, style: "italic", weight: 400 },
      ],
    },
  );
}
