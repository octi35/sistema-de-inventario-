import type { Metadata } from "next";
import { Bell, CheckCircle2 } from "lucide-react";
import { mockAlerts } from "@/data/mock";
import type { AlertType } from "@/types";

export const metadata: Metadata = { title: "Alertas | StockPro" };

const alertConfig: Record<AlertType, { dot: string; bg: string; bdr: string; label: string }> = {
  OUT_OF_STOCK: { dot: "#FF3B30", bg: "rgba(255,59,48,0.06)",  bdr: "rgba(255,59,48,0.15)",  label: "Sin Stock" },
  LOW_STOCK:    { dot: "#FF9500", bg: "rgba(255,149,0,0.06)", bdr: "rgba(255,149,0,0.15)",  label: "Stock Bajo" },
  EXPIRY:       { dot: "#AF52DE", bg: "rgba(175,82,222,0.06)", bdr: "rgba(175,82,222,0.15)", label: "Vencimiento" },
  ORDER_DELAY:  { dot: "#FF9500", bg: "rgba(255,149,0,0.06)", bdr: "rgba(255,149,0,0.15)",  label: "Demora Pedido" },
  SYSTEM:       { dot: "#007AFF", bg: "rgba(0,122,255,0.06)", bdr: "rgba(0,122,255,0.15)",  label: "Sistema" },
};

const countCards = [
  { key: "OUT_OF_STOCK", label: "Sin Stock",  color: "#FF3B30", tint: "rgba(255,59,48,0.08)",  bdr: "rgba(255,59,48,0.15)" },
  { key: "LOW_STOCK",    label: "Stock Bajo", color: "#FF9500", tint: "rgba(255,149,0,0.08)", bdr: "rgba(255,149,0,0.15)" },
  { key: "ORDER_DELAY",  label: "Demoras",    color: "#FF9500", tint: "rgba(255,149,0,0.08)", bdr: "rgba(255,149,0,0.15)" },
  { key: "SYSTEM",       label: "Sistema",    color: "#007AFF", tint: "rgba(0,122,255,0.08)", bdr: "rgba(0,122,255,0.15)" },
] as const;

export default function AlertasPage() {
  const active   = mockAlerts.filter((a) => !a.resolved);
  const resolved = mockAlerts.filter((a) =>  a.resolved);

  return (
    <div className="anim-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Header */}
      <div>
        <p className="page-label">Control</p>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1C1C1E", letterSpacing: "-0.04em", lineHeight: 1, margin: 0, fontFamily: `-apple-system,"SF Pro Display",sans-serif` }}>
          Alertas
        </h1>
        <p style={{ fontSize: "13px", color: "#6C6C70", marginTop: "4px" }}>
          {active.length} activas · {resolved.length} resueltas
        </p>
      </div>

      {/* Count cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
        {countCards.map((item) => {
          const cnt = active.filter((a) => a.type === item.key).length;
          return (
            <div key={item.key} style={{
              padding: "18px 20px", borderRadius: "14px",
              background: "#fff", border: `0.5px solid ${item.bdr}`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)", textAlign: "center",
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: item.tint, display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 8px", color: item.color,
              }}>
                <Bell style={{ width: "16px", height: "16px" }} />
              </div>
              <p style={{ fontSize: "26px", fontWeight: 700, color: item.color, letterSpacing: "-0.05em", lineHeight: 1 }}>
                {cnt}
              </p>
              <p style={{ fontSize: "12px", color: "#6C6C70", marginTop: "4px", fontWeight: 500 }}>{item.label}</p>
            </div>
          );
        })}
      </div>

      {/* Active */}
      <div>
        <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#1C1C1E", letterSpacing: "-0.02em", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
          <Bell style={{ width: "14px", height: "14px", color: "#FF3B30" }} />
          Alertas Activas
        </h2>
        {active.length === 0 ? (
          <div style={{ padding: "40px", borderRadius: "16px", background: "#fff", border: "0.5px solid #E5E5EA", textAlign: "center", color: "#AEAEB2" }}>
            <CheckCircle2 style={{ width: "36px", height: "36px", margin: "0 auto 8px", color: "#34C759", opacity: 0.5 }} />
            <p style={{ fontSize: "14px" }}>No hay alertas activas</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {active.map((alert) => {
              const cfg = alertConfig[alert.type];
              return (
                <div key={alert.id} style={{
                  display: "flex", alignItems: "flex-start", gap: "12px",
                  padding: "14px 18px", borderRadius: "12px",
                  background: cfg.bg, border: `0.5px solid ${cfg.bdr}`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                }}>
                  <span className="dot" style={{ background: cfg.dot, marginTop: "4px", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "3px" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: cfg.dot }}>
                        {cfg.label}
                      </span>
                      {alert.product && (
                        <span className="mono" style={{ fontSize: "10px", background: "rgba(0,0,0,0.06)", color: "#6C6C70", padding: "1px 5px", borderRadius: "4px" }}>
                          {alert.product.code}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "13px", color: "#1C1C1E", fontWeight: 400, lineHeight: 1.4, letterSpacing: "-0.01em" }}>
                      {alert.message}
                    </p>
                    <p style={{ fontSize: "11px", color: "#AEAEB2", marginTop: "3px" }}>
                      {new Date(alert.createdAt).toLocaleString("es-AR")}
                    </p>
                  </div>
                  <button className="btn btn-secondary" style={{ fontSize: "12px", padding: "5px 14px", flexShrink: 0 }}>
                    Resolver
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Resolved */}
      {resolved.length > 0 && (
        <div>
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#AEAEB2", letterSpacing: "-0.02em", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
            <CheckCircle2 style={{ width: "14px", height: "14px", color: "#34C759", opacity: 0.6 }} />
            Alertas Resueltas
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", opacity: 0.6 }}>
            {resolved.map((alert) => {
              const cfg = alertConfig[alert.type];
              return (
                <div key={alert.id} style={{
                  display: "flex", alignItems: "flex-start", gap: "12px",
                  padding: "12px 18px", borderRadius: "12px",
                  background: "#fff", border: "0.5px solid #E5E5EA",
                }}>
                  <CheckCircle2 style={{ width: "14px", height: "14px", color: "#34C759", flexShrink: 0, marginTop: "2px" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "3px" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6C6C70" }}>
                        {cfg.label}
                      </span>
                      <span className="badge badge-success" style={{ fontSize: "10px" }}>Resuelta</span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#3A3A3C", letterSpacing: "-0.01em" }}>{alert.message}</p>
                    <p style={{ fontSize: "11px", color: "#AEAEB2", marginTop: "3px" }}>
                      Resuelta: {alert.resolvedAt ? new Date(alert.resolvedAt).toLocaleString("es-AR") : "—"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
