<div class="project-hero">
  <div>
    <span class="project-kicker">OKOSTEREM · 3. MÉRFÖLDKŐ</span>
    <h2>📟 Készíts virtuális prototípust!</h2>
    <p>A Flowgorithmban már megterveztétek a működést. Most ugyanezt a logikát valósítjátok meg micro:biten, a MakeCode szimulátorában.</p>
  </div>
  <div class="project-hero__icon">📟</div>
</div>

<div class="project-meta">
  <span>👥 Páros munka</span>
  <span>🧭 3 / 6 mérföldkő</span>
  <span>⭐ 8 pont</span>
  <span>⏱️ kb. 2 tanóra</span>
</div>

<div class="project-highlight project-highlight--blue">
  <h2>🎯 Ugyanaz a logika, új környezetben</h2>
  <p>A Flowgorithmban már megterveztétek, <strong>milyen adat érkezik, milyen feltétel alapján dönt a rendszer, és mi történik az egyes helyzetekben.</strong></p>
  <div class="project-flow">📥 BEMENET → 🔀 FELTÉTEL → ⚙️ REAKCIÓ → 🧪 TESZT</div>
  <p>Most ezt a működést blokkprogramozással építitek meg a MakeCode felületén.</p>
</div>

<div class="project-panel project-panel--purple">
  <h2>🎛️ Miért jó a szimulátor?</h2>
  <p>Egy valódi érzékelő értéke nem mindig változik olyan gyorsan, hogy kényelmesen ki tudjuk próbálni vele a program minden állapotát. A szimulátorban viszont <strong>azonnal tudjuk változtatni a bemenetet</strong>, ezért gyorsabban ellenőrizhetjük a működést.</p>
  <div class="project-rule">🌡️ Példa: állíts be 17 °C-ot, 22 °C-ot és 28 °C-ot, és figyeld meg, helyesen reagál-e a program.</div>
</div>

<div class="project-panel project-panel--green">
  <h2>🌱 A hőmérséklet csak egy példa</h2>
  <p>Nem kell mindenkinek hőmérséklettel dolgoznia. A saját okostermetekben azt a bemenetet modellezzétek, amelyre a saját ötleteteknek szüksége van.</p>
  <div class="idea-grid">
    <div class="idea-card">🌡️ <strong>Hőmérséklet</strong><span>a szimulátorban változtatható érték</span></div>
    <div class="idea-card">🎤 <strong>Hangerő</strong><span>változóval vagy szimulált értékkel modellezhető</span></div>
    <div class="idea-card">🎚️ <strong>Potméter</strong><span>változó értékkel helyettesíthető</span></div>
    <div class="idea-card">🔘 <strong>Gombnyomás</strong><span>A/B gombbal kipróbálható</span></div>
    <div class="idea-card">👀 <strong>Közelség / IR</strong><span>szimulált értékkel vagy állapottal modellezhető</span></div>
    <div class="idea-card">✨ <strong>Saját bemenet</strong><span>válasszatok olyan modellt, amely jól helyettesíti a későbbi érzékelőt</span></div>
  </div>
</div>

<div class="project-panel project-panel--orange">
  <h2>🧭 Hogyan modellezd a saját bemeneteteket?</h2>
  <div class="idea-grid">
    <div class="idea-card">🌡️ <strong>A micro:bit is tudja mérni?</strong><span>Használjátok a megfelelő szimulált micro:bit-szenzort, például a hőmérsékletet.</span></div>
    <div class="idea-card">🔘 <strong>Esemény vagy kétállapotú jel?</strong><span>Használjátok például az A/B gombot, vagy egy 0/1 értékű változót.</span></div>
    <div class="idea-card">🔢 <strong>Később Edubit-szenzor ad majd számot?</strong><span>Most használjatok változót, amelynek az értékét próbaként könnyen meg tudjátok változtatni.</span></div>
  </div>
  <p><strong>Most nem a valódi eszköz a lényeg.</strong> Olyan helyettesítő bemenet kell, amellyel minden tervezett állapotot könnyen ki tudtok próbálni.</p>
</div>

## 🧪 Első közös próba – hőmérséklet modellezése

