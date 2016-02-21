<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 21/02/2016
 * Time: 20:18
 */

// Cartella del sito da backuppare
$project_dir = '../../../minicambio';

// Percorso completo dell'archivio compresso del sito
$project_filename = '../../BackupFiles/backup.zip';

// Database
$db_nome = 'minicambio';
$db_user = 'root';
$db_pass = '';
$db_host = 'localhost';

// Percorso completo del backup SQL
$db_filename = '../BackupFiles/backup_database.sql';
$copia_sito = exec('"../../BackupFiles/zip" -r '. '"'.$project_filename . '" "'. $project_dir.'"');

// creo il backup del DB
// assicuratevi che il percorso di mysqldup sia corretto

$copia_db = exec('"../../../bin/mysql/mysql5.6.17/bin/mysqldump"  --database '.$db_nome . ' -u '. $db_user.' > "' . $db_filename.'"');

// verifico che la creazione in locale dei backup abbia funzionato
if ($copia_sito) {


    include "../../connessione.php";
    $query = mysqli_query($conn,
        "INSERT INTO `backup`(pk_backup)
             VALUES (NULL);
            ");
    if(mysqli_affected_rows($conn)){
        $risultato['messaggio']="Inserimento avvenuto con successo";
    }
        echo true;
            }
else {
        echo false;}