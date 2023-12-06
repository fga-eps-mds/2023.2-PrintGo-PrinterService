import { Request, Response, request } from 'express';
import { prisma } from '../database';
import {PadraoCreateInput} from '../types/Padrao.type'

export default {
    async createPadrao(request: Request, response: Response) {
        try {
            const {
                tipo,
                marca,
                modelo,
                numeroSerie,
                versaoFirmware,
                tempoAtivoSistema,
                totalDigitalizacoes,
                totalCopiasPB,
                totalCopiasColoridas,
                totalImpressoesPb,
                totalImpressoesColoridas,
                totalGeral,
                enderecoIp,
                modeloImpressora,
            } = request.body as PadraoCreateInput;


            const padrao = await prisma.padrao.create({
                data: {
                    tipo,
                    marca,
                    modelo,
                    numeroSerie,
                    versaoFirmware,
                    tempoAtivoSistema,
                    totalDigitalizacoes,
                    totalCopiasPB,
                    totalCopiasColoridas,
                    totalImpressoesPb,
                    totalImpressoesColoridas,
                    totalGeral,
                    enderecoIp,
                    modeloImpressora,
                }
            });

            return response.status(201).json({
                message: 'Sucesso: padrao cadastrada com sucesso!',
                data: padrao
            });

        } catch (error) {
            return response.json({ error: true, message: error.message });
        }
    },

    async  listPadroes(request: Request, response: Response) {
        try {
            const padroes = await prisma.padrao.findMany();
            return response.json(padroes);
        } catch (error) {
            return response.status(500).json({
                error: true,
                message: 'Erro: Ocorreu um erro ao buscar as padroes Cadastradas.'
            });
        }
    },

    async findPadraoById(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const padrao = await prisma.padrao.findUnique({
                where: { id: String(id) },
            });

            console.log(id);

            return padrao ?
                response.json(padrao):
                response.status(404).json({
                    error: true,
                    message: 'Erro: Não foi possível encontrar o padrão.'
                });
        } catch (error) {
            response.status(500).json({
                error: true,
                message: 'Erro: Ocorreu um erro ao buscar  o padrão por ID.'
            });
        }
    },

    async deletePadraoById(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const printer = await prisma.padrao.delete({
                where: {
                    id: String(id),
                },
            });

            console.log(printer);

            return printer ? 
            response.status(200).json({ message: "Sucesso: padrão deletado com sucesso." }) : 
            response.status(404).json({
                error: true,
                message: 'Erro: Não foi possível apagar o padrão.'
            });
        } catch (error) {
            response.status(500).json({
                error: true,
                message: 'Erro: Ocorreu um erro ao apagar o padrão.'
            });
        }
    },
};
