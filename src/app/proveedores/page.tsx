"use client";

import { Mail, MapPin, Phone, Plus, Building2, ChevronRight } from "lucide-react";
import { mockSuppliers } from "@/data/mock";

export default function ProveedoresPage() {
  return (
    <div className="anim-enter" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
           <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--tx-tertiary)", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: "4px" }}>
            Compras
          </p>
          <h1 className="sf-title-lg">Proveedores</h1>
        </div>
        <button className="btn-mac btn-mac-primary">
          <Plus style={{ width: "14px", height: "14px" }} /> Nuevo Proveedor
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
        {mockSuppliers.map((sup) => (
          <div key={sup.id} className="widget" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px", cursor: "pointer" }}>
            
            {/* Header / Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
               <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(0,122,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sys-blue)" }}>
                 <Building2 style={{ width: "24px", height: "24px", strokeWidth: 1.5 }} />
               </div>
               <div style={{ flex: 1 }}>
                 <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--tx-primary)", letterSpacing: "-0.01em" }}>{sup.name}</h3>
                 <p style={{ fontSize: "12px", color: "var(--tx-tertiary)", fontFamily: "monospace", marginTop: "2px" }}>CUIT {sup.documentNumber}</p>
               </div>
               <ChevronRight style={{ width: "16px", height: "16px", color: "var(--tx-tertiary)" }} />
            </div>

            <div style={{ height: "1px", background: "var(--sep-mac)" }} />

            {/* Contact Info (mac style list) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
               <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                 <Mail style={{ width: "14px", height: "14px", color: "var(--tx-secondary)" }} />
                 <span style={{ fontSize: "13px", color: "var(--sys-blue)" }}>{sup.email}</span>
               </div>
               <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                 <Phone style={{ width: "14px", height: "14px", color: "var(--tx-secondary)" }} />
                 <span style={{ fontSize: "13px", color: "var(--tx-primary)" }}>{sup.phone}</span>
               </div>
               <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                 <MapPin style={{ width: "14px", height: "14px", color: "var(--tx-secondary)", marginTop: "2px" }} />
                 <span style={{ fontSize: "13px", color: "var(--tx-primary)", flex: 1 }}>{sup.address}</span>
               </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
