# Boozt test - Oskar Havsvik

## Setup

1. Import `data/product_list.sql` to a database (I used the name __boozt__)
2. Edit `env.php` to match your database settings
3. Point your local server to `/public_html`
4. Open a browser to view the application
4. Profit!

## Dev build

1. Run `npm install` in `/app`
2. Edit `proxyAddress` in `app/gulpfile.js` to match your server address (I used http://localhost:8888)
3. Install gulp `npm install gulp --global`
4. Run `npm start`
5. Profit!
