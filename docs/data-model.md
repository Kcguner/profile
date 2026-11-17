# Data Model — profilsite

**Durum: SKIP (bilinçli).** Statik portföy; backend, veritabanı, API, kullanıcı hesabı veya kalıcı sunucu-verisi yok.

## İstemci-tarafı durum (tek kalıcı öğe)
| Anahtar | Depo | Amaç | Kişisel veri? |
|---|---|---|---|
| `site-theme` | localStorage | light/dark tema tercihi | hayır (işlevsel) |

## İçerik modeli (statik, HTML'de gömülü)
- Project: {ad, yıl/no, açıklama, sonuç, tech[], linkler{canlı?, repo?}, fork?}
- Skill: {ad, alt-etiket, yüzde}
- Step: {no, başlık, açıklama}
- Channel: {tür, url, etiket}

Sunucu şeması/migration/ORM yok → ilgili gate maddeleri N/A.