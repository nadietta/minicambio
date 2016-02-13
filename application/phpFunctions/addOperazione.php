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

            $query = mysqli_query($conn,
                "INSERT INTO `operazioni`(pk_operazione, fk_valuta_entrata, importo_entrata, fk_valuta_uscita, importo_uscita, tasso, cod_op, tipo_operazione)
                 VALUES (NULL,$valuta_da,$entrata,$valuta_a,$uscita,$tasso,$num_op,$tipo_op);
                ");
            if(mysqli_affected_rows($conn)){
                $risultato = array();
                $risultato['messaggio']="Inserimento avvenuto con successo";
            }
            else {
                $risultato = array();
                $risultato['errore']="Errore, riprovare";
            }
        }
        else{
            //TODO: fare una transazione per l'operazione doppia
            $valuta_da1 = $risultato['valutaEntrata'];
            $entrata1 = $risultato['op1entrata'];
            $valuta_a1 = $idFranco;
            $uscita1 = $risultato['op1uscita'];
            $tasso1 = $risultato['op1tasso'];
            $num_op1 = $risultato['op1operazione'];
            $tipo_op1 = $risultato['op1tipoOp'];

            $valuta_da2 = $idFranco;
            $entrata2 = $risultato['op2entrata'];
            $valuta_a2 = $risultato['valutaUscita'];
            $uscita2 = $risultato['op2uscita'];
            $tasso2 = $risultato['op2tasso'];
            $num_op2 = $risultato['op2operazione'];
            $tipo_op2 = $risultato['op2tipoOp'];

            mysqli_begin_transaction($conn);

            $query1 = mysqli_query($conn,
                "INSERT INTO `operazioni`(pk_operazione, fk_valuta_entrata, importo_entrata, fk_valuta_uscita, importo_uscita, tasso, cod_op, tipo_operazione)
                 VALUES (NULL,$valuta_da1,$entrata1,$valuta_a1,$uscita1,$tasso1,$num_op1,$tipo_op1);
                ");


            $query2 = mysqli_query($conn,
                "INSERT INTO `operazioni`(pk_operazione, fk_valuta_entrata, importo_entrata, fk_valuta_uscita, importo_uscita, tasso, cod_op, tipo_operazione)
                 VALUES (NULL,$valuta_da2,$entrata2,$valuta_a2,$uscita2,$tasso2,$num_op2,$tipo_op2);
                ");

            if ($query1 && $query2){
                 if(mysqli_commit($conn)){
                     $risultato = array();
                     $risultato['messaggio']="Inserimento avvenuto con successo";
                 }
            }
            else{
                $risultato = array();
                mysqli_rollback($conn);
                $risultato['errore']="Errore, riprovare";
            }

        }
    }
    else{

        $risultato['errore'] = "Errore dati Form";
    }

    return json_encode($risultato);