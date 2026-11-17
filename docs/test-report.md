# Test Raporu — kcguner.github.io/profile

Tarih: 2026-11-18 · Ortam: yerel statik sunucu `http://localhost:8734/` (repo kökü), Playwright/Chromium.
Script: `scrollcraft/lab/pf-test.js`, `pf-test2.js` (gitignore'lu lab).

## Geçen kontroller (ölçülmüş)
| Kontrol | Sonuç | Kanıt |
|---|---|---|
| Konsol hatası (TR + EN) | 0 error / 0 warn | pf-test console.tr=[], console.en=[] |
| Yatay overflow 360/390/768/1280 (TR) | 0 px | overflow.tr_* = 0 |
| Yatay overflow 360/390/768 (EN) | 0 px | overflow.en_* = 0 |
| Skip-link ilk Tab | ✓ `.skip` "İçeriğe geç" | pf-test2 firstTab |
| Skip-link hedefi | `#main` | pf-test2 skipTarget |
| Reduced-motion reveal | opacity 1 | pf-test2 reducedRvOpacity=1 |
| Focus ring | UA outline auto/1px | pf-test2 focusOutline |
| Tema toggle | light→dark ✓ | checks.theme.toggled=true |
| Dil TR→EN→TR | `/en/` lang=en, `/` lang=tr ✓ | checks.lang / langBack |
| JS-off içerik görünür | `.js` class yok, içerik görünür | jsoff.png + jsOffHasJsClass=false |
| 404 sayfası render | başlık doğru | checks.page404Title |
| Form submit/validate | N/A (form yok, kanal linkleri) | — |

## Ana kullanıcı yolculuğu
home → projeler (canlı site linkleri 200) → yetenek → yöntem → iletişim (kanal) → footer gizlilik. ✓ (link taraması: truereviews GitHub 404 kaldırıldı, diğerleri 200).

## Yapılmayan / manuel
- Cross-browser (2 major): yalnız Chromium koşuldu → Safari + Firefox spot check manuel.
- Klavye-only tam akış: skip+focus doğrulandı; tam Tab turu manuel.
- 500 sayfası: statik host'ta controlled (GH Pages) — leak yok.
- Regresyon testleri: otomatik suite yok; bu scriptler manuel yeniden koşulabilir.
- Canlı 404 recovery (GH Pages 404.html servisi): deploy sonrası doğrulanacak.