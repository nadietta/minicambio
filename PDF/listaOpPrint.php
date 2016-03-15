<?php
ini_set("error_reporting", 0);
$html=$_POST['html'];
$data=$_POST['data'];
$fileHtml='../PDF/ListaOpOro.html';
$listaModel = '../PDF/modello_lista.html';
$sucesso=true;
if (file_exists('../PDF/pdf_generate/listaOp.pdf'))
    unlink('../PDF/pdf_generate/listaOp.pdf');
if (!copy($listaModel,$fileHtml )) {
    $successo=false;
} else{

    $contenuto_html = file_get_contents($fileHtml);
    $contenuto_html = str_replace("[DATA]", $data,   $contenuto_html);
    $contenuto_html = str_replace("[TITOLO]", 'LISTA OPERAZIONI DI CAMBIO VALUTA ',   $contenuto_html);
    $contenuto_html = str_replace("[LISTA]", $html,   $contenuto_html);
    file_put_contents($fileHtml, $contenuto_html);

}
    $pdfFile='../PDF/pdf_generate/listaOp.pdf';
    $batfile = '../PDF/print_lista.bat';
    $handle = fopen($batfile, 'w') or die('Cannot open file:  ' . $batfile);
    $data = "@echo off \n";
     $data .= "..\\PDF\\wkhtmltopdf\\bin\\wkhtmltopdf.exe --margin-top 20 --margin-bottom 20  --footer-center \"Pag. [page] di [topage]\"  --page-size A4  ".
                    " $fileHtml  ..\\PDF\\pdf_generate\\listaOp.pdf \n ";


    fwrite($handle, $data);
    fclose($handle);
    exec("\"".$batfile."\"");
    unlink( $fileHtml);
    unlink( $batfile);


echo $pdfFile;