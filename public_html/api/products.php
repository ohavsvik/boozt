<?php

include_once "../../system/bootstrap.php";
include_once "../../system/ApiControllers/ProductsApiController.php";

$products = new ProductsApiController($dbConnection);
$products->getProducts();
