import { useMemo, useState } from "react";

type Campaign = any;

const defaultBrief = {
  brandName: "GlowByte",
  productOrTopic: "AI-powered content planner for solo creators",
  niche: "creator productivity",
  targetAudience: "TikTok creators who post 3-5 times per week",
  language: "English",
  region: "US",
  objective: "drive waitlist signups",
  durationSec: 35,
  tone: "native, energetic, practical",
  keySellingPoints: [
    "turns one idea into 10 video angles",
    "creates hooks, scripts and shot lists",
    "exports production-ready briefs"
  ],
  cta: "Join the early access waitlist",
  platform: "tiktok"
};

export default function App() {
  const [briefText, setBriefText] = useState(JSON.stringify(defaultBrief, null, 2));
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shots = useMemo(() => campaign?.shots ?? [], [campaign]);

  async function generate() {
    setLoading(true);
    setError("");
    try {
      const brief = JSON.parse(briefText);
      const res = await fetch("/api/generate?mock=1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief, mock: true })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to generate");
      setCampaign(json.campaign);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Multi-Agent Creative Workflow</p>
          <h1>TikTok Agent Script Studio</h1>
          <p className="subtitle">Turn one product brief into hooks, voiceover, shot lists, captions and compliance notes.</p>
        </div>
        <button onClick={generate} disabled={loading}>{loading ? "Generating..." : "Generate demo"}</button>
      </section>

      <section className="grid">
        <div className="card">
          <h2>Creative Brief</h2>
          <textarea value={briefText} onChange={e => setBriefText(e.target.value)} spellCheck={false} />
          {error && <p className="error">{error}</p>}
        </div>

        <div className="card output">
          <h2>Result</h2>
          {!campaign && <p className="muted">Click generate to preview a complete campaign package.</p>}
          {campaign && (
            <>
              <div className="score">Overall score: <strong>{campaign.score.overall}/10</strong></div>
              <h3>Selected Hook</h3>
              <p className="hook">{campaign.selectedHook.hookLine}</p>
              <h3>Script</h3>
              <ol>
                {campaign.script.map((s: any) => (
                  <li key={`${s.startSec}-${s.endSec}`}><strong>{s.startSec}-{s.endSec}s</strong> {s.voiceover}</li>
                ))}
              </ol>
            </>
          )}
        </div>
      </section>

      {campaign && (
        <section className="card">
          <h2>Shot List</h2>
          <div className="shotGrid">
            {shots.map((shot: any) => (
              <article className="shot" key={shot.shotNo}>
                <strong>Shot {shot.shotNo} · {shot.startSec}-{shot.endSec}s</strong>
                <p>{shot.visual}</p>
                <small>{shot.framing} · {shot.cameraMovement}</small>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
