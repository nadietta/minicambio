/**
 * Created by Sara on 16/01/2016.
 */

$(document).ready(function() {
    var option;
    $('#rangeData').hide();
    $('#rangeOperazione').hide();
    $('#maggioreImportoEntrata').hide();
    $('#maggioreImportoUscita').hide();
    $('#bottoni').hide();

    $(document).on('click','.scelta_ricerca', function(){
        option= $(this).val();

        switch (option){
            case '1':
                $('#rangeData').show();
                $('#rangeOperazione').hide();
                $('#maggioreImportoEntrata').hide();
                $('#maggioreImportoUscita').hide();
                var valore= $('#rangeData_da').val();
                $('#rangeData_a').val(valore);
                $('#rangeData_a').attr('min',valore);
                $('#rangeData_da').attr('required',true);
                $('#rangeData_a').attr('required',true);

                break;
            case '2':
                $('#rangeOperazione').show();
                $('#rangeData').hide();
                $('#maggioreImportoEntrata').hide();
                $('#maggioreImportoUscita').hide();
                $('#rangeOperazione_da').attr('value','201601000000000');
                $('#rangeOperazione_a').attr('value','201601000000000');
                $('#rangeOperazione_a').attr('min','201601000000000');
                $('#rangeOperazione_da').attr('required',true);
                $('#rangeOperazione_a').attr('required',true);
                break;
            case '3':
                $('#maggioreImportoEntrata').show();
                $('#rangeOperazione').hide();
                $('#rangeData').hide();
                $('#maggioreImportoUscita').hide();
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
        case '4':

                $('#maggioreImportoUscita').show();
                $('#rangeOperazione').hide();
                $('#rangeData').hide();
                $('#maggioreImportoEntrata').hide();
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



                            $('#valuta_uscita').html(voce_select);

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


    $(document).on('change','#rangeData_da', function(){

        var valore= $('#rangeData_da').val();
        $('#rangeData_a').val(valore);
        $('#rangeData_a').attr('min',valore);

    });


    $(document).on('keyup','#rangeOperazione_da', function(){

        var valore= $('#rangeOperazione_da').val();
        $('#rangeOperazione_a').val(valore);
        $('#rangeOperazione_a').attr('min',valore);


    });





    $(document).on('click','#cerca', function(){
        $('#lista_operazioni').html('');
        $('#risposta').html('');
        var where="";

        switch (option){
            case '1': where="data_op BETWEEN '"+$('#rangeData_da').val()+"' AND '"+$('#rangeData_a').val()+"'+ INTERVAL 1 DAY";
                        break;
            case '2': where="cod_op >= "+$('#rangeOperazione_da').val()+" AND cod_op <= "+$('#rangeOperazione_a').val();
                        break;
            case '3': where="importo_entrata >= "+$('#maggioreImporto_da').val()+" AND fk_valuta_entrata = "+$('#valuta').val();
                        break;
            case '4': where="importo_uscita >= "+$('#maggioreImporto_a').val()+" AND fk_valuta_uscita = "+$('#valuta_uscita').val();
                break;

        }

            $.ajax({
                type: "POST",
                url: "phpFunctions/lista_operazioni.php",
                data: {where_data: where},
                success: function(data) {

                    var myresponse = $.parseJSON(data);


                     if (myresponse.length>0) {
                         table = "<legend> Lista Operazioni </legend> <table  class='pure-table'> " +
                            "<thead> <tr><th>Numero operazione</th> <th>Data</th> <th>Valuta Entrata</th>  <th>Importo Entrata</th>" +
                            " <th>Valuta uscita</th> <th>Importo Uscita</th>" +
                            " <th>Tasso</th> <th>Modifica</th> <th>Cancella</th>" +
                            "</tr> </thead> ";

                        for (var i = 0; i < myresponse.length; i++) {
                            // alert(myresponse.length);/
                            id = myresponse[i].id;
                            data_op = myresponse[i].data_op;
                            valuta_entrata = myresponse[i].valuta_entrata;
                            importo_entrata = myresponse[i].importo_entrata;
                            valuta_uscita = myresponse[i].valuta_uscita;
                            importo_uscita = myresponse[i].importo_uscita;
                            tasso = myresponse[i].tasso;
                            cod_op = myresponse[i].cod_op;
                            tipo_op = myresponse[i].tipo_op;
                            table += " <tr>" +
                                "<td id='cod_op" + id + "'>" + cod_op + "</td>" +
                                "<td id='data_op" + id + "'>" + data_op + "</td>" +
                                "<td id='valuta_entrata" + id + "'>" + valuta_entrata + "</td>" +
                                "<td id='importo_entrata" + id + "'>" + importo_entrata + "</td>" +
                                "<td id='valuta_uscita" + id + "'>" + valuta_uscita + "</td>" +
                                "<td id='tasso" + id + "'>" + importo_uscita + "</td>" +

                                "<td id='tipo_op" + id + "'>" + tasso + "</td>" +
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
            });
        });
});