Először készítsetek egy egyszerű mintát. Legyen egy <strong>homerseklet</strong> nevű változó, és a program a bemenet értéke alapján jelezze, hogy <strong>hideg</strong>, <strong>megfelelő</strong> vagy <strong>meleg</strong> van.

<div class="question-stack">
  <div class="question-card"><strong>1. Nyiss új MakeCode-projektet!</strong><span>Készíts új micro:bit projektet.</span></div>
  <div class="question-card question-card--green"><strong>2. Hozd létre a homerseklet változót!</strong><span>Ebben tároljuk az aktuális értéket.</span></div>
  <div class="question-card question-card--orange"><strong>3. Adj tesztelhető bemenetet!</strong><span>Használj olyan értéket, amelyet a szimulátorban gyorsan tudsz változtatni.</span></div>
  <div class="question-card question-card--purple"><strong>4. Készíts elágazást!</strong><span>Különböztesd meg a hideg, megfelelő és meleg állapotot.</span></div>
  <div class="question-card question-card--gold"><strong>5. Adj látható reakciót!</strong><span>Az állapotokhoz tartozzon eltérő ikon, LED-kép, szám vagy rövid szöveg.</span></div>
</div>

## 🧰 Eszköztár-segítség a próbához

Ezek a kártyák <strong>kattintható segítségek</strong>, és új lapon nyílnak meg. Csak azt nézd meg, amelyikre szükséged van, majd térj vissza a saját programodhoz.

<div class="tool-grid">
  <a class="tool-card" href="https://bsuszter.github.io/digitalis-eszkoztar/eszkoztar/microbit/uj-projekt/" target="_blank" rel="noopener noreferrer"><span class="tool-icon">➕</span><span class="tool-tag">ESZKÖZTÁR-SEGÍTSÉG</span><strong>Új projekt</strong><span>MakeCode-projekt létrehozása és elnevezése.</span><span class="tool-link">Megnyitás ↗</span></a>
  <a class="tool-card" href="https://bsuszter.github.io/digitalis-eszkoztar/eszkoztar/microbit/valtozok/" target="_blank" rel="noopener noreferrer"><span class="tool-icon">📦</span><span class="tool-tag">ESZKÖZTÁR-SEGÍTSÉG</span><strong>Változók</strong><span>Változó létrehozása, értékadása és használata.</span><span class="tool-link">Megnyitás ↗</span></a>
  <a class="tool-card" href="https://bsuszter.github.io/digitalis-eszkoztar/eszkoztar/microbit/szenzorok/" target="_blank" rel="noopener noreferrer"><span class="tool-icon">🌡️</span><span class="tool-tag">ESZKÖZTÁR-SEGÍTSÉG</span><strong>Szenzorok lekérdezése</strong><span>Hőmérséklet, fényerő, gyorsulás és iránytű.</span><span class="tool-link">Megnyitás ↗</span></a>
  <a class="tool-card" href="https://bsuszter.github.io/digitalis-eszkoztar/eszkoztar/microbit/elagazas/" target="_blank" rel="noopener noreferrer"><span class="tool-icon">🔀</span><span class="tool-tag">ESZKÖZTÁR-SEGÍTSÉG</span><strong>Feltételek és elágazás</strong><span>Két vagy több állapot kezelése.</span><span class="tool-link">Megnyitás ↗</span></a>
  <a class="tool-card" href="https://bsuszter.github.io/digitalis-eszkoztar/eszkoztar/microbit/kijelzo/" target="_blank" rel="noopener noreferrer"><span class="tool-icon">🔲</span><span class="tool-tag">ESZKÖZTÁR-SEGÍTSÉG</span><strong>Kijelző és kiírás</strong><span>Ikon, LED-kép, szám vagy szöveg megjelenítése.</span><span class="tool-link">Megnyitás ↗</span></a>
</div>

<div class="project-panel project-panel--orange">
  <h2>🧪 Teszteld határértékekkel is!</h2>
  <p>Ne csak egy „normál” értéket próbáljatok ki. Nézzétek meg, mi történik kis és nagy értéknél, pontosan a határértéknél, illetve közvetlenül alatta és fölötte.</p>
</div>

## 🚀 Most jön a saját okostermetek

