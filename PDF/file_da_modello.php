<?php
include("../connessione.php");
$valuta_a1="";
$valuta_a2="";
$valuta_da1="";
$valuta_da2="";
$numOp=1;
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

if ($_GET['opTipoOp'] == '-1') {
    $numOp = 2;
    if (isset($_GET['op2tasso'])) {
        $tasso2 = $_GET['op2tasso'];
    } else {
        $tasso2 = "";
    }
    if (isset($_GET['op2entrata'])) {
        $entrata2 = $_GET['op2entrata'];
    } else {
        $entrata2 = "";
    }

    if (isset($_GET['op2uscita'])) {
        $uscita2 = $_GET['op2uscita'];
    } else {
        $uscita2 = "";
    }

}
$successo=true;
$scontrinoModel = '../PDF/modello_scontrino.html';

for ($i = 1; $i <= $numOp; $i++) {

    ${"Operazione" . $i} = '../PDF/Operazione' . $i . '.html';

    if (!copy($scontrinoModel, ${"Operazione" . $i})) {
       $successo=false;

    } else {
        $valuta_da = ${"valuta_da" . $i};
        $valuta_a = ${"valuta_a" . $i};
        $contenuto_html = file_get_contents(${"Operazione" . $i});
        $contenuto_html = str_replace("[ENTRATA_NOME_VALUTA]", $valute[$valuta_da]['descrizione'],   $contenuto_html);
        $contenuto_html = str_replace("[USCITA_NOME_VALUTA]", $valute[$valuta_a]['descrizione'],  $contenuto_html);
        $contenuto_html = str_replace("[DATA]", $data,   $contenuto_html);
        $contenuto_html = str_replace("[TASSO_APPLICATO]", ${"tasso" . $i},  $contenuto_html);
        $contenuto_html = str_replace("[ENTRATA]", ${"entrata" . $i} . " " . $valute[$valuta_da]['simbolo'],   $contenuto_html);
        $contenuto_html = str_replace("[USCITA]", ${"uscita" . $i} . " " . $valute[$valuta_a]['simbolo'],  $contenuto_html);
        file_put_contents( ${"Operazione" . $i}, $contenuto_html);
    }
}

if($successo) {
    $batfile = '../PDF/print_scontrini.bat';
    $handle = fopen($batfile, 'w') or die('Cannot open file:  ' . $batfile);
    $data = "@echo off \n";
    for ($i = 1; $i <= $numOp; $i++) {
        $data .= "C:\\wamp\\www\\minicambio\\PDF\\wkhtmltopdf\\bin\\wkhtmltopdf.exe  --page-size A5  ".
                    ' C:/wamp/www/minicambio/PDF/Operazione'.$i.'.html' ." C:\\wamp\\www\\minicambio\\PDF\\pdf_generate\\scontrino.pdf";
       //'C:\Program Files (x86)\Adobe\Acrobat Reader DC\Reader\AcroRd32.exe' /t ".${"Operazione" . $i};
    }

    fwrite($handle, $data);
    fclose($handle);
}

 exec($batfile, $output, $return);
    for ($i = 1; $i <= $numOp; $i++){
      //  unlink(  ${"Operazione" . $i});
    }
    //unlink($batfile);


