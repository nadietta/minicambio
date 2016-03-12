/**
 * Created by Nadia on 07/02/2016.
 */

$(document).ready(function() {

    $('#ListaBotton').addClass('customHidden');

    $('#a1').datetimepicker({
        lang: 'it',
        format:	'd/m/Y',
        timepicker: false,
        scrollMonth: false,
        maxDate: new Date(),
        onSelectDate: function(dateStr){
            $('#da1').datetimepicker({
                maxDate: dateStr
            });
        }
    });

    $('#da1').datetimepicker({
        lang: 'it',
        format:	'd/m/Y',
        timepicker: false,
        scrollMonth: false,
        maxDate: new Date(),
        onSelectDate: function(dateStr){
            $('#a1').datetimepicker({
                minDate: dateStr
            });
        }
    });

    $(document).on("change", ".dtp", function(){
        $('.xdsoft_datetimepicker').hide();
    });

    $('#da1').val(dateToString(new Date()));
    $('#a1').val(dateToString(new Date()));

    $(document).on("keypress",'body', function(e){
        if (e.which == 13) {
            return false;
        }
    });

    $(document).on("submit", "#listaOperazioniForm", function(){

        $("#scrollingContent").html("");
        $('#entryContainer').addClass("loading");
        $('.alert').fadeOut();

        $("#entryContainerTitle").html("Report Operazioni");
        var operazioniDiv = "";

        var checkedRadio = $("input[name='sceltaRadio']:checked").val();
        var whereVar= "";
        var da1 = $('#da1').val();
        var formattedDa1 = da1.substr(6,4)+"-"+da1.substr(3,2)+"-"+da1.substr(0,2);
        var a1 = $('#a1').val();
        var formattedA1 = a1.substr(6,4)+"-"+a1.substr(3,2)+"-"+a1.substr(0,2);
        whereVar = "data_op BETWEEN '"+formattedDa1+"' AND '"+formattedA1+"'+ INTERVAL 1 DAY";

        $.ajax({
            type: "POST",
            url: "phpFunctions/lista_operazioni_report.php",
            async: false,
            data: {where_data: whereVar},
            success: function(data) {
                var operazioni = $.parseJSON(data);
                var precData="";
                var valuta_entrata_prec="";
                var valuta_uscita_prec="";
                var mese_prec="";
                if (operazioni.length>0) {

                    operazioniDiv += "<br>\n\
                                    <table id='tableListaOperazioni' class='table table-hover'>\n\
                                      ";

                    for (var i = 0; i <operazioni.length; i++) {
                        //Se Cambia la data o le valute stampo il totale dell'ultimo giorno
                        if (valuta_entrata_prec != operazioni[i].fk_entrata ||
                            valuta_uscita_prec != operazioni[i].fk_uscita ||
                            precData != operazioni[i].data_op) {
                            if (i != 0) {

                                operazioniDiv += "<tr class='trTotaleReport' id='trIdOp_'><td class='hidden'></td>\n\
                                            <td class='opOperazioneClass'><b>TOTALE GIORNO</b></td>\n\
                                            <td class='opDataClass'><b>" + operazioni[i - 1].data_op + "</b></td>\n\
                                            <td class='opValutaEntrataClass'><b>" + operazioni[i - 1].valuta_entrata + "</b></td>\n\
                                            <td class='opImportoEntrataClass'><b>" + operazioni[i - 1].totale_entrata + "</b></td>\n\
                                            <td class='opTassoClass'><b>" + operazioni[i - 1].tasso_medio_giorno + "</b></td>\n\
                                            <td class='opValutaUscitaClass'><b>" + operazioni[i - 1].valuta_uscita + "</b></td>\n\
                                            <td class='opImportoUscitaClass'><b>" + operazioni[i - 1].totale_uscita + "</b></td>\n\
                                             </tr>";
                            }
                        }
                        //Se Cambia il mese o le valute stampo il totale dell'ultimo mese
                        if (valuta_entrata_prec != operazioni[i].fk_entrata ||
                            valuta_uscita_prec != operazioni[i].fk_uscita ||
                            (mese_prec != operazioni[i].mese && mese_prec!='')) {

                            if (i != 0) {
                                operazioniDiv += "<tr class='trTotaleReport' id='trIdOp_'><td class='hidden'></td>\n\
                                            <td class='opOperazioneClass'><b>TOTALE MESE</b></td>\n\
                                            <td class='opDataClass'><b>" + mese_corrente + "</b></td>\n\
                                            <td class='opValutaEntrataClass'><b>" + operazioni[i - 1].valuta_entrata + "</b></td>\n\
                                            <td class='opImportoEntrataClass'><b>" + operazioni[i - 1].totale_entrata_mese + "</b></td>\n\
                                            <td class='opTassoClass'><b>" + operazioni[i - 1].tasso_medio_mese + "</b></td>\n\
                                            <td class='opValutaUscitaClass'><b>" + operazioni[i - 1].valuta_uscita + "</b></td>\n\
                                            <td class='opImportoUscitaClass'><b>" + operazioni[i - 1].totale_uscita_mese + "</b></td>\n\
                                    </tr>";
                            }
                        }

                        //Se cambiano le valute stampo la nuova intestazione
                        //INTESTAZIONI *********
                        if (valuta_entrata_prec != operazioni[i].fk_entrata ||
                            valuta_uscita_prec != operazioni[i].fk_uscita) {
                            precData = '';
                            mese_prec = '';
                            operazioniDiv += "<tr> <td colspan='5'> <h2 class='titleReportValute'>" +
                                " DA  " + operazioni[i].valuta_entrata +" A "+ operazioni[i].valuta_uscita +"</h2></td ></tr>";
                            valuta_entrata_prec = operazioni[i].fk_entrata;
                            valuta_uscita_prec = operazioni[i].fk_uscita;
                        }
                        if(mese_prec!= operazioni[i].mese ) {
                            var mese_corrente = meseToString(operazioni[i].mese);
                            operazioniDiv += "<tr> <td colspan='5'> <h3 class='titleReportMese'>" +
                                 mese_corrente + " "+ operazioni[i].anno+" </h3></td ></tr>";
                            mese_prec = operazioni[i].mese;
                            precData = '';
                        }
                        if (precData != operazioni[i].data_op) {
                            operazioniDiv += "<tr> <td colspan='5'> <h3 class='titleReportGiorno'>"
                                + operazioni[i].data_op + "</h3></td ></tr><tr class='trIntestazioneReport'>"
                                + " <th class='hidden'>ID</th><th>OPERAZIONE</th><th>DATA</th><th>VALUTA ENTRATA</th>\n\
                                      <th>IMPORTO ENTRATA</th><th>TASSO</th><th>VALUTA USCITA</th><th>IMPORTO USCITA</th>\n\
                            </tr>";

                            precData = operazioni[i].data_op;
                        }
                        //INTESTAZIONI *********
                        operazioniDiv += "<tr id='trIdOp_" + operazioni[i].id + "'><td class='hidden'>" + operazioni[i].id + "</td>\n\
                                            <td class='opOperazioneClass'>" + operazioni[i].cod_op + "</td>\n\
                                            <td class='opDataClass'>" + operazioni[i].data_op + "</td>\n\
                                            <td class='opValutaEntrataClass'>" + operazioni[i].valuta_entrata + "</td>\n\
                                            <td class='opImportoEntrataClass'>" + operazioni[i].importo_entrata + "</td>\n\
                                            <td class='opTassoClass'>" + operazioni[i].tasso + "</td>\n\
                                            <td class='opValutaUscitaClass'>" + operazioni[i].valuta_uscita + "</td>\n\
                                            <td class='opImportoUscitaClass'>" + operazioni[i].importo_uscita + "</td>\n\
                                             </tr>";
                    }
                //per l'ultima riga stampo sia totale ultima data che totale mese
                    if(i==operazioni.length){
                                operazioniDiv += "<tr class='trTotaleReport' id='trIdOp_'><td class='hidden'></td>\n\
                                            <td class='opOperazioneClass'><b>TOTALE</b></td>\n\
                                            <td class='opDataClass'><b>"+ operazioni[i-1].data_op +"</b></td>\n\
                                            <td class='opValutaEntrataClass'><b>"+ operazioni[i-1].valuta_entrata +"</b></td>\n\
                                            <td class='opImportoEntrataClass'><b>"+ operazioni[i-1].totale_entrata +"</b></td>\n\
                                            <td class='opTassoClass'><b>"+ operazioni[i-1].tasso_medio_giorno +"</b></td>\n\
                                            <td class='opValutaUscitaClass'><b>"+ operazioni[i-1].valuta_uscita +"</b></td>\n\
                                            <td class='opImportoUscitaClass'><b>"+ operazioni[i-1].totale_uscita +"</b></td>\n\
                                            </tr>";
                                operazioniDiv += "<tr class='trTotaleReport' id='trIdOp_'><td class='hidden'></td>\n\
                                            <td class='opOperazioneClass'><b>TOTALE MESE</b></td>\n\
                                            <td class='opDataClass'><b>"+ mese_corrente+"</b></td>\n\
                                            <td class='opValutaEntrataClass'><b>"+ operazioni[i-1].valuta_entrata +"</b></td>\n\
                                            <td class='opImportoEntrataClass'><b>"+ operazioni[i-1].totale_entrata_mese +"</b></td>\n\
                                            <td class='opTassoClass'><b>"+ operazioni[i-1].tasso_medio_mese +"</b></td>\n\
                                            <td class='opValutaUscitaClass'><b>"+ operazioni[i-1].valuta_uscita +"</b></td>\n\
                                            <td class='opImportoUscitaClass'><b>"+ operazioni[i-1].totale_uscita_mese +"</b></td>\n\
                                     </tr>";


                    }
                    operazioniDiv += "</table>";

                    $('#entryContainer').removeClass("loading");
                    $("#scrollingContent").html(operazioniDiv);
                    $('#ListaBotton').removeClass('customHidden');
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

    $(document).on('click', '#Stampa', function(){
        var html= $('#scrollingContent').html();
        var data_da=$('#da1').val();
        var data_a=$('#a1').val();
        var data_stampa=data_da +" - "+data_a;

        $('#scrollingContent').html("");
        $('#entryContainer').addClass("loading");

        $.ajax({
            type: "POST",
            url: "../PDF/reportPrint.php",
            async: false,
            data: {html: html, data:data_stampa},
            success: function(data){
                $('#entryContainer').removeClass("loading");
                $('#scrollingContent').html(html);
                var nomepopup='stampa'+$.now();
                popupCenter(data,nomepopup, '500', '900');
            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });
        if ($('#entryContainer').hasClass('loading')){
            $('#entryContainer').removeClass("loading");
            $('#scrollingContent').html(html);
        }
    });

    /*$(document).on('click', '#Salva', function(){
        var html= $('#scrollingContent').html();
        var data_da=$('#da1').val();
        var data_a=$('#a1').val();
        var data_stampa=data_da +" - "+data_a;

        $.ajax({
            type: "POST",
            url: "../PDF/reportPrint.php",
            async: false,
            data: {html: html, data:data_stampa},
            success: function(data){
            $('#scarica').attr('href',data);
            $('#scarica').trigger('click');

            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });

    });*/


});