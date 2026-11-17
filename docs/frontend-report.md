# Frontend Raporu — profilsite

Tarih: 2026-11-18 · Stack: statik HTML + inline CSS + vanilla JS (build yok, framework yok, bağımlılık yok).

## Yapı
- `index.html` (TR) + `en/index.html` (EN): tek dosya, inline `<style>` + `<script>`. Self-host font @font-face.
- `gizlilik.html` / `en/privacy.html`: bağımsız yasal sayfalar (system font stack).
- `404.html`: iki dilli hata sayfası (noindex).
- `assets/fonts/*.woff2` (4), `images/{profile.webp, profile.jpg(master), og-card.png}`.

## Erişilebilirlik (ölçülmüş / düzeltilmiş)
- Skip-link ilk Tab ✓ → `#main`.
- Kontrast AA: ink-40 light 4.88 / dark 5.63 ✓.
- `aria-expanded`+`aria-controls` burger; `aria-label` tema/dil/poster.
- reduced-motion: reveal instant, delay0 ✓ (opacity 1).
- Focus ring UA auto/1px ✓.
- JS-off: `.js` class gate → içerik görünür ✓ (jsoff.png).
- Tek H1; heading hiyerarşisi düzeltildi (h2→h3).

## Responsive (ölçülmüş)
- Yatay overflow 0 @ 360/390/768/1280 (TR) ve 360/390/768 (EN).
- Breakpoint 1000/900/620/400; burger 900px.

## Etkileşim (test edilmiş)
- Tema toggle light↔dark + localStorage ✓.
- Dil TR↔EN karşılıklı ✓.
- IntersectionObserver reveal + skill bar; 400ms fallback.
- Konsol 0 error (TR+EN) ✓.

## Bilinen sınırlar
- Cross-browser yalnız Chromium; Safari/Firefox manuel.
- Klavye tam tur manuel (skip+focus doğrulandı).
- Form yok (kanal linkleri) → form validation N/A.