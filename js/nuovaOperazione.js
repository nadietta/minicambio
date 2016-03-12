/**
 * Created by Nadia on 30/01/2016.
 */

function stampaNuovaOperazione(formData, dataOp, html){

    $.ajax({
        type: "POST",
        url: "../PDF/file_da_modello.php",
        async: false,
        data: {formData: formData, dataOp: dataOp},
        success: function(data) {
            var risultato = $.parseJSON(data);
            if ($('#entryContainer').hasClass('loading')){
                $('#entryContainer').removeClass("loading");
            }
            popupCenter(risultato.pdfurl,'stampa', '500', '900');
            $('#scrollingContent').html(html);
            $.each(formData.split('&'), function (index, elem) {
                var vals = elem.split('=');
                $("[name='" + vals[0] + "']").val(decodeURIComponent(vals[1].replace(/\+/g, ' ')));
            });
        },
        error: function(xhr, desc, err) {
            alert("Details: " + desc + "\nError:" + err);
        }

    });
    return false;
}
function salvaNuovaOperazione(formData, html){

    $.ajax({
        type: "POST",
        url: "phpFunctions/addOperazione.php",
        async: false,
        data: {formData: formData},
        success: function(data) {
            var risultato = $.parseJSON(data);
            if ($('#entryContainer').hasClass('loading')){
                $('#entryContainer').removeClass("loading");
            }
            if (risultato.errore){
                $('#errore').fadeIn(2000);
                setTimeout(function(){
                    location.reload();
                }, 3000);
            }
            else{
                $('#successo').fadeIn(2000);
                setTimeout(function(){
                    $('#successo').fadeOut();
                }, 3000);
                $('#scrollingContent').html(html);
                getValoriNuovaOperazione();
            }
        },
        error: function(xhr, desc, err) {
            alert("Details: " + desc + "\nError:" + err);
        }
    });

}
function getValoriNuovaOperazione(){
    var valuta_da = $('#valutaEntrata').val();
    var valuta_daDesc = $('#valutaEntrata option:selected').html();
    var valuta_a = $('#valutaUscita').val();
    var valuta_aDesc = $('#valutaUscita option:selected').html();
    var currentDateTime = getCurrentDateTime();
    var cod = currentDateTime.substr(6, 4) + currentDateTime.substr(3, 2);

    $('#op1dataora').val(currentDateTime);

    $.ajax({
        type: "POST",
        url: "phpFunctions/nuova_op_dati.php",
        data: {valuta_da: valuta_da, valuta_a: valuta_a, cod: cod},
        success: function(data) {
            var myresponse = $.parseJSON(data);

            $("#opTipoOp").val(myresponse.tipo_op);

            $("#op1operazione").val(myresponse.cod_op);
            $("#op1tasso").val(myresponse.tasso);
            if(myresponse.tipo_op=='-1'){
                $('#formOperazione1 :input').attr('disabled', false);
                $('#formOperazione2 :input').attr('disabled', false);
                $('#divOperazione1').removeClass('customHidden');
                $('#divOperazione2').removeClass('customHidden');
                $('#newOpBottoni').removeClass('customHidden');

                $("#op1entrata").val("");
                $("#op1uscita").val("");

                $('#titleOperazione1').html("da "+valuta_daDesc+" a Franco");
                $('#titleOperazione2').html("da Franco a "+valuta_aDesc);
                $('#op2dataora').val(currentDateTime);
                $("#op1tipoOp").val(1);
                $("#op2tipoOp").val(0);
                $("#op2operazione").val(myresponse.cod_op_2);
                $("#op2tasso").val(myresponse.tasso_due);
                $("#op2entrata").val("");
                $("#op2uscita").val("");
            }
            else{
                $('#formOperazione1 :input').attr('disabled', false);
                $('#formOperazione2 :input').attr('disabled', true);
                $('#divOperazione1').removeClass('customHidden');
                $('#divOperazione2').addClass('customHidden');
                $('#newOpBottoni').removeClass('customHidden');

                $('#titleOperazione1').html("da "+valuta_daDesc+" a "+valuta_aDesc);
                $("#op1entrata").val("");
                $("#op1uscita").val("");
                $('#titleOperazione2').html("da valuta a valuta");
                $('#op2dataora').val("");
                $("#op2operazione").val("");
                $("#op2tasso").val("");
                $("#op2entrata").val("");
                $("#op2uscita").val("");
                $("#op1tipoOp").val(myresponse.tipo_op);
            }
        },
        error: function(xhr, desc, err) {
            alert("Details: " + desc + "\nError:" + err);
        }

    });
}


function calcolaUscitaCombinata(){

    var tasso = $('#op1tasso').val();
    var tasso_2 = $('#op2tasso').val();
    var entrata = $('#op1entrata').val();
    entrata=entrata.replace(',', '.' );
    var uscita=entrata*tasso;
    var uscitaFormat = uscita.toFixed(2);
    $('#op2entrata').val(uscitaFormat);
    $('#op1uscita').val(uscitaFormat);

    var uscita_2 = uscita*tasso_2;
    var uscitaFormat_2 = uscita_2.toFixed(2);
    $('#op2uscita').val(uscitaFormat_2);
}

