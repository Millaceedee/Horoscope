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
const LUCKY_D = [2, 5, 3, 1, 0, 3, 5, 2, 4, 6, 6, 4];
const ASP = [[0, 7], [60, 5], [90, 6], [120, 6], [180, 7]];

const D = {
  en: {
    sub: "Horoscopes calculated from the real sky",
    tabs: ["Horoscope", "Signs", "Compatibility", "Encyclopedia"],
    per: ["Day", "Week", "Month"],
    date: "Date",
    pick: "Choose your sign",
    sky: "The sky",
    signs: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"],
    el: ["Fire", "Earth", "Air", "Water"],
    mo: ["Cardinal", "Fixed", "Mutable"],
    pl: ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"],
    rl: ["Mars", "Venus", "Mercury", "Moon", "Sun", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"],
    kw: ["vitality and identity", "feelings and instincts", "thinking and talking", "affection and values", "drive and courage", "growth and optimism", "structure and responsibility"],
    tr: [
      "courageous, direct, energetic|impatient, impulsive",
      "loyal, patient, sensual|stubborn, possessive",
      "curious, witty, versatile|restless, scattered",
      "caring, intuitive, protective|moody, clingy",
      "generous, warm, confident|proud, dramatic",
      "precise, helpful, practical|overcritical, anxious",
      "fair, charming, diplomatic|indecisive, conflict-averse",
      "intense, loyal, perceptive|secretive, controlling",
      "adventurous, honest, optimistic|careless, preachy",
      "disciplined, ambitious, reliable|cold, workaholic",
      "original, humane, independent|aloof, rebellious",
      "compassionate, imaginative, gentle|escapist, oversensitive"
    ],
    stone: ["Diamond", "Emerald", "Agate", "Moonstone", "Ruby", "Sapphire", "Opal", "Topaz", "Turquoise", "Garnet", "Amethyst", "Aquamarine"],
    col: ["red", "green", "yellow", "silver", "gold", "navy", "pink", "burgundy", "purple", "brown", "turquoise", "sea green"],
    day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    elT: [
      "Fire gives it spark, enthusiasm and a need to act.",
      "Earth grounds it in the senses, work and what lasts.",
      "Air makes it curious, social and quick with ideas.",
      "Water makes it feel deeply and read the mood of a room."
    ],
    moT: [
      "As a cardinal sign it starts things.",
      "As a fixed sign it holds steady and finishes what it begins.",
      "As a mutable sign it adapts and learns on the way."
    ],
    sd: (n, el, mo, r) => `${n} is a ${mo.toLowerCase()} ${el.toLowerCase()} sign, ruled by ${r}.`,
    house: ["self and vitality", "money and values", "communication and learning", "home and roots", "creativity and romance", "health and routines", "partnerships", "shared resources and change", "travel and beliefs", "career and reputation", "friends and hopes", "rest and the inner life"],
    ord: h => h + (h === 1 ? "st" : h === 2 ? "nd" : h === 3 ? "rd" : "th"),
    adv: [
      "Put yourself first for a moment; clarity begins with what you actually want.",
      "Check what you value before you spend, commit or agree.",
      "Say it out loud or write it down; words can change more than you expect.",
      "Tend to home and family; a quiet evening may do more than a grand plan.",
      "Give creativity a room to breathe; pleasure is not a luxury but a form of wisdom.",
      "Small rituals carry the day; fix one habit and the rest follows.",
      "Listen as much as you speak; the other person may hold a missing piece.",
      "Face what is shared or unfinished and settle the matter honestly.",
      "Widen your horizon: a book, a trip or a bolder idea is calling.",
      "Your efforts are visible; aim them at a goal you truly want.",
      "Lean on friends and let a wish out of the drawer.",
      "Step back and rest; the answer arrives when you stop chasing it."
    ],
    retroP: [
      "",
      "",
      " Retrograde Mercury: reread messages, back up your files and expect old conversations to resurface.",
      " Retrograde Venus: old feelings and tastes return, so hold off on big decisions about love or money.",
      " Retrograde Mars: your drive turns inward; go slowly and sort out what still deserves the effort.",
      " Retrograde Jupiter: growth turns inward; revisit a plan or belief you have outgrown.",
      " Retrograde Saturn: your commitments are inspected; rebuild what is weak instead of adding more."
    ],
    fcL: "Forecast",
    moonL: "Moon phases",
    fcOpen: [
      "Aries moves like a flame with intent; this stretch rewards courage, though a pause now and then keeps the fire from burning too bright.",
      "Taurus asks for rhythm, safety, and a slower tempo; the deeper lesson is that stability is not stagnation.",
      "Gemini is a bridge between minds, and this chapter asks you to make meaning from fragments, then carry the story clearly.",
      "Cancer listens to the weather of the heart; the gift is not only sensitivity but the wisdom to protect what matters.",
      "Leo shines brightest when warmth is sincere and not merely performative; this stretch gives that kind of light room.",
      "Virgo notices what others overlook; a small adjustment made with care can change the shape of an entire season.",
      "Libra seeks harmony, but not at the cost of your own truth; the question is where you have been appeasing rather than choosing.",
      "Scorpio senses what hides beneath the surface; the days ahead call you to follow the signal to its root, not its reflection.",
      "Sagittarius needs a horizon and a reason to move toward it; the path ahead is not random, it is a calling.",
      "Capricorn builds with patience and long memory; this cycle reminds you how much you have already created.",
      "Aquarius thinks several steps ahead and sees what others cannot yet imagine; the world may finally be ready to receive your insight.",
      "Pisces lives between the seen and the unseen; this period invites you to give one dream a tactile, grounded form."
    ],
    fcPlanet: [
      "The Sun, source of your vitality, lights the way and asks you to act as your truest self rather than a role someone else expects.",
      "The Moon sets the emotional rhythm; moods can shift quickly, and your intuition is the clearest guide.",
      "Mercury sharpens speech, travel, and paperwork; messages matter more than usual, and clarity is a form of power.",
      "Venus softens the edges and draws attention to what you love, value, and want to keep close.",
      "Mars supplies drive and impatience in equal measure; choose where to place your force with wisdom.",
      "Jupiter widens what is possible; the door opens for those who stay curious, humble, and willing to learn.",
      "Saturn tests what is solid; effort now becomes the structure that carries your future."
    ],
    fcHouse: [
      "Attention turns inward to your presence: your energy, your identity, and the way you begin things.",
      "Money, value, and self-worth rise into view; it is a useful time to ask what you truly treasure.",
      "Conversation, travel, siblings, and the practical exchange of ideas move to the surface.",
      "Home, roots, and emotional safety call for attention; even quiet repair matters.",
      "Creativity, romance, and joy insist on being seen; they are not frivolous, they are essential.",
      "Routine, health, and daily rhythm ask for gentle honesty; small corrections carry real weight.",
      "Partnerships, equality, and honest exchange become more visible; the question is whether you are listening as much as speaking.",
      "Shared resources, deep trust, and endings that make room for beginnings all gather meaning.",
      "The wider world calls through study, travel, philosophy, and belief; expansion is not a fantasy but a discipline.",
      "Career, reputation, and what you build in public come into focus; your effort is being seen.",
      "Friends, groups, and long-term hopes carry new meaning; belonging is not a luxury, but a living practice.",
      "The quiet background is active: rest, solitude, and the deeper meaning behind what you carry in silence."
    ],
    fcMoon: [
      "The New Moon offers a clean page; name one wish plainly and let it grow slowly.",
      "The waxing crescent favors first steps, small enough to take today.",
      "At the first quarter an obstacle appears, which is simply the sky asking how much you want this.",
      "The waxing gibbous rewards patience and polishing; you are closer than it feels.",
      "The Full Moon brings things to light: a truth, a result, or a person. Celebrate what has ripened and release what has not.",
      "The waning gibbous is for sharing and gratitude; pass on what you have learned.",
      "The last quarter asks you to let go of habits, promises, or clutter that no longer serve.",
      "The waning crescent is a time for rest; gentle endings create room for a fresh cycle."
    ],
    fcAsp: ["merge", "cooperate", "pull against each other", "flow together", "meet face to face"],
    fcBeneath: (a, b, v) => `Beneath it all, ${a} and ${b} ${v}.`,
    fcClose: [
      "Courage includes knowing when to listen.",
      "Steadiness is a strength, not stagnation; allow yourself pleasure without guilt.",
      "You do not have to understand everything at once; one clear step is enough.",
      "You do not have to carry everyone’s feelings, only your own.",
      "A warm word given away returns brighter than expected.",
      "Good enough is often exactly right.",
      "Your opinion weighs as much as anyone else’s.",
      "Trust is built slowly, and you set the pace.",
      "The journey is worth as much as the destination, and you may always come home.",
      "Rest is not laziness but part of building.",
      "An idea only becomes real once you tell it to someone.",
      "Your feelings are information, and boundaries protect your sensitivity."
    ],
    pline: (g, p, s, h, a) => `${g} ${p} in ${s} moves through your ${h}.`,
    hs: (o, a) => `${o} house – ${a}`,
    aspN: ["joins", "supports", "challenges", "flows with", "faces"],
    aspT: [
      "their themes blend and amplify each other.",
      "a gentle opening – small effort is rewarded.",
      "friction that asks for a decision.",
      "things come easily; do not waste it.",
      "two sides to weigh until you find balance."
    ],
    phase: ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"],
    phaseT: [
      "A good time to plant an intention.",
      "Take the first practical step.",
      "Decisions and effort pay off now.",
      "Refine, adjust, and keep going.",
      "Things come to light; celebrate or release.",
      "Share what you learned.",
      "Let go of what no longer works.",
      "Rest and prepare for a fresh cycle."
    ],
    moonIn: (s, p) => `Moon in ${s}, ${p}.`,
    theme: ["Start with yourself", "Value what you have", "Talk it through", "Return to your roots", "Make something for joy", "Tidy one small thing", "Meet someone halfway", "Let something go", "Look further", "Show what you can do", "Reach out to friends", "Slow down and rest"],
    ques: [
      ["What would I begin today if I were not afraid?", "Where am I rushing, and what would patience reveal?", "Whose battle am I fighting that is not mine?"],
      ["What small, steady thing would I be proud of?", "What am I holding on to out of habit rather than love?", "What would a truly comfortable day look like for me?"],
      ["Who needs to hear what I am thinking?", "Which of my many ideas deserves a whole week?", "What question am I avoiding by staying busy?"],
      ["What am I really feeling beneath the surface?", "Whom do I take care of, and who takes care of me?", "What does home mean to me right now?"],
      ["Where could I give credit instead of seeking it?", "What would I create if nobody applauded?", "Who deserves my warmth today?"],
      ["What would be good enough, and for whom am I aiming higher?", "Which small habit would change my week?", "Where can I be as kind to myself as I am to others?"],
      ["Where am I choosing peace over honesty?", "What do I want, apart from what is fair to everyone?", "Which decision have I postponed too long?"],
      ["What am I ready to release?", "Whom do I trust, and why?", "What truth am I circling around?"],
      ["What horizon am I walking toward?", "What would I do if I knew I could not fail?", "What did my latest detour teach me?"],
      ["What have I built that I forgot to celebrate?", "Where would rest make me more effective?", "Which goal is mine, and which is expected of me?"],
      ["Which of my ideas needs a real-world test?", "Where do I want to belong, not only stand apart?", "Whom could I invite into my plans?"],
      ["What do my dreams tell me about what I want?", "Where do I need a boundary to protect my gentleness?", "What small step would bring a dream closer?"]
    ],
    themeL: "Theme",
    quesL: "Reflection",
    areas: ["Love", "Work", "Money", "Growth"],
    arT: [
      ["Keep expectations light and kind.", "Warmth is steady; show it.", "Romance and charm are favoured."],
      ["Pace yourself and avoid friction.", "Steady effort gets noticed.", "Energy and initiative open doors."],
      ["Be careful with impulse spending.", "Balanced – plan before you buy.", "Good timing for sensible risks."],
      ["A slow patch; patience is the lesson.", "Small habits make progress.", "A season for real inner growth."]
    ],
    luckyL: "Lucky touches",
    numL: "number",
    colL: "colour",
    stL: "stone",
    dayL: "day",
    strL: "Strengths",
    chaL: "Challenges",
    datesL: "Dates",
    eleL: "Element",
    modL: "Quality",
    rulL: "Ruler",
    rulM: "modern",
    rulT: "traditional",
    pickTwo: "Choose two signs",
    mScore: ["Love", "Friendship", "Communication"],
    dist: [
      "Same sign: a mirror, comforting and sometimes too familiar.",
      "Neighbours: very different rhythms, needs patience and curiosity.",
      "Sextile: friendly, easy cooperation and shared interests.",
      "Square: strong spark and friction; growth through effort.",
      "Trine: natural understanding and shared ease.",
      "Quincunx: an odd pair that must keep adjusting to each other.",
      "Opposites: magnetic attraction that balances each other’s gaps."
    ],
    elRel: ["Same element – you feel the world alike.", "Compatible elements – they feed each other.", "Different elements – translate each other’s style."],
    learn: [
      ["Elements", "Fire (Aries, Leo, Sagittarius) acts, Earth (Taurus, Virgo, Capricorn) builds, Air (Gemini, Libra, Aquarius) thinks and connects, Water (Cancer, Scorpio, Pisces) feels."],
      ["Qualities", "Cardinal signs begin seasons and projects, fixed signs sustain, mutable signs adapt and close seasons."],
      ["Planets", "Sun = identity, Moon = feelings, Mercury = mind, Venus = love and values, Mars = drive, Jupiter = growth, Saturn = structure. Traditional rulers use the seven visible planets; modern astrology adds Uranus, Neptune and Pluto."],
      ["Retrograde", "A planet appears to move backwards from Earth. Symbolically, it asks you to review, rethink and redo. Mercury retrograde is the best known."],
      ["Houses", "Sun-sign horoscopes use “whole-sign” houses counted from your sign: your sign is the 1st house, the next sign the 2nd, and so on. A transiting planet lights up that area of life."],
      ["Aspects", "Angles between planets: conjunction 0° (blend), sextile 60° (ease), square 90° (tension), trine 120° (flow), opposition 180° (balance)."],
      ["Tropical zodiac", "This app uses the tropical zodiac: signs begin at the March equinox, not at the star constellations."],
      ["How it works", "Planet positions are calculated by astronomy; the meanings are drawn from rule-based astrological tradition (modern psychological and classical symbolism). It is symbolic reflection, not a prediction."]
    ],
    disc: "Astrological interpretation is symbolic and intended for reflection and entertainment, not a scientific prediction.",
    datesNote: "Sign dates are approximate; the Sun changes signs at a slightly different time each year.",
    compatNote: "Percentages are illustrative sign-based scores, not measured probabilities or a comparison of full birth charts.",
    closest: "Closest",
    exact: "Exact",
    localTimeNote: "Times are shown in your browser’s local time zone.",
    credit: "<a href=\"https://github.com/Millaceedee/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color:inherit\">Millaceedee</a> © 2026. Licensed under the MIT License. Astronomical calculations: <a href=\"https://github.com/cosinekitty/astronomy\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color:inherit\">Astronomy Engine</a> by Don Cross."
  },
  fi: {
    sub: "Horoskoopit laskettuna todellisesta taivaasta",
    tabs: ["Horoskooppi", "Merkit", "Yhteensopivuus", "Tietosanakirja"],
    per: ["Päivä", "Viikko", "Kuukausi"],
    date: "Päivämäärä",
    pick: "Valitse merkkisi",
    sky: "Taivas",
    signs: ["Oinas", "Härkä", "Kaksonen", "Rapu", "Leijona", "Neitsyt", "Vaaka", "Skorpioni", "Jousimies", "Kauris", "Vesimies", "Kalat"],
    el: ["Tuli", "Maa", "Ilma", "Vesi"],
    mo: ["Aloittava", "Vakaa", "Muuttuva"],
    pl: ["Aurinko", "Kuu", "Merkurius", "Venus", "Mars", "Jupiter", "Saturnus"],
    rl: ["Mars", "Venus", "Merkurius", "Kuu", "Aurinko", "Jupiter", "Saturnus", "Uranus", "Neptunus", "Pluto"],
    kw: ["elinvoima ja identiteetti", "tunteet ja vaistot", "ajattelu ja puhe", "kiintymys ja arvot", "tarmo ja rohkeus", "kasvu ja optimismi", "rakenteet ja vastuu"],
    tr: [
      "rohkea, suora, energinen|kärsimätön, impulsiivinen",
      "uskollinen, kärsivällinen, aistillinen|jääräpäinen, omistushaluinen",
      "utelias, sukkela, monipuolinen|levoton, hajanainen",
      "huolehtiva, intuitiivinen, suojeleva|oikukas, takertuva",
      "antelias, lämmin, itsevarma|ylpeä, dramaattinen",
      "tarkka, auttavainen, käytännöllinen|liian kriittinen, huolestuva",
      "reilu, charmikas, diplomaattinen|päättämätön, riitoja karttava",
      "intensiivinen, uskollinen, tarkkanäköinen|salaileva, kontrolloiva",
      "seikkailunhaluinen, rehellinen, optimistinen|holtiton, saarnaava",
      "kurinalainen, kunnianhimoinen, luotettava|kylmä, työnarkomaani",
      "omaperäinen, humaani, itsenäinen|etäinen, kapinallinen",
      "myötätuntoinen, mielikuvituksellinen, lempeä|todellisuuspakoinen, herkkähipiäinen"
    ],
    stone: ["Timantti", "Smaragdi", "Akaatti", "Kuukivi", "Rubiini", "Safiiri", "Opaali", "Topaasi", "Turkoosi", "Granaatti", "Ametisti", "Akvamariini"],
    col: ["punainen", "vihreä", "keltainen", "hopea", "kulta", "laivastonsininen", "vaaleanpunainen", "viininpunainen", "violetti", "ruskea", "turkoosi", "merenvihreä"],
    day: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"],
    elT: [
      "Tuli antaa kipinää, innostusta ja halun toimia.",
      "Maa maadoittaa aistien, työn ja pysyvän välille.",
      "Ilma tekee uteliaaksi, sosiaaliseksi ja nopeaksi ideoissa.",
      "Vesi saa tuntemaan syvästi ja lukemaan tunnelman."
    ],
    moT: [
      "Aloittavana merkkinä se käynnistää asioita.",
      "Vakaana merkkinä se pysyy lujana ja vie aloittamansa loppuun.",
      "Muuttuvana merkkinä se mukautuu ja oppii matkan varrella."
    ],
    sd: (n, el, mo, r) => `${n} on ${mo.toLowerCase()} ${el.toLowerCase()}merkki, jota hallitsee ${r}.`,
    house: ["minä ja elinvoima", "raha ja arvot", "viestintä ja oppiminen", "koti ja juuret", "luovuus ja romantiikka", "terveys ja arki", "kumppanuudet", "jaetut resurssit ja muutos", "matkat ja uskomukset", "ura ja maine", "ystävät ja toiveet", "lepo ja sisäinen elämä"],
    ord: h => ["ensimmäisessä", "toisessa", "kolmannessa", "neljännessä", "viidennessä", "kuudennessa", "seitsemännessä", "kahdeksannessa", "yhdeksännessä", "kymmenennessä", "yhdennessätoista", "kahdennessatoista"][h - 1],
    adv: [
      "Aseta itsesi hetkeksi etusijalle: selkeys alkaa siitä, mitä todella haluat.",
      "Tarkista, mitkä asiat ovat sinulle todella arvokkaita, ennen kuin sitoudut, kulutat tai luovutat.",
      "Sano ajatuksesi ääneen tai kirjoita se ylös. Sanat voivat avata enemmän kuin arvaat.",
      "Pidä huolta kodista ja perheestä; hiljainen ilta voi tehdä enemmän kuin suuri suunnitelma.",
      "Anna itsellesi tilaa luovuuteen: ilo ei ole ylimääräistä, vaan osa kokonaisuutta.",
      "Järjestä yksi pieni asia, joka helpottaa arkea. Pieni selkeys avaa tilaa suuremmalle.",
      "Kuuntele tarkasti. Toisen sanoma voi sisältää juuri sen, mitä olet kaivannut.",
      "Katso suoraan siihen, mikä on vielä kesken. Rehellinen selvittely tuo helpotusta.",
      "Laajenna horisonttia: kirja, matka tai uusi näkökulma kutsuu sinua eteenpäin.",
      "Näytä, mitä osaat. Ponnistelusi näkyvät, ja oikea tavoite tekee työstä merkityksellistä.",
      "Lähesty ystäviä rakentavasti; unelmat alkavat olla todellisia, kun ne jaetaan.",
      "Anna itsellesi hiljaisuutta ja rauhaa. Vastaukset tulevat usein silloin, kun et enää pakene niitä."
    ],
    retroP: [
      "",
      "",
      " Merkurius perääntyy: lue viestit uudelleen, ota varmuuskopiot ja varaudu vanhojen keskustelujen palaamiseen.",
      " Venus perääntyy: vanhat tunteet ja maut palaavat, joten odota suurten rakkaus- ja rahapäätösten kanssa.",
      " Mars perääntyy: tarmo kääntyy sisäänpäin; etene hitaasti ja selvitä, mikä vielä ansaitsee vaivan.",
      " Jupiter perääntyy: kasvu kääntyy sisäänpäin; palaa suunnitelmaan tai uskomukseen, josta olet kasvanut ulos.",
      " Saturnus perääntyy: sitoumuksesi tarkastetaan; rakenna uudelleen se, mikä on heikkoa, äläkä lisää uutta."
    ],
    fcL: "Ennuste",
    moonL: "Kuun vaiheet",
    fcOpen: [
      "Oinas liikkuu kuin tuli: tämä kausi palkitsee rohkean aloituksen, mutta muistutus on tärkeä — ei aina tarvitse hypätä ennen kuin on valmis.",
      "Härkä tarvitsee rytmiä ja turvallisuuden tunnetta; vakaus ei ole pysähtymistä, vaan luottamuksen rakennustyötä.",
      "Kaksosen mieli virtaa ajatusten, ideoiden ja yhteyksien keskellä. Nyt on hyvä hetki koota ajatukset ja kertoa ne selkeästi.",
      "Rapu kuuntelee enemmän kuin puhuu, ja juuri nyt sen on hyvä nähdä, mitä omat tunteet todella vaativat.",
      "Leijona tarvitsee tilaa olla omana itsenään ilman jatkuvaa valvontaa. Tämä kausi kannustaa autenttisuuteen.",
      "Neitsyt löytää selkeyden pienistä yksityiskohdista. Yksi tarkka säätö voi tehdä suuren eron.",
      "Vaaka pyrkii löytämään tasapainon, mutta tässä jaksossa kannattaa kysyä: onko rauha tullut omasta valinnasta vai toisten miellyttämisestä?",
      "Skorpioni tunnistaa pinnan alla olevan totuuden. Se, mikä jää piiloon, saa nyt oikean äänen.",
      "Jousimies kaipaa vapautta, mutta myös suuntaa ja tarkoitusta. Se, mikä tuntuu vapaalta, voi samalla myös auttaa eteenpäin.",
      "Kauris rakentaa hiljaa mutta kestävää. Tämä kausi on hyvä siihen, että huomaat, kuinka paljon on jo tapahtunut.",
      "Vesimies näkee mahdollisuuksia ja kokoaa tulevaisuudenkuvan. Nyt kannattaa kuunnella omia intuitioita ja uusia yhteyksiä.",
      "Kalat tarvitsevat rauhaa ja syvyyttä. Tämä kausi kutsuu antamaan unelmalle hieman konkreettista jalansijaa."
    ],
    fcPlanet: [
      "Aurinko valottaa sinua juuri siinä kohdassa, missä tarvitset eniten omaa ääntäsi ja itseluottamusta.",
      "Kuu asettaa tunnelman, joten tunteet ovat tässä jaksossa tärkeä viesti — kuuntele niitä, älä pakene niitä.",
      "Merkurius kirkastaa puhetta, päätöksiä, yhteydenpitoa ja pieniä käytännön tehtäviä.",
      "Venus pehmentää tilanteita ja tuo esiin rakkauden, arvostuksen ja sen, mikä tuntuu hyvältä.",
      "Mars tuo energiaa, mutta myös vaatii valintoja: mihin käytät voimasi, milloin pysäytät itsesi?",
      "Jupiter laajentaa näkökulmaa ja avaa uusia mahdollisuuksia, kun olet tarpeeksi utelias.",
      "Saturnus testaa, mikä kestää. Ponnistus, joka tehdään aitoudella ja kärsivällisyydellä, kantaa pitkälle."
    ],
    fcHouse: [
      "Huomio kääntyy sinuun: omiin tarpeisiisi, energiaasi ja tapaan, jolla aloitat asiat.",
      "Raha, arvojärjestys ja itsensä kunnioitus nousevat keskiöön.",
      "Viestintä, oppiminen ja arkiset yhteydet saavat uusia sävyjä.",
      "Koti, perhe, juuret ja turvallisuuden tunne tulevat keskiöön.",
      "Luovuus, rakkaus ja ilo vaativat tilaa ja näkyvyyttä.",
      "Arki, terveys ja omat rutiinit vaativat tarkkaa, rehellistä katsomista.",
      "Kumppanuudet, tasavertaisuus ja lähellä olevat suhteet nousevat esiin.",
      "Jaetut resurssit, luottamus ja rohkea selvittely voivat muuttaa paljon.",
      "Uudet näkökulmat, matkailu, opiskelu ja uskomukset kutsuvat sinua laajentumaan.",
      "Ura, maine ja näkyvyys nousevat esiin, ja toiminta tulee katsotuksi.",
      "Ystävät, verkostot ja suuremmat tavoitteet saavat uuden vaiheen.",
      "Lepo, hiljaisuus ja sisäinen tila ovat yhtä tärkeitä kuin toiminta."
    ],
    fcMoon: [
      "Uusikuu on hyvä hetki asettaa selkeä tahtotila. Valitse yksi asia, jota haluat kehittää rauhallisesti.",
      "Kasvava sirppi suosii pieniä, toimivia askeleita. Aloita siitä, mikä on mahdollista heti tänään.",
      "Ensimmäinen neljännes tuo haasteen — juuri se kertoo, kuinka paljon asia todella merkitsee sinulle.",
      "Kasvava kuperakuu palkitsee kärsivällisyyden, viimeistelyn ja tarkan työn.",
      "Täysikuu tuo asiat valoon. Jokin päätyy näkyviin, tai jokin tulee kypsäksi ja vaatii päätöstä.",
      "Vähenevä kuperakuu on hyvä jakamisen ja kiitollisuuden aikaan. Jaa oppimasi ja päästä irti turhasta.",
      "Viimeinen neljännes kysyy, mitä saat päästää irti, jotta tilaa jää uudelle.",
      "Vähenevä sirppi kutsuu lepäämään ja rauhoittumaan. Hyvä päätös on usein myös lempeä päätös."
    ],
    fcAsp: ["sulautuvat yhteen", "tekevät yhteistyötä", "vetävät eri suuntiin", "virtaavat yhdessä", "kohtaavat vastakkain"],
    fcBeneath: (a, b, v) => `Taustalla ${a} ja ${b} ${v}.`,
    fcClose: [
      "Rohkeus ei ole vain toimimista, vaan myös taitoa kuunnella, kun vahva impulssi vaatii hidastamista.",
      "Vakaus on voima, ei pysähtymistä. Anna itsellesi myös nautintoa.",
      "Et tarvitse kaikkia vastauksia heti. Yksi selvä askel kerrallaan riittää.",
      "Sinun ei tarvitse kantaa kaikkien tunteita. Pidä huolta omasta sisäisestä tilastasi.",
      "Lämmin sana ja kunnioittava ele voivat muuttaa paljon enemmän kuin arvaat.",
      "Riittävän hyvä on usein juuri sopiva ja kestävä ratkaisu.",
      "Oma mielipiteesi on yhtä arvokas kuin kenen tahansa muun.",
      "Luottamus rakentuu hiljaa ja kestää vain, jos annat sen kasvaa rauhassa.",
      "Matka on osa tavoitteita, eikä kaikkea tarvitse pitää vain määränpäänä.",
      "Lepo on osa toimintaa, ei sen vastakohta.",
      "Idea muuttuu todellisuudeksi, kun se kerrotaan ääneen ja jaetaan.",
      "Tunteet ovat tietoa, mutta rajat tekevät niistä terveen, vahvan tiedon."
    ],
    pline: (g, p, s, h, a) => `${g} ${p} (${s}) kulkee ${h}.`,
    hs: (o, a) => `${o} huoneessasi – ${a}`,
    aspN: ["yhtyy", "tukee", "haastaa", "virtaa yhdessä", "vastustaa"],
    aspC: [0, 1, 2, 2, 1],
    aspPost: ["", "", "", " kanssa", ""],
    plC: [
      ["Aurinkoon", "Aurinkoa", "Auringon"],
      ["Kuuhun", "Kuuta", "Kuun"],
      ["Merkuriukseen", "Merkuriusta", "Merkuriuksen"],
      ["Venukseen", "Venusta", "Venuksen"],
      ["Marsiin", "Marsia", "Marsin"],
      ["Jupiteriin", "Jupiteria", "Jupiterin"],
      ["Saturnukseen", "Saturnusta", "Saturnuksen"]
    ],
    aspT: [
      "niiden teemat sulautuvat ja vahvistavat toisiaan.",
      "lempeä aukeama – pieni ponnistus palkitaan.",
      "kitka, joka vaatii päätöksen.",
      "asiat sujuvat helposti; älä haaskaa tilaisuutta.",
      "kaksi puolta punnittavana, kunnes löydät tasapainon."
    ],
    phase: ["Uusikuu", "Kasvava sirppi", "Ensimmäinen neljännes", "Kasvava kuperakuu", "Täysikuu", "Vähenevä kuperakuu", "Viimeinen neljännes", "Vähenevä sirppi"],
    phaseT: [
      "Hyvä hetki istuttaa aikomus.",
      "Ota ensimmäinen käytännön askel.",
      "Päätökset ja ponnistelu tuottavat nyt tulosta.",
      "Hio, säätö ja jatka.",
      "Asiat tulevat valoon; juhli tai päästä irti.",
      "Jaa oppimaasi.",
      "Päästä irti siitä, mikä ei enää toimi.",
      "Lepää ja valmistaudu uuteen kiertoon."
    ],
    moonIn: (s, p) => `Kuu on merkissä ${s}, ${p}.`,
    theme: ["Aloita itsestäsi", "Arvosta sitä, mitä sinulla on", "Puhu asia halki", "Palaa juuriisi", "Tee jotain ilon vuoksi", "Järjestä yksi pieni asia", "Tee tasapainoa toisen kanssa", "Päästä irti jostakin", "Katso kauemmas", "Näytä, mitä osaat", "Lähesty ystäviä ja yhteyttä", "Hidasta ja lepää"],
    ques: [
      ["Mitä aloittaisin tänään, jos pelkääminen ei pysäyttäisi minua?", "Missä kiirehdin, ja mitä kärsivällisyys voisi paljastaa?", "Kenen taistelua käyn, vaikka se ei ole minun?"],
      ["Mistä pienestä, kestävästä asiasta voisin olla ylpeä?", "Mihin pidän kiinni tottumuksen takia enemmän kuin rakkauden vuoksi?", "Millainen päivä olisi todella hyvä juuri minulle?"],
      ["Kenen pitäisi kuulla, mitä ajattelen?", "Mikä ideoistani ansaitsee kokonaisen viikon?", "Mitä kysymystä vältän, koska haluan pysyä kiireisenä?"],
      ["Mitä tunnen syvemmällä tasolla?", "Kenestä pidän huolta, ja kuka huolehtii minusta?", "Mitä koti minulle nykyään merkitsee?"],
      ["Missä voisin antaa tunnustusta sen sijaan, että yrittäisin jatkuvasti näyttää vahvalta?", "Mitä loisin, jos kukaan ei olisi katsomassa?", "Kuka ansaitsee lämpöäni tänään?"],
      ["Mikä olisi riittävän hyvä, ja miksi yritän aina enemmän?", "Mikä pieni tapa muuttaisi viikkoni suuntaa?", "Missä voin olla itselleni yhtä ystävällinen kuin muille?"],
      ["Missä valitsen rauhan rehellisyyden sijasta?", "Mitä todella haluan, kun en tarvitse miellyttää kaikkia?", "Minkä päätöksen olen lykännyt liian pitkään?"],
      ["Mistä olen valmis luopumaan?", "Keneen voin luottaa, ja miksi?", "Mitä totuutta olen kiertänyt?"],
      ["Mitä horisonttia kohti menen?", "Mitä tekisin, jos tietäisin, ettei epäonnistuminen olisi mahdollista?", "Mitä viimeisin harha tai kiertotie minulle opetti?"],
      ["Mitä olen rakentanut ja unohtanut juhlia?", "Missä lepo tekisi minusta tehokkaamman?", "Mikä tavoite on täysin minun omani?"],
      ["Mikä ideoistani tarvitsee käytännön kokeilun?", "Mihin haluan kuulua, enkä vain erottua joukosta?", "Kenet voisin kutsua mukaan suunnitelmiini?"],
      ["Mitä unelmani sanovat minulle?", "Missä tarvitsen rajaa suojellakseni lempeyttäni?", "Mikä pieni askel voisi tehdä unelmasta lähempänä?"]
    ],
    themeL: "Teema",
    quesL: "Pohdittavaksi",
    areas: ["Rakkaus", "Työ", "Raha", "Kasvu"],
    arT: [
      ["Pidä odotukset kevyinä ja ystävällisinä.", "Lämpö on tasaista; näytä se.", "Romantiikka ja charmi ovat suosiossa."],
      ["Rytmitä tekemistä ja vältä kitkaa.", "Tasainen työ huomataan.", "Tarmo ja aloitteellisuus avaavat ovia."],
      ["Varo heräteostoksia.", "Tasapainoinen – suunnittele ennen ostoa.", "Hyvä ajoitus järkeville riskeille."],
      ["Hidas kausi; kärsivällisyys on oppi.", "Pienet tavat vievät eteenpäin.", "Aika todelliselle sisäiselle kasvulle."]
    ],
    luckyL: "Onnenasiat",
    numL: "numero",
    colL: "väri",
    stL: "kivi",
    dayL: "päivä",
    strL: "Vahvuudet",
    chaL: "Haasteet",
    datesL: "Ajankohta",
    eleL: "Alkuaine",
    modL: "Laatu",
    rulL: "Hallitsija",
    rulM: "moderni",
    rulT: "perinteinen",
    pickTwo: "Valitse kaksi merkkiä",
    mScore: ["Rakkaus", "Ystävyys", "Viestintä"],
    dist: [
      "Sama merkki: peili, turvallinen ja joskus liian tuttu.",
      "Naapurit: hyvin erilaiset rytmit, vaatii kärsivällisyyttä ja uteliaisuutta.",
      "Sekstiili: ystävällinen, helppo yhteistyö ja yhteiset kiinnostuksen kohteet.",
      "Neliö: vahva kipinä ja kitka; kasvu syntyy ponnistelusta.",
      "Trigoni: luonnollinen ymmärrys ja yhteinen keveys.",
      "Kvinkunssi: outo pari, joka joutuu jatkuvasti mukautumaan.",
      "Vastakohdat: magneettinen veto, joka tasapainottaa toistensa aukkoja."
    ],
    elRel: ["Sama alkuaine – koette maailman samalla tavalla.", "Sopivat alkuaineet – ruokitte toisiaan.", "Eri alkuaineet – tulkitsette toistenne tyyliä."],
    learn: [
      ["Alkuaineet", "Tuli (Oinas, Leijona, Jousimies) toimii, Maa (Härkä, Neitsyt, Kauris) rakentaa, Ilma (Kaksonen, Vaaka, Vesimies) ajattelee ja yhdistää, Vesi (Rapu, Skorpioni, Kalat) tuntee."],
      ["Laadut", "Aloittavat merkit avaavat vuodenajat ja hankkeet, vakaat ylläpitävät, muuttuvat mukautuvat ja päättävät vuodenajat."],
      ["Planeetat", "Aurinko = identiteetti, Kuu = tunteet, Merkurius = mieli, Venus = rakkaus ja arvot, Mars = tarmo, Jupiter = kasvu, Saturnus = rakenne. Perinteinen hallitseminen käyttää seitsemää näkyvää planeettaa; moderni astrologia lisää Uranuksen, Neptunuksen ja Pluton."],
      ["Peräntymät", "Planeetta vaikuttaa tulevan Maasta katsottuna taaksepäin. Symbolisesti se kutsuu tarkistamaan, miettimään uudelleen ja tekemään uudelleen. Tunnetuin on Merkuriuksen retrogradio."],
      ["Huoneet", "Aurinkomerkkihoroskoopeissa käytetään merkkihuoneita omasta merkistä laskien: oma merkkisi on 1. huone, seuraava merkki 2. huone ja niin edelleen. Kulkeva planeetta valaisee kyseistä elämänaluetta."],
      ["Aspektit", "Planeettojen väliset kulmat: yhtymä 0° (sulautuminen), sekstiili 60° (helppous), neliö 90° (jännite), trigoni 120° (virtaus), oppositio 180° (tasapaino)."],
      ["Trooppinen eläinrata", "Sovellus käyttää trooppista eläinrataa: merkit alkavat maaliskuun päiväntasauksesta, eivät tähtikuvioista."],
      ["Miten tämä toimii", "Planeettojen sijainnit lasketaan tähtitieteellisesti; merkitykset tulevat sääntöpohjaisesta astrologisesta perinteestä (modernit psykologiset ja perinteiset symbolit). Kyse on symbolisesta pohdinnasta, ei ennustuksesta."]
    ],
    disc: "Astrologinen tulkinta on symbolista ja tarkoitettu pohdintaan ja viihteeksi, ei tieteelliseksi ennustukseksi.",
    datesNote: "Merkkien päivämäärät ovat suuntaa-antavia; Aurinko vaihtaa merkkiä hieman eri aikaan eri vuosina.",
    compatNote: "Prosentit ovat suuntaa-antavia, merkkeihin perustuvia pisteitä. Ne eivät ole mitattuja todennäköisyyksiä eivätkä kokonaisten syntymäkarttojen vertailua.",
    closest: "Lähimmillään",
    exact: "Tarkka",
    localTimeNote: "Ajat näytetään selaimen paikallisessa aikavyöhykkeessä.",
    credit: "<a href=\"https://github.com/Millaceedee/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color:inherit\">Millaceedee</a> © 2026. Lisensoitu MIT-lisenssillä. Tähtitieteelliset laskelmat: <a href=\"https://github.com/cosinekitty/astronomy\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color:inherit\">Astronomy Engine</a>, Don Cross."
  }
};

const nm = x => ((x % 360) + 360) % 360;
const signedAngle = x => ((x + 540) % 360) - 180;
const localNoon = date => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
const addLocalDays = (date, days) => {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
  d.setDate(d.getDate() + days);
  return d;
};
const lon = (b, d) => {
  const v = b === "Moon" ? AE.GeoMoon(d) : AE.GeoVector(AE.Body[b], d, true);
  return AE.Ecliptic(v).elon;
};

// Positions are geocentric ecliptic longitudes in the tropical zodiac.
// Central differences avoid the one-sided direction error near stations.
function sky(date) {
  const d = localNoon(date);
  const before = new Date(d.getTime() - 6 * 3600e3);
  const after = new Date(d.getTime() + 6 * 3600e3);
  return BODY.map((b, i) => {
    const l = nm(lon(b, d));
    const speed = signedAngle(lon(b, after) - lon(b, before)) / 0.5;
    return {
      i, lon: l, sign: Math.floor(l / 30), speed,
      retro: i > 1 && speed < -0.0001,
      stationary: i > 1 && Math.abs(speed) < 0.03
    };
  });
}

function allAspects(pl, skipMoon) {
  const out = [];
  for (let a = 0; a < pl.length; a++) {
    for (let b = a + 1; b < pl.length; b++) {
      if (skipMoon && (a === 1 || b === 1)) continue;
      const diff = Math.abs(signedAngle(pl[a].lon - pl[b].lon));
      ASP.forEach(([ang, orb], k) => {
        const o = Math.abs(diff - ang);
        if (o <= orb) out.push({ a, b, k, o, angle: diff });
      });
    }
  }
  return out.sort((x, y) => x.o - y.o);
}

function angleDiffAt(a, b, time) {
  return Math.abs(signedAngle(lon(BODY[a], time) - lon(BODY[b], time)));
}

function aspectOrbAt(a, b, angle, time) {
  return Math.abs(angleDiffAt(a, b, time) - angle);
}

// Search the whole interval at 3-hour resolution, then refine the closest
// point with golden-section minimization. Returns the closest timestamp.
function closestAspect(a, b, angle, start, end) {
  const step = 3 * 3600e3;
  let bestMs = start.getTime(), bestOrb = Infinity;
  for (let ms = start.getTime(); ms <= end.getTime(); ms += step) {
    const orb = aspectOrbAt(a, b, angle, new Date(ms));
    if (orb < bestOrb) { bestOrb = orb; bestMs = ms; }
  }
  const lo0 = Math.max(start.getTime(), bestMs - step);
  const hi0 = Math.min(end.getTime(), bestMs + step);
  let lo = lo0, hi = hi0;
  const gr = (Math.sqrt(5) - 1) / 2;
  let x1 = hi - gr * (hi - lo), x2 = lo + gr * (hi - lo);
  let f1 = aspectOrbAt(a, b, angle, new Date(x1));
  let f2 = aspectOrbAt(a, b, angle, new Date(x2));
  for (let i = 0; i < 36; i++) {
    if (f1 > f2) {
      lo = x1; x1 = x2; f1 = f2;
      x2 = lo + gr * (hi - lo);
      f2 = aspectOrbAt(a, b, angle, new Date(x2));
    } else {
      hi = x2; x2 = x1; f2 = f1;
      x1 = hi - gr * (hi - lo);
      f1 = aspectOrbAt(a, b, angle, new Date(x1));
    }
  }
  const ms = (lo + hi) / 2;
  return { date: new Date(ms), o: aspectOrbAt(a, b, angle, new Date(ms)) };
}

// Time span around the exact moment when the orb stays within maxOrb degrees.
function aspectWindow(a, b, angle, center, maxOrb) {
  const step = 3 * 3600e3, limit = 20 * 86400e3, c = center.getTime();
  let lo = c, hi = c;
  while (lo > c - limit && aspectOrbAt(a, b, angle, new Date(lo - step)) <= maxOrb) lo -= step;
  while (hi < c + limit && aspectOrbAt(a, b, angle, new Date(hi + step)) <= maxOrb) hi += step;
  return { from: new Date(lo), to: new Date(hi) };
}

function periodAspects(start, days, skipMoon) {
  const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + days);
  const out = [];
  for (let a = 0; a < BODY.length; a++) {
    for (let b = a + 1; b < BODY.length; b++) {
      if (skipMoon && (a === 1 || b === 1)) continue;
      ASP.forEach(([angle, maxOrb], k) => {
        const closest = closestAspect(a, b, angle, startTime, new Date(end.getTime() - 1));
        if (closest.o <= maxOrb) out.push({ a, b, k, angle, o: closest.o, date: closest.date });
      });
    }
  }
  return out.sort((x, y) => x.o - y.o).slice(0, 6).map(x => ({
    ...x, win: aspectWindow(x.a, x.b, x.angle, x.date, 2)
  }));
}

