/**
 * Created by Nadia on 24/02/2016.
 */

Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

function popupCenter(url, title, w, h) {
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/3)-(h/3);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

function getCurrentDateTime(){
    var currentDateTime = "";

    $.ajax({
        type: "GET",
        url: "phpFunctions/getCurrentDateTime.php",
        async: false,
        success: function(data) {
            var risultato = $.parseJSON(data);
            currentDateTime = risultato.mydate + " " + risultato.mytime;
            //currentDateTime = data;

        },
        error: function(xhr, desc, err) {
            //alert(xhr);
            alert("Details: " + desc + "\nError:" + err);
        }
    });

    return currentDateTime;
}

function getLastOperazione(){
    var lastOperazione = "";

    $.ajax({
        type: "GET",
        async: false,
        url: "phpFunctions/getLastOperazione.php",
        success: function(data) {
            lastOperazione = data;
        },
        error: function(xhr, desc, err) {
            //alert(xhr);
            alert("Details: " + desc + "\nError:" + err);
        }
    });

    return lastOperazione;
}


function getValute(){
    var selectValute = "";

    $.ajax({
        type: "GET",
        async: false,
        url: "phpFunctions/lista_valute.php",
        success: function(data) {
            var valute = $.parseJSON(data);
            if (valute.length) {
                selectValute += "<option selected disabled value=''>Scegli Valuta</option>";
                for (var i = 0; i < valute.length; i++) {
                    selectValute += "<option value='"+ valute[i].id +"'>"+ valute[i].nome_valuta +"</option>";
                }
            }
            else{
                selectValute += "<option selected disabled value=''>Scegli Valuta</option>";
            }
        },
        error: function(xhr, desc, err) {
            //alert(xhr);
            alert("Details: " + desc + "\nError:" + err);
        }
    });

    return selectValute;
}


function stringToDate(_date,_format,_delimiter)
{
    var formatLowerCase=_format.toLowerCase();
    var formatItems=formatLowerCase.split(_delimiter);
    var dateItems=_date.split(_delimiter);
    var monthIndex=formatItems.indexOf("mm");
    var dayIndex=formatItems.indexOf("dd");
    var yearIndex=formatItems.indexOf("yyyy");
    var month=parseInt(dateItems[monthIndex]);
    month-=1;
    var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
    return formatedDate;
}

function dateToString(dateObject){
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + year;

    return date;
}

function meseToString(mese)
{
    switch (mese){
        case '1': return "GENNAIO";
        case '2': return "FEBBRAIO";
        case '3': return "MARZO";
        case '4': return "APRILE";
        case '5': return "MAGGIO";
        case '6': return "GIUGNO";
        case '7': return "LUGLIO";
        case '8': return "AGOSTO";
        case '9': return "SETTEMBRE";
        case '10': return "OTTOBRE";
        case '11': return "NOVEMBRE";
        case '12': return "DICEMBRE";
    }
    return mese;
}