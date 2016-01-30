/**
 * Created by Nadia on 30/01/2016.
 */
function getValute(){
    var selectValute = "";

    $.ajax({
        type: "GET",
        async: false,
        url: "phpFunctions/lista_valute.php",
        success: function(data) {
            var valute = $.parseJSON(data);
            if (valute.length) {
                selectValute += "<option selected disabled>Scegli Valuta</option>";
                for (var i = 0; i < valute.length; i++) {
                    selectValute += "<option value='"+ valute[i].id +"'>"+ valute[i].nome_valuta +"</option>";
                }
            }
            else{
                selectValute += "<option selected disabled>Scegli Valuta</option>";
            }
        },
        error: function(xhr, desc, err) {
            //alert(xhr);
            alert("Details: " + desc + "\nError:" + err);
        }
    });

    return selectValute;
}


$(document).ready(function() {

    selectValute = getValute();
    $('#valutaEntrata').html(selectValute);
    $('#valutaUscita').html(selectValute);

});