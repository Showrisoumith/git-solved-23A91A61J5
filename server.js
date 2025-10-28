const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000; // changed from 3000 to 4000

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
