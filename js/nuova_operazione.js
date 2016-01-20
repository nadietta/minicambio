/**
 * Created by Sara on 16/01/2016.
 */

$(document).ready(function() {

    $( "#soldi_change" ).hide();
    $( "#oro_change" ).hide();
    $( "#form_operazione" ).hide();


    $( "#menuSoldi" ).click(function() {
        $( "#oro_change" ).hide();
        $( "#soldi_change" ).show();
        $( "#form_operazione" ).hide();

    });
    $( "#menuOro" ).click(function() {
        $( "#oro_change" ).show();
        $( "#soldi_change" ).hide();
        $( "#form_operazione" ).hide();

    });



    $(document).on('click','#menuSoldi', function(){

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

    });


    $(document).on('change','#valuta_da', function(){

        var id = $(this).children(":selected").attr("value");
        $('#valuta_a').attr('disabled',false);
        $('#valuta_a').find('option').attr('disabled',false);
        $('#valuta_a').find('[value='+id+']').attr('disabled',true);
        var id_da = $('#valuta_da').children(":selected").attr("value");
        var id_a = $('#valuta_a').children(":selected").attr("value");
        if(id_a != undefined && id_da != undefined){
            var now = new Date();
            var day = now.getDate();
            alert(day);
            $( "#form_operazione" ).show();
            $( "#oggi").val(today);
        }


    });
    $(document).on('change','#valuta_a', function(){

        var id = $(this).children(":selected").attr("value");
        $('#valuta_da').find('option').attr('disabled',false);
        $('#valuta_da').find('[value='+id+']').attr('disabled',true);
        var id_da = $('#valuta_da').children(":selected").attr("value");
        var id_a = $('#valuta_a').children(":selected").attr("value");
        if(id_a != undefined && id_da != undefined){
            $( "#form_operazione" ).show();
        }

    });


    $(document).on('click','#reverse', function(){
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
    });

});

$(document).on('submit','#tasso', function(){

    var id_da = $('#valuta_da').children(":selected").attr("value");
    var id_a = $('#valuta_a').children(":selected").attr("value");
    var tasso = $('#valore_tasso').val();

    $.ajax({
        type: "POST",
        url: "phpFunctions/add_tasso.php",
        data: {valuta_da: id_da, valuta_a: id_a, tasso: tasso},
        success: function(data)
        {
            var myresponse = $.parseJSON(data);

            $('#risposta').html('<h2>'+myresponse.msg+'</h2>');

        },
        error: function(xhr, desc, err) {
            //alert(xhr);
            $('#risposta').html('<h2>'+'ERRORE: Riprovare'+'</h2>');
        }
    });
    $( "#tasso" ).hide();


});
