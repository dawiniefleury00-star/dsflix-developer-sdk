# DSFlix SDK for PHP

A lightweight PHP client for the DSFlix streaming API.

## Install

```bash
composer require dsflix/dsflix-sdk-php
```

## Example

```php
<?php
require 'vendor/autoload.php';

use DsflixSdk\DsflixClient;

$client = new DsflixClient('dfx-your-api-key-here');
$popular = $client->getPopularMovies();
print_r($popular['results']);
```
