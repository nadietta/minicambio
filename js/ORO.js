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
    $(".formOperazione").show();
    var currentDateTime = getCurrentDateTime();
    var cod = currentDateTime.substr(6, 4) + currentDateTime.substr(3, 2);
    $('#dataora').val(currentDateTime);
}

function calcolaTotaleOro(){
    var grammi= $('#grammi').val();
    var prezzo= $('#prezzo').val();
    var totale=grammi*prezzo;
    $('#franchi').val(totale);


}

$(document).on('keyup','#grammi', function(){
    calcolaTotaleOro();
});
$(document).on('keyup','#prezzo', function(){
    calcolaTotaleOro();
});







function loadOro(){
    $("#entryContainerTitle").html("Lista Operazioni: ORO");
    $("#entryContainer").html("");
    var valuteDiv = "";

    $.ajax({
        type: "GET",
        url: "phpFunctions/getLastOperazioneOro.php",
        success: function(data) {

        },
        error: function(xhr, desc, err) {
            //alert(xhr);
            alert("Details: " + desc + "\nError:" + err);
        }

    });
}



$(document).ready(function() {



    $(document).on("click", "#nuova_op", function(e){
        e.preventDefault();
        //TODO: farlo dal padre e unire le due funzioni
        $("#nuova_op").removeClass("active");
        $("#lista_op").removeClass("active");

        $(this).addClass("active");

        newOpOro();
    });

    $(document).on("click", "#lista_op", function(e){
        e.preventDefault();
        //TODO: farlo dal padre
        $("#nuova_op").removeClass("active");
        $("#lista_op").removeClass("active");

        $(this).addClass("active");

        loadTassi();
    });

    $(document).on("click", "#btnValDelete", function(){
        var idVal = $('#modalDiv').html();

        $.ajax({
            type: "POST",
            url: "phpFunctions/deleteVal.php",
            data: {idVal: idVal},
            success: function(data)
            {
                if (data == '1'){
                    //Cancello la riga relativa
                    var killrowString = "trIdVal_" + idVal;
                    var killrow = $("#"+killrowString+"");
                    killrow.addClass("danger");
                    killrow.fadeOut(2000, function(){
                        $(this).remove();
                    });
                }
               else{
                    alert("Impossibile cancellare Valuta!\nLa Valuta risulta utilizzata in almeno un Tasso.");
                }
            },
            error: function(xhr, desc, err) {
                alert("Errore. Impossibile eliminare la Valuta Selezionata");
            }
        });

    });


    $(document).on("show.bs.modal", ".valDelete-ConfirmDiv", function(e){
        var valId = $(e.relatedTarget).data('val-id');
        $(e.currentTarget).find('#modalDiv').html(valId);
    });



    $('#nuova_op').trigger('click');

});
