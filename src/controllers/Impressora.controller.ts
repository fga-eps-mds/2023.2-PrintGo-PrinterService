import { Request, Response } from 'express';
import { prisma } from '../database';
import {ImpressoraCreateInput} from '../types/Impressora.type'

export default {
    async createImpressora(request: Request, response: Response) {
        try {
            const {
                padrao_id,
                ip,
                numeroSerie,
                codigoLocadora,
                contadorInstalacao, 
                dataInstalacao,
                dataUltimoContador, 
                
            } = request.body as ImpressoraCreateInput;

            const impressoraExist = await prisma.impressora.findUnique({ where: { ip } });

            if (impressoraExist) {
                return response.status(400).json({
                    error: true,
                    message: 'Erro: Impressora já existe!'
                });
            }

            const impressora = await prisma.impressora.create({
                data: {
                    padrao_id,
                    ip,
                    numeroSerie,
                    codigoLocadora,
                    contadorInstalacao, 
                    dataInstalacao,
                    dataUltimoContador, 
                    
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
            const impressoras = await prisma.impressora.findMany();
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
            const {
                id,
                padrao_id,
                ip,
                numeroSerie,
                codigoLocadora,
                contadorInstalacao, 
                dataInstalacao,
                dataUltimoContador,
                unidadeId, 
            } = request.body;

            const impressoraExist = await prisma.impressora.findUnique({ where: { id } });
      
            if (!impressoraExist) {
              return response.status(404).json({
                error: true,
                message: 'Erro: Impressora não encontrada!',
              });
            }

            const updatedImpressora = await prisma.impressora.update({
                where: {id: id},
                data: {
                    id: id,
                    padrao_id: padrao_id,
                    ip: ip,
                    numeroSerie: numeroSerie,
                    codigoLocadora: codigoLocadora,
                    contadorInstalacao: contadorInstalacao, 
                    dataInstalacao: dataInstalacao,
                    dataUltimoContador: dataUltimoContador,
                    unidadeId: unidadeId 
                }   
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
