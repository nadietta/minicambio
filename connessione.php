<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 20:37
 */
// parametri per la connessione al database

 $nomehost = "localhost";
 $nomeuser = "root";
 $password = "";

 $conn = mysqli_connect($nomehost,$nomeuser,$password);
 mysqli_select_db($conn,"minicambio");
if ($conn->connect_errno) {
    printf("Connect failed: %s\n", $conn->connect_error);
    exit();
}
