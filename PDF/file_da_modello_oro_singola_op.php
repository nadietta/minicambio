<?php
include("../connessione.php");
ini_set("error_reporting", 0);

$id=$_POST['id'];
$query ="SELECT pk_op_oro,DATE_FORMAT(data_op,'%d/%m/%Y') as data_op, cod_op_oro, prezzo, carati, grammi, totale
          FROM operazioni_oro
          WHERE pk_op_oro=".$id;

if ($result =  mysqli_query($conn,$query)) {
    $row = $result->fetch_row();
    $data_op = $row[1];
    $prezzo = number_format($row[3], 4, ',', '.');
    $carati = $row[4];
    $grammi = $row[5];
    $totale = number_format($row[6], 2, ',', '.');
}

    $scontrinoModel = '../PDF/modello_scontrino_oro.html';
    $fileHtml='../PDF/NuovaOpOro.html';
if (file_exists('../PDF/pdf_generate/scontrino_oro.pdf'))
    unlink('../PDF/pdf_generate/scontrino_oro.pdf');
$sucesso=true;
if (!copy($scontrinoModel,$fileHtml )) {
    $successo=false;
} else{
    $contenuto_html = file_get_contents($fileHtml);
    $contenuto_html = str_replace("[DATA]", $data_op,   $contenuto_html);
    $contenuto_html = str_replace("[PREZZO]", $prezzo,   $contenuto_html);
    $contenuto_html = str_replace("[CARATI]", $carati,   $contenuto_html);
    $contenuto_html = str_replace("[GRAMMI]", $grammi, $contenuto_html);
    $contenuto_html = str_replace("[FRANCHI]", $totale,   $contenuto_html);
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