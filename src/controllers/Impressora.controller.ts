import { Request, Response } from 'express';
import { prisma } from '../database';
import {ImpressoraCreateInput} from '../types/Impressora.type'

export default {
    async createImpressora(request: Request, response: Response) {
        try {
            const {
                ip,
                padrao_id,
                numeroSerie,
                codigoLocadora,
                contadorInstalacao,    
                dataInstalacao,
                contadorRetiradas,
                dataContadorRetirada,
                ultimoContador,
                dataUltimoContador,
                unidadeId,
            } = request.body as ImpressoraCreateInput;

            const impressoraExist = await prisma.impressora.findUnique({ where: { ip } });
            const impressoraExistNSeries = await prisma.impressora.findUnique({ where: { numeroSerie } });

            if (impressoraExist || impressoraExistNSeries) {
                return response.status(400).json({
                    error: true,
                    message: 'Erro: Impressora já existe!'
                });
            }

            const padraoExist = await prisma.padrao.findUnique({ where: { id: padrao_id } });

            if (!padraoExist) {
                return response.status(404).json({
                    error: true,
                    message: 'Erro: Padrao não encontrado!'
                });
            }

            const impressora = await prisma.impressora.create({
                data: {
                    ip,
                    padrao_id,
                    numeroSerie,
                    codigoLocadora,
                    contadorInstalacao,    
                    dataInstalacao,
                    contadorRetiradas,
                    dataContadorRetirada,
                    ultimoContador,
                    dataUltimoContador,
                    unidadeId,
                }
            });

            return response.status(201).json({
                message: 'Sucesso: Impressora cadastrada com sucesso!',
                data: impressora
            });

        } catch (error) {
            return response.json({ error: true, message: error.message });
        }
    },

    async  listImpressoras(request: Request, response: Response) {
        try {
            const impressoras = await prisma.impressora.findMany({
                include: {
                    padrao: true, 
                },
            });
            return response.json(impressoras);
        } catch (error) {
            return response.status(500).json({
                error: true,
                message: 'Erro: Ocorreu um erro ao buscar as Impressoras Cadastradas.'
            });
        }
    },

    async editImpressora(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const impressoraToChange = request.body;

            const impressoraExist = await prisma.impressora.findUnique({ where: { id: String(id) } });
      
            if (!impressoraExist) {
              return response.status(404).json({
                error: true,
                message: 'Erro: Impressora não encontrada!',
              });
            }

            const updatedImpressora = await prisma.impressora.update({
                where: {
                    id: String(id)
                },
                data: impressoraToChange
            });

            return response.status(200).json({
                message: 'Sucesso: Impressora atualizada com sucesso!',
                data: updatedImpressora
            });

        } catch (error) {
            return response.json({ error: true, message: error.message });
        }
    },

    async toggleImpressora(request: Request, response: Response) {
        try {
            const { id, status } = request.body;
    
            const toggleStatus = status === 'ATIVO' ? 'DESATIVADO' : 'ATIVO';
    
            const impressoraExist = await prisma.impressora.findUnique({ where: { id } });
    
            if (!impressoraExist) {
                return response.status(404).json({
                    error: true,
                    message: 'Erro: Impressora não encontrada!',
                });
            }
    
            const toggleImpre = await prisma.impressora.update({
                where: { id },
                data: { status: toggleStatus },
            });
    
            return response.status(200).json({
                message: 'Sucesso: Impressora atualizada com sucesso!',
                data: toggleImpre,
            });
    
        } catch (error) {
            return response.status(500).json({ error: true, message: error.message });
        }
    },
};
