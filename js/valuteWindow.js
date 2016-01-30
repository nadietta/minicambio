/**
 * Created by Nadia on 23/01/2016.
 */
$(document).ready(function() {

    //* Campi da riempire in base a idVal presente o null */

    var idVal = $("#idVal").val();

    if (idVal){

        $.ajax({
            type: "POST",
            url: "phpFunctions/detailsVal.php",
            data: {idVal : idVal},
            success: function(data)
            {
                var valuta = $.parseJSON(data);

                $("#valNome").val(valuta.nome_valuta);
                $("#valSimbolo").val(valuta.simbolo_valuta);
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
                                            <button type='button' class='btn' id='btnValNuovo'> \n\
                                                    <span class='glyphicon glyphicon-floppy-disk'></span>&nbsp;&nbsp;Salva\n\
                                            </button>";
        $('#valWindow_btns').html(newButtons);
    }

    //* ------------------------- */

    //* ---------- Azioni del MODE Nuovo ----------------  */

    $(document).on("click", "#btnValNuovo", function(){
        $('#valuteWindowForm').trigger('submit');
    });
    //* ----------------------------------  */

    //* ---------- Azioni del MODE Modifica ----------------  */

    $(document).on("click", "#btnValSalva", function(){
        $('#valuteWindowForm').trigger('submit');
    });
    //* ----------------------------------  */

    $(document).on("input", "#valNome", function() {
        if ($(this).hasClass("highlightedInput")){
            $(this).removeClass("highlightedInput");
        }
    });

    $(document).on("input", "#valSimbolo", function() {
        if ($(this).hasClass("highlightedInput")){
            $(this).removeClass("highlightedInput");
        }
    });

    $(document).on("submit", "#valuteWindowForm", function(e){
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
            var idVal = $('#idVal').val();
            var mode = $('#mode').val();
            var valNome = $('#valNome').val();
            var valSimbolo = $('#valSimbolo').val();
            if (mode == 'Modifica'){
                $.ajax({
                    type: "POST",
                    url: "phpFunctions/updateVal.php",
                    data: {idVal: idVal, valNome : valNome, valSimbolo : valSimbolo},
                    success: function(data)
                    {
                        //Aggiorno le informazioni anche sulla finestra chiamante
                        var updaterowString = "trIdVal_" + idVal;
                        var updaterow = $("#"+updaterowString+"", window.opener.document);
                        updaterow.find('.valNomeClass').html(valNome);
                        updaterow.find('.valSimboloClass').html(valSimbolo);
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
                    url: "phpFunctions/add_valuta.php",
                    data: {valNome : valNome, valSimbolo : valSimbolo},
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
                            $("#valute", window.opener.document).trigger('click');
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

        return isFormValid;

    });

});