# Güvenlik Raporu — kcguner.github.io/profile

Tarih: 2026-11-18 · Kanıt: `curl -sI https://kcguner.github.io/profile/`, kaynak taraması.

## Transport / header
| Header | Durum | Not |
|---|---|---|
| HTTPS everywhere | ✓ | HTTP→HTTPS tek 301 |
| HSTS | ✓ | max-age=31556952 |
| Content-Security-Policy | ✗ | GH Pages özel header ayarlatmaz |
| X-Content-Type-Options | ✗ | aynı platform kısıtı |
| Referrer-Policy | ✗ | aynı |
| Permissions-Policy | ✗ | aynı |
| Frame protection (XFO/frame-ancestors) | ✗ | aynı |

**Accepted-risk (platform):** GitHub Pages statik host'u özel response header'ı desteklemez. CSP/XCTO/Referrer/Permissions/frame-ancestors eksikliği platform kısıtı olarak yazılı kabul edildi (2026-11-18). Kısmi mitigasyon: fontlar self-host edildiği ve dış betik/analitik olmadığı için meta-CSP artık kolayca eklenebilir (inline stil için 'unsafe-inline' veya hash gerekir); şu an uygulanmadı. Risk: düşük (statik, form/auth/veri yok, üçüncü-taraf istek yok).

## Bağımlılık / secret
- `npm audit`: **uygulanamaz** — package.json/lockfile yok (statik site, sıfır bağımlılık).
- Secret taraması: temiz (api_key/secret/token/password pattern yok, index/script/style/themes).
- Client bundle'da gömülü secret yok.

## Uygulama yüzeyi (statik)
- Auth/oturum/CSRF/SQL/rate-limit: **yok** (backend yok, form yok). İlgili gate maddeleri N/A.
- İletişim = dış kanal linkleri (mailto/Gmail, GitHub, IG, X); veri toplanmaz.
- `target=_blank` linklere `rel=noopener` eklendi (tabnabbing mitigasyonu).
- localStorage yalnız tema (`site-theme`); kişisel veri/secret yok.
- Hata sayfası 404.html stack trace/iç yol sızdırmaz.
- Admin/debug route yok.

## Kalan / manuel
- Header'lar için host değişikliği (ör. Cloudflare Pages/Netlify) istenirse CSP+XCTO+Referrer+Permissions+frame-ancestors eklenebilir (karar bekliyor).
- Secret taraması repo geçmişi için: `git log -p | grep -iE 'key|secret'` manuel (tarihçe temiz varsayımı).