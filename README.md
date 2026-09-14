# Lunaris Real Estate — Proje Raporu

_Son güncelleme: 14 Eylül 2026_

Dubai merkezli Lunaris Real Estate'in vitrin sitesi. Lovable ile üretildi, Cloudflare Workers'a taşındı ve son olarak proje detay sayfası altyapısı eklendi. Bu dosya projenin genel durumunu, ne yapıldığını ve sırada ne olduğunu özetler. Teknik ayrıntılar ve çalışma kuralları için [`CLAUDE.md`](./CLAUDE.md) dosyasına bakın.

## Canlı ortam

| | |
|---|---|
| Site | https://lunaris-real-estate.aguler2949.workers.dev |
| Yedek adres | https://lunaris.aguler2949.workers.dev (aynı kod, geçici) |
| Repo | https://github.com/azizcangler/lunaris-real-estate (`main`) |
| Eski site | https://lunarisrealestate.com (içerik kaynağı) |

## Teknoloji

TanStack Start 1.168, React 19, Tailwind 4, shadcn/ui. Build Vite 8 + Nitro (cloudflare-module). Ek çalışma zamanı bağımlılığı yok; animasyonlar CSS ve küçük React bileşenleriyle yazıldı.

## Sayfalar

| Route | İçerik |
|---|---|
| `/` | Hero, Living/Investing/Renting seçici, Who we are, öne çıkan 3 proje, Why clients choose us, How it works |
| `/portfolio` | 11 projenin tamamı; detay sayfası olanlar karttan detaya gider |
| `/portfolio/the-acres` | **The Acres (Meraas) detay sayfası** — aşağıda anlatılıyor |
| `/team`, `/contact` | Kurucular ve iletişim (form WhatsApp / e-posta ile açılır) |
| `/living`, `/investing`, `/renting` | Şablon sayfalar |

## The Acres detay sayfası

İlk proje detay sayfası. İçerik, geliştiricinin 60 sayfalık PDF broşüründen (metin + renderlar + vektör harita) çıkarıldı. Bölümler yukarıdan aşağıya:

1. **Hero** — Küçük yuvarlatılmış çerçevede broşür kapağı; kaydırdıkça çerçeve tam ekrana açılır, kapak lagün render'ına geçer, başlık ve özet belirir. Zemin kapağın taş dokusu, açıldıkça sayfa rengine döner.
2. **About + künye** — Tanıtım metni, geliştirici/konum/tip/yatak odası/sertifika bilgileri, broşür indirme ve iletişim butonu.
3. **Location** — Broşürün 7. sayfasındaki vektör haritadan üretilen, site fontuyla etiketlenmiş SVG harita bölümün arka planı; sol tarafta metin ve mesafeler.
4. **Masterplan (Nature's blueprint)** — Sabitlenen sahne; kaydırma 6 sürdürülebilirlik maddesini sırayla ilerletir. Solda dikey çizgili gezgin (tıklanabilir), ortada maddeye ait görsel, sağda metin ve o maddenin rakamları.
5. **Key features** — Numaralı 11 maddelik efsane ve illüstre masterplan; tıklanınca tam poster pop-up'ta açılır.
6. **Gardens** — 7 temalı bahçe, görsel ve özellik listeleriyle.
7. **Villas** — İki sütunlu boşluksuz ızgara: başlık hücresi, 6 villa tipi hücresi (hover'da ikinci görsel), iletişim CTA hücresi. Hücreye tıklayınca tip detayı (görsel şeridi, yatak odası, açıklama, butonlar) diyalogda açılır.
8. **Gallery** — 3 lagün fotoğrafı.
9. **Material board + Meraas** — Malzeme listesi ve geliştirici tanıtımı.
10. **CTA** — Taş dokulu yeşil zeminde iletişim, WhatsApp ve broşür bağlantıları.

Sayfanın birincil rengi hero yeşiline (`oklch(0.37 0.022 125)`) çekildi; butonlar, linkler ve numaralı işaretler bu renktedir. Diğer sayfalar etkilenmez.

### Veri ve varlıklar

- `src/data/projects.ts` — proje listesi ve `ProjectDetails` tipi.
- `src/data/project-details/the-acres.ts` — detay içeriği. B, D ve C villa tiplerinin açıklamaları broşürden; A, E ve F tiplerinin açıklamaları broşürde olmadığı için renderlara bakılarak yazıldı, yatak odası sayıları bilinmiyor.
- `src/assets/projects/the-acres/` — hero, kapak, doku, bahçe, villa, masterplan görselleri ve harita SVG'si (PDF'ten PyMuPDF ile çıkarıldı).
- `public/brochures/meraas-the-acres.pdf` — 37 MB'lık orijinal, Cloudflare'in 25 MiB sınırı için 23,6 MB'a sıkıştırıldı (metin vektör kaldı).

### Bileşenler

| Dosya | Görev |
|---|---|
| `components/scroll-expand.tsx` | Kaydırmayla açılan hero çerçevesi (kapak → görsel geçişi, doku zemin, piksel hizalı çerçeve) |
| `components/pinned-steps.tsx` | Sabitlenen adım sahnesi; adım ve ilerleme değerlerini verir |
| `components/line-sidebar.tsx` | Dikey çizgili gezgin, fare yakınlığına göre kayan maddeler |
| `components/location-map.tsx` | Inline SVG haritayı basar, `cover` ile bölüm arka planı olur |
| `components/project-link.tsx` | Kartı detay sayfasına ya da portföy çapasına bağlar |

## Bilinen notlar

- **Hosting olayı (13 Eylül):** Ana workers.dev adresi Cloudflare tarafında eski sürümde takılı kaldı; yeni deploy'lar, tetikleyici yenileme, workers.dev kapat/aç ve rollback etkisizdi. Worker silinip aynı adla yeniden kurulunca yaklaşık 10 dakika gecikmeyle düzeldi. Bu sırada açılan `lunaris` yedek worker'ı hâlâ duruyor; gerekirse `npx wrangler delete --name lunaris` ile kaldırılır. Deploy sonrası ana adreste yeni asset hash'ini `curl` ile doğrulamak iyi bir alışkanlık.
- **Tarayıcı:** Brave'de kaydırma farklı hissedildiği bildirildi; Chrome ve Safari'de sorun yok. Shields kapalıyken test edilmesi bekleniyor.
- **Öne çıkanlar:** The Acres listenin başına eklendiği için ana sayfadaki üçlü şu an The Acres, Mercedes-Benz Places, Binghatti Flare. Sıralama `projects.ts` içinden değiştirilir.

## Sırada ne var

1. **ALDAR Athlon** ve **DAMAC Islands – Seychelles 2** için aynı yöntemle detay sayfaları (PDF'ler proje kökünde, repo dışında). İzlenecek adımlar `CLAUDE.md` içinde.
2. Villa A/E/F için geliştiriciden yatak odası ve açıklama bilgisi.
3. Özel alan adı bağlanması (workers.dev adresinin yerini alacak).

## Komutlar

```
npm install
npm run dev                      # yerel geliştirme
npm run build                    # .output/ üretir
npx wrangler dev --port 8788     # build sonrası Workers ortamında önizleme
npx wrangler deploy              # Cloudflare'a yayınla
npx tsc --noEmit -p tsconfig.json && npx eslint src
```

Repo Lovable'a bağlıdır: force push, rebase ve amend yapılmaz (bkz. `AGENTS.md`).
