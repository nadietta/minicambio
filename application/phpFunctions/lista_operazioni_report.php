<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 20:49
 */

include("../../connessione.php");
$where=$_POST['where_data'];
$risultato=array();
//per fare una sola query ad ogni riga associo la totale e media del giorno dell'operazione e totale e media del mese
// La query e le sottoqueri sono raggruppate anche  per fk_valuta_entrata e fk_valuta_uscita dato che il report è per ogni coppia
$query ="SELECT pk_operazione, ".
       "Date_format(o1.data_op, '%d/%m/%Y') AS data_op, ".
       "v1.descrizione,".
       "o1.importo_entrata, ".
       "v2.descrizione, ".
       "o1.importo_uscita,".
       "tasso, ".
       "cod_op, ".
       "tipo_operazione, ".
       "tot_entrata, ".
       "tot_uscita,".
       "tasso_medio_giorno, ".
       "o1.fk_valuta_entrata, ".
       "o1.fk_valuta_uscita, ".
       "mese, ".
       "tot_entrata_mese, ".
       "tot_uscita_mese, ".
       "tasso_medio_mese ".
"FROM   operazioni o1, ".
       "valute v1, ".
       "valute v2, ".
       "(SELECT Date(data_op)  AS GIORNO, ".
               "fk_valuta_entrata, ".
               "fk_valuta_uscita, ".
               "Sum(importo_entrata) AS tot_entrata, ".
               "Sum(importo_uscita)  AS tot_uscita, ".
               "avg(tasso)  AS tasso_medio_giorno ".
        "FROM   operazioni ".
        "WHERE ". $where. " ".
        "GROUP  BY Date(data_op), ".
                  "fk_valuta_entrata,".
                  "fk_valuta_uscita) AS sub_query, ".
       "(SELECT Month(data_op)       AS MESE, ".
               "fk_valuta_entrata, ".
               "fk_valuta_uscita, ".
               "Sum(importo_entrata) AS tot_entrata_mese, ".
               "Sum(importo_uscita)  AS tot_uscita_mese, ".
               "avg(tasso)  AS tasso_medio_mese ".
        "FROM   operazioni ".
        "WHERE ". $where." ".
        "GROUP  BY Month(data_op), ".
                  "fk_valuta_entrata, ".
                  "fk_valuta_uscita) AS sub_query2 ".
"WHERE  o1.fk_valuta_entrata = v1.pk_valuta ".
       "AND o1.fk_valuta_uscita = v2.pk_valuta ".
       "AND ". $where." ".
       "AND giorno = Date(o1.data_op) ".
       "AND sub_query.fk_valuta_entrata = o1.fk_valuta_entrata ".
       "AND sub_query.fk_valuta_uscita = o1.fk_valuta_uscita ".
       "AND mese = Month(o1.data_op) ".
       "AND sub_query2.fk_valuta_entrata = o1.fk_valuta_entrata ".
       "AND sub_query2.fk_valuta_uscita = o1.fk_valuta_uscita ".
"ORDER  BY o1.fk_valuta_entrata, o1.fk_valuta_uscita,  data_op DESC";


//$results_db=mysqli_affected_rows($conn);
$i=0;
$risultato['date']=array();

if ($result =  mysqli_query($conn,$query)) {

   while ($row = $result->fetch_row()) {

        $risultato[$i]=array();
        $risultato[$i]['id']=$row[0];
        $risultato[$i]['data_op']=$row[1];
        $risultato[$i]['valuta_entrata']=$row[2];
        $risultato[$i]['importo_entrata']=$row[3];
        $risultato[$i]['valuta_uscita']=$row[4];
        $risultato[$i]['importo_uscita']=$row[5];
        $risultato[$i]['tasso']=$row[6];
        $risultato[$i]['tasso_medio_giorno']=$row[11];
        $risultato[$i]['cod_op']=$row[7];
        $risultato[$i]['tipo_op']=$row[8];
        $risultato[$i]['totale_entrata']=$row[9];
        $risultato[$i]['totale_uscita']=$row[10];
        $risultato[$i]['fk_entrata']=$row[12];
        $risultato[$i]['fk_uscita']=$row[13];
        $risultato[$i]['mese']=$row[14];
        $risultato[$i]['totale_entrata_mese']=$row[15];
        $risultato[$i]['totale_uscita_mese']=$row[16];
        $risultato[$i]['tasso_medio_mese']=$row[17];
        $i++;

   }



}
$risultato['length']=$i;

echo json_encode($risultato); //se vuoi stampare ok non hai bisogno del json_encode, quello � solo per passare dati strutturati
