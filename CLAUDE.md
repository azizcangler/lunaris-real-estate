# Lunaris Real Estate — proje el kitabı

Dubai merkezli Lunaris Real Estate'in vitrin sitesi. Lovable ile üretildi, sonra Cloudflare Workers'a taşındı.

## Canlı ortam
- Site: https://lunaris-real-estate.aguler2949.workers.dev (Cloudflare Workers, worker adı `lunaris-real-estate`)
  - 2026-09-13: ana workers.dev adresi Cloudflare tarafında 9 Eylül sürümüne (8584efdf) takılı kaldı; yeni deploy'lar API/`deployments list`te %100 görünse de ana adres eski içeriği sunuyor, workers.dev'i kapatmak bile etkilemedi. Sürüm önizleme adresleri (`<versiyon-öneki>-lunaris-real-estate.aguler2949.workers.dev`) yeni içeriği doğru sunuyor. Deploy sonrası `curl` ile ana adreste yeni asset hash'ini doğrula.
- Repo: https://github.com/azizcangler/lunaris-real-estate (branch `main`)
- Eski site (içerik kaynağı): https://lunarisrealestate.com — kopyası `../old-site-reference/` altında (repo dışı)

## Teknoloji
- TanStack Start 1.168 + React 19 + Tailwind 4 + shadcn/ui (`src/components/ui`)
- Build: Vite 8 + Nitro (cloudflare-module preset). `vite.config.ts` Lovable'ın `@lovable.dev/vite-tanstack-config` paketini kullanır, plugin ekleme.
- Dosya tabanlı routing: `src/routes/*.tsx`. `src/routeTree.gen.ts` otomatik üretilir, elle düzenleme. Yeni route eklenince `npm run build` (veya `npm run dev`) ağacı yeniler; o zamana kadar `tsc` "/yeni-yol" tipini tanımaz, bu normaldir.
- Git kuralları: Lovable'a bağlı repo, force push / rebase / amend yapma (bkz. AGENTS.md).

## Komutlar
```
npm install
npm run dev            # yerel geliştirme
npm run build          # .output/ üretir (server + public)
npx wrangler dev --port 8788   # build sonrası Workers ortamında önizleme
npx wrangler deploy    # Cloudflare'a yayınla (wrangler zaten oturum açmış)
npx tsc --noEmit -p tsconfig.json && npx eslint src
git push origin main   # GitHub (keychain kimlik bilgisi mevcut)
```

