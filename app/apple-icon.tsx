import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const italic = await readFile(path.join(process.cwd(), "assets/BodoniModa-Italic.ttf"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#2A1A15" }}>
        <div style={{ width: 132, height: 132, borderRadius: 66, border: "3px solid #D8B77B", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF8EF", fontSize: 60, fontStyle: "italic", fontFamily: "Bodoni" }}>
          JB
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Bodoni", data: italic, style: "italic", weight: 400 }] },
  );
}
