/**
 * Created by Nadia on 11/02/2016.
 */
$(document).ready(function() {

    $('#dataOperazione').datetimepicker({
        lang: 'it',
        format:	'd/m/Y',
        timepicker: false
    });

    $(document).on("change", ".dtp", function(){
        $('.xdsoft_datetimepicker').hide();
    });

    var idOp = $("#idOp").val();

    if (idOp){

        /*$.ajax({
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
        });*/
    }

    //* ------------------------- */


    //* ---------- Azioni del MODE Modifica ----------------  */

    $(document).on("click", "#btnOpSalva", function(){
        $('#operazioniWindowForm').trigger('submit');
    });
    //* ----------------------------------  */

    $(document).on("submit", "#operazioniWindowForm", function(e){
        e.preventDefault();

       /* var isFormValid = true;

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
                   // async: false,
                    data: {valuta_da : valEntrata, valuta_a : valUscita, tasso : valTasso},
                    success: function(data)
                    {
                        var risultato = $.parseJSON(data);

                        if (risultato.errore){
                            alert(risultato.messaggio);
                            window.close();
                        }
                        else{
                            //Aggiungo la riga
                            window.close();
                            $("#tassi", window.opener.document).trigger('click');
                        }
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

        return isFormValid;*/

    });

});