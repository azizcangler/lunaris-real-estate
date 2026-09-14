# Lunaris Real Estate — Proje Raporu

_Son güncelleme: 14 Eylül 2026 (akşam)_

Dubai merkezli Lunaris Real Estate'in vitrin sitesi. Lovable ile üretildi, Cloudflare Workers'a taşındı ve üç projenin kendi detay sayfası var: The Acres, Athlon ve Damac Islands. Bu dosya projenin genel durumunu, ne yapıldığını ve sırada ne olduğunu özetler. Teknik ayrıntılar ve çalışma kuralları için [`CLAUDE.md`](./CLAUDE.md) dosyasına bakın.

## Canlı ortam

| | |
|---|---|
| Site | https://lunaris-real-estate.aguler2949.workers.dev (14 Eylül sürümü, üç detay sayfası canlı) |
| Yedek adres | https://lunaris.aguler2949.workers.dev (aynı kod, geçici) |
| Repo | https://github.com/azizcangler/lunaris-real-estate (`main`) |
| Eski site | https://lunarisrealestate.com (içerik kaynağı) |

## Teknoloji

TanStack Start 1.168, React 19, Tailwind 4, shadcn/ui. Build Vite 8 + Nitro (cloudflare-module). Ek çalışma zamanı bağımlılığı yok; animasyonlar CSS ve küçük React bileşenleriyle yazıldı.

## Sayfalar

| Route | İçerik |
|---|---|
| `/` | Hero, Living/Investing/Renting seçici, Who we are, öne çıkan 3 proje (The Acres, Athlon, Damac Islands), Why clients choose us, How it works |
| `/portfolio` | 13 projenin tamamı; detay sayfası olanlar karttan detaya gider |
| `/portfolio/the-acres` | **The Acres (Meraas)** detay sayfası |
| `/portfolio/athlon` | **Athlon (Aldar)** detay sayfası |
| `/portfolio/damac-islands` | **Damac Islands (Damac)** detay sayfası |
| `/team`, `/contact` | Kurucular ve iletişim (form WhatsApp / e-posta ile açılır) |
| `/living`, `/investing`, `/renting` | Şablon sayfalar |

## Proje detay sayfaları

Üç sayfa da aynı route'u ve aynı bölüm sırasını kullanır; içerik ve renkler tamamen `src/data/project-details/<slug>.ts` dosyasından gelir. Her sayfanın düğme, link ve işaret renkleri broşürün paletine göre ayarlanır (The Acres yeşil, Athlon erik moru, Damac Islands lagün mavisi). Bölümler yukarıdan aşağıya:

