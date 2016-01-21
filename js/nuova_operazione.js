/**
 * Created by Sara on 16/01/2016.
 */

$(document).ready(function() {


    $( ".form_operazione" ).hide();




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
    var tipo_operazione =$('#tipo_op').val();
    var tasso =$('#tasso').val();
    var entrata =$('#entrata').val();
    var uscita=0;
    //acquisto DB tipo_op=0 operazione *
    //vendita DB tipo_op=1 operazione /
    switch (tipo_operazione){
        case '0':    uscita=entrata*tasso;
            break;
        case '1':
            uscita=entrata/tasso;
            break;
        case '-1':    uscita=0;
            break;
    }
    $('#uscita').val(uscita);


}
$(document).on('keyup','#entrata', function(){
    calcolaUscita ();
});

$(document).on('keyup','#tasso', function(){
    calcolaUscita ();
});

$(document).on('submit','#soldi_change', function(){
    var id_da = $('#valuta_da').children(":selected").attr("value");
    var id_a = $('#valuta_a').children(":selected").attr("value");
    var entrata =$('#entrata').val();
    var uscita=$('#uscita').val();
    var tasso=$('#tasso').val();
    var num_op=$('#numop').val();
    var tipo_op=$('#tipo_op').val();
    $.ajax({
        type: "POST",
        url: "phpFunctions/add_operazione.php",
        data: {num_op: num_op, valuta_a: id_a,valuta_da: id_da, tasso: tasso,
                 entrata: entrata, uscita: uscita, tipo_op: tipo_op},
        success: function(data)
        {
            var myresponse = $.parseJSON(data);
            alert(myresponse.msg);

            $('#risposta').html('<h2>'+myresponse.msg+'</h2>');

        },
        error: function(xhr, desc, err) {
            //alert(xhr);


            $('#risposta').html('<h2>'+'ERRORE: Riprovare'+'</h2>');
        }
    });
});

