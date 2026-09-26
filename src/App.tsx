import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react";
import Wordmark from "./components/Wordmark";
import { buyUrl, getProducts } from "./shopConfig";
import { t, coursesData, servicesData, type Lang } from "./locales";
import { legalDocuments, type LegalDocument } from "./legalContent";
import { legalDocumentsEn } from "./legalContentEn";

type InquiryForm = {
  name: string;
  email: string;
  care: string;
  message: string;
};

const initialForm: InquiryForm = {
  name: "",
  email: "",
  care: "",
  message: "",
};

type Service = (typeof servicesData)[Lang][number];

// Keep the guides ready for a future launch without showing the shop or its navigation links.
const showGuides = false;

function LegalPage({ document: legalDocument, lang }: { document: LegalDocument; lang: Lang }) {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = `${legalDocument.title} | Light of Birth`;
    return () => { document.title = "Light of Birth"; };
  }, [legalDocument]);

  return (
    <main className="min-h-screen bg-[#fff9f0] text-[#493226]">
      <header className="border-b border-[#d8b797] px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6">
          <a href="#" aria-label={lang === "cs" ? "Light of Birth, úvodní stránka" : "Light of Birth, home page"}>
            <Wordmark size="clamp(1.05rem, 2.4vw, 1.5rem)" inkClassName="text-[#493226]" accentClassName="text-[#b66d45]" />
          </a>
          <a href="#" className="text-sm font-semibold uppercase tracking-[0.14em] text-[#7a4628] underline decoration-[#d8b797] underline-offset-8">
            {lang === "cs" ? "Zpět na hlavní stránku" : "Back to home page"}
          </a>
        </div>
      </header>

      <article ref={pageRef} className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-sm uppercase tracking-[0.24em] text-[#a0693f]">Light of Birth</p>
        <h1 className="mt-4 font-serif text-5xl uppercase leading-tight tracking-[-0.03em] text-[#493226] sm:text-6xl">{legalDocument.title}</h1>
        <div className="mt-10 space-y-2 border-b border-[#d8b797] pb-10 text-base leading-7 text-[#73513d]">
          {legalDocument.intro.map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}
        </div>

        <div className="mt-12 space-y-12">
          {legalDocument.sections.map((section, index) => (
            <section key={`${index}-${section.heading ?? "text"}`}>
              {section.heading ? <h2 className="font-serif text-3xl leading-tight text-[#493226]">{section.heading}</h2> : null}
              <div className={`${section.heading ? "mt-5" : ""} space-y-4 text-base leading-8 text-[#73513d]`}>
                {section.paragraphs.map((paragraph, paragraphIndex) => <p key={`${paragraphIndex}-${paragraph}`}>{paragraph}</p>)}
                {section.bullets ? (
                  <ul className="space-y-3 pl-1">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c58958]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-14 border-t border-[#d8b797] pt-6 text-sm font-semibold uppercase tracking-[0.12em] text-[#7a4628]">{legalDocument.updated}</p>
      </article>

      <footer className="bg-[#2f211b] px-5 py-8 text-sm text-[#d8c2ac] sm:px-8">
        <nav className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-7" aria-label="Právní dokumenty">
          <a className="underline underline-offset-4 hover:text-[#fff8ee]" href="#vymezeni-odpovednosti">{t[lang].footer.links.liability}</a>
          <a className="underline underline-offset-4 hover:text-[#fff8ee]" href="#ochrana-osobnich-udaju">{t[lang].footer.links.privacy}</a>
          <a className="underline underline-offset-4 hover:text-[#fff8ee]" href="#obchodni-podminky">{t[lang].footer.links.terms}</a>
          <a className="underline underline-offset-4 hover:text-[#fff8ee]" href="#zasady-pouzivani-cookies">{t[lang].footer.links.cookies}</a>
        </nav>
      </footer>
    </main>
  );
}

export default function App() {
  const isComDomain = window.location.hostname.toLowerCase().endsWith(".com");
  const [lang, setLang] = useState<Lang>(() =>
    isComDomain ? "en" : "cs"
  );
  const locale = t[lang];
  const domainEnding = isComDomain ? "com" : "cz";
  const contactEmail = `${lang === "cs" ? "kontakt" : "contact"}@lightofbirth.${domainEnding}`;

  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [openProduct, setOpenProduct] = useState<string | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hash, setHash] = useState(() => window.location.hash.slice(1));

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash.slice(1));
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  // Initialize form with the translated default care string
  const [form, setForm] = useState<InquiryForm>({
    ...initialForm,
    care: locale.contact.serviceDefault,
  });
  const [submitted, setSubmitted] = useState(false);

  const changeLanguage = (nextLang: Lang) => {
    setForm((current) => {
      const selectedIndex = servicesData[lang].findIndex((service) => service.title === current.care);
      return {
        ...current,
        care: selectedIndex >= 0
          ? servicesData[nextLang][selectedIndex].title
          : t[nextLang].contact.serviceDefault,
      };
    });
    setLang(nextLang);
  };

  const updateField =
    (field: keyof InquiryForm) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
      setSubmitted(false);
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = [
      `${locale.contact.name}: ${form.name}`,
      `${locale.contact.email}: ${form.email}`,
      `${locale.contact.service}: ${form.care}`,
      "",
      form.message,
    ].join("\n");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      locale.contact.subject
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const chooseService = (service: Service) => {
    setForm((current) => ({ ...current, care: service.title }));
  };

  const legalDocument = (lang === "en" ? legalDocumentsEn : legalDocuments)[hash];
  if (legalDocument) return <LegalPage document={legalDocument} lang={lang} />;

  const serviceDetail = (service: Service, detailId: string) => (
    <div id={detailId} className="grid gap-8 bg-[#fbf3e8] px-5 pb-10 pt-8 md:grid-cols-[0.35fr_0.65fr] md:px-8 md:pb-12">
      <p className="text-sm uppercase tracking-[0.2em] text-[#a0693f]">{locale.care.detailLabel}</p>
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
        <div>
          <p className="max-w-2xl text-lg leading-8 text-[#73513d]">{service.detail}</p>
          {"detailNote" in service && service.detailNote ? (
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#8a5e42]">{service.detailNote}</p>
          ) : null}
          <div className="mt-8 space-y-8">
            {service.sections.map((section) => (
              <div key={section.heading}>
                <h4 className="font-serif text-2xl text-[#493226]">{section.heading}</h4>
                <ul className="mt-4 grid gap-x-8 gap-y-3 text-[#73513d] sm:grid-cols-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-7">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c58958]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 border-t border-[#cfa989] pt-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#7a4628]">{service.summary}</p>
        </div>
        <div className="border-t border-[#cfa989] pt-5 lg:min-w-52 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="text-sm uppercase tracking-[0.2em] text-[#a0693f]">
            {"priceLabel" in service ? service.priceLabel : locale.care.investment}
          </p>
          <p className="mt-2 font-serif text-3xl text-[#493226]">{service.price}</p>
          {"priceCondition" in service ? (
            <>
              <p className="mt-2 max-w-52 text-sm leading-6 text-[#8a5e42]">{service.priceCondition}</p>
              <p className="mt-4 max-w-52 text-sm leading-6 text-[#73513d]">
                {service.laterPriceLabel} <strong className="font-semibold text-[#493226]">{service.laterPrice}</strong>
              </p>
            </>
          ) : null}
          <p className="mt-2 max-w-52 text-sm leading-6 text-[#8a5e42]">{service.priceNote}</p>
          <a
            href="#kontakt"
            onClick={() => chooseService(service)}
            className="mt-7 inline-flex rounded-full bg-[#493226] px-5 py-3 text-center text-xs font-semibold uppercase leading-5 tracking-[0.12em] text-[#fff8ee] transition hover:-translate-y-0.5 hover:bg-[#6b442f]"
          >
            {locale.care.cta}
          </a>
          <p className="mt-3 max-w-52 text-xs leading-5 text-[#8a5e42]">{locale.care.ctaNote}</p>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf3e8] text-[#463329]">
      <header className="absolute left-0 top-0 z-30 w-full px-5 py-5 sm:px-8 lg:px-12">
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between text-[#fff8ee]">
          <a href="#uvod" onClick={() => setMobileMenuOpen(false)} className="group flex items-center gap-3" aria-label="Light of Birth domů">
            <Wordmark
              size="clamp(1rem, 2.2vw, 1.35rem)"
              inkClassName="text-[#fff8ee]"
              accentClassName="text-[#e6a179]"
            />
          </a>
          <div className="hidden items-center gap-6 text-sm tracking-[0.16em] uppercase sm:flex lg:gap-8">
            <a className="transition hover:text-white" href="#pece">{locale.nav.care}</a>
            <a className="transition hover:text-white" href="#tradice">{locale.nav.tradition}</a>
            <a className="transition hover:text-white" href="#o-mne">{locale.nav.about}</a>
            {showGuides && <a className="transition hover:text-white" href="#shop">{locale.nav.guides}</a>}
            <a className="transition hover:text-white" href="#kontakt">{locale.nav.contact}</a>
            <div className="ml-4 flex gap-3 text-xs tracking-[0.2em]">
              <button onClick={() => changeLanguage("cs")} className={`transition ${lang === "cs" ? "font-bold text-white" : "text-white/50 hover:text-white/80"}`}>CZ</button>
              <span className="text-white/20">|</span>
              <button onClick={() => changeLanguage("en")} className={`transition ${lang === "en" ? "font-bold text-white" : "text-white/50 hover:text-white/80"}`}>EN</button>
            </div>
          </div>
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="relative z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-[#2d1a12]/20 backdrop-blur-sm transition hover:border-white sm:hidden"
          >
            <span className="sr-only">{mobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}</span>
            <span aria-hidden="true" className="relative block h-4 w-5">
              <span className={`absolute left-0 top-0.5 h-px w-5 bg-current transition duration-300 ${mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] h-px w-5 bg-current transition duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[13px] h-px w-5 bg-current transition duration-300 ${mobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>

          <div
            id="mobile-navigation"
            className={`absolute right-0 top-14 w-[min(19rem,calc(100vw-2.5rem))] origin-top-right rounded-2xl border border-white/20 bg-[#3b251b]/95 p-6 shadow-2xl backdrop-blur-md transition duration-300 sm:hidden ${
              mobileMenuOpen ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-95 opacity-0"
            }`}
          >
            <div className="flex flex-col text-sm uppercase tracking-[0.16em]">
              {[
                ["#pece", locale.nav.care],
                ["#tradice", locale.nav.tradition],
                ["#o-mne", locale.nav.about],
                ...(showGuides ? [["#shop", locale.nav.guides]] : []),
                ["#kontakt", locale.nav.contact],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-white/15 py-4 transition hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-4 text-xs tracking-[0.2em]">
              <button onClick={() => { changeLanguage("cs"); setMobileMenuOpen(false); }} className={`transition ${lang === "cs" ? "font-bold text-white" : "text-white/50 hover:text-white/80"}`}>CZ</button>
              <span className="text-white/20">|</span>
              <button onClick={() => { changeLanguage("en"); setMobileMenuOpen(false); }} className={`transition ${lang === "en" ? "font-bold text-white" : "text-white/50 hover:text-white/80"}`}>EN</button>
            </div>
          </div>
        </nav>
      </header>

      <section id="uvod" className="relative flex min-h-screen items-end px-5 pb-16 pt-28 sm:px-8 lg:px-12 lg:pb-24">
        <img
          src={isComDomain ? "/images/light-of-birth-hero.jpg" : "/images/light-of-birth-hero-europe-v2.jpg"}
          alt={lang === "cs" ? "Těhotná žena s dulou v měkkém denním světle" : "A pregnant woman with her doula in soft daylight"}
          className="animate-hero-drift absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2d1a12]/80 via-[#5b3826]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d1a12]/70 via-transparent to-[#2d1a12]/25" />
        <div className="relative z-10 mx-auto w-full max-w-7xl text-[#fff8ee]">
          <div className="max-w-4xl">
            <div className="animate-rise-one relative inline-block">
              <Wordmark
                as="h1"
                size="clamp(2.1rem, 7.2vw, 5.6rem)"
                inkClassName="text-[#fff8ee]"
                accentClassName="text-[#e8a077]"
              />
            </div>
            <div className="animate-rise-two mt-8 max-w-none font-light text-[#f7e6d4]/90">
              <p className="whitespace-nowrap text-[clamp(0.72rem,1.45vw,1.25rem)] leading-relaxed">
                {locale.hero.line1}
              </p>
            </div>
            <div className="animate-rise-three mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center rounded-full bg-[#fff8ee] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#4b2d20] transition duration-500 hover:-translate-y-1 hover:bg-white"
              >
                {locale.hero.btn1}
              </a>
              <a
                href="#pece"
                className="inline-flex items-center justify-center rounded-full border border-white/55 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#fff8ee] transition duration-500 hover:-translate-y-1 hover:border-white hover:bg-white/10"
              >
                {locale.hero.btn2}
              </a>
            </div>
            <p className="animate-rise-three mt-5 max-w-xl text-sm leading-6 text-[#f7e6d4]/85">
              {locale.hero.capacity}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <p className="animate-line-draw border-b border-[#b48660] pb-5 text-sm uppercase tracking-[0.24em] text-[#8a5e42]">
            {locale.space.eyebrow}
          </p>
          <div>
            <h2 className="max-w-4xl font-serif text-5xl leading-tight tracking-[-0.04em] text-[#493226] sm:text-6xl lg:text-7xl">
              {locale.space.title}
            </h2>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#73513d]">
              {locale.space.text}
            </p>
          </div>
        </div>
      </section>

      <section id="pece" className="bg-[#fff9f0] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-[#a0693f]">{locale.care.eyebrow}</p>
            <h2 className="mt-4 font-serif text-5xl leading-tight tracking-[-0.04em] text-[#493226] sm:text-6xl">
              {locale.care.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#73513d]">
              {locale.care.text}
            </p>
            <p className="mt-5 text-sm uppercase tracking-[0.18em] text-[#a0693f]">{locale.care.note}</p>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {[0, 1, 5].map((serviceIndex, pathIndex) => {
              const service = servicesData[lang][serviceIndex];
              const isExpanded = expandedService === serviceIndex;
              const detailId = `service-detail-${serviceIndex}`;
              const isFeatured = pathIndex === 1;

              return (
                <article
                  key={service.title}
                  className={`overflow-hidden rounded-[1.75rem] border transition duration-500 ${
                    isFeatured
                      ? "border-[#b9784e] bg-[#f8eadc] shadow-[0_20px_55px_rgba(122,70,40,0.14)]"
                      : "border-[#dfc4aa] bg-[#fbf3e8]"
                  } ${isExpanded ? "lg:col-span-3" : ""}`}
                >
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={detailId}
                    onClick={() => setExpandedService(isExpanded ? null : serviceIndex)}
                    className="flex w-full flex-col p-7 text-left sm:p-8"
                  >
                    <div className="flex min-h-7 items-start justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a0693f]">{locale.care.paths[pathIndex]}</p>
                      {isFeatured ? (
                        <span className="rounded-full bg-[#a7663f] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#fff8ee]">
                          {locale.care.mostPopular}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-7 font-serif text-3xl leading-tight text-[#493226] sm:text-4xl">{service.title}</h3>
                    <p className="mt-4 flex-1 text-base leading-7 text-[#73513d]">{locale.care.pathSummaries[pathIndex]}</p>
                    <div className="mt-7 flex items-end justify-between gap-4 border-t border-[#d8b797] pt-5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#a0693f]">{locale.care.investment}</p>
                        <p className="mt-1 font-serif text-3xl text-[#493226]">{service.price}</p>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#cfa989] text-[#7a4628]">
                        <span className={`text-xl transition-transform duration-500 ${isExpanded ? "rotate-45" : ""}`}>+</span>
                      </span>
                    </div>
                  </button>
                  {isExpanded ? serviceDetail(service, detailId) : null}
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <a href="#kontakt" className="inline-flex rounded-full bg-[#493226] px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#fff8ee] transition hover:-translate-y-1 hover:bg-[#6b442f]">
              {locale.care.cta}
            </a>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#8a5e42]">{locale.care.ctaNote}</p>
          </div>

          <div className="mt-20 border-t border-[#d8b797] pt-14">
            <div className="max-w-3xl">
              <h3 className="font-serif text-4xl text-[#493226] sm:text-5xl">{locale.care.extendedTitle}</h3>
              <p className="mt-5 text-lg leading-8 text-[#73513d]">{locale.care.extendedText}</p>
            </div>

            {(() => {
              const service = servicesData[lang][2];
              const isExpanded = expandedService === 2;
              const detailId = "service-detail-2";
              return (
                <article className="mt-10 overflow-hidden rounded-2xl border border-[#dfc4aa] bg-[#fbf3e8]">
                  <button type="button" aria-expanded={isExpanded} aria-controls={detailId} onClick={() => setExpandedService(isExpanded ? null : 2)} className="grid w-full gap-6 p-7 text-left md:grid-cols-[1fr_auto] md:items-center md:p-9">
                    <div>
                      <h4 className="font-serif text-3xl text-[#493226]">{service.title}</h4>
                      <p className="mt-3 text-base leading-7 text-[#73513d]">{service.summary}</p>
                    </div>
                    <div className="flex items-center justify-between gap-6 md:justify-end">
                      <div className="md:text-right">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a0693f]">{service.priceLabel}</p>
                        <p className="mt-1 font-serif text-3xl text-[#493226]">{service.price}</p>
                        <p className="mt-1 max-w-xs text-sm leading-6 text-[#8a5e42]">{service.priceCondition}</p>
                        <p className="mt-2 text-sm leading-6 text-[#73513d]">
                          {service.laterPriceLabel} <strong className="font-semibold text-[#493226]">{service.laterPrice}</strong>
                        </p>
                      </div>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#cfa989] text-[#7a4628]">
                        <span className={`text-xl transition-transform duration-500 ${isExpanded ? "rotate-45" : ""}`}>+</span>
                      </span>
                    </div>
                  </button>
                  {isExpanded ? serviceDetail(service, detailId) : null}
                </article>
              );
            })()}

            <div className="mt-8 grid gap-7 xl:grid-cols-2">
              {[3, 4].map((serviceIndex) => {
                const service = servicesData[lang][serviceIndex];
                const isExpanded = expandedService === serviceIndex;
                const detailId = `service-detail-${serviceIndex}`;
                return (
                  <article key={service.title} className={`overflow-hidden rounded-[1.75rem] border border-[#cda480] bg-[#f8eadc] shadow-[0_18px_50px_rgba(122,70,40,0.1)] ${isExpanded ? "xl:col-span-2" : ""}`}>
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={detailId}
                      onClick={() => setExpandedService(isExpanded ? null : serviceIndex)}
                      className="flex w-full flex-col p-7 text-left sm:p-9"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a0693f]">{locale.care.premiumLabel}</p>
                      <h4 className="mt-4 font-serif text-4xl leading-tight text-[#493226]">{service.title}</h4>
                      <p className="mt-2 font-serif text-xl text-[#7a4628]">{service.subtitle}</p>
                      <p className="mt-6 flex-1 text-base leading-7 text-[#73513d]">{service.text}</p>
                      <div className="mt-7 flex items-end justify-between gap-5 border-t border-[#cfa989] pt-6">
                        <div>
                          <p className="font-serif text-3xl text-[#493226]">{service.price}</p>
                          <p className="mt-2 text-sm leading-6 text-[#8a5e42]">{service.priceNote}</p>
                        </div>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#cfa989] text-[#7a4628]">
                          <span className={`text-xl transition-transform duration-500 ${isExpanded ? "rotate-45" : ""}`}>+</span>
                        </span>
                      </div>
                    </button>
                    {isExpanded ? serviceDetail(service, detailId) : null}
                  </article>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <a href="#kontakt" className="inline-flex rounded-full border border-[#a0693f] px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#7a4628] transition hover:-translate-y-1 hover:bg-[#f8eadc]">
                {locale.care.cta}
              </a>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#8a5e42]">{locale.care.ctaNote}</p>
            </div>
          </div>
          <div className="mt-10 grid gap-4 border-t border-[#d8b797] pt-7 text-sm leading-6 text-[#8a5e42] md:grid-cols-2 md:gap-10">
            <p>{locale.footer.disclaimer1}</p>
            <p>{locale.footer.disclaimer2}</p>
          </div>
        </div>
      </section>

      <section id="tradice" className="relative px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(244,190,117,0.28),transparent_32%),radial-gradient(circle_at_85%_70%,rgba(177,91,56,0.12),transparent_34%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#a0693f]">{locale.tradition.eyebrow}</p>
            <h2 className="mt-4 font-serif text-5xl uppercase leading-tight tracking-[-0.03em] text-[#493226] sm:text-6xl">
              {locale.tradition.title}
            </h2>
          </div>
          <div className="space-y-8 text-lg leading-8 text-[#73513d]">
            <p>{locale.tradition.p1}</p>
            <p>{locale.tradition.p2}</p>
          </div>
        </div>
      </section>

      <section id="o-mne" className="bg-[#fff9f0] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
            <div>
              <img
                src="/images/eliska-o-mne.jpg"
                alt="Portrét Elišky S."
                className="aspect-[4/5] w-full rounded-2xl object-cover object-center"
              />
            </div>
            <div className="text-lg leading-8 text-[#73513d]">
              <p className="text-sm uppercase tracking-[0.24em] text-[#a0693f]">{locale.about.eyebrow}</p>
              <h2 className="mt-4 font-serif text-5xl leading-tight tracking-[-0.04em] text-[#493226] sm:text-6xl">
                {locale.about.title}
              </h2>
              <div className="mt-10 space-y-8">
                <p>{locale.about.p1}</p>
                <p>
                  <strong className="font-semibold text-[#493226]">{locale.about.p2Lead}</strong>
                  {locale.about.p2}
                </p>
                <p>{locale.about.p3}</p>
                <p>{locale.about.p4}</p>
              </div>

              <div className="mt-10 border-t border-[#d8b797] pt-8">
              <button
                type="button"
                onClick={() => setAboutOpen((open) => !open)}
                aria-expanded={aboutOpen}
                aria-controls="vzdelani-a-kurzy"
                className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-[#a0693f] transition hover:text-[#7a4628]"
              >
                {locale.about.more}
                <span
                  className={`text-base transition-transform duration-500 ${aboutOpen ? "rotate-45" : ""}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              {aboutOpen ? (
                <div id="vzdelani-a-kurzy" className="mt-8 border-t border-[#d8b797] pt-8">
                  <p className="text-sm uppercase tracking-[0.24em] text-[#a0693f]">{locale.about.courses}</p>
                  <ul className="mt-5 space-y-3 text-base">
                    {coursesData[lang].map((course) => (
                      <li key={course} className="flex gap-3 leading-7">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c58958]" />
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showGuides && <section id="shop" className="bg-[#fff9f0] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-[#a0693f]">{locale.shop.eyebrow}</p>
              <h2 className="mt-4 font-serif text-5xl leading-tight tracking-[-0.04em] text-[#493226] sm:text-6xl">
                {locale.shop.title}
              </h2>
            </div>
            <a href="#kontakt" className="text-sm uppercase tracking-[0.16em] text-[#7a4628] underline decoration-[#d8b797] underline-offset-8 transition hover:text-[#493226]">
              {locale.shop.question}
            </a>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {getProducts(lang).map((product) => {
              const isOpen = openProduct === product.id;

              return (
                <article
                  key={product.id}
                  className="flex flex-col rounded-[1.75rem] bg-[#fbf3e8] p-7 shadow-[0_18px_60px_rgba(75,49,37,0.1)] transition duration-500 hover:-translate-y-1"
                >
                  <button
                    type="button"
                    onClick={() => setOpenProduct(isOpen ? null : product.id)}
                    aria-expanded={isOpen}
                    className="text-left"
                  >
                    <span className={`block h-40 w-full rounded-[1.25rem] ${product.cover}`} />
                    <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#a0693f]">{product.type}</p>
                    <h3 className="mt-3 font-serif text-2xl leading-snug text-[#493226]">{product.title}</h3>
                    <p className="mt-3 text-base leading-7 text-[#73513d]">{product.text}</p>
                  </button>

                  {isOpen ? (
                    <div className="mt-5 space-y-4 border-t border-[#d8b797] pt-5 text-[#73513d]">
                      <p className="text-base leading-7">{product.detail}</p>
                      <ul className="space-y-2 text-sm">
                        {product.contents.map((item) => (
                          <li key={item} className="flex gap-3 leading-6">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c58958]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs uppercase tracking-[0.16em] text-[#a0693f]">{product.format}</p>
                    </div>
                  ) : null}

                  <div className="mt-auto flex items-center justify-between border-t border-[#d8b797] pt-5">
                    <span className="font-serif text-2xl text-[#493226]">{product.price}</span>
                    <a
                      href={buyUrl(product, contactEmail)}
                      className="rounded-full bg-[#493226] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#fff8ee] transition duration-500 hover:bg-[#6b442f]"
                    >
                      {locale.shop.btn}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-10 max-w-3xl text-sm leading-6 text-[#8a5e42]">
            {locale.shop.note}
          </p>
        </div>
      </section>}

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <h2 className="font-serif text-5xl leading-tight tracking-[-0.04em] text-[#493226] sm:text-6xl">
            {locale.location.title}
          </h2>
          <p className="text-lg leading-8 text-[#73513d]">
            {locale.location.text}
          </p>
        </div>
      </section>

      <section id="kontakt" className="bg-[#fff9f0] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#a0693f]">{locale.contact.eyebrow}</p>
            <h2 className="mt-4 font-serif text-5xl leading-tight tracking-[-0.04em] text-[#493226] sm:text-6xl">
              {locale.contact.title}
            </h2>
            <div className="mt-8 space-y-3 text-lg leading-8 text-[#73513d]">
              <a className="inline-block text-[#7a4628] underline decoration-[#d8b797] underline-offset-8 transition hover:text-[#493226]" href={`tel:+420733383101`}>+420 733 383 101</a>
              <div>
                <a className="inline-block text-[#7a4628] underline decoration-[#d8b797] underline-offset-8 transition hover:text-[#493226]" href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[2rem] bg-[#fbf3e8] p-6 shadow-[0_24px_80px_rgba(75,49,37,0.14)] sm:p-8 lg:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-3 text-sm uppercase tracking-[0.18em] text-[#8a5e42]">
                {locale.contact.name}
                <input
                  required
                  value={form.name}
                  onChange={updateField("name")}
                  className="w-full border-b border-[#cfa989] bg-transparent py-3 text-base normal-case tracking-normal text-[#493226] outline-none transition placeholder:text-[#a98266] focus:border-[#7a4628]"
                  placeholder={locale.contact.namePlaceholder}
                />
              </label>
              <label className="space-y-3 text-sm uppercase tracking-[0.18em] text-[#8a5e42]">
                {locale.contact.email}
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={updateField("email")}
                  className="w-full border-b border-[#cfa989] bg-transparent py-3 text-base normal-case tracking-normal text-[#493226] outline-none transition placeholder:text-[#a98266] focus:border-[#7a4628]"
                  placeholder={locale.contact.emailPlaceholder}
                />
              </label>
            </div>
            <label className="mt-6 block space-y-3 text-sm uppercase tracking-[0.18em] text-[#8a5e42]">
              {locale.contact.service}
              <select
                value={form.care}
                onChange={updateField("care")}
                className="w-full border-b border-[#cfa989] bg-transparent py-3 text-base normal-case tracking-normal text-[#493226] outline-none transition focus:border-[#7a4628]"
              >
                {[0, 1, 5, 2, 3, 4].map((serviceIndex) => servicesData[lang][serviceIndex]).map((service) => (
                  <option key={service.title}>{service.title}</option>
                ))}
                <option>{locale.contact.serviceDefault}</option>
              </select>
            </label>
            <label className="mt-6 block space-y-3 text-sm uppercase tracking-[0.18em] text-[#8a5e42]">
              {locale.contact.message}
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={updateField("message")}
                className="w-full resize-none border-b border-[#cfa989] bg-transparent py-3 text-base normal-case tracking-normal text-[#493226] outline-none transition placeholder:text-[#a98266] focus:border-[#7a4628]"
                placeholder={locale.contact.messagePlaceholder}
              />
            </label>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="rounded-full bg-[#493226] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#fff8ee] transition duration-500 hover:-translate-y-1 hover:bg-[#6b442f]"
              >
                {locale.contact.btn}
              </button>
              {submitted ? (
                <p className="text-sm leading-6 text-[#73513d]">{locale.contact.success}</p>
              ) : null}
            </div>
          </form>
        </div>
      </section>

      <footer className="bg-[#2f211b] px-5 py-10 text-[#f9e7d2] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Wordmark
              size="clamp(1.05rem, 2.4vw, 1.5rem)"
              inkClassName="text-[#f9e7d2]"
              accentClassName="text-[#e6a179]"
            />
          </div>
          <div className="flex gap-6 text-sm text-[#d8c2ac]">
            <a className="underline underline-offset-4 hover:text-[#fff8ee]" href="https://www.instagram.com/lightofbirth/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="underline underline-offset-4 hover:text-[#fff8ee]" href="https://www.linkedin.com/in/eli%C5%A1ka-eislerov%C3%A1-15b700217/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <p className="text-sm text-[#d8c2ac]">{locale.footer.subtitle}</p>
        </div>

        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-white/15 pt-6 text-sm text-[#d8c2ac] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
          <a className="underline underline-offset-4 transition hover:text-[#fff8ee]" href="#vymezeni-odpovednosti">
            {locale.footer.links.liability}
          </a>
          <a className="underline underline-offset-4 transition hover:text-[#fff8ee]" href="#ochrana-osobnich-udaju">
            {locale.footer.links.privacy}
          </a>
          <a className="underline underline-offset-4 transition hover:text-[#fff8ee]" href="#obchodni-podminky">
            {locale.footer.links.terms}
          </a>
          <a className="underline underline-offset-4 transition hover:text-[#fff8ee]" href="#zasady-pouzivani-cookies">
            {locale.footer.links.cookies}
          </a>
          <p className="text-[#b79c85] sm:ml-auto">© 2026 Light of Birth · {locale.footer.rights}</p>
        </div>
      </footer>
    </main>
  );
}
