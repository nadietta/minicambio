<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 20:49
 */

include("../../connessione.php");

$query ="SELECT * FROM valute";
$risultato=array();
//$results_db=mysqli_affected_rows($conn);
$i=1;
if ($result =  mysqli_query($conn,$query)) {

    /* fetch object array */

    while ($row = $result->fetch_row()) {
        $risultato['$i']=array();

        $risultato['$i']['numero']=$i;
        $risultato['$i']['nome_valuta']=$row[0];
        $risultato['$i']['simbolo_valuta']=$row[1];
        $i++;

    }

    /* free result set */

}
$result->close();

echo json_encode($risultato); //se vuoi stampare ok non hai bisogno del json_encode, quello è solo per passare dati strutturati
