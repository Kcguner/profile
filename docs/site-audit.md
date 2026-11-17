# Site Denetimi — profilsite (Kcguner/profile)

- **Hedef:** repo `/Users/kaan/Desktop/PROJELER/profilsite` + canlı `https://kcguner.github.io/profile/`
- **Mod:** both (url + dir). Canlı, yerel `index.html` ile bayt-bayt aynı (md5 `7b808238…`), yani yayın güncel.
- **Stack:** statik HTML/CSS/JS, build yok, paket yöneticisi yok. Host: GitHub Pages.
- **Tarih:** 2026-11-18. Salt-okunur denetim; yalnızca `docs/` yazıldı.
- **Yöntem:** `site-audit` router → `seo/scripts/audit.mjs` (url modu), `curl` header/404/robots/sitemap, dış link taraması, tarayıcı konsol + ekran görüntüsü, kontrast hesabı, kaynak okuması, `final-quality-gate/checklist.md` eşlemesi.

Özet: **10 SEO hatası + 2 uyarı (script)**, buna ek olarak kaynak/process düzeyinde hatalar. Aşağıda önem sırasıyla.

---

## ERROR (hata)

### E1 — Canonical yok
- Kanıt: `docs/seo-audit.json` → `canonical-missing`; `index.html` head'de `<link rel="canonical">` yok.
- Etki: Yinelenen içerik (E6) ile birleşince sıralama sinyali bölünür.

### E2 — Open Graph eksik: `og:image`, `og:url`
- Kanıt: `seo-audit.json` → `og-missing` ×2. `index.html:8-10` yalnızca `og:title/description/type` var.
- Etki: Sosyal paylaşımda görsel ve URL yok.

### E3 — Twitter Card tamamen eksik
- Kanıt: `seo-audit.json` → `twitter-missing` ×4 (`card,title,description,image`).
- Etki: X/Twitter paylaşımı önizlemesiz.

### E4 — `robots.txt` 404
- Kanıt: `curl …/robots.txt` → 404; `seo-audit.json` → `robots-not-200`.
- Etki: Sitemap bağlanamıyor; AI-crawler politikası tanımsız (bkz. M6).

### E5 — `sitemap.xml` 404 / boş
- Kanıt: `curl …/sitemap.xml` → 404; `seo-audit.json` → `sitemap-not-200`, `sitemap-empty`.
- Etki: Keşif ve indeksleme sinyali yok.

### E6 — Yinelenen yayınlanmış sayfalar (duplicate content)
- Kanıt: `index-new.html` md5 = `index.html` md5 (birebir kopya) ve canlıda 200. `themes/glmlight2.html` (ve diğer 3 tema) canlıda 200. Hiçbirinde canonical/noindex yok.
- Etki: Aynı içerik 5+ URL'de indekslenebilir; E1 ile birleşince ciddi duplicate-content riski. `script.js`/`style.css` de yayınlanıyor ama kullanılmıyor (bkz. M9).

### E7 — Kırık dış link: truereviews GitHub
- Kanıt: `https://github.com/Kcguner/truereviews` → **404** (diğer 10 link 200). `index.html:389`.
- Etki: Canlı proje kartında ölü link; repo özel/yeniden adlandırılmış olabilir.

### E8 — JS kapalıyken içerik görünmez
- Kanıt: `index.html:261` `.rv{opacity:0}`; görünür olması JS'in `.in` eklemesine bağlı (`index.html:569-590`). `<noscript>` yok (grep=0). 400ms fallback da JS.
- Etki: JS'siz tarayıcı/engelli teknolojisinde hero meta-kart, tüm proje kartları, yöntem adımları **görünmez**. Ham HTML içeriği crawl edilebilir (CSR shell değil) ama görsel olarak gizli.

### E9 — README'de merge-conflict kalıntısı
- Kanıt: `README.md:24` satırında çıplak `=======`.
- Etki: Bozuk markdown; repo vitrini hatalı.

### E10 — Yayınlanan sayfada yanlış özellik iddiası (TR/EN)
- Kanıt: `index.html:357` stat "TR/EN Çift Dil Desteği"; oysa tek `lang="tr"`, dil değiştirici yok, `hreflang` yok, EN sürüm yok.
- Etki: Kullanıcıya yanlış vaat; checklist §10 "meta/sosyal kopya sayfa niyetiyle eşleşir" ihlali.

---

## WARNING (uyarı)

### M1 — Başlık hiyerarşisi atlıyor: H2 → H4
- Kanıt: `seo-audit.json` → `heading-skip`; `#yontem` `h2` (index.html:527) → `.step h4` (index.html:531-534), H3 yok.

