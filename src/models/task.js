const sql = require('../config/db');

const Task = {
  async findAll() {
    const rows = await sql`SELECT * FROM tasks ORDER BY created_at DESC`;
    return rows;
  },

  async findById(id) {
    const rows = await sql`SELECT * FROM tasks WHERE id = ${id}`;
    return rows[0] || null;
  },

  async create(title, description) {
    const rows = await sql`
      INSERT INTO tasks (title, description)
      VALUES (${title}, ${description})
      RETURNING *
    `;
    return rows[0];
  },

  async update(id, { title, description, is_completed }) {
    const rows = await sql`
      UPDATE tasks
      SET
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        is_completed = COALESCE(${is_completed}, is_completed),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;
    return rows[0] || null;
  },

  async delete(id) {
    const rows = await sql`
      DELETE FROM tasks WHERE id = ${id}
      RETURNING *
    `;
    return rows[0] || null;
  },
};

module.exports = Task;
