# 🔀 Elágazás

<div class="article-hero">
  <div>
    <span class="article-kicker">FLOWGORITHM · DÖNTÉS</span>
    <h2>Elágazás – amikor a program dönt</h2>
    <p>Az <strong>elágazás</strong> segítségével a program egy feltétel alapján két különböző úton folytathatja a működését.</p>
  </div>
  <div class="article-hero__icon">🔀</div>
</div>

<div class="article-meta">
  <span>👀 kezdőknek</span>
  <span>⏱️ 5–8 perc</span>
  <span>🧠 feltétel és döntés</span>
</div>

<div class="article-intro">
  <strong>Mire jó?</strong>
  <span>Ha a programnak másképp kell viselkednie attól függően, hogy egy feltétel igaz vagy hamis, elágazást használunk.</span>
</div>

## Hogyan működik?

<div class="mini-grid">
  <div class="mini-card"><span class="mini-icon">❓</span><strong>Feltétel</strong><span>A program megvizsgál egy kérdést.</span></div>
  <div class="mini-card"><span class="mini-icon">✅</span><strong>Igaz ág</strong><span>Ezen az úton halad tovább, ha a feltétel igaz.</span></div>
  <div class="mini-card"><span class="mini-icon">❌</span><strong>Hamis ág</strong><span>Ezen az úton halad tovább, ha a feltétel hamis.</span></div>
</div>

> **Gondolkodási minta:** feltétel → döntés → egyik ág → közös folytatás

## Példa: páros vagy páratlan?

A program kérjen be egy egész számot, majd döntse el róla, hogy páros vagy páratlan!

<figure class="tool-figure tool-figure--wide">
  <a href="../../../images/eszkoztar/flowgorithm/flowgorithm-elagazas-01-paros-paratlan-folyamat.png" target="_blank">
    <img src="../../../images/eszkoztar/flowgorithm/flowgorithm-elagazas-01-paros-paratlan-folyamat.png" alt="Páros vagy páratlan szám eldöntése elágazással Flowgorithmban">
  </a>
  <figcaption>A teljes folyamat: deklarálás → beolvasás → feltétel → két lehetséges ág.</figcaption>
</figure>

## Mit jelent a feltétel?

A példában ezt vizsgáljuk:

`szám % 2 = 0`

<div class="mini-grid">
  <div class="mini-card"><span class="mini-icon">➗</span><strong>%</strong><span>Az osztás maradékát adja meg.</span></div>
  <div class="mini-card"><span class="mini-icon">2️⃣</span><strong>% 2</strong><span>Megnézzük, mennyi a szám kettővel való osztásának maradéka.</span></div>
  <div class="mini-card"><span class="mini-icon">0️⃣</span><strong>= 0</strong><span>Ha nincs maradék, a szám páros.</span></div>
</div>

!!! tip "Ezt jegyezd meg!"
    Az elágazásnál mindig egy <strong>igaz vagy hamis eredményű feltételt</strong> vizsgálunk. A program nem „találgat”: a feltétel eredménye dönti el, melyik ágon halad tovább.

## Két különböző futás

<figure class="tool-figure tool-figure--medium">
  <a href="../../../images/eszkoztar/flowgorithm/flowgorithm-elagazas-02-paros-futtatas.png" target="_blank">
    <img src="../../../images/eszkoztar/flowgorithm/flowgorithm-elagazas-02-paros-futtatas.png" alt="Páros szám futtatási példája Flowgorithmban">
  </a>
  <figcaption>Példa: 42 esetén a feltétel igaz, ezért a program a páros ágat választja.</figcaption>
</figure>

<figure class="tool-figure tool-figure--medium">
  <a href="../../../images/eszkoztar/flowgorithm/flowgorithm-elagazas-03-paratlan-futtatas.png" target="_blank">
    <img src="../../../images/eszkoztar/flowgorithm/flowgorithm-elagazas-03-paratlan-futtatas.png" alt="Páratlan szám futtatási példája Flowgorithmban">
  </a>
  <figcaption>Példa: 13 esetén a feltétel hamis, ezért a program a páratlan ágat választja.</figcaption>
</figure>

## Gyors ellenőrzés

<div class="check-panel">
  <label><input type="checkbox"><span>A feltétel eredménye <strong>igaz vagy hamis</strong> lehet.</span></label>
  <label><input type="checkbox"><span>Az igaz és a hamis ágra külön utasításokat tettem.</span></label>
  <label><input type="checkbox"><span>Mindkét lehetőséget kipróbáltam futtatással.</span></label>
  <label><input type="checkbox"><span>Értem, mit jelent a példában a <strong>% 2 = 0</strong> feltétel.</span></label>
</div>

!!! note "A jelölések nem mentődnek"
    A pipák csak ezen az oldalon látszanak. Az oldal bezárása után nem maradnak meg.

## Kapcsolódó segítség

<div class="related-grid">
  <a href="../beolvasas/">
    <span class="related-icon">⌨️</span>
    <span class="related-text"><strong>Adat beolvasása</strong><small>Ha a döntéshez a felhasználótól kérsz adatot.</small></span>
  </a>
  <a href="../deklaralas/">
    <span class="related-icon">📦</span>
    <span class="related-text"><strong>Deklarálás</strong><small>Ha változóra van szükséged a feltételben.</small></span>
  </a>
</div>

<div class="back-link"><a href="../">← Vissza a Flowgorithm eszköztárhoz</a></div>
