# 🧩 Illesztések és illesztési hézag

<div class="article-hero">
  <div>
    <span class="article-kicker">TINKERCAD · ILLESZTÉS</span>
    <h2>Két alkatrész ne csak a képernyőn passzoljon!</h2>
    <p>Ha két külön kinyomtatott résznek egymásba, egymásra vagy egymás köré kell illeszkednie, a pontos méret önmagában nem elég. Meg kell tervezned azt a kis helyet is, amely lehetővé teszi az összerakást és – ha szükséges – a mozgást.</p>
  </div>
  <div class="article-hero__icon">🧩</div>
</div>

<div class="article-meta">
  <span>⏱️ 5–8 perc</span>
  <span>🎯 Egymáshoz kapcsolódó alkatrészek</span>
  <span>📏 Pontos méretezés</span>
</div>

<div class="quick-note">
  <strong>A legfontosabb szabály</strong>
  <span>Ha egy 10 mm-es csapot pontosan 10 mm-es furatba tervezel, attól még nem biztos, hogy a kinyomtatott darabok összeilleszthetők. A valós alkatrészekhez általában kis <strong>illesztési hézag</strong> szükséges.</span>
</div>

<figure class="tool-figure">
  <img src="../../../images/eszkoztar/tinkercad/illesztes/01-illesztesi-hezagok-utmutato.png" alt="Illesztések és illesztési hézag szemléltető ábra: túl szoros, pontosan azonos méretű és megfelelő hézagú kapcsolat, valamint fix, cserélhető és mozgó illesztések.">
  <figcaption>Az illesztésnél nemcsak a méret számít: azt is meg kell tervezni, milyen kapcsolatot szeretnél, és mekkora hely szükséges a működéshez.</figcaption>
</figure>

## 1. Mi az illesztés?

Illesztésről akkor beszélünk, amikor két külön alkatrészt úgy tervezel meg, hogy a valóságban kapcsolódjanak egymáshoz.

<div class="mini-grid">
  <div class="mini-card"><span class="mini-icon">⭕</span><strong>Csap és furat</strong><span>Egy kiálló rész belekerül egy nyílásba.</span></div>
  <div class="mini-card"><span class="mini-icon">↔️</span><strong>Becsúszó elem</strong><span>Egy alkatrész egy horonyba vagy vezetékbe csúszik.</span></div>
  <div class="mini-card"><span class="mini-icon">🔄</span><strong>Tengely és lyuk</strong><span>Az egyik résznek a másikban el kell tudnia fordulni.</span></div>
  <div class="mini-card"><span class="mini-icon">🧢</span><strong>Ráillesztett elem</strong><span>Egy alkatrész rákerül vagy ráhúzható egy másikra.</span></div>
</div>

## 2. Miért nem jó a „pont ugyanakkora”?

A 3D nyomtató nem matematikai pontosságú másológép. A kinyomtatott méretet több dolog is befolyásolhatja: a gép pontossága, az anyag, a rétegvastagság és a nyomtatási beállítások.

<div class="project-panel project-panel--orange">
  <h2>⚠️ Képernyőn tökéletes ≠ valóságban összeillik</h2>
  <p>Ha a csap és a furat névleg pontosan ugyanakkora, a nyomtatás apró eltérései miatt könnyen előfordulhat, hogy a két alkatrész túl szoros lesz, vagy egyáltalán nem lehet összerakni.</p>
</div>

Ezért a kapcsolódó alkatrészek között általában hagyunk egy kis helyet. Ezt nevezzük <strong>illesztési hézagnak</strong>.

## 3. Szoros, laza vagy mozgó legyen?

Nem minden kapcsolatnak ugyanúgy kell működnie. Először azt döntsd el, mit vársz tőle!

<div class="idea-grid">
  <div class="idea-card">🔒 <strong>Fix kapcsolat</strong><span>Összeillesztés után nem akarod mozgatni. Itt kisebb hézag is elegendő lehet.</span></div>
  <div class="idea-card">🧩 <strong>Kivehető vagy cserélhető rész</strong><span>Ki kell tudni venni és vissza kell tudni tenni. Nem szorulhat be.</span></div>
  <div class="idea-card">🔄 <strong>Mozgó kapcsolat</strong><span>Forgás vagy csúszás közben is maradjon szabad hely a két felület között.</span></div>
</div>

<div class="quick-note">
  <strong>Nincs egyetlen univerzális hézagérték</strong>
  <span>A jó érték függ a nyomtatótól, az anyagtól, a mérettől és attól is, hogy fix vagy mozgó kapcsolatot szeretnél. Ha a feladat konkrét értéket ad meg, azt használd! Máskor próbadarabbal érdemes beállítani.</span>
</div>

## 4. Hogyan tervezz illesztést Tinkercadben?

