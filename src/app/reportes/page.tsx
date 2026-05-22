"use client";

import { Download, TrendingDown, ArrowLeftRight, Package, DollarSign, BarChart2 } from "lucide-react";
import { mockProducts, mockMovements } from "@/data/mock";

export default function ReportesPage() {
  const totalVal = mockProducts.reduce((a, p) => a + p.currentStock * p.price, 0);
  const totalIngresadas = mockMovements.filter(m => m.type === "INGRESO").reduce((a, m) => a + m.quantity, 0);
  const totalEgresadas = mockMovements.filter(m => m.type === "EGRESO").reduce((a, m) => a + m.quantity, 0);

  return (
    <div className="anim-enter" style={{ display: "flex", flexDirection: "column", gap: "32px", paddingBottom: "40px" }}>
      
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1 className="sf-title-lg">Reportes</h1>
          <p style={{ fontSize: "13px", color: "var(--tx-secondary)", marginTop: "4px" }}>Informes y estadísticas del inventario</p>
        </div>
        <button className="btn-mac btn-mac-secondary">
          <Download style={{ width: "14px", height: "14px" }} /> Exportar CSV
        </button>
      </div>

      {/* Data Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
           <DollarSign style={{ width: "20px", height: "20px", color: "var(--sys-green)", strokeWidth: 2.5 }} />
           <div className="sf-num" style={{ fontSize: "28px", color: "var(--sys-green)" }}>${totalVal.toLocaleString("es-AR")}</div>
           <div>
             <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--tx-tertiary)", textTransform: "uppercase" }}>Valorización Estática</span>
           </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
           <ArrowLeftRight style={{ width: "20px", height: "20px", color: "var(--tx-primary)", strokeWidth: 2.5 }} />
           <div className="sf-num" style={{ fontSize: "28px", color: "var(--tx-primary)" }}>{totalIngresadas}</div>
           <div>
             <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--tx-tertiary)", textTransform: "uppercase" }}>Unid. Ingresadas</span>
           </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
           <TrendingDown style={{ width: "20px", height: "20px", color: "var(--sys-red)", strokeWidth: 2.5 }} />
           <div className="sf-num" style={{ fontSize: "28px", color: "var(--sys-red)" }}>{totalEgresadas}</div>
           <div>
             <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--tx-tertiary)", textTransform: "uppercase" }}>Unid. Egresadas</span>
           </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
           <Package style={{ width: "20px", height: "20px", color: "var(--sys-purple)", strokeWidth: 2.5 }} />
           <div className="sf-num" style={{ fontSize: "28px", color: "var(--sys-purple)" }}>{mockProducts.length}</div>
           <div>
             <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--tx-tertiary)", textTransform: "uppercase" }}>Productos Activos</span>
           </div>
        </div>
      </div>

      {/* Stock por Producto Table */}
      <div>
         <h2 className="sf-title-md" style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
            <BarChart2 style={{ width: "16px", height: "16px", color: "var(--sys-blue)" }} /> Stock por Producto
         </h2>
         <div className="apple-list">
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid var(--sep-mac)" }}>
                <tr>
                  <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Código</th>
                  <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Producto</th>
                  <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)", textAlign: "right" }}>Valor Stock</th>
                  <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)", textAlign: "right" }}>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {mockProducts.map((p) => {
                   const v = p.currentStock * p.price;
                   const colorStock = p.currentStock === 0 ? "var(--sys-red)" : p.currentStock <= p.minStock ? "var(--sys-yellow)" : "var(--sys-green)";
                   
                   return (
                      <tr key={p.id} className="hover:bg-[var(--control-bg)] transition-colors" style={{ borderBottom: "0.5px solid var(--sep-mac)" }}>
                         <td style={{ padding: "10px 16px", fontSize: "12px", fontFamily: "monospace", color: "var(--tx-secondary)" }}>{p.code}</td>
                         <td style={{ padding: "10px 16px", fontSize: "13px", fontWeight: 500, color: "var(--sys-blue)" }}>{p.name}</td>
                         <td style={{ padding: "10px 16px", fontSize: "13px", color: "var(--tx-primary)", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                            ${v.toLocaleString("es-AR")}
                         </td>
                         <td style={{ padding: "10px 16px", textAlign: "right" }}>
                            <span style={{ fontSize: "15px", fontWeight: 600, color: colorStock, fontVariantNumeric: "tabular-nums" }}>
                               {p.currentStock}
                            </span>
                            <span style={{ fontSize: "12px", color: colorStock, marginLeft: "4px" }}>{p.unit}</span>
                         </td>
                      </tr>
                   )
                })}
              </tbody>
            </table>
         </div>
      </div>

      {/* Resumen de Movimientos */}
      <div>
         <h2 className="sf-title-md" style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
            <ArrowLeftRight style={{ width: "16px", height: "16px", color: "var(--tx-secondary)" }} /> Resumen de Movimientos
         </h2>
         <div className="apple-list">
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid var(--sep-mac)" }}>
                <tr>
                  <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Producto</th>
                  <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)", textAlign: "right" }}>Ingresos</th>
                  <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)", textAlign: "right" }}>Egresos</th>
                  <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)", textAlign: "right" }}>Ajustes</th>
                  <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)", textAlign: "right" }}>Valor</th>
                </tr>
              </thead>
              <tbody>
                {mockProducts.map((p) => {
                   const pMoves = mockMovements.filter(m => m.productId === p.id);
                   const i = pMoves.filter(m => m.type === "INGRESO").reduce((a,m)=>a+m.quantity, 0);
                   const e = pMoves.filter(m => m.type === "EGRESO").reduce((a,m)=>a+m.quantity, 0);
                   const aj = pMoves.filter(m => m.type === "AJUSTE").reduce((a,m)=>a+m.quantity, 0);
                   const v = p.currentStock * p.price;

                   return (
                      <tr key={`mov-${p.id}`} className="hover:bg-[var(--control-bg)] transition-colors" style={{ borderBottom: "0.5px solid var(--sep-mac)" }}>
                         <td style={{ padding: "10px 16px" }}>
                            <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--tx-primary)" }}>{p.name}</div>
                            <div style={{ fontSize: "11px", fontFamily: "monospace", color: "var(--tx-tertiary)" }}>{p.code}</div>
                         </td>
                         <td style={{ padding: "10px 16px", fontSize: "14px", fontWeight: 600, color: i > 0 ? "var(--sys-green)" : "var(--tx-tertiary)", textAlign: "right" }}>{i > 0 ? i : 0}</td>
                         <td style={{ padding: "10px 16px", fontSize: "14px", fontWeight: 600, color: e > 0 ? "var(--sys-red)" : "var(--tx-tertiary)", textAlign: "right" }}>{e > 0 ? e : 0}</td>
                         <td style={{ padding: "10px 16px", fontSize: "14px", fontWeight: 600, color: aj > 0 ? "var(--sys-blue)" : "var(--tx-tertiary)", textAlign: "right" }}>{aj > 0 ? aj : 0}</td>
                         <td style={{ padding: "10px 16px", fontSize: "13px", color: "var(--tx-tertiary)", textAlign: "right" }}>${v.toLocaleString("es-AR")}</td>
                      </tr>
                   )
                })}
              </tbody>
            </table>
         </div>
      </div>

    </div>
  );
}
