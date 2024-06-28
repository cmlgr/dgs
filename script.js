var form = document.forms["calculator"], results = document.querySelector("#results"), net = document.getElementById("net"), puan = document.getElementById("puan");
var isModalOpen;
function rand(min, max) {
    var r = Math.random() * 100;
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
document.body.addEventListener("onload", function () {
    if (localStorage.getItem("dnot") != null) {
        // form.dnot.value = localStorage.getItem("dnot");
        console.log(localStorage.getItem("dnot"));
    }
});
function validate(dnot, td, ty, md, my) {
    if (dnot === void 0) { dnot = form.dnot.value; }
    if (td === void 0) { td = form.td.value; }
    if (ty === void 0) { ty = form.ty.value; }
    if (md === void 0) { md = form.md.value; }
    if (my === void 0) { my = form.my.value; }
    dnot = Number(dnot.toString().replace(",", "."));
    if ((dnot >= 50 && dnot <= 100)) {
        if ((td >= 1) && (md >= 1) && (((td - (ty / 4)) >= 1) && (md - (my / 4)) >= 1)) {
            if (((Number(td) + Number(ty)) <= 50) && ((Number(md) + Number(my)) <= 50)) {
                navigator.vibrate(10);
                var r = "/^1?([1-9]{2})([.,][d]{1,2})?$/g";
                return calculate(dnot, td, ty, md, my);
            }
            else {
                // alert("Doğru ve yanlış toplamı, toplam soru sayısından fazla olamaz");
                modal("Doğru ve yanlış sayıları ya da toplamı, toplam soru sayısından fazla olamaz.");
                return false;
            }
        }
        else {
            // alert("Puan hesaplanabilmesi için her iki alandan da en az 1 net olmalı");
            modal("Puan hesaplanabilmesi için her iki alandan da en az 1 net yapılmalı.");
            return false;
        }
    }
    else {
        // alert("Diploma notu 50'den düşük, 100'den yüksek olamaz");
        modal("Diploma notu 50'den yüksek, 100'den düşük olmalı.");
        return false;
    }
}
function calculate(dnot, td, ty, md, my) {
    var _a, _b, _c, _d, _e;
    var obp = (dnot * .8);
    var tnet = (td - (ty / 4));
    var mnet = (md - (my / 4));
    var saysonuc = ((obp * .6) + ((tnet * 0.63912307692) + (mnet * 3.3212704)) + 145.825787139);
    var sozsonuc = ((obp * .6) + ((tnet * 3.19561538461) + (mnet * 0.6642544)) + 130.174899293);
    var easonuc = ((obp * .6) + ((tnet * 1.91736923076) + (mnet * 1.9927632)) + 138.000319416);
    localStorage.setItem("dnot", dnot.toString());
    results.style = "display: block;";
    (_a = net === null || net === void 0 ? void 0 : net.querySelector("#tnet")) === null || _a === void 0 ? void 0 : _a.textContent = tnet;
    (_b = net === null || net === void 0 ? void 0 : net.querySelector("#mnet")) === null || _b === void 0 ? void 0 : _b.textContent = mnet;
    (_c = puan === null || puan === void 0 ? void 0 : puan.querySelector("#res-say")) === null || _c === void 0 ? void 0 : _c.textContent = saysonuc.toFixed(4);
    (_d = puan.querySelector("#res-soz")) === null || _d === void 0 ? void 0 : _d.textContent = sozsonuc.toFixed(4);
    (_e = puan.querySelector("#res-ea")) === null || _e === void 0 ? void 0 : _e.textContent = easonuc.toFixed(4);
    results === null || results === void 0 ? void 0 : results.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}
function calcObp(dnot) {
    dnot = Number(dnot.toString().replace(",", "."));
    (dnot >= 50 && dnot <= 100) ? form.obp.value = (dnot * .8).toFixed(2) : form.obp.value = null;
}
function resres(f) {
    var _a, _b, _c, _d, _e;
    if (f === void 0) { f = this.form; }
    f.reset();
    form.dnot.focus();
    results.style = "display: none";
    (_a = net === null || net === void 0 ? void 0 : net.querySelector("#tnet")) === null || _a === void 0 ? void 0 : _a.textContent = null;
    (_b = net === null || net === void 0 ? void 0 : net.querySelector("#mnet")) === null || _b === void 0 ? void 0 : _b.textContent = null;
    (_c = puan === null || puan === void 0 ? void 0 : puan.querySelector("#res-say")) === null || _c === void 0 ? void 0 : _c.textContent = null;
    (_d = puan.querySelector("#res-soz")) === null || _d === void 0 ? void 0 : _d.textContent = null;
    (_e = puan.querySelector("#res-ea")) === null || _e === void 0 ? void 0 : _e.textContent = null;
    form.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}
function modal(message, title) {
    if (title === void 0) { title = ""; }
    if (isModalOpen == 1) {
        // console.log("Another modal is open");
        return false;
    }
    else {
        // console.log("A modal has been opened");
        isModalOpen = 1;
        var modal_1 = document.createElement("div");
        modal_1.classList.add("modal");
        modal_1.classList.add("slideIn");
        document.body.append(modal_1);
        if (title !== "") {
            var modalTitle = document.createElement("h1");
            modalTitle.innerText = title;
            modalTitle.classList.add("modal-title");
            modal_1.append(modalTitle);
        }
        var modalMessage = document.createElement("p");
        modalMessage.innerText = message;
        modalMessage.classList.add("modal-message");
        modal_1.append(modalMessage);
        var modalButton = document.createElement("button");
        modalButton.innerText = "Tamam";
        modalButton.classList.add("modal-button");
        modal_1.append(modalButton);
        modalButton.addEventListener("click", function () {
            modal_1.classList.remove("slideIn");
            modal_1.classList.add("slideOut");
            setTimeout(function () {
                modal_1.remove();
                isModalOpen = 0;
            }, 100);
            // console.log("A modal has been closed");
        });
        setTimeout(function () {
            modal_1.classList.remove("slideIn");
            modal_1.classList.add("slideOut");
            setTimeout(function () {
                modal_1.remove();
                isModalOpen = 0;
            }, 100);
        }, 2000);
        return true;
    }
}
