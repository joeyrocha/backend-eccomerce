// Import required modules
const express = require('express');

// Create an Express application
const app = express();
const PORT = 3000;

app.use(express.json())


// Define a route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
