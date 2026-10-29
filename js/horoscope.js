/* Horoscope / Horoskooppi – offline. Positions: Astronomy Engine (js/astronomy.js). Texts: original. */
(function (root) {
'use strict';
const AE = root.Astronomy || (typeof require !== 'undefined' ? require('./astronomy.js') : null);
const V = '\uFE0E';
const SG = '♈♉♊♋♌♍♎♏♐♑♒♓'.split('').map(g => g + V);
const PG = '☉☽☿♀♂♃♄'.split('').map(g => g + V);
const BODY = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
const SIGN_START = ['03-21', '04-20', '05-21', '06-21', '07-23', '08-23', '09-23', '10-23', '11-22', '12-22', '01-20', '02-19'];
const RUL = [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [2, 2], [1, 1], [9, 0], [5, 5], [6, 6], [7, 6], [8, 5]];
const LUCKY_N = [9, 6, 5, 2, 1, 5, 6, 8, 3, 8, 4, 7];
const LUCKY_D = [2, 5, 3, 1, 0, 3, 5, 2, 4, 6, 6, 4]; // Sun=0
const MOON_COL = [0, 1, 2, 3]; // by element
const GOOD = [1, 2, 5, 9, 10, 11], HARD = [6, 8, 12];
const ASP = [[0, 7], [60, 5], [90, 6], [120, 6], [180, 7]];

/* ---------- DATA ---------- */
const D = {
en: {
  sub: 'Horoscopes calculated from the real sky', tabs: ['Horoscope', 'Signs', 'Compatibility', 'Encyclopedia'],
  per: ['Day', 'Week', 'Month'], date: 'Date', pick: 'Choose your sign', sky: 'The sky',
  signs: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
  el: ['Fire', 'Earth', 'Air', 'Water'], mo: ['Cardinal', 'Fixed', 'Mutable'],
  pl: ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'],
  rl: ['Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'],
  kw: ['vitality and identity', 'feelings and instincts', 'thinking and talking', 'affection and values', 'drive and courage', 'growth and optimism', 'structure and responsibility'],
  tr: ['courageous, direct, energetic|impatient, impulsive', 'loyal, patient, sensual|stubborn, possessive', 'curious, witty, versatile|restless, scattered', 'caring, intuitive, protective|moody, clingy', 'generous, warm, confident|proud, dramatic', 'precise, helpful, practical|overcritical, anxious', 'fair, charming, diplomatic|indecisive, conflict-averse', 'intense, loyal, perceptive|secretive, controlling', 'adventurous, honest, optimistic|careless, preachy', 'disciplined, ambitious, reliable|cold, workaholic', 'original, humane, independent|aloof, rebellious', 'compassionate, imaginative, gentle|escapist, oversensitive'],
  stone: ['Diamond', 'Emerald', 'Agate', 'Moonstone', 'Ruby', 'Sapphire', 'Opal', 'Topaz', 'Turquoise', 'Garnet', 'Amethyst', 'Aquamarine'],
  col: ['red', 'green', 'yellow', 'silver', 'gold', 'navy', 'pink', 'burgundy', 'purple', 'brown', 'turquoise', 'sea green'],
  day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  elT: ['Fire gives it spark, enthusiasm and a need to act.', 'Earth grounds it in the senses, work and what lasts.', 'Air makes it curious, social and quick with ideas.', 'Water makes it feel deeply and read the mood of a room.'],
  moT: ['As a cardinal sign it starts things.', 'As a fixed sign it holds steady and finishes what it begins.', 'As a mutable sign it adapts and learns on the way.'],
  sd: (n, el, mo, r) => `${n} is a ${mo.toLowerCase()} ${el.toLowerCase()} sign, ruled by ${r}.`,
  house: ['self and vitality', 'money and values', 'communication and learning', 'home and roots', 'creativity and romance', 'health and routines', 'partnerships', 'shared resources and change', 'travel and beliefs', 'career and reputation', 'friends and hopes', 'rest and the inner life'],
  ord: h => h + (h === 1 ? 'st' : h === 2 ? 'nd' : h === 3 ? 'rd' : 'th'),
  adv: ['Trust the small signals.', 'Move steadily, not hastily.', 'A conversation can clear the air.', 'Protect your energy and pace yourself.', 'Say yes to one thing that excites you.', 'Finish something before starting anew.'],
  retro: ' It is retrograde, so review and revise before pushing ahead.',
  pline: (g, p, s, h, a) => `${g} ${p} in ${s} moves through your ${h}.`, 
  hs: (o, a) => `${o} house – ${a}`,
  aspN: ['joins', 'supports', 'challenges', 'flows with', 'faces'],
  aspT: ['their themes blend and amplify each other.', 'a gentle opening – small effort is rewarded.', 'friction that asks for a decision.', 'things come easily; do not waste it.', 'two sides to weigh until you find balance.'],
  phase: ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'],
  phaseT: ['A good time to plant an intention.', 'Take the first practical step.', 'Decisions and effort pay off now.', 'Refine, adjust, keep going.', 'Things come to light; celebrate or release.', 'Share what you learned.', 'Let go of what no longer works.', 'Rest and prepare for a fresh cycle.'],
  moonIn: (s, p) => `Moon in ${s}, ${p}.`,
  theme: ['Take the initiative', 'Build something steady', 'Talk it through', 'Listen to your feelings'],
  ques: ['What would I begin today if I were not afraid?', 'What small, steady thing would I be proud of?', 'Who needs to hear what I am thinking?', 'What am I really feeling beneath the surface?'],
  themeL: 'Theme', quesL: 'Reflection',
  areas: ['Love', 'Work', 'Money', 'Growth'],
  arT: [['Keep expectations light and kind.', 'Warmth is steady; show it.', 'Romance and charm are favoured.'], ['Pace yourself and avoid friction.', 'Steady effort gets noticed.', 'Energy and initiative open doors.'], ['Be careful with impulse spending.', 'Balanced – plan before you buy.', 'Good timing for sensible risks.'], ['A slow patch; patience is the lesson.', 'Small habits make progress.', 'A season for real inner growth.']],
  luckyL: 'Lucky touches', numL: 'number', colL: 'colour', stL: 'stone', dayL: 'day',
  strL: 'Strengths', chaL: 'Challenges', datesL: 'Dates', eleL: 'Element', modL: 'Quality', rulL: 'Ruler', rulM: 'modern', rulT: 'traditional',
  pickTwo: 'Choose two signs', mScore: ['Love', 'Friendship', 'Communication'],
  dist: ['Same sign: a mirror, comforting and sometimes too familiar.', 'Neighbours: very different rhythms, needs patience and curiosity.', 'Sextile: friendly, easy cooperation and shared interests.', 'Square: strong spark and friction; growth through effort.', 'Trine: natural understanding and shared ease.', 'Quincunx: an odd pair that must keep adjusting to each other.', 'Opposites: magnetic attraction that balances each other\'s gaps.'],
  elRel: ['Same element – you feel the world alike.', 'Compatible elements – they feed each other.', 'Different elements – translate each other\'s style.'],
  learn: [
    ['Elements', 'Fire (Aries, Leo, Sagittarius) acts, Earth (Taurus, Virgo, Capricorn) builds, Air (Gemini, Libra, Aquarius) thinks and connects, Water (Cancer, Scorpio, Pisces) feels.'],
    ['Qualities', 'Cardinal signs begin seasons and projects, fixed signs sustain, mutable signs adapt and close seasons.'],
    ['Planets', 'Sun = identity, Moon = feelings, Mercury = mind, Venus = love and values, Mars = drive, Jupiter = growth, Saturn = structure. Traditional rulers use the seven visible planets; modern astrology adds Uranus, Neptune and Pluto.'],
    ['Retrograde', 'A planet looks like it moves backwards from Earth. Symbolically: review, rethink, redo. Mercury retrograde is the best known.'],
    ['Houses', 'Sun-sign horoscopes use "whole-sign" houses counted from your sign: your sign is the 1st house, the next sign the 2nd, and so on. A transiting planet lights up that area of life.'],
    ['Aspects', 'Angles between planets: conjunction 0° (blend), sextile 60° (ease), square 90° (tension), trine 120° (flow), opposition 180° (balance).'],
    ['Tropical zodiac', 'This app uses the tropical zodiac: signs begin at the March equinox, not at the star constellations.'],
    ['How it works', 'Planet positions are calculated from astronomy; the meanings come from rule-based astrological tradition (modern psychological and traditional symbolism). It is symbolic reflection, not a prediction.']
  ],
  disc: 'Astrological interpretation is symbolic and for reflection and entertainment, not a scientific prediction.',
  credit: '<a href="https://github.com/Millaceedee/" target="_blank" rel="noopener noreferrer" style="color:inherit">Millaceedee</a> © 2026. Licensed under the MIT License. Astronomical calculations: <a href="https://github.com/cosinekitty/astronomy" target="_blank" rel="noopener noreferrer" style="color:inherit">Astronomy Engine</a> by Don Cross.'
},
fi: {
  sub: 'Horoskoopit laskettuna todellisesta taivaasta', tabs: ['Horoskooppi', 'Merkit', 'Yhteensopivuus', 'Tietosanakirja'],
  per: ['Päivä', 'Viikko', 'Kuukausi'], date: 'Päivämäärä', pick: 'Valitse merkkisi', sky: 'Taivas',
  signs: ['Oinas', 'Härkä', 'Kaksonen', 'Rapu', 'Leijona', 'Neitsyt', 'Vaaka', 'Skorpioni', 'Jousimies', 'Kauris', 'Vesimies', 'Kalat'],
  el: ['Tuli', 'Maa', 'Ilma', 'Vesi'], mo: ['Aloittava', 'Vakaa', 'Muuttuva'],
  pl: ['Aurinko', 'Kuu', 'Merkurius', 'Venus', 'Mars', 'Jupiter', 'Saturnus'],
  rl: ['Mars', 'Venus', 'Merkurius', 'Kuu', 'Aurinko', 'Jupiter', 'Saturnus', 'Uranus', 'Neptunus', 'Pluto'],
  kw: ['elinvoima ja identiteetti', 'tunteet ja vaistot', 'ajattelu ja puhe', 'kiintymys ja arvot', 'tarmo ja rohkeus', 'kasvu ja optimismi', 'rakenteet ja vastuu'],
  tr: ['rohkea, suora, energinen|kärsimätön, impulsiivinen', 'uskollinen, kärsivällinen, aistillinen|jääräpäinen, omistushaluinen', 'utelias, sukkela, monipuolinen|levoton, hajanainen', 'huolehtiva, intuitiivinen, suojeleva|oikukas, takertuva', 'antelias, lämmin, itsevarma|ylpeä, dramaattinen', 'tarkka, auttavainen, käytännöllinen|liian kriittinen, huolestuva', 'reilu, charmikas, diplomaattinen|päättämätön, riitoja karttava', 'intensiivinen, uskollinen, tarkkanäköinen|salaileva, kontrolloiva', 'seikkailunhaluinen, rehellinen, optimistinen|holtiton, saarnaava', 'kurinalainen, kunnianhimoinen, luotettava|kylmä, työnarkomaani', 'omaperäinen, humaani, itsenäinen|etäinen, kapinallinen', 'myötätuntoinen, mielikuvituksellinen, lempeä|todellisuuspakoinen, herkkähipiäinen'],
  stone: ['Timantti', 'Smaragdi', 'Akaatti', 'Kuukivi', 'Rubiini', 'Safiiri', 'Opaali', 'Topaasi', 'Turkoosi', 'Granaatti', 'Ametisti', 'Akvamariini'],
  col: ['punainen', 'vihreä', 'keltainen', 'hopea', 'kulta', 'laivastonsininen', 'vaaleanpunainen', 'viininpunainen', 'violetti', 'ruskea', 'turkoosi', 'merenvihreä'],
  day: ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai'],
  elT: ['Tuli antaa kipinää, innostusta ja tarpeen toimia.', 'Maa maadoittaa aisteihin, työhön ja pysyvään.', 'Ilma tekee uteliaaksi, sosiaaliseksi ja ideoissa nopeaksi.', 'Vesi saa tuntemaan syvästi ja aistimaan tunnelman.'],
  moT: ['Aloittavana merkkinä se käynnistää asioita.', 'Vakaana merkkinä se pysyy lujana ja vie alkamansa loppuun.', 'Muuttuvana merkkinä se mukautuu ja oppii matkan varrella.'],
  sd: (n, el, mo, r) => `${n} on ${mo.toLowerCase()} ${el.toLowerCase()}merkki, jota hallitsee ${r}.`,
  house: ['minä ja elinvoima', 'raha ja arvot', 'viestintä ja oppiminen', 'koti ja juuret', 'luovuus ja romantiikka', 'terveys ja arki', 'kumppanuudet', 'jaetut resurssit ja muutos', 'matkat ja uskomukset', 'ura ja maine', 'ystävät ja toiveet', 'lepo ja sisäinen elämä'],
  ord: h => h + '.',
  adv: ['Luota pieniin viesteihin.', 'Etene tasaisesti, älä kiirehtien.', 'Keskustelu voi selkeyttää tilanteen.', 'Suojele energiaasi ja rytmitä tekemisesi.', 'Sano kyllä yhdelle innostavalle asialle.', 'Saata jokin loppuun ennen uutta alkua.'],
  retro: ' Se on retrogradinen, joten tarkista ja korjaa ennen kuin painat eteenpäin.',
  pline: (g, p, s, h, a) => `${g} ${p} (${s}) kulkee huoneessasi ${h}.`,
  hs: (o, a) => `${o} huone – ${a}`,
  aspN: ['yhtyy', 'tukee', 'haastaa', 'virtaa yhdessä', 'vastustaa'],
  aspT: ['niiden teemat sulautuvat ja vahvistavat toisiaan.', 'lempeä aukeama – pieni ponnistus palkitaan.', 'kitka, joka vaatii päätöksen.', 'asiat sujuvat helposti; älä haaskaa tilaisuutta.', 'kaksi puolta punnittavana, kunnes löydät tasapainon.'],
  phase: ['Uusikuu', 'Kasvava sirppi', 'Ensimmäinen neljännes', 'Kasvava kuperakuu', 'Täysikuu', 'Vähenevä kuperakuu', 'Viimeinen neljännes', 'Vähenevä sirppi'],
  phaseT: ['Hyvä hetki istuttaa aikomus.', 'Ota ensimmäinen käytännön askel.', 'Päätökset ja ponnistelu tuottavat nyt tulosta.', 'Hio, säädä ja jatka.', 'Asiat tulevat valoon; juhli tai päästä irti.', 'Jaa oppimaasi.', 'Päästä irti siitä, mikä ei enää toimi.', 'Lepää ja valmistaudu uuteen kiertoon.'],
  moonIn: (s, p) => `Kuu on merkissä ${s}, ${p}.`,
  theme: ['Tartu aloitteeseen', 'Rakenna jotain vakaata', 'Puhu asia halki', 'Kuuntele tunteitasi'],
  ques: ['Mitä aloittaisin tänään, jos en pelkäisi?', 'Mistä pienestä, vakaasta asiasta olisin ylpeä?', 'Kenen pitäisi kuulla, mitä ajattelen?', 'Mitä todella tunnen pinnan alla?'],
  themeL: 'Teema', quesL: 'Pohdittavaksi',
  areas: ['Rakkaus', 'Työ', 'Raha', 'Kasvu'],
  arT: [['Pidä odotukset kevyinä ja ystävällisinä.', 'Lämpö on tasaista; näytä se.', 'Romantiikka ja charmi ovat suosiossa.'], ['Rytmitä tekemistä ja vältä kitkaa.', 'Tasainen työ huomataan.', 'Tarmo ja aloitteellisuus avaavat ovia.'], ['Varo heräteostoksia.', 'Tasapainoinen – suunnittele ennen ostoa.', 'Hyvä ajoitus järkeville riskeille.'], ['Hidas jakso; kärsivällisyys on oppi.', 'Pienet tavat vievät eteenpäin.', 'Aika todelliselle sisäiselle kasvulle.']],
  luckyL: 'Onnenasiat', numL: 'numero', colL: 'väri', stL: 'kivi', dayL: 'päivä',
  strL: 'Vahvuudet', chaL: 'Haasteet', datesL: 'Ajankohta', eleL: 'Alkuaine', modL: 'Laatu', rulL: 'Hallitsija', rulM: 'moderni', rulT: 'perinteinen',
  pickTwo: 'Valitse kaksi merkkiä', mScore: ['Rakkaus', 'Ystävyys', 'Viestintä'],
  dist: ['Sama merkki: peili, turvallinen ja joskus liian tuttu.', 'Naapurit: hyvin erilaiset rytmit, vaatii kärsivällisyyttä ja uteliaisuutta.', 'Sekstiili: ystävällinen, helppo yhteistyö ja yhteiset kiinnostuksen kohteet.', 'Neliö: vahva kipinä ja kitka; kasvu syntyy ponnistelusta.', 'Trigoni: luonnollinen ymmärrys ja yhteinen keveys.', 'Kvinkunssi: outo pari, joka joutuu jatkuvasti mukautumaan.', 'Vastakohdat: magneettinen veto, joka tasapainottaa toistensa aukkoja.'],
  elRel: ['Sama alkuaine – koette maailman samalla tavalla.', 'Sopivat alkuaineet – ruokitte toisianne.', 'Eri alkuaineet – tulkitkaa toistenne tyyliä.'],
  learn: [
    ['Alkuaineet', 'Tuli (Oinas, Leijona, Jousimies) toimii, Maa (Härkä, Neitsyt, Kauris) rakentaa, Ilma (Kaksonen, Vaaka, Vesimies) ajattelee ja yhdistää, Vesi (Rapu, Skorpioni, Kalat) tuntee.'],
    ['Laadut', 'Aloittavat merkit avaavat vuodenajat ja hankkeet, vakaat ylläpitävät, muuttuvat mukautuvat ja päättävät vuodenajat.'],
    ['Planeetat', 'Aurinko = identiteetti, Kuu = tunteet, Merkurius = mieli, Venus = rakkaus ja arvot, Mars = tarmo, Jupiter = kasvu, Saturnus = rakenteet. Perinteiset hallitsijat ovat seitsemän paljain silmin näkyvää planeettaa; moderni astrologia lisää Uranuksen, Neptunuksen ja Pluton.'],
    ['Retrogradisuus', 'Planeetta näyttää Maasta katsoen liikkuvan taaksepäin. Symbolisesti: tarkista, mieti uudelleen, tee uudelleen. Tunnetuin on Merkuriuksen retrogradi.'],
    ['Huoneet', 'Aurinkomerkkihoroskoopeissa käytetään merkkihuoneita omasta merkistä laskien: oma merkkisi on 1. huone, seuraava merkki 2. huone ja niin edelleen. Kulkeva planeetta valaisee kyseistä elämänaluetta.'],
    ['Aspektit', 'Planeettojen väliset kulmat: yhtymä 0° (sulautuminen), sekstiili 60° (helppous), neliö 90° (jännite), trigoni 120° (virtaus), oppositio 180° (tasapaino).'],
    ['Trooppinen eläinrata', 'Sovellus käyttää trooppista eläinrataa: merkit alkavat maaliskuun päiväntasauksesta, eivät tähtikuvioista.'],
    ['Miten tämä toimii', 'Planeettojen sijainnit lasketaan tähtitieteellisesti; merkitykset tulevat sääntöpohjaisesta astrologisesta perinteestä (modernit psykologiset ja perinteiset symbolit). Kyse on symbolisesta pohdinnasta, ei ennustuksesta.']
  ],
  disc: 'Astrologinen tulkinta on symbolista ja tarkoitettu pohdintaan ja viihteeksi, ei tieteelliseksi ennusteeksi.',
  credit: '<a href="https://github.com/Millaceedee/" target="_blank" rel="noopener noreferrer" style="color:inherit">Millaceedee</a> © 2026. Lisensoitu MIT-lisenssillä. Tähtitieteelliset laskelmat: <a href="https://github.com/cosinekitty/astronomy" target="_blank" rel="noopener noreferrer" style="color:inherit">Astronomy Engine</a>, Don Cross.'
}};

/* ---------- ENGINE ---------- */
const nm = x => ((x % 360) + 360) % 360;
const lon = (b, d) => {
  const v = b === 'Moon' ? AE.GeoMoon(d) : AE.GeoVector(AE.Body[b], d, true);
  return AE.Ecliptic(v).elon;
};
function sky(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
  const d2 = new Date(d.getTime() + 864e5);
  return BODY.map((b, i) => {
    const l = nm(lon(b, d)), l2 = nm(lon(b, d2));
    return { i, lon: l, sign: Math.floor(l / 30), retro: i > 1 && ((l2 - l + 540) % 360 - 180) < 0 };
  });
}
function aspects(pl, skipMoon) {
  const out = [];
  for (let a = 0; a < pl.length; a++) for (let b = a + 1; b < pl.length; b++) {
    if (skipMoon && (a === 1 || b === 1)) continue;
    const diff = Math.abs(nm(pl[a].lon - pl[b].lon + 180) - 180);
    ASP.forEach(([ang, orb], k) => { const o = Math.abs(diff - ang); if (o <= orb) out.push({ a, b, k, o }); });
  }
  return out.sort((x, y) => x.o - y.o).slice(0, 3);
}
const houseOf = (planetSign, sign) => ((planetSign - sign + 12) % 12) + 1;
const hash = s => { let x = 7; for (const c of s) x = (x * 31 + c.charCodeAt(0)) >>> 0; return x; };
const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
function stars(n) { return '<span class="star" aria-label="' + n + '/5">' + '★'.repeat(n) + '<i>' + '★'.repeat(5 - n) + '</i></span>'; }

function compat(a, b) {
  const dist = Math.min((a - b + 12) % 12, (b - a + 12) % 12);
  const base = [70, 55, 80, 58, 92, 50, 75][dist];
  const ea = a % 4, eb = b % 4, same = ea === eb, good = (ea + eb) % 2 === 0 && !same;
  return { dist, rel: same ? 0 : good ? 1 : 2,
    s: [clamp(base + (good ? 5 : 0), 35, 98), clamp(base + (dist % 2 === 0 ? 5 : -3), 35, 98), clamp(base + (ea === 2 || ea === 0 ? 6 : 0) + (a === b ? 4 : 0), 35, 98)] };
}

/* ---------- UI ---------- */
const S = { lang: 'en', tab: 0, sign: 0, per: 0, date: new Date(), a: 0, b: 4 };
try { S.lang = localStorage.getItem('horoscope_lang') || ((navigator.language || '').startsWith('fi') ? 'fi' : 'en'); } catch (e) {}
const $ = id => document.getElementById(id);

function wheel(pl, sign, T) {
  const c = 150, pt = (l, r) => { const t = (180 - l) * Math.PI / 180; return [c + r * Math.cos(t), c - r * Math.sin(t)]; };
  let s = `<svg viewBox="0 0 300 300" width="100%" role="img" aria-label="${T.sky}"><circle cx="150" cy="150" r="140" fill="#2a1a4a" stroke="#dcb36c" stroke-width="1.5"/>`;
  const w0 = pt(sign * 30, 138), w1 = pt(sign * 30 + 30, 138), i0 = pt(sign * 30, 98), i1 = pt(sign * 30 + 30, 98);
  s += `<path d="M${w0} A138 138 0 0 0 ${w1} L${i1} A98 98 0 0 1 ${i0}Z" fill="#dcb36c" opacity=".28"/><circle cx="150" cy="150" r="98" fill="#150d26" stroke="#dcb36c" stroke-width="1"/>`;
  for (let i = 0; i < 12; i++) { const [x, y] = pt(i * 30, 98), [x2, y2] = pt(i * 30, 140), [gx, gy] = pt(i * 30 + 15, 119);
    s += `<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" stroke="#5a4682"/><text x="${gx}" y="${gy + 6}" text-anchor="middle" font-size="19" fill="#dcb36c">${SG[i]}</text>`; }
  pl.forEach(p => { const [x, y] = pt(p.lon, 80 - (p.i % 3) * 13); s += `<circle cx="${x}" cy="${y}" r="9" fill="#33215a" stroke="#f1d595"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-size="13" fill="#f1d595">${PG[p.i]}</text>`; });
  return s + '<circle cx="150" cy="150" r="3" fill="#dcb36c"/></svg>';
}

function signPicker(key, T) {
  return `<div class="signs" role="group" aria-label="${T.pick}">` + SG.map((g, i) =>
    `<button type="button" class="chip${S[key] === i ? ' on' : ''}" data-k="${key}" data-v="${i}"><b>${g}</b>${T.signs[i]}</button>`).join('') + '</div>';
}

function reading(T) {
  const base = new Date(S.date.getFullYear(), S.date.getMonth(), S.date.getDate());
  const shift = [0, 3, 15][S.per], mid = new Date(base.getTime() + shift * 864e5);
  const pl = sky(mid), sg = S.sign, key = iso(base) + sg + S.per;
  const show = [[1, 2, 3, 4], [0, 2, 3, 4], [0, 3, 4, 5, 6]][S.per];
  const moon = pl[1], ph = AE.MoonPhase(new Date(mid.getFullYear(), mid.getMonth(), mid.getDate(), 12)), pi = Math.floor(nm(ph + 22.5) / 45) % 8;
  const rng = S.per === 0 ? iso(base) : iso(base) + ' – ' + iso(new Date(base.getTime() + [0, 6, 29][S.per] * 864e5));
  let h = `<div class="grid two"><div class="card"><div style="max-width:300px;margin:auto">${wheel(pl, sg, T)}</div><p class="note" style="text-align:center">${T.signs[sg]} ${SG[sg]}</p></div><div class="card">`;
  h += `<h2>${SG[sg]} ${T.signs[sg]} · ${T.per[S.per]} · ${rng}</h2>`;
  const el = moon.sign % 4;
  h += `<p><b>${T.themeL}:</b> ${T.theme[el]}</p><p class="q">${T.ques[(el + hash(key)) % 4]}</p>`;
  h += `<p>${PG[1]} ${T.moonIn(T.signs[moon.sign], T.phase[pi].toLowerCase())} ${T.phaseT[pi]}</p><h3>${T.sky}</h3>`;
  show.forEach(i => { const p = pl[i], hh = houseOf(p.sign, sg);
    h += `<p>${T.pline(PG[i], T.pl[i], T.signs[p.sign], T.hs(T.ord(hh), T.house[hh - 1]))} ${T.adv[(hh * 7 + i) % 6]}${p.retro ? T.retro : ''}</p>`; });
  aspects(show.length ? pl.filter((p, i) => S.per === 0 || i !== 1) : pl, S.per !== 0).forEach(x => {
    const A = pl[x.a], B = pl[x.b];
    h += `<p>${PG[A.i]} ${T.pl[A.i]} ${T.aspN[x.k]} ${PG[B.i]} ${T.pl[B.i]}: ${T.kw[A.i]} ↔ ${T.kw[B.i]} – ${T.aspT[x.k]}</p>`; });
  h += `<h3>${T.areas.join(' · ')}</h3>`;
  [3, 4, 5, 6].forEach((pi2, n) => { const p = pl[pi2], hh = houseOf(p.sign, sg);
    const r = clamp(3 + (GOOD.includes(hh) ? 1 : 0) - (HARD.includes(hh) ? 1 : 0) - (p.retro ? 1 : 0) + (p.sign % 4 === sg % 4 ? 1 : 0), 1, 5);
    h += `<p><b>${T.areas[n]}</b> ${stars(r)}<br>${T.arT[n][r <= 2 ? 0 : r === 3 ? 1 : 2]}</p>`; });
  const hv = hash(key), wd = new Date(base.getTime() + (hv % 7) * 864e5).getDay();
  h += `<h3>${T.luckyL}</h3><div class="lucky"><span>${T.numL}: ${1 + hv % 9}</span><span>${T.colL}: ${T.col[(moon.sign + sg) % 12]}</span><span>${T.stL}: ${T.stone[sg]}</span><span>${T.dayL}: ${T.day[wd]}</span></div>`;
  return h + `<p class="note">${T.disc}</p></div></div>`;
}

function signPage(T) {
  const i = S.sign, [s, c] = T.tr[i].split('|'), r = RUL[i], lang = S.lang;
  const st = SIGN_START[i], en = SIGN_START[(i + 1) % 12];
  const fmt = m => { const [mm, dd] = m.split('-'); return lang === 'fi' ? `${+dd}.${+mm}.` : `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][mm - 1]} ${+dd}`; };
  const [dm, dt] = [T.rl[r[0]], T.rl[r[1]]];
  return `<div class="card"><div class="big">${SG[i]}</div><h2>${T.signs[i]}</h2>
<p>${T.sd(T.signs[i], T.el[i % 4], T.mo[i % 3], r[0] === r[1] ? dm : dm + ' / ' + dt)} ${T.elT[i % 4]} ${T.moT[i % 3]}</p>
<dl class="meta"><dt>${T.datesL}</dt><dd>${fmt(st)} – ${fmt(en)}</dd><dt>${T.eleL}</dt><dd>${T.el[i % 4]}</dd><dt>${T.modL}</dt><dd>${T.mo[i % 3]}</dd><dt>${T.rulL}</dt><dd>${dm} (${T.rulM})${r[0] === r[1] ? '' : ', ' + dt + ' (' + T.rulT + ')'}</dd></dl>
<h3>${T.strL}</h3><p>${s}</p><h3>${T.chaL}</h3><p>${c}</p>
<h3>${T.luckyL}</h3><div class="lucky"><span>${T.numL}: ${LUCKY_N[i]}</span><span>${T.colL}: ${T.col[i]}</span><span>${T.stL}: ${T.stone[i]}</span><span>${T.dayL}: ${T.day[LUCKY_D[i]]}</span></div></div>`;
}

function match(T) {
  const m = compat(S.a, S.b);
  return `<div class="card"><h2>${T.pickTwo}</h2>${signPicker('a', T)}${signPicker('b', T)}
<h2>${SG[S.a]} ${T.signs[S.a]} + ${SG[S.b]} ${T.signs[S.b]}</h2>` +
    m.s.map((v, i) => `<div>${T.mScore[i]} · ${v}%<div class="meter"><i style="width:${v}%"></i></div></div>`).join('') +
    `<p>${T.dist[m.dist]} ${T.elRel[m.rel]}</p><p class="note">${T.disc}</p></div>`;
}
const learn = T => `<div class="card"><h2>${T.tabs[3]}</h2>` + T.learn.map(([t, x]) => `<details><summary>${t}</summary><p>${x}</p></details>`).join('') + '</div>';

function render() {
  const T = D[S.lang];
  document.documentElement.lang = S.lang;
  $('sub').textContent = T.sub; $('lb').textContent = S.lang === 'en' ? 'Suomeksi' : 'English';
  $('title').firstChild.nodeValue = S.lang === 'en' ? 'Horoscope' : 'Horoskooppi';
  document.title = S.lang === 'en' ? 'Horoscope – Free Daily, Weekly & Monthly Horoscopes' : 'Horoskooppi – Päivän, viikon ja kuukauden horoskoopit';
  $('credit').innerHTML = T.credit;
  $('tabs').innerHTML = T.tabs.map((t, i) => `<button type="button" class="tab${S.tab === i ? ' on' : ''}" data-tab="${i}">${t}</button>`).join('');
  let h = '';
  if (S.tab === 0 || S.tab === 1) h += signPicker('sign', T);
  if (S.tab === 0) h += `<div class="bar"><div class="seg">${T.per.map((p, i) => `<button type="button" class="${S.per === i ? 'on' : ''}" data-per="${i}">${p}</button>`).join('')}</div><label>${T.date} <input type="date" id="dt" value="${iso(S.date)}" min="1900-01-01" max="2099-12-31"></label></div>`;
  h += [reading, signPage, match, learn][S.tab](T);
  $('view').innerHTML = h;
}

function init() {
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-k],[data-tab],[data-per]');
    if (e.target.closest('#lb')) { S.lang = S.lang === 'en' ? 'fi' : 'en'; try { localStorage.setItem('horoscope_lang', S.lang); } catch (x) {} return render(); }
    if (!t) return;
    if (t.dataset.k) S[t.dataset.k] = +t.dataset.v;
    if (t.dataset.tab) S.tab = +t.dataset.tab;
    if (t.dataset.per) S.per = +t.dataset.per;
    render();
  });
  document.addEventListener('change', e => { if (e.target.id === 'dt' && e.target.value) { const [y, m, d] = e.target.value.split('-').map(Number); S.date = new Date(y, m - 1, d); render(); } });
  render();
}
if (typeof document !== 'undefined') init();
root.HoroscopeEngine = { sky, aspects, compat, houseOf };
})(typeof window !== 'undefined' ? window : globalThis);