<div class="step-stack">
  <div class="step-card"><span class="step-no">1</span><div><strong>Mérd meg a kapcsolódó alkatrészt!</strong><span>Ne szemre dolgozz! A fontos méreteket milliméterben add meg.</span></div></div>
  <div class="step-card"><span class="step-no">2</span><div><strong>Döntsd el, hogyan kell működnie!</strong><span>Fixen kapcsolódjon, kivehető legyen, csússzon vagy forogjon?</span></div></div>
  <div class="step-card"><span class="step-no">3</span><div><strong>Tervezd bele a hézagot!</strong><span>A befogadó részt készítsd kissé nagyobbra, vagy a belekerülő részt kissé kisebbre. A lényeg: ne ugyanaz legyen a két névleges méret.</span></div></div>
  <div class="step-card"><span class="step-no">4</span><div><strong>Igazítsd pontosan a két elemet!</strong><span>Használd az igazítást és több nézetet, hogy a csap, furat vagy horony valóban egy tengelyre kerüljön.</span></div></div>
  <div class="step-card"><span class="step-no">5</span><div><strong>Próbáld ki valódi nyomtatással!</strong><span>Az első nyomtatás egyben teszt is. Ha túl szoros vagy túl laza, térj vissza a Tinkercad-tervhez és módosíts!</span></div></div>
</div>

<figure class="tool-figure">
  <img src="../../../images/eszkoztar/tinkercad/illesztes/02-illesztes-keszitese-6-lepesben.png" alt="Illesztés készítése Tinkercadben hat lépésben: külön csap és alaptest, a csap másolása, a másolat megnövelése, furattá alakítása, az alaptesthez igazítása és csoportosítása, majd a két összeillő alkatrész.">
  <figcaption>Csap–furat illesztés készítése: csak a csapot másold le, a másolatból készíts kissé nagyobb kivágó formát, majd ezt igazítsd és csoportosítsd az alaptesttel!</figcaption>
</figure>

<div class="related-grid">
  <a href="../meretezes/">
    <span class="related-icon">📏</span>
    <span class="related-text"><strong>Méretezés és igazítás</strong><small>Pontos méretek és egymáshoz igazított alkatrészek.</small></span>
  </a>
  <a href="../furat/">
    <span class="related-icon">🕳️</span>
    <span class="related-text"><strong>Furat készítése</strong><small>Csap–furat vagy más kivágásos kapcsolat kialakításához.</small></span>
  </a>
</div>

## 5. Egy egyszerű gondolkodási példa

Tegyük fel, hogy egy henger alakú csapot szeretnél egy kör alakú furatba tenni.

<div class="project-panel project-panel--green">
  <h2>🧠 Ne ezt kérdezd: „Mekkora a csap?”</h2>
  <p>Hanem ezt:</p>
  <div class="project-rule project-rule--green"><strong>„Mekkora a csap, milyen kapcsolatot szeretnék, és mekkora helyet kell hagynom körülötte ahhoz, hogy a valóságban is működjön?”</strong></div>
</div>

A két alkatrész méretei tehát <strong>összetartoznak</strong>. Ha az egyiken változtatsz, ellenőrizd a másikat is!

## 6. A próbadarab nem kudarc, hanem mérés

Ha az illesztés fontos, sokszor nem érdemes rögtön az egész tárgyat újranyomtatni. Készíthetsz egy kis próbadarabot ugyanazzal a csappal, furattal vagy horonnyal.

<div class="step-stack">
  <div class="step-card"><span class="step-no">6</span><div><strong>Nyomtass kis tesztet!</strong><span>Csak az illesztéshez szükséges részt készítsd el.</span></div></div>
  <div class="step-card"><span class="step-no">7</span><div><strong>Próbáld össze!</strong><span>Túl szoros? Kiesik? Akad? Nem forog?</span></div></div>
  <div class="step-card"><span class="step-no">8</span><div><strong>Módosíts és tesztelj újra!</strong><span>A jó illesztés gyakran egy rövid tervezés–próba–javítás folyamat eredménye.</span></div></div>
</div>

<div class="project-panel project-panel--gold">
  <h2>🔁 Ez is tervezési folyamat</h2>
  <div class="project-rule">TERV → NYOMTATOTT PRÓBA → ELLENŐRZÉS → JAVÍTÁS → ÚJ PRÓBA</div>
  <p>Az első változatnak nem kell tökéletesen illeszkednie. Az a fontos, hogy észrevedd, mi a probléma, és a szerkeszthető modellben tudatosan javíts rajta.</p>
</div>

## Gyors ellenőrzés

<div class="check-panel">
  <label><input type="checkbox"><span>Tudom, melyik két alkatrésznek kell egymáshoz illeszkednie.</span></label>
  <label><input type="checkbox"><span>Eldöntöttem, hogy fix, kivehető vagy mozgó kapcsolatot szeretnék.</span></label>
  <label><input type="checkbox"><span>A fontos méreteket számmal ellenőriztem.</span></label>
  <label><input type="checkbox"><span>Nem terveztem a két kapcsolódó felületet automatikusan pontosan ugyanakkorára.</span></label>
  <label><input type="checkbox"><span>Az illesztési hézagot a kívánt működéshez választottam.</span></label>
  <label><input type="checkbox"><span>Ha az illesztés kritikus, számolok próbadarabbal és javítással.</span></label>
</div>

## Kapcsolódó segítségek

<div class="related-grid">
  <a href="../nyomtatas-elokeszites/">
    <span class="related-icon">🖨️</span>
    <span class="related-text"><strong>3D nyomtatásra előkészítés</strong><small>Ellenőrizd, hogy a teljes modell valóban kinyomtatható-e.</small></span>
  </a>
  <a href="../exportalas-stl/">
    <span class="related-icon">📤</span>
    <span class="related-text"><strong>Exportálás STL-be</strong><small>A teszthez vagy végleges nyomtatáshoz add át a modellt.</small></span>
  </a>
</div>

<div class="back-link"><a href="../">← Vissza a Tinkercad eszköztárhoz</a></div>
