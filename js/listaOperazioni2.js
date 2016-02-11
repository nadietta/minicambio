/**
 * Created by Nadia on 07/02/2016.
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
                selectValute += "<option selected disabled value=''>Scegli Valuta</option>";
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

$(document).ready(function() {

    $('#listaOperazioniValoriRadio :input').attr('disabled', true);

    //TODO: controllare che la prima data sia antecedente alla seconda
    $('#da1').datetimepicker({
        lang: 'it',
        format:	'd/m/Y',
        timepicker: false
    });

    $('#a1').datetimepicker({
        lang: 'it',
        format:	'd/m/Y',
        timepicker: false
    });

    $(document).on("change", ".dtp", function(){
        $('.xdsoft_datetimepicker').hide();
    });

    $(document).on("click", "#listaOperazioniRadio input:radio", function(){
        var checkedRadio = $(this).val();
        $('.listaOperazioniValoriRadioDiv').addClass('customHidden');
        $('#listaOperazioniValoriRadio :input').attr('disabled', true);

        $('#listaOperazioniValoriRadio'+checkedRadio+' :input').attr('disabled', false);
        $('#listaOperazioniValoriRadio'+checkedRadio).removeClass('customHidden');
        $('#listaOpSubmitDiv :input').attr('disabled', false);
        $('#listaOpSubmitDiv').removeClass('customHidden');

        switch (checkedRadio){
            case '2':
                var lastOp = getLastOperazione();
                var firstMonthOp = lastOp.substr(0,6) + '000000000';
                $('#da2').val(firstMonthOp);
                $('#a2').val(lastOp);
                break;
            case '3':
                $('#valuta3').html(getValute());
                break;
            case '4':
                $('#valuta4').html(getValute());
                break;
        }

    });

    $(document).on("submit", "#listaOperazioniForm", function(){
        //TODO: paginazione risultati
        //TODO: filtri di ordinamento
        $("#entryContainerTitle").html("Lista Operazioni");
        $("#entryContainer").html("");
        var operazioniDiv = "";

        var checkedRadio = $("input[name='sceltaRadio']:checked").val();
        var whereVar= "";

        switch (checkedRadio){
            case '1':
                var da1 = $('#da1').val();
                var formattedDa1 = da1.substr(6,4)+"-"+da1.substr(3,2)+"-"+da1.substr(0,2);
                var a1 = $('#a1').val();
                var formattedA1 = a1.substr(6,4)+"-"+a1.substr(3,2)+"-"+a1.substr(0,2);
                whereVar = "data_op BETWEEN '"+formattedDa1+"' AND '"+formattedA1+"'+ INTERVAL 1 DAY ORDER BY cod_op";

                break;
            case '2':
                whereVar = "cod_op >= "+$('#da2').val()+" AND cod_op <= "+$('#a2').val()+" ORDER BY cod_op";
                break;
            case '3':
                whereVar = "importo_entrata >= "+$('#da3').val()+" AND fk_valuta_entrata = "+$('#valuta3').val();
                break;
            case '4':
                whereVar = "importo_uscita >= "+$('#da4').val()+" AND fk_valuta_uscita = "+$('#valuta3').val();
                break;
        }

        $.ajax({
            type: "POST",
            url: "phpFunctions/lista_operazioni.php",
            async: false,
            data: {where_data: whereVar},
            success: function(data) {
                var operazioni = $.parseJSON(data);
                if (operazioni.length>0) {

                    operazioniDiv += "<br>\n\
                                    <table id='tableListaOperazioni' class='table table-hover'>\n\
                                      <tr>\n\
                                          <th class='hidden'>ID</th><th>OPERAZIONE</th><th>DATA</th><th>VALUTA ENTRATA</th>\n\
                                          <th>IMPORTO ENTRATA</th><th>VALUTA USCITA</th><th>IMPORTO USCITA</th>\n\
                                          <th>TASSO</th>\n\
                                      </tr>";

                    for (var i = 0; i < operazioni.length; i++) {
                        operazioniDiv += "<tr id='trIdOp_"+ operazioni[i].id +"'><td class='hidden'>"+ operazioni[i].id +"</td>\n\
                                            <td class='opOperazioneClass'>"+ operazioni[i].cod_op +"</td>\n\
                                            <td class='opDataClass'>"+ operazioni[i].data_op +"</td>\n\
                                            <td class='opValutaEntrataClass'>"+ operazioni[i].valuta_entrata +"</td>\n\
                                            <td class='opImportoEntrataClass'>"+ operazioni[i].importo_entrata +"</td>\n\
                                            <td class='opValutaUscitaClass'>"+ operazioni[i].valuta_uscita +"</td>\n\
                                            <td class='opImportoUscitaClass'>"+ operazioni[i].importo_uscita +"</td>\n\
                                            <td class='opTassoClass'>"+ operazioni[i].tasso +"</td>\n\
                                            <td><button class='btn' \n\
                                                    onclick=\"popupCenter('operazioniWindow.php?idOp="+ operazioni[i].id +"&mode=Modifica','Operazioni', '500', '420');\">\n\
                                                    <span class='glyphicon glyphicon-pencil'></span>&nbsp;&nbsp;Modifica\n\
                                                </button>\n\
                                            </td>\n\
                                            <td><button type='button' class='btn' data-toggle='modal' data-op-id='"+ operazioni[i].id +"' data-target='.opDelete-ConfirmDiv'> \n\
                                                    <span class='glyphicon glyphicon-trash'></span>&nbsp;&nbsp;Cancella\n\
                                                </button>\n\
                                            </td>\n\
                                        </tr>";
                    }
                    operazioniDiv += "</table>";
                    $("#entryContainer").html(operazioniDiv);

                    $("#entryContainer").append("<div class='modal fade opDelete-ConfirmDiv' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'>\n\
                                    <div class='modal-dialog modal-sm'>\n\
                                        <div class='modal-content'>\n\
                                            <div class='modal-body'>Sei sicuro di voler cancellare questa Operazione?<br>\n\
                                                L'operazione non pu&ograve; essere annullata.\n\
                                                <div id='modalDiv' class='hidden'></div>\n\
                                            </div>\n\
                                            <div class='modal-footer'>\n\
                                                <button type='button' data-dismiss='modal' class='btn'>Annulla</button>\n\
                                                <button type='button' data-dismiss='modal' class='btn btn-primary' id='btnOpDelete'>Conferma</button>\n\
                                            </div>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>");


                }
                else{
                    msg = "<br>Nessuna Operazione Presente.";
                    $("#entryContainer").html(msg);
                }
            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }

        });
        return false;
    });

    $(document).on("click", "#btnOpDelete", function(){
        var idOp = $('#modalDiv').html();

        $.ajax({
            type: "POST",
            url: "phpFunctions/deleteOp.php",
            data: {idOp: idOp},
            success: function(data)
            {
                //Cancello la riga relativa
                if (data){
                    var killrowString = "trIdOp_" + idOp;
                    var killrow = $("#"+killrowString+"");
                    killrow.addClass("danger");
                    killrow.fadeOut(2000, function(){
                        $(this).remove();
                        $('#listaOperazioniForm').trigger('submit');
                    });
                }
                else{
                    alert("Errore nella cancellazione");
                }
            },
            error: function(xhr, desc, err) {
                alert("Errore. Impossibile eliminare l'Operazione Selezionata");
            }
        });

    });


    $(document).on("show.bs.modal", ".opDelete-ConfirmDiv", function(e){
        var opId = $(e.relatedTarget).data('op-id');
        $(e.currentTarget).find('#modalDiv').html(opId);
    });

});