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
            $grammi = $risultato['grammi'];
            $carati = $risultato['carati'];
            $prezzo = $risultato['prezzo'];
            $franchi = $risultato['franchi'];

            $query = mysqli_query($conn,
                "INSERT INTO `operazioni_oro`(pk_op_oro, cod_op_oro, grammi, carati, prezzo, totale)
                  VALUES (NULL,$operazione,$grammi,$carati,$prezzo,$franchi);
                ");
            if($query){
                $risultato['messaggio']="Inserimento avvenuto con successo";
            }
            else {
                $risultato['errore']="Errore, riprovare";


        }
    }
    else{
        $risultato = array();
        $risultato['errore'] = "Errore dati Form";
    }

    echo json_encode($risultato);