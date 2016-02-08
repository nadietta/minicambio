<?php
/**
 * Created by PhpStorm.
 * User: Nadia
 * Date: 23/01/2016
 * Time: 14:02
 */
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
                    <form id="valuteWindowForm" class="form-horizontal">
                        <fieldset>

                            <input class="hidden" id="idVal" name="idVal" value="<?php print $idVal;?>">
                            <input class="hidden" id="mode" name="mode" value="<?php print $mode;?>">
                            <div class="form-group">
                                <label for="valNome" class="col-sm-3 col-lg-3 control-label">Nome Valuta:</label>
                                <div class="col-sm-8 col-lg-8">
                                    <input class="form-control requiredInput" id="valNome" name="valNome">
                                </div>
                                <label for="valSimbolo" class="col-sm-3 col-lg-3 control-label">Simbolo Valuta:</label>
                                <div class="col-sm-8 col-lg-8">
                                    <input class="form-control requiredInput" id="valSimbolo" name="valSimbolo">
                                </div>
                            </div>
                        </fieldset>

                        <div id="valWindow_btns" class="form-group col-sm-12 col-lg-12 alignRight yMargin20">
                            <button type="button" class="btn" onclick="window.close();">
                                <span class='glyphicon glyphicon-remove'></span>&nbsp;&nbsp;Annulla
                            </button>
                            <button type="button" class="btn" data-toggle="modal" data-target=".valWindow-confirmDiv">
                                <span class='glyphicon glyphicon-floppy-disk'></span>&nbsp;&nbsp;Salva
                            </button>
                        </div>


                        <!-- Small modal -->

                        <div class="modal fade valWindow-confirmDiv" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-sm">

                                <div class="modal-content">
                                    <div class="modal-body">
                                        Sei sicuro?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" data-dismiss="modal" class="btn">Annulla</button>
                                        <button type="button" data-dismiss="modal" class="btn btn-primary" id="btnValSalva">Salva</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    </body>

</html>

