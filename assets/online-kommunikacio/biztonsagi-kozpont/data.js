window.SAFETY_CASES = [
  {
    id: 'other-side',
    title: 'Ki van a másik oldalon?',
    subtitle: 'Ismeretlenek, titkolózás és álprofilok',
    icon: '💬', enabled: true, maxScore: 10,
    videos: [
      {
        id: 'secret-friendship', title: 'Titkos internetes barátság', youtubeId: 'DOa4Qrzo6QQ',
        prompt: 'Figyeld meg, hogyan próbálja a farkas gyorsan megszerezni a bárány bizalmát!',
        questions: [{
          question: 'Hogyan viselkedett a juhocska, amikor a juhász megnyírta?',
          options: [
            { id: 'sad', label: 'Szomorú volt, és még a juhász szemébe sem nézett.', correct: true },
            { id: 'happy', label: 'Vidáman játszott a többiekkel.', correct: false },
            { id: 'angry', label: 'Mérges lett a juhászra, és elszaladt.', correct: false },
            { id: 'normal', label: 'Pontosan ugyanúgy viselkedett, mint korábban.', correct: false }
          ],
          success: 'A juhocska szomorúsága és a szemkontaktus kerülése jelezte, hogy valami komoly dolog történt vele.',
          help: 'Idézd fel, mit mondott a juhász: a juhocska már nem játszott a többiekkel, és még az ő szemébe sem nézett.'
        }],
        warningSigns: [
          { id: 'fast', label: 'Túl gyorsan közeli barátságot akar.', correct: true },
          { id: 'secret', label: 'Azt kéri, hogy a kapcsolat maradjon titokban.', correct: true },
          { id: 'personal', label: 'Személyes dolgokat akar megtudni.', correct: true },
          { id: 'gift', label: 'Ajándékot és új telefont ígér.', correct: true },
          { id: 'meeting', label: 'Egyedüli találkozóra hívja.', correct: true },
          { id: 'hello', label: 'Udvariasan köszön.', correct: false }
        ]
      },
      {
        id: 'fake-profile', title: 'Nem biztos, hogy az van a profil mögött…', youtubeId: 'heYBqZJiFKc',
        prompt: 'Figyeld meg, hogyan kapott Jancsi meghívást, és mit tudott valójában a meghívóról!',
        questions: [{
          question: 'Hogyan került Jancsi a jelmezbálra?',
          options: [
            { id: 'online-invite', label: 'Az interneten kapott meghívót egy ismeretlentől.', correct: true },
            { id: 'friend-invite', label: 'Egy régi barátja személyesen hívta meg.', correct: false },
            { id: 'school-event', label: 'Az iskolában szervezett jelmezbálra ment.', correct: false },
            { id: 'poster', label: 'Egy plakáton olvasott a jelmezbálról.', correct: false }
          ],
          success: 'Jancsi egy interneten megismert ismeretlentől kapott meghívót, ezért nem tudhatta biztosan, ki várja a jelmezbálon.',
          help: 'Idézd fel a beszélgetést: Jancsi azt mondta, hogy csak az interneten írogattak egymásnak.'
        }],
        decision: {
          question: 'Egy új internetes ismerős azt mondja, hogy veled egyidős, és személyes találkozóra hív. Melyik két lépés biztonságos?',
          options: [
            { id: 'adult', title: 'Szólok egy megbízható felnőttnek.', note: 'Megmutatom az üzeneteket, és nem indulok el egyedül.', correct: true },
            { id: 'curious', title: 'Válaszolok, mert kíváncsi vagyok.', note: 'Majd később eldöntöm, hogy találkozom-e vele.', correct: false },
            { id: 'address', title: 'Elküldöm, hol lakom.', note: 'Így könnyebben megtaláljuk egymást.', correct: false },
            { id: 'block', title: 'Nem találkozom vele, és megszakítom a kapcsolatot.', note: 'Gyanús helyzetben letiltom és jelentem is.', correct: true }
          ]
        }
      }
    ]
  },
  {
    id: 'images', title: 'Mi történhet a képeimmel?', subtitle: 'Digitális lábnyom, beleegyezés és továbbküldés', icon: '🖼️', enabled: true, maxScore: 14,
    videos: [
      {
        id: 'internet-remembers', title: 'Az internet nem felejt', youtubeId: 'Ki8ZgoudUv0',
        prompt: 'Figyeld meg, hogyan került elő egy régi felvétel, amelyről Jancsi azt hitte, már senki sem emlékszik rá!',
        questions: [
          { question: 'Milyen „különleges képességére” derül fény Jancsinak egy régi felvétel alapján?', options: [
            { id: 'burp-talk', label: 'Böfögve tud beszélni.', correct: true }, { id: 'sheep-talk', label: 'Érti a juhok beszédét.', correct: false },
            { id: 'sing', label: 'Egyszerre több szólamban tud énekelni.', correct: false }, { id: 'dance', label: 'Bekötött szemmel is tud táncolni.', correct: false }
          ], success: 'A régi felvételen Jancsi böfögve beszélt. A kínosnak érzett videó évekkel később is előkerülhetett.', help: 'Idézd fel, mit mutattak meg neki a régi internetes felvételen.' },
          { question: 'Miért került Jancsi kellemetlen helyzetbe?', options: [
            { id: 'old-found', label: 'Egy régi, kínos felvétele még mindig megtalálható volt az interneten.', correct: true }, { id: 'new-recording', label: 'Valaki akkor készített róla egy teljesen új videót.', correct: false },
            { id: 'lost-phone', label: 'Elvesztette a telefonját a jelmezbálon.', correct: false }, { id: 'wrong-name', label: 'Elfelejtette egy régi ismerőse nevét.', correct: false }
          ], success: 'A régen feltöltött vagy elküldött tartalom később is előkerülhet, mert másolat készülhet róla.', help: 'Gondolj arra, miért tudták évekkel később is megmutatni neki ezt a felvételt.' }
        ]
      },
      {
        id: 'embarrassing-recording', title: 'Kellemetlen helyzetben készült felvétel', youtubeId: 'hUDjBqv6JT8',
        prompt: 'Figyeld meg, hogyan válhat egy viccesnek szánt kép vagy videó később valaki megszégyenítésének eszközévé!',
        questions: [
          { question: 'Kitől ijedtek meg a farkasok?', options: [
            { id: 'hunter', label: 'A vadásztól.', correct: true }, { id: 'jancsi', label: 'Jancsitól.', correct: false }, { id: 'farmer', label: 'A gazdától.', correct: false }, { id: 'rams', label: 'A kosoktól.', correct: false }
          ], success: 'A farkasok a vadásztól ijedtek meg.', help: 'Gondold végig, ki jelentett valódi veszélyt a farkasokra.' },
          { question: 'Mire figyelmeztet a videó a fényképezéssel és videózással kapcsolatban?', options: [
            { id: 'vulnerable', label: 'Ne engedd, hogy kellemetlen vagy kiszolgáltatott helyzetben felvételt készítsenek rólad.', correct: true }, { id: 'never-camera', label: 'Soha, semmilyen helyzetben ne szerepelj fényképen.', correct: false },
            { id: 'only-phone', label: 'Csak telefonnal készült felvétel lehet veszélyes.', correct: false }, { id: 'friends-safe', label: 'Barátok előtt bármilyen felvétel biztosan veszélytelen.', correct: false }
          ], success: 'Jogod van nemet mondani, ha egy felvétel kellemetlen, megalázó vagy kiszolgáltatott helyzetben mutatna.', help: 'A videó végén elhangzó tanács arra utal, milyen helyzetet használhat fel valaki később ellened.' }
        ]
      },
      {
        id: 'forwarded-photo', title: 'A továbbküldött kép', youtubeId: '_XKg3JfOYpM',
        prompt: 'Figyeld meg, mi történt azzal a képpel, amelyet eredetileg csak egyetlen személynek szántak!',
        questions: [
          { question: 'Ki készítette a juhocskáról a gyapjú nélküli képet?', options: [
            { id: 'herself', label: 'A juhocska saját magáról készítette.', correct: true }, { id: 'ram', label: 'A kos készítette róla titokban.', correct: false }, { id: 'shepherd', label: 'A juhász fényképezte le.', correct: false }, { id: 'stranger', label: 'Egy ismeretlen készítette az erdőben.', correct: false }
          ], success: 'A juhocska saját magáról készítette a képet, majd elküldte valakinek.', help: 'Idézd fel, mit mondtak arról, hogyan készült a gyapjú nélküli fénykép.' },
          { question: 'Miért rejtőzködött és szégyenkezett a juhocska?', options: [
            { id: 'forwarded', label: 'A személyes képét megtalálták és sokaknak továbbküldték.', correct: true }, { id: 'lost', label: 'Eltévedt, és nem találta vissza a nyájhoz.', correct: false }, { id: 'costume', label: 'Nem tetszett neki a jelmeze.', correct: false }, { id: 'message', label: 'Nem kapott választ egy üzenetére.', correct: false }
          ], success: 'Ha egy képet elküldünk, elveszíthetjük fölötte az irányítást: más lementheti és továbbküldheti.', help: 'Idézd fel, mit talált meg egy másik kos, és mit tett vele az interneten.' }
        ]
      }
    ],
    sharingRules: [
      { id: 'consent', label: 'Megkérdezem a képen szereplőt, hozzájárul-e a megosztáshoz.', correct: true },
      { id: 'background', label: 'Megnézem, nem látszik-e személyes adat vagy felismerhető hely a háttérben.', correct: true },
      { id: 'future', label: 'Átgondolom, később is vállalható lenne-e a kép.', correct: true },
      { id: 'disappears', label: 'Az eltűnő üzenetként küldött képet biztosan senki sem tudja elmenteni.', correct: false },
      { id: 'friends-only', label: 'Ha csak ismerősök látják, a kép biztosan nem kerülhet máshová.', correct: false }
    ],
    decision: { question: 'Egy osztálycsoportba kellemetlen helyzetben készült kép érkezik egy társadról. Melyik két lépés helyes?', options: [
      { id: 'dont-forward', title: 'Nem küldöm tovább és nem reagálok rá gúnnyal.', note: 'Nem növelem a kép terjedését és a megszégyenítést.', correct: true },
      { id: 'support-report', title: 'Támogatom az érintettet, és szólok egy megbízható felnőttnek.', note: 'A tartalmat a felületen is lehet jelenteni.', correct: true },
      { id: 'save-joke', title: 'Elmentem, mert később még vicces lehet.', note: 'Attól, hogy nem én készítettem, még részt vennék a visszaélésben.', correct: false },
      { id: 'share-warning', title: 'Továbbküldöm másoknak, hogy figyelmeztessem őket.', note: 'A jó szándékú továbbküldés is tovább terjeszti a képet.', correct: false }
    ] }
  },
  {
    id: 'bullying', title: 'Mit tegyek, ha bántanak?', subtitle: 'Zaklatás, fenyegetés és segítségkérés', icon: '🛟', enabled: true, maxScore: 12,
    videos: [
      {
        id: 'threats', title: 'Zaklatás és fenyegetés', youtubeId: 'AL_ha-1jbAg',
        prompt: 'Figyeld meg, milyen jelekből látszik, hogy a helyzet már nem egyszerű kellemetlenség, hanem komoly zaklatás!',
        questions: [
          { question: 'Mikor érkeztek a zaklató üzenetek?', options: [
            { id: 'day-night', label: 'Egész nap, még éjszaka is.', correct: true }, { id: 'school-only', label: 'Csak az iskolai szünetekben.', correct: false }, { id: 'once', label: 'Csak egyetlen alkalommal.', correct: false }, { id: 'weekend', label: 'Csak hétvégén.', correct: false }
          ], success: 'Az üzenetek egész nap, még éjszaka is érkeztek: a zaklatás folyamatosan megzavarta az áldozat nyugalmát.', help: 'Idézd fel, mit mondtak arról, hogy még éjszaka sem volt nyugalma.' },
          { question: 'Mit tanácsol a videó, ha valaki fenyeget, követ vagy folyamatosan zaklat?', options: [
            { id: 'tell-report', label: 'Vedd komolyan, szólj a hozzád közel állóknak, és szükség esetén jelezd a rendőrségnek.', correct: true }, { id: 'answer-back', label: 'Fenyegesd meg te is, hogy abbahagyja.', correct: false },
            { id: 'hide', label: 'Tartsd titokban, nehogy rosszabb legyen.', correct: false }, { id: 'delete-all', label: 'Törölj rögtön mindent, hogy ne kelljen látnod.', correct: false }
          ], success: 'A súlyos fenyegetést komolyan kell venni: őrizd meg a bizonyítékot, szólj megbízható embernek, és kérjetek hivatalos segítséget.', help: 'A videó végén elhangzik, hogy a fenyegetésről a közeli embereknek és a rendőrségnek is szólni kell.' }
        ]
      },
      {
        id: 'mati-story', title: 'Máti története', youtubeId: 'U_hkKlYtRrY',
        prompt: 'Figyeld meg, ki bántotta Mátit az interneten, és hogyan sikerült végül segítséget kapnia!',
        questions: [
          { question: 'Ki írt bántó dolgokat Mátiról az interneten?', options: [
            { id: 'cousin', label: 'A saját unokatestvére.', correct: true }, { id: 'stranger', label: 'Egy teljesen ismeretlen ember.', correct: false }, { id: 'teacher', label: 'Az egyik tanára.', correct: false }, { id: 'friend', label: 'A legjobb barátja.', correct: false }
          ], success: 'Mátit a saját unokatestvére bántotta az interneten. Az online zaklatás ismerősök között is megtörténhet.', help: 'A videó elején Máti pontosan elmondja, milyen rokoni kapcsolatban állt a bántalmazóval.' },
          { question: 'Mi segített végül Mátinak abban, hogy megváltozzon a helyzet?', options: [
            { id: 'explain-again', label: 'Újra, részletesen elmondta a szüleinek, mi történik vele.', correct: true }, { id: 'leave-internet', label: 'Végleg abbahagyta az internetezést.', correct: false },
            { id: 'fight', label: 'Nyilvánosan visszasértette az unokatestvérét.', correct: false }, { id: 'ignore', label: 'Többé senkinek sem beszélt róla.', correct: false }
          ], success: 'Máti újra elmagyarázta a helyzetet a szüleinek, akik ezután valóban közbe tudtak lépni.', help: 'Az első tanács nem oldotta meg a problémát, ezért Máti ismét leült a szüleivel beszélni.' }
        ]
      }
    ],
    actionSteps: [
      { id: 'save', label: 'Megőrzöm az üzeneteket, és képernyőképet készítek bizonyítéknak.', correct: true },
      { id: 'block-report', label: 'Letiltom a zaklatót, és jelentem a felületen.', correct: true },
      { id: 'tell-adult', label: 'Szólok egy megbízható felnőttnek, és megmutatom, mi történt.', correct: true },
      { id: 'official-help', label: 'Súlyos fenyegetésnél hivatalos segítséget is kérünk.', correct: true },
      { id: 'revenge', label: 'Visszasértegetem, hogy érezze, milyen rossz.', correct: false },
      { id: 'erase', label: 'Azonnal mindent törlök, mielőtt bárki meglátná.', correct: false }
    ],
    decision: { question: 'A letiltás után a zaklató új fiókból folytatja a sértegetést. Melyik két lépés a legfontosabb?', options: [
      { id: 'evidence', title: 'Megőrzöm az új üzeneteket is.', note: 'Képernyőképpel dokumentálom, hogy a zaklatás folytatódik.', correct: true },
      { id: 'adult-report', title: 'Újra szólok egy felnőttnek, és együtt jelentjük.', note: 'Ha elsőre nem oldódott meg, újra és pontosabban segítséget kérek.', correct: true },
      { id: 'insult', title: 'Most már én is visszasértegetem.', note: 'Így csak tovább fokozódhat a helyzet.', correct: false },
      { id: 'leave-all', title: 'Kilépek minden közösségből és senkinek sem szólok.', note: 'Nem neked kell egyedül eltűnnöd a zaklatás miatt.', correct: false }
    ] }
  },
  { id: 'truth', title: 'Mit higgyek el?', subtitle: 'Hamis állítások, előítéletek és ellenőrzés', icon: '🔍', enabled: false, maxScore: 0 }
];