import type { Metadata } from "next";
import { Boxes, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description: "Acceso al Sistema de Inventario y Depósito StockPro",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-indigo/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md animate-slide-up relative z-10">
        {/* Card */}
        <div className="glass-card p-8 space-y-8">
          {/* Logo */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-indigo flex items-center justify-center mx-auto shadow-glow">
              <Boxes className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">StockPro</h1>
              <p className="text-sm text-slate-400 mt-1">Sistema de Inventario y Depósito</p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5" action="/">
            <div>
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="usuario@empresa.com"
                defaultValue="admin@inventario.com"
              />
            </div>
            <div>
              <label className="label" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="••••••••"
                defaultValue="password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20 bg-surface-700 accent-brand-500" />
                Recordarme
              </label>
              <a href="#" className="text-brand-400 hover:text-brand-300 transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="btn-primary w-full justify-center py-2.5 text-base"
            >
              <Lock className="w-4 h-4" />
              Iniciar Sesión
            </button>
          </form>

          <p className="text-center text-xs text-slate-600">
            Sistema interno — Solo acceso autorizado
          </p>
        </div>

        {/* Demo hint */}
        <div className="mt-4 px-4 py-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-center">
          <p className="text-xs text-brand-400">
            <span className="font-semibold">Demo:</span> admin@inventario.com / password
          </p>
        </div>
      </div>
    </div>
  );
}