### M2 — JSON-LD / Schema.org yok
- Kanıt: `seo-audit.json` → `jsonld-missing`. Portföy için `Person`/`ProfilePage` beklenir.

### M3 — Güvenlik başlıkları eksik (platform kısıtı)
- Kanıt: `curl -sI` → HSTS var ✓, HTTP→HTTPS 301 ✓; ama **CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options/frame-ancestors yok**.
- Not: GitHub Pages özel header ayarlatmaz. Bu bir platform kısıtı; `accepted-risk` olarak yazılı kaydedilmeli veya meta-CSP ile kısmi mitigasyon değerlendirilmeli.

### M4 — Kontrast WCAG AA altında
- Kanıt (hesap): `--ink-40 #9A9DA5` / `#FAFAF7` = **2.59:1**; dark `#6E7078`/`#101114` = **3.82:1**. Küçük mono etiketlerde kullanılıyor (kicker, stat span, `.shead .r`, `.mrow dt`, `.yr`, footer). Normal metin için ≥4.5:1 gerekir.
- Geçenler: `--ink-60` 6.12:1 ✓, `--acc` 5.95:1 ✓, contact p 8.03:1 ✓.

### M5 — Özel 404 sayfası yok
- Kanıt: olmayan URL → 404 ✓ ama GitHub varsayılan 404'ü; repo'da `404.html` yok. Siteye dönüş/nav yok → "recovery" sağlamıyor (checklist §6).

### M6 — AI-crawler politikası kayıtlı değil
- Kanıt: robots.txt yok → GPTBot/ClaudeBot/PerplexityBot/Google-Extended varsayılan allow. Skill bunu "sessiz varsayılan olamaz, kayıtlı kullanıcı kararı" sayıyor. Karar + gerekçe `docs/seo-report.md`'ye yazılmalı.

### M7 — Hukuk/izin metinleri yok
- Kanıt: footer'da privacy/KVKK/cookie linki yok; `docs/legal-review.md` yok. Google Fonts (3. taraf, IP gider) + `localStorage` tema tercihi var. İletişim formu yok (mailto/Gmail linki) ama yine de aydınlatma/privacy önerilir.

