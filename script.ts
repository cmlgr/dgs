const form = document.forms["calculator"];
const results = document.querySelector("#results");
const net = document.getElementById("net");
const puan = document.getElementById("puan");

function rand(min: Number, max: Number): Number {
    let r = Math.random() * 100;
    while (r < Number(min) || r > Number(max)) {
        r = Math.random() * 100;
    }
    return Math.trunc(r);
}

form.dnot.placeholder = rand(70, 90);
form.td.placeholder = rand(25, 42);
form.ty.placeholder = rand(0, 8);
form.md.placeholder = rand(25, 42);
form.my.placeholder = rand(0, 8);

function validate(dnot: number = form.dnot.value, td: number = form.td.value, ty: number = form.ty.value, md: number = form.md.value, my: number = form.my.value): any {
    dnot = Number(dnot.toString().replace(",", "."));

    if ((dnot >= 50 && dnot <= 100)) {
        if ((td >= 1) && (md >= 1) && (((td - (ty / 4)) >= 1) && (md - (my / 4)) >= 1)) {
            if (((Number(td) + Number(ty)) <= 50) && ((Number(md) + Number(my)) <= 50)) {
                navigator.vibrate(10);
                return calculate(dnot, td, ty, md, my);
            } else {
                // alert("Doğru ve yanlış toplamı, toplam soru sayısından fazla olamaz");
                openModal("Doğru ve yanlış sayıları ya da toplamı, toplam soru sayısından fazla olamaz.")
                return false;
            }
        } else {
            // alert("Puan hesaplanabilmesi için her iki alandan da en az 1 net olmalı");
            openModal("Puan hesaplanabilmesi için her iki alandan da en az 1 net yapılmalı.");
            return false;
        }
    } else {
        // alert("Diploma notu 50'den düşük, 100'den yüksek olamaz");
        openModal("Diploma notu 50'den yüksek, 100'den düşük olmalı.");
        form.dnot.select();
        return false;
    }
}

function calculate(dnot: number, td: number, ty: number, md: number, my: number): void {
    let obp = (dnot * .8);
    let tnet = (td - (ty / 4));
    let mnet = (md - (my / 4));
    let saysonuc = ((obp * .6) + ((tnet * 0.63912307692) + (mnet * 3.3212704)) + 145.825787139);
    let sozsonuc = ((obp * .6) + ((tnet * 3.19561538461) + (mnet * 0.6642544)) + 130.174899293);
    let easonuc = ((obp * .6) + ((tnet * 1.91736923076) + (mnet * 1.9927632)) + 138.000319416);

    results.style = "display: block;";

    net?.querySelector("#tnet")?.textContent = tnet;
    net?.querySelector("#mnet")?.textContent = mnet;

    puan?.querySelector("#res-say")?.textContent = saysonuc.toFixed(4);
    puan.querySelector("#res-soz")?.textContent = sozsonuc.toFixed(4);
    puan.querySelector("#res-ea")?.textContent = easonuc.toFixed(4);

    results?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

function calcObp(dnot: number): void {
    dnot = Number(dnot.toString().replace(",", "."));
    (dnot >= 50 && dnot <= 100) ? form.obp.value = (dnot * .8).toFixed(2) : form.obp.value = null;
}

function resres(f: HTMLFormElement = this.form): void {
    f.reset();
    
    results.style = "display: none";
    
    net?.querySelector("#tnet")?.textContent = null;
    net?.querySelector("#mnet")?.textContent = null;
    
    puan?.querySelector("#res-say")?.textContent = null;
    puan.querySelector("#res-soz")?.textContent = null;
    puan.querySelector("#res-ea")?.textContent = null;

    form.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

function openModal(message: string, title: string = ""): void {
    console.log("A modal has been opened");

    let modal = document.createElement("div");
    modal.classList.add("modal");
    document.body.append(modal);

    if (title !== "") {
        let modalTitle = document.createElement("h1");
        modalTitle.innerText = title;
        modalTitle.classList.add("modal-title");
        modal.append(modalTitle);
    }

    let modalMessage = document.createElement("p");
    modalMessage.innerText = message;
    modalMessage.classList.add("modal-message");
    modal.append(modalMessage);

    let modalButton = document.createElement("button");
    modalButton.innerText = "Tamam";
    modalButton.classList.add("modal-button");
    modal.append(modalButton);

    modalButton.addEventListener("click", () => {
        modal.remove();
        console.log("A modal has been sought to removed");
    });

    setTimeout(() => {
        modal.remove();
    }, 4000);
}