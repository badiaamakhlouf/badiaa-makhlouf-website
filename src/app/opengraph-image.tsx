import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}, ${site.specialty}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#fcfbfc",
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#0e1116",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, color: "#4d5562", letterSpacing: 4, textTransform: "uppercase" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#db2777" }} />
          {site.role} · {site.specialty}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ marginTop: 20, fontSize: 32, color: "#4d5562", maxWidth: 950, lineHeight: 1.35 }}>
            Agentic LLM applications, deep learning and the cloud data platforms underneath them.
          </div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 22 }}>
          {["Amazon Bedrock", "Strands Agents", "PyTorch", "GCP", "AWS"].map((t) => (
            <div key={t} style={{ border: "1px solid rgba(15,23,42,0.18)", borderRadius: 10, padding: "8px 16px", color: "#0e1116", background: "#ffffff" }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
