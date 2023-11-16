import { Request, Response } from 'express';
import { prisma } from '../database';
import {ImpressoraCreateInput} from '../types/Impressora.type'

export default {
    async createImpressora(request: Request, response: Response) {
        try {
            const {
              padrao,
              ip,
              numeroSerie,
              codigoLocadora,
              contadorInstalacao,
              dataInstalacao,
              contadorRetirada,
              dataRetirada,
              ultimoContador,
              dataUltimoContador,
              unidadePai,
              unidadeFilho,
            } = request.body as ImpressoraCreateInput;

            const impressoraExist = await prisma.unidade.findUnique({ where: { ip } });

            if (impressoraExist) {
                return response.status(400).json({
                    error: true,
                    message: 'Erro: Unidade já existe!'
                });
            }

            const impressora = await prisma.unidade.create({
                data: {
                    padrao,
                    ip,
                    numeroSerie,
                    codigoLocadora,
                    contadorInstalacao,
                    dataInstalacao,
                    contadorRetirada,
                    dataRetirada,
                    ultimoContador,
                    dataUltimoContador,
                    unidadePai,
                    unidadeFilho,
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
};
