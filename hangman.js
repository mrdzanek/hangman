var passwd = "Nie święci garnki lepią";
passwd = passwd.toUpperCase();

var length = passwd.length;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

var passwd1 = "";

var fails = 0;

for (i = 0; i < length; i++) {
    if (passwd.charAt(i) == " ") passwd1 = passwd1 + " ";
    else passwd1 = passwd1 + "-";
}

function writePassword() {
    document.getElementById("board").innerHTML = passwd1;
}

window.onload = start;

var letters = new Array(35);

letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ż";
letters[34] = "Ź";

function start() {
    var divContent = "";

    for (i = 0; i < 35; i++) {
        var element = "let" + i;

        divContent = divContent + '<div class="letter" onclick="check(' + i + ')" id="' + element + '">' + letters[i] + '</div>'
        if ((i + 1) % 7 == 0) divContent = divContent + '<div style="clear:both;"></div>'
    }

    document.getElementById("alphabet").innerHTML = divContent;

    writePassword();
}

String.prototype.setChar = function(place, char) {
    if (place > this.length - 1) return this.toString();
    else return this.substr(0, place) + char + this.substr(place + 1);
}

function check(nr) {
    var hit = false;

    for (i = 0; i < length; i++) {
        if (passwd.charAt(i) == letters[nr]) {
            passwd1 = passwd1.setChar(i, letters[nr]);
            hit = true;
        }
    }

    if (hit == true) {
        var element = "let" + nr;
        yes.play();

        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00c000";
        document.getElementById(element).style.border = "3px solid #00c000";
        document.getElementById(element).style.cursor = "default";
        writePassword();
    } else {
        var element = "let" + nr;
        no.play();

        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");

        fails++;
        var picture = "img/s" + fails + ".jpg";
        document.getElementById("gallows").innerHTML = '<img src="' + picture + '">';

    }

    //win
    if (passwd == passwd1)
        document.getElementById("alphabet").innerHTML = "Tak jest, podano prawidłowe hasło: " + passwd +
        '<br><br><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';

    //lose
    if(fails >= 9) {
        document.getElementById("alphabet").innerHTML = "Przegrana! Prawidłowe hasło: " + passwd +
        '<br><br><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
    }
}
