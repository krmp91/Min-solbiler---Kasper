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

let biler = []; // Global variabel, kendt af alle
fetch("https://api.jsonbin.io/b/620a6011ca70c44b6e97742f") // Husk at URL skal passe med json data 
// fetch("js/biler.json") // Eksempel med billiste fra lokal fil. Husk at kløre live server.
    .then(function (data) { //støbt i cement
        return data.json(); //støbt i cement
    })                      //støbt i cement
    .then(function (post) {
        biler = post.billiste; // Global variable sat til JSON indhold
    })


const sektion = document.getElementById('bil_sektion');
const skabelon = document.getElementById('skabelon_output');
const personer = document.getElementById('personer');
const kufferter = document.getElementById('kufferter');
const formular = document.getElementById('formular');
const afhentningsdato = document.getElementById('afhentning');
const afleveringsdato = document.getElementById('aflevering');

formular.addEventListener("submit", function (event) {
    event.preventDefault();
    if (valideDatoer(afhentningsdato.value, afleveringsdato.value)) {
        sektion.innerHTML = ""; //Nulstiller output-sektion
        for (const bil of biler) {
            if (kufferter.value <= bil.kufferter && personer.value <= bil.personer) {
                const antaldage = beregnAntalLejedage(afhentningsdato.value, afleveringsdato.value);
                const klon = skabelon.content.cloneNode(true);
                const bilMM = klon.querySelector(".bilMM");
                const billedtag = klon.querySelector("img");
                const kategori = klon.querySelector(".kategori");
                const antalpersoner = klon.querySelector(".antalpersoner");
                const antalkufferter = klon.querySelector(".antalkufferter");
                const lejeudgift = klon.querySelector(".lejeudgift");
                const lejeudgiftEuro = klon.querySelector(".lejeudgiftEuro");
                const antallejedage = klon.querySelector(".antaldageialt");

                const link = klon.querySelector("a");
                link.href = `udstyr.html?bil=${bil.bilmaerke}&afhentning=${afhentningsdato.value}&aflevering=${afleveringsdato.value}&lejedage=${antaldage}&lejeudgift=${beregnLejeudgift(antaldage, bil.tillaeg)}`;

                billedtag.src = bil.billede;
                billedtag.alt = bil.billedtekst;
                bilMM.textContent = bil.bilmaerke;
                kategori.textContent += bil.kategori;
                antalkufferter.textContent += bil.kufferter;
                antalpersoner.textContent += bil.personer;
                antallejedage.textContent += antaldage;
                lejeudgift.textContent += beregnLejeudgift(antaldage, bil.tillaeg);
                lejeudgiftEuro.textContent += beregnLejeudgiftEUR(antaldage, bil.tillaeg);
                         
                sektion.appendChild(klon);
            }
        }
        alert("Du har valgt antal dage: " + beregnAntalLejedage(afhentningsdato.value, afleveringsdato.value));
    } else {
        sektion.innerText = "Opgiv en afleveringsdato som ligger efter afhentingsdato.";
    }
})

function valideDatoer(afhentningsdato, afleveringsdato) {
    const afhentning = new Date(afhentningsdato);
    const aflevering = new Date(afleveringsdato);
    if (afhentning > aflevering) {
        return false;
    } else {
        return true;
    }
};

function beregnAntalLejedage(afhentningsdato, afleveringsdato) {
    const AFHENTNING = new Date(afhentningsdato);
    const AFLEVERING = new Date(afleveringsdato);
    const FORSKELITID = AFLEVERING.getTime() - AFHENTNING.getTime();
    const FORSKELIDAGE = FORSKELITID / (1000 * 3600 * 24) + 1;
    return FORSKELIDAGE;
}

function beregnLejeudgift(antaldage, biltillaeg) {
    const MOMS = 0.25;
    const GRUNDBELOEB = 495;
    const PRISPRDAG = 100;
    const LEJEUDGIFT = (GRUNDBELOEB + (antaldage * PRISPRDAG) + (antaldage * biltillaeg)) * (1 + MOMS);
    return LEJEUDGIFT.toFixed(2);
}

/////////////////////////////EXTRA//////////////////////
function beregnLejeudgiftEUR(antaldage, biltillaeg) {
    const MOMS = 0.25;
    const GRUNDBELOEB = 495;
    const PRISPRDAG = 100;
    const LEJEUDGIFT = (GRUNDBELOEB + (antaldage * PRISPRDAG) + (antaldage * biltillaeg)) * (1 + MOMS);
    const iEUR = LEJEUDGIFT/7.45;
    return iEUR.toFixed(2);
}

function saetDagsDato()
{  //funktionen sætter dags dato
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    if(dd<10) {dd='0'+dd;} 
    if(mm<10) {mm='0'+mm;} 
    today = yyyy+'-'+mm+'-'+dd;
    return today;
}
// dags dato OG MINIMUM VALUE sættes i begge på load via funktionen myLoad() 
window.addEventListener("load", myLoad);

function myLoad(){
    document.getElementById('afhentning').value = saetDagsDato();
    document.getElementById('afhentning').setAttribute("min", document.getElementById('afhentning').value);
    document.getElementById('aflevering').value = document.getElementById('afhentning').value;
    document.getElementById('aflevering').setAttribute("min", document.getElementById('aflevering').value);
}
// dags dato sættes i begge på reset
document.getElementById('resetknap').addEventListener("click", function (event){
    event.preventDefault();
    alert("Alt nulstilles!!");
    myLoad(); // funktionen genbruges
    sektion.innerHTML = "";
});
//når datoen for afhentning ændres sættes afleveringsdato (min).
afhentningsdato.addEventListener("change", function (){
    document.getElementById('aflevering').setAttribute("min", document.getElementById('afhentning').value);
    document.getElementById('aflevering').value = document.getElementById('afhentning').value;
});
//når personer ændres tjekkes om det er imellem 1 og 7
personer.addEventListener("change", function () {
    if (personer.value <1 || personer.value > 7)
    {
        alert("Antal personer skal være imellem 1 og 7 - brug pil op og ned");
        document.getElementById('personer').focus();
        document.getElementById('personer').value = 1;
    }    
});

/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
/*PUT YOUR OWN KEY HERE - THIS MIGHT NOT WORK
SUBSCRIBE HERE: https://home.openweathermap.org/users/sign_up*/
const apiKey = "4d8fb5b93d4af21d66a2948710284366";

form.addEventListener("submit", e => {
  e.preventDefault();
  const listItems = list.querySelectorAll(".ajax-section .city");
  const inputVal = input.value;

  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});