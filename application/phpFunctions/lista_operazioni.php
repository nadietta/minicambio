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

$query ="SELECT pk_operazione,DATE_FORMAT(data_op,'%d/%m/%Y') as data_op, v1.descrizione, importo_entrata, v2.descrizione, importo_uscita, tasso, cod_op, tipo_operazione FROM operazioni, valute v1, valute v2
          WHERE fk_valuta_entrata = v1.pk_valuta AND  fk_valuta_uscita = v2.pk_valuta AND ".$where;
$risultato['msg']=$query;

//$results_db=mysqli_affected_rows($conn);
$i=0;
if ($result =  mysqli_query($conn,$query)) {

    /* fetch object array */

   while ($row = $result->fetch_row()) {

        $risultato[$i]=array();
        $risultato[$i]['id']=$row[0];
        $risultato[$i]['data_op']=$row[1];
        $risultato[$i]['valuta_entrata']=$row[2];
        $risultato[$i]['importo_entrata']=number_format($row[3], 2, ',', '.');
        $risultato[$i]['valuta_uscita']=$row[4];
        $risultato[$i]['importo_uscita']=number_format($row[5], 2, ',', '.');
        $risultato[$i]['tasso']=number_format($row[6], 4, ',', '.');
        $risultato[$i]['cod_op']=$row[7];
        $risultato[$i]['tipo_op']=$row[8];
        $i++;

   }

    /* free result set */

}
$risultato['length']=$i;

echo json_encode($risultato); //se vuoi stampare ok non hai bisogno del json_encode, quello � solo per passare dati strutturati
