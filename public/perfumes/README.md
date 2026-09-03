# Perfume images

Drop product images here, then run `npm run map-images` from the project root.

**Naming** — name each file by the perfume's **id** or its **name**:

- `2.jpg` → perfume id 2 (Creed Aventus)
- `Creed Aventus.png` → matched by name (case/space insensitive)
- `aventus.webp` → also matches

Supported formats: `jpg`, `jpeg`, `png`, `webp`, `avif`, `gif`.

`map-images` writes the id → `/perfumes/<file>` mapping into
`src/data/perfumeImages.json`, which the cards read automatically. Perfumes
without an image keep their gradient. Run `npm run map-images` with an empty
folder to print the full id → perfume reference list.

Tip: **square-ish images on a light/neutral background** look best — the card
crops to fill and overlays text with a dark scrim at the edges.