## Sayfalar
| Route | Dosya | İçerik |
|---|---|---|
| `/` | `routes/index.tsx` | Hero, Living/Investing/Renting seçici, Who we are, öne çıkan 3 proje, Why clients choose us, How it works |
| `/portfolio` | `routes/portfolio.tsx` | 11 projenin tamamı, her kartta render + PDF broşür linki. Kartların `id`si proje slug'ı (ana sayfadan `hash` ile bağlanır). `details` alanı olan projelerde görsel/başlık ve "Explore the project" linki detay sayfasına gider |
| `/portfolio/$slug` | `routes/portfolio_.$slug.tsx` | Proje detay sayfası (dosya adındaki `_` route'u `/portfolio` altına yuvalamamak için). Sadece `details` alanı olan projeler için çalışır, diğerleri `notFound()`. Şu an: `the-acres` |
| `/team` | `routes/team.tsx` | About Us: kurucular (Erdi Emecan, Halil Utan), Who we are, How it works |
| `/contact` | `routes/contact.tsx` | Adres, telefon, e-posta, WhatsApp; form WhatsApp veya mailto ile açılır (backend yok) |
| `/living` `/investing` `/renting` | `components/editorial-page.tsx` | Şablon sayfalar |

Ortak bileşenler: `components/site-header.tsx` (nav linkleri burada), `components/site-footer.tsx`, `components/pinned-steps.tsx` (render-prop: `{active, progress, goTo}`; bölüm yüksekliği `100svh × (1 + count × stepDistance)`, sticky sahne), `components/line-sidebar.tsx` (dikey çizgili sekme listesi; fare yakınlığına göre maddeler `maxShift` kadar kayar, `activeIndex` ile kontrollü kullanılır; detay sayfasının masterplan bölümünde sürdürülebilirlik maddeleri için), `components/scroll-expand.tsx` (detay sayfası hero'su: küçük yuvarlatılmış çerçeve kaydırdıkça tam ekrana açılır; `useWindowScroll` ile sayfaya sabitlenir, `scrollDistance`/`holdDistance` ekran yüksekliği cinsinden; `startWidth/startHeight/startRadius/endRadius/mediaZoom/smoothing/overlayScrim` prop'ları; `coverSrc` verilirse küçük çerçevede kapak görseli durur, büyürken `src`'ye çapraz geçer ve başlık metinleri o sırada belirir (The Acres: broşür 1. sayfası `cover.jpg`, veri `details.cover`); `backdropColor` (veri: `details.coverBackdrop`) küçük çerçevenin arkasındaki sahne rengi, açıldıkça `color-mix` ile `--background`'a döner; `backdropSrc` (veri: `details.coverTexture`, The Acres: `cover-texture.jpg` taş dokusu) sahneye doku bindirir ve açıldıkça solar; easing ease-out, çerçeve ilk pikselden büyümeye başlar; `prefers-reduced-motion` veya `enabled={false}` ise açılmış hâlde statik durur). Dikkat: `position: sticky` kullandığı için üst öğelerde `overflow-x-hidden` olmamalı, bu yüzden detay sayfasının `<main>`inde yok.

## Veri (içerik burada, sayfalarda hardcode yok)
- `src/data/projects.ts` — `Project` tipi: `slug, name, developer, location, headline, description, image, brochure, details?`. `featuredProjects = projects.slice(0, 3)`. `ProjectDetails` tipi de burada (hero, highlights, facts, intro, location, masterplan, keyFeatures, gardens?, villas, gallery, materials?, developer).
- `src/data/project-details/<slug>.ts` — detay sayfası içeriği (şu an `the-acres.ts`). Broşür metinlerinden derlendi, hafif düzenlendi.
- `src/components/project-link.tsx` — `ProjectLink`: `details` varsa `/portfolio/$slug`, yoksa `/portfolio#slug`. Ana sayfa ve portfolio kartları bunu kullanır.
- `src/data/company.ts` — iletişim bilgileri, sosyal medya, kurucular, Who we are metinleri, strengths, whyChooseUs, howItWorks.

## Varlıklar
- Proje renderları: `src/assets/projects/<slug>.jpg` (Vite import, hash'li URL). Detay sayfası galerileri: `src/assets/projects/<slug>/*.jpg` (The Acres: 34 görsel, ~9 MB; PDF sayfalarından PyMuPDF ile çıkarıldı, 1400–2000 px genişlik, JPEG q78)
- Konum haritası: `src/assets/projects/the-acres/location-map.svg` — broşür 7. sayfasındaki vektör haritadan üretildi (PyMuPDF `get_drawings()` yollar/ikonlar, `get_text("dict")` etiketler + dönüş açısı; sadece class + CSS değişkeni kullanır). `?raw` import edilip `components/location-map.tsx` ile inline basılır, renkler orada `--map-ground/--map-ink/--map-water` ile ayarlanır. Veri: `details.location.mapSvg` + `mapCaption`; yoksa `location.image` gösterilir. Konum bölümünde harita arka plandır (`cover` prop'u `preserveAspectRatio=slice` ekler): md+ tüm bölümü kaplar, metin soldaki krem gradyan üzerinde; mobilde 460px'lik alt bant olarak metnin altında durur.
- Kurucu fotoğrafları: `src/assets/team/`
- PDF broşürler: `public/brochures/<slug>.pdf` (toplam ~171 MB; Cloudflare dosya başına 25 MiB sınırı, DWTN 25.7 MB ile sınıra yakın). `meraas-the-acres.pdf` orijinali 37 MB'tı; PyMuPDF `rewrite_images(dpi_target=100, quality=62)` ile 23.6 MB'a indirildi (metin vektör kaldı). Orijinal PDF'ler repo dışında `../` altında.
- Logo / filigran / hero: `public/images/` — `src/assets/*.asset.json` dosyalarındaki `url` alanı bunlara işaret eder (Lovable'ın asset mekanizması, dokunma)
- Not: eski sitenin proje açıklamaları "..." ile kesikti; mevcut metinler tamamlanmış hâlleri, konum bilgileri geliştirici bilgilerinden eklendi. Doğrulanması gerekiyor.

## Proje detay sayfaları (devam eden iş)
Kullanıcı 3 projeyi kendi sayfasında sunmak istiyor. Kaynak PDF'ler repo dışında `../` altında: `MERAAS The Acres.pdf` (bitti), `ALDAR Athlon by Aldar.pdf` (18 MB) ve `DAMAC Damac Islands - Seychelles 2.pdf` (20 MB) sırada.

The Acres için izlenen yol (diğer ikisi için tekrarla):
1. PDF'i oku: `pypdf` ile metin, PyMuPDF (scratchpad'e `pip install --target` ile kuruldu) ile sayfa thumbnail'leri; tam sayfa renderları `get_pixmap`, yarım sayfa görselleri `extract_image` (en büyük gömülü görsel) ile al. Villa/tip sayfalarında altta beyaz başlık bandı olabilir, gömülü görseli kullan veya kırp.
2. `src/data/project-details/<slug>.ts` yaz, `projects.ts`'e `details` ile ekle (The Acres listenin başına eklendi, dolayısıyla ana sayfada öne çıkanlarda; sıralama kullanıcıyla netleşmedi).
3. `gardens` ve `materials` opsiyonel; Athlon/Damac Islands için gerekirse `ProjectDetails` tipine yeni opsiyonel bölüm ekle ve route'ta koşullu render et.
4. Broşür 25 MiB üstündeyse PyMuPDF ile sıkıştır.
5. `npm run build && npx tsc --noEmit -p tsconfig.json && npx eslint src`, sonra `npx wrangler dev --port 8788` ile kontrol. Not: wrangler dev yeni build'i hemen almayabilir, gerekirse yeniden başlat.

Tasarım dili: büyük `font-sans uppercase` başlık + `font-display italic` alt satır, `border-border` çizgileri, `rounded-none` butonlar, kenar boşlukları `px-6 sm:px-10 md:px-16 lg:px-24`. Detay sayfası bölümleri: hero (`ScrollExpand`, overlay header; sahne 0. pikselden sabitlenir) → about + künye → location + mesafeler → masterplan: `PinnedSteps` ile sabitlenen sahne, kaydırma 6 maddeyi tek tek ilerletir (her adım 0.7 ekran), her ekranda solda `LineSidebar` (tıklama ilgili adıma kaydırır), ortada adımın görseli (`pillar.image`), sağda metin + `stats`; mobilde sahne 100svh'a sığacak şekilde sıkı boşluklar, açıklama 3 satıra kırpılır (zemin `details.coverBackdrop` yeşili, metin krem `#efe9dc`) → key features (kullanıcının verdiği illüstre masterplan posteri: `masterplan-plan.jpg` inline + numaralı efsane, tıklayınca `masterplan-poster.jpg` tam boy `Dialog` içinde; veri `details.keyFeaturesMap`, yoksa `keyFeatures` listesi) → gardens grid → villas: shadcnblocks projects15b tarzı iki sütunlu boşluksuz ızgara (ilk hücre başlık, altı villa tipi hücresi 60vh tam görsel + alt sol etiket/başlık, hover'da ikinci görsele geçiş, sekizinci hücre /contact CTA'sı); hücreye tıklayınca shadcn `Dialog` içinde tip detayı (görsel + küçük görsel şeridi, yatak odası, metin, CTA); `villas.items` her tipin `name/bedrooms?/copy/images`; A/E/F metinleri broşürde yok, görsele dayanarak yazıldı → gallery (sade 3'lü lagün ızgarası, `details.gallery`) → materials + developer → CTA.
