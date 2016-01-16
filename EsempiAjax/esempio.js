/**
 * Created by Nadia on 16/01/2016.
 */

$(document).ready(function() {

    $(document).on('click','#button1', function(){
        $.ajax({
            type: "GET",
            url: "getFromServer.php",
            success: function(data)
            {
                var myresponse = $.parseJSON(data);
                var risultatoDiv = "Ho ottenuto " + myresponse.var1 + ",<br>e " + myresponse.var2;
                $("#risultato").html(risultatoDiv);
            },
            error: function(xhr, desc, err) {
                alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });
    });

    $(document).on('change','#select1', function(){
        var selectedOption = $(this).val();
        var altroValore = "altro";

        $.ajax({
            type: "POST",
            url: "postToServer.php",
            data: {selectedOption: selectedOption, altroValore: altroValore},
            success: function(data)
            {
                var myresponse = $.parseJSON(data);
                var risultatoDiv = "Ho scelto " + myresponse.mySelect + ",<br>e aggiunto " + myresponse.altro + ".";
                $("#risultato").html(risultatoDiv);
                //Se invece vuoi concatenare
                //$("#risultato").append("<br>" + risultatoDiv);
            },
            error: function(xhr, desc, err) {
                alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });
    });

});
