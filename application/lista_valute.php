<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 20:49
 */

include("../connessione.php");

$query = mysqli_query($conn,"SELECT * FROM valute");
$results=mysqli_affected_rows($conn);
echo json_encode("ok");
