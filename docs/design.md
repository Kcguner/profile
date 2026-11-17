# Design — profilsite

## Yön
Swiss-minimal / editöryel: bol beyaz alan, ince çizgiler, mono etiketler, tek vurgu rengi. Şablon yok.

## Token (index.html :root)
- bg `#FAFAF7`, card `#FFFFFF`, ink `#101114`, ink-60 `#5C5F66`, **ink-40 `#6B6E75`** (AA düzeltildi), line `#E4E4DE`.
- acc `#2545FF`, acc-soft rgba.
- Dark: bg `#101114`, card `#17181C`, ink `#F2F1EC`, **ink-40 `#8A8C94`** (AA), acc `#7B93FF`.

## Tipografi
- Inter (self-host variable 300-600) + JetBrains Mono (400-500). font-display:block + preload (CLS-free).
- h1 clamp(42-104px) weight300/600; mono kicker/label 11px letter-spacing.

## Kontrast (ölçülmüş)
- ink-40 light 4.88:1 ✓, dark 5.63:1 ✓; ink-60 6.12:1 ✓; acc 5.95:1 ✓; contact p 8.03:1 ✓.

## Motion
- Reveal opacity-only (CLS-free), IntersectionObserver; reduced-motion'da instant + delay0.
- Hover micro-translate kartlarda; poster scale.

## Responsive breakpoint
1000px (grid tek kolon), 900px (burger), 620px (stat/foot), 400px (logo/mail).

## OG kart
images/og-card.png 1200×630, aynı token/tipografi (HTML'den render).