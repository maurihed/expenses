const pool = require('../db');

const getAll = (req, res) => {
  console.log('gere');
  pool.query('SELECT * FROM expenses ORDER BY "date" ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getById = (req, res) => {
  const { id } = req.params;
  pool.query(`SELECT * FROM expenses WHERE id = ${id}`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows[0] || null);
  });
};

const create = (request, response) => {
  const { category_id, description, amount, date } = request.body;
  pool.query(`INSERT INTO expenses
    (category_id, description, amount, "date", created_at, updated_at)
    VALUES ($1, $2, $3, $4, current_timestamp, current_timestamp)`, [category_id, description, amount, date], (error) => {
    if (error) {
      throw error;
    }
    response.status(201).json(true);
  })
};

const update = (request, response) => {
  const { id } = request.params;
  const { category_id, description, amount, date } = request.body;
  pool.query('UPDATE expenses SET category_id = $1, description = $2, amount = $3, "date" = $4, updated_at = current_timestamp WHERE id = $5', [category_id, description, amount, date, id], (error) => {
    if (error) {
      throw error;
    }
    response.status(200).json(true);
  });
};

const remove = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM expenses WHERE id = $1', [id], (error) => {
    if (error) {
      throw error
    }
    response.status(200).send(true)
  })
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
