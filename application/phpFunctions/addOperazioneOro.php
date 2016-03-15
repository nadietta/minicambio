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
            $operazione = $risultato['operazione'];
            $grammi = round($risultato['grammi'],4);
            $carati = $risultato['carati'];
            $prezzo =  round($risultato['prezzo'],4);
            $franchi_arrotondamento = round($risultato['franchi'],2);
            $data = DateTime::createFromFormat('d/m/Y H:i', $_POST['dataop']);
            $timestamp=$data->format('Y-m-d H:i');
            mysqli_begin_transaction($conn);
            $query2 = mysqli_query($conn, "UPDATE `operazioni_oro` SET cod_op_oro = cod_op_oro+1 WHERE cod_op_oro >=$operazione ORDER BY cod_op_oro DESC");
            $query = mysqli_query($conn,
                "INSERT INTO `operazioni_oro`(pk_op_oro,data_op, cod_op_oro, grammi, carati, prezzo, totale)
                  VALUES (NULL,'$timestamp',$operazione,$grammi,$carati,$prezzo,$franchi_arrotondamento);
                ");
            if($query && $query2){
                mysqli_commit($conn);
                $risultato['messaggio']="Inserimento avvenuto con successo";
            }
            else {
                mysqli_rollback($conn);
                $risultato['errore']="Errore, riprovare";


        }
    }
    else{
        $risultato = array();
        $risultato['errore'] = "Errore dati Form";
    }

    echo json_encode($risultato);