/**
 * Created by Nadia on 23/01/2016.
 */
function popupCenter(url, title, w, h) {
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/3)-(h/3);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}


function getCurrentDateTime(){
    var currentDateTime = "";

    $.ajax({
        type: "GET",
        url: "phpFunctions/getCurrentDateTime.php",
        async: false,
        success: function(data) {
            var risultato = $.parseJSON(data);
            currentDateTime = risultato.mydate + " " + risultato.mytime;
            //currentDateTime = data;

        },
        error: function(xhr, desc, err) {
            //alert(xhr);
            alert("Details: " + desc + "\nError:" + err);
        }
    });

    return currentDateTime;
}


function newOpOro(){
    $("#entryContainerTitle").html("Nuova Operazione: ORO");
    $("#formLista").addClass('customHidden');
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
    $('#franchi').val(totale);


}

function setNumOpOro(){
    var lastOperazione = "";
    $.ajax({
        type: "GET",
        url: "phpFunctions/getLastOperazioneOro.php",
        success: function(data) {
            lastOperazione= data;
            $('#operazione').val(lastOperazione);
        },
        error: function(xhr, desc, err) {
            //alert(xhr);
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


    $('#da').datetimepicker({
        lang: 'it',
        format:	'd/m/Y',
        timepicker: false
    });

    $('#a').datetimepicker({
        lang: 'it',
        format:	'd/m/Y',
        timepicker: false

    });


    $(document).on("change", ".dtp", function(){
        $('.xdsoft_datetimepicker').hide();

    });


    $(document).on('keyup','#grammi', function(){
        calcolaTotaleOro();
    });
    $(document).on('keyup','#prezzo', function(){
        calcolaTotaleOro();
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
                                          <th class='hidden'>ID</th><th>OPERAZIONE</th><th class='shortDate dateFormat-ddmmyyyy'>DATA</th><th>GRAMMI</th>\n\
                                          <th>CARATI</th><th>PREZZO</th><th>TOTALE (CHF)</th>\n\
                                         \n\
                                      </tr></thead> ";

                    for (var i = 0; i < operazioni.length; i++) {

                        operazioniDiv += "<tr id='trIdOp_"+ operazioni[i].id +"'><td class='hidden'>"+ operazioni[i].id +"</td>\n\
                                            <td class='opOperazioneClass'>"+ operazioni[i].cod_op_oro +"</td>\n\
                                            <td class='opDataClass'>"+ operazioni[i].data_op +"</td>\n\
                                            <td class='opGrammiClass'>"+ operazioni[i].grammi +" gr</td>\n\
                                            <td class='opCaratiClass'>"+ operazioni[i].carati +"</td>\n\
                                            <td class='opPrezzoClass'>"+ operazioni[i].prezzo +" CHF</td>\n\
                                            <td class='opTotaleClass'>"+ operazioni[i].totale +" CHF</td>\n\
                                            <td><button class='btn' \n\
                                                    onclick=\"popupCenter('oroWindow.php?idOp="+ operazioni[i].id +"&mode=Modifica','Operazioni', '500', '420');\">\n\
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



                }
                else{
                  //  msg = "<br>Nessuna Operazione Presente.";
                 //   $("#formLista").html(msg);
                    $('#nessuna_op').fadeIn(2000);
                }
            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }

        });
        $("#tableListaOperazioni").tablesorter({
            theme: 'blue',
            // sort on the first column in ascending order
            sortList: [0,0]
        });
        return false;
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
                    $('#errore_cancellazione').fadeIn(2000, function(){
                        location.reload();
                    });


                }
            },
            error: function(xhr, desc, err) {
                alert("Errore. Impossibile eliminare L'Operazione");
            }
        });

    });

    $(document).on("submit", "#nuovaOperazioneForm", function(){
        var formData = $("#nuovaOperazioneForm").serialize();
        var formDataCommit = false;
        var msg='';
        $.ajax({
            type: "POST",
            url: "phpFunctions/addOperazioneOro.php",
            data: {formData: formData},
            async: false,

            success: function(data) {
                var risultato = $.parseJSON(data);
                $("#scrollingContent").html("");
                if (risultato.errore){
                    $('#errore').fadeIn(2000, function(){
                        location.reload();
                    });
                }
                else{
                    if(risultato.messaggio){
                        $('#successo').fadeIn(1500, function(){
                            location.reload();
                        });
                    }
                    //formDataCommit = true;
                }
            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });
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
