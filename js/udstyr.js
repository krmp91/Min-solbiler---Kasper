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

const URL = window.location.search;
const URLDATA = new URLSearchParams(URL);
const LEJEASIDE = document.getElementById("lejeoplysninger");

LEJEASIDE.insertAdjacentHTML("beforeend", "<br><h3>" + URLDATA.get('bil') + "</h3>");
LEJEASIDE.insertAdjacentHTML("beforeend", `<br>Afhentningsdato: ${URLDATA.get('afhentning')}`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<br>Afleveringsdato: ${URLDATA.get('aflevering')}`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<br>Antal dage: ${URLDATA.get('lejedage')}`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<br><br><h3>Billeje i alt ${parseFloat(URLDATA.get('lejeudgift')).toLocaleString('da-DK', { style: 'currency', currency: 'DKK' })}</h3>inkl. moms`);

sessionStorage.setItem("bil", URLDATA.get('bil'));
sessionStorage.setItem("afhentningsdato", URLDATA.get('afhentning'));
sessionStorage.setItem("afleveringsdato", URLDATA.get('aflevering'));
sessionStorage.setItem("lejedage", URLDATA.get('lejedage'));
sessionStorage.setItem("lejeudgift", parseFloat(URLDATA.get('lejeudgift')).toLocaleString('da-DK', { style: 'currency', currency: 'DKK' }));

let TOTAL = parseFloat(URLDATA.get('lejeudgift'));
let UDSTYRSUDGIFT = 0.00;

const TOTALASIDE = document.getElementById("totalindhold");
visTotal();

const CHECKBOKSE = document.getElementsByClassName("checkboks");

for (const CHECKBOKS of CHECKBOKSE) {
    CHECKBOKS.addEventListener("change", function () {
        if (this.checked === true) { // Hvis der vælges en vare
            TOTAL = Math.abs(TOTAL + parseFloat(this.value)); // læg udstyrspris til total
            UDSTYRSUDGIFT = Math.abs(UDSTYRSUDGIFT + parseFloat(this.value));
        }
        else { // Hvis der fravælges en vare
            TOTAL = Math.abs(TOTAL - parseFloat(this.value)); // træk udstyrspris fra total
            UDSTYRSUDGIFT = Math.abs(UDSTYRSUDGIFT - parseFloat(this.value));
        }
        visTotal();
    })
}

const FORMULAR = document.getElementById("formular");
FORMULAR.addEventListener("submit", gemValgtUdstyr); 

function gemValgtUdstyr() {
    let udstyrsliste = [];
    for (const CHECKBOKS of CHECKBOKSE) {
        if (CHECKBOKS.checked === true) {
            udstyrsliste.push(CHECKBOKS.dataset.udstyr);     
        }
    }
    sessionStorage.setItem("udstyrsliste", JSON.stringify(udstyrsliste));
    sessionStorage.setItem("udstyrsudgift", UDSTYRSUDGIFT.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' }));
    sessionStorage.setItem("total", TOTAL.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' }));
}

function visTotal() {
    TOTALASIDE.innerHTML = `<br><h3>TOTAL ${TOTAL.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' })}</h3>inkl. moms`;
}
