import { ImpressoraCreateOutput } from "./Impressora.type";

export type ContadorCreateInput = {
    numeroSerie: string;
    contadorCopiasPB: string;
    contadorImpressoesPB: string;
    contadorCopiasColoridas?: string;
    contadorImpressoesColoridas?: string;
    contadorGeral: string;
    dataHoraEmissaoRelatorio: Date;
    pdfAnexo?: string;
  }
  
  export type ContadorCreateOutput = {
    id: string;
    numeroSerie: string;
    contadorCopiasPB: string;
    contadorImpressoesPB: string;
    contadorCopiasColoridas?: string;
    contadorImpressoesColoridas?: string;
    contadorGeral: string;
    dataHoraEmissaoRelatorio: Date;
    pdfAnexo?: string;
    serie: ImpressoraCreateOutput; 
  }