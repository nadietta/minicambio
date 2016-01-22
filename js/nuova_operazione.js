/**
 * Created by Sara on 16/01/2016.
 */

$(document).ready(function() {


    $( ".form_operazione" ).hide();
    $(".doppio_cambio").hide();

    $("#bottoni").hide();

    $.ajax({
            type: "GET",
            url: "phpFunctions/lista_valute.php",
            data: {},
            success: function(data) {
                var myresponse = $.parseJSON(data);
                if (myresponse.length>0) {
                    voce_select_da="<option label='Scegli valuta'></option>";
                    voce_select_a="<option label='Scegli valuta'></option>";

                    for (var i = 0; i <myresponse.length; i++) {
                        id = myresponse[i].id;
                        nome_valuta = myresponse[i].nome_valuta;
                        simbolo_valuta = myresponse[i].simbolo_valuta;
                        valuta=nome_valuta +" ("+ simbolo_valuta+")";
                        voce_select_da += " <option value="+id+">"+valuta+"</option>";

                        if(i==0)
                            voce_select_a += " <option value=" + id + ">" + valuta + "</option>";

                        else  voce_select_a += " <option value=" + id + ">" + valuta + "</option>";
                    }



                    $('#valuta_da').html(voce_select_da);
                    $('#valuta_a').html(voce_select_a);
                    $('#valuta_a').attr('disabled',true);
                }
                else{
                    msg += "<br>Nessuna Valuta Presente.";

                }
            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });




    $(document).on('change','#valuta_da', function(){
        $("#tasso").val('');
        $("#tipo_op").val('');
        $('#entrata').val('');
        $('#uscita').val('');
        $(".doppio_cambio").hide();
        var id = $(this).children(":selected").attr("value");
        $('#valuta_a').attr('disabled',false);
        $('#valuta_a').find('option').attr('disabled',false);
        $('#valuta_a').find('[value='+id+']').attr('disabled',true);
        var id_da = $('#valuta_da').children(":selected").attr("value");
        var id_a = $('#valuta_a').children(":selected").attr("value");
        if(id_a != undefined && id_da != undefined){
            getDati(id_da, id_a);
        }


    });
    function getDati(id_da, id_a){
        var formattedDate = new Date();
        var d = formattedDate.getDate();
        var m =  formattedDate.getMonth();
        m += 1;
        if(m < 10) m='0'+m;

        var h =  formattedDate.getHours();
        var min =  formattedDate.getMinutes();
        var sec= formattedDate.getSeconds();
        var y = formattedDate.getFullYear();
        $( ".form_operazione" ).show();
        $(".doppio_cambio").hide();
        var today=(d+'/'+m+'/'+y+' '+h+':'+min+':'+sec);
        $( "#oggi").val(today);

        $.ajax({
            type: "POST",
            url: "phpFunctions/nuova_op_dati.php",
            data: {valuta_da: id_da, valuta_a: id_a, cod: y+''+m},
            success: function(data) {
                var myresponse = $.parseJSON(data);
                $("#numop").val(myresponse.cod_op);
                $("#tasso").val(myresponse.tasso);
                $("#tipo_op").val(myresponse.tipo_op);
                if(myresponse.tipo_op=='-1'){
                   $(".doppio_cambio").show();
                    $("#numop_2").val(myresponse.cod_op_2);
                    $("#tasso_2").val(myresponse.tasso_due);
                    var valuta_1=myresponse.valuta_1;
                    var valuta_2=myresponse.valuta_2;
                    $("#label_da").html('<h2>Operazione doppia: Da '+valuta_1+' A Franco<h2>');
                    $("#label_a").html('<h2>Operazione doppia: Da Franco A '+valuta_2+'<h2>');
                }
            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }

        });

    }
    $(document).on('change','#valuta_a', function(){
        $("#tasso").val('');
        $("#tipo_op").val('');
        $('#entrata').val('');
        $('#uscita').val('');
        $(".doppio_cambio").hide();
        var id = $(this).children(":selected").attr("value");
        $('#valuta_da').find('option').attr('disabled',false);
        $('#valuta_da').find('[value='+id+']').attr('disabled',true);
        var id_da = $('#valuta_da').children(":selected").attr("value");
        var id_a = $('#valuta_a').children(":selected").attr("value");
        if(id_a != undefined && id_da != undefined){

                getDati(id_da,id_a);

        }

    });


    $(document).on('click','#reverse', function(){
        $("#tasso").val('');
        $("#tipo_op").val('');
        $('#entrata').val('');
        $('#uscita').val('');
        $(".doppio_cambio").hide();
        var id_da = $('#valuta_da').children(":selected").attr("value");
        var id_a = $('#valuta_a').children(":selected").attr("value");
        $('#valuta_a').find('option').attr('disabled',false);
        $('#valuta_da').find('option').attr('disabled',false);
        $('#valuta_a').find('[value='+id_a+']').attr('disabled',true);
        $('#valuta_da').find('[value='+id_da+']').attr('disabled',true)
        $('#valuta_a').find('[value='+id_a+']').attr('selected',false);
        $('#valuta_da').find('[value='+id_da+']').attr('selected',false);
        $('#valuta_a').find('[value='+id_da+']').attr('selected',true);
        $('#valuta_da').find('[value='+id_a+']').attr('selected',true);
        if(id_a != undefined && id_da != undefined){

            getDati(id_a,id_da);

        }

    });

});



function calcolaUscita (){
    var id_da = $('#valuta_da').children(":selected").attr("value");
    var id_a = $('#valuta_a').children(":selected").attr("value");
   // getDatiDoppioChange(id_da,id_a);
    var tipo_operazione =$('#tipo_op').val();
    var tasso =$('#tasso').val();
    var entrata =$('#entrata').val();
    entrata=entrata.replace(',', '.' );
    var uscita=0;
    //acquisto DB tipo_op=0 operazione *
    //vendita DB tipo_op=1 operazione /
    switch (tipo_operazione){
        case '0':
            $(".doppio_cambio").hide();
            uscita=entrata*tasso;
            $('#uscita').val(uscita);
            break;
        case '1':
            $(".doppio_cambio").hide();
            uscita=entrata/tasso;
            $('#uscita').val(uscita);
            break;
        case '-1':
            $(".doppio_cambio").show();
            calcolaUscitaCombinata ();
            uscita=0;
            break;
    }


    $("#bottoni").show();
}


function calcolaUscitaCombinata(){

    var tasso =$('#tasso').val();
    var tasso_2 =$('#tasso_2').val();
    var entrata =$('#entrata').val();
    entrata=entrata.replace(',', '.' );
    var uscita=entrata/tasso;

    $('#entrata_2').val(uscita);
    $('#uscita').val( uscita);
    uscita_2=uscita*tasso_2;
    $('#uscita_2').val(uscita_2);
}




$(document).on('keyup','#entrata', function(){
    calcolaUscita ();
});

$(document).on('keyup','#tasso', function(){
    calcolaUscita ();
});

$(document).on('submit','#soldi_change', function(){


    var id_a = $('#valuta_a').children(":selected").attr("value");
    var id_da = $('#valuta_da').children(":selected").attr("value");
    var tipo_op=$('#tipo_op').val();

    if(tipo_op=='-1') {
        var id_a = 1;
        var id_da = $('#valuta_da').children(":selected").attr("value");
        var entrata =$('#entrata_2').val();
        var uscita=$('#uscita_2').val();
        var tasso=$('#tasso_2').val();
        var num_op=$('#numop_2').val();


        $.ajax({
            type: "POST",
            url: "phpFunctions/add_operazione.php",
            data: {
                num_op: num_op, valuta_a: id_a, valuta_da: id_da, tasso: tasso,
                entrata: entrata, uscita: uscita, tipo_op: '0'
            },
            success: function (data) {
                var myresponse = $.parseJSON(data);
                alert(myresponse.msg);

               // $('#risposta').html('<h2>' + myresponse.msg + '</h2>');

            },
            error: function (xhr, desc, err) {
                //alert(xhr);


                $('#risposta').html('<h2>' + 'ERRORE: Riprovare' + '</h2>');
            }
        });

        // sovrascrivo il tipo_op  per l'operzione successiva
        tipo_op='1';
        id_da=1;
        id_a = $('#valuta_a').children(":selected").attr("value");

    }
    var entrata =$('#entrata').val();
    var uscita=$('#uscita').val();
    var tasso=$('#tasso').val();
    var num_op=$('#numop').val();

        $.ajax({
            type: "POST",
            url: "phpFunctions/add_operazione.php",
            data: {
                num_op: num_op, valuta_a: id_a, valuta_da: id_da, tasso: tasso,
                entrata: entrata, uscita: uscita, tipo_op: tipo_op
            },
            success: function (data) {
                var myresponse = $.parseJSON(data);
                alert(myresponse.msg);

                $('#risposta').html('<h2>' + myresponse.msg + '</h2>');

            },
            error: function (xhr, desc, err) {
                //alert(xhr);


                $('#risposta').html('<h2>' + 'ERRORE: Riprovare' + '</h2>');
            }
        });


});

