import { useEffect, useState } from "react";

type LisaConfig = {
  feature_x_enabled: boolean;
  theme: "light" | "dark";
};

const POLL_INTERVAL_MS = 3000;

export default function App() {
  const [config, setConfig] = useState<LisaConfig | null>(null);

  async function fetchConfig() {
    const res = await fetch(
      `${import.meta.env.VITE_LISA_CONFIG_URL}/client/projects/${import.meta.env.VITE_LISA_CLIENT_API}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    setConfig(data);
  }

  useEffect(() => {
    fetchConfig();
    const id = setInterval(fetchConfig, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // apply theme to body
  useEffect(() => {
    if (!config) return;

    document.body.style.backgroundColor =
      config.theme === "dark" ? "var(--bg-dark)" : "var(--bg-light)";

    document.body.style.color =
      config.theme === "dark" ? "var(--text-dark)" : "var(--text-light)";
  }, [config?.theme]);

  if (!config) return <p style={{ padding: 24 }}>Loading remote config…</p>;

  const cardStyle: React.CSSProperties = {
    background:
      config.theme === "dark" ? "var(--card-dark)" : "var(--card-light)",
    borderRadius: 12,
    padding: 24,
    maxWidth: 420,
    margin: "80px auto",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    transition: "background-color 0.3s ease",
  };

  return (
    <main style={cardStyle}>
      <h1 style={{ marginTop: 0 }}>Lisa Demo</h1>

      <div style={{ marginBottom: 16 }}>
        <strong>Theme:</strong>{" "}
        <span style={{ color: "var(--accent)" }}>{config.theme}</span>
      </div>

      <div
        style={{
          padding: 12,
          borderRadius: 8,
          background: config.feature_x_enabled
            ? "rgba(34,197,94,0.15)"
            : "rgba(148,163,184,0.15)",
          color: config.feature_x_enabled ? "var(--success)" : "var(--muted)",
          marginBottom: 16,
          transition: "all 0.3s ease",
        }}
      >
        {config.feature_x_enabled
          ? "Feature x is enabled"
          : "Feature x is disabled"}
      </div>

      <div style={{ fontSize: 12, opacity: 0.7 }}>
        Polling every {POLL_INTERVAL_MS / 1000}s
      </div>
    </main>
  );
}
