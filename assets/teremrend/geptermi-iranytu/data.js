window.TEREMREND_DATA = {
  principles: [
    { icon: "🛡️", title: "Dolgozz biztonságosan!", text: "A hibát jelezd, a vezetékekhez, elosztókhoz és kapcsolókhoz ne nyúlj engedély nélkül!" },
    { icon: "💻", title: "Vigyázz az eszközökre!", text: "Gondosan használd a számítógépet, a laptopot, a fejhallgatót és a 3D nyomtatót!" },
    { icon: "💾", title: "Óvd a munkádat és az adataidat!", text: "A megfelelő helyre ments, és közös gépen mindig jelentkezz ki a fiókodból!" },
    { icon: "🌐", title: "Használd felelősen az internetet!", text: "Az online felületeket a feladathoz, mások jogait és adatait tiszteletben tartva használd!" },
    { icon: "🤝", title: "Figyelj másokra!", text: "Úgy dolgozz, hogy társaid is biztonságban, nyugodtan és eredményesen haladhassanak!" }
  ],
  sentences: [
    { category: "Biztonság", parts: ["A számítógépteremben", "csak tanári engedéllyel", "és felügyelettel", "tartózkodj!"] },
    { category: "Biztonság", parts: ["Ha hibát, sérülést", "vagy szokatlan működést észlelsz,", "azonnal szólj", "a tanárnak!"] },
    { category: "Biztonság", parts: ["A vezetékekhez, csatlakozókhoz,", "elosztókhoz és kapcsolókhoz", "csak tanári engedéllyel", "nyúlj!"] },
    { category: "Eszközvédelem", parts: ["A számítógépek és", "más elektronikus eszközök közelében", "ne egyél", "és ne igyál!"] },
    { category: "Eszközvédelem", parts: ["Használd gondosan az eszközöket,", "és az óra végén", "hagyd rendben", "a munkahelyedet!"] },
    { category: "Munka és adatok", parts: ["Munkádat", "a tanár által megadott helyre", "és megfelelő néven", "mentsd el!"] },
    { category: "Beállítások", parts: ["A számítógép és a programok", "beállításait csak", "tanári engedéllyel", "változtasd meg!"] },
    { category: "Saját eszközök", parts: ["Ne telepíts programot,", "és saját eszközt vagy adathordozót", "csak engedéllyel", "csatlakoztass!"] }
  ],
  consequences: [
    {
      title: "Egy pohár üdítő a billentyűzet mellett áll.",
      question: "Miért jelent ez kockázatot?",
      answers: ["Mert az ital kiömölhet és kárt tehet az elektronikus eszközben.", "Mert a billentyűzet mellett kevés hely marad a füzetnek.", "Mert az üdítő túl hideg lehet."],
      correct: 0,
      feedback: "Az elektronikus eszközök közelében az étel és az ital könnyen balesetet vagy meghibásodást okozhat."
    },
    {
      title: "Valaki átállítja a gép rendszerbeállításait.",
      question: "Mi lehet ennek a következménye?",
      answers: ["A gép gyorsabban fog működni.", "Mások nem tudják megfelelően használni a gépet, vagy hibásan működhet.", "Minden fájl automatikusan rendeződik."],
      correct: 1,
      feedback: "A közösen használt gép beállításainak megváltoztatása mások munkáját is akadályozhatja."
    },
    {
      title: "Egy tanuló bejelentkezve hagyja az online fiókját.",
      question: "Miért fontos kijelentkezni?",
      answers: ["Hogy a következő tanuló ne férhessen hozzá a fiókhoz és az adatokhoz.", "Hogy a monitor automatikusan kikapcsoljon.", "Hogy gyorsabban induljon el a következő program."],
      correct: 0,
      feedback: "Közös gépen a kijelentkezés védi a személyes adatokat és a saját munkát."
    }
  ],
  scenarios: [
    {
      type: "single",
      badge: "Gyors döntés",
      question: "A számítógép furcsa hangot ad. Mit teszel?",
      answers: ["Tovább dolgozom, hátha elmúlik.", "Azonnal szólok a tanárnak.", "Kihúzom a vezetéket."],
      correct: 1,
      feedback: "A szokatlan működést mindig jelezni kell, de a géphez és a vezetékekhez ne nyúlj!"
    },
    {
      type: "multi",
      badge: "Két jó lépés",
      question: "Laptopot viszel át egy másik asztalhoz. Melyik két lépés helyes?",
      answers: ["Becsukom a laptopot.", "Egy kézzel a kijelzőjénél fogva viszem.", "Két kézzel, biztosan fogom.", "A töltőkábelt magam után húzom."],
      correct: [0, 2],
      feedback: "A laptopot becsukva, két kézzel érdemes vinni. A kábeleket külön, biztonságosan kell elhelyezni."
    },
    {
      type: "single",
      badge: "Engedély vagy önálló döntés?",
      question: "Szeretnéd csatlakoztatni a saját pendrive-odat. Mi a helyes lépés?",
      answers: ["Előbb engedélyt kérek.", "Gyorsan bedugom, hogy senki se lássa.", "Megkérem a társam, hogy ő csatlakoztassa."],
      correct: 0,
      feedback: "Saját eszközt vagy adathordozót csak engedéllyel csatlakoztass!"
    },
    {
      type: "multi",
      badge: "Jelöld meg mindkettőt!",
      question: "Óra végén mit kell megtenned a közös gépnél?",
      answers: ["Kijelentkezem az online fiókomból.", "Rendben hagyom a munkahelyemet.", "Átállítom a hátteret a következő csoportnak.", "A gép mögött megigazítom a kábeleket."],
      correct: [0, 1],
      feedback: "A kijelentkezés védi az adatokat, a rendezett munkahely pedig a következő csoport munkáját segíti."
    },
    {
      type: "single",
      badge: "Különleges eszköz",
      question: "A 3D nyomtató még dolgozik, és egy lelógó műanyagdarabot látsz. Mit teszel?",
      answers: ["Megpróbálom leszedni.", "Szólok a tanárnak, és nem nyúlok hozzá.", "Leállítom a gépet a kapcsolóval."],
      correct: 1,
      feedback: "A 3D nyomtatónak lehetnek forró és mozgó részei, ezért csak tanári útmutatással használd!"
    },
    {
      type: "single",
      badge: "Közös munka",
      question: "A párod elakadt. Melyik segítség a leghasznosabb?",
      answers: ["Elkészítem helyette az egész feladatot.", "Megmutatom, hol tartok én, és kérdésekkel segítek neki továbbgondolni.", "Azt mondom, hogy várjon az óra végéig."],
      correct: 1,
      feedback: "A jó segítség támogatja a másik gondolkodását, de nem veszi át tőle a munkát."
    }
  ],
  commitments: [
    "Segítünk egymásnak, de nem vesszük át a másik munkáját.",
    "Páros munkában mindketten kezeljük az eszközt.",
    "Olyan hangerővel dolgozunk, amely másokat nem zavar.",
    "Óra végén rendben adjuk át a munkahelyünket.",
    "Elakadáskor előbb gondolkodunk, majd segítséget kérünk.",
    "A fejhallgatót csak a feladathoz és tanári engedéllyel használjuk."
  ]
};
