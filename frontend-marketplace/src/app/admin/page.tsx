"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { motion } from "framer-motion";
import type { Product, Category } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Tags,
  Pencil,
  Trash2,
  Search,
  PackageSearch,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { isAuthenticated, isAdmin, token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"products" | "categories">("products");
  const [searchQuery, setSearchQuery] = useState("");

  const [productForm, setProductForm] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imageUrl: "",
    categoryId: "",
  });
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [isProductSubmitting, setIsProductSubmitting] = useState(false);

  const [categoryForm, setCategoryForm] = useState({ name: "", description: "" });
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [isCategorySubmitting, setIsCategorySubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, isAdmin, router]);

  useEffect(() => {
    if (isAdmin && token) {
      fetchData();
    }
  }, [isAdmin, token]);

  const fetchData = async () => {
    setIsDataLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        api.products.getAll(),
        api.categories.getAll(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch {
      showToast("error", "Error al cargar datos");
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      showToast("error", "Debes iniciar sesión como admin");
      return;
    }
    setIsProductSubmitting(true);

    try {
      const payload = {
        nombre: productForm.nombre,
        precio: parseFloat(productForm.precio),
        descripcion: productForm.descripcion,
        imageUrl: productForm.imageUrl || undefined,
        categoryId: productForm.categoryId ? parseInt(productForm.categoryId) : undefined,
      };

      if (editingProductId) {
        await api.products.update(editingProductId, payload, token);
        showToast("success", "Producto actualizado correctamente");
      } else {
        await api.products.create(payload as any, token);
        showToast("success", "Producto creado correctamente");
      }

      resetProductForm();
      fetchData();
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Operación fallida");
    } finally {
      setIsProductSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!token) return;
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await api.products.delete(id, token);
      showToast("success", "Producto eliminado correctamente");
      fetchData();
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Error al eliminar");
    }
  };

  const handleEditProduct = (product: Product) => {
    setProductForm({
      nombre: product.nombre,
      precio: product.precio.toString(),
      descripcion: product.descripcion || "",
      imageUrl: product.imageUrl || "",
      categoryId: product.categoryId?.toString() || "",
    });
    setEditingProductId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetProductForm = () => {
    setProductForm({ nombre: "", precio: "", descripcion: "", imageUrl: "", categoryId: "" });
    setEditingProductId(null);
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      showToast("error", "Debes iniciar sesión como admin");
      return;
    }
    setIsCategorySubmitting(true);

    try {
      if (editingCategoryId) {
        await api.categories.update(editingCategoryId, categoryForm, token);
        showToast("success", "Categoría actualizada correctamente");
      } else {
        await api.categories.create(categoryForm, token);
        showToast("success", "Categoría creada correctamente");
      }

      setCategoryForm({ name: "", description: "" });
      setEditingCategoryId(null);
      fetchData();
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Operación fallida");
    } finally {
      setIsCategorySubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!token) return;
    if (!confirm("¿Estás seguro? Los productos en esta categoría pueden impedir la eliminación.")) return;

    try {
      await api.categories.delete(id, token);
      showToast("success", "Categoría eliminada correctamente");
      fetchData();
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Error al eliminar");
    }
  };

  const handleEditCategory = (category: Category) => {
    setCategoryForm({
      name: category.name,
      description: category.description || "",
    });
    setEditingCategoryId(category.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = products.filter((p) =>
    p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-white" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Panel de Administración</h1>
              <p className="mt-1 text-zinc-400">
                Gestiona tus productos y categorías
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 flex gap-2">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "products"
                ? "bg-white text-zinc-900"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            <Package className="h-4 w-4" />
            Productos ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "categories"
                ? "bg-white text-zinc-900"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            <Tags className="h-4 w-4" />
            Categorías ({categories.length})
          </button>
        </div>

        {activeTab === "products" ? (
          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-1 h-fit" glow>
              <CardHeader>
                <h2 className="text-lg font-semibold text-white">
                  {editingProductId ? "Editar Producto" : "Agregar Producto"}
                </h2>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <Input
                    label="Nombre"
                    value={productForm.nombre}
                    onChange={(e) => setProductForm({ ...productForm, nombre: e.target.value })}
                    required
                  />
                  <Input
                    label="Precio"
                    type="number"
                    step="0.01"
                    value={productForm.precio}
                    onChange={(e) => setProductForm({ ...productForm, precio: e.target.value })}
                    required
                  />
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-zinc-300">
                      Descripción
                    </label>
                    <textarea
                      value={productForm.descripcion}
                      onChange={(e) =>
                        setProductForm({ ...productForm, descripcion: e.target.value })
                      }
                      rows={3}
                      className="block w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/20"
                    />
                  </div>
                  <Input
                    label="URL de Imagen"
                    value={productForm.imageUrl}
                    onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                    placeholder="https://..."
                  />
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-zinc-300">
                      Categoría
                    </label>
                    <select
                      value={productForm.categoryId}
                      onChange={(e) =>
                        setProductForm({ ...productForm, categoryId: e.target.value })
                      }
                      className="block w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white transition-colors focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/20"
                    >
                      <option value="">Sin categoría</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" variant="primary" isLoading={isProductSubmitting}>
                      {editingProductId ? "Actualizar" : "Crear"}
                    </Button>
                    {editingProductId && (
                      <Button type="button" variant="ghost" onClick={resetProductForm}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10"
                />
              </div>

              {isDataLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <PackageSearch className="mb-4 h-12 w-12 text-zinc-600" />
                  <h3 className="text-lg font-semibold text-white">Sin productos</h3>
                  <p className="mt-2 text-sm text-zinc-500">
                    {searchQuery ? "Intenta con otra búsqueda." : "Agrega tu primer producto."}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="flex items-center gap-4 p-4" hover>
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-800">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.nombre}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Package className="h-6 w-6 text-zinc-500" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-white truncate">
                          {product.nombre}
                        </h3>
                        <p className="text-sm text-zinc-400">
                          {product.category?.name || "Sin categoría"} &middot;{" "}
                          {formatPrice(Number(product.precio))}
                        </p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-1 h-fit" glow>
              <CardHeader>
                <h2 className="text-lg font-semibold text-white">
                  {editingCategoryId ? "Editar Categoría" : "Agregar Categoría"}
                </h2>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCategorySubmit} className="space-y-4">
                  <Input
                    label="Nombre"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    required
                  />
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-zinc-300">
                      Descripción
                    </label>
                    <textarea
                      value={categoryForm.description}
                      onChange={(e) =>
                        setCategoryForm({ ...categoryForm, description: e.target.value })
                      }
                      rows={3}
                      className="block w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/20"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" variant="primary" isLoading={isCategorySubmitting}>
                      {editingCategoryId ? "Actualizar" : "Crear"}
                    </Button>
                    {editingCategoryId && (
                      <Button type="button" variant="ghost" onClick={() => {
                        setCategoryForm({ name: "", description: "" });
                        setEditingCategoryId(null);
                      }}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-3">
              {isDataLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Tags className="mb-4 h-12 w-12 text-zinc-600" />
                  <h3 className="text-lg font-semibold text-white">Sin categorías</h3>
                  <p className="mt-2 text-sm text-zinc-500">
                    Crea tu primera categoría para organizar productos.
                  </p>
                </div>
              ) : (
                categories.map((category) => (
                  <Card key={category.id} className="flex items-center justify-between p-4" hover>
                    <div>
                      <h3 className="font-medium text-white">{category.name}</h3>
                      <p className="mt-0.5 text-sm text-zinc-400">
                        {category.description || "Sin descripción"}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