function aspects(pl, skipMoon, date) {
  if (!date) return allAspects(pl, skipMoon).slice(0, 3);
  return periodAspects(date, 1, skipMoon).slice(0, 3);
}

function findSignIngress(planet, loDate, hiDate, oldSign) {
  let lo = loDate.getTime(), hi = hiDate.getTime();
  for (let i = 0; i < 42; i++) {
    const mid = (lo + hi) / 2;
    const sign = Math.floor(nm(lon(BODY[planet], new Date(mid))) / 30);
    if (sign === oldSign) lo = mid;
    else hi = mid;
  }
  return new Date(hi);
}

function periodChanges(start, days) {
  const changes = [];
  const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + days);
  const step = 6 * 3600e3;
  for (let i = 0; i < BODY.length; i++) {
    if (i === 1) continue;
    let previousTime = new Date(startTime.getTime());
    let previousSign = Math.floor(nm(lon(BODY[i], previousTime)) / 30);
    for (let ms = previousTime.getTime() + step; ms <= end.getTime() + step; ms += step) {
      const time = new Date(Math.min(ms, end.getTime()));
      const currentSign = Math.floor(nm(lon(BODY[i], time)) / 30);
      if (currentSign !== previousSign) {
        const exact = findSignIngress(i, previousTime, time, previousSign);
        changes.push({ type: "sign", planet: i, from: previousSign, to: currentSign, date: exact });
      }
      previousTime = time;
      previousSign = currentSign;
      if (ms >= end.getTime()) break;
    }
  }
  // Detect stations by locating a change in the sign of daily longitudinal speed.
  for (let i = 2; i < BODY.length; i++) {
    let prev = new Date(startTime.getTime());
    let prevSpeed = signedAngle(lon(BODY[i], new Date(prev.getTime() + 6 * 3600e3)) -
      lon(BODY[i], new Date(prev.getTime() - 6 * 3600e3)));
    for (let ms = prev.getTime() + 12 * 3600e3; ms <= end.getTime(); ms += 12 * 3600e3) {
      const t = new Date(ms);
      const speed = signedAngle(lon(BODY[i], new Date(ms + 6 * 3600e3)) -
        lon(BODY[i], new Date(ms - 6 * 3600e3)));
      if ((prevSpeed < 0 && speed >= 0) || (prevSpeed > 0 && speed <= 0)) {
        let lo = prev.getTime(), hi = ms;
        const retroBefore = prevSpeed < 0;
        for (let n = 0; n < 36; n++) {
          const mid = (lo + hi) / 2;
          const v = signedAngle(lon(BODY[i], new Date(mid + 6 * 3600e3)) -
            lon(BODY[i], new Date(mid - 6 * 3600e3)));
          if ((v < 0) === retroBefore) lo = mid; else hi = mid;
        }
        changes.push({ type: "motion", planet: i, retro: !retroBefore, date: new Date((lo + hi) / 2) });
      }
      prev = t; prevSpeed = speed;
    }
  }
  return changes.sort((a, b) => a.date - b.date);
}

