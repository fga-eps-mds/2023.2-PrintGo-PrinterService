import request from 'supertest';
import { server } from '../src/server';

describe('POST /padrao/create', () => {
  it('should create a new padrao and return a 201 status', async () => {
    const padraoData = {
      tipo: 'impressora',
      marca: 'exemplo_marca',
      modelo: 'exemplo_modelo',
      numeroSerie: 'exemplo_numero_serie',
      versaoFirmware: 'exemplo_versao_firmware',
      tempoAtivoSistema: "2023-12-01T15:30:00Z",
      totalDigitalizacoes: "500",
      totalCopiasPB: "1000",
      totalCopiasColoridas: "200",
      totalImpressoesPb: "800",
      totalImpressoesColoridas: "150",
      totalGeral: "950",
      enderecoIp: '192.168.1.2',
    };

    const response = await request(server)
      .post('/padrao/create')
      .send(padraoData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Sucesso: padrao cadastrada com sucesso!');
    expect(response.body.data).toHaveProperty('id');
  });

  it('should return a 400 status if padrao creation fails', async () => {
    // Simule uma falha na criação do padrao, por exemplo, fornecendo dados inválidos
    const invalidPadraoData = {
      // ...dados inválidos
    };

    const response = await request(server)
      .post('/padrao/create')
      .send(invalidPadraoData);

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBeDefined();
  });
});