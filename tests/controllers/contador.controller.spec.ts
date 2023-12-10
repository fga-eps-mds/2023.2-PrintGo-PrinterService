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
});