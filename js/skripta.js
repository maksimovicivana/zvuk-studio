let trenutnaSlika = 0;

const slikeSlajdera = [
    "slike/gitara.jpg",
    "slike/klavijatura.jpg",
    "slike/bubnjevi.jpg",
    "slike/mikrofon.jpg",
    "slike/zvucnik.jpg"
];

function promeniSliku(smer) {
    trenutnaSlika = trenutnaSlika + smer;

    if (trenutnaSlika < 0) {
        trenutnaSlika = slikeSlajdera.length - 1;
    }

    if (trenutnaSlika >= slikeSlajdera.length) {
        trenutnaSlika = 0;
    }

    document.getElementById("slikaSlajdera").src = slikeSlajdera[trenutnaSlika];
}

const kontaktForma = document.getElementById("kontaktForma");

if (kontaktForma) {
    kontaktForma.addEventListener("submit", function (dogadjaj) {
        dogadjaj.preventDefault();

        let ispravnaForma = true;

        const ime = document.getElementById("ime").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefon = document.getElementById("telefon").value.trim();
        const tipUpita = document.getElementById("tipUpita").value;
        const poruka = document.getElementById("poruka").value.trim();

        document.getElementById("imeGreska").textContent = "";
        document.getElementById("emailGreska").textContent = "";
        document.getElementById("telefonGreska").textContent = "";
        document.getElementById("tipUpitaGreska").textContent = "";
        document.getElementById("porukaGreska").textContent = "";
        document.getElementById("uspesnaPoruka").textContent = "";

        if (ime.length < 3) {
            document.getElementById("imeGreska").textContent = "Ime i prezime mora imati najmanje 3 karaktera.";
            ispravnaForma = false;
        }

        const emailObrazac = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailObrazac.test(email)) {
            document.getElementById("emailGreska").textContent = "Unesite ispravnu email adresu.";
            ispravnaForma = false;
        }

        const telefonObrazac = /^[0-9+\s/-]{6,20}$/;

        if (!telefonObrazac.test(telefon)) {
            document.getElementById("telefonGreska").textContent = "Unesite ispravan broj telefona.";
            ispravnaForma = false;
        }

        if (tipUpita === "") {
            document.getElementById("tipUpitaGreska").textContent = "Izaberite tip upita.";
            ispravnaForma = false;
        }

        if (poruka.length < 10) {
            document.getElementById("porukaGreska").textContent = "Poruka mora imati najmanje 10 karaktera.";
            ispravnaForma = false;
        }

        if (ispravnaForma) {
            document.getElementById("uspesnaPoruka").textContent =
                "Poruka je uspešno proverena. Hvala na interesovanju.";

            kontaktForma.reset();
        }
    });
}

const podaciPopup = {
    akusticne: {
        naslov: "Akustične gitare",
        stavke: [
            {
                slika: "slike/akusticna1.jpg",
                naziv: "Yamaha F310"
            },
            {
                slika: "slike/akusticna2.jpg",
                naziv: "Fender CD-60"
            },
            {
                slika: "slike/akusticna3.jpg",
                naziv: "Ibanez V50NJP"
            }
        ]
    },
    elektricne: {
        naslov: "Električne gitare",
        stavke: [
            {
                slika: "slike/elektricna1.jpg",
                naziv: "Fender Stratocaster"
            },
            {
                slika: "slike/elektricna2.jpg",
                naziv: "Ibanez GRX40"
            },
            {
                slika: "slike/elektricna3.jpg",
                naziv: "Yamaha Pacifica 112V"
            }
        ]
    },
    klavijature: {
        naslov: "Klavijature",
        stavke: [
            {
                slika: "slike/klavijatura1.jpg",
                naziv: "Yamaha PSR-E373"
            },
            {
                slika: "slike/klavijatura2.jpg",
                naziv: "Casio CT-S300"
            },
            {
                slika: "slike/klavijatura3.jpg",
                naziv: "Roland GO:KEYS"
            }
        ]
    }
};

function otvoriPopup(kategorija) {
    const popup = document.getElementById("popupProzor");
    const popupNaslov = document.getElementById("popupNaslov");
    const popupStavke = document.getElementById("popupStavke");

    const podaci = podaciPopup[kategorija];

    popupNaslov.textContent = podaci.naslov;
    popupStavke.innerHTML = "";

    podaci.stavke.forEach(function (stavka) {
        popupStavke.innerHTML += `
            <div class="popup-kartica">
                <img src="${stavka.slika}" alt="${stavka.naziv}">
                <h3>${stavka.naziv}</h3>
            </div>
        `;
    });

    popup.style.display = "block";
}

function zatvoriPopup() {
    document.getElementById("popupProzor").style.display = "none";
}

window.addEventListener("click", function (dogadjaj) {
    const popup = document.getElementById("popupProzor");

    if (dogadjaj.target === popup) {
        popup.style.display = "none";
    }
});

if (typeof $ !== "undefined") {
    $("#dugmeSaveti").on("click", function () {
        $("#savetiKupovina").slideToggle();
    });
}

let trenutnaVelicinaFonta = 100;

function postaviTemu(tema) {
    document.body.classList.remove("svetla-tema", "tamna-tema");

    if (tema === "tamna") {
        document.body.classList.add("tamna-tema");
    } else {
        document.body.classList.add("svetla-tema");
    }

    localStorage.setItem("izabranaTema", tema);
}

function promeniFont(smer) {
    trenutnaVelicinaFonta = trenutnaVelicinaFonta + smer * 5;

    if (trenutnaVelicinaFonta < 85) {
        trenutnaVelicinaFonta = 85;
    }

    if (trenutnaVelicinaFonta > 125) {
        trenutnaVelicinaFonta = 125;
    }

    document.body.style.fontSize = trenutnaVelicinaFonta + "%";
    localStorage.setItem("velicinaFonta", trenutnaVelicinaFonta);
}

window.addEventListener("load", function () {
    const sacuvanaTema = localStorage.getItem("izabranaTema");
    const sacuvanaVelicinaFonta = localStorage.getItem("velicinaFonta");

    if (sacuvanaTema) {
        postaviTemu(sacuvanaTema);
    } else {
        postaviTemu("svetla");
    }

    if (sacuvanaVelicinaFonta) {
        trenutnaVelicinaFonta = parseInt(sacuvanaVelicinaFonta);
        document.body.style.fontSize = trenutnaVelicinaFonta + "%";
    }
});