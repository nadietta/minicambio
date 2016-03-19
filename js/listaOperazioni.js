/**
 * Created by Nadia on 07/02/2016.
 */

$(document).ready(function() {

    var lastOp = getLastOperazione();

    if(!lastOp){
        $('#listaOperazioniRadio').addClass('customHidden');
        $('#noOperazioni').fadeIn(1000);
    }else{
        $('#listaOperazioniRadio').removeClass('customHidden');
        $('#noOperazioni').fadeOut(1000);
        $('#info_utilizzo').fadeIn(3000);
        $('#listaOperazioniValoriRadio :input').attr('disabled', true);
    }

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

    /*$(document).on("hover", ".dtp", function(){
        console.log("hover");
        //$(this).css('cursor', 'pointer');
    });
*/
    $(document).on("change", ".dtp", function(){
        $('.xdsoft_datetimepicker').hide();
    });

    $(document).on("keypress",'body', function(e){
        if (e.which == 13) {
            return false;
        }
    });

    $(document).on('click', '#Stampa', function(){
        var num=$('tr').find('.checkClass').size();
        if(num>1) {
            var htmlScrollingContent = $('#scrollingContent').html();
            $('#formListaPrint').html(htmlScrollingContent);
            $('#formListaPrint').find('.bottonTable').remove();
            $('#formListaPrint').find('.check_th').remove();
            $('#formListaPrint').find('.checkClass').remove();

            var sceltaRadio = $('input[name=sceltaRadio]:checked').val();

            switch (sceltaRadio) {
                case '1':
                    data = "Date: " + $('#da1').val() + ' - ' + $('#a1').val();
                    break;
                case '2':
                    data = "Op: " + $('#da2').val() + ' - ' + $('#a2').val();
                    break;
                case '3':
                    data = "Entrata almeno: " + $('#da3').val() + ' [' + $('#valuta3').text() + ']';
                    break;
                case '4':
                    data = "Uscita almeno: " + $('#da4').val() + ' [' + $('#valuta4').text() + ']';
                    break;
            }

            var html = $('#formListaPrint').html();

            $('#scrollingContent').html("");
            $('#entryContainer').addClass("loading");

            $.ajax({
                type: "POST",
                url: "../PDF/listaOpPrint.php",
                async: false,
                data: {html: html, data: data},
                success: function (data) {
                    $('#entryContainer').removeClass("loading");
                    $('#scrollingContent').html(htmlScrollingContent);
                    popupCenter(data, 'stampa', '500', '900');
                },
                error: function (xhr, desc, err) {
                    alert("Details: " + desc + "\nError:" + err);
                }
            });

        }

        if(num==1){
            var id= $( ".checkClass").find('[type=checkbox]').attr('id');
            $.ajax({
                type: "POST",
                url: "../PDF/file_da_modello_singola_op.php",
                async: false,
                data: {id:id},
                success: function(data){
                    popupCenter(data,'stampa', '500', '900');

                },
                error: function(xhr, desc, err) {
                    alert("Details: " + desc + "\nError:" + err);
                }
            });

        }
        if ($('#entryContainer').hasClass('loading')){
            $('#entryContainer').removeClass("loading");
            $('#scrollingContent').html(htmlScrollingContent);
        }
    });

    $(document).on("click", "#listaOperazioniRadio input:radio", function(){
      //  $('#ListaBotton').addClass('customHidden');
        $('#nessuna_op').fadeOut();
        $('#info_utilizzo').hide();
        var checkedRadio = $(this).val();
        $('.listaOperazioniValoriRadioDiv').addClass('customHidden');
        $('#listaOperazioniValoriRadio :input').attr('disabled', true);

        $('#listaOperazioniValoriRadio'+checkedRadio+' :input').attr('disabled', false);
        $('#listaOperazioniValoriRadio'+checkedRadio).removeClass('customHidden');
        $('#listaOpSubmitDiv :input').attr('disabled', false);
        $('#listaOpSubmitDiv').removeClass('customHidden');
        $('#CancellaSelezione').prop('disabled',true);
        $('#StampaSelezione').prop('disabled',true);

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
            $('#CancellaSelezione').prop('disabled', true);
            $('#StampaSelezione').prop('disabled', true);
        } else{
            $('#CancellaSelezione').prop('disabled', false);
            $('#StampaSelezione').prop('disabled', false);
        }
    });


    $(document).on('click','#CancellaSelezione',function(){
        $( ".checkClass :checked").each(function(){
            var select = $(this);
            var idOp = select.attr('id');
            $.ajax({
                type: "POST",
                url: "phpFunctions/deleteOp.php",
                async: false,
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

    $(document).on('click','#StampaSelezione',function(){
        //var checkedLista = new Array();
        var whereVar = "pk_operazione IN (";
        var num=0;
        $( ".checkClass :checked").each(function(){
            //console.log($(this).closest("tr").find("td:lt(4)"));
            var select = $(this);
            var idOp = select.attr('id');
            //checkedLista.push(idOp);
            whereVar += '\''+idOp+'\''+',';
            num++;
        });

        whereVar = whereVar.substring(0,whereVar.length - 1);
        whereVar += ')';
        var operazioniDiv = "";
        if(num>1){
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
                                          <th class='hidden'>ID</th><th class='check_th'><input type='checkbox' id='seltutte'></th><th>OPERAZIONE</th><th>DATA</th><th>VALUTA ENTRATA</th>\n\
                                          <th>IMPORTO ENTRATA</th><th>TASSO&nbsp;&nbsp;&nbsp;</th><th>VALUTA USCITA</th><th>IMPORTO USCITA</th>\n\
                                       </tr></thead><tbody>";

                    for (var i = 0; i < operazioni.length; i++) {
                        operazioniDiv += "<tr id='trIdOp_"+ operazioni[i].id +"'><td class='hidden'>"+ operazioni[i].id +"</td>\n\
                                            <td class='checkClass'><input type='checkbox' id="+operazioni[i].id +"></td>\n\
                                            <td class='opOperazioneClass'>"+ operazioni[i].cod_op +"</td>\n\
                                            <td class='opDataClass'>"+ operazioni[i].data_op +"</td>\n\
                                            <td class='opValutaEntrataClass'>"+ operazioni[i].valuta_entrata +"</td>\n\
                                            <td class='opImportoEntrataClass'>"+ operazioni[i].importo_entrata +"</td>\n\
                                            <td class='opTassoClass'>"+ operazioni[i].tasso +"</td>\n\
                                            <td class='opValutaUscitaClass'>"+ operazioni[i].valuta_uscita +"</td>\n\
                                            <td class='opImportoUscitaClass'>"+ operazioni[i].importo_uscita +"</td>\n\
                                        </tr>";
                    }
                    operazioniDiv += "</tbody></table>";

                    var htmlScrollingContent = operazioniDiv;
                    $('#formListaPrint').html(htmlScrollingContent);
                    $('#formListaPrint').find('.bottonTable').remove();
                    $('#formListaPrint').find('.check_th').remove();
                    $('#formListaPrint').find('.checkClass').remove();

                    var sceltaRadio = $('input[name=sceltaRadio]:checked').val();

                    switch (sceltaRadio){
                        case '1':
                            data2 = "Date: " + $('#da1').val()+' - '+ $('#a1').val();
                            break;
                        case '2':
                            data2 = "Op: " + $('#da2').val()+' - '+ $('#a2').val();
                            break;
                        case '3':
                            data2 = "Entrata almeno: " + $('#da3').val()+' ['+ $('#valuta3').text() + ']';
                            break;
                        case '4':
                            data2 = "Uscita almeno: " + $('#da4').val()+' ['+ $('#valuta4').text() + ']';
                            break;
                    }

                    var html= $('#formListaPrint').html();

                    $.ajax({
                        type: "POST",
                        url: "../PDF/listaOpPrint.php",
                        async: false,
                        data: {html: html, data: data2},
                        success: function(data2){
                            popupCenter(data2,'stampa', '500', '900');
                        },
                        error: function(xhr, desc, err) {
                            alert("Details: " + desc + "\nError:" + err);
                        }
                    });


                }
                else{
                    //TODO: con gli alert colorati
                    alert("Nessuna Operazione Selezionata");
                }
            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });
        }
        if(num==1){
            var id= $( ".checkClass :checked").attr('id');
            $.ajax({
                type: "POST",
                url: "../PDF/file_da_modello_singola_op.php",
                async: false,
                data: {id:id},
                success: function(data){
                    popupCenter(data,'stampa', '500', '900');

                },
                error: function(xhr, desc, err) {
                    alert("Details: " + desc + "\nError:" + err);
                }
            });

        }

    });

    $(document).on("submit", "#listaOperazioniForm", function(){

        $("#entryContainerTitle").html("Lista Operazioni");
        $("#scrollingContent").html("");
        $('#entryContainer').addClass("loading");
        $('.alert').fadeOut();

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
                                    <table id='tableListaOperazioni' class='table table-hover tablesorter'>\n\
                                      <thead><tr>\n\
                                          <th class='hidden'>ID</th><th class='check_th'><input type='checkbox' id='seltutte'></th><th>OPERAZIONE</th><th>DATA</th><th>VALUTA ENTRATA</th>\n\
                                          <th>IMPORTO ENTRATA</th><th>TASSO&nbsp;&nbsp;&nbsp;</th><th>VALUTA USCITA</th><th>IMPORTO USCITA</th>\n\
                                       </tr></thead><tbody>";

                    for (var i = 0; i < operazioni.length; i++) {
                        operazioniDiv += "<tr id='trIdOp_"+ operazioni[i].id +"'><td class='hidden'>"+ operazioni[i].id +"</td>\n\
                                            <td class='checkClass'><input type='checkbox' id="+operazioni[i].id +"></td>\n\
                                            <td class='opOperazioneClass'>"+ operazioni[i].cod_op +"</td>\n\
                                            <td class='opDataClass'>"+ operazioni[i].data_op +"</td>\n\
                                            <td class='opValutaEntrataClass'>"+ operazioni[i].valuta_entrata +"</td>\n\
                                            <td class='opImportoEntrataClass'>"+ operazioni[i].importo_entrata +"</td>\n\
                                            <td class='opTassoClass'>"+ operazioni[i].tasso +"</td>\n\
                                            <td class='opValutaUscitaClass'>"+ operazioni[i].valuta_uscita +"</td>\n\
                                            <td class='opImportoUscitaClass'>"+ operazioni[i].importo_uscita +"</td>\n\
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

                    $('#entryContainer').removeClass("loading");
                    $("#scrollingContent").html(operazioniDiv);
                    $('#ListaBotton').removeClass('customHidden');

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


                }
                else{
                    $('#nessuna_op').fadeIn(2000);
                    $('#entryContainer').removeClass("loading");
                }
            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });

        if ($('#entryContainer').hasClass('loading')){
            $('#entryContainer').removeClass("loading");
        }

        return false;
    });

    $(document).on('click','.checkClass',function(){
        var nCheck=$( ".checkClass :checked").length;
        if(nCheck==0){
            $('#CancellaSelezione').prop('disabled',true);
            $('#StampaSelezione').prop('disabled',true);
        } else{
            $('#CancellaSelezione').prop('disabled', false);
            $('#StampaSelezione').prop('disabled', false);
        }
    });

    $(document).on('click','#seltutte',function(){
        var nCheck=$(this).is(":checked");

        if(nCheck){
            $('#CancellaSelezione').prop('disabled',false);
            $('#StampaSelezione').prop('disabled',false);
            $( ".checkClass").find('[type=checkbox]').each(function(){
                this.checked = true;
            });
        }
        else{
            $( ".checkClass").find('[type=checkbox]').each(function(){
                this.checked = false;
            });
            $('#CancellaSelezione').prop('disabled', true);
            $('#StampaSelezione').prop('disabled', true);
        }
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