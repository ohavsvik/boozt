import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

function ProductListPagination(props) {
	return (
		<div className="pagination-container">
			<ReactPaginate
				previousLabel={'Previous'}
				nextLabel={'Next'}
				pageCount={props.pageCount}
				breakLabel={'...'}
				breakClassName={'ellipsis'}
				marginPagesDisplayed={1}
				pageRangeDisplayed={3}
				onPageChange={(data) => props.onChange(data.selected)}
				containerClassName={'pagination'}
				subContainerClassName={'pages pagination'}
				activeClassName={'active'}
				forcePage={props.currentPage}
			/>
		</div>
	);
}

ProductListPagination.propTypes = {
	pageCount: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
};

export default ProductListPagination;
