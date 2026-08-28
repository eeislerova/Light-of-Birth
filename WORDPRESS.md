# Light of Birth — dokumentace webu

> Název tohoto souboru je historický. Web už není postavený na WordPressu.

## Aktuální řešení

Light of Birth je jednostránková, dvojjazyčná webová aplikace vytvořená pomocí:

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4

Web nevyužívá WordPress, databázi ani administrační rozhraní. Obsah se upravuje přímo ve zdrojových souborech projektu a změny se publikují novým buildem.

## Lokální spuštění

Požadavkem je aktuální LTS verze Node.js a npm.

```bash
npm install
npm run dev
```

Vite po spuštění vypíše lokální adresu webu, obvykle `http://localhost:5173`.

## Produkční build

```bash
npm run build
```

Výsledek se vytvoří ve složce `dist`. Plugin `vite-plugin-singlefile` vloží JavaScript a CSS přímo do souboru `dist/index.html`. Obrázky z adresáře `public/images` zůstávají samostatnými soubory a musí se nasadit společně s HTML.

Lokální kontrola produkčního buildu:

```bash
npm run preview
```

## Struktura projektu

```text
src/
├── App.tsx                 hlavní struktura a chování webu
├── locales.ts             české a anglické texty, služby a kurzy
├── shopConfig.ts          nabídka digitálních průvodců a nákupní odkazy
├── index.css              globální styly a animace
├── main.tsx               vstupní bod aplikace
└── components/
    └── Wordmark.tsx       slovní značka Light of Birth

public/images/             obrázky používané na webu
vite.config.ts             nastavení Vite, Tailwindu a single-file buildu
```

## Úpravy obsahu

### Texty a překlady

České a anglické texty jsou v `src/locales.ts` v objektu `t`:

- `cs` — česká verze
- `en` — anglická verze

Ve stejném souboru jsou také:

- `coursesData` — vzdělání a kurzy v sekci O mně
- `servicesData` — nabídka péče, popisy a ceny

Při přidání nebo změně obsahu je potřeba zkontrolovat obě jazykové varianty.

### Digitální průvodci

Produkty jsou definované v `src/shopConfig.ts` ve funkci `getProducts`. U každého produktu lze upravit název, popis, obsah, formát, cenu a další údaje.

Nákupní tlačítka nyní fungují jako e-mailová poptávka, protože:

```ts
export const wooCommerceEnabled = false;
```

Původní možnost napojení na WooCommerce v souboru zůstává, ale aktuální web na WordPressu ani WooCommerce neběží. Před zapojením skutečných plateb je vhodné nahradit tuto integraci řešením odpovídajícím zvolené prodejní platformě.

### Kontaktní formulář

Formulář v `src/App.tsx` sestaví e-mail a otevře výchozí e-mailovou aplikaci návštěvníka pomocí odkazu `mailto:`. Data se neposílají na vlastní server a nikde se neukládají.

Kontaktní adresa je definovaná na začátku souboru:

```ts
const contactEmail = "kontakt@lightofbirth.cz";
```

### Obrázky

Obrázky se ukládají do `public/images` a v komponentách se používají cestou začínající `/images/`, například:

```tsx
<img src="/images/eliska-o-mne.jpg" alt="Portrét Elišky S." />
```

## Nasazení

Repozitář sám nyní neobsahuje automatický deployment ani konfiguraci konkrétní hostingové služby. Pro publikování je potřeba:

1. spustit `npm run build`,
2. nahrát celý obsah složky `dist` na statický hosting,
3. ověřit, že jsou dostupné také soubory z `dist/images`,
4. zkontrolovat českou i anglickou verzi, odkazy, formulář a mobilní zobrazení.

Web lze provozovat na libovolném statickém hostingu, který servíruje výsledný HTML soubor a assety přes HTTPS.

## Kontrola před publikováním

```bash
npm run build
```

Po úspěšném buildu zkontrolovat zejména:

- přepínání jazyků CZ/EN,
- rozbalování služeb a sekce O mně,
- kontaktní e-mail a obsah formuláře,
- ceny a texty nabídek,
- odkazy v patičce,
- zobrazení na mobilu i počítači.
