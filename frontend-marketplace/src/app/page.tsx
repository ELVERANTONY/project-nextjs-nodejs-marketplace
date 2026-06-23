"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import type { Product, Category } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  ShoppingBag,
  Shield,
  Truck,
  LayoutDashboard,
  Package,
  Tags,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          api.products.getAll(),
          api.categories.getAll(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch {
        setError("Error al cargar productos. Intenta de nuevo.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.nombre
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-900/30">
            <ShoppingBag className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-white">Algo salió mal</h2>
          <p className="mt-2 text-zinc-400">{error}</p>
          <Button variant="primary" className="mt-6" onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isAuthenticated ? (
        <>
          <section className="relative overflow-hidden pb-16 pt-24">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
              <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-pink-600/10 blur-[100px]" />
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mx-auto max-w-4xl text-center"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                  Experiencia Premium de Marketplace
                </div>
                <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Descubre{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">
                    Productos Premium
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                  Selección curada de los mejores productos. Desde electrónica de
                  vanguardia hasta moda atemporal, encuentra todo lo que necesitas
                  en un solo lugar.
                </p>
                <div className="mt-10 flex items-center justify-center gap-4">
                  <Link href="/register">
                    <Button variant="primary" size="lg">
                      Explorar Ahora
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg">
                      Iniciar Sesión
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                { icon: ShoppingBag, title: "Calidad Premium", desc: "Productos seleccionados de las mejores marcas del mundo" },
                { icon: Shield, title: "Compra Segura", desc: "Tus datos protegidos con encriptación de nivel empresarial" },
                { icon: Truck, title: "Envío Rápido", desc: "Envío gratis en todos los pedidos superiores a $50" },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 ring-1 ring-purple-500/20 transition-all duration-300 group-hover:ring-purple-500/40">
                    <feature.icon className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="relative overflow-hidden pb-8 pt-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 right-20 h-[300px] w-[300px] rounded-full bg-purple-600/8 blur-[100px]" />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">
                  Bienvenido de nuevo, {user?.name?.split(" ")[0] || "usuario"}
                </h1>
                <p className="text-zinc-400">
                  {products.length} productos en {categories.length} categorías
                </p>
              </div>

              {isAdmin && (
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <Link href="/admin" className="group">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all duration-300 hover:border-purple-700/50 hover:bg-zinc-900">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 ring-1 ring-purple-500/20">
                            <LayoutDashboard className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">Panel Admin</p>
                            <p className="text-xs text-zinc-500">Gestionar productos</p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-zinc-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-purple-400" />
                      </div>
                    </div>
                  </Link>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 ring-1 ring-blue-500/20">
                        <Package className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{products.length} Productos</p>
                        <p className="text-xs text-zinc-500">En catálogo</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/20 ring-1 ring-emerald-500/20">
                        <Tags className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{categories.length} Categorías</p>
                        <p className="text-xs text-zinc-500">Para organizar</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-white">
              {isAuthenticated ? "Explorar Productos" : "Productos Destacados"}
            </h2>
            <p className="mt-1 text-zinc-400">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} disponible{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:w-64"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
              !selectedCategory
                ? "bg-white text-zinc-900"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-white text-zinc-900"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            title="No hay productos que coincidan"
            description="Intenta con otro término de búsqueda o categoría."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
