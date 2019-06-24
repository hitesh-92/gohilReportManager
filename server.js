const app = require('express')();
const path = require('path');

const PORT = process.env.PORT;

app.use("/", serveStatic(path.join(__dirname, '/dist')));
app.get('/*', (req, res) => res.redirect('/'));

app.listen(port); 
