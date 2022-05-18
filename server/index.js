const express = require("express");
const { trackParser } = require("./api");

const app = express();
const port = process.env.PORT || 3001;

app.get("/track/:number", async (req, res) => {
  const { number } = req.params;
  const { courier } = req.query;
  const result = await trackParser(number, courier);
  res.json(result);
})

app.listen(port, () => console.log(`Listening on port ${port}`));