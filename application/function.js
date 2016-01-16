/**
 * Created by Sara on 16/01/2016.
 */

$(document).ready(function() {

    $( "#tasso" ).hide();
    $( "#valuta" ).hide();
    $.ajax({
        url: 'menu.php'
    }).done(function(data) {
        $('#menu').append(data);
    });

    $( "#add_valuta" ).click(function() {
        $( "#tasso" ).hide();
        $( "#valuta" ).show();

    });
    $( "#add_tasso" ).click(function() {
        $( "#tasso" ).show();
        $( "#valuta" ).hide();

    });

    $(document).on('click','#add_valuta_function', function(){
        var nome_valuta = $("#nome_valuta").val();
        var simbolo_valuta = $("#simbolo_valuta").val();

        $.ajax({
            type: "POST",
            url: "add_valuta.php",
            data: {},
            success: function(data)
            {
                var myresponse = $.parseJSON(data);
                alert(myresponse);

                //Se invece vuoi concatenare
                //$("#risultato").append("<br>" + risultatoDiv);
            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });
    });

});
