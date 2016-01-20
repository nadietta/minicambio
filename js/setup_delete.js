/**
 * Created by Sara on 16/01/2016.
 */
$(document).ready(function() {
$(document).on('submit','#delete_valuta', function(){
    alert('');
    var id = $.url.attr('id')
   alert(id);
    /**

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
**/

});
});

