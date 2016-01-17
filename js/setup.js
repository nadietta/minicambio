/**
 * Created by Sara on 16/01/2016.
 */

$(document).ready(function() {

    $( "#tasso" ).hide();
    $( "#valuta" ).hide();
<<<<<<< Updated upstream
=======
    $( "#lista_valute_table" ).hide();
    $.ajax({
        url: 'menu.php'
    }).done(function(data) {
        $('#menu').append(data);
    });
>>>>>>> Stashed changes

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
            success: function(data)
            {
                var myresponse = $.parseJSON(data);
                alert(myresponse);


            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });
    });

});
