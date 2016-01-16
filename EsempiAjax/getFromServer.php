<?php
/**
 * Created by PhpStorm.
 * User: Nadia
 * Date: 16/01/2016
 * Time: 10:51
 */

/* Non prendo nessun parametro di solito con GET, ma potrei normalmente con
 * $parametroGet = $_GET['parametro'];
 *
 */

$risultato = array();

//Prendo dal db i dati che mi servono
//.......

$risultato['var1'] = "Variabile Uno";
$risultato['var2'] = "Variabile Due";

echo json_encode($risultato);

//Oppure se volevi ritornare una stringa singola non avevi bisogno dell'array e json.
//Tutto quello che fai stampare a php con "echo", ti sarebbe tornato in "data".

//echo "Qualcosa ";
//echo " e ancora qualcosa."

//In questo caso su ajax di ritorno non hai bisogno di $.parseJSON(data), che serve solo per accedere l'array json
//ma nel success avevi tutta la tua stringa generata dall'echo di php, direttamente in "data".
//Ci puoi fare un alert lì se vuoi provare