Vegyétek elő a Flowgorithmban elkészített algoritmust, és ugyanazt a logikát építsétek meg MakeCode-ban.

<div class="question-stack">
  <div class="question-card"><strong>1. Azonosítsátok a bemenetet!</strong><span>Mi az az érték vagy esemény, amely alapján a rendszeretek dönt?</span></div>
  <div class="question-card question-card--green"><strong>2. Modellezzétek a bemenetet!</strong><span>Válasszatok a fenti három megoldás közül olyat, amellyel a szimulátorban könnyen ki tudjátok próbálni az összes tervezett állapotot.</span></div>
  <div class="question-card question-card--orange"><strong>3. Építsétek meg a döntési logikát!</strong><span>A MakeCode-program ugyanazokat az állapotokat kezelje, amelyeket a Flowgorithm-algoritmusban megterveztetek.</span></div>
  <div class="question-card question-card--purple"><strong>4. Legyen látható a reakció!</strong><span>Minden fontos állapothoz tartozzon olyan visszajelzés, amelyből egyértelműen látható, mit tenne a rendszer.</span></div>
  <div class="question-card question-card--gold"><strong>5. Teszteljétek minden állapotban!</strong><span>Ne csak egyszer futtassátok le: minden tervezett helyzetet próbáljatok ki.</span></div>
</div>

## ✅ Beadás előtti ellenőrzés

<div class="check-panel">
  <label><input type="checkbox"><span>A program a saját Flowgorithm-algoritmusunkhoz kapcsolódik.</span></label>
  <label><input type="checkbox"><span>Van olyan bemenetünk, amely alapján a program dönt.</span></label>
  <label><input type="checkbox"><span>A bemenetet a szimulátorban ki tudjuk próbálni.</span></label>
  <label><input type="checkbox"><span>A program legalább két különböző állapotot kezel.</span></label>
  <label><input type="checkbox"><span>Minden fontos állapothoz tartozik látható reakció.</span></label>
  <label><input type="checkbox"><span>Minden tervezett helyzetet kipróbáltunk.</span></label>
  <label><input type="checkbox"><span>Határértékhez közeli értékkel is teszteltünk.</span></label>
  <label><input type="checkbox"><span>Letöltöttük a .hex fájlt.</span></label>
</div>

<div class="project-panel project-panel--gold">
  <h2>⭐ Mit értékelünk? – 8 pont</h2>
  <div class="score-stack">
    <div>⭐ <strong>1 pont</strong> – A program kapcsolódik a Flowgorithmban megtervezett rendszerhez.</div>
    <div>⭐ <strong>1 pont</strong> – A saját projekthez megfelelő bemenetet modelleztetek.</div>
    <div>⭐⭐ <strong>2 pont</strong> – A döntési logika helyesen működik.</div>
    <div>⭐ <strong>1 pont</strong> – Legalább két különböző állapotot kezel a program.</div>
    <div>⭐ <strong>1 pont</strong> – Minden fontos állapothoz érthető reakció tartozik.</div>
    <div>⭐ <strong>1 pont</strong> – Többféle bemenettel, köztük határértékhez közeli értékkel is teszteltétek.</div>
    <div>⭐ <strong>1 pont</strong> – A blokkprogram áttekinthető, követhető.</div>
  </div>
</div>

<div class="project-submit">
  <h2>📤 Mit adjatok be?</h2>
  <p>Töltsétek le a MakeCode projekt <strong>.hex</strong> fájlját, majd töltsétek fel a tanár által megadott beadási felületre.</p>
  <p>👥 A program közös munka; ha a beadási felület egyéni beadást kér, mindketten ugyanazt a közösen elkészített fájlt adjátok be.</p>
</div>

<div class="related-grid">
  <a href="../02-tervezd-meg-a-mukodeset/"><span class="related-icon">⬅️</span><span class="related-text"><strong>Előző: Tervezd meg a működését!</strong><small>A Flowgorithm-algoritmus.</small></span></a>
  <a href="../"><span class="related-icon">🧭</span><span class="related-text"><strong>Projekt áttekintés</strong><small>A teljes Okosterem útvonal.</small></span></a>
</div>
