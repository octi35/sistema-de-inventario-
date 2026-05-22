import { z } from "zod";

// ─── PRODUCT ─────────────────────────────────
export const productSchema = z.object({
  code: z.string().min(1, "El código es requerido"),
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  unit: z.string().default("unidad"),
  minStock: z.number().int().min(0).default(5),
  maxStock: z.number().int().min(0).optional(),
  price: z.number().min(0).default(0),
  categoryId: z.string().optional(),
  supplierId: z.string().optional(),
});

// ─── MOVEMENT ────────────────────────────────
export const movementSchema = z.object({
  type: z.enum(["INGRESO", "EGRESO", "AJUSTE", "TRANSFERENCIA"]),
  quantity: z.number().int().min(1, "La cantidad debe ser mayor a 0"),
  productId: z.string().min(1, "El producto es requerido"),
  depositId: z.string().min(1, "El depósito es requerido"),
  userId: z.string().min(1, "El usuario es requerido"),
  reason: z.string().optional(),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

// ─── DEPOSIT ─────────────────────────────────
export const depositSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  location: z.string().optional(),
  capacity: z.number().int().min(0).optional(),
  description: z.string().optional(),
});

// ─── SUPPLIER ────────────────────────────────
export const supplierSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  cuit: z.string().optional(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  contact: z.string().optional(),
});

// ─── ORDER ───────────────────────────────────
export const orderSchema = z.object({
  supplierId: z.string().min(1, "El proveedor es requerido"),
  notes: z.string().optional(),
  expectedAt: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1),
        unitPrice: z.number().min(0).default(0),
      })
    )
    .min(1, "Debe tener al menos un item"),
});

// ─── USER ────────────────────────────────────
export const userSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(["ADMIN", "MANAGER", "OPERATOR"]).default("OPERATOR"),
});

// ─── ALERT ───────────────────────────────────
export const alertConfigSchema = z.object({
  productId: z.string().min(1),
  minStock: z.number().int().min(0),
});
