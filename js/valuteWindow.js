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
                                            <input type='submit' class='btn btn-primary' id='valSubmit' name='valSubmit' value='Salva'/>";
        $('#valWindow_btns').html(newButtons);
    }

    //* ------------------------- */

    $(document).on("keypress",'body', function(e){
        if (e.which == 13) {
            return false;
        }
    });

    $(document).on("submit", "#valuteWindowForm", function(e){
        e.preventDefault();

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
                    var risultato = $.parseJSON(data);
                    $("#valuteWindowForm").html("");
                    if (risultato.errore){
                        $('#errore').fadeIn(2000, function(){
                            window.close();
                        });
                    }else{
                        $('#successo').fadeIn(2000, function(){
                            //Aggiorno le informazioni anche sulla finestra chiamante
                            var updaterowString = "trIdVal_" + idVal;
                            var updaterow = $("#"+updaterowString+"", window.opener.document);
                            updaterow.find('.valNomeClass').html(valNome);
                            updaterow.find('.valSimboloClass').html(valSimbolo);
                            window.close();
                        });
                    }
                },
                error: function(xhr, desc, err) {
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
                    $("#valuteWindowForm").html("");
                    if (risultato.errore){
                        $('#errore').fadeIn(2000, function(){
                            window.close();
                        });
                    }else{
                        //Aggiungo la riga
                        $('#successo').fadeIn(2000, function(){
                            window.close();
                            $("#valute", window.opener.document).trigger('click');
                        });
                    }
                },
                error: function(xhr, desc, err) {
                    alert("Errore");
                }
            });
        }

    });

});