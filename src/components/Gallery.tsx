"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { photos, roomLabels, type Photo } from "@/content/villa";
import { t, type Locale } from "@/lib/copy";

export function Gallery({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const mosaic = [photos[0], photos[1], photos[3], photos[4], photos[2]];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!open) return;
      if (event.key === "ArrowRight") setIndex((value) => (value + 1) % photos.length);
      if (event.key === "ArrowLeft") setIndex((value) => (value - 1 + photos.length) % photos.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function show(photo: Photo) {
    setIndex(photos.findIndex((item) => item.src === photo.src));
    setOpen(true);
  }

  const current = photos[index];
  const rooms = Array.from(new Set(photos.map((photo) => photo.room)));

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:grid-rows-2 md:h-[min(72vh,760px)]">
        {mosaic.map((photo, photoIndex) => (
          <button
            key={photo.src}
            type="button"
            aria-label={t(locale, photo.alt)}
            onClick={() => show(photo)}
            className={`relative overflow-hidden ${photoIndex === 0 ? "col-span-2 row-span-2 min-h-72 md:min-h-0" : "min-h-36"}`}
          >
            <Image
              src={photo.src}
              alt={t(locale, photo.alt)}
              fill
              priority={photoIndex === 0}
              sizes={photoIndex === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
              className="object-cover transition duration-700 hover:scale-105"
            />
            {photoIndex === mosaic.length - 1 ? (
              <span className="absolute bottom-3 right-3 rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-ocean">
                {locale === "es" ? `Ver ${photos.length} fotos` : `View ${photos.length} photos`}
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="h-[min(92vh,900px)] w-[min(1100px,calc(100vw-1.5rem))] overflow-hidden rounded-3xl bg-ocean-deep text-sand"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm text-gold">{t(locale, roomLabels[current.room])}</p>
            <button type="button" className="rounded-full px-3 py-1 text-sm" onClick={() => setOpen(false)}>
              {locale === "es" ? "Cerrar" : "Close"}
            </button>
          </div>
          <div className="relative min-h-0 flex-1">
            <Image src={current.src} alt={t(locale, current.alt)} fill className="object-contain" sizes="100vw" />
            <button type="button" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-sand/90 px-3 py-2 text-ocean" onClick={() => setIndex((value) => (value - 1 + photos.length) % photos.length)} aria-label={locale === "es" ? "Foto anterior" : "Previous photo"}>
              ‹
            </button>
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-sand/90 px-3 py-2 text-ocean" onClick={() => setIndex((value) => (value + 1) % photos.length)} aria-label={locale === "es" ? "Foto siguiente" : "Next photo"}>
              ›
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto px-4 py-3">
            {rooms.map((room) => (
              <button
                key={room}
                type="button"
                className="shrink-0 rounded-full border border-white/20 px-3 py-1 text-xs"
                onClick={() => setIndex(photos.findIndex((photo) => photo.room === room))}
              >
                {t(locale, roomLabels[room])}
              </button>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
