<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 20:49
 */

include("../../connessione.php");

$query ="SELECT tassi.pk_tasso as id, v1.descrizione as VALUTADA, v2.descrizione as VALUTAA, tassi.valore as TASSO
              FROM tassi, valute v1, valute v2
              WHERE tassi.fk_valuta_entrata= v1.pk_valuta AND tassi.fk_valuta_uscita= v2.pk_valuta";
$risultato=array();
//$results_db=mysqli_affected_rows($conn);
$i=0;
if ($result =  mysqli_query($conn,$query)) {

    /* fetch object array */

    while ($row = $result->fetch_row()) {

        $risultato[$i]=array();
        $risultato[$i]['id']=$row[0];
        $risultato[$i]['valutada']=$row[1];
        $risultato[$i]['valutaa']=$row[2];
        $risultato[$i]['tasso']=$row[3];
        $i++;

    }

    /* free result set */

}
$risultato['length']=$i;

echo json_encode($risultato); //se vuoi stampare ok non hai bisogno del json_encode, quello è solo per passare dati strutturati
