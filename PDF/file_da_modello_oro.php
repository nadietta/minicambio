<?php
include("../connessione.php");

$formData = $_POST['formData'];


$risultato = array();
$risultato['messaggio'] = "";
$risultato['errore'] = "";

function unserializeForm($str) {
    $returndata = array();
    $strArray = explode("&", $str);
    $i = 0;
    foreach ($strArray as $item) {
        $array = explode("=", $item);
        $returndata[$array[0]] = $array[1];
    }
    return $returndata;
}
if(isset($formData)) {
    $risultato = unserializeForm($formData);

    if (isset($risultato['grammi'])) {
        $grammi = $risultato['grammi'];
    }

    if (isset($risultato['carati'])) {
        $carati = $risultato['carati'];
    }

    if (isset($risultato['prezzo'])) {
        $prezzo = $risultato['prezzo'];
    }

    if (isset($risultato['franchi'])) {
        $franchi = $risultato['franchi'];
    }
}
if (isset($_POST['dataOp'])) {
    $data = $_POST['dataOp'];
} else {
    $data = "";
}

$scontrinoModel = '../PDF/modello_scontrino_oro.html';
$fileHtml='../PDF/NuovaOpOro.html';

$sucesso=true;
if (!copy($scontrinoModel,$fileHtml )) {
    $successo=false;
} else{

    $contenuto_html = file_get_contents($fileHtml);
    $contenuto_html = str_replace("[DATA]", $data,   $contenuto_html);
    $contenuto_html = str_replace("[PREZZO]", $prezzo,   $contenuto_html);
    $contenuto_html = str_replace("[CARATI]", $carati,   $contenuto_html);
    $contenuto_html = str_replace("[GRAMMI]", $grammi,   $contenuto_html);
    $contenuto_html = str_replace("[FRANCHI]", $franchi,   $contenuto_html);
    file_put_contents($fileHtml, $contenuto_html);

}
$pdfFile='../PDF/pdf_generate/scontrino_oro.pdf';
$batfile = '../PDF/print_scontrino_oro.bat';
$handle = fopen($batfile, 'w') or die('Cannot open file:  ' . $batfile);
$data = "@echo off \n";
$data .= "..\\PDF\\wkhtmltopdf\\bin\\wkhtmltopdf.exe  --page-size A5  ".
    " $fileHtml  ..\\PDF\\pdf_generate\\scontrino_oro.pdf \n ";


fwrite($handle, $data);
fclose($handle);
exec("\"".$batfile."\"");
unlink( $fileHtml);
unlink( $batfile);


echo $pdfFile;
