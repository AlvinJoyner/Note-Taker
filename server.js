const express = require('express');
const path = require('path');

const app = express();
const PORT = 4000;

// Middleware to parse request bodies as JSON and handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (e.g., images) from the public directory
app.use(express.static(path.join(__dirname, 'Develop', 'public')));

// Including route files (html-routes.js and api-routes.js) in the server
// Note: Always have the api-route before the html-routes since this data must be displayed on the HTML pages
const apiRoutes = require('./Develop/routes/api-routes.js');
const htmlRoutes = require('./Develop/routes/html-routes.js');

// Pass the app object to the route files to set up their respective routes
apiRoutes(app);
htmlRoutes(app);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
