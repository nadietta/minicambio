/**
 * Created by Nadia on 23/01/2016.
 */

function stampaNuovaOperazione(formData, dataOp, html){
    /*if (inpObj1.checkValidity() == false){
        return false;
    }
    if (inpObj2.checkValidity() == false){
        return false;
    }*/
    $.ajax({
        type: "POST",
        url: "../PDF/file_da_modello_oro.php",
        async: false,
        data: {formData: formData, dataOp: dataOp},
        success: function(data) {
            if ($('#entryContainer').hasClass('loadingOro')){
                $('#entryContainer').removeClass("loadingOro");
            }

            popupCenter(data,'stampa', '500', '900');
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

}
function salvaNuovaOperazione(formData, dataOp,html){
    var formDataCommit = false;
    var msg='';
    $.ajax({
        type: "POST",
        url: "phpFunctions/addOperazioneOro.php",
        data: {formData: formData, dataop:dataOp},
        async: false,
        success: function(data) {
            var risultato = $.parseJSON(data);
            if ($('#entryContainer').hasClass('loadingOro')){
                $('#entryContainer').removeClass("loadingOro");
            }
            if (risultato.errore){
                $('#errore').fadeIn(2000);
                    setTimeout(function(){
                        location.reload();
                }, 3000);
            }
            else{
                if(risultato.messaggio){
                    $('#successo').fadeIn(2000);
                    setTimeout(function(){
                        $('#successo').fadeOut();
                    }, 2000);
                    $('#scrollingContent').html(html);
                    newOpOro();
                    $('#grammi').val('');
                    $('#prezzo').val('');
                    $('#carati').val('');
                    $('#franchi').val('');
                }
            }
        },
        error: function(xhr, desc, err) {
            alert("Details: " + desc + "\nError:" + err);
        }
    });
    return false;
}
function newOpOro(){
    $("#entryContainerTitle").html("Nuova Operazione: ORO");
    $("#formLista").addClass('customHidden');
    $("#formLista").html('');
    $('#ListaOroBotton').addClass('customHidden');
    $("#formOperazione").removeClass('customHidden');
    $("#newOpBottoni").removeClass('customHidden');
    $("#sceltaLista").addClass('customHidden');
    var currentDateTime = getCurrentDateTime();
    var cod = currentDateTime.substr(6, 4) + currentDateTime.substr(3, 2);
    $('#dataora').val(currentDateTime);
    setNumOpOro();
}

function calcolaTotaleOro(){
    var grammi= $('#grammi').val();
    var prezzo= $('#prezzo').val();
    var totale=grammi*prezzo;
    $('#franchi').val(totale.toFixed(2));
}

function setNumOpOro(){
    var lastOperazione = "";
    var datascelta=$('#dataora').val();
    $.ajax({
        type: "POST",
        data: {datascelta:datascelta},
        url: "phpFunctions/getLastOperazioneOro.php",
        success: function(data) {
            lastOperazione= data;
            $('#operazione').val(lastOperazione);
        },
        error: function(xhr, desc, err) {
            alert("Details: " + desc + "\nError:" + err);
        }
    });

}

function loadOpOro(){
    $("#entryContainerTitle").html("Lista Operazioni: Oro");
    //$("#scrollingContent").html("");
    $("#formOperazione").addClass('customHidden');
    $("#newOpBottoni").addClass('customHidden');
    $("#formLista").removeClass('customHidden');
    $("#sceltaLista").removeClass('customHidden');
    var oroDiv = "";
}

$(document).ready(function() {

    $('#a').datetimepicker({
        lang: 'it',
        format: 'd/m/Y',
        timepicker: false,
        scrollMonth: false,
        maxDate: new Date(),
        onSelectDate: function (dateStr) {
            $('#da').datetimepicker({
                maxDate: dateStr
            });
        }
    });
    $('#dataora').datetimepicker({
        lang: 'it',
        format: 'd/m/Y H:i',
        scrollMonth: false,
        maxDate: new Date()
    });

    $('#da').datetimepicker({
        lang: 'it',
        format: 'd/m/Y',
        timepicker: false,
        scrollMonth: false,
        maxDate: new Date(),
        onSelectDate: function (dateStr) {
            $('#a').datetimepicker({
                minDate: dateStr
            });
        }
    });

    $('#da').val(dateToString(new Date()));
    $('#a').val(dateToString(new Date()));

    $(document).on("change", ".dtp", function(){
        $('.xdsoft_datetimepicker').hide();

    });


    $(document).on('keyup blur change mousewheel','#grammi', function(){
        calcolaTotaleOro();
    });


    $(document).on('keyup blur change mousewheel','#prezzo', function(){
        calcolaTotaleOro();
    });
    $(document).on('change','#dataora', function(){
        setNumOpOro();
    });

    $(document).on("keypress",'body', function(e){
        if (e.which == 13) {
            return false;
        }
    });

    $(document).on('click', '#Stampa', function(){
        $('#formListaPrint').html($('#formLista').html());
        $('#formListaPrint').find('.bottonTable').remove();
        $('#formListaPrint').find('.check_th').remove();
        $('#formListaPrint').find('.checkClass').remove();
        var data_da=$('#da').val();
        var data_a =$('#a').val();
        var data_stampa=data_da+" - "+ data_a;

        var html= $('#formListaPrint').html();

        $.ajax({
           type: "POST",
            url: "../PDF/listaOpOroPrint.php",
            async: false,
            data: {html: html, data: data_stampa},
            success: function(data){

                popupCenter(data,'stampa', '500', '900');
            },
            error: function(xhr, desc, err) {
                alert("Details: " + desc + "\nError:" + err);
            }
        });

    });

    $(document).on("submit", "#caricaListaOperazioni", function(){
        var da =$('#da').val();
        var formattedDa = da.substr(6,4)+"-"+da.substr(3,2)+"-"+da.substr(0,2);
        var a = $('#a').val();
        var formattedA = a.substr(6,4)+"-"+a.substr(3,2)+"-"+a.substr(0,2);
        whereVar = "data_op BETWEEN '"+formattedDa+"' AND '"+formattedA+"'+ INTERVAL 1 DAY ORDER BY cod_op_oro";
        $("#formLista").html('');
        $('#nessuna_op').fadeOut();

        $.ajax({
            type: "POST",
            url: "phpFunctions/lista_operazioni_oro.php",
            async: false,
            data: {where_data: whereVar},
            success: function(data) {
                var operazioni = $.parseJSON(data);
                operazioniDiv='';
                if (operazioni.length>0) {
                    operazioniDiv += "<br>\n\
                                    <table id='tableListaOperazioni' class='table table-hover '>\n\
                                     <thead><tr>\n\
                                          <th class='hidden'>ID</th><th class='check_th'><input type='checkbox' id='seltutte'></th><th>OPERAZIONE</th><th class='shortDate dateFormat-ddmmyyyy'>DATA</th><th>GRAMMI</th>\n\
                                          <th>CARATI</th><th>PREZZO</th><th>TOTALE (CHF)</th>\n\
                                         \n\
                                      </tr></thead> ";

                    for (var i = 0; i < operazioni.length; i++) {

                        operazioniDiv += "<tr id='trIdOp_"+ operazioni[i].id +"'><td class='hidden'>"+ operazioni[i].id +"</td>\n\
                                           <td class='checkClass'><input type='checkbox' id="+operazioni[i].id +"></td>\n\
                                            <td class='opOperazioneClass'>"+ operazioni[i].cod_op_oro +"</td>\n\
                                            <td class='opDataClass'>"+ operazioni[i].data_op +"</td>\n\
                                            <td class='opGrammiClass'>"+ operazioni[i].grammi +" gr</td>\n\
                                            <td class='opCaratiClass'>"+ operazioni[i].carati +"</td>\n\
                                            <td class='opPrezzoClass'>"+ operazioni[i].prezzo +" CHF</td>\n\
                                            <td class='opTotaleClass'>"+ operazioni[i].totale +" CHF</td>\n\
                                            <td class='bottonTable'><button class='btn' \n\
                                                    onclick=\"popupCenter('oroWindow.php?idOp="+ operazioni[i].id +"&mode=Modifica','Operazioni', '500', '420');\">\n\
                                                    <span class='glyphicon glyphicon-pencil'></span>&nbsp;&nbsp;Modifica\n\
                                                </button>\n\
                                            </td>\n\
                                            <td class='bottonTable'><button type='button' class='btn' data-toggle='modal' data-op-id='"+ operazioni[i].id +"' data-target='.opDelete-ConfirmDiv'> \n\
                                                    <span class='glyphicon glyphicon-trash'></span>&nbsp;&nbsp;Cancella\n\
                                                </button>\n\
                                            </td>\n\
                                        </tr>";
                    }
                    operazioniDiv += "</table>";

                    $("#formLista").html(operazioniDiv);

                    $("#formLista").append("<div class='modal fade opDelete-ConfirmDiv' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'>\n\
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
                    $('#ListaOroBotton').removeClass('customHidden');

                    $("#tableListaOperazioni").tablesorter({
                        theme: 'blue',
                        headers: {
                            1: {sorter: false}
                        },//headers
                        // sort on the first column in ascending order
                        sortList: [0,0]
                    });

                }
                else{
                    $('#nessuna_op').fadeIn(2000);
                }
            },
            error: function(xhr, desc, err) {
                alert("Details: " + desc + "\nError:" + err);
            }
        });

        return false;
    });

    $(document).on('click','.checkClass',function(){
        var nCheck=$( ".checkClass :checked").length;
        if(nCheck==0){
            $('#CancellaSelezione').prop('disabled',true);
        } else{
            $('#CancellaSelezione').prop('disabled', false);}
    });

    $(document).on('click','#seltutte',function(){
        var nCheck=$( "#seltutte").is( ":checked" );

        if(nCheck){
            $('#CancellaSelezione').prop('disabled',false);
            $( ".checkClass").find('[type=checkbox]').each(function(){
                this.checked = true;
            });
        }
        else{
            $( ".checkClass").find('[type=checkbox]').each(function(){
                this.checked = false;
            });
            $('#CancellaSelezione').prop('disabled', true);
        }
    });


    $(document).on('click','#CancellaSelezione',function(){
        $( ".checkClass :checked").each(function(){
            var select = $(this);
            var idOp = select.attr('id');

            $.ajax({
                type: "POST",
                url: "phpFunctions/deleteOpOro.php",
                async:false,
                data: {idOp: idOp},
                success: function(data){
                    if (data==1){
                        //Cancello la riga relativa
                        var killrowString = "trIdOp_" + idOp;
                        var killrow = $("#"+killrowString+"");
                        killrow.addClass("danger");
                        killrow.fadeOut(2000, function(){
                            $(this).remove();
                            $('#caricaListaOperazioni').trigger('submit');
                        });
                    }
                    else{
                        $("#scrollingContent").html("");
                        $('#errore_cancellazione').fadeIn(2000);
                            setTimeout(function(){
                                location.reload();
                        }, 3000);
                    }
                },
                error: function(xhr, desc, err) {
                    alert("Errore. Impossibile eliminare L'Operazione");
                }
            });
        });
    });

    $(document).on("click", "#btnOpDelete", function(){
        var idOp = $('#modalDiv').html();

          $.ajax({
            type: "POST",
            url: "phpFunctions/deleteOpOro.php",
            data: {idOp: idOp},
            success: function(data)
            {
                if (data==1){
                    //Cancello la riga relativa
                    var killrowString = "trIdOp_" + idOp;
                    var killrow = $("#"+killrowString+"");
                    killrow.addClass("danger");
                    killrow.fadeOut(2000, function(){
                        $(this).remove();
                        $('#caricaListaOperazioni').trigger('submit');
                    });
                }
                else{
                    $("#scrollingContent").html("");
                    $('#errore_cancellazione').fadeIn(2000);
                        setTimeout(function(){
                            location.reload();
                    }, 3000);
                }
            },
            error: function(xhr, desc, err) {
                alert("Errore. Impossibile eliminare L'Operazione");
            }
        });

    });

    $(document).on("submit", "#nuovaOperazioneForm", function(){
        var btn= $(this).find("input[type=submit]:focus").prop('id');
        var html= $('#scrollingContent').html();

        var formData = $("#nuovaOperazioneForm").serialize();
        var dataOp= $('#dataora').val();
        var inpObj1 = $('#grammi').val();
        var inpObj2 = $('#prezzo').val();

        $("#scrollingContent").html("");
        $('#entryContainer').addClass("loadingOro");
        $('.alert').fadeOut();
        switch(btn){
            case 'newOpSalva':
                salvaNuovaOperazione(formData,dataOp, html);
                break;
            case 'newOpStampa':
                stampaNuovaOperazione(formData, dataOp, html);
                break;
            case 'newOpSalvaStampa':
                stampaNuovaOperazione(formData, dataOp, html);
                salvaNuovaOperazione(formData,dataOp, html);
                break;
        }
        if ($('#entryContainer').hasClass('loadingOro')){
            $('#entryContainer').removeClass("loadingOro");
        }

        return false;
    });

    $(document).on("click", "#nuova_op", function(e){
        e.preventDefault();
        $("#nuova_op").removeClass("active");
        $("#lista_op").removeClass("active");
        $(this).addClass("active");
        $('#nessuna_op').fadeOut();
        newOpOro();
    });

    $(document).on("click", "#lista_op", function(e){
        e.preventDefault();
        $('#successo').fadeOut();
        $("#nuova_op").removeClass("active");
        $("#lista_op").removeClass("active");
        $(this).addClass("active");
        loadOpOro();
    });

    $(document).on("show.bs.modal", ".opDelete-ConfirmDiv", function(e){
        var opId = $(e.relatedTarget).data('op-id');
        $(e.currentTarget).find('#modalDiv').html(opId);
    });

    $('#nuova_op').trigger('click');

});
