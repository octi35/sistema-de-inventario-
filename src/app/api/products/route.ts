import { NextResponse } from "next/server";
import { mockProducts } from "@/data/mock";
// import { prisma } from "@/lib/prisma";          // Descomentar cuando SQL Server esté configurado
// import { productSchema } from "@/lib/validations";

// GET /api/products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page     = parseInt(searchParams.get("page")     ?? "1");
    const pageSize = parseInt(searchParams.get("pageSize") ?? "20");
    const status   = searchParams.get("status");
    const category = searchParams.get("category");

    // ─── Mock datos (reemplazar por Prisma cuando haya DB) ───
    let products = [...mockProducts];

    if (status === "low") {
      products = products.filter(
        (p) => p.currentStock > 0 && p.currentStock <= p.minStock
      );
    } else if (status === "out") {
      products = products.filter((p) => p.currentStock === 0);
    }

    if (category) {
      products = products.filter((p) => p.category?.id === category);
    }

    const total      = products.length;
    const totalPages = Math.ceil(total / pageSize);
    const data       = products.slice((page - 1) * pageSize, page * pageSize);

    return NextResponse.json({ data, total, page, pageSize, totalPages });
  } catch (error) {
    console.error("[GET /api/products]", error);
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}

// POST /api/products
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar con Zod
    // const parsed = productSchema.safeParse(body);
    // if (!parsed.success) {
    //   return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    // }

    // Con Prisma:
    // const product = await prisma.product.create({ data: parsed.data });

    // Mock response:
    const newProduct = {
      id:           `p-${Date.now()}`,
      ...body,
      currentStock: 0,
      active:       true,
      createdAt:    new Date().toISOString(),
      updatedAt:    new Date().toISOString(),
    };

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("[POST /api/products]", error);
    return NextResponse.json({ error: "Error al crear producto" }, { status: 500 });
  }
}
