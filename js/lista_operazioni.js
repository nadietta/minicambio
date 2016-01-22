/**
 * Created by Sara on 16/01/2016.
 */

$(document).ready(function() {
    $('#da_a').hide();
    $('#maggiore_di').hide();
    $('#bottoni').hide();
    $(document).on('click','.scelta_ricerca', function(){
        var option= $(this).val();

        switch (option){
            case '1':
                $('#da_a').show();
                $('#maggiore_di').hide();
                $('#valore_da').attr('type','date');
                $('#valore_a').attr('type','date');
                var valore= $('#valore_da').val();
                $('#valore_a').val(valore);
                $('#valore_a').attr('min',valore);
                $('#valore_da').attr('required',true);
                $('#valore_a').attr('required',true);
                break;
            case '2':
                $('#da_a').show();
                $('#maggiore_di').hide();
                $('#valore_da').attr('type','number');
                $('#valore_a').attr('type','number');
                $('#valore_da').attr('value','201601000000000');
                //TODO: cercare di capire perchè cambiando radio e tornando in
                //questo il valore_a si sbianca
                $('#valore_a').attr('value','201601000000000');
                $('#valore_a').attr('min','201601000000000');
                $('#valore_da').attr('required',true);
                $('#valore_a').attr('required',true);

                break;
            case '3':
                $('#da_a').hide();
                $('#maggiore_di').show();
                $('#maggiore').attr('type','number');
                $('#maggiore').attr('required',true);
                $('#maggiore').attr('min',0);
                $('#valuta').attr('required',true);
                $.ajax({
                    type: "GET",
                    url: "phpFunctions/lista_valute.php",
                    data: {},
                    success: function(data) {
                        var myresponse = $.parseJSON(data);
                        if (myresponse.length>0) {
                            voce_select="<option label='Scegli valuta'></option>";


                            for (var i = 0; i <myresponse.length; i++) {
                                id = myresponse[i].id;
                                nome_valuta = myresponse[i].nome_valuta;
                                simbolo_valuta = myresponse[i].simbolo_valuta;
                                valuta=nome_valuta +" ("+ simbolo_valuta+")";
                                voce_select += " <option value="+id+">"+valuta+"</option>";
                            }



                            $('#valuta').html(voce_select);

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
                break;
        }
        $('#bottoni').show();
    });


    $(document).on('change','#valore_da', function(){

        var valore= $('#valore_da').val();
        $('#valore_a').val(valore);
        $('#valore_a').attr('min',valore);
    });


    $(document).on('keyup','#valore_da', function(){

        var valore= $('#valore_da').val();
        $('#valore_a').val(valore);
        $('#valore_a').attr('min',valore);
    });




    $(document).on('click','#cerca', function(){
        alert();
/**
            $.ajax({
                type: "GET",
                url: "phpFunctions/lista_operazioni.php",
                data: {},
                success: function(data) {
                    var myresponse = $.parseJSON(data);

                     if (myresponse.length>0) {
                         table = "<legend> Lista Operazioni </legend> <table  class='pure-table'> " +
                            "<thead> <tr><th>Numero operazione</th> <th>Data</th> <th>Valuta Entrata</th>  <th>Importo Entrata</th>" +
                            " <th>Tasso</th> <th>Importo Uscita</th>" +
                            " <th>Valuta Uscita</th> <th>Modifica</th> <th>Cancella</th>" +
                            "</tr> </thead> ";
                        for (var i = 0; i < myresponse.length; i++) {
                            // alert(myresponse.length);
                            id = myresponse[i].id;
                            valutada = myresponse[i].valutada;
                            valutaa = myresponse[i].valutaa;
                            tasso = myresponse[i].tasso;
                            table += " <tr>" +
                                "<td id='idtasso" + id + "'>" + id + "</td>" +
                                "<td id='valuta_da" + id + "'>" + valutada + "</td>" +
                                "<td id='valuta_a" + id + "'>" + valutaa + "</td>" +
                                "<td id='tasso" + id + "'>" + tasso + "</td>" +
                                "<td align='center'><img class='img_icon' src='../img/edit_icon.png'></td>" +
                                "<td align='center'><a href='#'  onclick=window.open('delete_valuta.html?id="+id+"');><img class='img_icon' src='../img/delete_icon.png'></a></td>" +
                                "</tr>";


                        }

                        table +="</table>";

                        $('#lista_operazioni').html(table);
                    }
                    else{
                        $('#risposta').html('<h2>'+'Nessuna Operazione Presente'+'</h2>');
                    }

                },
                error: function(xhr, desc, err) {
                    //alert(xhr);
                    alert("Details: " + desc + "\nError:" + err);
                }
            });**/
        });
});