const fmtD = (d, lang) => lang === "fi" ? `${d.getDate()}.${d.getMonth() + 1}.` : `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()]} ${d.getDate()}`;
const fmtTime = (d, lang) => `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
const fmtFull = (d, lang) => lang === "fi" ? `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}` : `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

function moonEvents(start, days) {
  const end = addLocalDays(start, days), out = [];
  let q = AE.SearchMoonQuarter(new Date(start.getFullYear(), start.getMonth(), start.getDate()));
  for (let n = 0; n < 8 && q.time.date < end; n++) {
    const d = q.time.date;
    if (d >= start) out.push({ date: d, q: q.quarter, idx: q.quarter * 2, sign: Math.floor(lon("Moon", d) / 30) });
    q = AE.NextMoonQuarter(q);
  }
  return out;
}

const houseOf = (planetSign, sign) => ((planetSign - sign + 12) % 12) + 1;
const hash = s => {
  let x = 7;
  for (const c of s) x = (x * 31 + c.charCodeAt(0)) >>> 0;
  return x;
};
const iso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
function stars(n) { return '<span class="star" aria-label="' + n + '/5">' + "★".repeat(n) + '<i>' + "★".repeat(5 - n) + "</i></span>"; }

function compat(a, b) {
  // Sign-only compatibility is a symbolic comparison, not a measured probability.
  const dist = Math.min((a - b + 12) % 12, (b - a + 12) % 12);
  const ea = a % 4, eb = b % 4;
  const sameElement = ea === eb;
  const complementary = (ea === 0 && eb === 2) || (ea === 2 && eb === 0) ||
    (ea === 1 && eb === 3) || (ea === 3 && eb === 1);
  const elementScore = sameElement ? 84 : complementary ? 80 : 62;
  const modalityA = a % 3, modalityB = b % 3;
  const modalityScore = modalityA === modalityB ? 72 : 82;
  const communicationScore = clamp(Math.round((elementScore * 0.55) + (modalityScore * 0.45) + (a === b ? 3 : 0)), 35, 98);
  return {
    dist,
    rel: sameElement ? 0 : complementary ? 1 : 2,
    s: [
      clamp(Math.round(elementScore + (modalityA === modalityB ? -3 : 3)), 35, 98),
      clamp(Math.round((elementScore + modalityScore) / 2), 35, 98),
      communicationScore
    ]
  };
}

