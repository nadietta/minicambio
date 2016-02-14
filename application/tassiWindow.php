<?php
/**
 * Created by PhpStorm.
 * User: Nadia
 * Date: 23/01/2016
 * Time: 14:02
 */
ini_set("error_reporting", 0);
    include("../connessione.php");

    if (isset($_REQUEST['idTas'])){
        $idTas = $_REQUEST['idTas'];
    }
    else{
        $idTas = "";
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
        <title>Gestione Tassi</title>

        <script type="text/javascript" src="../js/jquery-1.10.1.min.js"></script>
        <script src="../js/bootstrap.min.js"></script>
        <script type="text/javascript" src="../js/tassiWindow.js"></script>

        <link href="../css/Oswald.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="../css/bootstrap.min.css">
        <link href="../css/style.css" rel="stylesheet" type="text/css" media="screen" />
        <link rel="icon" href="../img/money_bag.png" type="image/gif" />
    </head>
    <body class="bodyPopup">

        <div class="wrapperPopup">
            <div  id="page" class="containerPopup">
                <div class="post">
                    <h2 class="title">Dettagli Tasso</h2>
                    <div id="mrw_overlay"></div>
                    <div id="mrw_box">
                        <div id="mrw_close"><span class="glyphicon glyphicon-remove"></span></div>

                            <div class="alert alert-danger" id="errore">

                            </div>

                    </div>



                    <form id="tassiWindowForm" class="form-horizontal">
                        <fieldset>

                            <input class="hidden" id="idTas" name="idTas" value="<?php print $idTas;?>">
                            <input class="hidden" id="mode" name="mode" value="<?php print $mode;?>">

                            <div class="form-group">
                                <label for="valutaEntrata" class="col-sm-3 col-lg-3 control-label">Valuta Entrata:</label>
                                <div class="col-sm-8 col-lg-8">
                                    <select class="form-control requiredInput" id="valutaEntrata" name="valutaEntrata">
                                        <!-- Opzioni Aggiunte dinamicamente-->
                                    </select>
                                </div>
                                <br>
                                <div style="text-align: center;">
                                    <button type="button" id="invertiBtn" class="btn" disabled>
                                        <span class='glyphicon glyphicon-refresh'></span>&nbsp;&nbsp;Inverti
                                    </button>
                                </div>
                                <label for="valutaUscita" class="col-sm-3 col-lg-3 control-label">Valuta Uscita:</label>
                                <div class="col-sm-8 col-lg-8">
                                    <select class="form-control requiredInput" id="valutaUscita" name="valutaUscita" disabled>
                                        <!-- Opzioni Aggiunte dinamicamente-->
                                    </select>
                                </div>
                                <div style="clear: both;">&nbsp;</div>
                                <label for="tassoCambio" class="col-sm-3 col-lg-3 control-label">Tasso:</label>
                                <div class="col-sm-8 col-lg-8">
                                    <input type="number" step="0.0001"  pattern="[0-9]+.*+,*[0-9]{0,4}$" min="0" class="form-control requiredInput" required id="tassoCambio" name="tassoCambio">
                                </div>
                            </div>
                        </fieldset>

                        <div id="tasWindow_btns" class="form-group col-sm-12 col-lg-12 alignRight yMargin20">
                            <button type="button" class="btn" onclick="window.close();">
                                <span class='glyphicon glyphicon-remove'></span>&nbsp;&nbsp;Annulla
                            </button>
                            <button type="button" class="btn" data-toggle="modal" data-target=".tasWindow-confirmDiv">
                                <span class='glyphicon glyphicon-floppy-disk'></span>&nbsp;&nbsp;Salva
                            </button>
                        </div>


                        <!-- Small modal -->

                        <div class="modal fade tasWindow-confirmDiv" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-sm">

                                <div class="modal-content">
                                    <div class="modal-body">
                                        Sei sicuro?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" data-dismiss="modal" class="btn">Annulla</button>
                                        <button type="button" data-dismiss="modal" class="btn btn-primary" id="btnTasSalva">Salva</button>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </form>
                </div>
                <div class='alert alert-success customHidden' id='successo'>

                </div>

            </div>
        </div>
    </body>

</html>

