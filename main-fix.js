// {{ *stpState( {SetSess() setBrk() } ) }{ plyState( { **pause( { adjSess()  adjBrk() } )} ) }}


var stpState = false;
var plyState = false;
var addToken = false;
var sessTimeOut;
var pauseState = false;
var plyTick;
var brkTick;
//
// Attribute Section
//
function sessColor() {
    $("#time").css({
        color: "#45C1BF"
    });
    $("#narrator").css({
        color: "#45C1BF"
    });
}

function brkColor() {
    $("#time").css({
        color: "#D34444"
    });
    $("#narrator").css({
        color: "#D34444"
    });

}

function countDown(totalSec) {
    var tHour = Math.floor(totalSec / (60 * 60));
    var tMin = Math.floor(totalSec / 60) % 60;
    var tSec = totalSec % 60;
    return tHour + "<span>h</span> : " + tMin + "<span>m</span> : " + tSec + "<span>s</span>";
}

function processCntDwn(tick) {
    sessTimeOut = setTimeout(function () {
        if (tick !== 0) {
            tick -= 1;
            $("#time").html(countDown(tick));
            processCntDwn(tick);
            if (addToken === true) {
                plyTick = tick;
            } else if (addToken === false) {
                brkTick = tick;
            }
        } else if (tick === 0) {
            playBtn();
        }
    }, 1000);
}

//======================


//
// Button Section
//
function sessKnob() {
    $("#session").on("input", function () {
        $("#time").html($("#session").val());
        sessColor();
        $("#narrator").html(
            "Session time"
        );
    });

}

function brkKnob() {
    $("#break").on("input", function () {
        $("#time").html($("#break").val());
        brkColor();
        $("#narrator").html(
            "Break time"
        );
    });
}

function playBtn() {

    $(".slide").css("opacity", "0.3");
    document.getElementById("session").disabled = true;
    document.getElementById("break").disabled = true;
    $("#plyCtrl").css("display", "none");
    $("#pauseCtrl").css("display", "inline");
    $("#stpMe").animate({
        opacity: "1"
    });

    if (stpState === true) {
        if (pauseState === false) {
            plyTick = $("#session").val();
            brkTick = $("#break").val();
        }

        if (addToken === false) {
            $("#progVal").animate({
                strokeDashoffset: 0
            }, plyTick * 1000, "linear");
            addToken = true;
            sessColor(); //LOOK HERE
            $("#time").html(countDown(plyTick));
            $("#progVal").attr("stroke", "#45C1BF");
            processCntDwn(plyTick);
            $("#narrator").html(
                "Work!"
            );
        } else if (addToken === true) {
            $("#progVal").animate({
                strokeDashoffset: 818.3032
            }, brkTick * 1000, "linear");
            addToken = false;
            brkColor();
            $("#time").html(countDown(brkTick));
            $("#progVal").attr("stroke", "#D34444");
            processCntDwn(brkTick);
            $("#narrator").html(
                "break!"
            );
            pauseState = false;
        }
    }
}

function stopState() {
    stpState = true;
    $("#stpMe").animate({
        opacity: "0.2"
    });
    sessColor();
    sessKnob();
    brkKnob();

    $("#plyCtrl").on("click", function () {
        playBtn();
    });

    $("#stpCtrl").on("click", function () {
        clearTimeout(sessTimeOut);
        stpState = false;
        plyState = false;
        addToken = false;

        $("#progVal").stop();

        pauseState = false;

        plyTick = $("#session").val();
        brkTick = $("#break").val();

        stpState = true;
        $("#stpMe").animate({
            opacity: "0.2"
        });
        sessColor();
        sessKnob();
        brkKnob();

        sessColor();
        $("#narrator").html(
            "Pomodoro"
        );
        $("#time").html(
            "HI!"
        );

        $("#progVal").css("strokeDashoffset", "818.3032");

        $("#plyCtrl").css("display", "inline");
        $("#pauseCtrl").css("display", "none");
        $(".slide").css("opacity", "1");

        document.getElementById("session").disabled = false;
        document.getElementById("break").disabled = false;
    });

    $("#pauseCtrl").on("click", function () {
        pauseState = true;
        clearTimeout(sessTimeOut);

        $("#progVal").stop();
        $("#plyCtrl").css("display", "inline");
        $("#pauseCtrl").css("display", "none");

        addToken = !addToken;
    });
};



//INIT
stopState();
