/**
 * Created by Nadia on 07/02/2016.
 */


function meseToString(mese)
{
   switch (mese){
       case '1': return "GENNAIO";
       case '2': return "FEBBRAIO";
       case '3': return "MARZO";
       case '4': return "APRILE";
       case '5': return "MAGGIO";
       case '6': return "GIUGNO";
       case '7': return "LUGLIO";
       case '8': return "AGOSTO";
       case '9': return "SETTEMBRE";
       case '10': return "OTTOBRE";
       case '11': return "NOVEMBRE";
       case '12': return "DICEMBRE";
   }
    return mese;
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



    $(document).on("submit", "#listaOperazioniForm", function(){
        //TODO: paginazione risultati
        //TODO: filtri di ordinamento
        $("#entryContainerTitle").html("Report Operazioni");
        $("#entryContainer").html("");
        var operazioniDiv = "";

        var checkedRadio = $("input[name='sceltaRadio']:checked").val();
        var whereVar= "";
        var da1 = $('#da1').val();
        var formattedDa1 = da1.substr(6,4)+"-"+da1.substr(3,2)+"-"+da1.substr(0,2);
        var a1 = $('#a1').val();
        var formattedA1 = a1.substr(6,4)+"-"+a1.substr(3,2)+"-"+a1.substr(0,2);
        whereVar = "data_op BETWEEN '"+formattedDa1+"' AND '"+formattedA1+"'";

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

                                operazioniDiv += "<tr id='trIdOp_'><td class='hidden'></td>\n\
                                            <td class='opOperazioneClass'>TOTALE</td>\n\
                                            <td class='opDataClass'>" + operazioni[i - 1].data_op + "</td>\n\
                                            <td class='opValutaEntrataClass'>" + operazioni[i - 1].valuta_entrata + "</td>\n\
                                            <td class='opImportoEntrataClass'>" + operazioni[i - 1].totale_entrata + "</td>\n\
                                            <td class='opValutaUscitaClass'>" + operazioni[i - 1].valuta_uscita + "</td>\n\
                                            <td class='opImportoUscitaClass'>" + operazioni[i - 1].totale_uscita + "</td>\n\
                                            <td class='opTassoClass'>" + operazioni[i - 1].tasso_medio_giorno + "</td>\n\   " +
                                    "</tr>";
                            }
                        }
                        //Se Cambia il mese o le valute stampo il totale dell'ultimo mese
                        if (valuta_entrata_prec != operazioni[i].fk_entrata ||
                            valuta_uscita_prec != operazioni[i].fk_uscita ||
                            mese_prec != operazioni[i].mese) {

                            if (i != 0) {
                                operazioniDiv += "<tr id='trIdOp_'><td class='hidden'></td>\n\
                                            <td class='opOperazioneClass'>TOTALE MESE</td>\n\
                                            <td class='opDataClass'>" + mese_corrente + "</td>\n\
                                            <td class='opValutaEntrataClass'>" + operazioni[i - 1].valuta_entrata + "</td>\n\
                                            <td class='opImportoEntrataClass'>" + operazioni[i - 1].totale_entrata_mese + "</td>\n\
                                            <td class='opValutaUscitaClass'>" + operazioni[i - 1].valuta_uscita + "</td>\n\
                                            <td class='opImportoUscitaClass'>" + operazioni[i - 1].totale_entrata_mese + "</td>\n\
                                            <td class='opTassoClass'>" + operazioni[i - 1].tasso_medio_mese + "</td>\n\   " +
                                    "</tr>";
                            }
                            var mese_corrente = meseToString(operazioni[i].mese);
                            operazioniDiv += "<tr> <td colspan='5'> <h2 class='title'>" +
                                " MESE: " + mese_corrente + " </h2></td ></tr>";
                            mese_prec = operazioni[i].mese;
                        }
                        //Se cambiano le valute stampo la nuova intestazione
                        if (valuta_entrata_prec != operazioni[i].fk_entrata ||
                            valuta_uscita_prec != operazioni[i].fk_uscita) {
                            precData = '';
                            operazioniDiv += "<tr> <td colspan='5'> <h2 class='title'>" + "  Da " + operazioni[i].valuta_entrata + " A " +
                                operazioni[i].valuta_uscita + "</h2></td ></tr>";


                            if (precData != operazioni[i].data_op) {
                                operazioniDiv += "<tr> <td colspan='5'> <h2 class='title'>" +
                                    " Data  " + operazioni[i].data_op + "</h2></td ></tr><tr>"
                                    + " <th class='hidden'>ID</th><th>OPERAZIONE</th><th>DATA</th><th>VALUTA ENTRATA</th>\n\
                                      <th>IMPORTO ENTRATA</th><th>VALUTA USCITA</th><th>IMPORTO USCITA</th>\n\
                                      <th>TASSO</th>\n\
                                  </tr>";

                                precData = operazioni[i].data_op;
                            }
                            valuta_entrata_prec = operazioni[i].fk_entrata;
                            valuta_uscita_prec = operazioni[i].fk_uscita;
                        }
                        operazioniDiv += "<tr id='trIdOp_" + operazioni[i].id + "'><td class='hidden'>" + operazioni[i].id + "</td>\n\
                                            <td class='opOperazioneClass'>" + operazioni[i].cod_op + "</td>\n\
                                            <td class='opDataClass'>" + operazioni[i].data_op + "</td>\n\
                                            <td class='opValutaEntrataClass'>" + operazioni[i].valuta_entrata + "</td>\n\
                                            <td class='opImportoEntrataClass'>" + operazioni[i].importo_entrata + "</td>\n\
                                            <td class='opValutaUscitaClass'>" + operazioni[i].valuta_uscita + "</td>\n\
                                            <td class='opImportoUscitaClass'>" + operazioni[i].importo_uscita + "</td>\n\
                                            <td class='opTassoClass'>" + operazioni[i].tasso + "</td>\n\   " +
                            "</tr>";
                    }
                //per l'ultima riga stampo sia totale ultima data che totale mese
                    if(i==operazioni.length){
                                operazioniDiv += "<tr id='trIdOp_'><td class='hidden'></td>\n\
                                            <td class='opOperazioneClass'>TOTALE</td>\n\
                                            <td class='opDataClass'>"+ operazioni[i-1].data_op +"</td>\n\
                                            <td class='opValutaEntrataClass'>"+ operazioni[i-1].valuta_entrata +"</td>\n\
                                            <td class='opImportoEntrataClass'>"+ operazioni[i-1].totale_entrata +"</td>\n\
                                            <td class='opValutaUscitaClass'>"+ operazioni[i-1].valuta_uscita +"</td>\n\
                                            <td class='opImportoUscitaClass'>"+ operazioni[i-1].totale_uscita +"</td>\n\
                                            <td class='opTassoClass'>"+ operazioni[i-1].tasso_medio_giorno +"</td>\n\   " +
                                    "</tr>";
                                operazioniDiv += "<tr id='trIdOp_'><td class='hidden'></td>\n\
                                            <td class='opOperazioneClass'>TOTALE MESE</td>\n\
                                            <td class='opDataClass'>"+ mese_corrente+"</td>\n\
                                            <td class='opValutaEntrataClass'>"+ operazioni[i-1].valuta_entrata +"</td>\n\
                                            <td class='opImportoEntrataClass'>"+ operazioni[i-1].totale_entrata_mese +"</td>\n\
                                            <td class='opValutaUscitaClass'>"+ operazioni[i-1].valuta_uscita +"</td>\n\
                                            <td class='opImportoUscitaClass'>"+ operazioni[i-1].totale_entrata_mese +"</td>\n\
                                            <td class='opTassoClass'>"+ operazioni[i-1].tasso_medio_mese +"</td>\n\   " +
                                    "</tr>";


                    }
                    operazioniDiv += "</table>";
                    $("#entryContainer").html(operazioniDiv);

                }
                else{
                    msg += "<br>Nessuna Operazione Presente.";
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


});