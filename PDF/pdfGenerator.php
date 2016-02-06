<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 06/02/2016
 * Time: 18:08
 */
require_once '../dompdf/autoload.inc.php';


// reference the Dompdf namespace
use Dompdf\Dompdf;

// instantiate and use the dompdf class

function htmltopdf($html, $filename, $paper, $orientation )
{
    $dompdf = new Dompdf();
    $dompdf->loadHtml($html);

// (Optional) Setup the paper size and orientation
    $dompdf->setPaper($paper, $orientation);

// Render the HTML as PDF
    $dompdf->render();

// Output the generated PDF to Browser
    $dompdf->stream($filename, array("Attachment" => 0));
}

htmltopdf(file_get_contents("esempioHTML.php"),"","A5","landscape");