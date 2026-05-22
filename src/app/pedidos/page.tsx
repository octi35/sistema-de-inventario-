"use client";

import { ShoppingCart, Plus, Search, Filter } from "lucide-react";

const mockPedidos = [
  { id: "PED-2024-001", proveedor: "TechPro S.A.",          estado: "Recibido",  items: 2, valor: 28000, expected: "2024-03-19", created: "2024-03-10" },
  { id: "PED-2024-002", proveedor: "Constructora Norte",    estado: "Enviado",   items: 2, valor: 330000, expected: "2024-04-04", created: "2024-03-25" },
  { id: "PED-2024-003", proveedor: "Insumos del Sur",       estado: "Pendiente", items: 1, valor: 57500, expected: "2024-03-31", created: "2024-03-29" },
];

function statusDot(status: string) {
    if (status === "Recibido") return "var(--sys-green)";
    if (status === "Enviado") return "var(--sys-blue)";
    return "var(--sys-orange)";
}

export default function PedidosPage() {
  return (
    <div className="anim-enter" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1 className="sf-title-lg">Pedidos a Proveedores</h1>
          <p style={{ fontSize: "13px", color: "var(--tx-secondary)", marginTop: "4px" }}>
            3 pedidos en seguimiento
          </p>
        </div>
        <button className="btn-mac btn-mac-primary">
          <Plus style={{ width: "14px", height: "14px" }} /> Solicitar Pedido
        </button>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <div style={{ position: "relative", width: "220px" }}>
            <Search style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", width: "13px", height: "13px", color: "var(--tx-tertiary)" }} />
            <input type="text" className="input-mac" placeholder="Buscar ID de pedido..." style={{ paddingLeft: "26px" }} />
        </div>
        <select className="input-mac" style={{ width: "140px" }} defaultValue="">
          <option value="">Todos los estados</option>
        </select>
      </div>

      {/* Table */}
      <div className="apple-list">
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid var(--sep-mac)" }}>
            <tr>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Nro. Pedido</th>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Proveedor</th>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Estado</th>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)", textAlign: "right" }}>Elementos</th>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)", textAlign: "right" }}>Valor Total</th>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Llegada</th>
              <th style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: "var(--tx-secondary)" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {mockPedidos.map((ped) => (
              <tr key={ped.id} className="hover:bg-[var(--control-bg)] transition-colors" style={{ borderBottom: "0.5px solid var(--sep-mac)" }}>
                <td style={{ padding: "12px 16px", fontSize: "12px", fontFamily: "monospace", color: "var(--tx-secondary)" }}>{ped.id}</td>
                <td style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 500, color: "var(--tx-primary)" }}>{ped.proveedor}</td>
                <td style={{ padding: "12px 16px" }}>
                   <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                       <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: statusDot(ped.estado) }} />
                       <span style={{ fontSize: "13px", color: "var(--tx-primary)" }}>{ped.estado}</span>
                   </div>
                </td>
                <td style={{ padding: "12px 16px", fontSize: "13px", color: "var(--tx-primary)", textAlign: "right" }}>{ped.items} u.</td>
                <td style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 500, color: "var(--tx-primary)", textAlign: "right" }}>
                  ${ped.valor.toLocaleString("es-AR")}
                </td>
                <td style={{ padding: "12px 16px", fontSize: "12px", color: "var(--tx-secondary)" }}>
                  {new Date(ped.expected).toLocaleDateString("es-AR", { day: '2-digit', month: 'short' })}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <button className="btn-mac btn-mac-secondary">Ver detalle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
