/**
 * Created by Nadia on 11/02/2016.
 */
Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

function calcolaUscita(){
    var tipo_operazione =$('#opTipoOp').val();
    var tasso =$('#tassoOperazione').val();
    var entrata =$('#entrataOperazione').val();
    entrata=entrata.replace(',', '.' );
    var uscita=0;

    switch (tipo_operazione){
        case '0'://acquisto DB tipo_op=0 operazione
            uscita=entrata*tasso;
            $('#uscitaOperazione').val(uscita);
            break;
        case '1'://vendita DB tipo_op=1 operazione
            uscita=entrata/tasso;
            $('#uscitaOperazione').val(uscita);
            break;
    }

}

$(document).ready(function() {

    var idOp = $("#idOp").val();

    if (idOp){

        $.ajax({
            type: "POST",
            url: "phpFunctions/detailsOp.php",
            data: {idOp : idOp},
            success: function(data)
            {
                var operazione = $.parseJSON(data);

                $("#valuteOperazioneTitle").html("DA "+operazione.valuta_entrata+" A "+operazione.valuta_uscita);
                $("#opTipoOp").val(operazione.tipo_op);
                $("#dataOperazione").val(operazione.data_op);
                $("#entrataOperazione").val(operazione.importo_entrata);
                $("#uscitaOperazione").val(operazione.importo_uscita);
                $("#tassoOperazione").val(operazione.optasso);
            },
            error: function(xhr, desc, err) {
                alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });
    }

    $(document).on('keyup','#tassoOperazione', function(){
        calcolaUscita ();
    });

    $(document).on('keyup','#entrataOperazione', function(){
        calcolaUscita();
    });

    $(document).on("submit", "#operazioniWindowForm", function(e){
        e.preventDefault();

        var idOp = $('#idOp').val();
        var tassoOperazione = $('#tassoOperazione').val();
        var entrataOperazione = $('#entrataOperazione').val();
        var uscitaOperazione = $('#uscitaOperazione').val();

        $.ajax({
            type: "POST",
            url: "phpFunctions/updateOp.php",
            data: {idOp : idOp, tassoOperazione : tassoOperazione, entrataOperazione : entrataOperazione, uscitaOperazione : uscitaOperazione},
            success: function(data)
            {
                var risultato = $.parseJSON(data);
                $("#operazioniWindowForm").html("");
                if (risultato.errore){
                    $('#errore').fadeIn(2000, function(){
                        window.close();
                    });
                }
                else{
                    $('#successo').fadeIn(2000, function(){
                        //Aggiorno le informazioni anche sulla finestra chiamante
                        var updaterowString = "trIdOp_" + idOp;
                        var updaterow = $("#"+updaterowString+"", window.opener.document);
                        updaterow.find('.opImportoEntrataClass').html(parseFloat(entrataOperazione).format(2, 3, '.', ','));
                        updaterow.find('.opImportoUscitaClass').html(parseFloat(uscitaOperazione).format(2, 3, '.', ','));
                        updaterow.find('.opTassoClass').html(parseFloat(tassoOperazione).format(4, 3, '.', ','));
                        window.close();
                    });
                }

            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                //alert("Details: " + desc + "\nError:" + err);
                alert("Errore");
            }
        });


    });

});