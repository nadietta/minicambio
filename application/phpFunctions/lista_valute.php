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
$i=0;
if ($result =  mysqli_query($conn,$query)) {

    /* fetch object array */

    while ($row = $result->fetch_row()) {

        $risultato[$i]=array();
        $risultato[$i]['id']=$row[0];
        $risultato[$i]['nome_valuta']=$row[1];
        $risultato[$i]['simbolo_valuta']=$row[2];
        $i++;

    }

    /* free result set */

}
$risultato['length']=$i;

echo json_encode($risultato); //se vuoi stampare ok non hai bisogno del json_encode, quello è solo per passare dati strutturati
