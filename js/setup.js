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
                            "<td align='center'><img class='img_icon' src='../img/delete_icon.png'></td>" +
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



});

