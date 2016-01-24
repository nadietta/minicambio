/**
 * Created by Nadia on 23/01/2016.
 */

function getValute(){
    var selectValute = "";

    $.ajax({
        type: "GET",
        async: false,
        url: "phpFunctions/lista_valute.php",
        success: function(data) {
            var valute = $.parseJSON(data);
            if (valute.length) {
                selectValute += "<option selected disabled>Scegli Valuta</option>";
                for (var i = 0; i < valute.length; i++) {
                    selectValute += "<option value='"+ valute[i].id +"'>"+ valute[i].nome_valuta +"</option>";
                }
            }
            else{
                selectValute += "<option selected disabled>Scegli Valuta</option>";
            }
        },
        error: function(xhr, desc, err) {
            //alert(xhr);
            alert("Details: " + desc + "\nError:" + err);
        }
    });

    return selectValute;
}


$(document).ready(function() {

    //* Campi da riempire in base a idTas presente o null */

    var idTas = $("#idTas").val();

    selectValute = getValute();
    $('#valutaEntrata').html(selectValute);
    $('#valutaUscita').html(selectValute);

    if (idTas){

        $.ajax({
            type: "POST",
            url: "phpFunctions/detailsTas.php",
            data: {idTas : idTas},
            success: function(data)
            {
                var tasso = $.parseJSON(data);

                $("#valutaEntrata").val(tasso.valutada);
                $("#valutaUscita").val(tasso.valutaa);
                $("#tassoCambio").val(tasso.tasso);
            },
            error: function(xhr, desc, err) {
                alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });
    }

    //* ------------------------- */

    //* ---------- MODE ----------------  */
    var mode = $("#mode").val();

    if (mode == 'Nuovo'){
        var newButtons = "<button type='button' class='btn' onclick='window.close();'> \n\
                                                    <span class='glyphicon glyphicon-remove'></span>&nbsp;&nbsp;Annulla\n\
                                            </button>\n\
                                            <button type='button' class='btn' id='btnTasNuovo'> \n\
                                                    <span class='glyphicon glyphicon-floppy-disk'></span>&nbsp;&nbsp;Salva\n\
                                            </button>";
        $('#tasWindow_btns').html(newButtons);
    }
    else if (mode == 'Modifica'){
        $('#valutaEntrata').attr("disabled",true);
        $('#valutaUscita').attr("disabled",true);
    }

    //* ------------------------- */

    //* ---------- Azioni del MODE Nuovo ----------------  */

    $(document).on("click", "#btnTasNuovo", function(){
        $('#tassiWindowForm').trigger('submit');
    });
    //* ----------------------------------  */

    //* ---------- Azioni del MODE Modifica ----------------  */

    $(document).on("click", "#btnTasSalva", function(){
        $('#tassiWindowForm').trigger('submit');
    });
    //* ----------------------------------  */

    $(document).on("change", "#valutaEntrata", function(){
        var selectedValutaEntrata = $(this).val();
        if (selectedValutaEntrata == '1'){
            $("#valutaUscita option[value='"+selectedValutaEntrata+"']").prop('disabled',true);
        }
        else{
            //alert("non");
        }
    });

    //TODO: highlight sui select? Sistemare Highlights in generale anche su Valute. Input types anche
    //TODO: requiredInput sulle Select per isFormValid??
    $(document).on("input", "#tassoCambio", function() {
        if ($(this).hasClass("highlightedInput")){
            $(this).removeClass("highlightedInput");
        }
    });

    $(document).on("submit", "#tassiWindowForm", function(e){
        e.preventDefault();

        var isFormValid = true;

        $(".requiredInput").each(function(){
            if ($.trim($(this).val()).length == 0){
                $(this).addClass("highlightedInput");
                isFormValid = false;
            }
            else{
                $(this).removeClass("highlightedInput");
            }
        });

        if (isFormValid){
            //alert("submit");
            var idTas = $('#idTas').val();
            var mode = $('#mode').val();
            var valEntrata = $('#valutaEntrata').val();
            var valUscita = $('#valutaUscita').val();
            var valTasso = $('#tassoCambio').val();

            if (mode == 'Modifica'){
                $.ajax({
                    type: "POST",
                    url: "phpFunctions/updateTas.php",
                    data: {idTas: idTas, valTasso : valTasso},
                    success: function(data)
                    {
                        //Aggiorno le informazioni anche sulla finestra chiamante
                        var updaterowString = "trIdTas_" + idTas;
                        var updaterow = $("#"+updaterowString+"", window.opener.document);
                        updaterow.find('.tasTassoClass').html(valTasso);
                        window.close();
                    },
                    error: function(xhr, desc, err) {
                        //alert(xhr);
                        //alert("Details: " + desc + "\nError:" + err);
                        alert("Errore");
                    }
                });
            }
            else if (mode == 'Nuovo'){
                $.ajax({
                    type: "POST",
                    url: "phpFunctions/add_tasso.php",
                    data: {valuta_da : valEntrata, valuta_a : valUscita, tasso : valTasso},
                    success: function(data)
                    {
                        var risultato = $.parseJSON(data);
                        //Aggiungo la riga
                        window.close();
                        if (risultato.err){
                            alert(risultato.err);
                        }
                        $("#tassi", window.opener.document).trigger('click');

                    },
                    error: function(xhr, desc, err) {
                        alert("Errore");
                    }
                });
            }

        }
        else{
            alert("Compila i campi evidenziati in giallo");
        }

        return isFormValid;

    });

});