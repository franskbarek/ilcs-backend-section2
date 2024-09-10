const oracledb = require('oracledb');
require('dotenv').config();

async function initialize() {
  try {
    await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
}

async function close() {
  await oracledb.getPool().close();
}

module.exports = {
  initialize,
  close
};
