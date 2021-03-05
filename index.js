const categories = require('./routes/categories');
const expenses = require('./routes/expenses');
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// start the server
app.listen(port, function() {
  console.log(`app started ${port}`);
});

// route our app
app.get('/api/categories', categories.getAll);
app.get('/api/categories/:id', categories.getById);
app.post('/api/categories', categories.create);
app.put('/api/categories/:id', categories.update);
app.delete('/api/categories/:id', categories.remove);

app.get('/api/expenses', expenses.getAll);
app.get('/api/expenses/:id', expenses.getById);
app.post('/api/expenses', expenses.create);
app.put('/api/expenses/:id', expenses.update);
app.delete('/api/expenses/:id', expenses.remove);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})