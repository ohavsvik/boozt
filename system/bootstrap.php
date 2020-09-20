<?php

// Load custom environment variables
include __DIR__ . '/../env.php';

if(!function_exists('env')) {
	function env($key, $default = null) {
		$value = getenv($key);

		if ($value === false) {
			return $default;
		}
		return $value;
	}
}

// Initialize a database connection
include "Config/Database.php";
$dbConnection = (new Database(
	env('DB_HOST'),
	env('DB_PORT'),
	env('DB_DATABASE'),
	env('DB_USERNAME'),
	env('DB_PASSWORD')
))->getConnection();
