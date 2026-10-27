// Vahvista tiedot käyttäjältä. Luonnos ei saa lähettää henkilötietoja.
window.SITE_CONFIG = {
  localFormTest: false, // Toimii vain paikallisesta tiedostosta tai localhostista.
  publicationReady: true,
  contactConfirmed: true,
  photoConfirmed: true,
  profileConfirmed: true,
  privacyConfirmed: true,
  formTested: true,
  phoneDisplay: '050 527 2060',
  phoneHref: '+358505272060',
  email: 'esko@kuivinenlkv.fi',
  profileUrl: 'https://kuivinenlkv.fi/',
  photoPath: 'esko-savioja-ulkokuva.png',
  photoAlt: 'Esko Savioja Kuivinen LKV:n toimiston edustalla',
  formEndpoint: 'https://formspree.io/f/xzeeelzo', // Formspreen antama https://formspree.io/f/LOMAKE_ID
  privacy: {
    controller: 'Rekisterinpitäjä: Kuivinen LKV Oy, Y-tunnus 2308076-0, Museokatu 3, 00100 Helsinki.', // Rekisterinpitäjän virallinen nimi, yhteystiedot ja mahdollinen Y-tunnus
    legalBasis: "Tietoja käytetään yhteydenottoosi vastaamiseen ja pyytämiesi välityspalvelujen valmisteluun. Palvelupyyntöjen käsittely perustuu pyynnöstäsi tehtäviin sopimusta edeltäviin toimenpiteisiin (GDPR 6 artikla 1 b). Muissa tiedusteluissa perusteena on oikeutettu etu hoitaa yritykselle osoitettua yhteydenpitoa (6 artikla 1 f). Lomake ei liitä sinua markkinointilistalle.", // Todellista toimintaa vastaava käsittelyperuste
    retention: "Jos yhteydenotto ei johda asiakkuuteen, lomakkeella annetut tiedot poistetaan Formspreestä ja Microsoft 365 -sähköpostista viimeistään yhden kuukauden kuluttua yhteydenotosta. Jos yhteydenotto johtaa asiakkuuteen tai toimeksiantoon, tarpeellisten tietojen säilyttämisessä noudatetaan yrityksen asiakasrekisterin käytäntöjä ja sovellettavia lakisääteisiä velvoitteita.", // Vahvistettu säilytysaika tai sen määräytymisperuste
    processors: "Lomakevälittäjänä käytetään Formspreetä, joka tallentaa ja välittää viestin. Formspree ilmoittaa käyttävänsä Yhdysvalloissa sijaitsevia AWS-palvelimia ja EU:n vakiosopimuslausekkeita henkilötietojen käsittelijänä. Viesti toimitetaan Kuivinen LKV Oy:n Microsoft 365 -sähköpostiin. Microsoft käsittelee viestejä sähköpostipalvelun tuottamiseksi. Microsoft 365:n käsittelyyn sovelletaan yrityksen Microsoft-palvelusopimuksen tietosuojaehtoja. Sivusto julkaistaan GitHub Pagesissa. Sivupyynnön yhteydessä GitHub käsittelee teknisiä tietoja, kuten IP-osoitteen, palvelun tuottamista ja suojaamista varten.", // GitHub Pages, lomakepalvelu, sähköposti, siirrot ja suojatoimet
    contact: "Tietosuoja-asioiden yhteyshenkilö: Maria Kuivinen, Kuivinen LKV Oy, maria@kuivinenlkv.fi, puh. 044 5746 727." // Tietosuoja-asioiden yhteysosoite
  }
};
