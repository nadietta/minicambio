    <?php
    /**
     * Created by PhpStorm.
     * User: Sara
     * Date: 15/01/2016
     * Time: 17:12
     *
     *
     */
    //TODO: permette l'inserimento ad es. da euro a dollaro inserisce una nuova riga e mette tipo operazione 1
    $risultato = array();

    include "../../connessione.php";
    $id_franco=1;
    $valuta_da="";
    $valuta_a="";
    $tasso="";
    $valuta_da=$_POST['valuta_da'];
    $valuta_a=$_POST['valuta_a'];
    $tasso=$_POST['tasso'];
    $tipo_op=-1;
    if($id_franco==$valuta_da){
     $tipo_op=1;
    }
    if($id_franco==$valuta_a){
        $tipo_op=0;
    }
    $query = mysqli_query($conn,
                "INSERT INTO `tassi`(pk_tasso, fk_valuta_entrata, fk_valuta_uscita, valore, tipo_operazione)
                        VALUES(NULL, $valuta_da,$valuta_a,$tasso,$tipo_op)");
    if(mysqli_affected_rows($conn)){
        $risultato['msg']="Inserimento avvenuto con successo";
    }
    else {

        $risultato['msg']="Errore, riprovare";

    }

    $error=mysqli_errno($conn);
    if($error==1062)
    $risultato['msg']="Tasso esistente, per modificarlo clicca sul menu tassi e successivamente sulla voce modifica";


    echo json_encode($risultato);