const S = { lang: "en", tab: 0, sign: 0, per: 0, date: new Date(), a: 0, b: 4 };
try { S.lang = localStorage.getItem("horoscope_lang") || ((navigator.language || "").startsWith("fi") ? "fi" : "en"); } catch (e) {}

const $ = id => document.getElementById(id);

function wheel(pl, sign, T) {
  const c = 150, pt = (l, r) => { const t = (180 - l) * Math.PI / 180; return [c + r * Math.cos(t), c - r * Math.sin(t)]; };
  let s = `<svg viewBox="0 0 300 300" width="100%" role="img" aria-label="${T.sky}"><circle cx="150" cy="150" r="140" fill="#2a1a4a" stroke="#dcb36c" stroke-width="1.5"/>`;
  const w0 = pt(sign * 30, 138), w1 = pt(sign * 30 + 30, 138), i0 = pt(sign * 30, 98), i1 = pt(sign * 30 + 30, 98);
  s += `<path d="M${w0} A138 138 0 0 0 ${w1} L${i1} A98 98 0 0 1 ${i0}Z" fill="#dcb36c" opacity=".28"/><circle cx="150" cy="150" r="98" fill="#150d26" stroke="#dcb36c" stroke-width="1"/>`;
  for (let i = 0; i < 12; i++) {
    const [x, y] = pt(i * 30, 98), [x2, y2] = pt(i * 30, 140), [gx, gy] = pt(i * 30 + 15, 119);
    s += `<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" stroke="#5a4682"/><text x="${gx}" y="${gy + 6}" text-anchor="middle" font-size="19" fill="#dcb36c">${SG[i]}</text>`;
  }
  pl.forEach(p => {
    const [x, y] = pt(p.lon, 80 - (p.i % 3) * 13);
    s += `<circle cx="${x}" cy="${y}" r="9" fill="#33215a" stroke="#f1d595"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-size="13" fill="#f1d595">${PG[p.i]}</text>`;
  });
  return s + '<circle cx="150" cy="150" r="3" fill="#dcb36c"/></svg>';
}

