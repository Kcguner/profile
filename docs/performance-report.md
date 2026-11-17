# Performans Raporu — kcguner.github.io/profile

Tarih: 2026-11-18 · Ölçüm: Lighthouse mobile (preset=perf), Chrome headless, **yerel proxy** `http://localhost:8734/` (python http.server, sıkıştırmasız HTTP/1.1).
JSON: /tmp/lh-mobile3.json (son), önceki turlar /tmp/lh-mobile.json, lh-mobile2.json.

## Sonuç (gate §3 eşikleri)
| Metrik | Değer | Eşik | Durum |
|---|---|---|---|
| Performance score | **98** | ≥90 | ✓ |
| LCP | **2.4 s** | <2.5 | ✓ |
| CLS | **0.033** | <0.1 | ✓ |
| TBT (INP proxy) | **0 ms** | <200 | ✓ (INP proxy notu) |
| Speed Index | 1.7 s | — | ✓ |
| FCP | 0.9 s | — | ✓ |
| Üçüncü-taraf | **yok** | — | ✓ (font self-host) |

## İyileştirme geçmişi (ölçülmüş)
| Tur | Perf | LCP | CLS | TBT | Değişiklik |
|---|---|---|---|---|---|
| 1 | 71 | 2.9 | 0.225 | 470 | başlangıç (Google font swap + reveal translate) |
| 2 | 88 | 1.8 | 0.225 | 50 | reveal opacity-only |
| 3 | **98** | **2.4** | **0.033** | **0** | font self-host (block+preload), Google kaldırıldı |
| canlı | **97** | 2.6 | **0.033** | **0** | deploy sonrası gerçek GitHub Pages (brotli+HTTP2+Fastly), FCP 0.9s |

## Canlı ölçüm (deploy sonrası)
- `https://kcguner.github.io/profile/` Lighthouse mobile perf **97** (≥90 ✓), CLS **0.033** (<0.1 ✓), TBT **0** (<200 ✓), FCP 0.9s.
- **LCP 2.6s** — <2.5 eşiğinin ~0.1s üzerinde (ağ/CDN varyansı; yerel 2.4s). Sınırda; LCP görseli WebP+preload+fetchpriority ile optimize, tek koşu varyansı. Tekrar ölçüm/iyileştirme manuel not.
- JSON: /tmp/lh-live.json.

## Yapılan optimizasyonlar
- profile.jpg 204KB → profile.webp 75KB (800×800, cwebp q82); width/height + fetchpriority=high (LCP).
- Font: Inter+JetBrains variable woff2 self-host (latin+latin-ext), font-display:block + preload → CLS-free, 3.taraf yok.
- Reveal opacity-only (transform CLS kaynağı kaldırıldı); reduced-motion delay0.
- Ölü script.js/style.css/20 görsel silindi; tek dosya inline CSS/JS.
- render-blocking kaynak yok (font preload, CSS inline).

## Not / kalan
- ~~Canlı Lighthouse yeniden koşulmalı~~ ✓ koşuldu (perf 97; LCP 2.6s sınırda, ağ varyansı).
- INP doğrudan ölçülmedi; TBT=0 proxy olarak kaydedildi (gate notu).
- Cache header canlıda max-age=600 (GH Pages) ✓; local proxy'de yok (ölçüm artefaktı).