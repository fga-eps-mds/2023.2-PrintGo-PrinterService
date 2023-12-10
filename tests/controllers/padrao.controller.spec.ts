import request from 'supertest';
import { server } from '../../src/server';
import { prisma } from '../../src/database';

describe('Padrao Controller', () => {
    let padrao_created_id: string;
  

    afterAll(async () => {
        await server.close();
    });

    it('should create a new patterns and return a 201 status', async () => {
        const padraoData = {
            tipo: "padrao",
            marca: "exemplo_marca",
            modelo: "exemplo_modelo",
            numeroSerie: "192.168.1.2",
            versaoFirmware: "192.168.1.2",
            tempoAtivoSistema: "192.168.1.2",
            totalDigitalizacoes: "192.168.1.2", 
            totalCopiasPB: "192.168.1.2",      
            totalCopiasColoridas: "192.168.1.2", 
            totalImpressoesPb: "192.168.1.2",    
            totalImpressoesColoridas: "192.168.1.2", 
            totalGeral: "192.168.1.2",           
            enderecoIp: "192.168.1.2"
        };

        const response = await request(server)
            .post('/padrao/create')
            .send(padraoData);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Sucesso: padrao cadastrada com sucesso!');
        expect(response.body.data).toHaveProperty('id');
        padrao_created_id = response.body.data.id;
    });

    it('should list all patterns and return a 200 status', async () => {
        const response = await request(server)
            .get('/padrao/');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should return a 500 status and an error message on database error', async () => {
        // Mocking a database error by causing an invalid query
        jest.spyOn(prisma.padrao, 'findMany').mockImplementationOnce(() => {
            throw new Error('Database error');
        });

        const response = await request(server)
            .get('/padrao/');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', true);

        jest.restoreAllMocks();
    });

    it('should find pattern by ID and return a 200 status', async () => {
        const response = await request(server)
            .get(`/padrao/${padrao_created_id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', padrao_created_id);
    });

    it('should return a 404 status if pattern ID is not found', async () => {
        const response = await request(server)
            .get('/padrao/nonexistent-id');

        expect(response.status).toBe(404);
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe('Erro: Não foi possível encontrar o padrão.');
    });

    it('should toggle a pattern by ID and return a 200 status', async () => {
      const response = await request(server)
          .patch(`/padrao/${padrao_created_id}`)
          .send({ id: padrao_created_id, status: 'ATIVO' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Sucesso: Padrão atualizado com sucesso!');
    });

    it('should return a 404 status if pattern is not found', async () => {
      const response = await request(server)
          .patch(`/padrao/${"non-existant-id"}`)
          .send({ id: "non-existant-id", status: 'ATIVO' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Erro: Padrão não encontrado!');
    });

    it('should delete pattern by ID and return a 200 status', async () => {
        const response = await request(server)
            .delete(`/padrao/${padrao_created_id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Sucesso: padrão deletado com sucesso.');
    });

 
    
});