function signPicker(key, T) {
  return `<div class="signs" role="group" aria-label="${T.pick}">` + SG.map((g, i) =>
    `<button type="button" class="chip${S[key] === i ? ' on' : ''}" aria-pressed="${S[key] === i}" data-k="${key}" data-v="${i}"><b>${g}</b>${T.signs[i]}</button>`).join('') + '</div>';
}

function forecast(T, pl, sg, show, key, pi, moon, per, activeAspects, changes) {
  const hv = hash(key), n = [1, 2, 3][per], pool = show.filter(i => i !== 1 || per === 0);
  const leads = [];
  for (let k = 0; k < n && k < pool.length; k++) leads.push(pool[(hv + k * 3) % pool.length]);
  const uniq = leads.filter((v, k) => leads.indexOf(v) === k);
  const seen = [];
  const para = uniq.map((i, k) => {
    const hh = houseOf(pl[i].sign, sg), again = seen.includes(hh);
    seen.push(hh);
    return (k === 0 ? T.fcOpen[sg] + " " : "") + T.fcPlanet[i] + (again ? "" : " " + T.fcHouse[hh - 1]);
  });
  const tail = [T.fcMoon[pi]];
  const A = activeAspects[0];
  if (A) tail.push(T.fcBeneath(`${T.pl[A.a]} (${T.kw[A.a]})`, `${T.pl[A.b]} (${T.kw[A.b]})`, T.fcAsp[A.k]));
  if (changes.length) {
    const c = changes[0];
    if (c.type === "sign") {
      tail.push(T.pl[c.planet] + (S.lang === "fi" ? ` siirtyy ${T.signs[c.to]}-merkkiin ${fmtD(c.date, S.lang)}.` : ` enters ${T.signs[c.to]} on ${fmtD(c.date, S.lang)}.`));
    }
  }
  tail.push(T.fcClose[sg]);
  para.push(tail.join(" "));
  return para.map(x => `<p>${x}</p>`).join("");
}

