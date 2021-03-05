const pool = require('../db');

const getAll = (req, res) => {
  pool.query('SELECT * FROM categories ORDER BY name ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getById = (req, res) => {
  const { id } = req.params;
  pool.query(`SELECT * FROM categories WHERE id = ${id}`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows[0] || null);
  });
};

const create = (request, response) => {
  const { name } = request.body;
  pool.query('INSERT INTO categories (name, created_at, updated_at) VALUES ($1, current_timestamp, current_timestamp)', [name], (error) => {
    if (error) {
      throw error;
    }
    response.status(201).json(true);
  })
};

const update = (request, response) => {
  const { id } = request.params;
  const { name } = request.body;
  pool.query('UPDATE categories SET name = $1, updated_at = current_timestamp WHERE id = $2', [name, id], (error) => {
    if (error) {
      throw error;
    }
    response.status(200).json(true);
  });
};

const remove = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM categories WHERE id = $1', [id], (error) => {
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
