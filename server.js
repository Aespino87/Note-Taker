const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Puts data to be encoded into the URL-encoded format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Set the routes
app.use(require("./routes/pageRoutes.js"));
app.use(require("./routes/apiRoutes.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
}); 