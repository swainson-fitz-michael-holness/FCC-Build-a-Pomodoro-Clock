var cntDwn = document.getElementById("time");
var sess = document.getElementById("session");
var brkt = document.getElementById("break");
var ctrl = document.getElementById("ctrl");
var initVal = 30;
var brkVal = 19;
var runSwitch = false;
var brkSwitch = false;
var clock;
var brkOn = false;

function countDown(totalSec) {
    var tHour = Math.floor(totalSec / (60 * 60));
    var tMin = Math.floor(totalSec / 60) % 60;
    var tSec = totalSec % 60;
    return tHour + "<span>h</span> : " + tMin + "<span>m</span> : " + tSec + "<span>s</span>";
}

function timeVal(initVal) {
    return "progress " + initVal + "s infinite normal"
}

//function timer(num) {
//    runSwitch = true;
//
//}
function processCntDwnBrk() {
    cntDwn.innerHTML = countDown(brkVal);

    //    timer(val);
    runSwitch = true;
    clock = setInterval(function () {
        if (brkVal !== 0) {
            brkVal -= 1;
            cntDwn.innerHTML = countDown(brkVal);
        } else if (brkVal === 0) {
            clearInterval(clock);
            runSwitch = true;
            brkSwitch = false;
            initVal = sess.value;
            $("#progVal").animate({
                strokeDashoffset: 0
            }, sess.value * 1000, "linear");
            //            alert(initVal);
            processCntDwn();
        }
    }, 1000);
}

function processCntDwn() {
    cntDwn.innerHTML = countDown(initVal);

    //    timer(val);
    runSwitch = true;
    clock = setInterval(function () {
        if (initVal !== 0) {
            initVal -= 1;
            cntDwn.innerHTML = countDown(initVal);
        } else if (initVal === 0) {
            //            $("#progVal").css("strokeDashoffset", "818.3032");
            clearInterval(clock);
            runSwitch = false;
            brkSwitch = true;
            brkVal = brkt.value;
            $("#progVal").animate({
                strokeDashoffset: 818.3032
            }, brkt.value * 1000, "linear");
            processCntDwnBrk();
        }
    }, 1000);
}

//processCntDwn(initVal);

sess.oninput = function (e) {
    e.preventDefault();
    cntDwn.innerHTML = this.value;
    initVal = this.value;
    $("#progVal").css("strokeDashoffset", "818.3032");
    //    alert($("#progVal").css("strokeDashoffset"));
    //    if (brkSwitch === true) {
    //        $("#progVal").css("strokeDashoffset", "818.3032");
    //    } else {
    //        $("#progVal").css("strokeDashoffset", "818.3032");
    //    }

}

brkt.oninput = function (e) {
    e.preventDefault();
    cntDwn.innerHTML = this.value;
    brkVal = this.value;
    $("#progVal").css("strokeDashoffset", "818.3032");

    if (brkSwitch === true) {
        brkOn = true;
        alert(brkOn);
    }
    //    if (brkSwitch === true) {
    //        $("#progVal").css("strokeDashoffset", "0");
    //    } else {
    //        $("#progVal").css("strokeDashoffset", "818.3032");
    //    }
}

ctrl.onclick = function (e) {
    e.preventDefault();
    timeVal(initVal);
    //OFF STATE
    if (runSwitch === true) {
        clearInterval(clock);
        runSwitch = false;
        $("#progVal").stop();
        $(".ctrlDim").css("display", "inline");
        $(".ctrlRim").css("display", "none");
        $(".slide").css("opacity", "1");
        sess.disabled = false;
        brkt.disabled = false
    } else if (runSwitch === false) {
        //ON STATE
        //    stroke-dasharray: 818.3032;
        //    stroke-dashoffset: 818.3032;
        sess.disabled = true;
        brkt.disabled = true;
        $(".slide").css("opacity", "0.3");
        $("#pauseCtrl").css("display", "none");
        $(".ctrlRim").css("display", "inline");
        if (brkSwitch === false) {
            $("#progVal").animate({
                strokeDashoffset: 0
            }, initVal * 1000, "linear");
            processCntDwn();
        } else if (brkSwitch === true) {
            if (brkOn === true) {
                $("#progVal").css("strokeDashoffset", "0");
                brkOn = false;
            }
            $("#progVal").animate({
                strokeDashoffset: 818.3032
            }, brkVal * 1000, "linear");
            sess.disabled = true;
            brkt.disabled = true;
            //                        alert("PATH");
            processCntDwnBrk();
        }

    }

};
