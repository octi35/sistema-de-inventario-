"use client";

import { MapPin, Plus, Package, Edit2 } from "lucide-react";
import { mockDeposits } from "@/data/mock";

export default function DepositosPage() {
  return (
    <div className="anim-enter" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1 className="sf-title-lg">Depósitos</h1>
          <p style={{ fontSize: "13px", color: "var(--tx-secondary)", marginTop: "4px" }}>
            {mockDeposits.length} sucursales físicas registradas
          </p>
        </div>
        <button className="btn-mac btn-mac-primary">
          <Plus style={{ width: "14px", height: "14px" }} /> Nuevo Depósito
        </button>
      </div>

      {/* Grid de Depósitos estilo Tarjetas Mac */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
        {mockDeposits.map((dep) => (
          <div key={dep.id} className="widget" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--tx-primary)", letterSpacing: "-0.01em" }}>{dep.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                  <MapPin style={{ width: "12px", height: "12px", color: "var(--tx-tertiary)" }} />
                  <span style={{ fontSize: "12px", color: "var(--tx-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {dep.location}
                  </span>
                </div>
              </div>
              <div style={{ padding: "4px 8px", background: "rgba(40,200,64,0.1)", borderRadius: "6px", color: "var(--sys-green)", fontSize: "11px", fontWeight: 600 }}>
                Activo
              </div>
            </div>

            <div style={{ height: "1px", background: "var(--sep-mac)" }} />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--tx-tertiary)", textTransform: "uppercase" }}>Capacidad</p>
                <p className="sf-num" style={{ fontSize: "20px", color: "var(--sys-blue)", marginTop: "2px" }}>
                  {dep.capacity.toLocaleString("es-AR")}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--tx-tertiary)", textTransform: "uppercase" }}>Uso Estimado</p>
                <p className="sf-num" style={{ fontSize: "20px", color: "var(--tx-primary)", marginTop: "2px" }}>
                  ~45%
                </p>
              </div>
            </div>

            <div style={{ background: "rgba(0,0,0,0.03)", borderRadius: "8px", padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
               <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Package style={{ width: "14px", height: "14px", color: "var(--tx-secondary)" }} />
                  <span style={{ fontSize: "12px", color: "var(--tx-secondary)", fontWeight: 500 }}>Ver inventario</span>
               </div>
               <button className="btn-mac btn-mac-secondary">
                  <Edit2 style={{ width: "12px", height: "12px" }} />
               </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
