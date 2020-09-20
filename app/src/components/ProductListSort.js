import React from 'react';
import PropTypes from 'prop-types';

function ProductListSort(props) {
	const optionState = `${props.orderby}|${props.sort}`;

	return (
		<div className="sort-wrapper">
			<div className="sort">
				<select className="sort__select" onChange={props.onChange} value={optionState}>
					<option value="price|asc">Price: Low to High</option>
					<option value="price|desc">Price: High to Low</option>
				</select>
				<div className="sort__icon">
					<i className="fas fa-chevron-down"></i>
				</div>
			</div>
		</div>
	);
}

ProductListSort.propTypes = {
	orderby: PropTypes.string.isRequired,
	sort: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default ProductListSort;
