(() => {
  const truthCase = (window.SAFETY_CASES || []).find(item => item.id === 'truth');
  if (!truthCase) return;

  Object.assign(truthCase, {
    enabled: true,
    maxScore: 10,
    video: {
      id: 'false-claims',
      title: 'Mit higgyek el?',
      youtubeId: 'Jnm46zjiRe8',
      prompt: 'Figyeld meg, mit olvasott Jancsi az interneten a juhokról, és hogyan derült ki, hogy az állítás nem igaz!',
      questions: [
        {
          question: 'Miért gondolta Jancsi, hogy az igazi juh fehér színű?',
          options: [
            { id: 'read-online', label: 'Mert ezt olvasta az interneten.', correct: true },
            { id: 'shepherd-said', label: 'Mert ezt mondta neki a juhász.', correct: false },
            { id: 'white-only', label: 'Mert addig csak fehér juhot látott.', correct: false },
            { id: 'milk-label', label: 'Mert ez volt ráírva a tejesüvegre.', correct: false }
          ],
          success: 'Jancsi az interneten olvasta ezt az állítást, és eleinte ellenőrzés nélkül elhitte.',
          help: 'Idézd fel, mire hivatkozott Jancsi, amikor a fehér juhokat tartotta igazinak.'
        },
        {
          question: 'Mit bizonyított a juhász a tej megkóstoltatásával?',
          options: [
            { id: 'all-tasty', label: 'A tarka és a fekete juh teje is finom, ezért a szín alapján tett állítás nem volt igaz.', correct: true },
            { id: 'white-best', label: 'Csak a fehér juh teje volt iható.', correct: false },
            { id: 'colour-taste', label: 'A juh színe mindig meghatározza a tej ízét.', correct: false },
            { id: 'one-sheep', label: 'A juhász csak egyetlen juhot fejt meg.', correct: false }
          ],
          success: 'A juhász mindegyik juhot megfejte, és Jancsi megtapasztalta, hogy mindegyikük teje finom. Az interneten olvasott általánosítás tehát nem volt igaz.',
          help: 'Gondold végig, miért nem árulta el a juhász, melyik juh tejét adta Jancsinak.'
        }
      ]
    },
    claimChecks: [
      { id: 'source', label: 'Megnézem, ki és hol tette közzé az állítást.', correct: true },
      { id: 'evidence', label: 'Keresek bizonyítékot vagy ellenőrizhető adatot.', correct: true },
      { id: 'compare', label: 'Más, egymástól független forrásokat is megnézek.', correct: true },
      { id: 'emotion', label: 'Igaznak tekintem, ha erős érzelmet vált ki belőlem.', correct: false },
      { id: 'many-shares', label: 'Igaznak tekintem, ha már nagyon sokan megosztották.', correct: false }
    ],
    factOpinion: [
      { id: 'checkable', label: 'Ellenőrizhető adatot, helyet, időpontot vagy eseményt állít.', correct: true },
      { id: 'evidence-change', label: 'Új bizonyíték alapján igazolható vagy cáfolható.', correct: true },
      { id: 'feeling', label: 'Csak azt fejezi ki, hogy valaki mit szeret vagy mit gondol.', correct: false },
      { id: 'loud', label: 'Attól válik ténnyé, hogy valaki nagyon határozottan mondja.', correct: false }
    ],
    decision: {
      question: 'Egy felkavaró bejegyzés egy egész embercsoportról súlyos állítást tesz, de nem jelöl meg forrást. Melyik két lépés a legjobb?',
      options: [
        { id: 'pause', title: 'Nem osztom tovább azonnal.', note: 'Az erős érzelem nem bizonyítja, hogy az állítás igaz.', correct: true },
        { id: 'verify', title: 'Megkeresem az eredeti forrást és más megbízható forrásokat.', note: 'A részleteket és a bizonyítékokat is ellenőrzöm.', correct: true },
        { id: 'share-question', title: 'Továbbküldöm azzal, hogy „vajon igaz?”', note: 'A kérdőjeles továbbküldés is terjeszti az ellenőrizetlen állítást.', correct: false },
        { id: 'comments', title: 'A hozzászólások száma alapján döntök.', note: 'A népszerűség nem bizonyíték.', correct: false }
      ]
    }
  });
})();
