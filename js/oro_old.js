/**
 * Created by Nadia on 23/01/2016.
 */
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




function newOpOro(){
    $("#entryContainerTitle").html("Nuova Operazione: ORO");
    $("#contentForm").show();
    $("#contentLista").hide();
    $("#sceltaLista").hide();
    var currentDateTime = getCurrentDateTime();
    var cod = currentDateTime.substr(6, 4) + currentDateTime.substr(3, 2);
    $('#dataora').val(currentDateTime);
    setNumOpOro();
}

function calcolaTotaleOro(){
    var grammi= $('#grammi').val();
    var prezzo= $('#prezzo').val();
    var totale=grammi*prezzo;
    $('#franchi').val(totale);


}

function setNumOpOro(){
    var lastOperazione = "";
    $.ajax({
        type: "GET",
        url: "phpFunctions/getLastOperazioneOro.php",
        success: function(data) {
            lastOperazione= data;
            $('#operazione').val(lastOperazione);
        },
        error: function(xhr, desc, err) {
            //alert(xhr);
            alert("Details: " + desc + "\nError:" + err);
        }

    });

}

function loadOpOro(){
        $("#entryContainerTitleLista").html("Lista Operazioni: Oro");
        $("#entryContainer").html("");
        $("#contentForm").hide();
        $("#contentLista").show();
        $("#sceltaLista").show();
        var oroDiv = "";

}

$(document).ready(function() {
    $(document).on('keyup','#grammi', function(){
        calcolaTotaleOro();
    });
    $(document).on('keyup','#prezzo', function(){
        calcolaTotaleOro();
    });



    $(document).on("submit", "#formOperazione", function(){
      alert('submit');
    });






    $(document).on("click", "#nuova_op", function(e){
        e.preventDefault();
        //TODO: farlo dal padre e unire le due funzioni
        $("#nuova_op").removeClass("active");
        $("#lista_op").removeClass("active");
        $(this).addClass("active");
        newOpOro();
    });

    $(document).on("click", "#lsita_op", function(e){
        e.preventDefault();
        $("#nuova_op").removeClass("active");
        $("#lista_op").removeClass("active");
        $(this).addClass("active");
        loadOpOro();
    });


    $('#nuova_op').trigger('click');


});
