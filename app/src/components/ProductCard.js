import React from 'react';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';

function ProductCard(props) {
	const {name, price, brand, image} = props;

	return (
		<a href="#" className="product-card">
			<div className="product-card__image-wrapper">
				<LazyLoad height={320}>
					<img src={image} alt={name} className="product-card__image"/>
				</LazyLoad>
			</div>

			<div className="product-card__info">
				<span className="product-card__brand">{brand}</span>
				<span className="product-card__name">{name}</span>
				<span className="product-card__price">{price} kr</span>
			</div>
		</a>
	);
}

ProductCard.propTypes = {
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	brand: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired
};

export default ProductCard;
