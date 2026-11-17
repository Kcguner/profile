# SEO Raporu — kcguner.github.io/profile

Tarih: 2026-11-18 · Mod: dir (temiz build kopyası `/tmp/pf-build`) + canlı url denetimi (deploy sonrası).
Makine çıktısı: `docs/seo-audit.json` (dir), `docs/seo-audit-live.json` (canlı).

## Canlı denetim (deploy sonrası, --url https://kcguner.github.io/profile/)
- 4 sayfa (`/`, `/en/`, `/gizlilik.html`, `/en/privacy.html`): **0 bulgu**, hepsi 200. `/en` → `/en/` tek 301.
- `noindexPages: []` (404 crawl edilmedi; zaten noindex). Orphan yok, deep-page yok, click-depth ≤2.
- **site.errors ×3 = platform kısıtı (accepted-risk):** script ve crawler'lar robots/sitemap'i **domain kökünde** (`kcguner.github.io/robots.txt`) okur; bu bir GitHub Pages **proje** sitesi (`/profile/` alt yolu). Kök robots/sitemap bu repodan servis edilemez (404). Alt yoldaki `/profile/robots.txt` ve `/profile/sitemap.xml` **200** ve doğru içerikli, ancak crawler'lar alt yol robots'unu dikkate almaz.
  - Etkin politika: kökte engelleyici robots olmadığı için **varsayılan ALLOW** geçerli (aiAccess gptbot/claudebot/perplexitybot/google-extended = true, googlebotAllowed = true). Yani AI-crawler ALLOW kararı fiilen sağlanıyor.
  - Sitemap: Google Search Console'a **manuel submit** edilebilir (alt yol sitemap'i GSC'de kabul edilir); bu zaten manuel kalemdir.
  - Kalıcı çözüm istenirse: kök site (`kcguner.github.io`) reposuna robots/sitemap eklemek veya özel domain/host'a geçmek (karar bekliyor).
- **site.warnings ×2 = nav-only-links:** gizlilik/privacy yalnız footer'dan linkli. Yasal sayfalar için normal/kabul edilebilir; contextual link zorunlu değil.

## Otomatik denetim sonucu (dir, düzeltmeler sonrası)
- `/index.html`: **0 bulgu** (title, description, canonical, H1, OG, Twitter, JSON-LD tamam).
- `/en/index.html`: **0 bulgu**.
- `/gizlilik.html`, `/en/privacy.html`: 0 hata, 0 uyarı (OG+Twitter+JSON-LD eklendi).
- `/404.html`: hatalar **kabul edildi** — sayfa bilinçli `noindex` (aşağıda).
- `site.errors`: dir-modunda `sitemap-url-not-found` ×4 → **dir-modu artefaktı** (mutlak URL vs `/tmp/pf-build` kökü). Canlı `--url` denetiminde sayfa bazında 0 bulgu doğrulandı; canlı site.errors kök-domain robots/sitemap kısıtına indirgendi (yukarıda).

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
- Canlı linkGraph: orphan yok, deep-page yok. Ana sayfa ↔ EN contextual (contextualInbound 1'er). Gizlilik/privacy yalnız footer (nav-only uyarısı, yasal sayfalar için kabul). Click-depth ≤2.

## Redirect
- HTTP→HTTPS tek 301 (GitHub Pages). ✓

## Kalan / manuel
- ~~Canlı --url denetimi~~ ✓ yapıldı (0 sayfa bulgusu; kök robots/sitemap kısıtı accepted-risk).
- Sitemap'i GSC'ye manuel submit + kök robots/sitemap için host/domain kararı (istenirse).
- Schema rich-results online doğrulama (JSON-LD parse ✓; online validator manuel).
- GSC export ile keyword gerçekleme.