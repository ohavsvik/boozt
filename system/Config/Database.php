<?php

/**
 * Class for initializing a PDO database connection
 */
class Database {

	private $dbConnection = null;

	/**
	 * @param string $host
	 * @param string $port
	 * @param string $db
	 * @param string $user
	 * @param string $pass
	 */
	function __construct(string $host, string $port, string $db, string $user, string $pass) {
		try {
			$this->dbConnection = new \PDO(
				"mysql:host=$host;port=$port;charset=utf8mb4;dbname=$db",
				$user,
				$pass
			);
			$this->dbConnection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
			$this->dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch (\Exception $e) {
			exit($e->getMessage());
		}
	}

	/**
	 * @return PDO Database connection
	 */
	public function getConnection() {
		return $this->dbConnection;
	}
}
