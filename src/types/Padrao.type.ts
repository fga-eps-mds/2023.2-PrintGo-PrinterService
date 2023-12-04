export type PadraoCreateInput = {
    tipo: string;
    marca: string;
    modelo: string;
    numeroSerie: string;
    versaoFirmware: string;
    tempoAtivoSistema:  string;  
    totalDigitalizacoes: string;
    totalCopiasPB: string;
    totalCopiasColoridas: string;
    totalImpressoesPb: string;
    totalImpressoesColoridas: string;
    totalGeral: string;
    enderecoIp: string;
};

export type PadraoCreateOutput = {
    id: string;
    tipo: string;
    marca: string;
    modelo: string;
    numeroSerie: string;
    versaoFirmware: string;
    tempoAtivoSistema: string;
    totalDigitalizacoes: string;
    totalCopiasPB: string;
    totalCopiasColoridas: string;
    totalImpressoesPb: string;
    totalImpressoesColoridas: string;
    totalGeral: string;
    enderecoIp: string;
};