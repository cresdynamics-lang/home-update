"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { categoryLabels } from "@/data/products";
import { colourHex } from "@/lib/site";
import type { SaleRecord, SaleStatus } from "@/lib/sales-store";
import { productPath } from "@/lib/seo";

type CategoryFilter = "all" | Product["category"];
type AdminView = "overview" | "sales" | "products";

function leadTimeText(product: Product) {
  if (!product.leadTimeDays) return "";
  if (typeof product.leadTimeDays === "string") return product.leadTimeDays;
  return `${product.leadTimeDays.min}-${product.leadTimeDays.max}`;
}

function parseLeadTime(value: string): Product["leadTimeDays"] {
  const clean = value.trim().toLowerCase();
  if (!clean) return null;
  if (clean === "made to order") return clean;
  const match = clean.match(/^(\d+)\s*[-–]\s*(\d+)$/);
  if (!match) return null;
  return { min: Number(match[1]), max: Number(match[2]) };
}

function splitList(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

export function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [view, setView] = useState<AdminView>("overview");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [editing, setEditing] = useState<Product | null>(null);
  const [newCategory, setNewCategory] = useState<Product["category"]>("dining");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadProducts() {
    const response = await fetch("/api/admin/products/", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load products. Please sign in again.");
    setProducts((await response.json()) as Product[]);
  }

  async function loadSales() {
    const response = await fetch("/api/admin/sales/", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load sales records. Please sign in again.");
    setSales((await response.json()) as SaleRecord[]);
  }

  useEffect(() => {
    let active = true;
    fetch("/api/admin/session/", { cache: "no-store" })
      .then(async (response) => response.json() as Promise<{ authenticated: boolean; configured: boolean }>)
      .then(async (session) => {
        if (!active) return;
        setConfigured(session.configured);
        if (session.authenticated) {
          setAuthenticated(true);
          await Promise.all([loadProducts(), loadSales()]);
        }
      })
      .catch(() => setNotice("Could not check the admin session."))
      .finally(() => active && setReady(true));
    return () => { active = false; };
  }, []);

  const visibleProducts = useMemo(() => products.filter((product) => {
    const query = search.trim().toLowerCase();
    return (category === "all" || product.category === category)
      && (!query || `${product.name} ${product.subtype} ${product.slug}`.toLowerCase().includes(query));
  }), [products, category, search]);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch("/api/admin/session/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Sign in failed.");
      setAuthenticated(true);
      setPassword("");
      await Promise.all([loadProducts(), loadSales()]);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Sign in failed.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/session/", { method: "DELETE" });
    setAuthenticated(false);
    setProducts([]);
    setSales([]);
    setNotice("");
  }

  async function save(product: Product): Promise<string | null> {
    setBusy(true);
    setNotice("");
    try {
      const isNew = product.id.startsWith("draft-");
      const response = await fetch("/api/admin/products/", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const result = await response.json() as Product | { error?: string };
      if (!response.ok) throw new Error("error" in result ? result.error ?? "Save failed." : "Save failed.");
      const updated = result as Product;
      setProducts((previous) => previous.some((item) => item.id === updated.id)
        ? previous.map((item) => item.id === updated.id ? updated : item)
        : [...previous, updated]);
      setEditing(null);
      setNotice(`${updated.name} saved. Public product pages will pick up the changes on refresh.`);
      return null;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Save failed.";
      setNotice(message);
      return message;
    } finally {
      setBusy(false);
    }
  }

  async function quickUpdate(product: Product, updates: Partial<Product>) {
    await save({ ...product, ...updates });
  }

  async function removeProduct(product: Product) {
    if (!window.confirm(`Delete ${product.name} from the catalog? This hides it from the storefront.`)) return;
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch(`/api/admin/products/?id=${encodeURIComponent(product.id)}`, { method: "DELETE" });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Could not delete product.");
      setProducts((current) => current.filter((item) => item.id !== product.id));
      setNotice(`${product.name} was removed from the storefront.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not delete product.");
    } finally {
      setBusy(false);
    }
  }

  function startNewProduct() {
    const template = products.find((product) => product.category === newCategory) ?? products[0];
    if (!template) return;
    setEditing({
      ...template,
      id: `draft-${newCategory}`,
      category: newCategory,
      name: "",
      slug: "",
      subtype: newCategory === "tv-stands" ? "TV stand" : newCategory === "coffee-tables" ? "Coffee table" : newCategory === "sofa" ? "Sofa" : "Dining set",
      tags: [],
      bestseller: false,
      sale: false,
      priceFrom: null,
      regularPrice: null,
      salePrice: null,
      priceNote: "Ask for today's price",
      inStock: false,
      availability: "https://schema.org/OutOfStock",
      conceptPreview: true,
      warranty: "Ask us to confirm warranty terms.",
    });
  }

  async function createSale(input: Omit<SaleRecord, "id" | "createdAt" | "updatedAt">): Promise<string | null> {
    setBusy(true);
    try {
      const response = await fetch("/api/admin/sales/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const result = await response.json() as SaleRecord | { error?: string };
      if (!response.ok) throw new Error("error" in result ? result.error ?? "Could not add record." : "Could not add record.");
      setSales((current) => [result as SaleRecord, ...current]);
      setNotice("Sales record added.");
      return null;
    } catch (error) {
      return error instanceof Error ? error.message : "Could not add record.";
    } finally {
      setBusy(false);
    }
  }

  async function updateSale(id: string, changes: Partial<Pick<SaleRecord, "status" | "notes" | "quantity" | "unitPriceKes">>) {
    const response = await fetch(`/api/admin/sales/${encodeURIComponent(id)}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    });
    const result = await response.json() as SaleRecord | { error?: string };
    if (!response.ok) throw new Error("error" in result ? result.error ?? "Could not update record." : "Could not update record.");
    setSales((current) => current.map((sale) => sale.id === id ? result as SaleRecord : sale));
  }

  async function deleteSale(id: string) {
    const response = await fetch(`/api/admin/sales/${encodeURIComponent(id)}/`, { method: "DELETE" });
    if (!response.ok) throw new Error("Could not delete sales record.");
    setSales((current) => current.filter((sale) => sale.id !== id));
  }

  if (!ready) return <main className="mx-auto max-w-7xl px-5 py-16 text-muted">Checking admin session…</main>;

  if (!authenticated) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-5 py-16">
        <form onSubmit={login} className="admin-login-form w-full border border-antique-gold/40 bg-espresso p-6">
          <p className="text-xs uppercase tracking-widest text-antique-gold">Home Update</p>
          <h1 className="mt-2 font-serif text-3xl text-ivory">Product admin</h1>
          <p className="mt-2 text-sm text-muted">Sign in with your administrator account.</p>
          {!configured ? <p className="mt-4 text-sm text-hot">Admin email, password or session signing key is not configured on this server.</p> : null}
          <label className="mt-6 block text-sm text-ivory">
            Email
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 min-h-12 w-full border border-white/15 bg-onyx px-3 text-ivory outline-none focus:border-antique-gold"
            />
          </label>
          <label className="mt-4 block text-sm text-ivory">
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 min-h-12 w-full border border-white/15 bg-onyx px-3 text-ivory outline-none focus:border-antique-gold"
            />
          </label>
          {notice ? <p role="alert" className="mt-3 text-sm text-hot">{notice}</p> : null}
          <button disabled={busy || !configured} className="mt-5 min-h-12 w-full bg-champagne px-4 font-medium text-onyx disabled:opacity-50">
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-antique-gold">Home Update operations</p>
          <h1 className="mt-1 font-serif text-3xl text-ivory">Admin dashboard</h1>
        </div>
        <button type="button" onClick={logout} className="min-h-11 border border-white/15 px-4 text-sm text-ivory hover:border-antique-gold">Sign out</button>
      </header>

      <nav aria-label="Admin sections" className="mt-5 flex gap-2 overflow-x-auto border-b border-white/10">
        {([ ["overview", "Overview"], ["sales", "Sales & orders"], ["products", "Products"] ] as const).map(([key, label]) => (
          <button key={key} type="button" onClick={() => setView(key)} aria-current={view === key ? "page" : undefined} className={`min-h-11 shrink-0 border-b-2 px-4 text-sm ${view === key ? "border-champagne text-champagne" : "border-transparent text-muted hover:text-ivory"}`}>
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {view === "products" ? <>
        <label className="sr-only" htmlFor="product-search">Search products</label>
        <input id="product-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" className="min-h-11 flex-1 border border-white/15 bg-espresso px-3 text-ivory" />
        <label className="sr-only" htmlFor="product-category">Filter category</label>
        <select id="product-category" value={category} onChange={(event) => setCategory(event.target.value as CategoryFilter)} className="min-h-11 border border-white/15 bg-espresso px-3 text-ivory">
          <option value="all">All categories</option>
          {Object.entries(categoryLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
        </select>
        <label className="sr-only" htmlFor="new-product-category">New product category</label>
        <select id="new-product-category" value={newCategory} onChange={(event) => setNewCategory(event.target.value as Product["category"])} className="min-h-11 border border-white/15 bg-espresso px-3 text-ivory">
          {Object.entries(categoryLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
        </select>
        <button type="button" onClick={startNewProduct} className="min-h-11 bg-champagne px-4 text-sm font-medium text-onyx">Add product</button>
        </> : null}
      </div>

      {notice ? <p role="status" className="mt-4 border-l-2 border-antique-gold px-3 py-2 text-sm text-ivory/85">{notice}</p> : null}

      {view === "overview" ? <AdminOverview products={products} sales={sales} onViewSales={() => setView("sales")} /> : null}
      {view === "sales" ? <SalesOperations sales={sales} products={products} busy={busy} onCreate={createSale} onUpdate={updateSale} onDelete={deleteSale} /> : null}

      {view === "products" ? <>
      <div className="mt-5 overflow-x-auto border border-white/10">
        <table className="w-full min-w-225 border-collapse text-left text-sm">
          <thead className="bg-espresso text-xs uppercase tracking-wide text-muted">
            <tr><th className="p-3">Product</th><th className="p-3">Category</th><th className="p-3">Price (KES)</th><th className="p-3">In stock</th><th className="p-3">Bestseller</th><th className="p-3">On sale</th><th className="p-3">Actions</th></tr>
          </thead>
          <tbody>
            {visibleProducts.map((product) => (
              <tr key={product.id} className="border-t border-white/10">
                <td className="p-3"><span className="block font-medium text-ivory">{product.name}</span><span className="text-xs text-muted">{product.slug}</span></td>
                <td className="p-3 text-muted">{categoryLabels[product.category]}</td>
                <td className="p-3 text-ivory">{product.regularPrice ? product.regularPrice.toLocaleString("en-KE") : "Not set"}</td>
                <td className="p-3"><Toggle label={`${product.name} in stock`} checked={product.inStock ?? product.availability === "https://schema.org/InStock"} onChange={(checked) => quickUpdate(product, { inStock: checked })} /></td>
                <td className="p-3"><Toggle label={`${product.name} bestseller`} checked={Boolean(product.bestseller)} onChange={(checked) => quickUpdate(product, { bestseller: checked })} /></td>
                <td className="p-3"><Toggle label={`${product.name} on sale`} checked={Boolean(product.sale)} onChange={(checked) => quickUpdate(product, { sale: checked })} /></td>
                <td className="p-3"><div className="flex items-center gap-2"><button type="button" onClick={() => setEditing(product)} className="min-h-10 border border-antique-gold/50 px-3 text-xs text-champagne">Edit</button><a href={productPath(product)} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center border border-white/15 px-3 text-xs text-ivory">View</a><button type="button" disabled={busy} onClick={() => void removeProduct(product)} aria-label={`Delete ${product.name}`} className="min-h-10 border border-hot/45 px-3 text-xs text-hot disabled:opacity-50">Delete</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleProducts.length === 0 ? <p className="p-6 text-muted">No products match that search.</p> : null}
      </div>
      </> : null}

      {editing ? <ProductEditor key={editing.id} product={editing} busy={busy} onClose={() => setEditing(null)} onSave={save} /> : null}
    </main>
  );
}

function formatKes(value: number) {
  return `KES ${value.toLocaleString("en-KE")}`;
}

function statusLabel(status: SaleStatus) {
  return ({ enquiry: "Enquiry", confirmed: "Confirmed", paid: "Paid", delivered: "Delivered", cancelled: "Cancelled" })[status];
}

function AdminOverview({ products, sales, onViewSales }: { products: Product[]; sales: SaleRecord[]; onViewSales: () => void }) {
  const paidSales = sales.filter((sale) => Boolean(sale.paidAt) && sale.status !== "cancelled");
  const revenue = paidSales.reduce((sum, sale) => sum + sale.quantity * sale.unitPriceKes, 0);
  const pipeline = sales.filter((sale) => sale.status === "enquiry" || sale.status === "confirmed");
  const pipelineValue = pipeline.reduce((sum, sale) => sum + sale.quantity * sale.unitPriceKes, 0);
  const deliveredOrders = sales.filter((sale) => sale.status === "delivered").length;
  const activeProducts = products.filter((product) => product.inStock ?? product.availability === "https://schema.org/InStock").length;
  const now = new Date();
  const monthlyRevenue = Array.from({ length: 6 }, (_, index) => {
    const month = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const amount = paidSales
      .filter((sale) => {
        const recorded = new Date(sale.paidAt ?? sale.updatedAt);
        return recorded.getFullYear() === month.getFullYear() && recorded.getMonth() === month.getMonth();
      })
      .reduce((sum, sale) => sum + sale.quantity * sale.unitPriceKes, 0);
    return { label: month.toLocaleDateString("en-KE", { month: "short" }), amount };
  });
  const maxMonthlyRevenue = Math.max(1, ...monthlyRevenue.map((month) => month.amount));
  const cards = [
    { label: "Collected revenue", value: formatKes(revenue), detail: `${paidSales.length} paid records` },
    { label: "Open pipeline", value: formatKes(pipelineValue), detail: `${pipeline.length} enquiry/confirmed records` },
    { label: "Sales records", value: String(sales.length), detail: `${sales.filter((sale) => sale.status === "enquiry").length} new enquiries` },
    { label: "Delivered orders", value: String(deliveredOrders), detail: "Fulfilled orders" },
    { label: "Products in catalog", value: String(products.length), detail: `${activeProducts} marked in stock` },
  ];

  return (
    <section aria-labelledby="overview-heading" className="mt-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><p className="text-xs uppercase tracking-widest text-antique-gold">Business snapshot</p><h2 id="overview-heading" className="mt-1 font-serif text-2xl text-ivory">Sales and catalog health</h2></div>
        <button type="button" onClick={onViewSales} className="min-h-11 border border-antique-gold/60 px-4 text-sm text-champagne">Open sales ledger</button>
      </div>
      <p className="mt-3 border-l-2 border-antique-gold/60 px-3 py-2 text-xs leading-relaxed text-muted">Collected revenue includes only records marked Paid. Delivered orders are counted separately. WhatsApp clicks and enquiries are not counted as sales until an admin records the order.</p>
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((card) => <article key={card.label} className="min-w-0 border border-white/10 bg-espresso p-4"><p className="text-xs text-muted">{card.label}</p><p className="mt-2 wrap-break-word font-serif text-xl text-champagne sm:text-2xl">{card.value}</p><p className="mt-1 text-[11px] text-muted">{card.detail}</p></article>)}
      </div>
      <section aria-label="Six month collected revenue trend" className="mt-6 border border-white/10 bg-espresso p-4">
        <div className="flex items-baseline justify-between gap-3"><h3 className="font-serif text-lg text-ivory">Collected revenue · last 6 months</h3><span className="text-[11px] text-muted">Paid records by payment date</span></div>
        <div className="mt-4 grid h-36 grid-cols-6 items-end gap-3" role="img" aria-label={monthlyRevenue.map((month) => `${month.label}: ${formatKes(month.amount)}`).join("; ")}>
          {monthlyRevenue.map((month) => <div key={`${month.label}-${month.amount}`} className="flex h-full flex-col justify-end gap-2 text-center"><span className="truncate text-[10px] text-muted">{month.amount ? formatKes(month.amount) : "—"}</span><div className="mx-auto w-full max-w-16 border-t border-champagne/70 bg-antique-gold/50" style={{ height: `${month.amount ? Math.max(8, (month.amount / maxMonthlyRevenue) * 92) : 2}%` }} /><span className="text-xs text-ivory/80">{month.label}</span></div>)}
        </div>
      </section>
      <div className="mt-8 border-t border-white/10 pt-5">
        <div className="flex items-center justify-between gap-3"><h3 className="font-serif text-xl text-ivory">Recent sales activity</h3><button type="button" onClick={onViewSales} className="text-sm text-champagne underline underline-offset-4">View all</button></div>
        {sales.length ? <div className="mt-3 divide-y divide-white/10 border-y border-white/10">{sales.slice(0, 5).map((sale) => <div key={sale.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"><div><p className="text-ivory">{sale.customerName} · {sale.productName}</p><p className="text-xs text-muted">{new Date(sale.createdAt).toLocaleDateString("en-KE")} · {sale.source}</p></div><div className="text-right"><p className="text-champagne">{formatKes(sale.quantity * sale.unitPriceKes)}</p><p className="text-xs text-muted">{statusLabel(sale.status)}</p></div></div>)}</div> : <p className="mt-3 border-y border-white/10 py-6 text-sm text-muted">No sales recorded yet. Add each genuine enquiry/order in Sales &amp; orders; update its status as it progresses.</p>}
      </div>
    </section>
  );
}

function SalesOperations({ sales, products, busy, onCreate, onUpdate, onDelete }: {
  sales: SaleRecord[];
  products: Product[];
  busy: boolean;
  onCreate: (sale: Omit<SaleRecord, "id" | "createdAt" | "updatedAt">) => Promise<string | null>;
  onUpdate: (id: string, changes: Partial<Pick<SaleRecord, "status" | "notes" | "quantity" | "unitPriceKes">>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [customerName, setCustomerName] = useState("");
  const [contact, setContact] = useState("");
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [quantity, setQuantity] = useState("1");
  const [unitPriceKes, setUnitPriceKes] = useState("");
  const [status, setStatus] = useState<SaleStatus>("enquiry");
  const [source, setSource] = useState<SaleRecord["source"]>("whatsapp");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const selectedProduct = products.find((product) => product.id === productId);
  const filtered = sales.filter((sale) => {
    const needle = query.trim().toLowerCase();
    return (statusFilter === "all" || sale.status === statusFilter)
      && (!needle || `${sale.customerName} ${sale.contact} ${sale.productName}`.toLowerCase().includes(needle));
  });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!selectedProduct) { setError("Choose a product."); return; }
    const parsedPrice = Number(unitPriceKes);
    const parsedQuantity = Number(quantity);
    if (!Number.isSafeInteger(parsedPrice) || parsedPrice < 0) { setError("Enter a valid KES unit price; use 0 only when not yet quoted."); return; }
    const failure = await onCreate({
      customerName: customerName.trim(),
      contact: contact.trim(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity: parsedQuantity,
      unitPriceKes: parsedPrice,
      status,
      source,
      notes: notes.trim(),
    });
    if (failure) { setError(failure); return; }
    setCustomerName(""); setContact(""); setQuantity("1"); setUnitPriceKes(""); setStatus("enquiry"); setNotes(""); setShowForm(false);
  }

  async function changeStatus(sale: SaleRecord, next: SaleStatus) {
    setSavingId(sale.id); setError("");
    try { await onUpdate(sale.id, { status: next }); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Could not update status."); }
    finally { setSavingId(""); }
  }

  async function remove(sale: SaleRecord) {
    if (!window.confirm(`Delete the sales record for ${sale.customerName} · ${sale.productName}?`)) return;
    setSavingId(sale.id); setError("");
    try { await onDelete(sale.id); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Could not delete record."); }
    finally { setSavingId(""); }
  }

  return (
    <section aria-labelledby="sales-heading" className="mt-6">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs uppercase tracking-widest text-antique-gold">Order management</p><h2 id="sales-heading" className="mt-1 font-serif text-2xl text-ivory">Sales &amp; enquiries</h2></div><button type="button" onClick={() => setShowForm((value) => !value)} className="min-h-11 bg-champagne px-4 text-sm font-medium text-onyx">{showForm ? "Close form" : "Record enquiry / order"}</button></div>
      <p className="mt-3 max-w-3xl text-xs leading-relaxed text-muted">Record each real WhatsApp, phone, website or showroom enquiry here. Mark orders Paid or Delivered only after payment/delivery is confirmed. Contact details are visible only to authenticated admins and are not sent to analytics.</p>
      {showForm ? <form onSubmit={submit} className="mt-5 grid gap-3 border border-antique-gold/35 bg-espresso p-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Customer name"><input required maxLength={120} value={customerName} onChange={(event) => setCustomerName(event.target.value)} /></Field>
        <Field label="Phone / WhatsApp contact"><input required maxLength={80} value={contact} onChange={(event) => setContact(event.target.value)} /></Field>
        <Field label="Product"><select required value={productId} onChange={(event) => { const next = products.find((product) => product.id === event.target.value); setProductId(event.target.value); if (next) setUnitPriceKes(String(next.salePrice ?? next.regularPrice ?? next.priceFrom ?? "")); }}><option value="">Choose product</option>{products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select></Field>
        <Field label="Source"><select value={source} onChange={(event) => setSource(event.target.value as SaleRecord["source"])}><option value="whatsapp">WhatsApp</option><option value="website">Website</option><option value="phone">Phone</option><option value="showroom">Showroom</option><option value="other">Other</option></select></Field>
        <Field label="Quantity"><input type="number" min="1" max="100" step="1" required value={quantity} onChange={(event) => setQuantity(event.target.value)} /></Field>
        <Field label="Unit price (KES)"><input type="number" min="0" max="100000000" step="1" required value={unitPriceKes} onChange={(event) => setUnitPriceKes(event.target.value)} /><span className="text-[11px] text-muted">Use 0 only until quoted; not counted as revenue.</span></Field>
        <Field label="Status"><select value={status} onChange={(event) => setStatus(event.target.value as SaleStatus)}><SaleStatusOptions includeCancelled /></select></Field>
        <Field label="Notes"><textarea rows={2} maxLength={2000} value={notes} onChange={(event) => setNotes(event.target.value)} /></Field>
        {error ? <p role="alert" className="sm:col-span-2 lg:col-span-4 text-sm text-hot">{error}</p> : null}
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2 lg:col-span-4"><button disabled={busy} className="min-h-11 bg-champagne px-5 text-sm font-medium text-onyx disabled:opacity-50">{busy ? "Saving…" : "Save record"}</button><span className="text-xs text-muted">Records are saved to the private sales ledger.</span></div>
      </form> : null}
      {error && !showForm ? <p role="alert" className="mt-3 text-sm text-hot">{error}</p> : null}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="sales-search">Search sales records</label><input id="sales-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search customer, contact or product" className="min-h-11 flex-1 border border-white/15 bg-espresso px-3 text-ivory"/><label className="sr-only" htmlFor="sales-status-filter">Filter status</label><select id="sales-status-filter" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="min-h-11 border border-white/15 bg-espresso px-3 text-ivory"><option value="all">All statuses</option><SaleStatusOptions /></select></div>
      <div className="mt-4 overflow-x-auto border border-white/10"><table className="w-full min-w-245 border-collapse text-left text-sm"><thead className="bg-espresso text-xs uppercase tracking-wide text-muted"><tr><th className="p-3">Customer / contact</th><th className="p-3">Product</th><th className="p-3">Source</th><th className="p-3">Qty × unit (KES)</th><th className="p-3">Total (KES)</th><th className="p-3">Status</th><th className="p-3">Date</th><th className="p-3">Action</th></tr></thead><tbody>{filtered.map((sale) => <tr key={sale.id} className="border-t border-white/10 align-top"><td className="p-3"><span className="block text-ivory">{sale.customerName}</span><a className="text-xs text-champagne underline" href={`tel:${sale.contact.replace(/[^+\d]/g, "")}`}>{sale.contact}</a><SaleNotes key={`${sale.id}-${sale.updatedAt}`} sale={sale} disabled={savingId === sale.id} onSave={async (nextNotes) => { setSavingId(sale.id); setError(""); try { await onUpdate(sale.id, { notes: nextNotes }); } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not update notes."); } finally { setSavingId(""); } }} /></td><td className="p-3 text-ivory">{sale.productName}</td><td className="p-3 capitalize text-muted">{sale.source}</td><td className="p-3"><SaleLineEditor key={`${sale.id}-${sale.updatedAt}`} sale={sale} disabled={savingId === sale.id} onSave={async (quantity, unitPriceKes) => { setSavingId(sale.id); setError(""); try { await onUpdate(sale.id, { quantity, unitPriceKes }); } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not update sale amount."); } finally { setSavingId(""); } }} /></td><td className="p-3 text-champagne">{formatKes(sale.quantity * sale.unitPriceKes)}</td><td className="p-3"><label className="sr-only" htmlFor={`status-${sale.id}`}>Status for {sale.customerName} {sale.productName}</label><select id={`status-${sale.id}`} disabled={savingId === sale.id} value={sale.status} onChange={(event) => void changeStatus(sale, event.target.value as SaleStatus)} className="min-h-10 border border-white/15 bg-onyx px-2 text-xs text-ivory"><SaleStatusOptions includeCancelled /></select></td><td className="p-3 text-xs text-muted"><span className="block">Created {new Date(sale.createdAt).toLocaleDateString("en-KE")}</span><span className="mt-1 block">Updated {new Date(sale.updatedAt).toLocaleDateString("en-KE")}</span></td><td className="p-3"><button type="button" disabled={savingId === sale.id} onClick={() => void remove(sale)} className="min-h-9 border border-hot/50 px-2 text-xs text-hot disabled:opacity-50">Delete</button></td></tr>)}</tbody></table>{filtered.length === 0 ? <p className="p-6 text-sm text-muted">No matching sales records. Add a verified enquiry or order above.</p> : null}</div>
    </section>
  );
}

function SaleStatusOptions({ includeCancelled = false }: { includeCancelled?: boolean }) {
  return <><option value="enquiry">Enquiry</option><option value="confirmed">Confirmed</option><option value="paid">Paid</option><option value="delivered">Delivered</option>{includeCancelled ? <option value="cancelled">Cancelled</option> : null}</>;
}

function SaleNotes({ sale, disabled, onSave }: { sale: SaleRecord; disabled: boolean; onSave: (notes: string) => Promise<void> }) {
  const [value, setValue] = useState(sale.notes);
  return <label className="mt-2 block max-w-52 text-[10px] text-muted">Order notes<textarea aria-label={`Notes for ${sale.customerName}`} rows={2} maxLength={2000} disabled={disabled} value={value} onChange={(event) => setValue(event.target.value)} onBlur={() => { if (value !== sale.notes) void onSave(value); }} className="mt-1 min-h-14 w-full border border-white/10 bg-onyx p-2 text-xs text-ivory disabled:opacity-60" /></label>;
}

function SaleLineEditor({ sale, disabled, onSave }: { sale: SaleRecord; disabled: boolean; onSave: (quantity: number, unitPriceKes: number) => Promise<void> }) {
  const [quantity, setQuantity] = useState(String(sale.quantity));
  const [price, setPrice] = useState(String(sale.unitPriceKes));
  const saveIfChanged = () => {
    const nextQuantity = Number(quantity);
    const nextPrice = Number(price);
    if (Number.isInteger(nextQuantity) && nextQuantity > 0 && nextQuantity <= 100 && Number.isSafeInteger(nextPrice) && nextPrice >= 0 && (nextQuantity !== sale.quantity || nextPrice !== sale.unitPriceKes)) void onSave(nextQuantity, nextPrice);
  };
  return <div className="flex items-center gap-1"><input aria-label={`Quantity for ${sale.customerName}`} type="number" min="1" max="100" value={quantity} disabled={disabled} onChange={(event) => setQuantity(event.target.value)} onBlur={saveIfChanged} className="min-h-9 w-14 border border-white/10 bg-onyx px-1 text-xs text-ivory disabled:opacity-60"/><span className="text-muted">×</span><input aria-label={`Unit price for ${sale.customerName} in KES`} type="number" min="0" max="100000000" value={price} disabled={disabled} onChange={(event) => setPrice(event.target.value)} onBlur={saveIfChanged} className="min-h-9 w-24 border border-white/10 bg-onyx px-1 text-xs text-ivory disabled:opacity-60"/></div>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <input type="checkbox" aria-label={label} checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-champagne" />;
}

async function uploadLocalImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/admin/upload/", {
    method: "POST",
    body: formData,
  });
  const result = await response.json() as { error?: string; url?: string };
  if (!response.ok || !result.url) throw new Error(result.error ?? "Image upload failed.");
  return result.url;
}

function ProductEditor({ product, busy, onClose, onSave }: { product: Product; busy: boolean; onClose: () => void; onSave: (product: Product) => Promise<string | null> }) {
  const [draft, setDraft] = useState(product);
  const [imageDraft, setImageDraft] = useState(product.images.join("\n"));
  const [careDraft, setCareDraft] = useState(product.careNotes.join("\n"));
  const [tagDraft, setTagDraft] = useState(product.tags.join(", "));
  const [colourDraft, setColourDraft] = useState(product.colours.join(", "));
  const [woodDraft, setWoodDraft] = useState(product.woodFinishes.join(", "));
  const [fabricDraft, setFabricDraft] = useState(product.fabrics.join(", "));
  const [leadDraft, setLeadDraft] = useState(leadTimeText(product));
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [variantChoice, setVariantChoice] = useState({ fabric: product.fabrics[0] ?? "", colour: product.colours[0] ?? "", wood: product.woodFinishes[0] ?? "" });
  const [formError, setFormError] = useState("");
  const images = imageDraft.split("\n").map((value) => value.trim()).filter(Boolean);
  const set = <K extends keyof Product>(key: K, value: Product[K]) => setDraft((current) => ({ ...current, [key]: value }));

  const variantGroups = [
    { key: "fabric", label: "Fabric", options: splitList(fabricDraft), choice: variantChoice.fabric, setChoice: (value: string) => setVariantChoice((current) => ({ ...current, fabric: value })) },
    { key: "colour", label: "Colour", options: splitList(colourDraft), choice: variantChoice.colour, setChoice: (value: string) => setVariantChoice((current) => ({ ...current, colour: value })) },
    { key: "wood", label: "Wood finish", options: splitList(woodDraft), choice: variantChoice.wood, setChoice: (value: string) => setVariantChoice((current) => ({ ...current, wood: value })) },
  ] as const;

  async function handleUpload(files: FileList | null, target?: "images" | "fabric" | "colour" | "wood") {
    const chosen = Array.from(files ?? []);
    if (!chosen.length) return;
    setUploading(true);
    setFormError("");
    try {
      const uploaded = await Promise.all(chosen.map(async (file) => uploadLocalImage(file)));
      if (target === "images") {
        const nextPaths = [...images, ...uploaded].filter(Boolean);
        setImageDraft(nextPaths.join("\n"));
        return;
      }
      const group = target ?? "fabric";
      const option = variantChoice[group];
      if (!option) return;
      setDraft((current) => ({
        ...current,
        variants: {
          ...current.variants,
          [group]: {
            ...(current.variants?.[group] ?? {}),
            [option]: uploaded[0],
          },
        },
      }));
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function reorderImages(from: number, to: number) {
    const next = [...images];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setImageDraft(next.join("\n"));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const leadTimeDays = parseLeadTime(leadDraft);
    if (leadDraft.trim() && !leadTimeDays) {
      setFormError("Enter lead time as min-max days, “made to order”, or leave it blank.");
      return;
    }
    if (typeof draft.salePrice === "number" && typeof draft.regularPrice === "number" && draft.salePrice > draft.regularPrice) {
      setFormError("Sale price cannot be higher than the regular price.");
      return;
    }
    if (!images.length || images.some((image) => !image.startsWith("/images/") || image.includes(".."))) {
      setFormError("Add at least one local image path beginning with /images/.");
      return;
    }
    const error = await onSave({
      ...draft,
      images,
      tags: splitList(tagDraft),
      colours: splitList(colourDraft),
      woodFinishes: splitList(woodDraft),
      fabrics: splitList(fabricDraft),
      careNotes: careDraft.split("\n").map((value) => value.trim()).filter(Boolean),
      leadTimeDays,
    });
    if (error) setFormError(error);
  }

  return (
    <div className="fixed inset-0 z-70 flex items-end justify-center bg-onyx/90 sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="editor-title">
      <form onSubmit={submit} className="admin-editor-form max-h-[95vh] w-full max-w-5xl overflow-y-auto border border-antique-gold/40 bg-espresso p-4 sm:p-6">
        <div className="sticky top-0 z-10 -mx-4 -mt-4 mb-5 flex items-center justify-between border-b border-white/10 bg-espresso px-4 py-3 sm:-mx-6 sm:-mt-6 sm:px-6">
          <div><p className="text-[10px] uppercase tracking-widest text-antique-gold">Catalog editor</p><h2 id="editor-title" className="font-serif text-2xl text-ivory">{product.name}</h2></div>
          <button type="button" onClick={onClose} aria-label="Close editor" className="min-h-11 border border-white/15 px-3 text-sm text-ivory">Close</button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title"><input required value={draft.name} onChange={(event) => set("name", event.target.value)} /></Field>
          <Field label="Subtitle"><input value={draft.subtype} onChange={(event) => set("subtype", event.target.value)} /></Field>
          <Field label="Slug"><input required pattern="[a-z0-9]+(-[a-z0-9]+)*" value={draft.slug} onChange={(event) => set("slug", event.target.value)} /></Field>
          <Field label="Category"><select value={draft.category} onChange={(event) => set("category", event.target.value as Product["category"])}>{Object.entries(categoryLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></Field>
          <Field label="Regular price (KES)"><input type="number" min="0" step="1" value={draft.regularPrice ?? ""} onChange={(event) => set("regularPrice", event.target.value ? Number(event.target.value) : null)} /></Field>
          <Field label="Sale price (KES)"><input type="number" min="0" step="1" value={draft.salePrice ?? ""} onChange={(event) => set("salePrice", event.target.value ? Number(event.target.value) : null)} /></Field>
          <Field label="Tags (comma separated)"><input value={tagDraft} onChange={(event) => setTagDraft(event.target.value)} /></Field>
          <Field label="Lead time (e.g. 10-14 or made to order)"><input value={leadDraft} onChange={(event) => setLeadDraft(event.target.value)} /><span className="text-xs text-muted">Leave blank if it must be confirmed.</span></Field>
          <Field label="Length (cm)"><input type="number" min="1" value={draft.dimensions.w} onChange={(event) => set("dimensions", { ...draft.dimensions, w: Number(event.target.value) })} /></Field>
          <Field label="Width / depth (cm)"><input type="number" min="1" value={draft.dimensions.d} onChange={(event) => set("dimensions", { ...draft.dimensions, d: Number(event.target.value) })} /></Field>
          <Field label="Height (cm)"><input type="number" min="1" value={draft.dimensions.h} onChange={(event) => set("dimensions", { ...draft.dimensions, h: Number(event.target.value) })} /></Field>
          {draft.category === "tv-stands" ? <>
            <Field label="Maximum TV size"><input value={draft.maxTvSize ?? ""} onChange={(event) => set("maxTvSize", event.target.value)} /></Field>
            <Field label="Storage drawers"><input type="number" min="0" max="20" value={draft.storageDrawers ?? 0} onChange={(event) => set("storageDrawers", Number(event.target.value))} /></Field>
            <label className="flex min-h-11 items-center gap-2 text-sm text-ivory"><input type="checkbox" checked={Boolean(draft.cableManagement)} onChange={(event) => set("cableManagement", event.target.checked)} className="h-5 w-5 accent-champagne" />Cable grommets / management</label>
          </> : null}
          {draft.category === "coffee-tables" ? <>
            <Field label="Shape"><select value={draft.tableShape ?? "Oval"} onChange={(event) => set("tableShape", event.target.value as Product["tableShape"])}><option>Round</option><option>Oval</option><option>Rectangular</option><option>Fluted/Organic Nesting</option></select></Field>
            <Field label="Top / base material"><select value={draft.topMaterial ?? "Solid Wood"} onChange={(event) => set("topMaterial", event.target.value as Product["topMaterial"])}><option>Marble</option><option>Solid Wood</option><option>Fluted Base</option></select></Field>
          </> : null}
          <Field label="Colours (comma separated)"><input value={colourDraft} onChange={(event) => setColourDraft(event.target.value)} /></Field>
          <Field label="Wood finishes / timber tones"><input value={woodDraft} onChange={(event) => setWoodDraft(event.target.value)} /></Field>
          <Field label="Fabric variants (comma separated)"><input value={fabricDraft} onChange={(event) => setFabricDraft(event.target.value)} /></Field>
          <Field label="Warranty"><input value={draft.warranty} onChange={(event) => set("warranty", event.target.value)} /></Field>
          <Field label="Fabric / material care (one per line)"><textarea rows={3} value={careDraft} onChange={(event) => setCareDraft(event.target.value)} /></Field>
          <Field label="Image paths (one local /images/ path per line)"><textarea rows={4} value={imageDraft} onChange={(event) => setImageDraft(event.target.value)} /><span className="text-xs text-muted">Use uploaded local assets such as /images/product-name.webp.</span></Field>
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-xs text-muted">Upload product images from your computer</label>
            <div className="flex flex-wrap items-center gap-3 border border-white/10 bg-onyx p-3">
              <input type="file" accept="image/*" multiple onChange={(event) => { void handleUpload(event.target.files, "images"); event.target.value = ""; }} className="text-sm text-ivory file:mr-3 file:rounded file:border-0 file:bg-champagne file:px-3 file:py-2 file:text-sm file:font-medium file:text-onyx" />
              <span className="text-[11px] text-muted">{uploading ? "Uploading…" : "Saved to /images/uploads/"}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-white/10 pt-4">
          <h3 className="text-sm font-medium text-ivory">Variant image mapping</h3>
          <p className="mt-1 text-xs text-muted">Upload one image for each fabric, colour or wood finish option.</p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {variantGroups.map((group) => (
              <div key={group.key} className="border border-white/10 bg-onyx p-3">
                <label className="mb-2 block text-xs text-muted">{group.label}</label>
                <select value={group.choice} onChange={(event) => group.setChoice(event.target.value)} className="mb-2 min-h-10 w-full border border-white/10 bg-espresso px-2 text-sm text-ivory">
                  {group.options.length ? group.options.map((option) => <option key={option} value={option}>{option}</option>) : <option value="">No options</option>}
                </select>
                <input type="file" accept="image/*" onChange={(event) => { if (group.choice) { void handleUpload(event.target.files, group.key as "fabric" | "colour" | "wood"); } event.target.value = ""; }} className="block w-full text-xs text-ivory file:mr-2 file:rounded file:border-0 file:bg-champagne file:px-2 file:py-1 file:text-xs file:font-medium file:text-onyx" disabled={!group.choice || !group.options.length || uploading} />
                {draft.variants?.[group.key] && Object.entries(draft.variants[group.key] ?? {}).length > 0 ? <div className="mt-3 grid grid-cols-2 gap-2">{Object.entries(draft.variants[group.key] ?? {}).map(([name, url]) => <div key={`${group.key}-${name}`} className="border border-white/10 p-1"><div className="relative aspect-square"><Image src={url} alt={`${group.label} ${name}`} fill sizes="120px" className="object-cover" /></div><p className="mt-1 truncate text-[10px] text-muted">{name}</p></div>)}</div> : <p className="mt-2 text-[11px] text-muted">No variant image mapped yet.</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-4 border-y border-white/10 py-3 text-sm text-ivory">
          <label className="flex items-center gap-2"><input type="checkbox" checked={Boolean(draft.inStock)} onChange={(event) => set("inStock", event.target.checked)} className="h-5 w-5 accent-champagne" />In stock</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={Boolean(draft.bestseller)} onChange={(event) => set("bestseller", event.target.checked)} className="h-5 w-5 accent-champagne" />Bestseller</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={Boolean(draft.sale)} onChange={(event) => set("sale", event.target.checked)} className="h-5 w-5 accent-champagne" />On sale</label>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-ivory">Image order and previews</h3>
          <p className="mt-1 text-xs text-muted">Drag items to reorder. Use the first image as the card image.</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {images.map((image, index) => (
              <div key={`${image}-${index}`} draggable onDragStart={() => setDragIndex(index)} onDragOver={(event) => event.preventDefault()} onDrop={() => { if (dragIndex !== null && dragIndex !== index) reorderImages(dragIndex, index); setDragIndex(null); }} className="relative cursor-grab border border-antique-gold/35 bg-onyx p-2">
                <div className="relative aspect-square"><Image src={image} alt={`Preview ${index + 1} for ${draft.name}`} fill sizes="180px" className="object-cover" /></div>
                <p className="mt-1 truncate text-xs text-muted">{index + 1}. {image}</p>
              </div>
            ))}
          </div>
        </div>

        {draft.colours.length > 0 ? <div className="mt-4 flex flex-wrap gap-2" aria-label="Current colour swatches">{splitList(colourDraft).map((colour) => <span key={colour} className="inline-flex items-center gap-2 border border-white/15 px-2 py-1 text-xs text-ivory"><i aria-hidden className="h-4 w-4 border border-white/20" style={{ backgroundColor: colourHex[colour] ?? "#8A5A36" }} />{colour}</span>)}</div> : null}
        {formError ? <p role="alert" className="mt-4 border-l-2 border-hot px-3 py-2 text-sm text-ivory">{formError}</p> : null}
        <div className="mt-6 flex justify-end gap-3 border-t border-white/10 pt-4">
          <button type="button" onClick={onClose} className="min-h-11 border border-white/15 px-4 text-sm text-ivory">Cancel</button>
          <button disabled={busy} className="min-h-11 bg-champagne px-5 text-sm font-medium text-onyx disabled:opacity-50">{busy ? "Saving…" : "Save product"}</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5 text-xs text-muted">
      {label}
      {children}
    </label>
  );
}
