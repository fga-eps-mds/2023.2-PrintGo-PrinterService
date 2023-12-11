import request from 'supertest';
import { server } from '../../src/server';
import { prisma } from '../../src/database';

describe('Contador Controller', () => {

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

    let defaultPadrao: string;

    const printData = {
      padrao_id: "",
      ip: "123.123.12.12.0",
      numeroSerie: "12312312411",
      codigoLocadora: "12314142124123",
      contadorInstalacao: 1000,
      dataInstalacao: "2023-01-15T00:00:00.000Z",
      contadorRetiradas: 10,
      dataContadorRetirada: "2023-12-01T12:30:00.000Z",
      dataUltimoContador: "2023-12-01T12:30:00.000Z",
      ultimoContador: 10
    };

    let printerDefault: string;
    let contador_created_id: string;
    let defaultSerie: string;

    beforeAll(async () => {
      const responsePattern = await request(server)
        .post('/padrao/create')
        .send(padraoData);
      printData.padrao_id = responsePattern.body.data.id;
      defaultPadrao = responsePattern.body.data.id;

      const responsePrinter = await request(server)
            .post('/impressora/create')
            .send(printData);
      printerDefault = responsePrinter.body.data.id;
      defaultSerie = responsePrinter.body.data.numeroSerie;
    })

    afterAll(async () => {
        if (contador_created_id) {
            await prisma.contador.delete({
                where: {
                    id: contador_created_id,
                },
            });
        }

        await request(server)
          .delete(`/padrao/${defaultPadrao}`);

        const response = await request(server)
          .delete(`/impressora/${printerDefault}`);

        console.log(response);

        await server.close();
    });

    it('should create a new Contador and return a 201 status', async () => {
        const contadorData = {
            contadorCopiasPB: "500",
            contadorImpressoesPB: "1000",
            numeroSerie: defaultSerie,
            contadorImpressoesColoridas: "150",
            contadorCopiasColoridas: "100",
            contadorGeral: "1200",
            dataHoraEmissaoRelatorio: "2023-12-01T14:45:00Z"
        };

        const response = await request(server)
            .post('/contador/create')
            .send(contadorData);

        console.log(response.body);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Sucesso: Contador Manual cadastrado com sucesso!');
        expect(response.body.data).toHaveProperty('id');
        contador_created_id = response.body.data.id;
    });
    
    it('should Contador return a 404 status numeroSerie not founded', async () => {
        const contadorData = {
            contadorCopiasPB: "500",
            contadorImpressoesPB: "1000",
            numeroSerie: `defaultSerie1312312`,
            contadorImpressoesColoridas: "150",
            contadorCopiasColoridas: "100",
            contadorGeral: "1200",
            dataHoraEmissaoRelatorio: "2023-12-01T14:45:00Z"
        };

        const response = await request(server)
            .post('/contador/create')
            .send(contadorData);

        console.log(response.body);

        expect(response.status).toBe(500);
    });
});

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

    it('should create a new printer and return a 404 status', async () => {
        const printData = {
            padrao_id: "errado",
            ip: `defaultIP${Date.now()}`,
            numeroSerie: `defaultSerie${Date.now()}`,
            codigoLocadora: `defaultLocadora${Date.now()}`,
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

        expect(response.status).toBe(404);
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
            .patch(`/impressora/${impressora_created_id}`)
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

    it('update printer wrong printer id', async () => {
        const response = await request(server)
            .patch(`/impressora/${impressora_created_id}1234`)
            .send({
                numeroSerie: '222212',
                contadorInstalacao: 1501,
            });

        expect(response.status).toBe(404);
    });

    it('update printer wrong printer id', async () => {
        const response = await request(server)
            .patch(`/impressora/${impressora_created_id}`)
            .send({
                padrao_id: "12003123"
            });

        expect(response.status).toBe(404);
    });

    it('should return 201 when trying to update impressora', async () => {

        const toggleResponse = await request(server)
            .patch(`/impressora/desativar/${impressora_created_id}`)
            .send({
                id: impressora_created_id,
                contadorInstalacao: 1501,
            });

        expect(toggleResponse.status).toBe(200);
    });
    
    it('should return 404 when trying to update for a non-existing impressora', async () => {
        const nonExistingPrinterId = 'non-existing-id';

        const toggleResponse = await request(server)
            .patch(`/impressora/desativar/${nonExistingPrinterId}`)
            .send({
                id: nonExistingPrinterId,
                contadorInstalacao: 1501,
            });

        expect(toggleResponse.status).toBe(404);
        expect(toggleResponse.body).toHaveProperty('error');
        expect(toggleResponse.body).toHaveProperty('message', 'Erro: Impressora não encontrada!');
    });

    it('should toggle the status of an existing printer and return a 200 status', async () => {
        const toggleData = {
            id: impressora_created_id,
            status: 'ATIVO',
        };

        const response = await request(server)
            .patch(`/impressora/desativar/${impressora_created_id}`)
            .send(toggleData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Sucesso: Impressora atualizada com sucesso!');
        expect(response.body.data).toHaveProperty('id');
    });

    it('should return 404 when trying to toggle status for a non-existing impressora', async () => {
        const nonExistingPrinterId = 'non-existing-id';

        const toggleResponse = await request(server)
            .patch(`/impressora/desativar/${nonExistingPrinterId}`)
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


describe('Padrao Controller', () => {
    let padrao_created_id: string;
  

    afterAll(() => {
        server.close();
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
        expect(response.body.message).toBe('Sucesso: Padrão deletado com sucesso!');
    });

    it('should return a 404 status if pattern is not found', async () => {
      const response = await request(server)
          .delete(`/padrao/${"non-existant-id"}`);

      console.log(response.body)

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Erro: Padrão não encontrado!');
  });
});