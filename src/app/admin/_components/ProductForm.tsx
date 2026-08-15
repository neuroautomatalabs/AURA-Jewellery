"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { clientSaveProduct } from "@/lib/admin-client";
import { ProductDetailPreview } from "@/app/admin/_components/ProductDetailPreview";
import {
  photosFromProduct,
  ProductPhotoPicker,
  type ProductPhoto,
} from "@/app/admin/_components/ProductPhotoPicker";
import {
  DIAMOND_DEFAULTS,
  formatPrice,
  getBackSide,
  getCertification,
  getMetalLabel,
  getMetalTone,
  getProductSku,
  getSizeTableValue,
  getStyleLabel,
} from "@/data/products";
import { piercings } from "@/data/piercings";
import type { CatalogProduct } from "@/lib/commerce";
import { STUD_SIZES, getProductSizes } from "@/lib/return-policy";
import type { MetalType, PiercingId, Product } from "@/lib/types";

type Props = {
  product?: CatalogProduct;
};

export function ProductForm({ product }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product?.price ? String(product.price) : "");
  const [metal, setMetal] = useState<MetalType>(product?.metal ?? "gold");
  const [style, setStyle] = useState(product?.style ?? "stud");
  const [unit, setUnit] = useState(product?.unit ?? "single");
  const [sizes, setSizes] = useState<string[]>(() =>
    product ? getProductSizes(product) : [...STUD_SIZES],
  );
  const [customSize, setCustomSize] = useState("");
  const [description, setDescription] = useState(product?.description ?? "");
  const [published, setPublished] = useState(product?.published ?? true);
  const [bestseller, setBestseller] = useState(product?.bestseller ?? false);
  const [bestsellerRank, setBestsellerRank] = useState(
    product?.bestsellerRank != null ? String(product.bestsellerRank) : "",
  );
  const [showDetails, setShowDetails] = useState(false);
  const [photos, setPhotos] = useState<ProductPhoto[]>(() =>
    photosFromProduct(product?.image, product?.images),
  );
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!photos.length) {
      setError("Add at least one photo.");
      return;
    }

    setPending(true);
    const formData = new FormData(e.currentTarget);
    formData.set(
      "photoOrder",
      JSON.stringify(photos.map((photo) => (photo.file ? "new" : photo.src))),
    );
    for (const photo of photos) {
      if (photo.file) formData.append("photos", photo.file);
    }

    const result = await clientSaveProduct(formData);
    if (result?.error) {
      setError(result.error);
      setPending(false);
      return;
    }
    router.push(`/admin/products/edit?id=${result.id}&saved=1`);
  }

  const ear = piercings.filter((p) => p.region === "ear");
  const nose = piercings.filter((p) => p.region === "nose");
  const selected = new Set(product?.piercings ?? []);
  const cover = photos[0]?.src;
  const priceNumber = Number(price);
  const metalLabel = metal === "gold" ? "18K Gold" : "Diamond";

  function field(form: FormData, key: string) {
    const value = form.get(key);
    return typeof value === "string" ? value.trim() : "";
  }

  function previewProduct(): Product {
    const form = formRef.current ? new FormData(formRef.current) : new FormData();
    const photoSrcs = photos.map((photo) => photo.src);
    const placementIds = form
      .getAll("piercings")
      .filter((value): value is PiercingId => typeof value === "string");
    return {
      id: product?.id ?? "preview",
      name: name.trim() || "Product name",
      metal,
      karat: metal === "gold" ? "18k" : undefined,
      price: Number.isFinite(priceNumber) && priceNumber > 0 ? priceNumber : 0,
      currency: "INR",
      piercings: placementIds,
      image: photoSrcs[0] ?? "",
      images: photoSrcs.length > 1 ? photoSrcs : undefined,
      sku: field(form, "sku") || undefined,
      style,
      unit,
      sizes: style === "stud" && unit === "single" ? sizes : undefined,
      description: description.trim(),
      productSize: field(form, "productSize") || undefined,
      backSide: field(form, "backSide") || undefined,
      metalDisplay: field(form, "metalDisplay") || undefined,
      metalTone: field(form, "metalTone") || undefined,
      styleDisplay: field(form, "styleDisplay") || undefined,
      certification: field(form, "certification") || undefined,
      diamondShape: field(form, "diamondShape") || undefined,
      diamondCarat: field(form, "diamondCarat") || undefined,
      diamondCount: field(form, "diamondCount") || undefined,
      diamondColor: field(form, "diamondColor") || undefined,
      diamondClarity: field(form, "diamondClarity") || undefined,
    };
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="field-label">Name</span>
              <input
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="field-input"
                placeholder="Petal Bloom Stud in 18K Gold"
              />
            </label>
            <label className="block">
              <span className="field-label">Price (INR)</span>
              <input
                name="price"
                type="number"
                min={1}
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="field-input"
              />
            </label>
            <label className="block">
              <span className="field-label">Metal</span>
              <select
                name="metal"
                className="field-input"
                value={metal}
                onChange={(e) => setMetal(e.target.value as MetalType)}
              >
                <option value="gold">Gold</option>
                <option value="diamond">Diamond</option>
              </select>
            </label>
            <label className="block">
              <span className="field-label">Style</span>
              <select
                name="style"
                className="field-input"
                value={style}
                onChange={(e) => setStyle(e.target.value as typeof style)}
              >
                <option value="stud">Stud</option>
                <option value="hoop">Hoop</option>
                <option value="charm">Charm</option>
              </select>
            </label>
            <label className="block">
              <span className="field-label">Unit</span>
              <select
                name="unit"
                className="field-input"
                value={unit}
                onChange={(e) => setUnit(e.target.value as typeof unit)}
              >
                <option value="single">Single</option>
                <option value="pair">Pair</option>
              </select>
            </label>
            <label className="block">
              <span className="field-label">Stock</span>
              <input
                name="stock"
                type="number"
                min={0}
                defaultValue={product?.stock ?? ""}
                className="field-input"
                placeholder="Blank = made to order"
              />
            </label>
          </div>

          {style === "stud" && unit === "single" ? (
            <div className="rounded-xl border border-line bg-white p-4">
              <p className="field-label mb-1">Sizes on the product page</p>
              <p className="mb-3 text-xs text-ink-muted">
                Same pills customers see. Tap to add or remove, or leave all off if this stud has no size.
                Currently offered:{" "}
                <span className="font-semibold text-ink">
                  {sizes.length ? sizes.join(" · ") : "none — no size picker on the shop"}
                </span>
              </p>
              {sizes.map((size) => (
                <input key={size} type="hidden" name="sizes" value={size} />
              ))}
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set([...STUD_SIZES, ...sizes])).map((size) => {
                  const on = sizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setSizes((current) =>
                          on
                            ? current.filter((item) => item !== size)
                            : [...current, size],
                        )
                      }
                      className={`min-h-10 rounded-full px-3.5 text-sm font-semibold transition ${
                        on
                          ? "bg-royal text-white"
                          : "bg-surface text-ink hover:bg-royal-soft"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <input
                  value={customSize}
                  onChange={(e) => setCustomSize(e.target.value)}
                  className="field-input max-w-[10rem] min-h-10"
                  placeholder="7mm"
                />
                <button
                  type="button"
                  className="btn-outline min-h-10"
                  onClick={() => {
                    const next = customSize.trim().replace(/\s+/g, "");
                    if (!next) return;
                    const label = next.toLowerCase().endsWith("mm")
                      ? next
                      : `${next}mm`;
                    setSizes((current) =>
                      current.includes(label) ? current : [...current, label],
                    );
                    setCustomSize("");
                  }}
                >
                  Add size
                </button>
              </div>
            </div>
          ) : (
            <p className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink-muted">
              {unit === "pair"
                ? "Sold as a pair — the shop hides the size picker for this piece."
                : "Hoops and charms do not show a face-size picker on the shop."}
            </p>
          )}

          <label className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3">
            <input
              type="checkbox"
              name="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="accent-royal mt-0.5 h-4 w-4"
            />
            <span>
              <span className="block text-sm font-semibold text-ink">
                Published on the shop
              </span>
              <span className="mt-0.5 block text-xs text-ink-muted">
                {product?.published
                  ? "This piece is live. Open live page stays on until you unpublish and save."
                  : "Save with this checked to put it on the shop. Open live page turns on after that save."}
              </span>
            </span>
          </label>

          <div className="rounded-xl border border-line bg-white px-4 py-3">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                name="bestseller"
                checked={bestseller}
                onChange={(e) => setBestseller(e.target.checked)}
                className="accent-royal mt-0.5 h-4 w-4"
              />
              <span>
                <span className="block text-sm font-semibold text-ink">
                  Show in Bestsellers on the home page
                </span>
                <span className="mt-0.5 block text-xs text-ink-muted">
                  Home shows up to 8 live bestsellers, ordered by rank. You can also manage the
                  whole row from Bestsellers in the sidebar.
                </span>
              </span>
            </label>
            {bestseller && (
              <label className="mt-3 block max-w-[10rem]">
                <span className="field-label">Home order</span>
                <input
                  name="bestsellerRank"
                  type="number"
                  min={1}
                  max={99}
                  value={bestsellerRank}
                  onChange={(e) => setBestsellerRank(e.target.value)}
                  className="field-input"
                  placeholder="1"
                />
              </label>
            )}
          </div>

          <label className="block">
            <span className="field-label">Description</span>
            <textarea
              name="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="field-input"
            />
          </label>

          <div>
            <span className="field-label">Photos</span>
            <p className="mb-3 text-xs text-ink-muted">
              Add as many shots as you like. Customers see the cover first, then the gallery.
            </p>
            <ProductPhotoPicker photos={photos} onChange={setPhotos} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-8">
          <p className="field-label">Shop preview</p>
          <p className="mb-3 text-xs text-ink-muted">
            How this piece will look on the collection grid.
          </p>
          <article className="overflow-hidden rounded-xl border border-line bg-white shadow-[var(--shadow-soft)]">
            <div className="relative aspect-square bg-surface">
              {cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cover} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-ink-muted">
                  Add a photo to preview the shop card
                </div>
              )}
              <div className="absolute left-2.5 top-2.5 rounded-md bg-royal/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                {metalLabel}
              </div>
            </div>
            <div className="p-3.5">
              <h3 className="font-display line-clamp-2 min-h-[2.75rem] text-[15px] leading-snug text-ink">
                {name.trim() || "Product name"}
              </h3>
              <p className="mt-2 text-lg font-bold tracking-tight text-royal">
                {Number.isFinite(priceNumber) && priceNumber > 0
                  ? formatPrice(priceNumber)
                  : "₹ —"}
              </p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-ink-muted">
                {unit === "pair" ? "Pair" : style}
              </p>
              <button
                type="button"
                className="btn-primary mt-4 w-full text-[11px]"
                onClick={() => setShowDetails(true)}
              >
                View details
              </button>
            </div>
          </article>
          {photos.length > 1 && (
            <div className="mt-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                Gallery
              </p>
              <div className="flex gap-2 overflow-x-auto">
                {photos.map((photo, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={photo.id}
                    src={photo.src}
                    alt=""
                    className={`h-14 w-14 shrink-0 rounded-lg object-cover ring-2 ${
                      i === 0 ? "ring-royal" : "ring-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <ProductDetailPreview
        open={showDetails}
        onClose={() => setShowDetails(false)}
        product={previewProduct()}
        published={Boolean(product?.published)}
        liveHref={product?.published && product.id ? `/products/${product.id}` : undefined}
      />

      <div className="rounded-2xl border border-line bg-white p-5">
        <p className="field-label mb-1">Product detail table</p>
        <p className="mb-4 text-xs text-ink-muted">
          These rows appear on the live product page under Product description. Values below are
          what customers see now — change any of them.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="field-label">Style No</span>
            <input
              name="sku"
              defaultValue={
                product ? product.sku || getProductSku(product) : ""
              }
              className="field-input"
              placeholder="AJ-PETAL-18"
            />
          </label>
          <label className="block">
            <span className="field-label">Metal</span>
            <input
              key={metal}
              name="metalDisplay"
              defaultValue={
                product?.metalDisplay ||
                getMetalLabel({ metal, karat: "18k", metalDisplay: product?.metalDisplay })
              }
              className="field-input"
            />
          </label>
          <label className="block">
            <span className="field-label">Metal tone</span>
            <input
              name="metalTone"
              defaultValue={product?.metalTone || getMetalTone(product ?? { metalTone: undefined })}
              className="field-input"
            />
          </label>
          <label className="block">
            <span className="field-label">Style</span>
            <input
              key={`${style}-${unit}`}
              name="styleDisplay"
              defaultValue={
                product?.styleDisplay || getStyleLabel({ style, unit, styleDisplay: product?.styleDisplay })
              }
              className="field-input"
            />
          </label>
          <label className="block">
            <span className="field-label">Product size</span>
            <input
              name="productSize"
              defaultValue={
                product?.productSize ||
                getSizeTableValue({ style, unit, sizes, productSize: product?.productSize })
              }
              className="field-input"
            />
          </label>
          <label className="block">
            <span className="field-label">Back / post</span>
            <input
              key={style}
              name="backSide"
              defaultValue={product?.backSide || getBackSide({ style, backSide: product?.backSide })}
              className="field-input"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="field-label">Certification</span>
            <input
              key={metal}
              name="certification"
              defaultValue={
                product?.certification ||
                getCertification({ metal, certification: product?.certification })
              }
              className="field-input"
            />
          </label>
        </div>
        <p className="mt-3 text-xs text-ink-muted">
          Best for is filled from Piercing placements below.
        </p>
      </div>

      {metal === "diamond" && (
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="field-label mb-1">Diamond details table</p>
          <p className="mb-4 text-xs text-ink-muted">
            Shown on the live page for diamond pieces. Current values are filled in.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="field-label">Shape</span>
              <input
                name="diamondShape"
                defaultValue={product?.diamondShape || DIAMOND_DEFAULTS.diamondShape}
                className="field-input"
              />
            </label>
            <label className="block">
              <span className="field-label">Carat weight</span>
              <input
                name="diamondCarat"
                defaultValue={product?.diamondCarat || DIAMOND_DEFAULTS.diamondCarat}
                className="field-input"
              />
            </label>
            <label className="block">
              <span className="field-label">Number of diamonds</span>
              <input
                name="diamondCount"
                defaultValue={product?.diamondCount || DIAMOND_DEFAULTS.diamondCount}
                className="field-input"
              />
            </label>
            <label className="block">
              <span className="field-label">Color grade</span>
              <input
                name="diamondColor"
                defaultValue={product?.diamondColor || DIAMOND_DEFAULTS.diamondColor}
                className="field-input"
              />
            </label>
            <label className="block">
              <span className="field-label">Clarity grade</span>
              <input
                name="diamondClarity"
                defaultValue={product?.diamondClarity || DIAMOND_DEFAULTS.diamondClarity}
                className="field-input"
              />
            </label>
          </div>
        </div>
      )}

      <fieldset>
        <legend className="field-label">Piercing placements</legend>
        <p className="mb-3 text-xs text-ink-muted">
          Used by shop Ear / Nose category filters and the piercing maps.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-white p-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-royal">Ear</p>
            <div className="flex flex-wrap gap-2">
              {ear.map((p) => (
                <label key={p.id} className="flex items-center gap-1.5 text-sm">
                  <input
                    type="checkbox"
                    name="piercings"
                    value={p.id}
                    defaultChecked={selected.has(p.id)}
                    className="accent-royal"
                  />
                  {p.shortName}
                </label>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-line bg-white p-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-royal">Nose</p>
            <div className="flex flex-wrap gap-2">
              {nose.map((p) => (
                <label key={p.id} className="flex items-center gap-1.5 text-sm">
                  <input
                    type="checkbox"
                    name="piercings"
                    value={p.id}
                    defaultChecked={selected.has(p.id)}
                    className="accent-royal"
                  />
                  {p.shortName}
                </label>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "Saving…" : product ? "Save product" : "Add product"}
        </button>
      </div>
    </form>
  );
}
