export type PadraoCreateInput = {
    tipo: string;
    marca: string;
    modelo: string;
    numeroSerie: string;
    modeloImpressora?: string;
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
    modeloImpressora?: string;
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

export type PadraoUpdateInput = {
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

export type PadraoUpdateOutput = {
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

export type PadraoToggleInput = {
  id: string;
  status: string
};

export type PadraoToggleOutput = {
  id: string;
  tipo: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  versaoFirmware: string;
  tempoAtivoSistema: Date;
  totalDigitalizacoes: string;
  totalCopiasPB: string;
  totalCopiasColoridas: string;
  totalImpressoesPb: string;
  totalImpressoesColoridas: string;
  totalGeral: string;
  enderecoIp: string;
  status: string;
};