function scoreArea(planet, area, sign, pl) {
  const hh = houseOf(planet.sign, sign);
  const favourable = [
    [5, 7, 11],       // Venus: love, pleasure, relationships
    [1, 5, 10],       // Mars: initiative, creativity, career
    [2, 9, 11],       // Jupiter: resources, learning, networks
    [1, 6, 10]        // Saturn: discipline, routines, long-term work
  ][area];
  const difficult = [
    [6, 8, 12], [4, 7, 12], [3, 6, 8], [5, 7, 11]
  ][area];
  let score = 3 + (favourable.includes(hh) ? 1 : 0) - (difficult.includes(hh) ? 1 : 0);
  if (planet.retro) score -= 1;
  if (planet.stationary) score -= 1;
  allAspects(pl, false).forEach(a => {
    if (a.a !== planet.i && a.b !== planet.i) return;
    // Soft aspects help; hard aspects call for more care. Conjunctions are neutral
    // unless the other planet is traditionally benefic or malefic.
    if (a.k === 1 || a.k === 3) score += 0.5;
    if (a.k === 2 || a.k === 4) score -= 0.5;
    const other = a.a === planet.i ? a.b : a.a;
    if (a.k === 0 && (other === 5 || other === 3)) score += 0.5;
    if (a.k === 0 && (other === 4 || other === 6)) score -= 0.5;
  });
  return clamp(Math.round(score), 1, 5);
}

