export type PadraoCreateInput = {
    tipo: string;
    marca: string;
    modelo: string;
    numeroSerie: string;
    versaoFirmware: string;
    tempoAtivoSistema: Date;
    totalDigitalizacoes: number;
    totalCopiasPB: number;
    totalCopiasColoridas: number;
    totalImpressoesPb: number;
    totalImpressoesColoridas: number;
    totalGeral: number;
    enderecoIp: string;
};

export type PadraoCreateOutput = {
    id: string;
    tipo: string;
    marca: string;
    modelo: string;
    numeroSerie: string;
    versaoFirmware: string;
    tempoAtivoSistema: Date;
    totalDigitalizacoes: number;
    totalCopiasPB: number;
    totalCopiasColoridas: number;
    totalImpressoesPb: number;
    totalImpressoesColoridas: number;
    totalGeral: number;
    enderecoIp: string;
};