const express = require('express');
const path = require('path');
const compress = require('compression');

const port = process.env.PORT || 8080;
const app = express();

app.use(compress());
app.use(express.static(path.join(__dirname, 'dist'), { maxAge: 0 }));

app.get("/sdk.js", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/assets/sdk.js"));
})
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
