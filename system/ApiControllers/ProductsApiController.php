<?php

include_once __DIR__ . '/ApiController.php';
include_once __DIR__ . '/../Models/ProductsModel.php';

/**
 * Api controller for product requests
 */
class ProductsApiController extends ApiController {

	const DEFAULT_LIMIT = 10;
	const DEFAULT_OFFSET = 0;
	const DEFAULT_ORDERBY = "price";
	const DEFAULT_SORT = "asc";

	/**
	 * @var PDO
	 */
	private $db;

	/**
	 * @var ProductsModel
	 */
	private $productsModel;

	/**
	 * @param PDO $db
	 */
	function __construct($db) {
		$this->db = $db;
		$this->productsModel = new ProductsModel($this->db);
	}

	/**
	 * Outputs products as encoded JSON
	 */
	public function getProducts() {
		$limit = $_GET['limit'] ?? self::DEFAULT_LIMIT;
		$offset = $_GET['offset'] ?? self::DEFAULT_OFFSET;
		$orderby = $_GET['orderby'] ?? self::DEFAULT_ORDERBY;
		$sort = $_GET['sort'] ?? self::DEFAULT_SORT;

		try {
			$data = [
				"products" => $this->productsModel->fetch((int) $limit, (int) $offset, $orderby, $sort),
				"totalHits" => $this->productsModel->getTotal()
			];
			$this->outputRequest($data);
		} catch (Exception $e) {
			$this->outputRequest([], false, $e->getMessage(), 400);
		}
	}
}
