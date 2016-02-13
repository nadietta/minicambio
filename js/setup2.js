/**
 * Created by Nadia on 23/01/2016.
 */
function popupCenter(url, title, w, h) {
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/3)-(h/3);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

function loadValute(){
    $("#entryContainerTitle").html("Valute");
    $("#entryContainer").html("");
    var valuteDiv = "";

    valuteDiv += "<div>\n\
                        <button class='btn btnAddNewVal' \n\
                            onclick=\"popupCenter('valuteWindow.php?idVal=&mode=Nuovo','Valute', '500', '350');\">\n\
                            <span class='glyphicon glyphicon-plus'></span>&nbsp;&nbsp;Nuova Valuta\n\
                        </button>\n\
                    </div>";

    $.ajax({
        type: "GET",
        url: "phpFunctions/lista_valute.php",
        success: function(data) {
            var valute = $.parseJSON(data);
            if (valute.length>0) {

                valuteDiv += "<br>\n\
                                    <table id='tableValute' class='table table-hover'>\n\
                                      <tr>\n\
                                          <th class='hidden'>ID</th><th>NOME VALUTA</th><th>SIMBOLO VALUTA</th>\n\
                                      </tr>";

                for (var i = 0; i < valute.length; i++) {
                    valuteDiv += "<tr id='trIdVal_"+ valute[i].id +"'><td class='hidden'>"+ valute[i].id +"</td>\n\
                                            <td class='valNomeClass'>"+ valute[i].nome_valuta +"</td>\n\
                                            <td class='valSimboloClass'>"+ valute[i].simbolo_valuta +"</td>\n\
                                            <td><button class='btn' \n\
                                                    onclick=\"popupCenter('valuteWindow.php?idVal="+ valute[i].id +"&mode=Modifica','Valute', '500', '350');\">\n\
                                                    <span class='glyphicon glyphicon-pencil'></span>&nbsp;&nbsp;Modifica\n\
                                                </button>\n\
                                            </td>\n\
                                            <td><button type='button' class='btn' data-toggle='modal' data-val-id='"+ valute[i].id +"' data-target='.valDelete-ConfirmDiv'> \n\
                                                    <span class='glyphicon glyphicon-trash'></span>&nbsp;&nbsp;Cancella\n\
                                                </button>\n\
                                            </td>\n\
                                        </tr>";
                }
                valuteDiv += "</table>";
                $("#entryContainer").html(valuteDiv);

                $("#entryContainer").append("<div class='modal fade valDelete-ConfirmDiv' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'>\n\
                                    <div class='modal-dialog modal-sm'>\n\
                                        <div class='modal-content'>\n\
                                            <div class='modal-body'>Sei sicuro di voler cancellare questa Valuta?<br>\n\
                                                L'operazione non pu&ograve; essere annullata.\n\
                                                <div id='modalDiv' class='hidden'></div>\n\
                                            </div>\n\
                                            <div class='modal-footer'>\n\
                                                <button type='button' data-dismiss='modal' class='btn'>Annulla</button>\n\
                                                <button type='button' data-dismiss='modal' class='btn btn-primary' id='btnValDelete'>Conferma</button>\n\
                                            </div>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>");


            }
            else{
                msg += "<br>Nessuna Valuta Presente.";
                $("#entryContainer").html(msg);
            }
        },
        error: function(xhr, desc, err) {
            //alert(xhr);
            alert("Details: " + desc + "\nError:" + err);
        }

    });
}

