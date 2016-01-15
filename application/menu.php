<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 14/01/2016
 * Time: 17:14
 */

 $nome_pagina = basename($_SERVER['PHP_SELF']); ?>

<div class="pure-menu pure-menu-horizontal">
    <a href="#" class="pure-menu-heading">miniCAMBIO S.a.g.l.</a>
    <ul class="pure-menu-list">
        <li class="pure-menu-item <?php if($nome_pagina == "index.html"){ print "pure-menu-selected";}?>><a href="#" class="pure-menu-link">Home</a></li>
        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Nuova Operazione</a></li>
        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Lista Operazioni</a></li>
        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Report</a></li>
        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Setup</a></li>
    </ul>
</div>