function calcolaUscita(){
    var tipo_operazione =$('#opTipoOp').val();
    var tasso =$('#op1tasso').val();
    var entrata =$('#op1entrata').val();
    entrata=entrata.replace(',', '.' );
    var uscita=0;

    switch (tipo_operazione){
        case '0'://acquisto DB tipo_op=0 operazione
            uscita=entrata*tasso;
            var uscitaFormat = uscita.toFixed(2);
            $('#op1uscita').val(uscitaFormat);
            break;
        case '1'://vendita DB tipo_op=1 operazione
            uscita=entrata*tasso;
            var uscitaFormat = uscita.toFixed(2);
            $('#op1uscita').val(uscitaFormat);
            break;
        case '-1':
            calcolaUscitaCombinata();
            uscita=0;
            break;
    }

}
function opLoad(){
    selectValute = getValute();
    $('#formOperazione1 :input').attr('disabled', true);
    $('#formOperazione2 :input').attr('disabled', true);
    $('#valutaEntrata').html(selectValute);
    $('#valutaUscita').html(selectValute);
}

$(document).ready(function() {

    opLoad();
    $(document).on("click",'body', function(){
        $('#successo').fadeOut(1000);
    });

    $(document).on("keypress",'body', function(e){
        if (e.which == 13) {
            return false;
        }
    });

    $(document).on("change", "#valutaEntrata", function(){
        var selectedValutaEntrata = $(this).val();
        var selectedValutaUscita = $('#valutaUscita').val();
        $('#valutaUscita').prop('disabled',false);
        $("#valutaUscita option[value]").prop('disabled',false);
        $("#valutaUscita option[value='"+selectedValutaEntrata+"']").prop('disabled',true);
        if (selectedValutaUscita == selectedValutaEntrata){
            $("#valutaUscita option[value!='"+selectedValutaEntrata+"']:first").prop('selected',true);
        }

        var newselectedValutaEntrata = $(this).val();
        var newselectedValutaUscita = $('#valutaUscita').val();

        if (newselectedValutaEntrata && newselectedValutaUscita){
            $('#invertiBtn').attr('disabled',false);
            getValoriNuovaOperazione();
        }
        else{
            $('#invertiBtn').attr('disabled',true);
        }

    });

    $(document).on("change", "#valutaUscita", function(){
        var selectedValutaEntrata = $(this).val();
        var selectedValutaUscita = $('#valutaUscita').val();

        if (selectedValutaEntrata && selectedValutaUscita){
            $('#invertiBtn').attr('disabled',false);
            getValoriNuovaOperazione();
        }
        else{
            $('#invertiBtn').attr('disabled',true);
        }
    });

    $(document).on("click", "#invertiBtn", function(){
        var selectedValutaEntrata = $('#valutaEntrata').val();
        var selectedValutaUscita = $('#valutaUscita').val();
        $("#op1tasso").val('');
        $("#opTipoOp").val('');
        $("#op1tipoOp").val('');
        $("#op2tipoOp").val('');
        $('#op1entrata').val('');
        $('#op1uscita').val('');
        $('#op2entrata').val('');
        $('#op2uscita').val('');
        $('#valutaEntrata').val(selectedValutaUscita);
        $("#valutaUscita option[value]").prop('disabled',false);
        $('#valutaUscita').val(selectedValutaEntrata);
        $('#valutaEntrata').trigger('change');
    });

    $(document).on('keyup blur change','#op1entrata', function(){
        calcolaUscita();
    });

    $(document).on('keyup blur change','#op1tasso', function(){
        calcolaUscita ();
    });

    $(document).on('keyup blur change','#op2tasso', function(){
        calcolaUscitaCombinata ();
    });

    $(document).on("submit", "#nuovaOperazioneForm", function(){
        var btn= $(this).find("input[type=submit]:focus").prop('id');
        var html= $('#scrollingContent').html();

        var formData = $("#nuovaOperazioneForm").serialize();
        var dataOp= $('#op1dataora').val();

        $("#scrollingContent").html("");
        $('#entryContainer').addClass("loading");
        $('.alert').fadeOut();

        switch(btn){
            case 'newOpSalva':
                salvaNuovaOperazione(formData, html);
                break;
            case 'newOpStampa':
                stampaNuovaOperazione(formData, dataOp, html);
                break;
            case 'newOpSalvaStampa':
                stampaNuovaOperazione(formData, dataOp, html);
                salvaNuovaOperazione(formData, html);
                break;
        }
        if ($('#entryContainer').hasClass('loading')){
            $('#entryContainer').removeClass("loading");
        }

        return false;
    });



});