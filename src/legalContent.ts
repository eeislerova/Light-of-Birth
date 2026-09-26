export type LegalSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  slug: string;
  title: string;
  intro: string[];
  sections: LegalSection[];
  updated: string;
};

export const legalDocuments: Record<string, LegalDocument> = {
  "zasady-pouzivani-cookies": {
    slug: "zasady-pouzivani-cookies",
    title: "Zásady používání souborů cookie",
    intro: [
      "Light of Birth",
      "lightofbirth.cz | lightofbirth.com",
      "Tyto zásady vysvětlují, jak webové stránky Light of Birth používají soubory cookie a obdobné technologie.",
    ],
    sections: [
      {
        heading: "1. Co jsou soubory cookie",
        paragraphs: [
          "Cookie je malý textový soubor, který může webová stránka uložit do vašeho zařízení. Cookies mohou sloužit k zajištění základních funkcí webu, zapamatování nastavení nebo k měření návštěvnosti a marketingovým účelům.",
        ],
      },
      {
        heading: "2. Jaké cookies tento web používá",
        paragraphs: [
          "Webové stránky Light of Birth v současnosti samy nepoužívají analytické ani marketingové cookies a nevyužívají cookies k vytváření uživatelských profilů nebo cílené reklamě.",
          "Při technickém zajištění a zabezpečení webu mohou být zpracovány nezbytné technické údaje. Nezbytné technologie jsou používány pouze v rozsahu potřebném pro bezpečné a správné fungování webu.",
        ],
      },
      {
        heading: "3. Odkazy na služby třetích stran",
        paragraphs: [
          "Web obsahuje odkazy na služby třetích stran, například Instagram a LinkedIn. K ukládání cookies těmito službami může dojít až po přechodu na jejich stránky a řídí se jejich vlastními zásadami ochrany soukromí a používání cookies.",
        ],
      },
      {
        heading: "4. Správa cookies v prohlížeči",
        paragraphs: [
          "Ve svém internetovém prohlížeči můžete ukládání cookies omezit, zablokovat nebo již uložené cookies odstranit. Omezení nezbytných technologií může ovlivnit správné fungování některých webových stránek.",
        ],
      },
      {
        heading: "5. Změny těchto zásad",
        paragraphs: [
          "Pokud budou na web v budoucnu přidány analytické, marketingové nebo jiné volitelné cookies, budou tyto zásady aktualizovány a tam, kde to právní předpisy vyžadují, bude před jejich použitím vyžádán váš souhlas.",
        ],
      },
      {
        heading: "6. Kontakt",
        paragraphs: [
          "Eliška S. Eislerová",
          "Light of Birth",
          "IČO: 09477390",
          "E-mail: eeislerova@gmail.com",
        ],
      },
    ],
    updated: "Poslední aktualizace: 26. 9. 2026",
  },

  "vymezeni-odpovednosti": {
    slug: "vymezeni-odpovednosti",
    title: "Vymezení odpovědnosti",
    intro: [
      "Light of Birth",
      "Eliška S. Eislerová",
      "dula pro Prahu a okolí Kutné Hory",
      "Toto vymezení odpovědnosti se vztahuje na služby poskytované pod značkou Light of Birth a na obsah zveřejněný na webových stránkách lightofbirth.cz a lightofbirth.com.",
    ],
    sections: [
      {
        heading: "Role duly",
        paragraphs: [
          "Dula poskytuje ženě a její rodině kontinuální emocionální, informační a praktickou podporu v období těhotenství, porodu a po porodu.",
          "Služby duly nenahrazují zdravotní péči poskytovanou porodní asistentkou, lékařem, psychologem, psychoterapeutem ani jiným zdravotnickým pracovníkem.",
          "Dula zejména:",
        ],
        bullets: [
          "nestanovuje diagnózy;",
          "neprovádí zdravotnická vyšetření ani zdravotnické výkony;",
          "nepředepisuje ani nedoporučuje léčiva jako náhradu odborného zdravotnického doporučení;",
          "nerozhoduje za klientku o zdravotní péči;",
          "neposuzuje zdravotní stav matky nebo dítěte způsobem náležejícím zdravotnickému pracovníkovi;",
          "nenahrazuje odbornou péči porodní asistentky nebo lékaře.",
        ],
      },
      { paragraphs: ["Podpora duly může zdravotní péči doplňovat, nikoli nahrazovat."] },
      {
        heading: "Rozhodování klientky",
        paragraphs: [
          "Cílem mé práce je vytvářet prostor, ve kterém může žena získávat informace, formulovat svá přání, klást otázky a činit vlastní informovaná rozhodnutí.",
          "Veškerá rozhodnutí týkající se těhotenství, porodu, zdravotní péče a péče o dítě činí klientka sama, případně po konzultaci s příslušnými zdravotnickými pracovníky.",
          "Informace, které během spolupráce poskytuji, mají vzdělávací a podpůrný charakter. Nejsou individuální lékařskou diagnózou ani doporučením zdravotního postupu.",
        ],
      },
      {
        heading: "Spolupráce se zdravotníky",
        paragraphs: [
          "Dula není náhradou porodní asistentky ani lékaře a nepřebírá jejich kompetence.",
          "Při porodu respektuji kompetence zdravotnického personálu a prostředí zdravotnického zařízení. Mohu klientce pomoci orientovat se v situaci, formulovat otázky nebo připomenout její předem vyslovená přání, nerozhoduji však za klientku ani za zdravotnický personál.",
          "Konečné rozhodnutí o přijetí doprovázející osoby a podmínkách její přítomnosti ve zdravotnickém zařízení se řídí právními předpisy, aktuální situací a pravidly daného zařízení.",
        ],
      },
      {
        heading: "Komplikace a akutní zdravotní stav",
        paragraphs: [
          "V případě zdravotních obtíží, neobvyklých příznaků, komplikací nebo pochybností o zdravotním stavu matky či dítěte je vždy namístě obrátit se na porodní asistentku, lékaře nebo příslušné zdravotnické zařízení.",
          "V akutním nebo život ohrožujícím stavu je třeba kontaktovat zdravotnickou záchrannou službu na čísle 155 nebo jednotnou evropskou linku 112.",
          "Kontaktování duly není náhradou kontaktování zdravotnické pomoci.",
        ],
      },
      {
        heading: "Porod a jeho průběh",
        paragraphs: [
          "Porod je nepředvídatelný proces a nelze zaručit jeho konkrétní průběh, délku, způsob vedení ani výsledek.",
          "Dula nemůže zaručit například spontánní vaginální porod, porod bez medicínských intervencí, porod podle porodního přání, možnost využití konkrétní porodní polohy ani přítomnost u porodu za všech okolností.",
          "Úlohou duly není zajistit určitý výsledek porodu, ale poskytovat podporu v rámci předem dohodnutých služeb a aktuálních možností.",
        ],
      },
      {
        heading: "Přirozené a tradiční přístupy",
        paragraphs: [
          "Součástí podpory mohou být podle dohody relaxační techniky, práce s dechem, polohování, rebozo, jemný dotek, práce s prostředím, rituály či prvky inspirované tradiční poporodní péčí.",
          "Tyto postupy jsou nabízeny jako podpůrné a relaxační metody a nenahrazují diagnostiku ani léčbu.",
          "Klientka má vždy právo jakoukoli techniku odmítnout nebo její použití kdykoli ukončit.",
        ],
      },
      {
        heading: "Obsah webu a sociálních sítí",
        paragraphs: [
          "Texty, příspěvky, články, videa, elektronické materiály a další obsah zveřejněný prostřednictvím Light of Birth mají vzdělávací a informační charakter.",
          "Ani v případě, že obsah vychází z odborných zdrojů nebo výzkumu, nepředstavuje individuální zdravotní doporučení.",
          "Informace z webu nebo sociálních sítí by neměly být používány k odkládání nebo nahrazování odborné zdravotní péče.",
        ],
      },
      {
        heading: "Individuální odpovědnost",
        paragraphs: [
          "Každá žena, těhotenství, porod a poporodní období jsou jedinečné. Informace nebo postup, který může být vhodný pro jednu osobu, nemusí být vhodný pro jinou.",
          "Klientka je proto vedena k tomu, aby při rozhodování zohlednila svůj zdravotní stav a v případě potřeby konzultovala otázky s příslušným odborníkem.",
        ],
      },
      {
        heading: "Provozovatel",
        paragraphs: [
          "Eliška S. Eislerová",
          "Light of Birth",
          "IČO: 09477390",
          "Sídlo: Zhoř 31, Červené Janovice 286 01",
          "E-mail: eeislerova@gmail.com",
          "Web: lightofbirth.cz | lightofbirth.com",
        ],
      },
    ],
    updated: "Poslední aktualizace: 21. 9. 2026",
  },

  "ochrana-osobnich-udaju": {
    slug: "ochrana-osobnich-udaju",
    title: "Zásady ochrany osobních údajů",
    intro: [
      "Light of Birth",
      "lightofbirth.cz | lightofbirth.com",
      "Vaše soukromí a důvěra jsou pro mě důležité. V rámci služeb Light of Birth proto zpracovávám pouze osobní údaje, které potřebuji k poskytování služeb, komunikaci, plnění smluvních a zákonných povinností a bezpečnému fungování webových stránek.",
    ],
    sections: [
      { heading: "1. Správce osobních údajů", paragraphs: ["Eliška S. Eislerová", "Light of Birth", "IČO: 09477390", "Sídlo: Zhoř 31, Červené Janovice 286 01", "E-mail: eeislerova@gmail.com"] },
      { heading: "2. Jaké údaje mohu zpracovávat", paragraphs: ["Podle způsobu komunikace nebo spolupráce mohu zpracovávat zejména jméno a příjmení, e-mailovou adresu, telefonní číslo, fakturační a platební údaje, informace potřebné k rezervaci nebo poskytování služby, termín očekávaného porodu, obsah vzájemné komunikace a technické údaje související s používáním webových stránek.", "Vzhledem k povaze služeb duly mi můžete během spolupráce sdělit také informace týkající se zdravotního stavu nebo těhotenství. Tyto informace mohou představovat zvláštní kategorii osobních údajů a přistupuji k nim s odpovídající mírou důvěrnosti."] },
      { heading: "3. Proč údaje zpracovávám", paragraphs: ["Osobní údaje mohou být zpracovávány zejména za účelem odpovědi na dotaz, domluvení úvodního setkání, rezervace a poskytování služeb, přípravy a plnění smlouvy, komunikace před porodem a po porodu, vedení nezbytné evidence, vystavení účetních a daňových dokladů, ochrany právních nároků, případné marketingové komunikace a zajištění technického a bezpečného fungování webu."] },
      { heading: "4. Právní základ zpracování", paragraphs: ["Osobní údaje zpracovávám podle okolností zejména na základě jednání před uzavřením smlouvy a plnění smlouvy, plnění zákonných povinností, oprávněného zájmu nebo vašeho souhlasu tam, kde je vyžadován.", "Pokud mi v rámci spolupráce poskytujete údaje týkající se zdraví, jsou zpracovávány pouze v rozsahu, v jakém je to pro naši spolupráci skutečně potřebné a existuje pro jejich zpracování odpovídající právní základ podle platných právních předpisů."] },
      { heading: "5. Doba uchování", paragraphs: ["Osobní údaje uchovávám pouze po dobu nezbytnou pro účel, pro který byly získány. Údaje související se smlouvou mohou být uchovávány po dobu trvání spolupráce a následně po dobu nezbytnou k ochraně případných právních nároků. Účetní a daňové dokumenty uchovávám po dobu stanovenou právními předpisy."] },
      { heading: "6. Kdo může mít k údajům přístup", paragraphs: ["Osobní údaje neposkytuji třetím osobám bez důvodu. V nezbytném rozsahu však mohou mít k některým údajům přístup poskytovatelé webhostingu a domény, e-mailových služeb, rezervačního nebo kontaktního systému, účetní či daňový poradce, poskytovatelé platebních služeb a technických nebo analytických nástrojů používaných na webu.", "Pokud některý poskytovatel zpracovává údaje mimo Evropský hospodářský prostor, dbám na to, aby byl přenos založen na odpovídajícím právním mechanismu podle GDPR."] },
      { heading: "7. Důvěrnost", paragraphs: ["Informace sdělené během spolupráce považuji za důvěrné. Příběhy klientek, fotografie, reference nebo jiné informace umožňující identifikaci klientky nezveřejňuji bez odpovídajícího právního základu, typicky předchozího souhlasu klientky."] },
      { heading: "8. Kontaktní formulář", paragraphs: ["Pokud mě kontaktujete prostřednictvím formuláře na webu, zpracovávám údaje, které uvedete, za účelem vyřízení vašeho dotazu a případného navázání spolupráce. Prostřednictvím běžného kontaktního formuláře prosím neposílejte více citlivých zdravotních informací, než je pro první kontakt nezbytné."] },
      { heading: "9. Cookies", paragraphs: ["Webové stránky mohou používat soubory cookies a obdobné technologie. Nezbytné cookies mohou být používány bez souhlasu, pokud to právní předpisy umožňují. Analytické, marketingové nebo jiné volitelné cookies jsou používány v souladu s příslušnými právními požadavky a tam, kde je to vyžadováno, až po udělení souhlasu."] },
      { heading: "10. Sociální sítě", paragraphs: ["Light of Birth může být prezentován také prostřednictvím sociálních sítí, například Instagramu a LinkedIn. Při návštěvě těchto služeb dochází rovněž ke zpracování osobních údajů jejich provozovateli podle jejich vlastních zásad."] },
      { heading: "11. Vaše práva", paragraphs: ["Za podmínek stanovených GDPR máte zejména právo získat informace o zpracování údajů, požadovat přístup, opravu, výmaz nebo omezení zpracování, vznést námitku, požadovat přenositelnost údajů a odvolat souhlas, pokud je zpracování založeno na souhlasu.", "V případě jakýchkoli obav, nejasností nebo nepříjemností budu ráda, pokud se je v prvním kroku pokusíme vyřešit společně prostřednictvím e-mailové komunikace na adrese eeislerova@gmail.com.", "Se žádostí týkající se zpracování osobních údajů se můžete obrátit na: eeislerova@gmail.com.", "Pokud se domníváte, že jsou vaše osobní údaje zpracovávány v rozporu s právními předpisy, máte právo podat stížnost u Úřadu pro ochranu osobních údajů."] },
      { heading: "12. Zabezpečení údajů", paragraphs: ["Přijímám přiměřená technická a organizační opatření s cílem chránit osobní údaje před neoprávněným přístupem, ztrátou, zneužitím nebo zveřejněním. Běžná e-mailová nebo internetová komunikace však nemůže být za všech okolností považována za absolutně bezpečný způsob přenosu citlivých informací."] },
      { heading: "13. Změny těchto zásad", paragraphs: ["Tyto zásady mohou být průběžně aktualizovány. Aktuální verze bude zveřejněna na lightofbirth.cz a lightofbirth.com."] },
    ],
    updated: "Poslední aktualizace: 21. 9. 2026",
  },

  "obchodni-podminky": {
    slug: "obchodni-podminky",
    title: "Obchodní podmínky",
    intro: ["Light of Birth", "Eliška S. Eislerová", "dula pro Prahu a okolí Kutné Hory", "Tyto obchodní podmínky upravují poskytování služeb pod značkou Light of Birth."],
    sections: [
      { heading: "1. Poskytovatel", paragraphs: ["Eliška Eislerová", "Light of Birth", "IČO: 09477390", "Sídlo: Zhoř 31, Červené Janovice", "E-mail: eeislerova@gmail.com", "Web: lightofbirth.cz | lightofbirth.com", "Klientkou se rozumí osoba, která si objedná některou ze služeb Light of Birth."] },
      { heading: "2. Nabízené služby", paragraphs: ["Light of Birth poskytuje zejména individuální přípravu na porod, konzultace v těhotenství, kontinuální podporu duly, porodní pohotovost a doprovod k porodu, poporodní podporu a další podpůrné a vzdělávací služby uvedené na webových stránkách.", "Konkrétní obsah, rozsah a cena služby jsou uvedeny na webu nebo individuálně dohodnuty s klientkou."] },
      { heading: "3. Povaha služeb", paragraphs: ["Dula poskytuje emocionální, informační a praktickou podporu. Služby Light of Birth nejsou zdravotní službou a nenahrazují péči lékaře, porodní asistentky, psychologa, psychoterapeuta ani jiného zdravotnického pracovníka.", "Podrobnosti stanoví dokument Vymezení odpovědnosti."] },
      { heading: "4. Objednání služby", paragraphs: ["Službu je možné objednat způsobem uvedeným na webových stránkách, zejména prostřednictvím e-mailu, kontaktního formuláře nebo jiné nabízené formy komunikace. Samotné odeslání nezávazného dotazu ještě nemusí znamenat uzavření smlouvy.", "Smlouva o poskytnutí služby vzniká potvrzením objednávky poskytovatelkou, případně podpisem individuální smlouvy. U porodního doprovodu může být spolupráce upravena samostatnou smlouvou, která má v případě rozporu přednost před těmito obecnými podmínkami."] },
      { heading: "5. Cena a platba", paragraphs: ["Aktuální ceny jsou uvedeny na webových stránkách nebo sděleny klientce před objednáním služby. Pokud není dohodnuto jinak, je cena splatná bankovním převodem podle poskytnutých platebních údajů.", "U dlouhodobější spolupráce nebo porodního doprovodu může být platba rozdělena na zálohu a doplatek nebo na několik částí. Konkrétní platební podmínky jsou klientce sděleny před uzavřením smlouvy."] },
      { heading: "6. Porodní pohotovost", paragraphs: ["Pokud je součástí objednané služby porodní pohotovost, její konkrétní období je dohodnuto s klientkou předem. Během pohotovosti je klientka povinna informovat dulu bez zbytečného odkladu o významných změnách souvisejících s blížícím se porodem a o začátku porodu. Způsob kontaktování během pohotovosti bude dohodnut předem."] },
      { heading: "7. Doprovod k porodu", paragraphs: ["Okamžik příjezdu duly se odvíjí od předchozí dohody, průběhu porodu, potřeb klientky, vzdálenosti a aktuálních okolností.", "Dula se zavazuje vynaložit přiměřené úsilí, aby byla klientce během porodu k dispozici v rozsahu sjednané služby. Mohou však nastat mimořádné okolnosti, které přítomnost duly znemožní nebo zásadně omezí, například nemoc, úraz, mimořádná dopravní situace, náhlá rodinná událost, překotný porod nebo okolnosti na straně zdravotnického zařízení.", "Postup pro takové případy, včetně případné náhradní duly a finančního vypořádání neuskutečněné části služby, může být podrobněji upraven individuální smlouvou."] },
      { heading: "8. Změna a zrušení běžného termínu", paragraphs: ["Pokud klientka potřebuje změnit nebo zrušit individuální konzultaci či jiné předem sjednané setkání, prosím o informaci co nejdříve.", "Při zrušení více než 48 hodin před začátkem lze zpravidla domluvit náhradní termín bez storno poplatku. Při zrušení méně než 48 hodin před termínem může být účtováno 50 % ceny sjednaného setkání. Při zrušení méně než 24 hodin před termínem nebo při nedostavení se bez předchozí omluvy může být účtováno 100 % ceny.", "V případě náhlé hospitalizace, akutního zdravotního stavu, porodu nebo jiné závažné nepředvídatelné situace bude řešení domluveno individuálně."] },
      { heading: "9. Zrušení ze strany poskytovatelky", paragraphs: ["Pokud musím sjednané setkání z vážných důvodů zrušit, nabídnu klientce náhradní termín. Zaplacená částka bude převedena na tento termín. Nebude-li možné náhradní termín uskutečnit nebo se na něm společně dohodnout, vrátím částku odpovídající neposkytnuté části služby. Část ceny odpovídající již poskytnutým konzultacím, přípravě nebo jiné prokazatelně uskutečněné části služby se nevrací."] },
      { heading: "10. Ukončení dlouhodobé spolupráce a porodního doprovodu", paragraphs: ["Podmínky ukončení spolupráce zahrnující porodní pohotovost a porodní doprovod mohou být vzhledem k rezervaci kapacity duly upraveny individuální smlouvou.", "Část ceny může představovat úhradu již uskutečněných konzultací, přípravy, administrativy a rezervace kapacity pro období porodní pohotovosti. Případné storno nebo nevratná část platby musí být klientce známy před uzavřením smlouvy a nesmí omezovat její zákonná spotřebitelská práva."] },
      { heading: "11. Odstoupení od smlouvy uzavřené na dálku", paragraphs: ["Je-li klientka spotřebitelkou a smlouva byla uzavřena prostřednictvím internetu, e-mailu, telefonu nebo jiným prostředkem komunikace na dálku, má v případech stanovených zákonem právo odstoupit od smlouvy ve lhůtě 14 dnů od jejího uzavření.", "Chce-li klientka, aby poskytování služby začalo již během této lhůty, může o zahájení poskytování služby výslovně požádat. Pokud následně odstoupí poté, co na její výslovnou žádost již bylo s poskytováním služby započato, může být povinna uhradit poměrnou část ceny odpovídající již poskytnutému plnění, stanoví-li tak právní předpisy.", "Pokud byla služba v plném rozsahu poskytnuta před uplynutím lhůty pro odstoupení na základě výslovné žádosti klientky a při splnění zákonných podmínek, může právo na odstoupení zaniknout.", "Odstoupení lze zaslat na e-mail eeislerova@gmail.com nebo na adresu sídla poskytovatelky."] },
      { heading: "12. Reklamace", paragraphs: ["Pokud klientka není spokojena s poskytnutou službou, může mě kontaktovat na e-mailu eeislerova@gmail.com. Reklamaci vyřídím v souladu s platnými právními předpisy."] },
      { heading: "13. Mimosoudní řešení spotřebitelských sporů", paragraphs: ["Pokud je klientka spotřebitelkou a vznikne spotřebitelský spor, který se nepodaří vyřešit vzájemnou dohodou, může podat návrh na mimosoudní řešení spotřebitelského sporu u České obchodní inspekce, Ústřední inspektorát, oddělení ADR, Štěpánská 796/44, 110 00 Praha 1."] },
      { heading: "14. Ochrana osobních údajů a důvěrnost", paragraphs: ["Nakládání s osobními údaji upravují samostatné Zásady ochrany osobních údajů zveřejněné na webových stránkách Light of Birth. Informace sdělené klientkou během spolupráce považuji za důvěrné."] },
      { heading: "15. Fotografie, reference a porodní příběhy", paragraphs: ["Fotografie klientky či jejího dítěte, reference nebo informace z jejího porodního příběhu nebudou používány pro propagaci Light of Birth bez odpovídajícího právního základu, typicky předchozího souhlasu klientky. Odmítnutí souhlasu nemá vliv na kvalitu ani rozsah poskytovaných služeb."] },
      { heading: "16. Autorská práva", paragraphs: ["Texty, fotografie, grafické materiály, pracovní listy, elektronické materiály a další autorský obsah vytvořený pro Light of Birth jsou chráněny příslušnými právními předpisy. Bez předchozího souhlasu není dovoleno jejich komerční kopírování, další distribuce nebo jiné užití přesahující osobní potřebu klientky, není-li uvedeno jinak."] },
      { heading: "17. Závěrečná ustanovení", paragraphs: ["Tyto obchodní podmínky se řídí právním řádem České republiky. Pokud je některá otázka upravena individuální smlouvou odlišně, má individuální smlouva v daném rozsahu přednost.", "Poskytovatelka může obchodní podmínky přiměřeně aktualizovat. Pro konkrétní objednávku se použije znění účinné v okamžiku uzavření smlouvy, není-li mezi stranami dohodnuto jinak."] },
    ],
    updated: "Účinnost od: 21. 9. 2026",
  },
};
