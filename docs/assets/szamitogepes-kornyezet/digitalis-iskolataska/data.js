window.DIGITASKA_DATA = {
  concepts: [
    { icon: '💾', title: 'Meghajtó', text: 'Nagy tárolóhely a gépen vagy a hálózaton. Mappák és fájlok találhatók rajta.' },
    { icon: '📁', title: 'Mappa', text: 'Olyan, mint egy rekesz az iskolatáskádban: összetartozó fájlokat és további mappákat rendezhetsz bele.' },
    { icon: '📄', title: 'Fájl', text: 'Egy elkészített munka vagy elmentett tartalom: dokumentum, kép, bemutató, hang vagy más állomány.' },
    { icon: '🧭', title: 'Útvonal', text: 'Megmutatja, milyen mappákon keresztül jutsz el egy fájlhoz.' }
  ],

  identify: [
    { object: '📁 Magyar', question: 'Mi ez?', answers: ['Fájl', 'Mappa', 'Meghajtó'], correct: 1, feedback: 'A mappa más fájlokat és mappákat foghat össze.' },
    { object: '📄 olvasonaplo.docx', question: 'Mi ez?', answers: ['Fájl', 'Mappa', 'Meghajtó'], correct: 0, feedback: 'A fájlnév végén álló .docx kiterjesztés is jelzi, hogy ez egy dokumentumfájl.' },
    { object: '💾 D: Adat', question: 'Mi ez?', answers: ['Fájl', 'Mappa', 'Meghajtó'], correct: 2, feedback: 'A meghajtó nagyobb tárolóhely, amelyben mappák és fájlok találhatók.' },
    { object: '🖼️ naprendszer.png', question: 'Melyik állítás igaz?', answers: ['Ez egy képfájl.', 'Ez egy Naprendszer nevű mappa.', 'Ez egy meghajtó.'], correct: 0, feedback: 'A .png képfájlra utal.' }
  ],

  sorting: [
    { file: '📄 olvasonaplo.docx', folders: ['Magyar', 'Matematika', 'Digitális kultúra'], correct: 0, feedback: 'Az olvasónapló a Magyar mappában lesz a legkönnyebben megtalálható.' },
    { file: '📊 szorzotabla.xlsx', folders: ['Természettudomány', 'Matematika', 'Képek'], correct: 1, feedback: 'A szorzótáblás táblázat a Matematika mappába illik.' },
    { file: '🖼️ naprendszer.png', folders: ['Magyar', 'Természettudomány', 'Ének'], correct: 1, feedback: 'A Naprendszerről készült kép a Természettudomány mappába tartozik.' },
    { file: '🖥️ bemutato.pptx', folders: ['Digitális kultúra', 'Testnevelés', 'Magyar'], correct: 0, feedback: 'A számítógépen készített bemutató a Digitális kultúra mappában kapjon helyet.' }
  ],

  routes: [
    {
      tree: ['D: Adat', 'Kovács Anna', 'Magyar', 'olvasónapló.docx'],
      question: 'Melyik mappa tartalmazza közvetlenül az olvasónaplót?',
      answers: ['Kovács Anna', 'Magyar', 'D: Adat'],
      correct: 1,
      feedback: 'A közvetlenül fölötte álló Magyar mappában található a fájl.'
    },
    {
      tree: ['D: Adat', 'Kovács Anna', 'Természettudomány', 'Képek', 'naprendszer.png'],
      question: 'A naprendszer.png fájlt a Képek mappából közvetlenül a Természettudomány mappába helyezed át. Melyik lesz az új teljes útvonala?',
      answers: [
        'D: Adat → Kovács Anna → Természettudomány → naprendszer.png',
        'D: Adat → Kovács Anna → Természettudomány → Képek → naprendszer.png',
        'D: Adat → Kovács Anna → Képek → naprendszer.png'
      ],
      correct: 0,
      feedback: 'Áthelyezés után a Képek mappa már nem része az útvonalnak: a fájl közvetlenül a Természettudomány mappába kerül.'
    },
    {
      tree: ['D: Adat', 'Kovács Anna', 'Matematika', 'Gyakorlás', 'szorzotabla.xlsx'],
      question: 'A Matematika mappában vagy. Melyik mappát kell megnyitnod, hogy elérd a fájlt?',
      answers: ['Gyakorlás', 'Kovács Anna', 'D: Adat'],
      correct: 0,
      feedback: 'A Matematika mappán belül a Gyakorlás mappában található a szorzótábla fájl.'
    },
    {
      type: 'hierarchy',
      tree: ['Iskolai munkák', 'Magyar', 'Fogalmazások', 'kirandulas.docx'],
      question: 'Melyik két mappa van közvetlenül az Iskolai munkák mappában?',
      answers: ['Magyar és Matematika', 'Fogalmazások és Gyakorlás', 'Magyar és Fogalmazások'],
      correct: 0,
      feedback: 'A közvetlen almappák ugyanazon a következő szinten állnak: Magyar és Matematika. A Fogalmazások és a Gyakorlás már ezek almappái.',
      hierarchy: {
        root: 'Iskolai munkák',
        branches: [
          { name: 'Magyar', children: ['Fogalmazások', 'Olvasmányok'] },
          { name: 'Matematika', children: ['Gyakorlás', 'Dolgozatok'] }
        ]
      }
    }
  ],

  building: {
    folders: ['Magyar', 'Matematika', 'Digitális kultúra', 'Természettudomány', 'Képek', 'Videók'],
    required: ['Magyar', 'Matematika', 'Digitális kultúra', 'Természettudomány'],
    task: 'Állíts össze egy jól használható digitális iskolatáskát! Válaszd ki azt a négy tantárgyi mappát, amely mindenképpen kerüljön bele.'
  },

  practicalChecklist: [
    'Keresd meg a tanár által megadott meghajtót vagy mappát!',
    'Hozz létre benne egy, a nevedet jelölő mappát!',
    'Készíts benne legalább négy tantárgyi almappát!',
    'Ellenőrizd a mappaneveket, majd mutasd meg a kész szerkezetet a tanárnak!'
  ],

  practicalSteps: [
    {
      icon: '🗂️', title: 'Nyisd meg a Fájlkezelőt!',
      action: 'Kattints a tálcán a sárga mappa ikonra. Billentyűzettel a Windows + E kombinációt is használhatod.',
      help: 'Ha nem látod a sárga mappát, nyisd meg a Start menüt, és kezdd el begépelni: Fájlkezelő.',
      screenshot: 'practical01.png'
    },
    {
      icon: '💾', title: 'Keresd meg a kijelölt helyet!',
      action: 'A bal oldali listában válaszd az Ez a gép lehetőséget, majd keresd meg az Adat nevű meghajtót.',
      help: 'A betűjele legtöbbször D:, de eltérhet. A meghajtó nevét figyeld. Ha nem találod, ne hozz létre máshol mappát, hanem kérj segítséget.',
      screenshot: 'practical02.png'
    },
    {
      icon: '📁', title: 'Készíts saját mappát!',
      action: 'Készíts új mappát, majd add neki a saját nevedet. Használhatod a felső Új → Mappa gombot vagy az üres területen a jobb egérgomb → Új → Mappa útvonalat.',
      help: 'Ha már van saját mappád, ne készíts még egyet. Nyisd meg a meglévőt.',
      screenshot: 'practical03.png'
    },
    {
      icon: '📚', title: 'Készíts tantárgyi almappákat!',
      action: 'Nyisd meg a saját mappádat, majd készíts legalább négy mappát: Magyar, Matematika, Digitális kultúra és Természettudomány.',
      help: 'Mindegyik mappa külön készüljön. Figyelj a szóközökre és az ékezetekre.',
      screenshot: 'practical04.png'
    },
    {
      icon: '✅', title: 'Ellenőrizd a munkádat!',
      action: 'Nézd meg a címsorban, hogy valóban a saját mappádban vagy-e, és ellenőrizd a mappaneveket. Ezután mutasd meg a kész szerkezetet a tanárnak.',
      help: 'Elírás esetén kattints a mappára jobb egérgombbal, majd válaszd az Átnevezés parancsot.',
      screenshot: 'practical05.png'
    }
  ]
};
