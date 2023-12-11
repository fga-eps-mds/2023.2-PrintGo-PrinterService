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

            const numeroSerieExiste = await prisma.contador.findMany({
                where: {
                    numeroSerie: String(numeroSerie)
                }
            });
            
            if (!numeroSerieExiste) {
                return response.status(400).json({
                    message: 'Erro: impressora nao encontrada. Verifique o contador com o numero de serie informado.'
                });
            }

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
            return response.status(500).json({ error: true, message: error.message });
        }
    },

    async  listImpressoras(request: Request, response: Response) {
        try {
            const contadores = await prisma.contador.findMany();
            return response.json(contadores);
        } catch (error) {
            return response.status(500).json({
                error: true,
                message: 'Erro: Ocorreu um erro ao buscar as Impressoras Cadastradas.'
            });
        }
    },
    
    async  editContador(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const contadorData = request.body;
            const contadorExists = await prisma.contador.findUnique({
                where: { id },
            });

            if (!contadorExists) {
                return response.status(404).json({
                    error: true,
                    message: 'Erro: Contador não encontrado!',
                });
            }

            const contadorUpdated = await prisma.contador.update({
                where: {
                    id
                },
                data: contadorData
            })

            return response.status(201).json(contadorUpdated);
        } catch (error) {
            return response.status(500).json({
                error: true,
                message: 'Erro: Ocorreu um erro ao buscar as Impressoras Cadastradas.'
            });
        }
    },

};