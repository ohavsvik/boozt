import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './productcard';
import ProductListSort from './productlistsort'
import ProductListPagination from './productlistpagination'
import {Element, scroller} from 'react-scroll';

class ProductList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			products: [],
			productsTotalCount: 0,
			isLoading: true,
			error: false,
			orderby: 'price',
			sort: 'asc',
			currentPage: 0
		};
	}

	componentDidMount() {
		this.getProducts(true);
	}

	setErrorState() {
		this.setState({
			products: [],
			productTotalCount: 0,
			isLoading: false,
			error: true
		})
	}

	/**
	 * Prepare URL parameters for a request
	 * @param  {array} data Associative array with key=value
	 */
	encodeQueryData(data) {
		const result = [];
		for (let d in data) {
			result.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
		}
		return result.join('&');
	}

	/**
	 * Fetch products from api
	 * @param  {bool} skipScroll If the scroll to top should be skipped
	 */
	getProducts(skipScroll) {
		if (!skipScroll) {
			scroller.scrollTo('productListTop', {
				duration: 1000,
				smooth: true,
				offset: -25
			});
		}

		const params = {
			limit: this.props.perPage,
			offset: Math.ceil(this.state.currentPage * this.props.perPage),
			orderby: this.state.orderby,
			sort: this.state.sort
		};
		const urlQuery = this.encodeQueryData(params);

		this.setState({isLoading: true}, () => {
			fetch("/api/products.php?" + urlQuery)
				.then(response => response.json())
				.then(result => {
					if (result.success) {
						this.setState({
							products: result.data.products,
							productsTotalCount: result.data.totalHits,
							isLoading: false
						})
					}
					else {
						this.setErrorState();
					}
				})
				.catch(() => {
					this.setErrorState();
				});
		});
	}

	handleSort(event) {
		const parts = event.target.value.split("|");
		this.setState({
			orderby: parts[0],
			sort: parts[1],
			currentPage: 0
		}, () => {
			this.getProducts();
		});
	}

	handlePagination(currentPage) {
		this.setState({currentPage: currentPage}, () => {
			this.getProducts();
		});
	}

	render () {
		const pageCount = Math.ceil(this.state.productsTotalCount / this.props.perPage);
		const listItems = this.state.products.map((product) =>
			<ProductCard
				key={product.id}
				name={product.product_name}
				price={product.price}
				brand={product.brand_name}
				image={product.filename}
			/>
		);

		return (
			<div className="site-wide">
				{!this.state.error &&
					<div>
						<Element id="productListTop"></Element>

						<ProductListSort
							orderby={this.state.orderby}
							sort={this.state.sort}
							onChange={(e) => this.handleSort(e)}
						/>

						<div className="product-list-wrapper">
							<div className="product-list">
								{listItems}

								{/* Empty cards to pad last row */}
								<div className="product-card product-card--empty"></div>
								<div className="product-card product-card--empty"></div>
								<div className="product-card product-card--empty"></div>
							</div>

							{this.state.isLoading &&
								<div className="product-list__loading">
									<span className="product-list__loading-text">
										Loading products...
									</span>
								</div>
							}
						</div>

						<ProductListPagination
							currentPage={this.state.currentPage}
							pageCount={pageCount}
							onChange={(currentPage) => this.handlePagination(currentPage)}
						/>
					</div>
				}
				{this.state.error &&
					<p className="page-error">Something went wrong, please contact the <a href="mailto:ohavsvik@gmail.com">culprit</a>.</p>
				}
			</div>
		);
	}
}

ProductList.propTypes = {
	perPage: PropTypes.number.isRequired,
};

export default ProductList;
