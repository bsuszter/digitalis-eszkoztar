---
title: "Tananyagfejlesztési és publikálási folyamat"
type: "note"
type_label: "Általános jegyzet"
date: "2026-08-24"
notebook: "EGYEBEK"
section: "Moodle"
tags: []
app_id: "page_20260824_tananyagfejlesztesi_folyamat"
---
# Tananyagfejlesztési és publikálási folyamat

Ez a dokumentum a Digitális eszköztár és a Moodle-alapú tananyagfejlesztés jelenlegi, bevált munkafolyamatát rögzíti.

## 1. Prompt készítése

A fejlesztés egy, az adott lecke vagy tanulási egység tartalmára vonatkozó **prompttal** indul.

A prompt rögzíti a szükséges pedagógiai és tartalmi kereteket, például:

- évfolyam;
- tanulási cél;
- tanulói feladat;
- időkeret;
- pontozás;
- szükséges digitális eszközök;
- beadás módja;
- kapcsolódás más leckékhez vagy a Digitális eszköztárhoz.

## 2. A kanonikus Markdown-forrás elkészítése

A fejlesztő – jelen esetben ChatGPT – elkészíti a tananyag **Markdown-forrását**, és közvetlenül feltölti a GitHub-repozitórium megfelelő helyére.

A Markdown-változat a tananyag archiválható és újrahasznosítható forrása.

## 3. A helyi GitHub-példány frissítése

A GitHubon történt módosítások után a helyi repót a **GitHub Desktopban Pull** művelettel frissíteni kell.

Ezzel a helyi projektmappa is megkapja a GitHubon létrehozott vagy módosított fájlokat.

## 4. A webes változat ellenőrzése

A GitHub Pages-változat itt érhető el:

<https://bsuszter.github.io/digitalis-eszkoztar/>

Itt ellenőrizhető többek között:

- a megjelenés;
- a navigáció;
- a hivatkozások;
- a Digitális eszköztár kapcsolatai;
- a tananyag szerkezete és olvashatósága.

## 5. Moodle-export elkészítése

A Moodle-ban használható HTML-változat az `exports/moodle/...` mappastruktúra megfelelő helyére kerül.

Egy tananyagelemhez szükség szerint több Moodle-export is tartozhat:

- teljes tananyag HTML;
- rövid leírás;
- beadási leírás;
- más Moodle-specifikus tartalom.

## 6. Kézi beillesztés a Moodle-ba

A Moodle **nem frissül automatikusan** a GitHub-repozitóriumból.

Az elkészült HTML-exportot kézzel kell a megfelelő Moodle-oldal, feladat vagy más tevékenység HTML-forrásába beilleszteni.

**Fontos:** a tanulók elsődleges munkafelülete a Moodle, ezért minden Moodle-t érintő változást külön ellenőrizni és kézzel átvezetni szükséges.

## 7. A GitHub és a Moodle szerepe

### GitHub / Digitális eszköztár

- tudástár;
- kanonikus tartalom;
- újrahasznosítható segítség;
- webes megjelenítés;
- archiválás;
- offline változat kiindulópontja.

### Moodle

- tényleges tanulási környezet;
- tanulói feladatok;
- tanulási útvonal;
- beadás;
- pontozás;
- tanórai használat.

Röviden:

> **A tudástár a GitHubon marad, a tanulási folyamat a Moodle-ban történik.**

## 8. Offline változat elkészítése

A helyi repó frissítése után futtatni kell:

```text
build-offline.bat
```

A folyamat létrehozza vagy frissíti az:

```text
offline-site
```

mappát.

## 9. Offline használat és archiválás

Az `offline-site` mappa:

- közvetlenül helyben megnyitható;
- internetkapcsolat nélkül használható;
- biztonságos helyre másolható;
- hosszú távú archiválásra alkalmas.

## Rövid folyamatábra

**Prompt → Markdown a GitHubra → GitHub Desktop Pull → io ellenőrzés → Moodle HTML export → kézi Moodle-beillesztés → `build-offline.bat` → `offline-site` → archiválás**

## Alapelv

> **Egy tartalmi forrásból készül webes, Moodle-ban használható és offline változat; a GitHub a tudástár és archívum, a Moodle pedig a tényleges tanulási környezet.**
