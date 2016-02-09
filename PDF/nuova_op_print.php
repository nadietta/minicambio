<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 07/02/2016
 * Time: 18:54
 */
include("../connessione.php");
$valuta_a1="";
$valuta_a2="";
$valuta_da1="";
$valuta_da2="";
if (isset($_GET['valutaEntrata'])){
    $valuta_da1 = $_GET['valutaEntrata'];
}
if (isset($_GET['valutaUscita'])){
    if ($_GET['opTipoOp'] == '-1') {
        $valuta_a1=1;
        $valuta_da2 = 1;
        $valuta_a2= $_GET['valutaUscita'];

    }
    else{
        $valuta_a1 = $_GET['valutaUscita'];
    }

}

if (isset($_GET['op1tasso'])){
    $tasso1 = $_GET['op1tasso'];
}
else{
    $tasso1 = "";
}
if (isset($_GET['op1entrata'])){
    $entrata1 = $_GET['op1entrata'];
}
else{
    $entrata1 = "";
}

if (isset($_GET['op1uscita'])){
    $uscita1 = $_GET['op1uscita'];
}
else{
    $uscita1 = "";
}
if (isset($_GET['op1dataora'])){
    $data = $_GET['op1dataora'];
}
else{
    $data = "";
}

$valute=[];
$query ="SELECT pk_valuta,descrizione, simbolo FROM valute WHERE pk_valuta IN('$valuta_da1','$valuta_da2','$valuta_a1','$valuta_a2')";

if ($result =  mysqli_query($conn,$query)) {
    while($row = $result->fetch_row()) {
        $id=$row[0];
        $valute[$id]=array();
        $valute[$id]['descrizione']=$row[1];
        $valute[$id]['simbolo']=$row[2];
   }
}

    $html="
    <!DOCTYPE html>
    <html lang='en'>
    <head>
     <link rel='stylesheet' href='http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'>
    <link href='../css/style.css' rel='stylesheet' type='text/css' media='screen' />
    </head>
    <body style='background:white'>

    <div style='background:transparent !important' class='jumbotron text-center'>
        <div>
            <img class='img-responsive' src='../img/biglietto_visita.PNG'  style='width: 80%;'>

         </div>
    </div>
    <div style='background:transparent !important' class='container'>
    <div class='col-sm-4' >
        <h3>OPERAZIONE Cambio Valuta DA:  ".$valute[$valuta_da1]['descrizione']." A ". $valute[$valuta_a1]['descrizione'] ."</h3>

        <div class='panel'>

            <div class='panel-body'>
                <ul class='list-group'>
                    <li class='list-group-item'><h4> Data e Ora: <b>$data</b></h4></li>
                    <li class='list-group-item'><h4> Tasso Applicato:  <b>$tasso1</b></h4></li>
                    <li class='list-group-item'><h4>Importo Entrata:  <b>$entrata1 ". $valute[$valuta_da1]['simbolo']."</b></h4></li>
                    <li class='list-group-item'><h4>Importo Uscita:  <b>$uscita1 ".$valute[$valuta_a1]['simbolo']."</b></h4></li>

                </ul>
            </div>
        </div>
    </div>
    </div>
 ";

if ($_GET['opTipoOp'] == '-1') {

        if (isset($_GET['op2tasso'])){
            $tasso2 = $_GET['op2tasso'];
        }
        else{
            $tasso2 = "";
        }
        if (isset($_GET['op2entrata'])){
            $entrata2 = $_GET['op2entrata'];
        }
        else{
            $entrata2 = "";
        }

        if (isset($_GET['op2uscita'])){
            $uscita2 = $_GET['op2uscita'];
        }
        else{
            $uscita2 = "";
        }



        $html = $html . "
     <div style='page-break-before: always;'></div>
         <div style='background:transparent !important' class='jumbotron text-center'>
            <div>
                <img src='../img/biglietto_visita.PNG'  style='width: 80%;'>

             </div>
        </div>
         <div style='background:transparent !important' class='container'>
            <div class='col-sm-4' >
                <h3>OPERAZIONE Cambio Valuta DA: ". $valute[$valuta_da2]['descrizione']." A ".  $valute[$valuta_a2]['descrizione']." </h3>

                <div class='panel'>

                    <div class='panel-body'>
                        <ul class='list-group'>
                            <li class='list-group-item'><h4> Data e Ora: <b>$data</b></h4></li>
                            <li class='list-group-item'><h4> Tasso Applicato:  <b>$tasso2</b></h4></li>
                            <li class='list-group-item'><h4>Importo Entrata:  <b>$entrata2 ".$valute[$valuta_da2]['simbolo']." </b></h4></li>
                            <li class='list-group-item'><h4>Importo Uscita:  <b>$uscita2 ".$valute[$valuta_a2]['simbolo']."</b></h4></li>

                        </ul>
                    </div>
                </div>
            </div>
    </div>";
}
   $html=$html ."
     </body>
    </html>
"
;



require_once '../dompdf/autoload.inc.php';


// reference the Dompdf namespace
use Dompdf\Dompdf;

// instantiate and use the dompdf class

    $dompdf = new Dompdf();
   //$dompdf->setCss('http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css');
    $dompdf->loadHtml($html);
// (Optional) Setup the paper size and orientation
    $dompdf->setPaper("A5", "portait");

// Render the HTML as PDF
    $dompdf->render();


$dompdf->stream("", array("Attachment" => 0));
// Output the generated PDF to Browser
   // $pdf = $dompdf->output();
   // $dompdf->stream("tmp",'');

//exec ("""C:\Program Files (x86)\Adobe\Acrobat Reader DC\Reader\AcroRd32.exe' /t """.$pdf."");
/**
include_once "printer_connection.php";
if($printer){

    printer_write($printer, $pdf);
    printer_close($ph);
}else {
    $dompdf->stream("", array("Attachment" => 0));

}**/