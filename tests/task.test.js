const request = require('supertest');
const app = require('../app');

describe('Task API', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task', description: 'Test Description', status: 'pending' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Task created successfully');
  });

  it('should get all tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should get a task by id', async () => {
    const res = await request(app).get('/api/tasks/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title');
  });

  it('should update a task', async () => {
    const res = await request(app)
      .put('/api/tasks/1')
      .send({ title: 'Updated Task', description: 'Updated Description', status: 'completed' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task updated successfully');
  });

  it('should delete a task', async () => {
    const res = await request(app).delete('/api/tasks/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task deleted successfully');
  });
});
