# Deployment — kcguner.github.io/profile

Tarih: 2026-11-18 · Host: GitHub Pages, repo `Kcguner/profile`, branch `main`, kök dizin (build yok).

## Süreç
- Statik site: derleme adımı yok; `main` kökü doğrudan servis edilir.
- Deploy = `git push origin main` → GitHub Pages otomatik yayın (~1-2 dk).
- **Deploy açık insan onayı gerektirir** (skill kuralı). Şu an: ONAY BEKLİYOR (bu turda push yapılmadı).
- Cache: GitHub Pages `cache-control: max-age=600` (10 dk) + Fastly; invalidation = süre dolması veya yeni commit.

## Ortamlar
- Production: https://kcguner.github.io/profile/
- Staging/preview: yerel `python3 -m http.server 8734` (repo kökü). GH Pages için ayrı staging yok; PR preview istenirse Actions eklenebilir.
- Reproducible build: temiz checkout = aynı dosyalar (build yok) ✓.

## Rollback
- `git revert <commit>` + push (ileri-yönlü geri alma). Prosedür: son commit'i revert et, push, 10 dk cache bekle.
- Rehearsal: **yapılmadı** (manuel; revert bir kez denenip doğrulanmalı).

## CI / pipeline
- Yok. Test blocking pipeline yok → manuel test-report + gate koşulu. İstenirse GH Actions (lint+link+audit) eklenebilir.

## DNS / cert
- github.io alt alan adı; cert GitHub yönetimli, auto-renew ✓. Apex/www N/A.
- Env var: yok (statik); repo'da secret yok ✓.

## Launch / monitoring baseline
- Search Console property verify: **manuel** (docs/monitoring.md sahibi).
- Launch window: kullanıcı onayıyla.

## Kalan / manuel
- Deploy onayı + push.
- Rollback rehearsal.
- Canlı `--url` SEO denetimi + canlı Lighthouse (deploy sonrası).
- Search Console verify + baseline.