1. **Hero** — Küçük yuvarlatılmış çerçevede kapak görseli; kaydırdıkça çerçeve tam ekrana açılır, kapak ana görsele geçer, başlık ve özet belirir. Zemin kapağın dokusu (Acres taş, Athlon mor mermer/gradyan, Damac turkuaz dalga), açıldıkça sayfa rengine döner.
2. **About + künye** — Tanıtım metni, geliştirici/konum/tip/yatak odası/sertifika bilgileri, broşür indirme ve iletişim butonu. Görselin en-boy oranı veriden gelir; Athlon'da geniş kare (16:9) kırpılmadan gösterilir, diğerlerinde 4:3.
3. **Location** — Site fontuyla etiketlenmiş harita bölümün arka planı; solda metin ve mesafeler. The Acres ve Damac Islands'ta broşürün vektör haritasından üretilen SVG, Athlon'da broşürün raster haritası + vektör etiketler ve işaretçi.
4. **Masterplan** — Sabitlenen sahne; kaydırma 6 maddeyi sırayla ilerletir (Acres sürdürülebilirlik, Athlon aktif yaşam ilkeleri, Damac ada deneyimleri). Solda dikey çizgili gezgin, ortada maddeye ait görsel, sağda metin ve rakamlar.
5. **Key features** — The Acres ve Damac Islands'ta numaralı efsane + illüstre masterplan (tıklanınca tam poster pop-up'ta); Athlon'da başlık altında dört sütunlu (mobilde iki), sade 19 maddelik aktivite listesi.
6. **Gardens / amenities / attractions** — Kart ızgarası: Acres 7 bahçe, Athlon 7 amenity bölgesi, Damac 9 imza cazibe noktası.
7. **Homes** — İki sütunlu boşluksuz ızgara: başlık hücresi, tip hücreleri (hover'da ikinci görsel), iletişim CTA hücresi (tip sayısı tekse tam satır). Hücreye tıklayınca tip detayı diyalogda açılır (görsel şeridi, yatak odası, alan, açıklama, butonlar).
8. **Gallery** — 3 veya 6 görsel.
9. **Material board + developer** — Malzeme listesi ve geliştirici tanıtımı.
10. **CTA** — Dokulu zeminde iletişim, WhatsApp ve broşür bağlantıları.

**Görsel kuralı:** Her sayfada yalnızca o projeye ait, o projenin broşüründen çıkarılmış görseller kullanılır; projeler arası, webden ya da yapay zekâ ile üretilmiş görsel kullanılmaz. Tek istisna kullanıcının kendisinin verdiği grafikler (Athlon kapağı; Damac Islands'ta about görseli ve Island life 01–04 kareleri). 14 Eylül'de üç veri dosyasının tüm görsel import'ları doğrulandı; Athlon'un "About the developer" bölümündeki Aldar marka sayfası binası (Athlon değil) Athlon'un gündüz hava çekimiyle değiştirildi.

### The Acres (Meraas)

60 sayfalık broşürden; 6 villa tipi (A–F), 7 temalı bahçe, LEED Gold. B, D ve C tiplerinin açıklamaları broşürden; A, E ve F tiplerinin açıklamaları renderlara bakılarak yazıldı, yatak odası sayıları bilinmiyor.

### Athlon (Aldar)

75 sayfalık broşürden. Dubailand'de hareket odaklı topluluk: 4,6 km koşu, 2,2 km aile ve 3,7 km bisiklet döngüsü, 7 kulüp binası, LEED Platinum ön sertifikalı, Fitwel sertifikalı. 7 konut tipi: 4-plex townhouse'lar (3–4 yatak), standart 3/4/5 yatak odalı villalar, Premium 4/5/6 yatak odalı villalar (Horizon ve Pillar cepheleri).

- **Hero kapağı** kullanıcının verdiği grafik (mor mermer üstünde Athlon/Aldar logosu); mobildeki dik çerçevede yazı kırpılmasın diye kendi dokusunun bulanık uzantısıyla kare tuvale alındı. Açılınca broşürün gece hava çekimi.
- **Active design (masterplan) görselleri:** 01 döngülerin aydınlatıldığı hava çekimi, 02 kulüp binasının içinden geçen bisikletliler, 03 padel (kullanıcının verdiği kare), 04 villa sokağı, 05 geniş amenity hub hava çekimi (kullanıcının verdiği kare), 06 meditasyon yapan Haaland (kullanıcının verdiği geniş kare). Hepsi Athlon broşürü kaynaklı.
- **Konut tipleri:** 14 Eylül'de her tipin 28 karesi broşür sayfa başlıklarıyla tek tek karşılaştırıldı, tamamı doğru sayfadan. Broşürde tip başına metin yok; tip açıklamaları kat planlarındaki oda etiketlerinden (garaj, hizmetli odası, misafir yatak odası, aile odası, çalışma odası, teras/havuz) yazıldı ve planlarla karşılaştırılarak düzeltildi.
- Mesafeler broşür metninden (DXB 25 dk, Jumeirah Beach 30 dk) ve haritasından (Downtown 30 dk); haritada DXB için 30 dk yazması broşürün kendi içindeki tutarsızlık. Sportif danışmanlar (Haaland, Akanji, Álvarez, Rohit Sharma) masterplan sahnesinin 6. maddesinde anılıyor.

### Damac Islands (Damac)

71 sayfalık broşürden (Kasım 2024 baskısı). Altı ada temalı küme (Maldives, Bora Bora, Seychelles, Hawaii, Bali, Fiji), lagün ve 22 cazibe noktası. 5 konut tipi: 7 yatak odalı LV75E (1.587 m²), 6 yatak odalı LV55E (991 m²) ve DIV3 (412 m²), 5 yatak odalı DITH-E (295 m²) ve 4 yatak odalı DITH-M (205 m²) townhouse'lar; alanlar ve kat sayıları broşürün plan sayfalarından, 14 Eylül'de görsel eşleşmeleri doğrulandı (4 yatak odalı townhouse için tipe özel render yok, genel townhouse kareleri kullanıldı). Kapak broşürün dalga dokulu kapak sayfası (kullanıcı isteğiyle bu hâlde tutuldu). Künyedeki "Current release: Seychelles 2" bilgisi broşürün dosya adından geldi, broşür metninde geçmiyor; doğrulanmalı. Masterplan posteri broşürün 8., 9. ve 55. sayfalarının alt alta birleşimi.

- **Doku (14 Eylül, kullanıcı isteği):** Broşür kapağının turkuaz dalga dokusu (1. ve 71. sayfadaki gömülü raster, logosuz) `cover-texture.jpg` olarak hero sahnesinin arkasında Acres'teki gibi durur, kullanıcı isteğiyle hafif koyulaştırılmış (`coverTextureHeroScrim`: doku solda açık, sağda koyu olduğu için soldan sağa azalan teal gradyan örtü, böylece sağ taraf kararmadan zemin eşit koyulukta); masterplan sahnesi ve CTA'da açık renkli metin okunsun diye daha koyu bir örtü biner (`coverTextureScrim`, %50). Önceki karartılmış su fotoğrafı kaldırıldı.
- **About görseli** kullanıcının verdiği geniş kare (iskelede lagüne bakan kadın), 16:9 kırpılmadan.
- **Island life (masterplan) görselleri:** 01 gün batımında Central Hub Fountain, 02 lagün plajı ve kayaklar, 03 alacakaranlıkta Jungle River, 04 lagün üzerinde zipline; dördü kullanıcının verdiği geniş kareler (`island-*.jpg`), masaüstündeki 4:5 kutuda `position` ile odak ayarlı. 05 Wildlife Park ve 06 yoga platformları broşür kareleri; mobildeki geniş bantta çocuklar ve platformlar görünsün diye `position` ile aşağı alındı.

### Veri ve varlıklar

- `src/data/projects.ts` — proje listesi ve `ProjectDetails` tipi (tema renkleri dahil). İlk üç proje ana sayfada öne çıkanlar.
- `src/data/project-details/the-acres.ts`, `athlon.ts`, `damac-islands.ts` — detay içerikleri.
- `src/assets/projects/<slug>/` — hero, kapak, doku, bölüm görselleri ve harita SVG'si (Acres 34, Athlon 55, Damac 40 görsel; ~12–13 MB/proje).
- `public/brochures/` — `meraas-the-acres.pdf` (23,6 MB'a sıkıştırıldı), `aldar-athlon.pdf` (18,1 MB), `damac-islands.pdf` (20,3 MB). Cloudflare'in dosya başına 25 MiB sınırı içindeler.
- `tools/brochure/` — broşürden görsel çıkarma, kontak tabakası ve harita SVG'si üretme betikleri (Python, PyMuPDF + Pillow). Yeni bir proje eklerken izlenecek yol `CLAUDE.md` içinde.

### Bileşenler

| Dosya | Görev |
|---|---|
| `components/scroll-expand.tsx` | Kaydırmayla açılan hero çerçevesi (kapak → görsel geçişi, doku zemin); görsel/doku/karartma katmanları `will-change` ile GPU katmanı |
| `components/pinned-steps.tsx` | Sabitlenen adım sahnesi; adım ve ilerleme değerlerini verir |
| `components/line-sidebar.tsx` | Dikey çizgili gezgin, fare yakınlığına göre kayan maddeler |
| `components/location-map.tsx` | Inline SVG haritayı basar; `vars` ile proje başına harita renkleri, `cover` ile bölüm arka planı olur |
| `components/project-link.tsx` | Kartı detay sayfasına ya da portföy çapasına bağlar |

## Bilinen notlar

- **Performans (14 Eylül):** Sitenin düşük kare hızında çalıştığı bildirildi. İki müdahale: (1) hero'da her karede ölçeklenen görsel, solan doku ve karartma katmanları ile masterplan sahnesinde kaydırmayla kayan görsel/metin blokları `will-change` ile kompozitör katmanına alındı; (2) karşılaştırma için üretim build'i wrangler ile 8789 portunda sunuldu. Bildirim Vite dev sunucusunda (5180) yapıldıysa esas fark geliştirme modundan geliyor olabilir; üretim adresinde doğrulanması bekleniyor. Chrome eklentisinin sekmesi arka planda sayıldığı için otomatik kare hızı ölçümü yapılamadı. Gerekirse sıradaki adım görsel boyutlarını düşürmek (hero 2000 → 1600 px, sahne görselleri 1300 → 1000 px).
- **8788 portu:** Önceki bir oturumdan kalan `workerd` süreci (PID 54421) eski build'i sunuyor; yeni sayfalar orada görünmez. `kill 54421` ile kapatılabilir.
- **Hosting olayı (13 Eylül):** Ana workers.dev adresi Cloudflare tarafında eski sürümde takılı kaldı; yeni deploy'lar, tetikleyici yenileme, workers.dev kapat/aç ve rollback etkisizdi. Worker silinip aynı adla yeniden kurulunca yaklaşık 10 dakika gecikmeyle düzeldi. Bu sırada açılan `lunaris` yedek worker'ı hâlâ duruyor; gerekirse `npx wrangler delete --name lunaris` ile kaldırılır. Deploy sonrası ana adreste yeni asset hash'ini `curl` ile doğrulamak iyi bir alışkanlık.
- **Tarayıcı:** Brave'de kaydırma farklı hissedildiği bildirildi; Chrome ve Safari'de sorun yok. Shields kapalıyken test edilmesi bekleniyor.
- **Öne çıkanlar:** Ana sayfadaki üçlü The Acres, Athlon, Damac Islands; portföy sayfasında da bu üçü başta. Sıralama `projects.ts` içinden değiştirilir.
- **Durum:** Athlon ve Damac Islands sayfaları ile 14 Eylül düzeltmeleri `c036934` ile commit edilip push edildi ve aynı gün deploy edildi (sürüm `3becbb07`); ana adreste yeni asset hash'leri ve hero düzeltmesi `curl` ile doğrulandı.

## Sırada ne var

1. Canlı sitede kare hızını doğrulamak; takılma sürerse bölüm bazında bakmak ve görsel boyutlarını düşürmek.
2. İçerik doğrulama: Damac "Seychelles 2" bilgisi, Athlon mesafeleri.
3. Villa A/E/F (The Acres) için geliştiriciden yatak odası ve açıklama bilgisi.
4. Özel alan adı bağlanması (workers.dev adresinin yerini alacak).

## Komutlar

```
npm install
npm run dev -- --port 5180       # yerel geliştirme (geliştirme modu, üretimden yavaş)
npm run build                    # .output/ üretir
npx wrangler dev --port 8789     # build sonrası Workers ortamında üretim önizlemesi
npx wrangler deploy              # Cloudflare'a yayınla
npx tsc --noEmit -p tsconfig.json && npx eslint src
```

Repo Lovable'a bağlıdır: force push, rebase ve amend yapılmaz (bkz. `AGENTS.md`).
