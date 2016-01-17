<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 20:49
 */

include("../../connessione.php");
$results="";
$query = mysqli_query($conn,"SELECT * FROM valute");
$results=mysqli_affected_rows($conn);
echo json_encode($results); //se vuoi stampare ok non hai bisogno del json_encode, quello è solo per passare dati strutturati
