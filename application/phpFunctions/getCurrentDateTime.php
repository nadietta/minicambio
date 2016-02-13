<?php
/**
 * Created by PhpStorm.
 * User: Nadia
 * Date: 31/01/2016
 * Time: 19:27
 */
ini_set("error_reporting", 0);
$result = array();

$result['mydate'] = Date("d/m/Y");
$result['mytime'] = Date("H:i");

echo json_encode($result);