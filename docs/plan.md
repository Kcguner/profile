# Plan — profilsite denetim + düzeltme (2026-11-18)

Skill sistemi: web-brief2launch (website-master router + stage skills). Bu tur: site-audit → onaylı düzeltmeler → gate.

## Aşamalar ve sıra
1. site-audit (read-only) → docs/site-audit.md + seo-audit.json + ledger. ✔
2. Karar toplama (fix now / kırık link / EN ekle / sil / AI-allow / analitik-yok). ✔
3. SEO head paketi + robots/sitemap + JSON-LD + hreflang. ✔
4. EN sürümü (en/index.html) + dil değiştirici. ✔
5. JS-off görünürlük (.js gate) + kontrast + a11y (skip, aria-expanded). ✔
6. Kırık link kaldır + yanlış TR/EN iddiası → gerçek EN. ✔
7. Ölü/kopya dosya silme (onaylı). ✔
8. 404.html + gizlilik/privacy + OG kart. ✔
9. Perf: reveal opacity-only + font self-host (block+preload). ✔
10. Yeniden denetim (dir) + tarayıcı testleri + Lighthouse. ✔
11. docs suite + quality-gate. (bu adım)
12. Deploy onayı + push + canlı --url/Lighthouse doğrulama. (bekliyor)

## Bağımlılıklar
- 11, 10'un ölçümlerine bağlı; 12, 11 gate PASS + kullanıcı onayına bağlı.

## Riskler
- GH Pages header kısıtı → accepted-risk.
- Canlı ölçüm local proxy'den farklı olabilir → deploy sonrası yeniden.