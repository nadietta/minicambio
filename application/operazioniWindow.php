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
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <title>Gestione Operazioni</title>

        <script type="text/javascript" src="../js/jquery-1.10.1.min.js"></script>
        <script type="text/javascript" src="../js/jquery.datetimepicker.js"></script>
        <script src="../js/bootstrap.min.js"></script>
        <script type="text/javascript" src="../js/functions.js"></script>
        <script type="text/javascript" src="../js/operazioniWindow.js"></script>

        <link href="../css/Oswald.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="../css/bootstrap.min.css">
        <link rel="stylesheet" href="../css/jquery.datetimepicker.css">
        <link href="../css/style.css" rel="stylesheet" type="text/css" media="screen" />
        <link rel="icon" href="../img/money_bag.png" type="image/gif" />
    </head>
    <body class="bodyPopup">
        <div class="wrapperPopup">
            <div  id="page" class="containerPopup">
                <div class="post">
                    <h2 class="title">Dettagli Operazione</h2>

                    <div class='alert alert-success customHidden' id='successo'>
                        <strong>Successo!</strong> Modifica avvenuta con successo.
                    </div>

                    <div class="alert alert-danger customHidden" id="errore">
                        <strong>Errore!</strong> durante la modifica.
                    </div>

                    <form id="operazioniWindowForm" class="form-horizontal">
                        <fieldset>

                            <input class="hidden" id="idOp" name="idOp" value="<?php print $idOp;?>">
                            <h3 id="valuteOperazioneTitle">DA VALUTA A VALUTA</h3><br>

                            <div class="form-group">
                                <input type="number" class="customHidden" id="opTipoOp" name="opTipoOp" value="" readonly required/>
                                <label for="dataOperazione" class="col-sm-3 col-lg-3 control-label">Data</label>
                                <div class="col-sm-8 col-lg-8">
                                    <input type="datetime" class="form-control dtp" id="dataOperazione" name="dataOperazione" value="" placeholder="gg/mm/aaaa" readonly required/>
                                </div>
                                <label for="tassoOperazione" class="col-sm-3 col-lg-3 control-label">Tasso</label>
                                <div class="col-sm-8 col-lg-8">
                                    <input type="number" step="0.0001" min="0" class="form-control" id="tassoOperazione" name="tassoOperazione" required value=""/>
                                </div>
                                <label for="entrataOperazione" class="col-sm-3 col-lg-3 control-label">Importo Entrata</label>
                                <div class="col-sm-8 col-lg-8">
                                    <input type="number" step="0.001" min="0" class="form-control" id="entrataOperazione" name="entrataOperazione" pattern="^[0-9]*(,|.)[0-9]*$" required value=""/>
                                </div>
                                <label for="uscitaOperazione" class="col-sm-3 col-lg-3 control-label">Importo Uscita</label>
                                <div class="col-sm-8 col-lg-8">
                                    <input type="number" step="0.001" min="0" class="form-control" id="uscitaOperazione" name="uscitaOperazione" pattern="^[0-9]*(,|.)[0-9]*$" readonly required value=""/>
                                </div>


                            </div>
                        </fieldset>

                        <div id="opWindow_btns" class="form-group col-sm-12 col-lg-12 alignRight yMargin20">
                            <button type="button" class="btn" onclick="window.close();">
                                <span class='glyphicon glyphicon-remove'></span>&nbsp;&nbsp;Annulla
                            </button>
                            <input type="submit" class='btn btn-primary' id="opEdit" name="opEdit" value="Salva"/>
                        </div>


                    </form>
                </div>

            </div>
        </div>
    </body>

</html>