function scoreAreaForPeriod(area, sign, start, days, midpointSky) {
  if (days === 1) return scoreArea(midpointSky[[3, 4, 5, 6][area]], area, sign, midpointSky);
  let total = 0;
  for (let day = 0; day < days; day++) {
    const pl = sky(addLocalDays(start, day));
    total += scoreArea(pl[[3, 4, 5, 6][area]], area, sign, pl);
  }
  return clamp(Math.round(total / days), 1, 5);
}

function bestDay(start, days, sign) {
  let best = { date: start, score: -Infinity };
  for (let day = 0; day < days; day++) {
    const date = addLocalDays(start, day), pl = sky(date);
    const score = [3, 4, 5, 6].reduce((sum, idx, area) => sum + scoreArea(pl[idx], area, sign, pl), 0);
    if (score > best.score) best = { date, score };
  }
  return best.date;
}

function reading(T) {
  const base = new Date(S.date.getFullYear(), S.date.getMonth(), S.date.getDate());
  const days = [1, 7, 30][S.per];
  const mid = addLocalDays(base, Math.floor((days - 1) / 2));
  const pl = sky(mid), sg = S.sign, key = iso(base) + sg + S.per;
  const show = [[1, 2, 3, 4], [0, 2, 3, 4], [0, 3, 4, 5, 6]][S.per];
  const moon = pl[1], ph = AE.MoonPhase(localNoon(mid)), pi = Math.floor(nm(ph + 22.5) / 45) % 8;
  const ev = S.per === 0 ? [] : moonEvents(base, days);
  const fpi = ev.length ? (ev.find(e => e.q === 0 || e.q === 2) || ev[0]).idx : pi;
  const activeAspects = S.per === 0 ? aspects(pl, false, base) : periodAspects(base, days, true);
  const changes = S.per === 0 ? [] : periodChanges(base, days);
  const end = addLocalDays(base, days - 1);
  const rng = S.per === 0 ? iso(base) : iso(base) + " – " + iso(end);
  let h = `<div class="grid two"><div class="card"><div style="max-width:300px;margin:auto">${wheel(pl, sg, T)}</div><p class="note" style="text-align:center">${T.signs[sg]} ${SG[sg]}</p></div><div class="card">`;
  h += `<h2>${SG[sg]} ${T.signs[sg]} · ${T.per[S.per]} · ${rng}</h2>`;
  h += `<p><b>${T.themeL}:</b> ${T.theme[houseOf(moon.sign, sg) - 1]}</p><p class="q">${T.ques[sg][hash(key) % 3]}</p>`;
  if (!ev.length) h += `<p>${PG[1]} ${T.moonIn(T.signs[moon.sign], T.phase[pi].toLowerCase())} ${T.phaseT[pi]}</p>`;
  else h += `<h3>${T.moonL}</h3>` + ev.map(e => `<p>${PG[1]} <b>${fmtD(e.date, S.lang)}</b> – ${T.phase[e.idx]} (${T.signs[e.sign]}). ${T.phaseT[e.idx]}</p>`).join("");
  h += `<h3>${T.sky}${S.per === 0 ? "" : S.lang === "fi" ? " (jakson keskikohta)" : " (period midpoint)"}</h3>`;
  show.forEach(i => {
    const p = pl[i], hh = houseOf(p.sign, sg);
    h += `<p>${T.pline(PG[i], T.pl[i], T.signs[p.sign], T.hs(T.ord(hh), T.house[hh - 1]))} ${T.adv[hh - 1]}${p.retro ? T.retroP[i] : ""}${p.stationary ? (S.lang === "fi" ? " Planeetta on lähes pysähdyksissä." : " The planet is near a station.") : ""}</p>`;
  });
  if (changes.length) {
    h += `<h3>${S.lang === "fi" ? "Muutokset jakson aikana" : "Changes during the period"}</h3>`;
    changes.forEach(c => {
      const date = `${fmtD(c.date, S.lang)} ${fmtTime(c.date, S.lang)}`;
      if (c.type === "sign") h += `<p><b>${date}</b> · ${T.pl[c.planet]}: ${T.signs[c.from]} → ${T.signs[c.to]}</p>`;
      else h += `<p><b>${date}</b> · ${T.pl[c.planet]} ${c.retro ? (S.lang === "fi" ? "alkaa perääntyä" : "turns retrograde") : (S.lang === "fi" ? "päättää perääntymisen" : "turns direct")}</p>`;
    });
  }
  if (changes.length || activeAspects.length) h += `<p class="note">${T.localTimeNote}</p>`;
  activeAspects.forEach(x => {
    const A = pl[x.a], B = pl[x.b];
    const label = x.o < 0.01 ? T.exact : T.closest;
    const dateLabel = x.date ? `<span class="note">${label} ${fmtD(x.date, S.lang)} ${fmtTime(x.date, S.lang)} · </span>` : "";
    h += `<p>${dateLabel}${PG[A.i]} ${T.pl[A.i]} ${T.aspN[x.k]} ${PG[B.i]} ${T.plC ? T.plC[B.i][T.aspC[x.k]] : T.pl[B.i]}${T.aspPost ? T.aspPost[x.k] : ""}: ${T.kw[A.i]} ↔ ${T.kw[B.i]} – ${T.aspT[x.k]} ${x.win ? ` <span class="note">(${S.lang === "fi" ? "vaikuttaa" : "in effect"} ${fmtD(x.win.from, S.lang)}–${fmtD(x.win.to, S.lang)})</span>` : ""}</p>`;
  });
  h += `<h3>${T.fcL}</h3>` + forecast(T, pl, sg, show, key, fpi, moon, S.per, activeAspects, changes);
  h += `<h3>${T.areas.join(" · ")}</h3>`;
  [3, 4, 5, 6].forEach((pi2, n) => {
    const p = pl[pi2], r = scoreAreaForPeriod(n, sg, base, days, pl);
    h += `<p><b>${T.areas[n]}</b> ${stars(r)}<br>${T.arT[n][r <= 2 ? 0 : r === 3 ? 1 : 2]}</p>`;
  });
  const hv = hash(key), lucky = bestDay(base, days, sg), wd = lucky.getDay();
  h += `<h3>${T.luckyL}</h3><div class="lucky"><span>${T.numL}: ${1 + hv % 9}</span><span>${T.colL}: ${T.col[(moon.sign + sg) % 12]}</span><span>${T.stL}: ${T.stone[sg]}</span><span>${T.dayL}: ${T.day[wd]} (${fmtD(lucky, S.lang)})</span></div>`;
  return h + `<p class="note">${T.disc}</p></div></div>`;
}

