/**
 * Created by Sara on 16/01/2016.
 */

$(document).ready(function() {

    $( "#tasso" ).hide();
    $( "#valuta" ).hide();
    $( "#lista_valute_table" ).hide();

    $( "#add_valuta" ).click(function() {
        $( "#tasso" ).hide();
        $( "#valuta" ).show();
        $( "#lista_valute_table" ).hide();

    });
    $( "#add_tasso" ).click(function() {
        $( "#tasso" ).show();
        $( "#valuta" ).hide();
        $( "#lista_valute_table" ).hide();

    });

    $( "#edit_valuta" ).click(function() {
        $( "#tasso" ).hide();
        $( "#valuta" ).hide();
        $( "#lista_valute_table" ).show();

    });



    $(document).on('submit','#valuta', function(){

        var nome_valuta = $("#nome_valuta").val();
        var simbolo_valuta = $("#simbolo_valuta").val();

        $.ajax({
            type: "POST",
            url: "phpFunctions/add_valuta.php",
            data: {nome_valuta: nome_valuta, simbolo_valuta: simbolo_valuta },
            success: function(data)
            {
                var myresponse = $.parseJSON(data);
                alert(myresponse.msg);

            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });
    });


    $(document).on('click','#edit_valuta', function(){

        $.ajax({
            type: "GET",
            url: "phpFunctions/lista_valute.php",
            data: {},
            success: function(data) {
                var myresponse = $.parseJSON(data);
                if (myresponse.length>0) {

                    table = "<legend> Lista Valute </legend> <table  class='pure-table'> " +
                        "<thead> <tr> <th>Numero</th> <th>Nome Valuta</th> <th>Simbolo Valuta</th> <th>Modifica</th> <th>Cancella</th>" +
                        "</tr> </thead> ";
                    for (var i = 0; i <myresponse.length; i++) {
                        id = myresponse[i].id;
                        nome_valuta = myresponse[i].nome_valuta;
                        simbolo_valuta = myresponse[i].simbolo_valuta;

                        table += " <tr>" +
                            "<td id='id_valuta" + id + "'>" + id + "</td>" +
                            "<td id='nome_valuta" + id + "'>" + nome_valuta + "</td>" +
                            "<td id='simbolo_valuta" + id + "'>" + simbolo_valuta + "</td>" +
                            "<td align='center'><img class='img_icon' src='../img/edit_icon.png'></td>" +
                            "<td align='center'><a href='#'  onclick=window.open('delete_valuta.html?id="+id+"');><img class='img_icon' src='../img/delete_icon.png'></a></td>" +
                            "</tr>";


                    }

                    table +="</table>"

                        $('#lista_valute_table').html(table);
                }
                else{
                    msg += "<br>Nessuna Valuta Presente.";
                    $("#lista_valute_table").html(msg);
                }
            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });
    });



    $(document).on('click','#add_tasso', function(){

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



                    $('#valuta_da').append(voce_select_da);
                    $('#valuta_a').append(voce_select_a);
                    $('#valuta_a').attr('disabled',true);
                }
                else{
                    msg += "<br>Nessuna Valuta Presente.";
                    $("#lista_valute_table").html(msg);
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
    });
    $(document).on('change','#valuta_a', function(){

        var id = $(this).children(":selected").attr("value");
        $('#valuta_da').find('option').attr('disabled',false);
        $('#valuta_da').find('[value='+id+']').attr('disabled',true);
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
            alert(myresponse.msg);

        },
        error: function(xhr, desc, err) {
            //alert(xhr);
            alert("Details: " + desc + "\nError:" + err);
        }
    });
});
