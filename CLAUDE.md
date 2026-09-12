# Lunaris Real Estate — proje el kitabı

Dubai merkezli Lunaris Real Estate'in vitrin sitesi. Lovable ile üretildi, sonra Cloudflare Workers'a taşındı.

## Canlı ortam
- Site: https://lunaris-real-estate.aguler2949.workers.dev (Cloudflare Workers, worker adı `lunaris-real-estate`)
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
| `/portfolio` | `routes/portfolio.tsx` | 10 projenin tamamı, her kartta render + PDF broşür linki. Kartların `id`si proje slug'ı (ana sayfadan `hash` ile bağlanır) |
| `/team` | `routes/team.tsx` | About Us: kurucular (Erdi Emecan, Halil Utan), Who we are, How it works |
| `/contact` | `routes/contact.tsx` | Adres, telefon, e-posta, WhatsApp; form WhatsApp veya mailto ile açılır (backend yok) |
| `/living` `/investing` `/renting` | `components/editorial-page.tsx` | Şablon sayfalar |

Ortak bileşenler: `components/site-header.tsx` (nav linkleri burada), `components/site-footer.tsx`.

## Veri (içerik burada, sayfalarda hardcode yok)
- `src/data/projects.ts` — `Project` tipi: `slug, name, developer, location, headline, description, image, brochure`. `featuredProjects = projects.slice(0, 3)`.
- `src/data/company.ts` — iletişim bilgileri, sosyal medya, kurucular, Who we are metinleri, strengths, whyChooseUs, howItWorks.

## Varlıklar
- Proje renderları: `src/assets/projects/<slug>.jpg` (Vite import, hash'li URL)
- Kurucu fotoğrafları: `src/assets/team/`
- PDF broşürler: `public/brochures/<slug>.pdf` (toplam ~147 MB; Cloudflare dosya başına 25 MiB sınırı, DWTN 25.7 MB ile sınıra yakın)
- Logo / filigran / hero: `public/images/` — `src/assets/*.asset.json` dosyalarındaki `url` alanı bunlara işaret eder (Lovable'ın asset mekanizması, dokunma)
- Not: eski sitenin proje açıklamaları "..." ile kesikti; mevcut metinler tamamlanmış hâlleri, konum bilgileri geliştirici bilgilerinden eklendi. Doğrulanması gerekiyor.

## Sıradaki iş: proje detay sayfaları
Kullanıcı 3 projeyi tek tek, kendi sayfasında sunmak istiyor (hangi 3 olduğu henüz belirlenmedi; şu an öne çıkanlar ilk 3: Mercedes-Benz Places, Samana Resort, Binghatti Flare... `projects.ts` sırasına göre Mercedes-Benz Places, Binghatti Flare, Samana Resort).

Önerilen yol:
1. `src/routes/portfolio.$slug.tsx` dinamik route (TanStack: `createFileRoute("/portfolio/$slug")`, `loader` ile slug'dan projeyi bul, yoksa `notFound()`).
2. `Project` tipini genişlet: `gallery: string[]`, `highlights`, `unitTypes`, `paymentPlan`, `handover`, `amenities`, `locationNotes` gibi alanlar. İçerik PDF broşürlerden çıkarılabilir (`public/brochures/`).
3. Portfolio kartlarını ve ana sayfadaki öne çıkan kartları `<Link to="/portfolio/$slug" params={{ slug }}>` ile detay sayfasına bağla.
4. Detay sayfasında: hero render, künye (geliştirici, konum, teslim), öne çıkanlar, galeri, broşür indirme, iletişim CTA (`/contact`).
5. Tasarım dili: büyük `font-sans uppercase` başlık + `font-display italic` alt satır, `border-border` çizgileri, `rounded-none` butonlar, kenar boşlukları `px-6 sm:px-10 md:px-16 lg:px-24`. Mevcut sayfalara bak ve aynı ritmi koru.
