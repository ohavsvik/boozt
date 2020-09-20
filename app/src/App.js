import React, { Component } from 'react';
import ProductList from './components/productlist'
import Header from './components/header'

class App extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div className="boozt-application">
				<Header />

				<ProductList perPage={16} />
			</div>
		);
	}
}

export default App;
