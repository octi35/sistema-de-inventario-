import type { Metadata } from "next";
import { Package, Plus, Search, SlidersHorizontal } from "lucide-react";
import { mockProducts } from "@/data/mock";

export const metadata: Metadata = { title: "Productos | StockPro" };

function stockColor(p: { currentStock: number; minStock: number }): string {
  if (p.currentStock === 0) return "var(--sys-red)";
  if (p.currentStock <= p.minStock) return "var(--sys-yellow)"; /* Amarillento de Mac */
  return "var(--sys-green)";
}

function StatusBadge(p: { currentStock: number; minStock: number }) {
  if (p.currentStock === 0) return <span className="badge-apple" style={{ background: "rgba(255,59,48,0.1)", color: "#FF3B30", border: "0.5px solid rgba(255,59,48,0.2)" }}>Sin stock</span>;
  if (p.currentStock <= p.minStock) return <span className="badge-apple" style={{ background: "rgba(255,149,0,0.1)", color: "#FF9500", border: "0.5px solid rgba(255,149,0,0.2)" }}>Stock bajo</span>;
  return <span className="badge-apple" style={{ background: "rgba(40,200,64,0.1)", color: "#28C840", border: "0.5px solid rgba(40,200,64,0.2)" }}>OK</span>;
}

export default function ProductosPage() {
  return (
    <div className="anim-enter" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Header Estilo Mac */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1 className="sf-title-lg">Productos</h1>
        </div>
        <button className="btn-mac btn-mac-primary" style={{ height: "28px" }}>
          <Plus style={{ width: "14px", height: "14px" }} />
          Nuevo Producto
        </button>
      </div>

      {/* Control bar */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button className="btn-mac btn-mac-secondary" style={{ height: "26px" }}>
           <SlidersHorizontal style={{ width: "14px", height: "14px", color: "var(--sys-blue)" }} />
           <span>Filtrar</span>
        </button>
        <span style={{ fontSize: "12px", color: "var(--tx-tertiary)", marginLeft: "4px" }}>
          {mockProducts.length} ítems en catálogo
        </span>
      </div>

      {/* Table - macOS Settings Style */}
      <div className="apple-list">
        <table className="data-table" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "#FAFAFA", borderBottom: "1px solid var(--sep-mac)" }}>
            <tr>
              <th style={{ padding: "8px 14px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Código</th>
              <th style={{ padding: "8px 14px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Nombre</th>
              <th style={{ padding: "8px 14px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Categoría</th>
              <th style={{ padding: "8px 14px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Stock</th>
              <th style={{ padding: "8px 14px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Mínimo</th>
              <th style={{ padding: "8px 14px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Precio</th>
              <th style={{ padding: "8px 14px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((p) => (
              <tr key={p.id} className="hover:bg-[var(--control-bg)] transition-colors" style={{ borderBottom: "0.5px solid var(--sep-mac)" }}>
                <td style={{ padding: "12px 14px" }}>
                  <span style={{ fontSize: "11px", color: "var(--tx-secondary)", fontFamily: "monospace" }}>{p.code}</span>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <p style={{ fontWeight: 500, color: "var(--tx-primary)", fontSize: "13px", letterSpacing: "-0.01em" }}>{p.name}</p>
                </td>
                <td style={{ padding: "12px 14px", fontSize: "12px", color: "var(--tx-secondary)" }}>{p.category?.name ?? "—"}</td>
                <td style={{ padding: "12px 14px" }}>
                  <span style={{ fontSize: "16px", fontWeight: 600, color: stockColor(p), fontVariantNumeric: "tabular-nums" }}>
                    {p.currentStock}
                  </span>
                </td>
                <td style={{ padding: "12px 14px", fontSize: "12px", color: "var(--tx-secondary)" }}>{p.minStock}</td>
                <td style={{ padding: "12px 14px", fontSize: "13px", color: "var(--tx-primary)", fontWeight: 500 }}>
                  ${p.price.toLocaleString("es-AR")}
                </td>
                <td style={{ padding: "12px 14px" }}>{StatusBadge(p)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
