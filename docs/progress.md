# Progress — profilsite (2026-11-18)

| # | Aşama | Durum | Not / kanıt |
|---|---|---|---|
| 0 | ledger init | done | docs/ledger.md |
| 1 | site-audit (read-only) | done | docs/site-audit.md, seo-audit.json |
| 2 | karar toplama | done | fix-now / link-kaldır / EN-ekle / sil / AI-allow / analitik-yok (AskUserQuestion) |
| 3 | SEO head + robots/sitemap + JSON-LD + hreflang | done | index/en head, robots.txt, sitemap.xml |
| 4 | EN sürümü + dil değiştirici | done | en/index.html |
| 5 | JS-off + kontrast + a11y | done | .js gate, ink-40, skip, aria-expanded |
| 6 | kırık link + TR/EN iddiası | done | truereviews GitHub kaldırıldı; gerçek EN |
| 7 | ölü/kopya silme | done | 27 dosya (onaylı) |
| 8 | 404 + gizlilik/privacy + OG | done | 404.html, gizlilik.html, en/privacy.html, og-card.png |
| 9 | perf (reveal + font self-host) | done | perf 98, CLS 0.033 |
| 10 | yeniden denetim + test + Lighthouse | done | dir 0 hata (index/en), test-report, lh-mobile3 |
| 11 | docs suite + gate | done | bu dosya + quality-gate.md |
| 12 | deploy + canlı doğrulama | done | onay "Evet, push et"; commit d26c16e; canlı 200'ler, --url 0 sayfa bulgusu, Lighthouse 97 |
| 13 | içerik: ChessTemper + web-brief2launch + canlı görseller | done | 9 kart; 5 WebP poster (TR+EN); stats 04/09; yerel audit 0 hata; render doğrulandı |

## Onaylar (kayıtlı)
- Düzeltme: "Şimdi düzelt" (2026-11-18).
- Silme: açık dosya-listesi onayı (2026-11-18).
- EN ekleme, AI-allow, analitik-yok: kullanıcı seçimi.
- Deploy: "Evet, push et" (2026-11-18, AskUserQuestion) → commit d26c16e push edildi.

## Auto-advanced
- Rutin stage'ler (3-11) onaylı fix kapsamında auto-advanced; ölçümler ilgili raporlarda.

## Skip
- data-model: static (backend yok).
- form/CSRF/auth/SQL gate maddeleri: N/A.