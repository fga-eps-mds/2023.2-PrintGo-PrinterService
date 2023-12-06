import request from 'supertest';
import { server } from '../../src/server';
import { prisma } from '../../src/database';

describe('Contador Controller', () => {
    let contador_created_id: string;
    const defaultSerie = '125123'

    afterAll(async () => {
        await server.close();
        if (contador_created_id) {
            await prisma.contador.delete({
                where: {
                    id: contador_created_id,
                },
            });
        }
    });

    it('should create a new Contador and return a 201 status', async () => {
        const contadorData = {
            contadorCopiasPB: "500",
            contadorImpressoesPB: "1000",
            numeroSerie: 'exemplo_numero_serie',
            contadorImpressoesColoridas: "150",
            contadorCopiasColoridas: "100",
            contadorGeral: "1200",
            dataHoraEmissaoRelatorio: "2023-12-01T14:45:00Z"
        };

        const response = await request(server)
            .post('/contador/create')
            .send(contadorData);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Sucesso: Contador Manual cadastrado com sucesso!');
        expect(response.body.data).toHaveProperty('id');
        contador_created_id = response.body.data.id;
    });

    it('should return a 400 status if ip already exists', async () => {
        await request(server)
            .post('/impressora/create')
            .send({
                contadorCopiasPB: "500",
                contadorImpressoesPB: "1000",
                numeroSerie: defaultSerie,
                contadorImpressoesColoridas: "150",
                contadorCopiasColoridas: "100",
                contadorGeral: "1200",
                dataHoraEmissaoRelatorio: "2023-12-01T14:45:00Z"
            });

        // Tente criar uma novo contador manual com o mesmo numero de serie
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

        expect(response.status).toBe(400);
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe('Erro: Impressora já existe!');
    });
    
});