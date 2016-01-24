<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 14/01/2016
 * Time: 17:14
 */

 $nome_pagina = basename($_SERVER['HTTP_REFERER']);

?>
<link rel="icon" href="../img/biglietto_visita.png" type="image/gif" />
<div class="pure-menu pure-menu-horizontal">
    <a href="index.html" class="pure-menu-heading">miniCAMBIO S.a.g.l.</a>
    <ul class="pure-menu-list">
        <li class="pure-menu-item <?php if($nome_pagina == "index.html"){ print "pure-menu-selected";}?>"> <a href="index.html" class="pure-menu-link">Home</a></li>
        <li class="pure-menu-item"<?php if($nome_pagina == "nuova_operazione.html"){ print "pure-menu-selected";}?>"> <a href="nuova_operazione.html" class="pure-menu-link">Nuova Operazione</a></li>
        <li class="pure-menu-item"><a href="lista_operazioni.html" class="pure-menu-link">Lista Operazioni</a></li>
        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Report</a></li>
        <li class="pure-menu-item <?php if($nome_pagina == "setup.html"){ print "pure-menu-selected";}?>"><a href="setup.html" class="pure-menu-link">Setup</a></li>
    </ul>
</div>


