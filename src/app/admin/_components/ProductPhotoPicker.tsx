"use client";

import { useEffect, useRef, useState } from "react";

export type ProductPhoto = {
  id: string;
  src: string;
  file?: File;
};

function uniqueUrls(urls: string[]) {
  const seen = new Set<string>();
  return urls.filter((url) => {
    if (!url || seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}

export function photosFromProduct(image?: string, gallery?: string[]) {
  return uniqueUrls([image ?? "", ...(gallery ?? [])]).map((src, i) => ({
    id: `kept-${i}-${src}`,
    src,
  }));
}

export function ProductPhotoPicker({
  photos,
  onChange,
}: {
  photos: ProductPhoto[];
  onChange: (photos: ProductPhoto[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  useEffect(() => {
    return () => {
      for (const photo of photos) {
        if (photo.file) URL.revokeObjectURL(photo.src);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addFiles(list: FileList | File[]) {
    const files = Array.from(list).filter((file) => file.type.startsWith("image/"));
    if (!files.length) return;
    onChange([
      ...photos,
      ...files.map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
        src: URL.createObjectURL(file),
        file,
      })),
    ]);
  }

  function removeAt(index: number) {
    const photo = photos[index];
    if (photo?.file) URL.revokeObjectURL(photo.src);
    onChange(photos.filter((_, i) => i !== index));
  }

  function moveToFront(index: number) {
    if (index === 0) return;
    const next = [...photos];
    const [item] = next.splice(index, 1);
    next.unshift(item);
    onChange(next);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="sr-only"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-8 text-center transition ${
          over
            ? "border-royal bg-royal-soft"
            : "border-royal/30 bg-white hover:border-royal hover:bg-royal-soft/60"
        }`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-royal text-xl text-white">
          +
        </span>
        <span className="mt-3 text-sm font-bold text-royal">Add photos</span>
        <span className="mt-1 text-xs text-ink-muted">
          Click to browse, or drag and drop. First photo is the shop cover.
        </span>
      </button>

      {photos.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {photos.map((photo, i) => (
            <li
              key={photo.id}
              className="relative overflow-hidden rounded-xl border border-line bg-surface"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt=""
                className="aspect-square w-full object-cover"
              />
              {i === 0 && (
                <span className="absolute left-2 top-2 rounded-md bg-royal px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  Cover
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex gap-1 bg-royal-deep/80 p-1.5">
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => moveToFront(i)}
                    className="flex-1 rounded bg-white/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-white/25"
                  >
                    Cover
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="flex-1 rounded bg-white/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-red-500"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
