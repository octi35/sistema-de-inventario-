"use client";

import { ArrowDownCircle, ArrowLeftRight, ArrowUpCircle, Download, Plus, Search, SlidersHorizontal, ArrowDownUp } from "lucide-react";
import { mockMovements } from "@/data/mock";

const statusConfig = {
  INGRESO:       { color: "var(--sys-green)",  bg: "rgba(40,200,64,0.1)",   label: "Ingreso",       Icon: ArrowDownCircle },
  EGRESO:        { color: "var(--sys-red)",    bg: "rgba(255,59,48,0.1)",   label: "Egreso",        Icon: ArrowUpCircle },
  AJUSTE:        { color: "var(--sys-blue)",   bg: "rgba(0,122,255,0.1)",   label: "Ajuste",        Icon: ArrowDownUp },
  TRANSFERENCIA: { color: "var(--sys-purple)", bg: "rgba(175,82,222,0.1)",  label: "Transferencia", Icon: ArrowLeftRight },
} as const;

export default function MovimientosPage() {
  const incomes = mockMovements.filter(m => m.type === "INGRESO").length;
  const outcomes = mockMovements.filter(m => m.type === "EGRESO").length;

  return (
    <div className="anim-enter" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--tx-tertiary)", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: "4px" }}>
            Inventario
          </p>
          <h1 className="sf-title-lg">Movimientos de Stock</h1>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn-mac btn-mac-secondary">
             <Download style={{ width: "14px", height: "14px" }} /> Exportar
          </button>
          <button className="btn-mac btn-mac-primary">
            <Plus style={{ width: "14px", height: "14px" }} /> Nuevo Movimiento
          </button>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <div style={{ position: "relative", width: "220px" }}>
            <Search style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", width: "13px", height: "13px", color: "var(--tx-tertiary)" }} />
            <input type="text" className="input-mac" placeholder="Buscar producto o ref..." style={{ paddingLeft: "26px" }} />
        </div>
        <select className="input-mac" style={{ width: "140px" }} defaultValue="">
          <option value="">Todos los tipos</option>
          <option value="INGRESO">Ingresos</option>
          <option value="EGRESO">Egresos</option>
        </select>
        <button className="btn-mac btn-mac-secondary">
           <SlidersHorizontal style={{ width: "14px", height: "14px", color: "var(--sys-blue)" }} /> Filtros
        </button>
      </div>

      {/* Metrics Widgets */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {Object.entries(statusConfig).map(([key, cfg]) => {
          const count = mockMovements.filter(m => m.type === key).length;
          return (
            <div key={key} className="widget" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px" }}>
               <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: cfg.bg, color: cfg.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                 <cfg.Icon style={{ width: "18px", height: "18px", strokeWidth: 2.5 }} />
               </div>
               <div>
                  <div className="sf-num" style={{ fontSize: "28px", color: cfg.color }}>{count}</div>
                  <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--tx-secondary)" }}>{cfg.label}s</div>
               </div>
            </div>
          )
        })}
      </div>

      {/* Table */}
      <div className="apple-list">
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid var(--sep-mac)" }}>
            <tr>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Tipo</th>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Producto</th>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)", textAlign: "right" }}>Cantidad</th>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Depósito</th>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Referencia</th>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {mockMovements.map((m) => {
              const cfg = statusConfig[m.type];
              return (
                <tr key={m.id} className="hover:bg-[var(--control-bg)] transition-colors" style={{ borderBottom: "0.5px solid var(--sep-mac)" }}>
                  <td style={{ padding: "10px 16px" }}>
                    <span className="badge-apple" style={{ background: cfg.bg, color: cfg.color, border: `0.5px solid ${cfg.color}30` }}>
                      {cfg.label}
                    </span>
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <div style={{ fontWeight: 500, color: "var(--tx-primary)", fontSize: "13px" }}>{m.product.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--tx-tertiary)", fontFamily: "monospace" }}>{m.product.code}</div>
                  </td>
                  <td style={{ padding: "10px 16px", textAlign: "right" }}>
                    <span style={{ fontSize: "15px", fontWeight: 600, color: cfg.color, fontVariantNumeric: "tabular-nums" }}>
                      {m.type === "EGRESO" ? "-" : "+"}{m.quantity}
                    </span>
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: "12px", color: "var(--tx-secondary)" }}>{m.deposit.name}</td>
                  <td style={{ padding: "10px 16px", fontSize: "12px", color: "var(--tx-secondary)" }}>{m.reference || "—"}</td>
                  <td style={{ padding: "10px 16px", fontSize: "12px", color: "var(--tx-secondary)" }}>
                    {new Date(m.createdAt).toLocaleString("es-AR", { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
