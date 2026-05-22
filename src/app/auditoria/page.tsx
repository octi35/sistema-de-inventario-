"use client";

import { ClipboardList, Filter, Search } from "lucide-react";
import { mockMovements } from "@/data/mock"; // Usaremos movimientos como auditoría base por ahora

export default function AuditoriaPage() {
  return (
    <div className="anim-enter" style={{ display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "40px" }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
           <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--tx-tertiary)", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: "4px" }}>
            Control y Seguridad
          </p>
          <h1 className="sf-title-lg">Auditoría del Sistema</h1>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <div style={{ position: "relative", width: "220px" }}>
            <Search style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", width: "13px", height: "13px", color: "var(--tx-tertiary)" }} />
            <input type="text" className="input-mac" placeholder="Buscar ID o usuario..." style={{ paddingLeft: "26px" }} />
        </div>
        <select className="input-mac" style={{ width: "140px" }} defaultValue="">
          <option value="">Todo el historial</option>
          <option value="LOGIN">Sesiones (Login)</option>
          <option value="CRIT">Movimientos Críticos</option>
        </select>
        <button className="btn-mac btn-mac-secondary">
           <Filter style={{ width: "14px", height: "14px", color: "var(--tx-secondary)" }} />
        </button>
      </div>

      {/* Audit Log Table Mac Style */}
      <div className="apple-list">
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid var(--sep-mac)" }}>
            <tr>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>ID Trans.</th>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Evento</th>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Módulo</th>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Usuario IP</th>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {[...mockMovements].reverse().map((m, i) => (
              <tr key={i} className="hover:bg-[var(--control-bg)] transition-colors" style={{ borderBottom: "0.5px solid var(--sep-mac)" }}>
                <td style={{ padding: "10px 16px", fontSize: "12px", fontFamily: "monospace", color: "var(--tx-tertiary)" }}>
                  TX-{1000 + i}-AUD
                </td>
                <td style={{ padding: "10px 16px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--tx-primary)" }}>
                     {m.type === "INGRESO" ? "Ingreso de producto cargado orgánicamente" : "Descarga de egreso emitida"}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--tx-secondary)" }}>Ref: {m.reference || "Sistema"}</div>
                </td>
                <td style={{ padding: "10px 16px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 500, background: "rgba(0,0,0,0.05)", padding: "2px 6px", borderRadius: "4px" }}>
                     Movimientos: DB_WRITE
                  </span>
                </td>
                <td style={{ padding: "10px 16px" }}>
                  <div style={{ fontSize: "13px", color: "var(--tx-primary)" }}>Admin_Log</div>
                  <div style={{ fontSize: "11px", color: "var(--tx-tertiary)" }}>192.168.0.x</div>
                </td>
                <td style={{ padding: "10px 16px", fontSize: "12px", color: "var(--tx-secondary)" }}>
                  {new Date(m.createdAt).toLocaleString("es-AR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
