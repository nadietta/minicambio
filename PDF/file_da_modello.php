<?php
include("../connessione.php");
$valuta_a1="";
$valuta_a2="";
$valuta_da1="";
$valuta_da2="";
$numOp=1;
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

    if (isset($risultato['valutaEntrata'])) {
        $valuta_da1 = $risultato['valutaEntrata'];
    }
    if (isset($risultato['valutaUscita'])) {
        if ($risultato['opTipoOp'] == '-1') {
            $valuta_a1 = 1;
            $valuta_da2 = 1;
            $valuta_a2 = $risultato['valutaUscita'];

        } else {
            $valuta_a1 = $risultato['valutaUscita'];
        }

    }

    if (isset($risultato['op1tasso'])) {
        $tasso1 = $risultato['op1tasso'];
    } else {
        $tasso1 = "";
    }
    if (isset($risultato['op1entrata'])) {
        $entrata1 = round($risultato['op1entrata'],2);
    } else {
        $entrata1 = "";
    }

    if (isset($risultato['op1uscita'])) {
        $uscita1 = round($risultato['op1uscita'],2);
    } else {
        $uscita1 = "";
    }
    if (isset($_POST['dataOp'])) {
        $data = $_POST['dataOp'];
    } else {
        $data = "";
    }

    $valute = [];
    $query = "SELECT pk_valuta,descrizione, simbolo FROM valute WHERE pk_valuta IN('$valuta_da1','$valuta_da2','$valuta_a1','$valuta_a2')";

    if ($result = mysqli_query($conn, $query)) {
        while ($row = $result->fetch_row()) {
            $id = $row[0];
            $valute[$id] = array();
            $valute[$id]['descrizione'] = $row[1];
            $valute[$id]['simbolo'] = $row[2];
        }
    }

    if ($risultato['opTipoOp'] == '-1') {
        $numOp = 2;
        if (isset($risultato['op2tasso'])) {
            $tasso2 = $risultato['op2tasso'];
        } else {
            $tasso2 = "";
        }
        if (isset($risultato['op2entrata'])) {
            $entrata2 = round($risultato['op2entrata'],2);
        } else {
            $entrata2 = "";
        }

        if (isset($risultato['op2uscita'])) {
            $uscita2 = round($risultato['op2uscita'],2);
        } else {
            $uscita2 = "";
        }

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
$result=array();
if($successo) {
    $batfile = '../PDF/print_scontrini.bat';
    $handle = fopen($batfile, 'w') or die('Cannot open file:  ' . $batfile);
    $data = "@echo off \n";
    for ($i = 1; $i <= $numOp; $i++) {
        $data .= "..\\PDF\\wkhtmltopdf\\bin\\wkhtmltopdf.exe  --page-size A5  ".
                    ' ../PDF/Operazione'.$i.'.html' ."   ..\\PDF\\pdf_generate\\scontrino$i.pdf \n";
        $result[$i-1]='..\\PDF\\pdf_generate\\scontrino'.$i.'.pdf';
       // $data.="\"C:\\Program Files (x86)\\Adobe\\Acrobat Reader DC\\Reader\\AcroRd32.exe\" /t ..\\PDF\\pdf_generate\\scontrino$i.pdf \n";

    }

    fwrite($handle, $data);
    fclose($handle);
}

    exec("\"".$batfile."\"");
    for ($i = 1; $i <= $numOp; $i++){
    unlink(  ${"Operazione" . $i});
    }
  unlink($batfile);

echo json_encode($result);
