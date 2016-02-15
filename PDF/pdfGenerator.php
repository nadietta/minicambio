<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 06/02/2016
 * Time: 18:08
 */

use mikehaertl\wkhtmlto\Pdf;


// You can pass a filename, a HTML string or an URL to the constructor
$pdf = new Pdf('<h2>test</h2>');

// On some systems you may have to set the path to the wkhtmltopdf executable
// $pdf->binary = 'C:\...';

if (!$pdf->saveAs('./tmp.pdf')) {
    echo $pdf->getError();
}

/**
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

htmltopdf(file_get_contents("esempioHTML.html"),"","A5","landscape");**/