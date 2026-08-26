# Light of Birth — nasazení na WordPress a napojení e-shopu

## 1. Doporučená varianta

**WordPress + WooCommerce**, vzhled překlopený do vlastní šablony podle tohoto návrhu.
Obsah (blog, produkty, texty) pak spravuješ přímo ve WordPressu bez zásahu do kódu.

## 2. Co je potřeba nainstalovat

| Plugin | K čemu slouží |
|---|---|
| WooCommerce | e-shop, objednávky, faktury |
| WooCommerce platební brána | Stripe / Comgate / GoPay / PayPal |
| Complianz nebo CookieYes | cookie lišta a GDPR |
| Wordfence | zabezpečení |
| WP Rocket nebo LiteSpeed Cache | rychlost načítání |

## 3. Nastavení digitálních produktů (e-booky)

Pro každého průvodce ve WooCommerce:

1. **Produkty → Přidat nový**
2. Zaškrtnout **Virtuální** a **Ke stažení**
3. Nahrát PDF do pole *Soubory ke stažení*
4. Nastavit *Limit stažení* (např. 3) a *Platnost odkazu* (např. 30 dní)
5. Uložit a poznamenat si **ID produktu** (v URL: `post=123`)

Po zaplacení pošle WooCommerce odkaz ke stažení automaticky e-mailem.

## 4. Propojení tohoto webu s WooCommerce

Vše se nastavuje v jediném souboru: `src/shopConfig.ts`

```ts
export const storeBaseUrl = "https://www.lightofbirth.cz";
export const wooCommerceEnabled = true;   // přepnout na true po spuštění e-shopu
```

A u každého produktu doplnit `productId` z WooCommerce:

```ts
{
  id: "priprava-k-porodu",
  productId: 123,   // ← ID z WooCommerce
  ...
}
```

Tlačítko „Stáhnout“ pak vede na nativní endpoint:

```
https://www.lightofbirth.cz/kosik/?add-to-cart=123
```

Dokud je `wooCommerceEnabled = false`, funguje tlačítko jako objednávka e-mailem
(vhodné pro spuštění webu dřív než e-shopu).

## 5. Platební brána

Doporučené pro ČR:

- **Comgate** nebo **GoPay** — platba kartou i bankovním převodem, české faktury
- **Stripe** — nejjednodušší nastavení, karty a Apple/Google Pay

Nastavení: *WooCommerce → Nastavení → Platby*. Brána se použije automaticky
při dokončení objednávky, v kódu webu se nic dalšího neupravuje.

## 6. Právní stránka e-shopu

Do patičky už vedou odkazy na tři stránky, které je potřeba ve WordPressu vytvořit:

- `/vymezeni-odpovednosti`
- `/zasady-ochrany-osobnich-udaju`
- `/obchodni-podminky`

U prodeje digitálního obsahu je nutné mít v obchodních podmínkách souhlas
se zahájením plnění před uplynutím lhůty pro odstoupení (jinak platí 14denní
lhůta na vrácení).

## 7. Struktura stránek ve WordPressu

```
Úvod                     (šablona podle tohoto návrhu)
Péče                     (balíčky, rozklikávací)
Tradice
O mně
Průvodci                 (WooCommerce Obchod)
  └ detail produktu
Blog
Kontakt
Košík / Pokladna / Můj účet   (vytvoří WooCommerce automaticky)
```

## 8. Formulář a rezervace

- Kontaktní formulář: **Contact Form 7** nebo **WPForms**
- Rezervace úvodního setkání: **Amelia** nebo napojení na **Calendly**
