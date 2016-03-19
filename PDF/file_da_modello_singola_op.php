<?php
include("../connessione.php");
$id=$_POST['id'];

$query ="SELECT pk_operazione,DATE_FORMAT(data_op,'%d/%m/%Y') as data_op, v1.descrizione, importo_entrata,v2.descrizione, importo_uscita, tasso, v1.simbolo, v2.simbolo FROM operazioni, valute v1, valute v2 WHERE fk_valuta_entrata = v1.pk_valuta AND  fk_valuta_uscita = v2.pk_valuta AND pk_operazione=$id";
         $results_db=mysqli_affected_rows($conn);

if ($result =  mysqli_query($conn,$query)) {
    $row=$result->fetch_array();
    $data_op=$row[1];
    $valuta_entrata=$row[2];
    $importo_entrata=number_format($row[3], 2, ',', '.');
    $valuta_uscita=$row[4];
    $importo_uscita=number_format($row[5], 2, ',', '.');
    $tasso=number_format($row[6], 4, ',', '.');
    $simbolo_entrata=$row[7];
    $simbolo_uscita=$row[8];
}
$scontrinoModel = '../PDF/modello_scontrino.html';


if (file_exists('../PDF/pdf_generate/scontrino.pdf')){
    unlink('../PDF/pdf_generate/scontrino.pdf');
}
 $Operazione = '../PDF/Operazione.html';

    if (!copy($scontrinoModel, $Operazione)) {
       $successo=false;

    } else {

        $contenuto_html = file_get_contents($Operazione);
        $contenuto_html = str_replace("[ENTRATA_NOME_VALUTA]", $valuta_entrata,   $contenuto_html);
        $contenuto_html = str_replace("[USCITA_NOME_VALUTA]",  $valuta_uscita,  $contenuto_html);
        $contenuto_html = str_replace("[DATA]", $data_op,   $contenuto_html);
        $contenuto_html = str_replace("[TASSO_APPLICATO]", $tasso,  $contenuto_html);
        $contenuto_html = str_replace("[ENTRATA]", $importo_entrata. " " . $simbolo_entrata,   $contenuto_html);
        $contenuto_html = str_replace("[USCITA]", $importo_uscita. " " . $simbolo_uscita,  $contenuto_html);

        file_put_contents( $Operazione, $contenuto_html);
    }



    $batfile = '../PDF/print_scontrini.bat';
    $handle = fopen($batfile, 'w') or die('Cannot open file:  ' . $batfile);
    $data = "@echo off \n";

        $data .= "..\\PDF\\wkhtmltopdf\\bin\\wkhtmltopdf.exe  --page-size A5 ".
                    ' ../PDF/Operazione.html' ."   ..\\PDF\\pdf_generate\\scontrino.pdf \n";
        $pdfurl='..\\PDF\\pdf_generate\\scontrino.pdf';
       // $data.="\"C:\\Program Files (x86)\\Adobe\\Acrobat Reader DC\\Reader\\AcroRd32.exe\" /t ..\\PDF\\pdf_generate\\scontrino$i.pdf \n";


    fwrite($handle, $data);
    fclose($handle);


exec("\"".$batfile."\"");
unlink($Operazione);
unlink($batfile);

echo $pdfurl;
