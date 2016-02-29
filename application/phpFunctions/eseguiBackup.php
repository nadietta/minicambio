<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 21/02/2016
 * Time: 20:18
 */

// Cartella del sito da backuppare
$project_dir = getenv('DOCUMENT_ROOT') . 'minicambio';
$project_dir = str_replace('/', '\\', $project_dir);

// Percorso completo dell'archivio compresso del sito
//$userDir = getenv('PUBLIC') . "\..\Nadia";
$userDir = getenv('userProfilePath');
$project_filename = $userDir . '\Downloads\BackupFiles\backup.zip';

// Database
$db_nome = 'minicambio';
$db_user = 'root';
$db_pass = '';
$db_host = 'localhost';

// Percorso completo del backup SQL
$db_filename = $userDir . '\Downloads\BackupFiles\backup_database.sql';

//Creo la cartella se non esiste
if (!is_dir($userDir . '\Downloads\BackupFiles')) {
    mkdir($userDir . '\Downloads\BackupFiles', 0777, true);
}

/*$batfileProject = 'minicambioBatfile_Project.bat';
$handle = fopen($batfileProject, 'w') or die('Cannot open file:  '.$batfileProject);
$execString = $userDir . '\Downloads\BackupFiles\zip -r '. $project_filename .' '. $project_dir .' 2>&1';
fwrite($handle, $execString);
fclose($handle);
exec($batfileProject, $output1, $return1);*/

// creo il backup del DB
$batfileDb = 'minicambioBatfile_Db.bat';
$handle = fopen($batfileDb, 'w') or die('Cannot open file:  '.$batfileDb);
$execString = $project_dir . '\..\..\bin\mysql\mysql5.6.17\bin\mysqldump  '. $db_nome .' -u '. $db_user .' > ' . $db_filename .' 2>&1';
fwrite($handle, $execString);
fclose($handle);
// assicuratevi che il percorso di mysqldump sia corretto$p='"../../../bin/mysql/mysql5.6.17/bin/mysqldump"  --database '.$db_nome . ' -u '. $db_user.' > "' . $db_filename.'"';
exec($batfileDb, $output2, $return2);

// verifico che la creazione in locale dei backup abbia funzionato
if (!$return2){//if (!$return1 && !$return2) {
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
    echo false;
}