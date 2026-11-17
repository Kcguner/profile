# Monitoring — kcguner.github.io/profile

Tarih: 2026-11-18 · Sahip: Kaan Can Güner (kcguner@gmail.com).

## Bilinçli kararlar
- **Analitik YOK** (2026-11-18, kullanıcı onayı). Çerez yok, consent gerekmez, KVKK yükü minimum.
- Error tracking / uptime: şu an provision edilmedi (statik, düşük risk). Aşağıda manuel kurulum adımları.

## Mevcut durum
| Öğe | Durum | Not |
|---|---|---|
| Uptime check | yok | manuel: UptimeRobot/BetterStack home `/` + `/en/` |
| Error tracking | yok | statik; JS hatası izleme istenirse Sentry (release tag) |
| Analytics | yok (karar) | conversion event N/A |
| Cert/domain expiry | GitHub yönetimli | github.io cert auto-renew; özel domain yok |
| Backup | git repo = kaynak yedeği | restore = git checkout; test tarihi manuel |
| Search Console | verify edilmedi | manuel: property verify + sitemap submit + launch baseline |

## Bakım takvimi (öneri)
- Aylık: dış link taraması (proje kartları), `audit.mjs --url` yeniden, bağımlılık yok.
- Çeyrek: Lighthouse mobile yeniden, kontrast/a11y spot, legal metin gözden geçirme.
- Yıl: KVKK aydınlatma güncelle, counsel review.

## Runbook (kısa)
- Site down: GitHub Pages status → status.github.com; repo son commit kontrol; rollback `git revert`.
- Kırık link: link taraması 404 → kart linkini güncelle/kaldır.
- Yanlış içerik: index.html / en/index.html düzenle → push → 10 dk cache.
- Font bozuk: assets/fonts/*.woff2 yolu + @font-face unicode-range kontrol.

## Kalan / manuel
- Uptime + alert kur ve test et.
- Search Console verify + baseline ölçüm (sahip: Kaan).
- Backup restore testi tarihle.