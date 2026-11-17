# SEO Raporu — kcguner.github.io/profile

Tarih: 2026-11-18 · Mod: dir (temiz build kopyası `/tmp/pf-build`) + önceki url denetimi.
Makine çıktısı: `docs/seo-audit.json`.

## Otomatik denetim sonucu (dir, düzeltmeler sonrası)
- `/index.html`: **0 bulgu** (title, description, canonical, H1, OG, Twitter, JSON-LD tamam).
- `/en/index.html`: **0 bulgu**.
- `/gizlilik.html`, `/en/privacy.html`: 0 hata, 0 uyarı (OG+Twitter+JSON-LD eklendi).
- `/404.html`: hatalar **kabul edildi** — sayfa bilinçli `noindex` (aşağıda).
- `site.errors`: yalnız `sitemap-url-not-found` ×4 → **dir-modu artefaktı** (sitemap mutlak `kcguner.github.io/profile/…` URL'leri, build kökü `/tmp/pf-build`; yol öneki eşleşmiyor). Canlı `--url` denetiminde doğrulanacak (deploy sonrası).

## Düzeltilen bulgular (önceki url denetiminden)
| Bulgu | Düzeltme | Kanıt |
|---|---|---|
| canonical-missing | `<link rel=canonical>` her sayfaya | index.html head |
| og-missing (image,url) | og:image (1200×630 og-card.png) + og:url | head |
| twitter-missing ×4 | summary_large_image + title/desc/image | head |
| robots-not-200 | robots.txt eklendi | robots.txt |
| sitemap-not-200/empty | sitemap.xml 4 URL + hreflang | sitemap.xml |
| heading-skip H2→H4 | `.step h4`→`h3` | index.html, en/index.html |
| jsonld-missing | ProfilePage/Person (ana), WebPage (yasal) | head |

## Keyword / hacim analizi
**assumption — not verified with data.** GSC/Trends export yok. Hedef kitle: işveren/müşteri (TR+EN), "vibe coder", "portföy", "web geliştirici İstanbul" varsayımsal. Manuel adım: GSC Performance CSV alıp gerçek hacimle güncelle.

## robots.txt / AI-crawler politikası (KAYITLI KARAR)
- Karar: **ALLOW** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended), 2026-11-18, kullanıcı onayı.
- Gerekçe: portföy görünürlüğü + AI arama/cevaplarında yer alma; gizli içerik yok.
- `User-agent: *` Allow:/; Googlebot engelsiz (`googlebotAllowed:true`). Sitemap bağlı.

## noindex listesi (bilinçli)
- `/404.html` — hata sayfası, indekslenmemeli. SEO hataları (meta/OG/canonical yok) bu nedenle kabul edildi.

## hreflang / dil
- TR `/` ↔ EN `/en/` karşılıklı + `x-default` → `/`. sitemap'te xhtml:link. `lang` tr/en doğru. Dil değiştirici nav'da.

## İç link / orphan
- Tek sayfa + yasal sayfalar; footer'dan gizlilik linki (contextual). Orphan yok (dir-modunda linkGraph yok; canlıda doğrulanacak). Click-depth ≤1.

## Redirect
- HTTP→HTTPS tek 301 (GitHub Pages). ✓

## Kalan / manuel
- Canlı `--url` denetimi deploy sonrası (sitemap verified, linkGraph, robots 200).
- Schema rich-results online doğrulama (JSON-LD parse ✓; online validator manuel).
- GSC export ile keyword gerçekleme.