function signPage(T) {
  const i = S.sign, [s, c] = T.tr[i].split("|"), r = RUL[i], lang = S.lang;
  const st = SIGN_START[i], en = SIGN_START[(i + 1) % 12];
  const fmt = m => {
    const [mm, dd] = m.split("-");
    return lang === "fi" ? `${+dd}.${+mm}.` : `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][mm - 1]} ${+dd}`;
  };
  const [dm, dt] = [T.rl[r[0]], T.rl[r[1]]];
  return `<div class="card"><div class="big">${SG[i]}</div><h2>${T.signs[i]}</h2>
<p>${T.sd(T.signs[i], T.el[i % 4], T.mo[i % 3], r[0] === r[1] ? dm : dm + " / " + dt)} ${T.elT[i % 4]} ${T.moT[i % 3]}</p>
<dl class="meta"><dt>${T.datesL}</dt><dd>${fmt(st)} – ${fmt(en)}</dd><dt>${T.eleL}</dt><dd>${T.el[i % 4]}</dd><dt>${T.modL}</dt><dd>${T.mo[i % 3]}</dd><dt>${T.rulL}</dt><dd>${dm} (${T.rulM})${r[0] === r[1] ? "" : ", " + dt + " (" + T.rulT + ")"}</dd></dl>
<p class="note">${T.datesNote}</p><h3>${T.strL}</h3><p>${s}</p><h3>${T.chaL}</h3><p>${c}</p>
<h3>${T.luckyL}</h3><div class="lucky"><span>${T.numL}: ${LUCKY_N[i]}</span><span>${T.colL}: ${T.col[i]}</span><span>${T.stL}: ${T.stone[i]}</span><span>${T.dayL}: ${T.day[LUCKY_D[i]]}</span></div></div>`;
}

function match(T) {
  const m = compat(S.a, S.b);
  return `<div class="card"><h2>${T.pickTwo}</h2>${signPicker("a", T)}${signPicker("b", T)}
<h2>${SG[S.a]} ${T.signs[S.a]} + ${SG[S.b]} ${T.signs[S.b]}</h2>` +
    m.s.map((v, i) => `<div>${T.mScore[i]} · ${v}%<div class="meter"><i style="width:${v}%"></i></div></div>`).join("") +
    `<p>${T.dist[m.dist]} ${T.elRel[m.rel]}</p><p class="note">${T.compatNote}</p><p class="note">${T.disc}</p></div>`;
}

const learn = T => `<div class="card"><h2>${T.tabs[3]}</h2>` + T.learn.map(([t, x]) => `<details><summary>${t}</summary><p>${x}</p></details>`).join("") + "</div>";

function render() {
  const T = D[S.lang];
  document.documentElement.lang = S.lang;
  $("sub").textContent = T.sub;
  $("lb").textContent = S.lang === "en" ? "Suomeksi" : "English";
  $("title").firstChild.nodeValue = S.lang === "en" ? "Horoscope" : "Horoskooppi";
  document.title = S.lang === "en" ? "Horoscope – Free Daily, Weekly & Monthly Horoscopes" : "Horoskooppi – Päivän, viikon ja kuukauden horoskoopit";
  $("credit").innerHTML = T.credit;
  $("tabs").innerHTML = T.tabs.map((t, i) => `<button type="button" class="tab${S.tab === i ? " on" : ""}" data-tab="${i}">${t}</button>`).join("");
  let h = "";
  if (S.tab === 0 || S.tab === 1) h += signPicker("sign", T);
  if (S.tab === 0) h += `<div class="bar"><div class="seg">${T.per.map((p, i) => `<button type="button" class="${S.per === i ? "on" : ""}" data-per="${i}">${p}</button>`).join("")}</div><label>${T.date} <input type="date" id="dt" value="${iso(S.date)}" min="1900-01-01" max="2099-12-31"></label></div>`;
  h += [reading, signPage, match, learn][S.tab](T);
  $("view").innerHTML = h;
}

function init() {
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-k],[data-tab],[data-per]");
    if (e.target.closest("#lb")) { S.lang = S.lang === "en" ? "fi" : "en"; try { localStorage.setItem("horoscope_lang", S.lang); } catch (x) {} return render(); }
    if (!t) return;
    if (t.dataset.k) S[t.dataset.k] = +t.dataset.v;
    if (t.dataset.tab) S.tab = +t.dataset.tab;
    if (t.dataset.per) S.per = +t.dataset.per;
    render();
  });

  document.addEventListener("change", e => {
    if (e.target.id === "dt" && e.target.value) {
      const [y, m, d] = e.target.value.split("-").map(Number);
      S.date = new Date(y, m - 1, d);
      render();
    }
  });

  render();
}

if (typeof document !== "undefined") init();
root.HoroscopeEngine = { sky, aspects, allAspects, periodAspects, periodChanges, compat, houseOf, scoreArea, moonEvents };

})(typeof window !== "undefined" ? window : globalThis);