function loadTassi(){
    $("#entryContainerTitle").html("Tassi");
    $("#entryContainer").html("");
    var tassiDiv = "";

    tassiDiv += "<div>\n\
                        <button class='btn btnAddNewTas' \n\
                            onclick=\"popupCenter('tassiWindow.php?idTas=&mode=Nuovo','Tassi', '500', '500');\">\n\
                            <span class='glyphicon glyphicon-plus'></span>&nbsp;&nbsp;Nuovo Tasso\n\
                        </button>\n\
                    </div>";

    $.ajax({
        type: "GET",
        url: "phpFunctions/lista_tassi.php",
        success: function(data) {
            var tassi = $.parseJSON(data);
            if (tassi.length>0) {

                tassiDiv += "<br>\n\
                                    <table id='tableTassi' class='table table-hover'>\n\
                                      <tr>\n\
                                          <th class='hidden'>ID</th><th>VALUTA ENTRATA</th><th>VALUTA USCITA</th><th>TASSO</th>\n\
                                      </tr>";

                for (var i = 0; i < tassi.length; i++) {
                    tassiDiv += "<tr id='trIdTas_"+ tassi[i].id +"'><td class='hidden'>"+ tassi[i].id +"</td>\n\
                                            <td class='tasValutaEntrataClass'>"+ tassi[i].valutada +"</td>\n\
                                            <td class='tasValutaUscitaClass'>"+ tassi[i].valutaa +"</td>\n\
                                            <td class='tasTassoClass'>"+ tassi[i].tasso +"</td>\n\
                                            <td><button class='btn' \n\
                                                    onclick=\"popupCenter('tassiWindow.php?idTas="+ tassi[i].id +"&mode=Modifica','Tassi', '500', '500');\">\n\
                                                    <span class='glyphicon glyphicon-pencil'></span>&nbsp;&nbsp;Modifica\n\
                                                </button>\n\
                                            </td>\n\
                                            <td><button type='button' class='btn' data-toggle='modal' data-tas-id='"+ tassi[i].id +"' data-target='.tasDelete-ConfirmDiv'> \n\
                                                    <span class='glyphicon glyphicon-trash'></span>&nbsp;&nbsp;Cancella\n\
                                                </button>\n\
                                            </td>\n\
                                        </tr>";
                }
                tassiDiv += "</table>";
                $("#entryContainer").html(tassiDiv);

                $("#entryContainer").append("<div class='modal fade tasDelete-ConfirmDiv' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'>\n\
                                    <div class='modal-dialog modal-sm'>\n\
                                        <div class='modal-content'>\n\
                                            <div class='modal-body'>Sei sicuro di voler cancellare questo Tasso?<br>\n\
                                                L'operazione non pu&ograve; essere annullata.\n\
                                                <div id='modalDiv' class='hidden'></div>\n\
                                            </div>\n\
                                            <div class='modal-footer'>\n\
                                                <button type='button' data-dismiss='modal' class='btn'>Annulla</button>\n\
                                                <button type='button' data-dismiss='modal' class='btn btn-primary' id='btnTasDelete'>Conferma</button>\n\
                                            </div>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>");


            }
            else{
                msg += "<br>Nessun Tasso Presente.";
                $("#entryContainer").html(msg);
            }
        },
        error: function(xhr, desc, err) {
            //alert(xhr);
            alert("Details: " + desc + "\nError:" + err);
        }

    });
}

$(document).ready(function() {

   /* $('#valute').trigger('click');
    alert("prova");*/

    $(document).on("click", "#valute", function(e){
        e.preventDefault();
        //TODO: farlo dal padre e unire le due funzioni
        $("#valute").removeClass("active");
        $("#tassi").removeClass("active");

        $(this).addClass("active");

        loadValute();
    });

    $(document).on("click", "#tassi", function(e){
        e.preventDefault();
        //TODO: farlo dal padre
        $("#valute").removeClass("active");
        $("#tassi").removeClass("active");

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

    $(document).on("click", "#btnTasDelete", function(){
        var idTas = $('#modalDiv').html();

        $.ajax({
            type: "POST",
            url: "phpFunctions/deleteTas.php",
            data: {idTas: idTas},
            success: function(data)
            {
                //alert(data);
                //Cancello la riga relativa
                var killrowString = "trIdTas_" + idTas;
                var killrow = $("#"+killrowString+"");
                killrow.addClass("danger");
                killrow.fadeOut(2000, function(){
                    $(this).remove();
                });
            },
            error: function(xhr, desc, err) {
                alert("Errore. Impossibile eliminare il Tasso Selezionato");
            }
        });

    });

    $(document).on("show.bs.modal", ".valDelete-ConfirmDiv", function(e){
        var valId = $(e.relatedTarget).data('val-id');
        $(e.currentTarget).find('#modalDiv').html(valId);
    });

    $(document).on("show.bs.modal", ".tasDelete-ConfirmDiv", function(e){
        var tasId = $(e.relatedTarget).data('tas-id');
        $(e.currentTarget).find('#modalDiv').html(tasId);
    });

    $('#valute').trigger('click');

});
