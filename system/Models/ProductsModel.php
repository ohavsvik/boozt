<?php

class ProductsModel {

	const VALID_ORDERBY_OPTIONS = ["price"];
	const VALID_SORT_OPTIONS = ["asc", "desc"];

	/**
	 * @var PDO
	 */
	private $db;

	/**
	 * @param PDO $db
	 */
	function __construct($db) {
		$this->db = $db;
	}

	/**
	 * Fetch products
	 *
	 * @throws Exception
	 *
	 * @param  int    $limit
	 * @param  int    $offset
	 * @param  string $orderby Must be one of the `VALID_ORDERBY_OPTIONS`
	 * @param  string $sort    Either ASC or DESC
	 * @return array           Associative array of products
	 */
	public function fetch(int $limit, int $offset, string $orderby, string $sort) {
		$products = [];
		$this->_validateFetchParams($limit, $offset, $orderby, $sort);

		try {
			// All parameters are already checked, no need for prepared statements.
			$stmt = $this->db->query("
				SELECT id, filename, product_name, actual_price as price, brand_name
				FROM products_list
				ORDER BY $orderby $sort
				LIMIT $offset, $limit;
			");

			while ($row = $stmt->fetch()) {
				$products[] = [
					"id" => $row['id'],
					"filename" => $row['filename'],
					"product_name" => $row['product_name'],
					"price" => (float) $row['price'],
					"brand_name" => $row['brand_name']
				];
			}
		} catch (PDOException $e) {
			throw new Exception("Error executing query");
		}

		return $products;
	}

	/**
	 * @return int The total amount of products
	 */
	public function getTotal() {
		return $this->db->query("SELECT count(*) FROM products_list")->fetchColumn();
	}

	private function _validateFetchParams(int $limit, int $offset, string $orderby, string $sort) {
		if ($limit <= 0) {
			throw new Exception("Limit and can not be below 1", 1);
		}
		if ($offset < 0) {
			throw new Exception("Offset can not be below 0", 1);
		}
		if (!in_array($orderby, self::VALID_ORDERBY_OPTIONS)) {
			throw new Exception("Invalid orderby option", 1);
		}
		if (!in_array($sort, self::VALID_SORT_OPTIONS)) {
			throw new Exception("Invalid sort option", 1);
		}
	}
}
