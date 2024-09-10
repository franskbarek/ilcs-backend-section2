const oracledb = require('oracledb');

async function createTask(title, description, status) {
  const connection = await oracledb.getConnection();
  const result = await connection.execute(
    `INSERT INTO tasks (title, description, status) VALUES (:title, :description, :status) RETURNING id INTO :id`,
    { title, description, status, id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } },
    { autoCommit: true }
  );
  await connection.close();
  return result.outBinds.id[0];
}

async function getAllTasks() {
  const connection = await oracledb.getConnection();
  const result = await connection.execute(`SELECT * FROM tasks`);
  await connection.close();
  return result.rows;
}

async function getTaskById(id) {
  const connection = await oracledb.getConnection();
  const result = await connection.execute(`SELECT * FROM tasks WHERE id = :id`, [id]);
  await connection.close();
  return result.rows[0];
}

async function updateTask(id, title, description, status) {
  const connection = await oracledb.getConnection();
  await connection.execute(
    `UPDATE tasks SET title = :title, description = :description, status = :status WHERE id = :id`,
    { title, description, status, id },
    { autoCommit: true }
  );
  await connection.close();
}

async function deleteTask(id) {
  const connection = await oracledb.getConnection();
  await connection.execute(`DELETE FROM tasks WHERE id = :id`, [id], { autoCommit: true });
  await connection.close();
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
