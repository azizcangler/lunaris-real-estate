# Broşür araçları

Proje detay sayfaları için geliştirici PDF'lerinden görsel ve harita üretmekte kullanılan Python betikleri. Bağımlılıklar: `pymupdf` (PyMuPDF) ve `Pillow`; `pip install --target <dir> pymupdf pillow` ile kurup `PYTHONPATH=<dir>` ile çalıştırın. Yollar (kaynak PDF, çıktı klasörü) her betiğin başında sabit; yeni bir proje için kopyalayıp düzenleyin.

| Betik | Ne yapar |
|---|---|
| `contact_sheets.py <pdf> <outdir>` | Sayfaları 12'li kontak tabakaları hâlinde JPEG'e döker (görsel seçimi için). |
| `image_inventory.py <pdf>` | Sayfa başına gömülü görselleri (xref, boyut, konum) listeler. |
| `extract_images.py athlon\|damac` | `(ad, sayfa, xref \| "page" \| clip, genişlik)` listesine göre görselleri `src/assets/projects/<slug>/` altına JPEG q78 olarak yazar. |
| `damac_islands_map.py` | Broşürün vektör harita sayfasından `location-map.svg` üretir (yollar, ikonlar, işaretçi; yol adları `textPath` ile). |
| `athlon_map.py` | Raster harita + vektör etiketler/işaretçiler için `location-map.svg` sarmalayıcısı üretir (`__MAP_IMAGE__` placeholder'ı veri dosyasında hash'li JPEG URL'siyle değişir). |
| `svg_preview.py <svg> <png> [image]` | Sınıf/`var()` tabanlı SVG'yi düz niteliklere çevirip PyMuPDF ile PNG önizleme üretir. |
