window.ONLINE_ETIKETT_DATA = {
  chapters: [
    { title: 'Amit megnyitsz', icon: '🖥️', color: 'blue' },
    { title: 'Amit írsz', icon: '💬', color: 'purple' },
    { title: 'Amit továbbadsz', icon: '📤', color: 'orange' },
    { title: 'Amikor az AI segít', icon: '🤖', color: 'green' }
  ],
  principles: [
    { icon: '⏸️', title: 'Állj meg egy pillanatra!', text: 'A gyors reakció helyett előbb gondold végig, mi történhet utána.' },
    { icon: '👥', title: 'Lásd a másik embert!', text: 'A képernyő mögött is valódi ember van, akire hatással van, amit teszel.' },
    { icon: '🧾', title: 'Őrizd meg, ami fontos!', text: 'Bántó vagy gyanús helyzetben a bizonyíték segíthet a megfelelő felnőttnek.' },
    { icon: '🧑‍🏫', title: 'Kérj segítséget jól!', text: 'Ne maradj egyedül a problémával, de közben ne terjeszd tovább.' },
    { icon: '🧭', title: 'Vállald a döntésedet!', text: 'Online is te döntesz arról, mire kattintasz, mit írsz és mit osztasz meg.' }
  ],
  scenarios: [
    {
      chapter: 0, type: 'browser', label: 'Böngészőablak', icon: '🎮',
      scene: 'Kész vagy a feladattal. A melletted ülő azt súgja: „Nyisd meg ezt a játékot, a tanár úgysem látja.”',
      question: 'Mi a legjobb döntés?',
      answers: [
        'Megnyitom, de előtte szólok a tanárnak, hogy már végeztem.',
        'Jelzem, hogy végeztem, és megkérdezem, mi legyen a következő feladatom.',
        'Nem nyitom meg, de elküldöm a linket a tanárnak, hogy ő is lássa, milyen jó játék.'
      ],
      correct: 1,
      wrong: [
        'A tanár értesítése önmagában nem teszi az órai játékot megfelelővé. A következő feladatot kell tisztázni.',
        'A link továbbküldése nem szükséges, és akár gyanús oldalt is terjeszthetsz vele.'
      ],
      feedback: 'Nem az a cél, hogy titokban ügyesebb legyél, hanem hogy az órai időt a megbeszélt módon használd.'
    },
    {
      chapter: 0, type: 'warning', label: 'Váratlan tartalom', icon: '⚠️',
      scene: 'Egy keresési találatra kattintva zavaró, ijesztő vagy az életkorodnak nem megfelelő kép jelenik meg.',
      question: 'Melyik lépéssor a legbiztonságosabb?',
      answers: [
        'Bezárom az oldalt, nem mutatom körbe, és elmondom a tanárnak, hogyan jutottam oda.',
        'Képernyőképet készítek, elküldöm a tanárnak és két osztálytársnak is, hogy legyen tanú.',
        'Megkérem a tanárt, hogy nézze meg, de addig nyitva hagyom és tovább kattintgatok.'
      ],
      correct: 0,
      wrong: [
        'A segítségkérés jó, de a problémás kép továbbküldése újabb embereket tesz ki neki.',
        'A segítségkérés jó irány, de közben ne folytasd a böngészést azon az oldalon.'
      ],
      feedback: 'Állj meg, ne terjeszd tovább, majd pontosan mondd el, mi történt. Nem te vagy hibás attól, hogy váratlanul megjelent.'
    },
    {
      chapter: 0, type: 'choice', label: 'Gyanús belépés', icon: '🔑',
      scene: 'Egy oldal az iskolai felhasználónevedet és jelszavadat kéri. A címe hasonlít a megszokottra, de nem teljesen ugyanaz.',
      question: 'Mit teszel?',
      answers: [
        'Megadom, majd utána megkérdezem a tanárt, valódi oldal volt-e.',
        'Nem írok be semmit; megmutatom a címet a tanárnak vagy más megbízható felnőttnek.',
        'Megkérem a tanárt, hogy ő írja be helyettem a jelszavamat.'
      ],
      correct: 1,
      wrong: [
        'A jelszó megadása után már megtörténhetett a baj; előtte kell ellenőrizni.',
        'A jelszavadat a tanárnak sem kell ismernie vagy helyetted beírnia.'
      ],
      feedback: 'A jó segítségkérés nem a jelszó átadását jelenti, hanem az oldal hitelességének ellenőrzését.'
    },
    {
      chapter: 1, type: 'chat', label: 'Osztálycsoport', icon: '💬',
      messages: [
        ['Nóri', 'Szerintem ez a beadandó nagyon béna lett.'],
        ['Máté', 'Akkor írjuk be neki együtt, hogy inkább ne adja be 😂'],
        ['Te', '…']
      ],
      question: 'Melyik választ küldenéd?',
      answers: [
        '„Ne írjuk ezt neki. Ha tényleg segíteni akarunk, mondjunk konkrét, normális javaslatot.”',
        '„Szólok a tanárnak, hogy Máté megint ilyet írt, addig ti folytassátok.”',
        '„A tanár biztosan úgyis elolvassa, ezért én nem szólok bele.”'
      ],
      correct: 0,
      wrong: [
        'Komoly vagy ismétlődő bántásnál kellhet tanári segítség, de közben nem helyes engedni a folytatást.',
        'A hallgatás is magára hagyhatja azt, akit bántanak. Nyugodtan jelezheted, hogy ez nincs rendben.'
      ],
      feedback: 'Néha az első jó lépés egy világos, tiszteletteljes határ: nem csatlakozol, és nem hagyod szó nélkül.'
    },
    {
      chapter: 1, type: 'chat', label: '„Csak vicc volt”', icon: '😶',
      messages: [
        ['Bence', 'Ezt rólad csináltam, nézd!'],
        ['Lili', 'Ez nagyon sértő. Töröld ki.'],
        ['Bence', 'Jaj, csak vicc volt.']
      ],
      question: 'Mi a legjobb következő lépés Lili számára?',
      answers: [
        'Visszaír egy ugyanilyen sértő képpel, majd mindkettőt megmutatja a tanárnak.',
        'Megőrzi a beszélgetés bizonyítékát, nem vág vissza, és segítséget kér egy megbízható felnőttől.',
        'Azonnal mindent töröl, majd szól a tanárnak, de nem tudja megmutatni, mi történt.'
      ],
      correct: 1,
      wrong: [
        'A tanár bevonása indokolt lehet, de a visszavágás újabb bántást hoz létre.',
        'A segítségkérés jó, de a bizonyíték nélküli helyzetet nehezebb tisztázni.'
      ],
      feedback: 'A „csak vicc volt” nem törli el a hatást. A bizonyíték megőrzése és a nyugodt segítségkérés együtt erős válasz.'
    },
    {
      chapter: 1, type: 'chat', label: 'Ismeretlen meghívó', icon: '🚪',
      messages: [
        ['Ismeretlen_47', 'Gyere át ebbe a privát szobába, ott megmutatom a megoldást!'],
        ['Ismeretlen_47', 'Ne szólj a tanárnak, csak két perc.']
      ],
      question: 'Melyik reakció a legjobb?',
      answers: [
        'Belépek, de rögtön képernyőképet készítek, hogy később megmutathassam a tanárnak.',
        'Nem lépek be, nem válaszolok; megőrzöm az üzenetet és jelzem a tanárnak.',
        'Megkérdezem a tanárt, beléphetek-e, de közben visszaírom az ismeretlennek a nevemet.'
      ],
      correct: 1,
      wrong: [
        'Bizonyítékot belépés nélkül is meg lehet őrizni; a belépés felesleges kockázat.',
        'A segítségkérés jó, de közben ne adj ki személyes adatot az ismeretlennek.'
      ],
      feedback: 'A jó segítségkérés előtt sem kell kipróbálnod a veszélyesnek tűnő helyzetet.'
    },
    {
      chapter: 2, type: 'post', label: 'Közösségi bejegyzés', icon: '📷',
      post: { author: 'Dani', text: 'Nézzétek, milyen fejet vágott Áron! 😂', reactions: '😂 14   ↗ Megosztás 6' },
      question: 'Melyik döntés csökkenti legjobban a kárt?',
      answers: [
        'Nem reagálok és nem osztom tovább; jelzem Daninak, hogy vegye le, és szükség esetén felnőtt segítségét kérem.',
        'Elküldöm a tanárnak és az osztálycsoportba is, hogy mindenki tudja: ezt nem szabad.',
        'Nevetős reakció helyett szomorú emojit teszek rá, majd szólok a tanárnak.'
      ],
      correct: 0,
      wrong: [
        'A tanárnak való jelzés indokolt lehet, de az osztálycsoportba küldés tovább terjeszti a képet.',
        'A segítő szándékú reakció is növelheti a bejegyzés láthatóságát.'
      ],
      feedback: 'Nemcsak a kép készítője felelős: minden reakció és továbbküldés alakítja, meddig terjed a megalázás.'
    },
    {
      chapter: 2, type: 'choice', label: 'Közös fénykép', icon: '🖼️',
      scene: 'Jól sikerült egy közös fotó az osztályprogramon. Szeretnéd feltölteni a saját oldaladra.',
      question: 'Mit kell előtte végiggondolnod?',
      answers: [
        'Elég, ha a tanár engedélyt ad, mert ő felel az egész osztályért.',
        'Az érintettek beleegyezése és az iskolai szabályok is számítanak; aki nemet mond, annak a döntését tiszteletben tartom.',
        'Megmutatom a tanárnak, majd feltöltöm; aki később szól, azt kivágom a képből.'
      ],
      correct: 1,
      wrong: [
        'A tanári engedély nem helyettesíti automatikusan a képen szereplők beleegyezését.',
        'A megosztás előtt kell tisztázni a beleegyezést, nem utólag.'
      ],
      feedback: 'Más ember képe nem válik a te szabadon használható tartalmaddá attól, hogy nálad van a fénykép.'
    },
    {
      chapter: 2, type: 'timeline', label: 'Digitális nyom', icon: '👣',
      scene: 'Dühösen írsz egy sértő üzenetet, majd egy perc múlva törlöd. Másnap a tanár képernyőképet mutat róla.',
      question: 'Melyik magyarázat a legpontosabb?',
      answers: [
        'Mivel töröltem, már nem vagyok felelős; a tanárnak a képernyőképet készítővel kell beszélnie.',
        'A törlés csökkentheti a további terjedést, de az elküldésért és annak hatásáért továbbra is felelős vagyok.',
        'Csak akkor vagyok felelős, ha a tanár az eredeti üzenetet is megtalálja.'
      ],
      correct: 1,
      wrong: [
        'A képernyőkép bizonyítja, hogy az üzenet hatása nem tűnt el a törléssel.',
        'A felelősség nem attól függ, melyik technikai másolat maradt meg.'
      ],
      feedback: 'A törlés lehet jó javító lépés, de nem radír: az online döntés következményeit nem mindig lehet visszavonni.'
    },
    {
      chapter: 3, type: 'ai', label: 'AI-beszélgetés', icon: '🤖',
      prompt: 'Írd meg helyettem a teljes fogalmazást úgy, hogy a tanár ne vegye észre!',
      question: 'Hogyan alakítanád át ezt a kérést tisztességes segítségkéréssé?',
      answers: [
        '„Írj egy másik fogalmazást, majd megmutatom a tanárnak, hogy AI-val készült.”',
        '„Tegyél fel kérdéseket, amelyek segítenek saját ötleteket gyűjteni, majd ellenőrizd a vázlatom logikáját.”',
        '„Írd meg rövidebben, hogy több saját mondatot tudjak közé tenni.”'
      ],
      correct: 1,
      wrong: [
        'A használat jelzése fontos lehet, de a teljes munka átadása továbbra sem saját teljesítmény.',
        'Néhány saját mondat nem teszi automatikusan saját munkává az AI által elkészített szöveget.'
      ],
      feedback: 'Az AI akkor segít jól, ha a gondolkodásodat támogatja, nem pedig eltakarja, hogy ki végezte a munkát.'
    },
    {
      chapter: 3, type: 'ai', label: 'AI és személyes adatok', icon: '🔒',
      prompt: 'Elemezd az osztálytársam problémáját! Ide másolom a teljes nevét, fényképét és az üzeneteit…',
      question: 'Mi a legjobb döntés?',
      answers: [
        'Előbb megkérdezem a tanárt, majd minden adatot bemásolok, ha ő engedélyezi.',
        'Nem másolom be az azonosítható adatokat; általánosan fogalmazom meg a kérdést, vagy más módon kérek segítséget.',
        'Kitörlöm a vezetéknevét, és megmutatom a tanárnak, hogy így már biztonságos-e.'
      ],
      correct: 1,
      wrong: [
        'A tanár segítsége fontos, de más személyes adatainak teljes feltöltése nem lesz automatikusan megfelelő.',
        'A keresztnév, fénykép és üzenetek együtt továbbra is azonosíthatóvá tehetik az illetőt.'
      ],
      feedback: 'A segítségkéréshez ritkán szükséges valaki teljes személyes történetét egy külső rendszerbe feltölteni.'
    },
    {
      chapter: 3, type: 'ai', label: 'AI tévedése', icon: '🧠',
      prompt: 'Az AI magabiztos választ adott, de két részlet furcsának tűnik.',
      question: 'Mi legyen a következő lépés?',
      answers: [
        'Beadom, majd megkérem a tanárt, javítsa ki, ha az AI tévedett.',
        'Ellenőrzöm megbízható forrásból, összevetem a tananyaggal, és ha továbbra sem világos, kérdezek.',
        'Megkérem a tanárt, hogy ő kérdezze meg ugyanazt az AI-tól.'
      ],
      correct: 1,
      wrong: [
        'Az ellenőrzés nem tolható át utólag a tanárra; a beadás előtt a te feladatod is.',
        'Ugyanaz az eszköz ugyanúgy tévedhet. Más forrás és saját gondolkodás is kell.'
      ],
      feedback: 'A magabiztos megfogalmazás nem bizonyíték. Az AI válaszát ugyanúgy ellenőrizni kell, mint más internetes információt.'
    }
  ]
};
