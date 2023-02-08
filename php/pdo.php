<?php

$user = 'root';
$pass = '';

try {
    $pdo = new PDO('mysql:host=localhost;dbname=filter', $user, $pass);
} catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();
}

function searchVilles($pdo)
{
    $search = $_GET['search'];
    if (strlen($search) > 0) {
        $sql = 'SELECT name FROM ville WHERE name LIKE :search';
        $result = $pdo->prepare($sql);
        $result->execute(['search' => '%' . $search . '%']);
        return $result->fetchAll();
    } else {
        return [];
    }
}

echo json_encode(searchVilles($pdo));
