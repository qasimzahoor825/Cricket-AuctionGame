<?php
// Returns all saved data: teams, players, results

header('Content-Type: application/json');

$teams = file_exists('teams.json') ? file_get_contents('teams.json') : '[]';
$players = file_exists('players.json') ? file_get_contents('players.json') : '[]';
$results = file_exists('results.json') ? file_get_contents('results.json') : '[]';

echo json_encode([
    'teams' => json_decode($teams),
    'players' => json_decode($players),
    'results' => json_decode($results)
]);
?>
