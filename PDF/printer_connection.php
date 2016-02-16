<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 08/02/2016
 * Time: 00:37
 */



if($printer = printer_open($name_printer))
{
    // Get file contents
    // Set print mode to RAW and send PDF to printer
    printer_set_option($printer, PRINTER_MODE, "RAW");

}
else "Couldn't connect...";