// ─────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────

export type Role = "ADMIN" | "MANAGER" | "OPERATOR";

export type MovementType = "INGRESO" | "EGRESO" | "AJUSTE" | "TRANSFERENCIA";

export type OrderStatus =
  | "PENDING"
  | "APPROVED"
  | "SENT"
  | "RECEIVED"
  | "CANCELLED";

export type AlertType =
  | "LOW_STOCK"
  | "OUT_OF_STOCK"
  | "EXPIRY"
  | "ORDER_DELAY"
  | "SYSTEM";

// ─────────────────────────────────────────────
// MAIN ENTITIES
// ─────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  unit: string;
  currentStock: number;
  minStock: number;
  maxStock?: number;
  price: number;
  active: boolean;
  category?: Category;
  supplier?: Supplier;
  createdAt: string;
  updatedAt: string;
}

export interface Deposit {
  id: string;
  name: string;
  location?: string;
  capacity?: number;
  description?: string;
  active: boolean;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  cuit?: string;
  email?: string;
  phone?: string;
  address?: string;
  contact?: string;
  active: boolean;
  createdAt: string;
}

export interface StockMovement {
  id: string;
  type: MovementType;
  quantity: number;
  reason?: string;
  reference?: string;
  notes?: string;
  createdAt: string;
  product: Product;
  deposit: Deposit;
  user: User;
}

export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  product: Product;
}

export interface Order {
  id: string;
  number: string;
  status: OrderStatus;
  notes?: string;
  expectedAt?: string;
  receivedAt?: string;
  createdAt: string;
  supplier: Supplier;
  items: OrderItem[];
}

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  resolved: boolean;
  createdAt: string;
  resolvedAt?: string;
  product?: Product;
}

export interface AuditLog {
  id: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  ipAddress?: string;
  createdAt: string;
  user: User;
}

// ─────────────────────────────────────────────
// PAGINATION
// ─────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─────────────────────────────────────────────
// DASHBOARD STATS
// ─────────────────────────────────────────────

export interface DashboardStats {
  totalProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalMovementsToday: number;
  pendingOrders: number;
  activeAlerts: number;
  totalDeposits: number;
  totalSuppliers: number;
}
