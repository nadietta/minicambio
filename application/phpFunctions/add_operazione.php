    <?php
    /**
     * Created by PhpStorm.
     * User: Sara
     * Date: 15/01/2016
     * Time: 17:12
     *
     *
     */

    $risultato = array();
    include "../../connessione.php";
    $num_op='';
    $valuta_da='';
    $valuta_a='';
    $tasso='';
    $entrata='';
    $uscita='';
    $tipo_op='';


    $num_op=$_POST['num_op'];
    $valuta_da=$_POST['valuta_da'];
    $valuta_a=$_POST['valuta_a'];
    $tasso=$_POST['tasso'];
    $entrata=$_POST['entrata'];
    $uscita=$_POST['uscita'];
    $tipo_op=$_POST['tipo_op'];

    $query = mysqli_query($conn,
                "INSERT INTO `operazioni`(pk_operazione, fk_valuta_entrata, importo_entrata, fk_valuta_uscita, importo_uscita, tasso, cod_op, tipo_operazione)
                 VALUES (NULL,$valuta_da,$entrata,$valuta_a,$uscita,$tasso,'$num_op','$tipo_op');
                ");
    if(mysqli_affected_rows($conn)){
        $risultato['msg']="Inserimento avvenuto con successo";

    }
    else {

        $risultato['msg']="Errore, riprovare";

    }

    echo json_encode($risultato);


