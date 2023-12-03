import { Request, Response } from 'express';
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

    async togglePadrao(request: Request, response: Response) {
      try {
          const { id, status } = request.body;
  
          const toggleStatus = status === 'ATIVO' ? 'DESATIVADO' : 'ATIVO';
  
          const patternExists = await prisma.padrao.findUnique({ where: { id } });
  
          if (!patternExists) {
              return response.status(404).json({
                  error: true,
                  message: 'Erro: Padrão não encontrada!',
              });
          }
  
          const togglePattern = await prisma.padrao.update({
              where: { id },
              data: { status: toggleStatus },
          });
  
          return response.status(200).json({
              message: 'Sucesso: Padrão atualizada com sucesso!',
              data: togglePattern,
          });
  
      } catch (error) {
          return response.status(500).json({ error: true, message: error.message });
      }
  },
};
