<?php

$variables = [
	'DB_HOST' => 'localhost',
	'DB_USERNAME' => 'root',
	'DB_PASSWORD' => 'root',
	'DB_DATABASE' => 'boozt',
	'DB_PORT' => '3306',
];

foreach ($variables as $key => $value) {
	putenv("$key=$value");
}
