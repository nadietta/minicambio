<?php
/**
 * Created by PhpStorm.
 * User: Nadia
 * Date: 23/01/2016
 * Time: 14:02
 */
ini_set("error_reporting", 0);
    include("../connessione.php");

    if (isset($_REQUEST['idVal'])){
        $idVal = $_REQUEST['idVal'];
    }
    else{
        $idVal = "";
    }

    if (isset($_REQUEST['mode'])){
        $mode = $_REQUEST['mode'];
    }
    else{
        $mode = "";
    }
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <title>Gestione Valute</title>

        <script type="text/javascript" src="../js/jquery-1.10.1.min.js"></script>
        <script src="../js/bootstrap.min.js"></script>
        <script type="text/javascript" src="../js/valuteWindow.js"></script>

        <link href="../css/Oswald.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="../css/bootstrap.min.css">
        <link href="../css/style.css" rel="stylesheet" type="text/css" media="screen" />
        <link rel="icon" href="../img/money_bag.png" type="image/gif" />
    </head>
    <body class="bodyPopup">
        <div class="wrapperPopup">
            <div  id="page" class="containerPopup">
                <div class="post">
                    <h2 class="title">Dettagli Valuta</h2>

                    <div class='alert alert-success customHidden' id='successo'>
                        <strong>Successo!</strong> Dati inseriti con successo.
                    </div>

                    <div class="alert alert-danger customHidden" id="errore">
                        <strong>Errore!</strong> durante il salvataggio dei dati.
                    </div>

                    <form id="valuteWindowForm" class="form-horizontal">
                        <fieldset>
                            <input class="hidden" id="idVal" name="idVal" value="<?php print $idVal;?>">
                            <input class="hidden" id="mode" name="mode" value="<?php print $mode;?>">
                            <div class="form-group">
                                <label for="valNome" class="col-sm-3 col-lg-3 control-label">Nome Valuta:</label>
                                <div class="col-sm-8 col-lg-8">
                                    <input class="form-control" id="valNome" name="valNome" required>
                                </div>
                                <label for="valSimbolo" class="col-sm-3 col-lg-3 control-label">Simbolo Valuta:</label>
                                <div class="col-sm-8 col-lg-8">
                                    <input class="form-control" id="valSimbolo" name="valSimbolo" required>
                                </div>
                            </div>
                        </fieldset>

                        <div id="valWindow_btns" class="form-group col-sm-12 col-lg-12 alignRight yMargin20">
                            <button type="button" class="btn" onclick="window.close();">
                                <span class='glyphicon glyphicon-remove'></span>&nbsp;&nbsp;Annulla
                            </button>
                            <input type="submit" class='btn btn-primary' id="valSubmit" name="valSubmit" value="Salva"/>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </body>

</html>

