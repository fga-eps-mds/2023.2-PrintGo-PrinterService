import request from 'supertest';
import { server } from '../../src/server';
import { prisma } from '../../src/database';

describe('Printer Controller', () => {

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

    let impressora_created_id: string;
    const defaultIP = `teste${Date.now()}.1.2`;
    let defaultPadrao = null;
    const defaultLocadora = '1565a-1032';
    const defaultSerie = `teste${Date.now()}.serienumber`;

    beforeAll(async () => {
      const response = await request(server)
                        .post('/padrao/create')
                        .send(padraoData);
      defaultPadrao = response.body.data.id;
    })

    afterAll(async () => {
        await request(server)
          .delete(`/padrao/${defaultPadrao}`);

        await server.close();
    });

    it('should create a new printer and return a 201 status', async () => {
        const printData = {
            padrao_id: defaultPadrao,
            ip: defaultIP,
            numeroSerie: defaultSerie,
            codigoLocadora: defaultLocadora,
            contadorInstalacao: 1000,
            dataInstalacao: "2023-01-15T00:00:00.000Z",
            contadorRetiradas: 10,
            dataContadorRetirada: "2023-12-01T12:30:00.000Z",
            dataUltimoContador: "2023-12-01T12:30:00.000Z",
            ultimoContador: 10
        };

        const response = await request(server)
            .post('/impressora/create')
            .send(printData);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Sucesso: Impressora cadastrada com sucesso!');
        expect(response.body.data).toHaveProperty('id');
        impressora_created_id = response.body.data.id;
    });

    it('should return a 400 status if ip already exists', async () => {
        await request(server)
            .post('/impressora/create')
            .send({
              padrao_id: defaultPadrao,
              ip: defaultIP,
              numeroSerie: defaultSerie,
              codigoLocadora: defaultLocadora,
              contadorInstalacao: 1000,
              dataInstalacao: "2023-01-15T00:00:00.000Z",
              contadorRetiradas: 10,
              dataContadorRetirada: "2023-12-01T12:30:00.000Z",
              dataUltimoContador: "2023-12-01T12:30:00.000Z",
              ultimoContador: 10
            });

        // Tente criar uma nova impressora com o mesmo ip
        const printData = {
          padrao_id: defaultPadrao,
          ip: defaultIP,
          numeroSerie: defaultSerie,
          codigoLocadora: defaultLocadora,
          contadorInstalacao: 1000,
          dataInstalacao: "2023-01-15T00:00:00.000Z",
          contadorRetiradas: 10,
          dataContadorRetirada: "2023-12-01T12:30:00.000Z",
          dataUltimoContador: "2023-12-01T12:30:00.000Z",
          ultimoContador: 10
        };

        const response = await request(server)
            .post('/impressora/create')
            .send(printData);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe('Erro: Impressora já existe!');
    });

    it('should list all printers and return a 200 status', async () => {
        const response = await request(server)
            .get('/impressora/');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should return a 500 status and an error message on database error', async () => {
        // Mocking a database error by causing an invalid query
        jest.spyOn(prisma.impressora, 'findMany').mockImplementationOnce(() => {
            throw new Error('Database error');
        });

        const response = await request(server)
            .get('/impressora/');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', true);
        expect(response.body).toHaveProperty('message', 'Erro: Ocorreu um erro ao buscar as Impressoras Cadastradas.');

        jest.restoreAllMocks();
    });

    it('should edit an existing printer and return a 200 status', async () => {
        const editedData = {
            id: impressora_created_id,
            padrao_id: defaultPadrao,
            ip: defaultIP,
            numeroSerie: defaultSerie,
            codigoLocadora: defaultLocadora,
            contadorInstalacao: 1000,
            dataInstalacao: "2023-01-15T00:00:00.000Z",
            contadorRetiradas: 10,
            dataContadorRetirada: "2023-12-01T12:30:00.000Z",
            dataUltimoContador: "2023-12-01T12:30:00.000Z",
            ultimoContador: 10
        };

        const response = await request(server)
            .put(`/impressora/${impressora_created_id}`)
            .send(editedData);

        console.log(response.body);
        console.log(impressora_created_id);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Sucesso: Impressora atualizada com sucesso!');
        expect(response.body.data).toHaveProperty('id');
    });

    it('update printer wrong printer id', async () => {
        const response = await request(server)
            .put(`/impressora/${impressora_created_id}1234`)
            .send({
                numeroSerie: '222212',
                contadorInstalacao: 1501,
            });

        expect(response.status).toBe(404);
    });

    it('should return 404 when trying to update for a non-existing impressora', async () => {
        const nonExistingPrinterId = 'non-existing-id';

        const toggleResponse = await request(server)
            .put(`/impressora/${nonExistingPrinterId}`)
            .send({
                id: nonExistingPrinterId,
                contadorInstalacao: 1501,
            });

        expect(toggleResponse.status).toBe(404);
        expect(toggleResponse.body).toHaveProperty('error', true);
        expect(toggleResponse.body).toHaveProperty('message', 'Erro: Impressora não encontrada!');
    });

    it('should toggle the status of an existing printer and return a 200 status', async () => {
        const toggleData = {
            id: impressora_created_id,
            status: 'ATIVO',
        };

        const response = await request(server)
            .patch(`/impressora/${impressora_created_id}`)
            .send(toggleData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Sucesso: Impressora atualizada com sucesso!');
        expect(response.body.data).toHaveProperty('id');
    });

    it('should return 404 when trying to toggle status for a non-existing impressora', async () => {
        const nonExistingPrinterId = 'non-existing-id';

        const toggleResponse = await request(server)
            .patch(`/impressora/${nonExistingPrinterId}`)
            .send({
                id: nonExistingPrinterId,
                status: 'ATIVO',
            });

        expect(toggleResponse.status).toBe(404);
        expect(toggleResponse.body).toHaveProperty('error', true);
        expect(toggleResponse.body).toHaveProperty('message', 'Erro: Impressora não encontrada!');
    });

    it('should delete printer by ID and return a 200 status', async () => {
      const response = await request(server)
          .delete(`/impressora/${impressora_created_id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Sucesso: impressora deletada com sucesso.");
    });

    it('should return a 404 status if printer is not found', async () => {
      const response = await request(server)
          .delete(`/impressora/${"non-existant-id"}`);

      console.log(response.body)

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Erro: Não foi possível encontrar a impressora.');
  });
});