### M8 — Performans: LCP görseli optimize değil + render-blocking font
- Kanıt: `images/profile.jpg` 1024×1024, **204KB JPEG**, ~440px dairede gösteriliyor; WebP/AVIF değil, `width/height` yok (aspect-ratio CLS'i koruyor ✓). Google Fonts CSS render-blocking, 7+ağırlık.
- Not: Lighthouse koşulmadı (bkz. Yapılmayanlar).

### M9 — Ölü kod / kullanılmayan varlıklar yayınlanıyor
- Kanıt: `script.js` (739 satır) + `style.css` (2062 satır) `index.html` tarafından referans edilmiyor (eski site). 21 görselin 20'si kullanılmıyor (yalnız `profile.jpg`). `.poster[data-live]` JS handler'ı ölü (data-live yok). `themes/*.html` taslak.
- Etki: Repo şişkinliği, yanlış izlenim, bakım yükü; canlıda gereksiz erişilebilir dosyalar.

### M10 — README bayat (eski siteyi anlatıyor)
- Kanıt: README particle canvas, Formspree form, i18n, proje modalı, "Kendisibir Mekan / Crypto Scan / Simple CV Maker" anlatıyor; mevcut `index.html`'de bunların hiçbiri yok (projeler truereviews/tweetalgo/git-to-portfolio/…). E9 ile birlikte README yeniden yazılmalı.

### M11 — Süreç dokümanları eksik (release gate FAIL)
- Kanıt: `docs/` yalnız `seo-audit.json` (+ bu denetimde eklenen `ledger.md`, `site-audit.md`). `final-quality-gate/checklist.md` §1'in istediği `brief, plan, progress, ia, design, frontend-report, seo-report, performance-report, security-report, legal-review, test-report, deployment, monitoring, quality-gate` yok.
- Etki: Mevcut haliyle release gate **FAIL**.

### M12 — Erişilebilirlik: skip-link ve aria-expanded yok
- Kanıt: skip-link yok; `#burger` (index.html:321) `aria-label` var ama `aria-expanded`/`aria-controls` yok; mobil menü durumu ekran okuyucuya bildirilmiyor.

### M13 — İzleme/analitik yok
- Kanıt: analytics/uptime/error-tracking kodu yok; `docs/monitoring.md` yok. Search Console doğrulaması bilinmiyor.

---

## INFO

- I1 — `target="_blank"` linklerin çoğunda `rel="noopener"` yok (`.plink`, `.mail`, footer). Modern tarayıcılar implicit noopener uygular; düşük risk ama tutarlılık için eklenebilir.
- I2 — Repo hijyeni: `.gitignore` tracked değil; `.claude/`, `agent/`, `skills-lock.json`, `index-scrollcraft.html` ignore edilmiyor/untracked. `.agents/`, `scrollcraft/`, `.DS_Store` ignore ✓.
- I3 — `index-scrollcraft.html` (166KB) yerel orphan, yayınlanmıyor; kararsız taslak.
- I4 — Tek H1 ✓, `lang="tr"` ✓, title 44 karakter ✓, description ~120 ✓, konsol temiz ✓ (error/warn yok), secret taraması temiz ✓, HTTP→HTTPS tek 301 ✓, canlı=yerel ✓.
- I5 — İletişim "formu" artık form değil, kanal linkleri (Gmail compose, GitHub, Instagram, X). README/form varsayımları güncellenmeli (M10).

---

## Yapılmayan kontroller (neden + manuel adım)

| Kontrol | Neden | Manuel adım |
|---|---|---|
| Lighthouse mobile perf (LCP/CLS/INP) | koşulmadı | `npx lighthouse https://kcguner.github.io/profile/ --preset=perf --output=json --output-path=docs/perf.json` |
| `npm audit` | lockfile/package.json yok (statik) | gerek yok; bağımlılık yok |
| Schema rich-results doğrulama | JSON-LD hiç yok | E/M2 düzeltilince validator ile doğrula |
| Keyword/hacim analizi | GSC/Trends export yok | **assumption — not verified with data**; GSC Performance CSV iste |
| Cross-browser (2 tarayıcı) | tek tarayıcı (in-app Chromium) | Safari + Firefox spot check |
| Klavye-only tam akış | koşulmadı | Tab ile nav→menu→tema→link turu |
| 360/390/768px viewport | tek ~806px screenshot | üç genişlikte ekran görüntüsü |
| Özel güvenlik header'ı | GH Pages header ayarlatmaz | M3 accepted-risk kararı veya meta-CSP |
| Search Console doğrulama | erişim yok | property verify + launch baseline |

---

## Önerilen düzeltme sırası

1. **SEO head paketi** (E1,E2,E3,M2): canonical + og:image/url + twitter card + `Person` JSON-LD. Tek batch, sonra `audit.mjs` ile doğrula.
2. **robots.txt + sitemap.xml** (E4,E5) + AI-crawler kararı (M6).
3. **Duplicate temizliği** (E6): `index-new.html` sil veya canonical/noindex; `themes/` yayından kaldır (noindex veya taşı).
4. **Kırık link** (E7): truereviews repo URL'ini doğrula/düzelt.
5. **JS-off görünürlük** (E8): `.rv` için `<noscript>` fallback veya CSS'i JS-varsayılan-görünür yap.
6. **Yanlış iddia + README** (E9,E10,M10): TR/EN stat'ını kaldır ya da gerçek i18n ekle; README'yi yeniden yaz, `=======` sil.
7. **Kontrast + a11y** (M4,M12): `--ink-40` koyulaştır, skip-link + `aria-expanded`.
8. **404.html** (M5), **görsel/font opt** (M8), **ölü kod temizliği** (M9).
9. **Süreç dokümanları** (M11,M7,M13): brief/plan/progress/seo-report/legal-review/monitoring/deployment/quality-gate üret → release gate'i yeniden koştur.

---

## Düzeltme kararı

- **Durum:** ONAYLANDI + UYGULANDI (2026-11-18). Denetim salt-okunurdu; düzeltmeler kullanıcı onayından sonra yapıldı.
- Seçilen yol: **(a) şimdi düzelt (doğrudan)**.
- Kullanıcı kararları (AskUserQuestion):
  - truereviews kırık GitHub linki → **kaldırıldı**.
  - TR/EN sahte istatistik → **gerçek EN dil desteği eklendi** (`en/index.html`, karşılıklı hreflang).
  - Ölü/kopya dosyalar → **silindi** (27 dosya; tam listeyle açık onay: "Evet, bu listeyi sil").
  - AI crawler (GPTBot/ClaudeBot/PerplexityBot/Google-Extended) → **İZİN VER** (robots.txt'e yorumla işlendi).
  - Analitik → **YOK** (bilinçli karar; docs/monitoring.md).
- Sonuç: index/en/gizlilik/privacy dir-audit 0 bulgu; Lighthouse mobile perf 98, CLS 0.033, LCP 2.4s, TBT 0, third-party=[].
- **Deploy/push:** ayrı açık onay bekliyor (skill kuralı: "Deploy always needs explicit recorded human approval"). Henüz commit/push yok.
- Kalan manuel + deploy kalemleri: `docs/quality-gate.md`.