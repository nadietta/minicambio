<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 23/01/2016
 * Time: 14:02
 */

if (isset($_REQUEST['msg'])){
    $msg = $_REQUEST['msg'];
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>Conferma</title>

    <script type="text/javascript" src="../js/jquery-1.10.1.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../js/valuteWindow.js"></script>

    <link href="../css/Oswald.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link href="../css/style.css" rel="stylesheet" type="text/css" media="screen" />
    <link rel="icon" href="../img/money_bag.png" type="image/gif" />
</head>
<body class="bodyPopup">

<div class='modal-dialog modal-sm'>
        <div class='modal-content'>
            <div class='modal-body'>
                <?php print $msg; ?>

            </div>
        </div>
    </div>

</body>

</html>

