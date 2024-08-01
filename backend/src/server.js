
require('module-alias/register');
const mongoose = require('mongoose');
const { globSync } = require('glob');
const path = require('path');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 20) {
  console.log('Please upgrade your node.js version to at least 20 or greater. 👌\n ');
  process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

// Connect to MongoDB
mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', (error) => {
  console.log(
    `1. 🔥 Common Error caused issue → : check your .env file first and add your mongodb url`
  );
  console.error(`2. 🚫 Error → : ${error.message}`);
});

// Load all models
const modelsFiles = globSync('./src/models/**/*.js');
for (const filePath of modelsFiles) {
  require(path.resolve(filePath));
}

// Start our app!
const app = require('./app');

// Set port
app.set('port', process.env.PORT || 8888);

// Start server
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → On PORT : ${server.address().port}`);
});
// require('module-alias/register');
// const mongoose = require('mongoose');
// const { globSync } = require('glob');
// const path = require('path');
// const express = require('express');

// // Make sure we are running node 7.6+
// const [major, minor] = process.versions.node.split('.').map(parseFloat);
// if (major < 20) {
//   console.log('Please upgrade your node.js version to at least 20 or greater. 👌\n ');
//   process.exit();
// }

// // import environmental variables from our variables.env file
// require('dotenv').config({ path: '.env' });
// require('dotenv').config({ path: '.env.local' });

// // Connect to MongoDB
// mongoose.connect(process.env.DATABASE);

// mongoose.connection.on('error', (error) => {
//   console.log(
//     `1. 🔥 Common Error caused issue → : check your .env file first and add your mongodb url`
//   );
//   console.error(`2. 🚫 Error → : ${error.message}`);
// });

// // Load all models
// const modelsFiles = globSync('./src/models/**/*.js');
// for (const filePath of modelsFiles) {
//   require(path.resolve(filePath));
// }

// // Load routes

// const coreAuthRoutes = require('@/routes/coreRoutes/coreAuth');

// // Start our app!
// const app = express();
// app.use(express.json());

// // Use routes

// app.use('/api/core-auth', coreAuthRoutes);

// // Set port
// app.set('port', process.env.PORT || 8888);

// // Start server
// const server = app.listen(app.get('port'), () => {
//   console.log(`Express running → On PORT : ${server.address().port}`);
// });


// require('module-alias/register');
// const mongoose = require('mongoose');
// const { globSync } = require('glob');
// const path = require('path');
// const express = require('express');

// // Make sure we are running node 7.6+
// const [major, minor] = process.versions.node.split('.').map(parseFloat);
// if (major < 20) {
//   console.log('Please upgrade your node.js version at least 20 or greater. 👌\n ');
//   process.exit();
// }

// // import environmental variables from our variables.env file
// require('dotenv').config({ path: '.env' });
// require('dotenv').config({ path: '.env.local' });

// mongoose.connect(process.env.DATABASE);

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// mongoose.connection.on('error', (error) => {
//   console.log(
//     `1. 🔥 Common Error caused issue → : check your .env file first and add your mongodb url`
//   );
//   console.error(`2. 🚫 Error → : ${error.message}`);
// });

// const modelsFiles = globSync('./src/models/**/*.js');

// for (const filePath of modelsFiles) {
//   require(path.resolve(filePath));
// }

// // Create an express application
// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Import and use the registration route

// app.use('/api', modelsFiles);

// // Start our app!
// app.set('port', process.env.PORT || 8888);
// const server = app.listen(app.get('port'), () => {
//   console.log(`Express running → On PORT : ${server.address().port}`);
// });

// server.js or app.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const authRoutes = require('./routes/auth');

// const app = express();

// // Middleware
// app.use(bodyParser.json());

// // Database connection
// mongoose.connect('your_mongo_db_connection_string', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Routes
// app.use('/api', authRoutes);

// // Start the server


// require('module-alias/register');
// const mongoose = require('mongoose');
// const { globSync } = require('glob');
// const path = require('path');
// const express = require('express');

// // Make sure we are running node 7.6+
// const [major, minor] = process.versions.node.split('.').map(parseFloat);
// if (major < 20) {
//   console.log('Please upgrade your node.js version at least 20 or greater. 👌\n ');
//   process.exit();
// }

// // import environmental variables from our variables.env file
// require('dotenv').config({ path: '.env' });
// require('dotenv').config({ path: '.env.local' });

// mongoose.connect(process.env.DATABASE);

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// mongoose.connection.on('error', (error) => {
//   console.log(
//     `1. 🔥 Common Error caused issue → : check your .env file first and add your mongodb url`
//   );
//   console.error(`2. 🚫 Error → : ${error.message}`);
// });

// const modelsFiles = globSync('./src/models/**/*.js');

// for (const filePath of modelsFiles) {
//   require(path.resolve(filePath));
// }

// // Create an express application
// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Import and use the registration route
// const authRoutes = require('./src/routes/auth');
// app.use('/api', authRoutes);

// // Start our app!
// app.set('port', process.env.PORT || 8888);
// const server = app.listen(app.get('port'), () => {
//   console.log(`Express running → On PORT : ${server.address().port}`);
// });
