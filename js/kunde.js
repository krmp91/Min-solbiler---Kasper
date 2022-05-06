const MOON = '🌙';
const SUN = '☀️';
const DARK_MODE = 'dark';
const LIGHT_MODE = 'light';
const DEFAULT_MODE = DARK_MODE;
    
const btn = document.querySelector('#theme-switcher');
    
init();
    
function init() {
    let storedMode = localStorage.getItem('mode');
    if (!storedMode) {
        storedMode = DEFAULT_MODE;
        localStorage.setItem('mode', DEFAULT_MODE);
    }
    setMode(storedMode);
}
    
function setMode(mode = DEFAULT_MODE) {
    if (mode === DARK_MODE) {
        btn.textContent = SUN;
        document.body.classList.add(DARK_MODE);
    
    } else if (mode === LIGHT_MODE) {
        btn.textContent = MOON;
        document.body.classList.remove(DARK_MODE);
    }
}
    
btn.addEventListener('click', function () {
    let mode = localStorage.getItem('mode');
    if (mode) {
        let newMode = mode == DARK_MODE ? LIGHT_MODE : DARK_MODE;
        setMode(newMode);
        localStorage.setItem('mode', newMode);
    }
});

const LEJEASIDE = document.getElementById("lejeoplysninger");

LEJEASIDE.insertAdjacentHTML("beforeend", "<br><h3>" + sessionStorage.getItem('bil') + "</h3>");
LEJEASIDE.insertAdjacentHTML("beforeend", `Afhentningsdato: ${sessionStorage.getItem('afhentningsdato')}`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<br>Afleveringsdato: ${sessionStorage.getItem('afleveringsdato')}`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<br>Antal dage: ${sessionStorage.getItem('lejedage')}`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<br><br><h4>Billeje i alt ${sessionStorage.getItem('lejeudgift')}</h4>inkl. moms`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<br><br><h3>Udstyrsvalg</h3><ul id="ekstraudstyr">`);
const DATA = sessionStorage.getItem("udstyrsliste");
const UDSTYRSLISTE = JSON.parse(DATA);
const EKSTRAUDSTYR = document.getElementById("ekstraudstyr");

// udskrivning af liste til skærm
for (const UDSTYR of UDSTYRSLISTE) {
    EKSTRAUDSTYR.insertAdjacentHTML("beforeend", `<li style="margin-left: 15px;">${UDSTYR}</li>`);
}

LEJEASIDE.insertAdjacentHTML("beforeend", `</ul><br><h4>Udstyr i alt ${sessionStorage.getItem('udstyrsudgift')}</h4>inkl. moms`);

const TOTALASIDE = document.getElementById("totalindhold");
TOTALASIDE.insertAdjacentHTML("beforeend", `<br><h3>TOTAL ${sessionStorage.getItem('total')}</h3>inkl. moms`);

const FORMULAR = document.getElementById("formular");
FORMULAR.addEventListener("submit", function (e) {
    e.preventDefault();
    sessionStorage.setItem("fornavn", document.getElementById("fornavn").value);
    sessionStorage.setItem("efternavn", document.getElementById("efternavn").value);
    sessionStorage.setItem("vejnavn", document.getElementById("vejnavn").value);
    sessionStorage.setItem("vejnr", document.getElementById("vejnr").value);
    sessionStorage.setItem("postnr", document.getElementById("postnr").value);
    window.location.href = "kvittering.html";
})


fetch("https://api.dataforsyningen.dk/postnumre")
    .then(function (data) {
        return data.json();
    })
    .then(function (post) {
        const PBLISTE = document.getElementById("pbliste");
        for (const oplysninger of post) {
            PBLISTE.insertAdjacentHTML("beforeend", "<option>" + oplysninger.nr + " " + oplysninger.navn + "</option>");
        }

    })
    .catch(function (error) {
        const PB = document.getElementById("postnr");
        PB.innerHTML = "Postnr og by ikke tilgængelige";
    })

