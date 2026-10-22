window.DIGISULI_DATA = {
  systems: [
    {
      device: '💻 Iskolai számítógép',
      question: 'Melyik operációs rendszerrel találkozhatsz leggyakrabban az iskolai számítógépen?',
      answers: ['Windows', 'Android', 'iOS'],
      correct: 0,
      feedback: 'Az iskolai számítógépeken leggyakrabban Windows fut. Ez kezeli többek között az ablakokat, a fájlokat és az alkalmazásokat.'
    },
    {
      device: '📱 Androidos telefon',
      question: 'Mi működteti ezt a telefont?',
      answers: ['Windows', 'Android', 'PowerPoint'],
      correct: 1,
      feedback: 'Az Android operációs rendszer. A PowerPoint alkalmazás, nem operációs rendszer.'
    },
    {
      device: '📱 iPhone',
      question: 'Melyik operációs rendszer tartozik hozzá?',
      answers: ['iOS', 'Android', 'OneDrive'],
      correct: 0,
      feedback: 'Az iPhone operációs rendszere az iOS. A OneDrive felhőtárhely.'
    }
  ],

  apps: [
    {
      task: 'Szöveges beszámolót készítesz.',
      answers: ['Word', 'PowerPoint', 'Forms'],
      correct: 0,
      feedback: 'A Word szöveges dokumentumok készítésére való.'
    },
    {
      task: 'Bemutatót készítesz képekkel és diákkal.',
      answers: ['Excel', 'PowerPoint', 'Outlook'],
      correct: 1,
      feedback: 'A PowerPoint bemutatók készítésére szolgál.'
    },
    {
      task: 'Tesztet vagy kérdőívet állítasz össze.',
      answers: ['Forms', 'OneDrive', 'Word'],
      correct: 0,
      feedback: 'A Forms tesztek és kérdőívek készítésére használható.'
    },
    {
      task: 'Iskolai fájlodat felhőben szeretnéd tárolni.',
      answers: ['Teams', 'OneDrive', 'Paint'],
      correct: 1,
      feedback: 'A OneDrive felhőtárhely: megfelelő fiókkal több eszközről is elérheted a fájljaidat.'
    }
  ],

  storage: [
    {
      statement: 'A számítógép Dokumentumok mappájába mentett fájl automatikusan minden másik gépen is megjelenik.',
      correct: false,
      feedback: 'A csak helyben mentett fájl azon a gépen található. Másik gépen akkor éred el, ha átmásolod vagy felhőbe mented.'
    },
    {
      statement: 'A OneDrive-ba mentett fájl másik gépről is elérhető lehet, ha a megfelelő fiókkal belépsz.',
      correct: true,
      feedback: 'Ez a felhőtárhely egyik fontos előnye.'
    },
    {
      statement: 'A helyi Word-fájlt érdemes munka közben Ctrl + S billentyűkkel is menteni.',
      correct: true,
      feedback: 'A Ctrl + S a mentés gyorsbillentyűje. A felhőben tárolt fájloknál automatikus mentés is működhet.'
    }
  ],

  teamsSteps: [
    'Lépj be a megfelelő iskolai fiókkal!',
    'Nyisd meg a megfelelő tantárgyi csapatot!',
    'Keresd meg a Feladatok részt!',
    'Olvasd el az utasítást és a határidőt!',
    'Nyisd meg vagy csatold a munkádat!',
    'Ellenőrizd a mentést, majd add be!'
  ]
};
