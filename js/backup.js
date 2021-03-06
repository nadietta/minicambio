/**
 * Created by Sara on 21/02/2016.
 */

function ultimo_backup(){
    var res;
    $.ajax({
        type: "GET",
        url: "phpFunctions/getLastBackup.php",
        async: false,
        success: function(data) {
            res=data;
            return data;
        },
        error: function(xhr, desc, err) {
            //alert(xhr);
            alert("Details: " + desc + "\nError:" + err);
        }
    });
    return res;
}

$(document).ready(function(){

    var lastBackup=ultimo_backup();
    if(lastBackup){
        $('#info_ultimo_backup').html("<strong>Info!</strong> Ultimo Backup effettuato il: "+lastBackup);
        $('#info_ultimo_backup').fadeIn(3000);
    }else{
        $('#nessun_backup').fadeIn(3000);
    }

    $(document).on("keypress",'body', function(e){
        if (e.which == 13) {
            return false;
        }
    });

    $(document).on("click","#esegui_backup", function(e){
        e.preventDefault();
        $('#entryContainer').addClass("loading");
        $('.alert').hide();

        $.ajax({
            type:"GET",
            url: "phpFunctions/eseguiBackup.php",
            async:false,
            success: function(data){
                var risultato= data;
                if(risultato){
                    var lastBackup=ultimo_backup();

                    if(lastBackup){
                        //$('#nessun_backup').fadeOut();
                        $('#info_ultimo_backup').html('<strong>Info!</strong> Ultimo Backup effettuato il: '+lastBackup);
                        $('#info_ultimo_backup').fadeIn(3000);
                    }else{
                        $('#nessun_backup').fadeIn(3000);
                    }
                    $('#entryContainer').removeClass("loading");
                }

            },
            error: function(xhr, desc, err) {
                //alert(xhr);
                alert("Details: " + desc + "\nError:" + err);
            }
        });
        if ($('#entryContainer').hasClass('loading')){
            $('#entryContainer').removeClass("loading");
        }
    });

});