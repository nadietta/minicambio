<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 20:49
 */
ini_set("error_reporting", 0);
include("../../connessione.php");
$where=$_POST['where_data'];
$risultato=array();

$query ="SELECT pk_op_oro,DATE_FORMAT(data_op,'%d/%m/%Y') as data_op, cod_op_oro, prezzo, carati, grammi, totale
          FROM operazioni_oro
          WHERE ".$where;
$risultato['msg']=$query;

//$results_db=mysqli_affected_rows($conn);
$i=0;
if ($result =  mysqli_query($conn,$query)) {

    /* fetch object array */

   while ($row = $result->fetch_row()) {

        $risultato[$i]=array();
        $risultato[$i]['id']=$row[0];
        $risultato[$i]['data_op']=$row[1];
        $risultato[$i]['cod_op_oro']=$row[2];
        $risultato[$i]['prezzo']=$row[3];
        $risultato[$i]['carati']=$row[4];
        $risultato[$i]['grammi']=$row[5];
        $risultato[$i]['totale']=$row[5];
        $i++;

   }

    /* free result set */

}
$risultato['length']=$i;

echo json_encode($risultato); //se vuoi stampare ok non hai bisogno del json_encode, quello è solo per passare dati strutturati
