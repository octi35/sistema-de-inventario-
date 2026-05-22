"use client";

import {
  Package, TrendingDown, AlertTriangle, ShoppingCart,
  Bell, Warehouse, Truck, Activity,
  ArrowDownCircle, ArrowUpCircle, ArrowLeftRight, CheckCircle2,
  ChevronRight, ArrowRight,
} from "lucide-react";
import { mockDashboardStats, mockMovements, mockAlerts, mockProducts } from "@/data/mock";

/* ── Status Apple Colors ── */
const movCfg = {
  INGRESO:       { color: "var(--sys-green)",  sign: "+", Icon: ArrowDownCircle },
  EGRESO:        { color: "var(--sys-red)",    sign: "−", Icon: ArrowUpCircle },
  AJUSTE:        { color: "var(--sys-blue)",   sign: "~", Icon: ArrowLeftRight },
  TRANSFERENCIA: { color: "var(--sys-purple)", sign: "⇄", Icon: ArrowLeftRight },
} as const;

/* ── Widget Data Binding ── */
const metrics = [
  { label: "Productos",    key: "totalProducts",       icon: Package,       c: "var(--sys-blue)",   bg: "rgba(0,122,255,0.06)",   sub: "Catálogo activo" },
  { label: "Stock Bajo",   key: "lowStockProducts",    icon: TrendingDown,  c: "var(--sys-orange)", bg: "rgba(255,149,0,0.06)",  sub: "Requieren revisión" },
  { label: "Críticos",     key: "outOfStockProducts",  icon: AlertTriangle, c: "var(--sys-red)",    bg: "rgba(255,59,48,0.06)",   sub: "Sin stock" },
  { label: "Depósitos",    key: "totalDeposits",       icon: Warehouse,     c: "var(--sys-teal)",   bg: "rgba(90,200,250,0.06)",  sub: "Sucursales" },
  { label: "Pedidos",      key: "pendingOrders",       icon: ShoppingCart,  c: "var(--sys-purple)", bg: "rgba(175,82,222,0.06)", sub: "En tránsito" },
  { label: "Alertas",      key: "activeAlerts",        icon: Bell,          c: "var(--sys-red)",    bg: "rgba(255,59,48,0.06)",   sub: "Sin resolver" },
  { label: "Proveedores",  key: "totalSuppliers",      icon: Truck,         c: "var(--sys-green)",  bg: "rgba(52,199,89,0.06)",   sub: "Asociados" },
  { label: "Actividad",    key: "totalMovementsToday", icon: Activity,      c: "var(--sys-blue)",   bg: "rgba(0,122,255,0.06)",   sub: "Movimientos hoy" },
] as const;

