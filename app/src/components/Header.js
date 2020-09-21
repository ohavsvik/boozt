import React from 'react';
import BooztLogo from './booztlogo';

function Header() {
	return (
		<header className="header">
			<div className="site-wide">
				<div className="header__content">
					<div className="header__logo-wrapper">
						<BooztLogo />
					</div>

					<div className="header__author">
						Oskar Havsvik
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
