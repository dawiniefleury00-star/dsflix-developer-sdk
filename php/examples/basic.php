<?php

require __DIR__ . '/../vendor/autoload.php';

use DsflixSdk\DsflixClient;

$client = new DsflixClient('dfx-your-api-key-here');

$popular = $client->getPopularMovies();
print_r($popular['results'] ?? []);

$search = $client->searchMovies('Inception');
print_r($search['results'] ?? []);

$ai = $client->chatAi('Recommend a good thriller movie');
print_r($ai);
