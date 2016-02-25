/**
 * Created by Nadia on 07/02/2016.
 */

$(document).ready(function() {
    var lastOp = getLastOperazione();

    if(!lastOp){

        $('#listaOperazioniRadio').addClass('customHidden');
        $('#noOperazioni').fadeIn(1000);

    }else {
        $('#listaOperazioniRadio').removeClass('customHidden');
        $('#noOperazioni').fadeOut(1000);
        $('#info_utilizzo').fadeIn(3000);
        $('#listaOperazioniValoriRadio :input').attr('disabled', true);

        $('#a1').datetimepicker({
            lang: 'it',
            format: 'd/m/Y',
            timepicker: false,
            scrollMonth: false,
            maxDate: new Date(),
            onSelectDate: function (dateStr) {
                $('#da1').datetimepicker({
                    maxDate: dateStr
                });
            }
        });

        $('#da1').datetimepicker({
            lang: 'it',
            format: 'd/m/Y',
            timepicker: false,
            scrollMonth: false,
            maxDate: new Date(),
            onSelectDate: function (dateStr) {
                $('#a1').datetimepicker({
                    minDate: dateStr
                });
            }
        });

        $('#da1').val(dateToString(new Date()));
        $('#a1').val(dateToString(new Date()));

    }
    $(document).on("change", ".dtp", function(){
        $('.xdsoft_datetimepicker').hide();
    });


    $(document).on('click', '#Stampa', function(){
        $('#formListaPrint').html($('#scrollingContent').html());
        $('#formListaPrint').find('.bottonTable').remove();
        $('#formListaPrint').find('.check_th').remove();

        $('#formListaPrint').find('.checkClass').remove();
        var html= $('#formListaPrint').html();
        $.ajax({
            type: "POST",
            url: "../PDF/listaOpPrint.php",
            async: false,
            data: {html: html},
            success: function(data){
                window.open(data);
            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });
    });

    $(document).on("click", "#listaOperazioniRadio input:radio", function(){
        $('#ListaBotton').addClass('customHidden');
        $('#nessuna_op').fadeOut();
        $('#info_utilizzo').hide();
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

    $(document).on('click','.checkClass',function(){
        var nCheck=$( ".checkClass :checked").length;

        if(nCheck==0){
            $('#CancellaSelezione').addClass('customHidden');
        } else{
        $('#CancellaSelezione').removeClass('customHidden');}
    });


    $(document).on('click','#CancellaSelezione',function(){
        $( ".checkClass :checked").each(function(){
            var select = $(this);
            var idOp = select.attr('id');
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
    });

    $(document).on("submit", "#listaOperazioniForm", function(){
        //TODO: paginazione risultati
        //TODO: filtri di ordinamento
        $("#entryContainerTitle").html("Lista Operazioni");
        $("#scrollingContent").html("");

        var operazioniDiv = "";
        $('#nessuna_op').fadeOut();
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
                                    <table id='tableListaOperazioni' class='table table-hover tablesorter'>\n\
                                      <thead><tr>\n\
                                          <th class='hidden'>ID</th><th class='check_th'></th><th>OPERAZIONE</th><th>DATA</th><th>VALUTA ENTRATA</th>\n\
                                          <th>IMPORTO ENTRATA</th><th>VALUTA USCITA</th><th>IMPORTO USCITA</th>\n\
                                          <th>TASSO&nbsp;&nbsp;&nbsp;</th>\n\
                                      </tr></thead><tbody>";

                    for (var i = 0; i < operazioni.length; i++) {
                        operazioniDiv += "<tr id='trIdOp_"+ operazioni[i].id +"'><td class='hidden'>"+ operazioni[i].id +"</td>\n\
                                            <td class='checkClass'><input type='checkbox' id="+operazioni[i].id +"></td>\n\
                                            <td class='opOperazioneClass'>"+ operazioni[i].cod_op +"</td>\n\
                                            <td class='opDataClass'>"+ operazioni[i].data_op +"</td>\n\
                                            <td class='opValutaEntrataClass'>"+ operazioni[i].valuta_entrata +"</td>\n\
                                            <td class='opImportoEntrataClass'>"+ operazioni[i].importo_entrata +"</td>\n\
                                            <td class='opValutaUscitaClass'>"+ operazioni[i].valuta_uscita +"</td>\n\
                                            <td class='opImportoUscitaClass'>"+ operazioni[i].importo_uscita +"</td>\n\
                                            <td class='opTassoClass'>"+ operazioni[i].tasso +"</td>\n\
                                            <td class='bottonTable'><button class='btn' \n\
                                                    onclick=\"popupCenter('operazioniWindow.php?idOp="+ operazioni[i].id +"','Operazioni', '500', '500');\">\n\
                                                    <span class='glyphicon glyphicon-pencil'></span>&nbsp;&nbsp;Modifica\n\
                                                </button>\n\
                                            </td>\n\
                                            <td class='bottonTable'><button type='button' class='btn' data-toggle='modal' data-op-id='"+ operazioni[i].id +"' data-target='.opDelete-ConfirmDiv'> \n\
                                                    <span class='glyphicon glyphicon-trash'></span>&nbsp;&nbsp;Cancella\n\
                                                </button>\n\
                                            </td>\n\
                                        </tr>";
                    }
                    operazioniDiv += "</tbody></table>";
                    $("#scrollingContent").html(operazioniDiv);

                    $("#tableListaOperazioni").trigger('update');

                    $("#scrollingContent").append("<div class='modal fade opDelete-ConfirmDiv' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'>\n\
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

                $('#ListaBotton').removeClass('customHidden');
                }
                else{
                    $('#nessuna_op').fadeIn(2000);
                }
            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });
        return false;
    });

    $(document).on("update", "#tableListaOperazioni", function(){
        $("#tableListaOperazioni").tablesorter({
            theme: 'blue',
            headers: {
                1: {sorter: false}

            },//headers
            // sort on the first column in ascending order
            sortList: [0,0]
        });
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