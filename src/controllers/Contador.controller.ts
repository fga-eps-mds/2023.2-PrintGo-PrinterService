import { Request, Response } from 'express';
import { prisma } from '../database';
import { ContadorCreateInput } from '../types/Contador.type';

export default {
    async createContador(request: Request, response: Response) {
        try {
            const {
                contadorCopiasPB,
                contadorImpressoesPB,
                numeroSerie,
                contadorImpressoesColoridas,
                contadorCopiasColoridas, 
                contadorGeral,
                dataHoraEmissaoRelatorio, 
                
            } = request.body as ContadorCreateInput;

        

            const contador = await prisma.contador.create({
                data: {

                    contadorCopiasPB,
                    contadorImpressoesPB,
                    numeroSerie,
                    contadorImpressoesColoridas,
                    contadorCopiasColoridas, 
                    contadorGeral,
                    dataHoraEmissaoRelatorio, 
                }
            });

            return response.status(201).json({
                message: 'Sucesso: Contador Manual cadastrado com sucesso!',
                data: contador
            });

        } catch (error) {
            return response.json({ error: true, message: error.message });
        }
    },
};