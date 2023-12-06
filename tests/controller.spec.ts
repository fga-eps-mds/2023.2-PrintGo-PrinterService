import request from 'supertest';
import { server } from '../src/server';

describe('POST /contador/create', () => {
  it('should create a new contador and return a 201 status', async () => {
    // Dados de exemplo para o corpo da requisição
    const contadorData = {
      contadorCopiasPB: "500",
      contadorImpressoesPB: "1000",
      numeroSerie: "exemplo_numero_serie",
      contadorImpressoesColoridas: "150",
      contadorCopiasColoridas: "100",
      contadorGeral: "1200",
      dataHoraEmissaoRelatorio: "2023-12-01T14:45:00Z"
    };

    // Realizar a requisição POST
    const response = await request(server)
      .post('/contador/create')
      .send(contadorData);

    // Verificar se a resposta está correta
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Sucesso: Contador Manual cadastrado com sucesso!');
    expect(response.body.data).toHaveProperty('id'); // Verifica se o ID está presente no objeto de resposta
  });
});