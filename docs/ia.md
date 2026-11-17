# IA — kcguner.github.io/profile

## URL envanteri (canonical)
| URL | Dil | Tür | Click-depth |
|---|---|---|---|
| `/profile/` | tr | home (tek sayfa) | 0 |
| `/profile/en/` | en | home (tek sayfa) | 1 |
| `/profile/gizlilik.html` | tr | yasal | 1 |
| `/profile/en/privacy.html` | en | yasal | 1 |
| `/profile/404.html` | tr+en | hata (noindex) | — |

## Sayfa içi anchor'lar (home)
`#main` (hero), `#projeler`, `#yetenek`, `#yontem`, `#iletisim`. Nav + skip-link bunlara bağlanır.

## hreflang
tr `/` ↔ en `/en/`, x-default `/`. Karşılıklı; sitemap xhtml:link.

## Dahili link
- home → gizlilik (footer, contextual).
- home ↔ en (nav dil değiştirici).
- gizlilik ↔ privacy (hreflang + back link).
- Orphan yok. Derinlik ≤1 (gate ≤3 ✓).

## Dış link
- 3 canlı proje + 4 repo + GitHub/IG/X profil + mailto/Gmail. (truereviews GitHub 404 kaldırıldı.)

## Yayınlanmayan (repo-only)
- scrollcraft/, .agents/, docs/, assets/ build kaynağı; index-scrollcraft.html taslak (publish edilmez).