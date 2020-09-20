<?php

abstract class ApiController {

	/**
	 * Outputs data as encoded JSON with the correct headers
	 *
	 * @param  array        $data       Associative array with data to print
	 * @param  bool|boolean $success    If the request was successful or not
	 * @param  string       $message    An optional message
	 * @param  int|integer  $statusCode The request status code
	 */
	protected function outputRequest(
		array $data,
		bool $success = true,
		string $message = "",
		int $statusCode = 200)
	{
		header("Access-Control-Allow-Origin: *");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Methods: GET");
		header("Access-Control-Max-Age: 3600");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		http_response_code($statusCode);

		echo json_encode(["success" => $success, "message" => $message, "data" => $data]);
	}
}
