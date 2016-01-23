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
                                            \<td class='valSimboloClass'>"+ valute[i].simbolo_valuta +"</td>\n\
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

$(document).ready(function() {

    $(document).on("click", "#valute", function(){
        loadValute();
    });

    $(document).on("click", "#btnValDelete", function(){
        var idVal = $('#modalDiv').html();

        $.ajax({
            type: "POST",
            url: "phpFunctions/deleteVal.php",
            data: {idVal: idVal},
            success: function(data)
            {
                //Cancello la riga relativa
                var killrowString = "trIdVal_" + idVal;
                var killrow = $("#"+killrowString+"");
                killrow.addClass("danger");
                killrow.fadeOut(2000, function(){
                    $(this).remove();
                });
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

});
