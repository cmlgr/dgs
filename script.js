var form = document.forms["calculator"];
var results = document.querySelector("#results");
var net = document.getElementById("net");
var puan = document.getElementById("puan");
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
function validate(dnot, td, ty, md, my) {
    if (dnot === void 0) { dnot = form.dnot.value; }
    if (td === void 0) { td = form.td.value; }
    if (ty === void 0) { ty = form.ty.value; }
    if (md === void 0) { md = form.md.value; }
    if (my === void 0) { my = form.my.value; }
    if ((dnot >= 50 && dnot <= 100)) {
        if ((td >= 1) && (md >= 1) && (((td - (ty / 4)) >= 1) && (md - (my / 4)) >= 1)) {
            if (((Number(td) + Number(ty)) <= 50) && ((Number(md) + Number(my)) <= 50)) {
                navigator.vibrate(10);
                return calculate(dnot, td, ty, md, my);
            }
            else {
                alert("Doğru ve yanlış toplamı, toplam soru sayısından fazla olamaz");
                return false;
            }
        }
        else {
            alert("Puan hesaplanabilmesi için her iki alandan da en az 1 net olmalı");
            return false;
        }
    }
    else {
        alert("Diploma notu 50'den düşük, 100'den yüksek olamaz");
        form.dnot.select();
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
    results.style = "display: block;";
    (_a = net === null || net === void 0 ? void 0 : net.querySelector("#tnet")) === null || _a === void 0 ? void 0 : _a.textContent = tnet;
    (_b = net === null || net === void 0 ? void 0 : net.querySelector("#mnet")) === null || _b === void 0 ? void 0 : _b.textContent = mnet;
    (_c = puan === null || puan === void 0 ? void 0 : puan.querySelector("#res-say")) === null || _c === void 0 ? void 0 : _c.textContent = saysonuc.toFixed(4);
    (_d = puan.querySelector("#res-soz")) === null || _d === void 0 ? void 0 : _d.textContent = sozsonuc.toFixed(4);
    (_e = puan.querySelector("#res-ea")) === null || _e === void 0 ? void 0 : _e.textContent = easonuc.toFixed(4);
    results === null || results === void 0 ? void 0 : results.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}
function calcObp(dnot) {
    if (dnot >= 50 && dnot <= 100)
        form.obp.value = Math.round(dnot * .8);
    else {
        form.dnot.focus();
        form.dnot.select();
        alert("Diploma notu 50'den düşük, 100'den yüksek olamaz");
    }
}
function resres(f) {
    var _a, _b, _c, _d, _e;
    if (f === void 0) { f = this.form; }
    f.reset();
    results.style = "display: none";
    (_a = net === null || net === void 0 ? void 0 : net.querySelector("#tnet")) === null || _a === void 0 ? void 0 : _a.textContent = null;
    (_b = net === null || net === void 0 ? void 0 : net.querySelector("#mnet")) === null || _b === void 0 ? void 0 : _b.textContent = null;
    (_c = puan === null || puan === void 0 ? void 0 : puan.querySelector("#res-say")) === null || _c === void 0 ? void 0 : _c.textContent = null;
    (_d = puan.querySelector("#res-soz")) === null || _d === void 0 ? void 0 : _d.textContent = null;
    (_e = puan.querySelector("#res-ea")) === null || _e === void 0 ? void 0 : _e.textContent = null;
    form.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}
