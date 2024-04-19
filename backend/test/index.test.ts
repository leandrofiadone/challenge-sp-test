import request from 'supertest';
import app from '../src/index'; 

describe('Ruta de Subida', () => {
  it('debería devolver 400 si no se carga ningún archivo', async () => {
    const response = await request(app).post('/api/files');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'No file uploaded.' });
  });

});

describe('Ruta de Búsqueda', () => {
  it('debería devolver usuarios que coincidan con el término de búsqueda', async () => {
    const response = await request(app).get('/api/users?q=John');
    expect(response.status).toBe(200);
  });

});

