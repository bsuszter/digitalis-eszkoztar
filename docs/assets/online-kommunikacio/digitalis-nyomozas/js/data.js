// =========================================================
// DIGITÁLIS NYOMOZÓIRODA
// Fájl: js/data.js
//
// Ebben a fájlban tároljuk a játék szöveges tartalmait,
// az ügyek adatait, a nyomokat, a feladatokat
// és a visszajelzéseket.
// =========================================================

export const GAME_DATA = {
    title: "Digitális Nyomozóiroda",

    subtitle: "Internetes biztonsági nyomozás",

    version: "0.4.2",

    intro: {
        eyebrow: "Szigorúan bizalmas ügyirat",

        title:
            "Mennyit tudhat meg rólad egy idegen az interneten?",

        description:
            "Egy tanuló különös üzenetet kapott. " +
            "Az üzenet írója ismeri a kutyája nevét, " +
            "a hobbiját, a városát és azt is, " +
            "hogy melyik iskolába jár.",

        missionLabel: "A küldetésed",

        missionText:
            "Vizsgáld meg a digitális nyomokat, " +
            "különítsd el a biztos adatokat a feltételezésektől, " +
            "és derítsd ki, hogyan lehetett összeállítani " +
            "a tanuló profilját!"
    },

    briefing: {
        eyebrow: "Ügyindítás",

        title: "Nyomozói eligazítás",

        description:
            "A teljes ügy több különböző internetes felületből áll. " +
            "Egyetlen nyom önmagában kevésnek tűnhet, " +
            "együtt azonban részletes képet adhat egy emberről.",

        steps: [
            {
                number: "01",
                label:
                    "Keresd meg az árulkodó részleteket!"
            },
            {
                number: "02",
                label:
                    "Döntsd el, mi biztos adat és mi csak következtetés!"
            },
            {
                number: "03",
                label:
                    "Javasolj biztonságosabb megoldást!"
            }
        ]
    },

    headquarters: {
        eyebrow: "Nyomozói Központ",

        title: "Válassz egy digitális nyomot!",

        description:
            "A nyomokat sorrendben kell feldolgoznod. " +
            "Minden lezárt ügy után újabb bizonyíték válik elérhetővé.",

        progressLabel: "Nyomozás állása",

        cases: [
            {
                id: "social-post",
                number: "01",
                title: "Közösségi média",
                subtitle: "Nyilvános bejegyzés",
                description:
                    "Vizsgálj meg egy nyilvános közösségi média bejegyzést, " +
                    "és keresd meg az árulkodó részleteket!",
                icon: "📱",
                status: "unlocked"
            },

            {
                id: "game-profile",
                number: "02",
                title: "Játékprofil",
                subtitle: "Online játékos adatlapja",
                description:
                    "Derítsd ki, milyen személyes adatok és szokások " +
                    "olvashatók ki egy játékprofilból!",
                icon: "🎮",
                status: "locked"
            },

            {
                id: "school-page",
                number: "03",
                title: "Iskolai honlap",
                subtitle: "Nyilvános eredménylista",
                description:
                    "Vizsgáld meg, milyen személyes adatokat tett közzé " +
                    "egy iskola a saját weboldalán!",
                icon: "🏫",
                status: "locked"
            }
        ]
    },

    socialPostCase: {
        id: "social-post",

        number: "01",

        eyebrow: "Aktív ügy",

        title: "Közösségi média bejegyzés",

        instruction:
            "Vizsgáld meg alaposan a bejegyzést, " +
            "és kattints azokra a részletekre, amelyek személyes adatot " +
            "vagy valamilyen következtethető információt árulnak el!",

        image: {
            src: "assets/images/pic01.png",

            alt:
                "Fiktív közösségi média bejegyzés PixelBeni profiljáról. " +
                "A képen egy fiú, egy Zokni nevű kutya, egy kosárlabda, " +
                "egy iskolaépület és egy Kossuth utca feliratú tábla látható."
        },

        hotspotInstruction:
            "Kattints az árulkodó részletekre a képen!",

        totalHotspots: 5,

        hotspots: [
            {
                id: "dog-name",

                accessibleLabel:
                    "A kutya nyakörvén látható név",

                title:
                    "A kutya neve: Zokni",

                category:
                    "Biztos adat",

                feedback:
                    "A kutya nyakörvén jól olvasható a Zokni név. " +
                    "Ez egy biztosan azonosítható személyes részlet.",

                scoreType:
                    "investigation",

                points:
                    10,
                evidence: {
                    id: "social-post-dog-name",

                    title:
                        "A kutya neve: Zokni",

                    source:
                        "Közösségi média bejegyzés",

                    certainty:
                        "Biztos adat",

                    description:
                        "A kutya nyakörvén jól olvasható a Zokni név."
                },

                x:
                    58,

                y:
                    62,

                width:
                    8,

                height:
                    8
            },

            {
                id: "basketball",

                accessibleLabel:
                    "A fiú kezében látható kosárlabda",

                title:
                    "Kosárlabda",

                category:
                    "Hobbi vagy sport",

                feedback:
                    "A kosárlabda és a poszt szövege együtt arra utal, " +
                    "hogy a fiú kosárlabdaedzésre jár.",

                scoreType:
                    "investigation",

                points:
                    10,
                evidence: {
                    id: "social-post-basketball",

                    title:
                        "Kosárlabdához kapcsolódik",

                    source:
                        "Közösségi média bejegyzés",

                    certainty:
                        "Valószínű következtetés",

                    description:
                        "A kosárlabda és a poszt edzésre utaló szövege alapján valószínű, hogy a felhasználó kosárlabdázik."
                },

                x:
                    38,

                y:
                    51,

                width:
                    10,

                height:
                    12
            },

            {
                id: "school-name",

                accessibleLabel:
                    "Az iskolaépület felirata",

                title:
                    "Az iskola neve",

                category:
                    "Felismerhető helyszín",

                feedback:
                    "A háttérben jól olvasható az iskola neve. " +
                    "Ez segíthet pontosan azonosítani, hová jár a fiú.",

                scoreType:
                    "investigation",

                points:
                    10,
                evidence: {
                    id: "social-post-school-name",

                    title:
                        "Felismerhető az iskola",

                    source:
                        "A bejegyzés képének háttere",

                    certainty:
                        "Biztos adat",

                    description:
                        "A háttérben olvasható az iskola neve, ezért a helyszín pontosabban azonosítható."
                },

                x:
                    64,

                y:
                    36,

                width:
                    12,

                height:
                    8
            },

            {
                id: "username",

                accessibleLabel:
                    "A PixelBeni felhasználónév",

                title:
                    "Felhasználónév: PixelBeni",

                category:
                    "Online azonosító",

                feedback:
                    "A felhasználónév és a profilkép más oldalakon is visszatérhet. " +
                    "Ha valaki ugyanazt a nevet és avatart használja több felületen, " +
                    "a profiljai sokkal könnyebben összekapcsolhatók.",

                scoreType:
                    "evidence",

                points:
                    10,
                evidence: {
                    id: "social-post-username",

                    title:
                        "Online azonosító: PixelBeni",

                    source:
                        "Közösségi média profil",

                    certainty:
                        "Biztos adat",

                    description:
                        "A PixelBeni felhasználónév és a profilkép később más profilok összekapcsolását is segítheti."
                },

                x:
                    22,

                y:
                    8,

                width:
                    23,

                height:
                    10
            },

            {
                id: "routine-text",

                accessibleLabel:
                    "A poszt szövege és közzétételi időpontja",

                title:
                    "Időpont és napi rutin",

                category:
                    "Következtethető információ",
                feedback:
                    "A poszt szövege arra utal, hogy a felhasználó " +
                    "ennél az iskolánál találkozik a csapattal, " +
                    "és másnap ismét ugyanott lesz. " +
                    "Ez napi rutinra és jövőbeli tartózkodási helyre utaló információ.",

                scoreType:
                    "evidence",

                points:
                    10,
                evidence: {
                    id: "social-post-routine",

                    title:
                        "Másnap ugyanott lesz",

                    source:
                        "A bejegyzés szövege",

                    certainty:
                        "Biztosan közölt információ",

                    description:
                        "A felhasználó előre közli, hogy másnap ismét ugyanazon a helyen találkozik a csapattal."
                },

                x:
                    23,

                y:
                    17,

                width:
                    43,

                height:
                    8
            }
        ],

        safetyTask: {
            title:
                "Tedd biztonságosabbá a posztot!",

            question:
                "Melyik három változtatás csökkentené érdemben " +
                "a személyes adatok kiszivárgásának kockázatát?",

            instruction:
                "Válassz ki pontosan három lehetőséget!",

            requiredSelectionCount:
                3,

            pointsPerCorrectAnswer:
                10,

            options: [
                {
                    id: "hide-dog-name",

                    text:
                        "A kutya neve ne legyen látható.",

                    isCorrect:
                        true,

                    feedback:
                        "Jó döntés. A név egy újabb azonosítható részletet adhat."
                },

                {
                    id: "hide-school-name",

                    text:
                        "Az iskola neve ne szerepeljen a háttérben.",

                    isCorrect:
                        true,

                    feedback:
                        "Jó döntés. A felismerhető iskola pontos helyinformációt ad."
                },

                {
                    id: "remove-future-location",

                    text:
                        "Ne írja ki, hogy másnap ugyanott lesz.",

                    isCorrect:
                        true,

                    feedback:
                        "Jó döntés. A jövőbeli tartózkodási hely megosztása kockázatos."
                },

                {
                    id: "remove-emojis",

                    text:
                        "Ne használjon emojit.",

                    isCorrect:
                        false,

                    feedback:
                        "Az emojik önmagukban nem teszik veszélyesebbé a posztot."
                },

                {
                    id: "remove-basketball",

                    text:
                        "Ne szerepeljen a kosárlabda.",

                    isCorrect:
                        false,

                    feedback:
                        "A hobbi megjelenése önmagában általában nem veszélyes. " +
                        "A kockázatot főként a pontos hely és a napi rutin adja."
                }
            ]
        },

        evidenceSummary: {
            title:
                "Megtalált nyomok",

            emptyMessage:
                "Még nem találtál nyomot.",

            completeMessage:
                "Minden nyomot megtaláltál. Most oldd meg a biztonsági feladatot!"
        }
    }
};