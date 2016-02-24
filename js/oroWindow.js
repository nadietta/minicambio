/**
 * Created by Nadia on 23/01/2016.
 */

function calcolaTotaleOro(){
    var grammi= $('#grammi').val();
    var prezzo= $('#prezzo').val();
    var totale=grammi*prezzo;
    $('#franchi').val(totale);
}

$(document).ready(function() {

    //* Campi da riempire in base a idVal presente o null */

    var idOp = $("#idOp").val();

    if (idOp){

        $.ajax({
            type: "POST",
            url: "phpFunctions/detailsOpOro.php",
            data: {idOp : idOp},
            success: function(data)
            {
                var oprazione = $.parseJSON(data);
                $('#dataora').val(oprazione['data_op']);
                $('#operazione').val(oprazione['cod_op_oro']);
                $('#prezzo').val(oprazione['prezzo']);
                $('#carati').val(oprazione['carati']);
                $('#grammi').val(oprazione['grammi']);
                $('#franchi').val(oprazione['totale']);


            },
            error: function(xhr, desc, err) {
                alert('err');
                alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }

        });

    }



    $(document).on("click", "#btnValSalva", function(){
        $('#nuovaOperazioneForm').trigger('submit');
    });
    //* ----------------------------------  */




    $(document).on("submit", "#nuovaOperazioneForm", function(e){
        e.preventDefault();
            //alert("submit");
            var idOp = $('#idOp').val();
            var mode = $('#mode').val();
            var formData = $("#nuovaOperazioneForm").serialize();
            var formDataCommit = false;
                $.ajax({
                    type: "POST",
                    url: "phpFunctions/updateOpOro.php",
                    data: {formData: formData, idOp: idOp},
                    success: function(data)
                    {
                        //Aggiorno le informazioni anche sulla finestra chiamante
                        var updaterowString = "trIdOp_" + idOp;
                        var updaterow = $("#"+updaterowString+"", window.opener.document);
                        updaterow.find('.opPrezzoClass').html($('#prezzo').val()+'CHF');
                        updaterow.find('.opCaratiClass').html($('#carati').val());
                        updaterow.find('.opGrammiClass').html($('#grammi').val()+' gr');
                        updaterow.find('.opTotaleClass').html($('#franchi').val()+' CHF');
                        window.close();
                    },
                    error: function(xhr, desc, err) {
                        //alert(xhr);
                        //alert("Details: " + desc + "\nError:" + err);
                        alert("Errore");
                    }
                });


        return isFormValid;

    });

    $(document).on('keyup','#grammi', function(){
        calcolaTotaleOro();
    });
    $(document).on('keyup','#prezzo', function(){
        calcolaTotaleOro();
    });


});