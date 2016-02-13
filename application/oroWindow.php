<?php
/**
 * Created by PhpStorm.
 * User: Nadia
 * Date: 23/01/2016
 * Time: 14:02
 */
ini_set("error_reporting", 0);
    include("../connessione.php");

    if (isset($_REQUEST['idOp'])){
        $idOp = $_REQUEST['idOp'];
    }
    else{
        $idOp = "";
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
        <title>Gestione Operazioni Oro</title>

        <script type="text/javascript" src="../js/jquery-1.10.1.min.js"></script>
        <script src="../js/bootstrap.min.js"></script>
        <script type="text/javascript" src="../js/oroWindow.js"></script>

        <link href="../css/Oswald.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="../css/bootstrap.min.css">
        <link href="../css/styleOro.css" rel="stylesheet" type="text/css" media="screen" />
        <link rel="icon" href="../img/gold.png" type="image/gif" />
    </head>
    <body class="bodyPopup">
        <div class="wrapperPopup">
            <div  id="page" class="containerPopup">
                <div class="post">
                    <h2 class="title">Dettagli Operazione</h2>
                    <div id="formOperazione" >
                        <form id="nuovaOperazioneForm">
                            <fieldset>
                                <div class="form-group">
                                    <input class="hidden" id="idOp" name="idOp" value="<?php print $idOp;?>">
                                    <label for="dataora" class="col-sm-12 col-lg-12 control-label">Data e Ora:</label>
                                    <div class="col-sm-12 col-lg-12">
                                        <input  type="datetime" class="form-control" id="dataora" name="dataora" value="" readonly required/>
                                    </div>
                                    <label for="operazione" class="col-sm-12 col-lg-12 control-label">Numero Operazione:</label>

                                    <div class="col-sm-12 col-lg-12">
                                        <input type="number" maxlength="15" class="form-control" id="operazione" name="operazione" readonly required value=""/>
                                    </div>

                                    <br>
                                    <label for="grammi" class="col-sm-12 col-lg-12 control-label">Grammi:</label>
                                    <div class="col-sm-12 col-lg-12">
                                        <input type="number" step="0.001" min="0" class="form-control" id="grammi" name="grammi"  required value=""/>
                                    </div>
                                    <label for="carati" class="col-sm-12 col-lg-12 control-label">Carati:</label>
                                    <div class="col-sm-12 col-lg-12">
                                        <input type="number" step="0.001" min="0" class="form-control" id="carati" name="carati"  required value=""/>
                                    </div>
                                    <label for="prezzo" class="col-sm-12 col-lg-12 control-label">Prezzo (CHF):</label>


                                    <div class="col-sm-12 col-lg-12">
                                        <input type="number" step="0.001" min="0" class="form-control" id="prezzo" name="prezzo" required value=""/>
                                    </div>
                                    <label for="franchi" class="col-sm-12 col-lg-12 control-label">Totale Franchi:</label>
                                    <div class="col-sm-12 col-lg-12">
                                        <input type="number" step="0.001" min="0" class="form-control" id="franchi" name="franchi" readonly required value=""/>
                                    </div>
                                </div>
                            </fieldset>
                            <br>
                            <br>
                            <div id="valWindow_btns" class="form-group col-sm-12 col-lg-12 alignRight yMargin20">
                                <button type="button" class="btn" onclick="window.close();">
                                    <span class='glyphicon glyphicon-remove'></span>&nbsp;&nbsp;Annulla
                                </button>
                                <button type="button" class="btn" data-toggle="modal" data-target=".valWindow-confirmDiv">
                                    <span class='glyphicon glyphicon-floppy-disk'></span>&nbsp;&nbsp;Salva

                            </div>

                        </form>

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

