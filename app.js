const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const db = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', taskRoutes);

const PORT = process.env.PORT || 3000;

db.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to initialize database:", err);
});
