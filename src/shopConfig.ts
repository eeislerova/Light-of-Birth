/**
 * ---------------------------------------------------------------------------
 * NASTAVENÍ E-SHOPU / WooCommerce
 * ---------------------------------------------------------------------------
 * Až se web nasadí na WordPress s WooCommerce, stačí upravit tento soubor.
 *
 * 1) `storeBaseUrl` – adresa webu s WooCommerce (bez lomítka na konci).
 * 2) `productId`    – ID produktu ve WooCommerce (Produkty → najeď myší na
 *                     produkt, ID je vidět v URL: post=123).
 * 3) `downloadUrl`  – nepovinné; přímý odkaz na ukázku PDF.
 *
 * Tlačítko „Koupit“ pak vede na:
 *   https://web.cz/kosik/?add-to-cart=123
 * což je nativní WooCommerce endpoint. Platební brána (Stripe, GoPay,
 * Comgate, PayPal) se nastavuje ve WooCommerce → Nastavení → Platby a
 * automaticky se použije při dokončení objednávky.
 *
 * Digitální produkty: u produktu zaškrtni „Ke stažení“ + „Virtuální“,
 * nahraj PDF a WooCommerce pošle odkaz ke stažení automaticky po zaplacení.
 */

export const storeBaseUrl = "https://www.lightofbirth.cz";

/** true = e-shop běží na WooCommerce, false = poptávka e-mailem (prototyp) */
export const wooCommerceEnabled = false;

export type Product = {
  id: string;
  productId: number;
  type: string;
  title: string;
  text: string;
  /** delší popis zobrazený po rozkliknutí */
  detail: string;
  /** co průvodce obsahuje */
  contents: string[];
  format: string;
  price: string;
  cover: string;
  downloadUrl?: string;
};

export const getProducts = (lang: "cs" | "en"): Product[] => {
  return [
    {
      id: "priprava-k-porodu",
      productId: 101,
      type: "E-book",
      title: lang === "cs" ? "Příprava k porodu bez strachu" : "Fearless Birth Preparation",
      text: lang === "cs"
        ? "Praktický průvodce fyziologií porodu, dechem, polohami a přípravou porodního přání."
        : "A practical guide to birth physiology, breathing, positions, and birth plan preparation.",
      detail: lang === "cs"
        ? "Průvodce, který vás krok za krokem provede přípravou na porod. Vysvětluje, co se v těle děje, jak si vytvořit klidné porodní prostředí a jak komunikovat svá přání."
        : "A guide that walks you step-by-step through birth preparation. It explains what happens in the body, how to create a calm birth environment, and how to communicate your wishes.",
      contents: lang === "cs"
        ? [
            "fyziologie a jednotlivé fáze porodu",
            "dech, pohyb a porodní polohy",
            "přirozené možnosti úlevy",
            "informované rozhodování a komunikace se zdravotníky",
            "šablona porodního přání",
          ]
        : [
            "physiology and stages of labor",
            "breathing, movement, and birth positions",
            "natural pain relief options",
            "informed decision-making and communication with healthcare providers",
            "birth plan template",
          ],
      format: lang === "cs" ? "PDF · 48 stran · okamžité stažení" : "PDF · 48 pages · instant download",
      price: "390 Kč",
      cover: "bg-gradient-to-br from-[#e8c9a4] to-[#c58958]",
    },
    {
      id: "sestinedeli",
      productId: 102,
      type: "E-book",
      title: lang === "cs" ? "Šestinedělí v teple a klidu" : "Postpartum in Warmth and Peace",
      text: lang === "cs"
        ? "Ájurvédsky inspirovaný průvodce prvními 42 dny, výživou, odpočinkem a regenerací."
        : "An Ayurvedically-inspired guide to the first 42 days, nutrition, rest, and regeneration.",
      detail: lang === "cs"
        ? "Průvodce obdobím prvních 42 dní po porodu vycházející z principů ájurvédské poporodní péče. Zaměřuje se na teplo, odpočinek, výživu a postupnou regeneraci ženy."
        : "A guide to the first 42 days postpartum, based on Ayurvedic postpartum care principles. It focuses on warmth, rest, nutrition, and the gradual regeneration of the woman.",
      contents: lang === "cs"
        ? [
            "principy ájurvédské poporodní péče",
            "poporodní výživa a vhodné koření",
            "recepty na prvních šest týdnů",
            "odpočinek, teplo a regenerace",
            "praktická příprava domácnosti před porodem",
          ]
        : [
            "principles of Ayurvedic postpartum care",
            "postpartum nutrition and suitable spices",
            "recipes for the first six weeks",
            "rest, warmth, and regeneration",
            "practical household preparation before birth",
          ],
      format: lang === "cs" ? "PDF · 56 stran · okamžité stažení" : "PDF · 56 pages · instant download",
      price: "390 Kč",
      cover: "bg-gradient-to-br from-[#dcc7b0] to-[#a9714b]",
    },
    {
      id: "porodni-prani",
      productId: 103,
      type: "Pracovní list",
      title: lang === "cs" ? "Porodní přání krok za krokem" : "Birth Plan Step by Step",
      text: lang === "cs"
        ? "Strukturovaný list, který vás provede tvorbou vlastního porodního přání."
        : "A structured worksheet that guides you through creating your own birth plan.",
      detail: lang === "cs"
        ? "Vyplnitelný pracovní list, se kterým si srozumitelně sepíšete svá přání pro porod i první chvíle s miminkem."
        : "A fillable worksheet to help you clearly write down your wishes for the birth and the first moments with your baby.",
      contents: lang === "cs"
        ? [
            "otázky k promyšlení před porodem",
            "přehled běžných intervencí",
            "prostor pro vlastní přání",
            "verze k tisku i k vyplnění v počítači",
          ]
        : [
            "questions to consider before birth",
            "overview of common interventions",
            "space for your own wishes",
            "print version and digital fillable version",
          ],
      format: lang === "cs" ? "PDF · 8 stran · vyplnitelné" : "PDF · 8 pages · fillable",
      price: "190 Kč",
      cover: "bg-gradient-to-br from-[#f0dcc0] to-[#cf9a6d]",
    },
  ];
};

/** Odkaz pro nákup – WooCommerce add-to-cart, nebo e-mailová poptávka. */
export function buyUrl(product: Product, fallbackEmail: string) {
  if (wooCommerceEnabled) {
    return `${storeBaseUrl}/kosik/?add-to-cart=${product.productId}`;
  }

  return `mailto:${fallbackEmail}?subject=${encodeURIComponent(
    `Objednávka: ${product.title}`
  )}&body=${encodeURIComponent(
    `Dobrý den,\n\nmám zájem o průvodce „${product.title}“ (${product.price}).\n\nDěkuji.`
  )}`;
}
