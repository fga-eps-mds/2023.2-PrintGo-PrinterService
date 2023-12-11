import { Request, Response } from 'express';
import { prisma } from '../database';
import {PadraoCreateInput} from '../types/Padrao.type'

export default {
    async createPadrao(request: Request, response: Response) {
        try {
            const {
                tipo,
                marca,
                modeloImpressora,
                modelo,
                numeroSerie,
                versaoFirmware,
                totalDigitalizacoes,
                totalCopiasPB,
                totalCopiasColoridas,
                totalImpressoesPb,
                totalImpressoesColoridas,
                totalGeral,
                enderecoIp,
                tempoAtivoSistema,
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
            return response.status(500).json({ error: true, message: error.message });
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

            if(padrao) {
                const status=200;
                return response.status(status).json(padrao)
            } else {
                const status=404;
                return response.status(status).json({
                    error: true,
                    message: 'Erro: Não foi possível encontrar o padrão.',
                })
            }
        } catch (error) {
            return response.status(500).json({
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
                  message: 'Erro: Padrão não encontrado!',
              });
          }
  
          return response.status(200).json({
              message: 'Sucesso: Padrão atualizado com sucesso!',
              data: await prisma.padrao.update({
                where: { id },
                data: { status: toggleStatus },
              }),
          });
  
      } catch (error) {
          return response.status(500).json({ error: true, message: error.message });
      }
  },

  async deletePadraoById(request: Request, response: Response) {
    const { id } = request.params;

    try {
        const patternExists = await prisma.padrao.findUnique({ where: { id } });
    
        if (!patternExists) {
            return response.status(404).json({
                error: true,
                message: 'Erro: Padrão não encontrado!',
            });
        }

        return response.status(200).json({
          message: 'Sucesso: Padrão deletado com sucesso!',
          data: await prisma.padrao.delete({
            where: { id },
          }),
        });

    } catch (error) {
        response.status(500).json({error: true, message: 'Erro: Ocorreu um erro ao apagar o padrão.'});
    }
  },
};