export default function DashboardPage() {
  const s        = mockDashboardStats;
  const activeAl = mockAlerts.filter((a) => !a.resolved);
  const recent   = mockMovements.slice(0, 5);
  const totalVal = mockProducts.reduce((a, p) => a + p.currentStock * p.price, 0);

  return (
    <div className="anim-enter" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

      {/* ── Page Header (Clean Apple Title) ── */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1 className="sf-title-lg">Dashboard</h1>
          <p style={{ fontSize: "14px", color: "var(--tx-secondary)", marginTop: "4px" }}>
            Resumen general del sistema de StockPro
          </p>
        </div>

        {/* Total Value text instead of heavy card */}
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--tx-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Valor Total de Stock
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "2px" }}>
            <span style={{
              width: "28px", height: "28px", borderRadius: "8px",
              background: "rgba(52,199,89,0.1)", display: "flex",
              alignItems: "center", justifyContent: "center", color: "var(--sys-green)",
            }}>
              <Package style={{ width: "16px", height: "16px", strokeWidth: 2.5 }} />
            </span>
            <span className="sf-num" style={{ color: "var(--tx-primary)", fontSize: "32px", letterSpacing: "-0.04em" }}>
              ${totalVal.toLocaleString("es-AR")}
            </span>
          </div>
        </div>
      </div>

      {/* ── Dynamic Widgets (4x2 Grid) ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {metrics.map((m) => {
          const Icon = m.icon;
          const val = s[m.key as keyof typeof s] as number;
          return (
            <div key={m.label} className="widget widget-interactive" style={{
              padding: "20px 24px",
              display: "flex", flexDirection: "column",
              background: m.bg, /* Fondo pastel ultraclaro */
              borderColor: m.bg, /* Borde que se mezcla con el tinte */
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <Icon style={{ width: "20px", height: "20px", color: m.c, opacity: 0.9, strokeWidth: 2 }} />
                <ChevronRight style={{ width: "14px", height: "14px", color: "var(--tx-tertiary)" }} />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                {/* Number uses the accent color */}
                <span className="sf-num" style={{ color: m.c, fontSize: "40px", letterSpacing: "-0.05em" }}>
                  {val}
                </span>
                <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--tx-primary)", marginTop: "2px", letterSpacing: "-0.02em" }}>
                  {m.label}
                </span>
                <span style={{ fontSize: "12px", color: "var(--tx-secondary)", marginTop: "2px" }}>
                  {m.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── System Lists (macOS Settings style) ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>

        {/* Últimos Movimientos */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", padding: "0 4px" }}>
            <h2 className="sf-title-md" style={{ fontSize: "18px" }}>Movimientos Recientes</h2>
            <a href="/movimientos" style={{ fontSize: "13px", color: "var(--sys-blue)", fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: "2px" }}>
              Ver todos <ChevronRight style={{ width: "12px", height: "12px" }} />
            </a>
          </div>
          
          <div className="apple-list">
            {recent.map((m) => {
              const cfg = movCfg[m.type];
              const MinIco = cfg.Icon;
              return (
                <div key={m.id} className="apple-list-row transition-colors hover:bg-[var(--control-bg)] cursor-pointer">
                  {/* Clean minimal icon */}
                  <MinIco style={{ width: "18px", height: "18px", color: cfg.color, strokeWidth: 2.5, flexShrink: 0, marginRight: "16px" }} />
                  
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "15px", fontWeight: 500, color: "var(--tx-primary)", letterSpacing: "-0.01em" }}>{m.product.name}</span>
                    <span style={{ fontSize: "12px", color: "var(--tx-secondary)" }}>{m.deposit.name}</span>
                  </div>
                  
                  <div style={{ textAlign: "right", marginLeft: "10px" }}>
                    <span style={{ fontSize: "15px", fontWeight: 600, color: cfg.color, fontVariantNumeric: "tabular-nums" }}>
                      {cfg.sign}{m.quantity}
                    </span>
                    <div style={{ fontSize: "11px", color: "var(--tx-tertiary)", marginTop: "2px" }}>
                      {new Date(m.createdAt).toLocaleDateString("es-AR", { day: "2-digit", month: "short" })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alertas Críticas */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", padding: "0 4px" }}>
            <h2 className="sf-title-md" style={{ fontSize: "18px", display: "flex", alignItems: "center", gap: "6px" }}>
              Alertas del Sistema
              {activeAl.length > 0 && (
                <span style={{ background: "var(--sys-red)", color: "white", padding: "2px 6px", borderRadius: "10px", fontSize: "11px", fontWeight: 700 }}>
                  {activeAl.length}
                </span>
              )}
            </h2>
            <a href="/alertas" style={{ fontSize: "13px", color: "var(--sys-blue)", fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: "2px" }}>
               Ir a alertas <ArrowRight style={{ width: "12px", height: "12px" }} />
            </a>
          </div>

          <div className="apple-list">
            {activeAl.length === 0 ? (
               <div style={{ padding: "32px", textAlign: "center", color: "var(--tx-tertiary)" }}>
                 <CheckCircle2 style={{ width: "32px", height: "32px", margin: "0 auto 8px", color: "var(--sys-green)", strokeWidth: 1.5 }} />
                 <p style={{ fontSize: "14px" }}>Todos los sistemas en orden</p>
               </div>
            ) : (
              activeAl.map((al) => {
                const color = al.type === "OUT_OF_STOCK" ? "var(--sys-red)" : al.type === "LOW_STOCK" ? "var(--sys-orange)" : "var(--sys-blue)";
                return (
                  <div key={al.id} className="apple-list-row">
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0, marginRight: "16px", marginTop: "2px" }} />
                    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontSize: "15px", color: "var(--tx-primary)", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                        {al.message}
                      </span>
                      {al.product && (
                        <span style={{ fontSize: "11px", color: "var(--tx-secondary)", fontFamily: "monospace" }}>
                          Ref: {al.product.code}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: "11px", color: "var(--tx-tertiary)", whiteSpace: "nowrap", alignSelf: "flex-start", marginTop: "2px" }}>
                      Hace 2h
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
