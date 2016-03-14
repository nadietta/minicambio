<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 17:12
 *
 *
 */
ini_set("error_reporting", 0);
include "../../connessione.php";
$formData = $_POST['formData'];
$idFranco = '1';

$risultato = array();
$risultato['messaggio'] = "";
$risultato['errore'] = "";

function unserializeForm($str) {
    $returndata = array();
    $strArray = explode("&", $str);
    $i = 0;
    foreach ($strArray as $item) {
        $array = explode("=", $item);
        $returndata[$array[0]] = $array[1];
    }
    return $returndata;
}

if(isset($formData))
{
    $risultato = unserializeForm($formData);
    if ($risultato['opTipoOp'] != '-1'){
        $valuta_da = $risultato['valutaEntrata'];
        $entrata = $risultato['op1entrata'];
        $valuta_a = $risultato['valutaUscita'];
        $uscita = $risultato['op1uscita'];
        $tasso = $risultato['op1tasso'];
        $num_op = $risultato['op1operazione'];
        $tipo_op = $risultato['op1tipoOp'];

        $data = DateTime::createFromFormat('d/m/Y H:i', $_POST['data']);
        $timestamp=$data->format('Y-m-d H:i');
        mysqli_begin_transaction($conn);
        $queryUpdate = "UPDATE operazioni SET cod_op = cod_op+1 WHERE cod_op >='$num_op' AND SUBSTRING(cod_op,1,6) = SUBSTRING('$num_op',1,6)ORDER BY cod_op DESC";

        $query2 = mysqli_query($conn,$queryUpdate);
        $query = mysqli_query($conn,
            "INSERT INTO `operazioni`(pk_operazione,data_op, fk_valuta_entrata, importo_entrata, fk_valuta_uscita, importo_uscita, tasso, cod_op, tipo_operazione)
             VALUES (NULL,'$timestamp',$valuta_da,$entrata,$valuta_a,$uscita,$tasso,$num_op,$tipo_op);
            ");


        if($query and $query2){
            mysqli_commit($conn);
            $risultato['messaggio']="Inserimento avvenuto con successo";
        }
        else {
            mysqli_rollback($conn);
            $risultato['errore']="Errore, riprovare";
        }
    }
    else{
        $valuta_da1 = $risultato['valutaEntrata'];
        $entrata1 = $risultato['op1entrata'];
        $valuta_a1 = $idFranco;
        $uscita1 = $risultato['op1uscita'];
        $tasso1 = $risultato['op1tasso'];
        $num_op1 = $risultato['op1operazione'];
        $tipo_op1 = $risultato['op1tipoOp'];

        $data = DateTime::createFromFormat('d/m/Y H:i', $_POST['data']);
        $timestamp=$data->format('Y-m-d H:i');
        $valuta_da2 = $idFranco;
        $entrata2 = $risultato['op2entrata'];
        $valuta_a2 = $risultato['valutaUscita'];
        $uscita2 = $risultato['op2uscita'];
        $tasso2 = $risultato['op2tasso'];
        $num_op2 = $risultato['op2operazione'];
        $tipo_op2 = $risultato['op2tipoOp'];

        mysqli_begin_transaction($conn);

        $queryUpdate = "UPDATE operazioni SET cod_op = cod_op+2 WHERE cod_op >='$num_op1' AND SUBSTRING(cod_op,1,6) = SUBSTRING('$num_op1',1,6)ORDER BY cod_op DESC";
        $query3 = mysqli_query($conn,$queryUpdate);
        $query1 = mysqli_query($conn,
            "INSERT INTO `operazioni`(pk_operazione,data_op, fk_valuta_entrata, importo_entrata, fk_valuta_uscita, importo_uscita, tasso, cod_op, tipo_operazione)
             VALUES (NULL,'$timestamp',$valuta_da1,$entrata1,$valuta_a1,$uscita1,$tasso1,$num_op1,$tipo_op1);
            ");
        $qu= "INSERT INTO `operazioni`(pk_operazione,data_op, fk_valuta_entrata, importo_entrata, fk_valuta_uscita, importo_uscita, tasso, cod_op, tipo_operazione)
             VALUES (NULL,'$timestamp',$valuta_da1,$entrata1,$valuta_a1,$uscita1,$tasso1,$num_op1,$tipo_op1);
            ";


        $query2 = mysqli_query($conn,
            "INSERT INTO `operazioni`(pk_operazione,data_op, fk_valuta_entrata, importo_entrata, fk_valuta_uscita, importo_uscita, tasso, cod_op, tipo_operazione)
             VALUES (NULL,'$timestamp',$valuta_da2,$entrata2,$valuta_a2,$uscita2,$tasso2,$num_op2,$tipo_op2);
            ");

        if ($query1 && $query2 && $query3){
             if(mysqli_commit($conn)){
                 $risultato['messaggio']="Inserimento avvenuto con successo";
             }
        }
        else{
            mysqli_rollback($conn);
            $risultato['errore']="Errore, riprovare";
        }

    }
}
else{

    $risultato['errore'] = "Errore dati Form";
}

echo json_encode($risultato);